"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSlider() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // For demo purposes, using a sample video URL. Replace with your actual video URL
  const videoSrc =
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
  const posterImage =
    "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/exterior/facade/16.jpg";

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Reset error state when component mounts
  useEffect(() => {
    setVideoError(false);
    setVideoLoaded(false);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {!videoError ? (
          <>
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={posterImage}
              preload="metadata"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            {!videoLoaded && (
              <ImageWithFallback
                src={posterImage}
                alt="Luxury Living Redefined"
                className="w-full h-full object-cover"
              />
            )}
          </>
        ) : (
          <ImageWithFallback
            src={posterImage}
            alt="Luxury Living Redefined"
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay for better content readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}