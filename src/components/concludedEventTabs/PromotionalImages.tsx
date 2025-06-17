import React from "react";

interface PromotionalImagesProps {
  images: string[];
}

const PromotionalImages: React.FC<PromotionalImagesProps> = ({ images }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 px-1 pt-2">
      {images.map((img, index) => (
        <div
          key={index}
          className="mb-4 break-inside-avoid overflow-hidden rounded-xl"
        >
          <img
            src={img}
            alt={`promo-${index}`}
            className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default PromotionalImages;
