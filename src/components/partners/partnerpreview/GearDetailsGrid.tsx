// components/GearDetailsGrid.tsx
import React from "react";
import { ExternalLink } from "lucide-react";

interface GearItem {
  name: string;
  image: string;
  link: string;
}

interface GearDetailsGridProps {
  gear: GearItem[];
}

const GearDetailsGrid: React.FC<GearDetailsGridProps> = ({ gear }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gear.map((item, index) => (
        <div
          key={index}
          className="flex h-full flex-col justify-between card p-4"
        >
          <div>
            <div className="mb-4 rounded-lg bg-white p-2">
              <img
                src={item.image}
                alt={item.name}
                className="mx-auto h-32 object-contain"
              />
            </div>
            <p className="mb-4 text-sm font-medium leading-snug dark:text-white min-h-[48px]">
              {item.name}
            </p>
          </div>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center normal-btn px-4 py-2 text-sm font-medium text-white hover:bg-[#007DD6] transition"
          >
            View Product <ExternalLink size={14} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default GearDetailsGrid;
