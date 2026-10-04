import React from 'react';

interface VideoBackgroundProps {
  /**
   * Video file URL. THE ONE-LINE SWAP: set this to enable the video
   * background, e.g. src="/hero-video.mp4" (drop the file in public/).
   * When omitted, the cinematic image fallback renders instead.
   */
  src?: string;
  /** Fallback image — also used as the <video> poster attribute. */
  poster?: string;
  className?: string;
  /** Set false to remove the default cinematic overlay. */
  overlay?: boolean;
}

/**
 * Full-bleed background layer for the hero. Renders a muted, looping,
 * autoplaying <video> when `src` is provided; otherwise falls back to a
 * slow ken-burns still image so the hero looks intentional with zero
 * video assets. Brand overlay (dark gradients + red glow) keeps text
 * readable in both modes.
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  poster,
  className = '',
  overlay = true,
}) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    {src ? (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ) : (
      poster && (
        <img
          src={poster}
          alt=""
          fetchPriority="high"
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
      )
    )}
    {overlay && (
      <>
        {/* readability: dark from the bottom where copy sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        {/* readability: dark from the left on wide screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        {/* brand glow */}
        <div className="absolute -bottom-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />
      </>
    )}
  </div>
);

export default VideoBackground;
