import React, { useEffect, useRef } from 'react';

interface WistiaPlayerProps {
  mediaId: string;
  onTimeUpdate?: (time: number) => void;
  className?: string;
}

export const WistiaPlayer: React.FC<WistiaPlayerProps> = ({ 
  mediaId, 
  onTimeUpdate, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Wistia scripts
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = `https://fast.wistia.com/embed/${mediaId}.js`;
    script2.async = true;
    script2.type = 'module';
    document.head.appendChild(script2);

    // Add CSS for placeholder
    const style = document.createElement('style');
    style.textContent = `
      wistia-player[media-id='${mediaId}']:not(:defined) {
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
        display: block;
        filter: blur(5px);
        padding-top: 56.25%;
      }
    `;
    document.head.appendChild(style);

    // Setup time tracking when player is ready
    if (onTimeUpdate) {
      const checkForPlayer = () => {
        const player = (window as any).Wistia?.api(mediaId);
        if (player) {
          player.bind('secondchange', (seconds: number) => {
            onTimeUpdate(seconds);
          });
        } else {
          setTimeout(checkForPlayer, 500);
        }
      };
      
      setTimeout(checkForPlayer, 1000);
    }

    return () => {
      // Cleanup scripts and styles on unmount
      try {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
        document.head.removeChild(style);
      } catch (e) {
        // Scripts may have already been removed
      }
    };
  }, [mediaId, onTimeUpdate]);

  return (
    <div ref={containerRef} className={`video-container ${className}`}>
      <wistia-player 
        media-id={mediaId}
        seo="false"
        aspect="1.7777777777777777"
      />
    </div>
  );
};