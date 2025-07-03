import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash2 } from "lucide-react";

const HelpandSupport: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("help_support_templates") || "[]"
    );
    setTemplates(saved);
  }, []);

  return (
    <div className="bg-white text-black mx-auto">
      <Accordion type="single" collapsible className="space-y-0 ">
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

            <AccordionContent className="px-4 sm:px-6 pb-6 space-y-6 text-sm text-gray-700">
              {/* Controls */}
              <div className="space-y-4">
                <h2 className="text-md font-semibold text-gray-700">
                  Additional Controls
                </h2>

                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md text-gray-700 hover:bg-gray-50">
                    <Pencil size={14} />
                    Edit Name
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md text-gray-700 hover:bg-gray-50">
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
              {template.sections.map((sec: any, i: number) => (
                <div key={i} className="space-y-1">
                  {/* Question Label with Delete Icon */}
                  <div className="flex items-center gap-1">
                    <label className="text-sm text-gray-600 font-medium ">
                      {i + 1}. Question
                    </label>
                    <Trash2 className="text-red-500 cursor-pointer" size={14} />
                  </div>
                  <input
                    type="text"
                    value={sec.title || sec.question || ""}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-md bg-white text-gray-800"
                  />
                  <div className="mb-1"></div>
                  <label className="text-sm text-gray-600 font-medium mb-2">
                    Answer
                  </label>
                  <textarea
                    value={sec.description || sec.answer || ""}
                    readOnly
                    rows={3}
                    className="w-full px-3 py-2 text-sm border rounded-md bg-white text-gray-800 resize-none"
                  />

                  <label className="text-sm text-gray-600 font-medium">
                    Video Link
                  </label>
                  <input
                    type="text"
                    value={sec.videolink}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-md bg-white text-gray-800"
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

export default HelpandSupport;
