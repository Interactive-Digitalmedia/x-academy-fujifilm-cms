import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@nextui-org/react";
import { createTipsAndTricks, updateTipsAndTricks } from "@/api/tipsAndTricks";
import toast from "react-hot-toast";
import IconPicker from "./IconPicker";
import { TipsAndTricksType } from "@/types";

interface TipsAndTricksDialogProps {
  open: boolean;
  story?: TipsAndTricksType | null;
  onClose: () => void;
  setRefreshTipsAndTricks: React.Dispatch<React.SetStateAction<boolean>>;
}

const TipsAndTricksDialog: React.FC<TipsAndTricksDialogProps> = ({
  open,
  story,
  onClose,
  setRefreshTipsAndTricks,
}) => {
  const sections = [1, 2, 3, 4, 5];
  const [templateName, setTemplateName] = useState("");
  const [iconValues, setIconValues] = useState<Record<number, string>>({});
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});

  const isEditing = !!story;

  useEffect(() => {
    if (story) {
      setTemplateName(story.name);
      const initialTitles: Record<number, string> = {};
      const initialIcons: Record<number, string> = {};
      const initialDescriptions: Record<number, string> = {};

      story.items.forEach((item, index) => {
        const section = index + 1;
        initialTitles[section] = item.title;
        initialIcons[section] = item.icon;
        initialDescriptions[section] = item.description;
      });

      setTitles(initialTitles);
      setIconValues(initialIcons);
      setDescriptions(initialDescriptions);
    } else {
      // Reset fields when creating new
      setTemplateName("");
      setTitles({});
      setIconValues({});
      setDescriptions({});
    }
  }, [story]);

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

    const payloadItems = sections.map((i) => ({
      title: titles[i] || "",
      icon: iconValues[i] || "",
      description: descriptions[i] || "",
    }));

    try {
      if (isEditing && story?._id) {
        const res = await updateTipsAndTricks(story._id, {
          name: templateName,
          items: payloadItems,
        });

        if (res.status === 200) {
          toast.success("Template updated successfully!");
          onClose();
        } else {
          console.log(`Failed to update template: ${res.message}`);
          toast.error(res.message || "Failed to update.");
        }
      } else {
        const res = await createTipsAndTricks({
          name: templateName,
          items: payloadItems,
        });

        if (res.status === 201) {
          toast.success("Template created successfully!");
          onClose();
        } else {
          console.log(`Failed to save template: ${res.message}`);
          toast.error(res.message || "Failed to create.");
        }
      }
    } catch (err) {
      console.error("Error saving template:", err);
      toast.error("Something went wrong while saving.");
    } finally {
      setRefreshTipsAndTricks((prev) => !prev);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">
            {isEditing
              ? "Edit Tips & Tricks Template"
              : "New Tips & Tricks Template"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details for this Tips & Tricks template."
              : "Fill in the details to create a new Tips & Tricks template."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Template Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Template name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Eg: Camera Gear"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {item}. Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Query"
                      className="w-full"
                      value={titles[item] || ""}
                      onChange={(e) =>
                        setTitles((prev) => ({
                          ...prev,
                          [item]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Icon <span className="text-red-500">*</span>
                    </label>
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
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Sample"
                    rows={3}
                    className="w-full resize-none"
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
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            size="sm"
            variant="bordered"
            onPress={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-[#2196F3] text-white hover:bg-[#1976D2] px-6"
            onPress={handleSave}
          >
            {isEditing ? "Update Template" : "Save Template"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipsAndTricksDialog;
