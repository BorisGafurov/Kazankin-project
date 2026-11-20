import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { WorkCase, getWorkImageSrc } from '@/entities/work/model/types';
import { useI18n } from '@/shared/lib/i18n';
import styles from './WorkVideoPlayer.module.css';

interface WorkVideoPlayerProps {
  work: WorkCase | null;
  isOpen: boolean;
  onClose: () => void;
  onCloseComplete: () => void;
}

const formatTime = (value: number) => {
  const totalSeconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (part: number) => String(part).padStart(2, '0');

  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
};

interface AudioPreferences {
  volume: number;
  isMuted: boolean;
  lastVolume: number;
}

const AUDIO_PREFERENCES_KEY = 'kazankin-player-audio-preferences';
const DEFAULT_AUDIO_PREFERENCES: AudioPreferences = {
  volume: 0.8,
  isMuted: false,
  lastVolume: 0.8,
};

const PLAYBACK_OVERLAY_HIDE_DELAY_MS = 1500;

const readAudioPreferences = (): AudioPreferences => {
  if (typeof window === 'undefined') return DEFAULT_AUDIO_PREFERENCES;

  try {
    const stored = window.localStorage.getItem(AUDIO_PREFERENCES_KEY);
    if (!stored) return DEFAULT_AUDIO_PREFERENCES;

    const parsed = JSON.parse(stored) as Partial<AudioPreferences>;
    const volume = typeof parsed.volume === 'number' && Number.isFinite(parsed.volume)
      ? Math.max(0, Math.min(1, parsed.volume))
      : DEFAULT_AUDIO_PREFERENCES.volume;
    const lastVolume = typeof parsed.lastVolume === 'number' && Number.isFinite(parsed.lastVolume)
      ? Math.max(0.01, Math.min(1, parsed.lastVolume))
      : (volume > 0 ? volume : DEFAULT_AUDIO_PREFERENCES.lastVolume);

    return {
      volume,
      isMuted: typeof parsed.isMuted === 'boolean' ? parsed.isMuted : false,
      lastVolume,
    };
  } catch {
    return DEFAULT_AUDIO_PREFERENCES;
  }
};

const resolveAssetUrl = (path: string) => {
  if (/^(?:https?:)?\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};

interface ViewportSize {
  width: number;
  height: number;
}

const readViewportSize = (): ViewportSize => typeof window === 'undefined'
  ? { width: 1200, height: 900 }
  : { width: window.innerWidth, height: window.innerHeight };

const getPlayerWidth = (ratio: number, viewport: ViewportSize, fullscreen: boolean): number => {
  const padding = fullscreen
    ? (viewport.width <= 640 ? 10 : Math.min(40, Math.max(12, viewport.width * 0.03)))
    : Math.min(56, Math.max(14, viewport.width * 0.04));
  const maxWidth = fullscreen
    ? viewport.width - padding * 2
    : Math.min(1200, viewport.width - padding * 2);
  const maxHeight = Math.max(120, viewport.height - (fullscreen ? 180 : 260));
  return Math.max(0, Math.min(maxWidth, maxHeight * ratio));
};

export const WorkVideoPlayer: React.FC<WorkVideoPlayerProps> = ({
  work,
  isOpen,
  onClose,
  onCloseComplete,
}) => {
  const { t, lang } = useI18n();
  const titleId = useId();
  const volumeSliderId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playbackOverlayButtonRef = useRef<HTMLButtonElement>(null);
  const controlsPlaybackButtonRef = useRef<HTMLButtonElement>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const volumeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const playerFrameRef = useRef<HTMLDivElement>(null);
  const [audioPreferences, setAudioPreferences] = useState<AudioPreferences>(readAudioPreferences);
  const { volume, isMuted } = audioPreferences;
  const lastVolumeRef = useRef(audioPreferences.lastVolume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPointerActive, setIsVideoPointerActive] = useState(false);
  const [isVolumeSliderOpen, setIsVolumeSliderOpen] = useState(false);
  const [isPlaybackButtonFocused, setIsPlaybackButtonFocused] = useState(false);
  const isPlaybackButtonFocusedRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasMediaError, setHasMediaError] = useState(false);
  const [viewportSize, setViewportSize] = useState<ViewportSize>(readViewportSize);
  const [detectedVideoRatio, setDetectedVideoRatio] = useState<{ src: string; ratio: number } | null>(null);
  const playbackOverlayHideTimerRef = useRef<number | null>(null);

  const videoSrc = work?.videoSrc ? resolveAssetUrl(work.videoSrc) : undefined;
  const posterSrc = work ? resolveAssetUrl(getWorkImageSrc(work, lang)) : undefined;
  const videoAspectRatio = detectedVideoRatio && detectedVideoRatio.src === videoSrc
    ? detectedVideoRatio.ratio
    : (work?.videoAspectRatio ?? 16 / 9);
  const playerWidth = getPlayerWidth(videoAspectRatio, viewportSize, isFullscreen);
  const fullscreenVideoWidth = getPlayerWidth(videoAspectRatio, viewportSize, true);
  const canControlVideo = Boolean(videoSrc) && !hasMediaError;
  const canSeek = canControlVideo && duration > 0;
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const isPlaybackOverlayVisible = isOpen
    && canControlVideo
    && (!isPlaying || isVideoPointerActive || isPlaybackButtonFocused);

  const clearPlaybackOverlayHideTimer = () => {
    if (playbackOverlayHideTimerRef.current === null) return;
    window.clearTimeout(playbackOverlayHideTimerRef.current);
    playbackOverlayHideTimerRef.current = null;
  };

  const closeVolumeSlider = () => {
    if (
      volumeControlRef.current?.contains(document.activeElement)
      && document.activeElement !== volumeButtonRef.current
    ) {
      volumeButtonRef.current?.focus();
    }
    setIsVolumeSliderOpen(false);
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(audioPreferences));
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
  }, [audioPreferences]);

  useEffect(() => {
    const updateViewportSize = () => setViewportSize(readViewportSize());
    window.addEventListener('resize', updateViewportSize);
    window.addEventListener('orientationchange', updateViewportSize);
    return () => {
      window.removeEventListener('resize', updateViewportSize);
      window.removeEventListener('orientationchange', updateViewportSize);
    };
  }, []);

  useEffect(() => () => {
    if (playbackOverlayHideTimerRef.current !== null) {
      window.clearTimeout(playbackOverlayHideTimerRef.current);
      playbackOverlayHideTimerRef.current = null;
    }
  }, [isOpen, work?.id, videoSrc, canControlVideo]);

  useEffect(() => {
    if (!isVolumeSliderOpen) return undefined;

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && volumeControlRef.current?.contains(event.target)) return;
      closeVolumeSlider();
    };

    document.addEventListener('pointerdown', closeOnOutsidePointerDown, true);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown, true);
  }, [isVolumeSliderOpen]);

  useEffect(() => {
    if (!work || !isOpen) return undefined;

    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, work?.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !work) return;

    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // Media metadata may not be available yet; loadstart resets the displayed time.
    }
    video.volume = volume;
    video.muted = isMuted;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    if (playbackOverlayHideTimerRef.current !== null) {
      window.clearTimeout(playbackOverlayHideTimerRef.current);
      playbackOverlayHideTimerRef.current = null;
    }
    setIsVideoPointerActive(false);
    setIsVolumeSliderOpen(false);
    isPlaybackButtonFocusedRef.current = false;
    setIsPlaybackButtonFocused(false);
    setHasMediaError(false);
    setDetectedVideoRatio(null);
  }, [work?.id, videoSrc]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const updateFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === playerFrameRef.current);
    };

    updateFullscreen();
    document.addEventListener('fullscreenchange', updateFullscreen);
    return () => document.removeEventListener('fullscreenchange', updateFullscreen);
  }, [isOpen]);

  if (!work || typeof document === 'undefined') return null;

  const requestClose = () => {
    clearPlaybackOverlayHideTimer();
    videoRef.current?.pause();
    setIsPlaying(false);
    setIsVideoPointerActive(false);
    setIsVolumeSliderOpen(false);
    isPlaybackButtonFocusedRef.current = false;
    setIsPlaybackButtonFocused(false);
    setIsFullscreen(false);
    if (document.fullscreenElement === playerFrameRef.current) {
      void document.exitFullscreen().catch(() => undefined);
    }
    onClose();
    window.requestAnimationFrame(() => {
      document.getElementById(`work-card-${work.id}`)?.focus();
    });
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && isOpen) requestClose();
  };

  const handleKeyDownCapture = (event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();

    if (event.key === 'Escape') {
      event.preventDefault();
      if (isOpen) requestClose();
      return;
    }

    if (isOpen && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!event.repeat) void togglePlayback();
        return;
      }

      if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        if (!event.repeat) toggleMute();
        return;
      }
    }

    if (event.key !== 'Tab') return;
    if (!isOpen) {
      event.preventDefault();
      document.getElementById(`work-card-${work.id}`)?.focus();
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === first || !dialogRef.current?.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeElement === last || !dialogRef.current?.contains(activeElement))) {
      event.preventDefault();
      first.focus();
    }
  };

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video || !canControlVideo || !isOpen) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const handleVideoPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    clearPlaybackOverlayHideTimer();
    if (!isOpen || !canControlVideo) return;
    setIsVideoPointerActive(true);
  };

  const handleVideoPointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    clearPlaybackOverlayHideTimer();
    if (!isOpen || !canControlVideo) return;
    playbackOverlayHideTimerRef.current = window.setTimeout(() => {
      const overlayButton = playbackOverlayButtonRef.current;
      if (!isPlaybackButtonFocusedRef.current && overlayButton === document.activeElement) {
        controlsPlaybackButtonRef.current?.focus();
      }
      setIsVideoPointerActive(false);
      playbackOverlayHideTimerRef.current = null;
    }, PLAYBACK_OVERLAY_HIDE_DELAY_MS);
  };

  const seekBy = (offset: number) => {
    const video = videoRef.current;
    if (!video || !canControlVideo) return;

    const nextTime = Math.max(0, Math.min(video.duration || Number.POSITIVE_INFINITY, video.currentTime + offset));
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !canSeek) return;

    const nextTime = Number(event.currentTarget.value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.currentTarget.value);
    const video = videoRef.current;
    if (nextVolume > 0) lastVolumeRef.current = nextVolume;
    if (video) {
      video.volume = nextVolume;
      video.muted = nextVolume === 0;
    }
    setAudioPreferences((previous) => ({
      ...previous,
      volume: nextVolume,
      isMuted: nextVolume === 0,
      lastVolume: nextVolume > 0 ? nextVolume : previous.lastVolume,
    }));
  };

  const toggleMute = () => {
    const currentlyMuted = isMuted || volume === 0;
    const nextMuted = !currentlyMuted;
    if (currentlyMuted && volume === 0) {
      const restoredVolume = lastVolumeRef.current;
      if (videoRef.current) videoRef.current.volume = lastVolumeRef.current;
      setAudioPreferences((previous) => ({ ...previous, volume: restoredVolume, isMuted: false }));
      if (videoRef.current) videoRef.current.muted = false;
      return;
    }
    setAudioPreferences((previous) => ({ ...previous, isMuted: nextMuted }));
    if (videoRef.current) videoRef.current.muted = nextMuted;
  };

  const toggleFullscreen = async () => {
    const frame = playerFrameRef.current;
    if (!frame || !isOpen) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (frame.requestFullscreen) {
        await frame.requestFullscreen();
      }
    } catch {
      setIsFullscreen(document.fullscreenElement === frame);
    }
  };

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (!isOpen && event.target === event.currentTarget && event.animationName === 'player-backdrop-out') {
      onCloseComplete();
    }
  };

  const stopPageGesture = (event: React.SyntheticEvent) => event.stopPropagation();
  const mediaMessage = hasMediaError ? t('player.loadError') : !videoSrc ? t('player.noVideo') : '';

  return createPortal(
    <div
      className={styles.backdrop}
      data-open={isOpen}
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
      onWheelCapture={stopPageGesture}
      onTouchStartCapture={stopPageGesture}
      onTouchMoveCapture={stopPageGesture}
      onTouchEndCapture={stopPageGesture}
      onAnimationEnd={handleAnimationEnd}
    >
      <section
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDownCapture={handleKeyDownCapture}
      >
        <div
          ref={playerFrameRef}
          className={styles.playerFrame}
          style={{
            '--video-ratio': videoAspectRatio,
            '--fullscreen-video-width': `${fullscreenVideoWidth}px`,
            width: isFullscreen ? '100vw' : `${playerWidth}px`,
          } as React.CSSProperties}
        >
          <div
            className={styles.videoViewport}
            onPointerEnter={handleVideoPointerEnter}
            onPointerLeave={handleVideoPointerLeave}
          >
            {videoSrc ? (
              <video
                ref={videoRef}
                id={`${titleId}-video`}
                className={styles.video}
                src={videoSrc}
                poster={posterSrc}
                preload="metadata"
                playsInline
                onClick={() => { void togglePlayback(); }}
                onLoadStart={() => {
                  setCurrentTime(0);
                  setHasMediaError(false);
                }}
                onLoadedMetadata={(event) => {
                  const video = event.currentTarget;
                  setDuration(Number.isFinite(video.duration) ? video.duration : 0);
                  if (videoSrc && video.videoWidth > 0 && video.videoHeight > 0) {
                    setDetectedVideoRatio({ src: videoSrc, ratio: video.videoWidth / video.videoHeight });
                  }
                }}
                onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setHasMediaError(true)}
                aria-label={`${t('player.title')}: ${t(work.titleKey)}`}
              />
            ) : (
              <img className={styles.placeholderPoster} src={posterSrc} alt="" />
            )}

            {videoSrc && (
              <button
                ref={playbackOverlayButtonRef}
                type="button"
                className={styles.playbackOverlay}
                data-visible={isPlaybackOverlayVisible}
                aria-label={isPlaying ? t('player.pause') : t('player.play')}
                aria-controls={`${titleId}-video`}
                aria-hidden={!isPlaybackOverlayVisible}
                aria-pressed={isPlaying}
                tabIndex={isPlaybackOverlayVisible ? 0 : -1}
                disabled={!isOpen || !canControlVideo}
                onFocus={(event) => {
                  if (event.currentTarget.matches(':focus-visible')) {
                    isPlaybackButtonFocusedRef.current = true;
                    setIsPlaybackButtonFocused(true);
                  }
                }}
                onBlur={() => {
                  isPlaybackButtonFocusedRef.current = false;
                  setIsPlaybackButtonFocused(false);
                }}
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15L19 12 7 4.5z" /></svg>
                )}
              </button>
            )}

            <div className={styles.mediaHeading}>
              <h2 id={titleId}>{t(work.titleKey)}</h2>
              <p>{t(work.categoryKey)}</p>
            </div>

            {mediaMessage && (
              <p className={styles.mediaMessage} role="status" aria-live="polite">
                {mediaMessage}
              </p>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              aria-label={t('player.close')}
              disabled={!isOpen}
              onClick={requestClose}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className={styles.controlsDock} role="group" aria-label={t('player.title')}>
            <input
              className={styles.timeline}
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              style={{ '--progress': `${progress}%` } as React.CSSProperties}
              aria-label={t('player.timeline')}
              aria-controls={`${titleId}-video`}
              disabled={!isOpen || !canSeek}
              onChange={handleSeek}
            />

            <div className={styles.controlRow}>
              <div className={styles.transportControls}>
                <button
                  type="button"
                  ref={controlsPlaybackButtonRef}
                  className={`${styles.controlButton} ${styles.playbackControl}`}
                  aria-label={isPlaying ? t('player.pause') : t('player.play')}
                  aria-keyshortcuts="Space"
                  aria-controls={`${titleId}-video`}
                  aria-pressed={isPlaying}
                  disabled={!isOpen || !canControlVideo}
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <svg className={styles.filledIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></svg>
                  ) : (
                    <svg className={styles.filledIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15L19 12 7 4.5z" /></svg>
                  )}
                </button>
                <button
                  type="button"
                  className={`${styles.controlButton} ${styles.skipButton}`}
                  aria-label={t('player.skipBack')}
                  aria-controls={`${titleId}-video`}
                  disabled={!isOpen || !canControlVideo}
                  onClick={() => seekBy(-10)}
                >
                  <svg viewBox="0 0 32 28" aria-hidden="true">
                    <path d="M11 5H5V0M5 5a12 12 0 1 1-1 12" />
                    <text x="10" y="18">10</text>
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${styles.controlButton} ${styles.skipButton}`}
                  aria-label={t('player.skipForward')}
                  aria-controls={`${titleId}-video`}
                  disabled={!isOpen || !canControlVideo}
                  onClick={() => seekBy(10)}
                >
                  <svg viewBox="0 0 32 28" aria-hidden="true">
                    <path d="M21 5h6V0m0 5a12 12 0 1 0 1 12" />
                    <text x="10" y="18">10</text>
                  </svg>
                </button>
              </div>

              <div className={styles.audioControls}>
                <div
                  ref={volumeControlRef}
                  className={styles.volumeControl}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'touch') setIsVolumeSliderOpen(true);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === 'touch') return;
                    const keyboardFocused = volumeControlRef.current?.querySelector(':focus-visible');
                    if (!keyboardFocused) closeVolumeSlider();
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      closeVolumeSlider();
                    }
                  }}
                >
                  <button
                    ref={volumeButtonRef}
                    type="button"
                    className={`${styles.controlButton} ${styles.volumeButton}`}
                    aria-label={t('player.volume')}
                    aria-expanded={isVolumeSliderOpen}
                    aria-controls={volumeSliderId}
                    disabled={!isOpen || !canControlVideo}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(':focus-visible')) setIsVolumeSliderOpen(true);
                    }}
                    onClick={() => setIsVolumeSliderOpen((open) => !open)}
                  >
                    {isMuted || volume === 0 ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 9v6h4l5 4V5L8 9H4zM17 9l5 6m0-6-5 6" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 9v6h4l5 4V5L8 9H4zM16 9a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12" />
                      </svg>
                    )}
                  </button>
                  <div
                    className={styles.volumePopover}
                    data-open={isVolumeSliderOpen}
                    aria-hidden={!isVolumeSliderOpen}
                  >
                    <input
                      id={volumeSliderId}
                      className={styles.volumeSlider}
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={isMuted ? 0 : volume}
                      style={{ '--volume': `${(isMuted ? 0 : volume) * 100}%` } as React.CSSProperties}
                      aria-label={t('player.volume')}
                      aria-controls={`${titleId}-video`}
                      tabIndex={isVolumeSliderOpen ? 0 : -1}
                      disabled={!isOpen || !canControlVideo}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
                <span className={styles.timeReadout} aria-label={t('player.time')}>
                  {formatTime(currentTime)} <span aria-hidden="true">/</span> {formatTime(duration)}
                </span>
                <button
                  type="button"
                  className={styles.controlButton}
                  aria-label={isFullscreen ? t('player.exitFullscreen') : t('player.fullscreen')}
                  aria-pressed={isFullscreen}
                  disabled={!isOpen || !videoSrc}
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 4v4H4m12-4v4h4M4 16h4v4m12-4h-4v4" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
};
