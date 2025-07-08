import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTipsAndTricks } from "@/api/tipsAndTricks";
import toast from "react-hot-toast";
import IconPicker from "./IconPicker";

const NewTemplate: React.FC = () => {
  const sections = [1, 2, 3, 4, 5];
  const [templateName, setTemplateName] = useState("");
  const [iconValues, setIconValues] = useState<Record<number, string>>({});
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error("Template name is required.");
      return;
    }

    const invalidIndex = sections.find(
      (i) =>
        !titles[i]?.trim() || !iconValues[i]?.trim() || !descriptions[i]?.trim()
    );

    if (invalidIndex !== undefined) {
      toast.error(`Section ${invalidIndex} is incomplete.`);
      return;
    }
    const payload = {
      name: templateName,
      items: sections.map((i) => ({
        title: titles[i] || "",
        icon: iconValues[i] || "",
        description: descriptions[i] || "",
      })),
    };

    try {
      const res = await createTipsAndTricks(payload);

      if (res.status === 201) {
        toast.success("Template saved successfully!");
      } else {
        console.log(`Failed to save template: ${res.message}`);
      }
    } catch (err) {
      console.error("Error saving template:", err);
      toast.error("Something went wrong while saving.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      {/* Template Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Template name <span className="text-red-500"> *</span>
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
                {item}. Title <span className="text-red-500"> *</span>
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
              Description <span className="text-red-500"> *</span>
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
