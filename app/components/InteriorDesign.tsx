"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";

export function InteriorDesign() {
  const [activeFilter, setActiveFilter] = useState("Бүгд");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchCurrentX, setTouchCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  const filterButtons = [
    "Бүгд",
    "Гал тогоо",
    "Зочны өрөө",
    "Хүүхдийн өрөө",
    "Унтлагын өрөө",
    "Хүлээлгийн өрөө",
  ];

  const galleryImages = [
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/1.jpg",
      title: "Зочны өрөө 1",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/kitchen/1.jpg",
      title: "Гал тогооны өрөө 1",
      category: "Гал тогоо",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/children_room/1.jpg",
      title: "Хүүхдийн өрөө 1",
      category: "Хүүхдийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/kitchen/2.jpg",
      title: "Гал тогооны өрөө 2",
      category: "Гал тогоо",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/1.jpg",
      title: "Унтлагын өрөө 1",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/2.jpg",
      title: "Унтлагын өрөө 2",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/3.jpg",
      title: "Унтлагын өрөө 3",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/4.jpg",
      title: "Унтлагын өрөө 4",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/5.jpg",
      title: "Унтлагын өрөө 5",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/6.jpg",
      title: "Унтлагын өрөө 6",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/7.jpg",
      title: "Унтлагын өрөө 7",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/8.jpg",
      title: "Унтлагын өрөө 8",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/9.jpg",
      title: "Унтлагын өрөө 9",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/10.jpg",
      title: "Унтлагын өрөө 10",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/bedroom/11.jpg",
      title: "Унтлагын өрөө 11",
      category: "Унтлагын өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/2.jpg",
      title: "Зочны өрөө 2",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/3.jpg",
      title: "Зочны өрөө 3",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/4.jpg",
      title: "Зочны өрөө 4",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/5.jpg",
      title: "Зочны өрөө 5",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/6.jpg",
      title: "Зочны өрөө 6",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/7.jpg",
      title: "Зочны өрөө 7",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/8.jpg",
      title: "Зочны өрөө 8",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/9.jpg",
      title: "Зочны өрөө 9",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/10.jpg",
      title: "Зочны өрөө 10",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/living_room/11.jpg",
      title: "Зочны өрөө 11",
      category: "Зочны өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/waiting_room/1.jpg",
      title: "Хүлээлгийн өрөө 1",
      category: "Хүлээлгийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/waiting_room/2.jpg",
      title: "Хүлээлгийн өрөө 2",
      category: "Хүлээлгийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/waiting_room/3.jpg",
      title: "Хүлээлгийн өрөө 3",
      category: "Хүлээлгийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/waiting_room/4.jpg",
      title: "Хүлээлгийн өрөө 4",
      category: "Хүлээлгийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/children_room/2.jpg",
      title: "Хүүхдийн өрөө 2",
      category: "Хүүхдийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/children_room/3.jpg",
      title: "Хүүхдийн өрөө 3",
      category: "Хүүхдийн өрөө",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/kitchen/3.jpg",
      title: "Гал тогооны өрөө 3",
      category: "Гал тогоо",
    },
    {
      src: "https://pub-6af6c7ad6eb64cf98a65d7fd500730d9.r2.dev/interior/kitchen/4.jpg",
      title: "Гал тогооны өрөө 4",
      category: "Гал тогоо",
    },
  ];

  // Filter images based on selected category and show all state
  const getFilteredImages = () => {
    let filtered =
      activeFilter === "Бүгд"
        ? galleryImages
        : galleryImages.filter(
            (image) => image.category === activeFilter,
          );

    // If "Бүгд" is selected and showAllImages is false, limit to 6 images
    if (activeFilter === "Бүгд" && !showAllImages) {
      filtered = filtered.slice(0, 6);
    }

    return filtered;
  };

  const filteredImages = getFilteredImages();
  const totalImages = galleryImages.length;
  const remainingImages = totalImages - 6;

  // Reset showAllImages when filter changes
  useEffect(() => {
    setShowAllImages(false);
  }, [activeFilter]);

  // Handle opening gallery with specific image
  const handleImageClick = (imageIndex: number) => {
    // If this is the 6th image in "Бүгд" mode and not showing all images, expand instead
    if (
      activeFilter === "Бүгд" &&
      !showAllImages &&
      imageIndex === 5
    ) {
      setShowAllImages(true);
      return;
    }

    const actualIndex =
      activeFilter === "Бүгд" && showAllImages
        ? imageIndex
        : activeFilter === "Бүгд"
          ? imageIndex
          : galleryImages.findIndex(
              (img) => img === filteredImages[imageIndex],
            );
    setCurrentImageIndex(actualIndex);
    setIsGalleryOpen(true);
  };

  // Navigation functions - instant transition for Facebook-style experience
  const goToNext = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % galleryImages.length,
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + galleryImages.length) %
        galleryImages.length,
    );
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") setIsGalleryOpen(false);
  };

  // Enhanced touch navigation with drag preview
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchCurrentX(touch.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX || !isDragging) return;

    const touch = e.touches[0];
    setTouchCurrentX(touch.clientX);

    const offset = touch.clientX - touchStartX;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchCurrentX || !isDragging) return;

    const distance = touchStartX - touchCurrentX;
    const threshold = 100; // Minimum distance to trigger navigation

    // Reset touch state immediately
    setTouchStartX(0);
    setTouchCurrentX(0);
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swiped left - go to next image
        goToNext();
      } else {
        // Swiped right - go to previous image
        goToPrevious();
      }
    }
  };

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGalleryOpen]);

  // Get adjacent images for sliding effect
  const getPreviousImageIndex = () => {
    return (
      (currentImageIndex - 1 + galleryImages.length) %
      galleryImages.length
    );
  };

  const getNextImageIndex = () => {
    return (currentImageIndex + 1) % galleryImages.length;
  };

  const currentImage = galleryImages[currentImageIndex];
  const previousImage = galleryImages[getPreviousImageIndex()];
  const nextImage = galleryImages[getNextImageIndex()];

  // Calculate transform based on drag offset
  const getTransform = (
    position: "previous" | "current" | "next",
  ) => {
    // Check if window is available (client-side only)
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let baseOffset = 0;

    if (position === "previous") baseOffset = -screenWidth;
    if (position === "next") baseOffset = screenWidth;

    return baseOffset + dragOffset;
  };

  return (
    <section id="дизайн" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-4">
            Интерьер шийдэл
          </h2>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Таны амьдралын хэв маягт тохирсон орчин үеийн
            интерьер шийдлүүд.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => {
              const isLastImageInLimitedView =
                activeFilter === "Бүгд" &&
                !showAllImages &&
                index === 5;

              return (
                <motion.div
                  key={`${image.category}-${index}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border cursor-pointer"
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Regular hover overlay */}
                    {!isLastImageInLimitedView && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                            <ZoomIn className="w-6 h-6 text-gray-800" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Special overlay for the 6th image in limited view */}
                    {isLastImageInLimitedView && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <div className="flex items-center space-x-2 text-gray-800">
                            <Plus className="w-6 h-6" />
                            <span className="text-xl font-medium">
                              {remainingImages}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image overlay info - only title */}
                    {!isLastImageInLimitedView && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-sm font-medium">
                          {image.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-2">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <p className="text-muted-foreground">
              Энэ ангилалд зураг байхгүй байна.
            </p>
          </div>
        )}

        {/* Full-Screen Gallery Modal with Sliding Effect */}
        <Dialog
          open={isGalleryOpen}
          onOpenChange={setIsGalleryOpen}
        >
          <DialogContent
            className="!max-w-none !h-screen !w-screen !top-0 !left-0 !translate-x-0 !translate-y-0 !transform-none p-0 border-0 bg-black/95 !rounded-none !inset-0 !fixed [&>button]:hidden"
            onKeyDown={handleKeyDown}
          >
            <VisuallyHidden>
              <DialogTitle>
                Интерьер галерей - {currentImage?.title}
              </DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <DialogDescription>
                Интерьер дизайныг full-screen режимд харах
              </DialogDescription>
            </VisuallyHidden>
            <div className="relative w-full h-full overflow-hidden">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={() => setIsGalleryOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Previous Button - Hidden on mobile for Facebook-style experience */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full hidden sm:flex"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              {/* Next Button - Hidden on mobile for Facebook-style experience */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full hidden sm:flex"
                onClick={goToNext}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              {/* Sliding Image Container */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: "pan-y pinch-zoom" }}
              >
                {/* Previous Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-0 sm:p-16"
                  style={{
                    transform: `translateX(${getTransform("previous")}px)`,
                    transition: "none",
                  }}
                >
                  <div className="relative w-full h-full sm:max-w-[80vw] sm:max-h-[70vh]">
                    <ImageWithFallback
                      src={previousImage?.src}
                      alt={previousImage?.title || ""}
                      className="w-full h-full object-contain sm:rounded-lg select-none"
                      style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Current Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-0 sm:p-16"
                  style={{
                    transform: `translateX(${getTransform("current")}px)`,
                    transition: "none",
                  }}
                >
                  <div className="relative w-full h-full sm:max-w-[80vw] sm:max-h-[70vh]">
                    <ImageWithFallback
                      src={currentImage?.src}
                      alt={currentImage?.title || ""}
                      className="w-full h-full object-contain sm:rounded-lg select-none"
                      style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Next Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-0 sm:p-16"
                  style={{
                    transform: `translateX(${getTransform("next")}px)`,
                    transition: "none",
                  }}
                >
                  <div className="relative w-full h-full sm:max-w-[80vw] sm:max-h-[70vh]">
                    <ImageWithFallback
                      src={nextImage?.src}
                      alt={nextImage?.title || ""}
                      className="w-full h-full object-contain sm:rounded-lg select-none"
                      style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Image Info - only show on desktop for Facebook-style mobile experience */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white bg-black/50 backdrop-blur-sm rounded-lg px-6 py-4 max-w-md hidden sm:block">
                <h3 className="text-lg font-medium mb-2">
                  {currentImage?.title}
                </h3>
                <div className="text-xs text-white/60">
                  {currentImageIndex + 1} /{" "}
                  {galleryImages.length}
                </div>
              </div>

              {/* Mobile counter - minimal Facebook-style */}
              <div className="absolute top-4 left-4 text-white bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm sm:hidden">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>

              {/* Swipe Indicator for Mobile - Only show when there are multiple images and not dragging */}
              {galleryImages.length > 1 && !isDragging && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs text-center sm:hidden">
                  ← Swipe to navigate →
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}