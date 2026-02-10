"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProjectBanner({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");

  // Get images from files array, fallback to banner if files is empty
  const images =
    product?.attributes?.files?.data ||
    (product?.attributes?.banner?.data ? [product.attributes.banner.data] : []);

  // Create infinite array for smooth carousel
  const infiniteImages = [...images, ...images, ...images]; // Triple the array for infinite effect
  const startIndex = images.length; // Start from middle section

  const nextImage = () => {
    if (images.length <= 1) return;
    setSlideDirection("right");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = prev + 1;
        // Reset to middle section when reaching end
        if (newIndex >= images.length * 2) {
          return startIndex;
        }
        return newIndex;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setSlideDirection("left");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = prev - 1;
        // Reset to middle section when reaching beginning
        if (newIndex < 0) {
          return startIndex + images.length - 1;
        }
        return newIndex;
      });
      setIsTransitioning(false);
    }, 300);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [images.length]);

  // Reset to middle section when product changes
  useEffect(() => {
    setCurrentImageIndex(startIndex);
  }, [product?.id, startIndex]);

  if (!product) {
    return (
      <div className="flex items-center justify-around">
        <div className="w-[350px] h-[400px] rounded-lg bg-slate-300 animate-pulse"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-around">
        <div className="w-[350px] h-[400px] rounded-lg bg-slate-300 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  // Calculate actual image index for display
  const actualImageIndex = currentImageIndex % images.length;
  const currentImage = images[actualImageIndex];

  return (
    <div className="flex items-center justify-around relative">
      <div className="relative w-[350px] h-[400px] rounded-lg overflow-hidden">
        {/* Infinite Carousel Container */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 350}px)`,
            width: `${infiniteImages.length * 350}px`,
          }}
        >
          {infiniteImages.map((image, index) => {
            const actualIndex = index % images.length;
            const imageData = images[actualIndex];

            return (
              <div
                key={`${imageData?.id}-${index}`}
                className="w-[350px] h-[400px] flex-shrink-0"
              >
                <Image
                  src={imageData?.attributes?.url}
                  alt={
                    imageData?.attributes?.alternativeText ||
                    `Product image ${actualIndex + 1}`
                  }
                  width={350}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                  priority={Math.abs(index - currentImageIndex) <= 1} // Preload adjacent images
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
            {actualImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 translate-y-full mt-8 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                const direction = index > actualImageIndex ? "right" : "left";
                setSlideDirection(direction);
                setIsTransitioning(true);
                setTimeout(() => {
                  // Calculate the target index in the infinite array
                  const targetIndex = startIndex + index;
                  setCurrentImageIndex(targetIndex);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === actualImageIndex
                  ? "border-quaternary scale-110"
                  : "border-gray-300 hover:border-quaternary"
              }`}
            >
              <Image
                src={image?.attributes?.url}
                alt={`Thumbnail ${index + 1}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectBanner;
