'use client';

import { ReactNode, VideoHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

type OverlayLevel = 'light' | 'medium' | 'dark' | 'none';
type ContentAlign = 'top' | 'center' | 'bottom' | 'between';

interface BackgroundImageSectionProps {
  children: ReactNode;

  imageUrl?: string;

  videoSrc?: string;
  videoPoster?: string;
  videoAttributes?: VideoHTMLAttributes<HTMLVideoElement>;
  videoClassName?: string;

  className?: string;
  overlayClassName?: string;
  containerClassName?: string;

  enableParallax?: boolean; // images only
  overlayOpacity?: OverlayLevel;

  aspectRatio?: `${number}/${number}` | number;
  minHeightClassName?: string; // e.g. 'min-h-[70vh]'

  /** Vertical layout for content */
  contentAlign?: ContentAlign; // 'top' | 'center' | 'bottom' | 'between'
}

export function BackgroundImageSection({
  children,
  imageUrl,
  videoSrc,
  videoPoster,
  videoAttributes,
  videoClassName,
  className,
  overlayClassName,
  containerClassName,
  enableParallax = false,
  overlayOpacity = 'medium',
  aspectRatio,
  minHeightClassName,
  contentAlign = 'top',
}: BackgroundImageSectionProps) {
  const [detectedRatio, setDetectedRatio] = useState<number | undefined>();

  const getOverlayClass = () => {
    switch (overlayOpacity) {
      case 'light':
        return 'bg-black/20 dark:bg-black/40';
      case 'medium':
        return 'bg-black/40 dark:bg-black/60';
      case 'dark':
        return 'bg-black/60 dark:bg-black/80';
      case 'none':
        return '';
      default:
        return 'bg-black/40 dark:bg-black/60';
    }
  };

  const alignClasses = (() => {
    switch (contentAlign) {
      case 'center':
        return 'items-center justify-center';
      case 'bottom':
        return 'items-center justify-end';
      case 'between':
        return 'items-stretch justify-between';
      case 'top':
      default:
        return 'items-center justify-start';
    }
  })();

  const hasMedia = Boolean(imageUrl || videoSrc);
  const useAspect = aspectRatio ?? detectedRatio;

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden', // create a clean stacking context
        'flex flex-col', // so content can center
        minHeightClassName, // e.g. 'min-h-[70vh]' or 'min-h-screen'
        imageUrl && !videoSrc && 'bg-cover bg-center bg-no-repeat',
        imageUrl && !videoSrc && enableParallax && 'bg-fixed',
        className
      )}
      style={
        imageUrl && !videoSrc
          ? { backgroundImage: `url(${imageUrl})` }
          : undefined
      }
    >
      {videoSrc && (
        <div className="absolute inset-0 -z-10">
          <video
            aria-hidden="true"
            className="h-full w-full object-cover pointer-events-none"
            src={videoSrc}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ minHeight: '100%', minWidth: '100%' }}
          />
        </div>
      )}

      {hasMedia && overlayOpacity !== 'none' && (
        <div
          className={cn(
            'absolute inset-0 z-10',
            getOverlayClass(),
            overlayClassName
          )}
        />
      )}

      {/* Content fills the section height, then we align it */}
      <div
        className={cn(
          'relative z-20 flex w-full flex-1',
          alignClasses,
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
