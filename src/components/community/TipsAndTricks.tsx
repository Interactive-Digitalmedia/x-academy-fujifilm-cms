import React, { useEffect, useState } from "react";
import {
  Camera,
  CameraIcon,
  Sun,
  Layers,
  Cloud,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, any> = {
  camera: Camera,
  "star-camera": CameraIcon,
  sun: Sun,
  layers: Layers,
  cloud: Cloud,
};

const TipsAndTricks: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tips_templates") || "[]");
    setTemplates(saved);
  }, []);

  return (
    <div className="p-0 bg-white text-black  mx-auto">
      <Accordion type="single" collapsible className="space-y-0">
        {templates.map((template, idx) => (
          <AccordionItem
            value={`item-${idx}`}
            key={idx}
            className="border-b last:border-b-0"
          >
            <AccordionTrigger className="py-4 px-2 transition flex items-center justify-between w-full text-left text-lg font-semibold group">
              <span className="flex items-center gap-2">
                <span className="text-gray-500">{idx + 1}.</span>
                {template.templateName}
              </span>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-4 space-y-3 text-sm text-gray-700">
              {template.sections.map((sec: any, i: number) => {
                return (
                  <div key={i} className="space-y-2">
                    {/* Title Label */}
                    <label className="text-sm text-gray-600 font-medium">
                      {i + 1}. Title
                    </label>

                    {/* Title Input + Icon Selector */}
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={sec.title}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm border rounded-md bg-white text-gray-800"
                      />
                      <div className="flex items-center w-40 gap-2">
                        <label className="text-sm text-gray-500">Icon</label>
                        <div className="relative w-full">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-gray-900">
                            {React.createElement(iconMap[sec.icon] || Camera, {
                              size: 16,
                            })}
                          </div>

                          <select
                            disabled
                            value={sec.icon}
                            className="appearance-none pl-8 pr-6 py-2 w border w-full text-sm rounded-md bg-white text-gray-800"
                          >
                            {Object.keys(iconMap).map((iconKey) => (
                              <option key={iconKey} value={iconKey}>
                                {/* {iconKey} */}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Description Label */}
                    <label className="text-sm text-gray-600 font-medium">
                      Description
                    </label>
                    <textarea
                      value={sec.description}
                      readOnly
                      rows={3}
                      className="w-full px-3 py-2 text-sm border rounded-md bg-white text-gray-800 resize-none"
                    />
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TipsAndTricks;
