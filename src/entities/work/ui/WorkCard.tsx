import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { WorkCase, getWorkImageSrc } from '../model/types';
import { useI18n } from '@/shared/lib/i18n';
import styles from './WorkCard.module.css';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export interface WorkCardProps {
  work: WorkCase;
  index: number;
  isActive: boolean;
  isSelected: boolean;
  shouldPreloadPreview: boolean;
  pausePreview: boolean;
  onPreviewIntent: (index: number) => void;
  onPreviewPlaying: (index: number) => void;
  onClick: () => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  work,
  index,
  isActive,
  isSelected,
  shouldPreloadPreview,
  pausePreview,
  onPreviewIntent,
  onPreviewPlaying,
  onClick,
}) => {
  const { t, lang } = useI18n();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const title = t(work.titleKey);
  const imageSrc = `${import.meta.env.BASE_URL}${getWorkImageSrc(work, lang).replace(/^\/+/, '')}`;
  const previewVideoSrc = work.previewVideoSrc;
  const shouldPlayPreview = Boolean(previewVideoSrc)
    && !pausePreview
    && !prefersReducedMotion
    && (isHovered || isFocused || isSelected);
  const isPreviewVisible = shouldPlayPreview && isPreviewPlaying;

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!previewVideoSrc || !shouldPlayPreview) {
      video?.pause();
      if (video && video.readyState > 0) {
        try {
          video.currentTime = 0;
        } catch {
          // A browser may not have initialized the media timeline yet.
        }
      }
      setIsPreviewPlaying(false);
      return;
    }

    onPreviewIntent(index);
    if (!shouldPreloadPreview || !video) return;

    void video.play().catch(() => setIsPreviewPlaying(false));
  }, [
    index,
    onPreviewIntent,
    previewVideoSrc,
    shouldPlayPreview,
    shouldPreloadPreview,
  ]);

  return (
    <button
      id={`work-card-${work.id}`}
      type="button"
      className={clsx(styles.card, isActive && styles.activeCard)}
      onClick={onClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={`${title} — ${t(work.categoryKey)}. ${t('works.openPlayer')}`}
      aria-pressed={isActive}
      data-work-index={index}
    >
      <span className={styles.poster}>
        <img
          src={imageSrc}
          alt=""
          width="850"
          height="1050"
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {previewVideoSrc && (
          <video
            ref={previewVideoRef}
            className={styles.previewVideo}
            src={shouldPreloadPreview ? previewVideoSrc : undefined}
            poster={imageSrc}
            preload={shouldPreloadPreview ? 'auto' : 'none'}
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            data-visible={isPreviewVisible}
            onPlaying={() => {
              setIsPreviewPlaying(true);
              onPreviewPlaying(index);
            }}
            onPause={() => setIsPreviewPlaying(false)}
            onWaiting={() => setIsPreviewPlaying(false)}
            onError={() => setIsPreviewPlaying(false)}
          />
        )}
        <span className={styles.playIndicator} data-preview-playing={isPreviewVisible} aria-hidden="true" />
      </span>
      <span className={styles.info}>
        <span className={styles.title} data-sand-target="true">{title}</span>
        <span className={styles.category} data-sand-target="true">
          {t(work.categoryKey)}
        </span>
      </span>
    </button>
  );
};
