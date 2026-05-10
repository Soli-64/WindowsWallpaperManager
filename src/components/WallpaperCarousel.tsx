import React from "react";
import { convertFileSrc } from "@tauri-apps/api/core";
import { useDragScroll } from "../hooks/useDragScroll";

interface CarouselItem {
  name: string;
  path: string;
  thumb_path: string;
  is_video: boolean;
}

interface WallpaperCarouselProps {
  items: CarouselItem[];
  onWallpaperClick: (item: CarouselItem) => void;
}

export const WallpaperCarousel: React.FC<WallpaperCarouselProps> = ({ items, onWallpaperClick }) => {
  const { scrollRef, isDragging, scrollHandlers } = useDragScroll();

  return (
    <div 
      className="scroll-area" 
      ref={scrollRef} 
      {...scrollHandlers}
    >
      <div className="carousel">
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              onWallpaperClick(item);
            }}
          >
            <img 
              src={convertFileSrc(item.thumb_path)} 
              alt={item.name} 
              className="thumbnail-img"
              draggable={false}
            />
            {item.is_video && (
              <div className="video-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white" opacity="0.8">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
