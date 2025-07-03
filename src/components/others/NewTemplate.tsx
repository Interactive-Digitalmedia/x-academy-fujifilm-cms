import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

const NewTemplateOthers: React.FC = () => {
  const [sections, setSections] = useState<number[]>([1]);
  const [counter, setCounter] = useState(2);
  const [templateName, setTemplateName] = useState("");

  const [questions, setquestions] = useState<Record<number, string>>({});
  const [answers, setanswers] = useState<Record<number, string>>({});
  const [videolinks, setVideolinks] = useState<Record<number, string>>({});

  const handleAddSection = () => {
    setSections((prev) => [...prev, counter]);
    setCounter((prev) => prev + 1);
  };

  const handleSave = () => {
    const templateData = {
      templateName,
      sections: sections.map((i) => ({
        question: questions[i] || "",
        answer: answers[i] || "",
        videolink: videolinks[i] || "",
      })),
    };

    const existing = JSON.parse(localStorage.getItem("help_support_templates") || "[]");
    localStorage.setItem("help_support_templates", JSON.stringify([...existing, templateData]));
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

      {/* Dynamic Sections */}
      {sections.map((item, index) => (
        <div key={item} className="space-y-3">
          {/* question */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {index + 1}. Question
            </label>
            <Input
              type="text"
              placeholder="Query"
              className="w-full"
              value={questions[item] || ""}
              onChange={(e) =>
                setquestions((prev) => ({ ...prev, [item]: e.target.value }))
              }
            />
          </div>

          {/* answer */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Answer
            </label>
            <Textarea
              placeholder="Sample"
              rows={3}
              className="w-full"
              value={answers[item] || ""}
              onChange={(e) =>
                setanswers((prev) => ({
                  ...prev,
                  [item]: e.target.value,
                }))
              }
            />
          </div>

          {/* Video Link */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Video Link
            </label>
            <Input
              type="text"
              placeholder="https://example.com"
              className="w-full"
              value={videolinks[item] || ""}
              onChange={(e) =>
                setVideolinks((prev) => ({ ...prev, [item]: e.target.value }))
              }
            />
          </div>
        </div>
      ))}

      {/* Add Section Button */}
      <div className="flex justify-start pt-1">
        <Button
          size="sm"
          className="bg-blue-500 text-white hover:bg-blue-700 rounded-md flex items-center gap-2"
          onClick={handleAddSection}
        >
          <CirclePlus size={16} />
          Add Item
        </Button>
      </div>

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

export default NewTemplateOthers;
