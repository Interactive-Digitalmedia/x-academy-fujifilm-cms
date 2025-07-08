import React from "react";
import {
  Camera,
  CameraIcon,
  Sun,
  Layers,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TipsAndTricksType } from "@/types";

// SVG Icon Renderer
const SvgIcon: React.FC<{ src: string; size?: number }> = ({
  src,
  size = 16,
}) => <img src={src} alt="icon" width={size} height={size} />;

// Lucide icon mapping
const iconMap: Record<string, any> = {
  camera: Camera,
  "star-camera": CameraIcon,
  sun: Sun,
  layers: Layers,
};

// Custom SVG icon mapping
const customIconMap: Record<string, string> = {
  camera1: "/banner/icons/camera1.svg",
  camera2: "/banner/icons/camera2.svg",
  cloud: "/banner/icons/cloud.svg",
};

interface TipsAndTricksProps {
  templates?: TipsAndTricksType[];
  onEditTemplate?: (template: TipsAndTricksType) => void;
}
const TipsAndTricks: React.FC<TipsAndTricksProps> = ({
  templates,
  onEditTemplate,
}) => {
  return (
    <div className="p-0 bg-white text-black mx-auto">
      <Accordion type="single" collapsible className="space-y-0">
        {templates?.map((template, idx) => (
          <AccordionItem
            value={`item-${idx}`}
            key={idx}
            className="border-b last:border-b-0"
          >
            <AccordionTrigger className="py-4 px-2 transition flex items-center justify-between w-full text-left text-lg font-semibold group">
              <span className="flex items-center gap-2">
                <span className="text-gray-500">{idx + 1}.</span>
                {template?.name}
              </span>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-4 space-y-6 text-sm text-gray-700">
              {/* ✅ Additional Controls inside each accordion */}
              <div className="space-y-4 ">
                <h2 className="text-md font-semibold text-gray-700">
                  Additional Controls
                </h2>

                {/* <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    Make Default Template
                  </label>
                  <Switch
                    isSelected={template.default || false}
                    onChange={() => console.log("toggled")}
                  />
                </div> */}

                <div className="flex gap-3">
                  {/* <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md text-gray-700 hover:bg-gray-50">
                    <Pencil size={14} />
                    Edit Name
                  </button> */}
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => onEditTemplate?.(template)}
                  >
                    <Pencil size={14} />
                    Edit Template
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-500 rounded-md hover:bg-red-50">
                    <Trash2 size={14} />
                    Delete Template
                  </button>
                </div>
              </div>

              {/* Section Fields */}
              {template?.items?.map((sec: any, i: number) => (
                <div key={i} className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">
                    {i + 1}. Title
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={sec.title}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm border rounded-md bg-white text-gray-800 outline-none"
                    />
                    <div className="flex items-center w-40 gap-2">
                      <label className="text-sm text-gray-500">Icon</label>
                      <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-gray-900">
                          {customIconMap[sec.icon] ? (
                            <SvgIcon src={customIconMap[sec.icon]} size={20} />
                          ) : (
                            React.createElement(iconMap[sec.icon] || Camera, {
                              size: 20,
                            })
                          )}
                        </div>
                        <select
                          disabled
                          value={sec.icon}
                          className="appearance-none pl-8 pr-6 py-2 w-full text-sm rounded-md bg-white text-gray-800 border outline-none"
                        >
                          {[
                            ...Object.keys(iconMap),
                            ...Object.keys(customIconMap),
                          ].map((iconKey) => (
                            <option key={iconKey} value={iconKey}></option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <label className="text-sm text-gray-600 font-medium">
                    Description
                  </label>
                  <textarea
                    value={sec.description}
                    readOnly
                    rows={3}
                    className="w-full px-3 py-2 text-sm border rounded-md bg-white text-gray-800 resize-none outline-none"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TipsAndTricks;
