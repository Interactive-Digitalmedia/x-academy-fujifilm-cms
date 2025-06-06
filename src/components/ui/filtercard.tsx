import React from "react";
import { ChevronDown } from "lucide-react";

interface FilterSection {
  heading: string;
  key: string;
  type: "button-group" | "dropdown";
  options?: string[];
}

interface PartnerFilterCardProps {
  title?: string;
  onReset?: () => void;
  onClose?: () => void;
  onChange: (key: string, value: string) => void;
  sections: FilterSection[];
}

const FilterCard: React.FC<PartnerFilterCardProps> = ({
  title = "Filters",
  onReset,
  onClose,
  sections,
}) => {
  return (
    <div className="w-full max-w-xs border rounded-xl bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onReset || onClose} className="text-sm underline">
          Reset all filters
        </button>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm font-semibold mb-2">{section.heading}</p>

          {section.type === "button-group" && (
            <div className="flex flex-wrap gap-2">
              {section.options?.map((option) => (
                <button
                  key={option}
                  className="bg-muted text-sm px-3 py-1 rounded-full hover:bg-gray-200"
                  onClick={() => onChange(section.key, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {section.type === "dropdown" && (
            <div className="relative">
              <select
                className="w-full px-3 py-2 border rounded text-sm"
                onChange={(e) => onChange(section.key, e.target.value)}
              >
                <option value="">Select</option>
                {section.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
