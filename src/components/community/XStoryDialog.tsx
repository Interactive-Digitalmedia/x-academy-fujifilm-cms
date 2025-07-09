import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, Trash2 } from "lucide-react";
import { uploadXStory, updateXStory, deleteXStory } from "@/api/XStory";
import ConfirmationModal from "@/components/ConfirmationModal";
import toast from "react-hot-toast";
import { XStoryType } from "@/types";
import { uploadImage } from "@/api/uploadImageApi";

interface AddXStoryDialogProps {
  open: boolean;
  story: XStoryType | null;
  onClose: () => void;
}
type XStoryFormData = Pick<XStoryType, "name" | "link" | "coverImage">;

const XStoryDialog: React.FC<AddXStoryDialogProps> = ({
  open,
  story,
  onClose,
}) => {
  const isEditing = !!story?._id;
  const [formData, setFormData] = useState<XStoryFormData>({
    name: story?.name || "",
    link: story?.link || "",
    coverImage: story?.coverImage || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (story) {
      setFormData({
        name: story.name || "",
        link: story.link || "",
        coverImage: story.coverImage || "",
      });
    } else {
      setFormData({
        name: "",
        link: "",
        coverImage: "",
      });
    }
  }, [story]);

  // useEffect(() => {
  //   if (story?._id) {
  //     setIsEditing(true);
  //     const fetchStoryData = async () => {
  //       try {
  //         const response = await getXStoryById(story._id);
  //         if (response && response.data) {
  //           setFormData({
  //             xStoryName: response.data.name,
  //             videoLink: response.data.link,
  //             coverImage: response.data.coverImage
  //               ? { file: null, url: response.data.coverImage }
  //               : null,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch story data:", error);
  //       }
  //     };
  //     fetchStoryData();
  //   } else {
  //     setIsEditing(false);
  //     setFormData({
  //       xStoryName: "",
  //       videoLink: "",
  //       coverImage: null,
  //     });
  //   }
  // }, [story, open]);

  const handleFileSelect = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only .jpg, .png, .svg files are allowed");
      return;
    }

    try {
      const { publicUrl } = await uploadImage(file);
      setFormData((prev) => ({ ...prev, coverImage: publicUrl }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Failed to upload image.");
    }
  };

  const handleDeleteStory = async (reason?: string) => {
    console.log("Deleting story with reason:", reason);
    // change
    if (!story?._id) {
      console.log("no story id");
      return;
    }
    console.log("Attempting to delete story with ID:", story._id);
    if (reason) console.log("Reason:", reason);

    setIsDeleting(true);
    try {
      const res = await deleteXStory(story._id);
      console.log("DELETE response:", res);
      toast.success("X-Story deleted");
      onClose();
    } catch (err: any) {
      console.error("Delete failed", err?.response || err);
      toast.error("Failed to delete X-Story");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.link || !formData.coverImage) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        link: formData.link,
        coverImage: formData.coverImage,
      };

      if (isEditing && story) {
        await updateXStory(story._id, payload);
        toast.success("X-Story updated");
      } else {
        await uploadXStory(payload);
        toast.success("X-Story created");
      }

      onClose();
    } catch (err) {
      console.error("Failed to submit", err);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="font-bold">
            {isEditing ? "Edit X Story" : "New X Story"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details for this X-Story."
              : "Fill in the details to upload a new X-Story."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              X-Story Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="Workshop"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Video Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="www.sample.com"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Cover Image <span className="text-red-500">*</span>
            </label>

            <div
              className={`relative border-2 border-dashed rounded-lg text-center transition-colors h-[180px] ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.coverImage ? (
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, coverImage: "" })}
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full p-1 shadow"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-1">
                  <UploadCloud className="w-10 h-10 text-blue-400" />
                  <p className="text-gray-600">
                    Drag your file or{" "}
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="text-blue-500 hover:text-blue-600 underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Max 10 MB files are allowed
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-400 mt-1">
              Note: Only support .jpg, .png and .svg files
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/svg+xml"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {isEditing && (
            <Button
              size="sm"
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
              onClick={handleDeleteStory}
            >
              Delete Story
            </Button>
          )}

          <Button
            size="sm"
            className="bg-[#2196F3] text-white hover:bg-[#1976D2]"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
                ? "Update Story"
                : "Save Story"}
          </Button>
        </div>
      </DialogContent>
      {/* <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteStory}
        title="Delete X-Story"
        description="Are you sure you want to delete this X-Story? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        showReasonInput={true}
      /> */}
    </Dialog>
  );
};

export default XStoryDialog;
