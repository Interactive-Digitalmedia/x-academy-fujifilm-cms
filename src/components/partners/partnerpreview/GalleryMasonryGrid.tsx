// components/GalleryMasonryGrid.tsx
import React from "react";

interface GalleryMasonryGridProps {
  images: string[];
}

const GalleryMasonryGrid: React.FC<GalleryMasonryGridProps> = ({ images }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl break-inside-avoid"
        >
          <img
            src={img}
            alt={`gallery-${index}`}
            className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryMasonryGrid;
