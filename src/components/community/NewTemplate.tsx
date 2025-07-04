import React, { useState } from "react";
import {
  Sun,
  Layers,
  ChevronDown,
  Camera,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// SVG Icon Wrapper
const SvgIcon: React.FC<{ src: string; size?: number }> = ({ src, size = 24 }) => (
  <img src={src} alt="icon" width={size} height={size} />
);

// Icon Options
const icons = [
  {
    label: "Camera 1",
    value: "camera1",
    icon: () => <SvgIcon src="/banner/icons/camera1.svg" />,
  },
  {
    label: "Camera 2",
    value: "camera2",
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
      <label className="block text-sm font-medium text-gray-600">Icon</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-[40px] flex justify-between items-center px-3 rounded-md border border-gray-200"
          >
            <div className="flex items-center gap-2">
              {selected ? (
                <selected.icon />
              ) : (
                <DefaultIcon size={20} />
              )}
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
                className={`p-2 rounded-lg hover:bg-accent transition ${
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

const NewTemplate: React.FC = () => {
  const sections = [1, 2, 3, 4, 5];
  const [templateName, setTemplateName] = useState("");
  const [iconValues, setIconValues] = useState<Record<number, string>>({});
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});

  const handleSave = () => {
    const templateData = {
      templateName,
      sections: sections.map((i) => ({
        title: titles[i] || "",
        icon: iconValues[i] || "",
        description: descriptions[i] || "",
      })),
    };

    const existing = JSON.parse(localStorage.getItem("tips_templates") || "[]");
    localStorage.setItem(
      "tips_templates",
      JSON.stringify([...existing, templateData])
    );
    alert("Template saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      {/* Template Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Template name
        </label>
        <Input
          type="text"
          placeholder="Eg: Camera Gear"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>

      {/* Sections */}
      {sections.map((item, index) => (
        <div key={index} className="">
          {/* Title and Icon */}
          <div className="flex items-start justify-between mb-2 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {item}. Title
              </label>
              <Input
                type="text"
                placeholder="Query"
                className="w-full"
                value={titles[item] || ""}
                onChange={(e) =>
                  setTitles((prev) => ({ ...prev, [item]: e.target.value }))
                }
              />
            </div>
            <div className="w-40 rounded">
              <IconPicker
                selectedIcon={iconValues[item] || ""}
                onChange={(val) =>
                  setIconValues((prev) => ({ ...prev, [item]: val }))
                }
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <Textarea
              placeholder="Sample"
              rows={3}
              className="w-full"
              value={descriptions[item] || ""}
              onChange={(e) =>
                setDescriptions((prev) => ({
                  ...prev,
                  [item]: e.target.value,
                }))
              }
            />
          </div>
        </div>
      ))}
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          className="px-10 rounded-md bg-blue-500 text-white hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default NewTemplate;
