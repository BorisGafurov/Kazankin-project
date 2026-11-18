import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { WorkCase } from '@/entities/work/model/types';
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

export const WorkVideoPlayer: React.FC<WorkVideoPlayerProps> = ({
  work,
  isOpen,
  onClose,
  onCloseComplete,
}) => {
  const { t } = useI18n();
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const playerFrameRef = useRef<HTMLDivElement>(null);
  const [audioPreferences, setAudioPreferences] = useState<AudioPreferences>(readAudioPreferences);
  const { volume, isMuted } = audioPreferences;
  const lastVolumeRef = useRef(audioPreferences.lastVolume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasMediaError, setHasMediaError] = useState(false);

  const videoSrc = work?.videoSrc ? resolveAssetUrl(work.videoSrc) : undefined;
  const posterSrc = work ? resolveAssetUrl(work.imageSrc) : undefined;
  const canControlVideo = Boolean(videoSrc) && !hasMediaError;
  const canSeek = canControlVideo && duration > 0;
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  useEffect(() => {
    try {
      window.localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(audioPreferences));
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
  }, [audioPreferences]);

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
    setHasMediaError(false);
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
    videoRef.current?.pause();
    setIsPlaying(false);
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
        <div ref={playerFrameRef} className={styles.playerFrame}>
          <div className={styles.videoViewport}>
            {videoSrc ? (
              <video
                ref={videoRef}
                id={`${titleId}-video`}
                className={styles.video}
                src={videoSrc}
                poster={posterSrc}
                preload="metadata"
                playsInline
                onLoadStart={() => {
                  setCurrentTime(0);
                  setHasMediaError(false);
                }}
                onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
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
                  className={styles.controlButton}
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
                <button
                  type="button"
                  className={styles.controlButton}
                  aria-label={isMuted || volume === 0 ? t('player.unmute') : t('player.mute')}
                  aria-keyshortcuts="M"
                  aria-pressed={isMuted || volume === 0}
                  disabled={!isOpen || !canControlVideo}
                  onClick={toggleMute}
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
                <input
                  className={styles.volumeSlider}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  style={{ '--volume': `${(isMuted ? 0 : volume) * 100}%` } as React.CSSProperties}
                  aria-label={t('player.volume')}
                  aria-controls={`${titleId}-video`}
                  disabled={!isOpen || !canControlVideo}
                  onChange={handleVolumeChange}
                />
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
