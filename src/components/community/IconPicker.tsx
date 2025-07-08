import React from "react";
import { Sun, Layers, ChevronDown, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// SVG Icon Wrapper
const SvgIcon: React.FC<{ src: string; size?: number }> = ({
  src,
  size = 24,
}) => <img src={src} alt="icon" width={size} height={size} />;

// Icon Options
const icons = [
  {
    label: "Camera 1",
    value: "camera",
    icon: () => <SvgIcon src="/banner/icons/camera1.svg" />,
  },
  {
    label: "Camera 2",
    value: "starCamera",
    icon: () => <SvgIcon src="/banner/icons/camera2.svg" />,
  },
  { label: "Sun", value: "sun", icon: () => <Sun size={24} /> },
  { label: "Layers", value: "layers", icon: () => <Layers size={24} /> },
  {
    label: "Cloud",
    value: "cloud",
    icon: () => <SvgIcon src="/banner/icons/cloud.svg" />,
  },
];

const IconPicker: React.FC<{
  selectedIcon: string;
  onChange: (val: string) => void;
}> = ({ selectedIcon, onChange }) => {
  const selected = icons.find((i) => i.value === selectedIcon);
  const DefaultIcon = Camera;

  return (
    <div className="space-y-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-[40px] flex justify-between items-center px-3 rounded-md border border-gray-200"
          >
            <div className="flex items-center gap-2">
              {selected ? <selected.icon /> : <DefaultIcon size={20} />}
            </div>
            <ChevronDown size={18} className="text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <div className="font-semibold text-gray-500 mb-1">Choose Icon</div>
          <div className="grid grid-cols-5 gap-4">
            {icons.map((item) => (
              <button
                key={item.value}
                onClick={() => onChange(item.value)}
                className={`p-2 rounded-lg transition ${
                  selectedIcon === item.value
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                <item.icon />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IconPicker;
