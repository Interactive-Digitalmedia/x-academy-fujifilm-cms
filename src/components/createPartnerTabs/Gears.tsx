import React, { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Ambassador } from "@/types";
import { uploadImage } from "@/api/uploadImageApi";
import { uploadGearProduct } from "@/api/gearProduct";

interface GearItem {
  _id?: string;
  productName?: string;
  productLink?: string;
  productImage?: string;
  saved?: boolean;
}

interface GearsProps {
  data: Partial<Ambassador>;
  setData: React.Dispatch<React.SetStateAction<Partial<Ambassador>>>;
}

const Gears: React.FC<GearsProps> = ({ data, setData }) => {
  const [gearBlocks, setGearBlocks] = useState<GearItem[]>([
    { productName: "", productLink: "", productImage: "", saved: false },
  ]);

  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  const handleFieldChange = (
    index: number,
    field: keyof GearItem,
    value: string
  ) => {
    const updated = [...gearBlocks];
    (updated[index][field] as string | undefined) = value;
    setGearBlocks(updated);
    // setData({ ...data, gearDetails: updated });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only .jpg, .png, .svg files are allowed");
      return;
    }

    try {
      const result = await uploadImage(file);
      if (result?.publicUrl) {
        const encodedUrl = encodeURI(result.publicUrl);
        handleFieldChange(index, "productImage", encodedUrl);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const addGearBlock = () => {
    const updated = [
      ...gearBlocks,
      { productName: "", productLink: "", productImage: "", saved: false },
    ];
    setGearBlocks(updated);
  };

  const deleteGearBlock = (index: number) => {
    const updatedGearBlocks = gearBlocks.filter((_, i) => i !== index);
    setGearBlocks(updatedGearBlocks);

    const updatedGearIds = (data.gearDetails || []).filter(
      (_, i) => i !== index
    );
    setData({ ...data, gearDetails: updatedGearIds });
  };

  const handleFileInputClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleSaveItem = async (index: number) => {
    const gear = gearBlocks[index];

    // Validation (optional)
    if (!gear.productName || !gear.productLink || !gear.productImage) {
      alert("Please fill out all fields and upload an image before saving.");
      return;
    }

    try {
      const response = await uploadGearProduct({
        productName: gear.productName,
        productLink: gear.productLink,
        productImage: gear.productImage,
      });

      const createdId = response?.data?._id;
      if (!createdId) throw new Error("No ID returned");

      // Update local block as saved
      const updatedGearBlocks = [...gearBlocks];
      updatedGearBlocks[index]._id = createdId;
      updatedGearBlocks[index].saved = true;
      setGearBlocks(updatedGearBlocks);

      // Add to ambassador state
      const updatedGearDetails = [...(data.gearDetails || []), createdId];
      setData({ ...data, gearDetails: updatedGearDetails });
    } catch (err) {
      console.error("Failed to save gear item:", err);
    }
  };

  return (
    <div className="space-y-3 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Gears</h2>

      {/* Preview */}
      {gearBlocks.some((g) => g.productImage) && (
        <div>
          <h3 className="text-[13px] font-bold -mt-2 mb-2">Gears Owned</h3>
          <div className="flex gap-4 flex-wrap">
            {gearBlocks.map(
              (gear, index) =>
                gear.productImage && (
                  <div
                    key={index}
                    className="relative border rounded-xl p-3 w-[140px] text-center bg-white shadow-sm"
                  >
                    <img
                      src={gear.productImage}
                      alt="gear"
                      className="w-full h-[100px] object-cover rounded"
                    />
                    {/* <p className="mt-2 text-sm font-medium">
                      {gear.productName}
                    </p> */}
                    <button
                      onClick={() => deleteGearBlock(index)}
                      className="absolute top-1.5 right-1.5 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Gear Form */}
      {gearBlocks.map((gear, index) => (
        <div
          key={index}
          className="border rounded-xl p-6 bg-white space-y-4 relative"
        >
          <h3 className="text-base font-bold text-black">Add Gear</h3>

          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Product Title
              </label>
              <input
                type="text"
                value={gear.productName}
                onChange={(e) =>
                  handleFieldChange(index, "productName", e.target.value)
                }
                placeholder="Product Title"
                className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Product URL
              </label>
              <input
                type="text"
                value={gear.productLink}
                onChange={(e) =>
                  handleFieldChange(index, "productLink", e.target.value)
                }
                placeholder="Product URL"
                className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm"
              />
            </div>
          </div>
          {!gear.saved && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveItem(index)}
                className="px-4 py-2 text-white text-sm font-semibold rounded-md bg-[#1098F7]"
              >
                Save Item
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            {/* <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={gear.productImage}
                onChange={(e) =>
                  handleFieldChange(index, "productImage", e.target.value)
                }
                placeholder="Image URL"
                className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm"
              />
            </div> */}

            <button
              type="button"
              onClick={() => handleFileInputClick(index)}
              className="h-[38px] mt-6 px-4 py-1.5 border border-[#1098F7] text-[#1098F7] rounded-md text-sm font-medium hover:bg-blue-50"
            >
              Add Image
            </button>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/svg+xml"
              onChange={(e) => handleFileUpload(e, index)}
              className="hidden"
              ref={(el) => (fileInputRefs.current[index] = el!)}
            />
          </div>
        </div>
      ))}

      {/* Add Item */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={addGearBlock}
          className="flex items-center gap-1 px-4 -mt-3 py-2 bg-[#1098F7] text-white text-sm font-semibold rounded-md"
        >
          <span className="text-lg leading-none">＋</span> Add Item
        </button>
      </div>
    </div>
  );
};

export default Gears;
