import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface GearItem {
  title: string;
  link: string;
  imageUrl: string;
  file?: File | null;
}

interface GearsProps {
  data: any;
  setData: (updatedData: any) => void;
}

const Gears: React.FC<GearsProps> = ({ data, setData }) => {
  const [gearBlocks, setGearBlocks] = useState<GearItem[]>([
    { title: "", link: "", imageUrl: "", file: null },
  ]);

  const handleFieldChange = (
    index: number,
    field: keyof GearItem,
    value: string | File | null
  ) => {
    const updated = [...gearBlocks];

    if (field === "file") {
      const file = value as File;
      updated[index].file = file;
      updated[index].imageUrl = file ? URL.createObjectURL(file) : "";
    } else {
      updated[index][field] = value as string;
    }

    setGearBlocks(updated);

    // Sync valid gearBlocks to parent
    const updatedGears = updated.filter(
      (gear) => gear.title && gear.link && gear.imageUrl
    );
    setData({ ...data, gears: updatedGears });
  };

  const addGearBlock = () => {
    setGearBlocks([
      ...gearBlocks,
      { title: "", link: "", imageUrl: "", file: null },
    ]);
  };

  const deleteGearBlock = (index: number) => {
    const updated = gearBlocks.filter((_, i) => i !== index);
    setGearBlocks(updated);

    const updatedGears = updated.filter(
      (gear) => gear.title && gear.link && gear.imageUrl
    );
    setData({ ...data, gears: updatedGears });
  };

  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  const handleFileInputClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileUpload = (
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

    handleFieldChange(index, "file", file);
  };

  return (
    <div className="space-y-3 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Gears</h2>

      {/* Gears Preview */}
      {gearBlocks.some((gear) => gear.imageUrl) && (
        <div>
          <h3 className="text-[13px] font-bold -mt-2 mb-2">Gears Owned</h3>
          <div className="flex gap-4 flex-wrap">
            {gearBlocks
              .filter((gear) => gear.imageUrl)
              .map((gear, index) => (
                <div
                  key={index}
                  className="relative border rounded-xl p-3 w-[140px] text-center bg-white shadow-sm"
                >
                  <img
                    src={gear.imageUrl}
                    alt="gear"
                    className="w-full h-[100px] object-cover rounded"
                  />
                  <p className="mt-2 text-sm font-medium">{gear.title}</p>
                  <button
                    onClick={() => deleteGearBlock(index)}
                    className="absolute top-1.5 right-1.5 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Add Gear Cards */}
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
                placeholder="Product Title"
                className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                value={gear.title}
                onChange={(e) =>
                  handleFieldChange(index, "title", e.target.value)
                }
              />
            </div>

            <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Product URL
              </label>
              <input
                type="text"
                placeholder="Product URL"
                className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                value={gear.link}
                onChange={(e) =>
                  handleFieldChange(index, "link", e.target.value)
                }
              />
            </div>
          </div>

          {/* Image Input */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                value={gear.imageUrl}
                onChange={(e) =>
                  handleFieldChange(index, "imageUrl", e.target.value)
                }
              />
            </div>

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

      {/* Add Item Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={addGearBlock}
          className="flex items-center gap-1 px-4 -mt-3 py-2 bg-[#1098F7] hover:bg-blue-600 text-white text-sm font-semibold rounded-md"
        >
          <span className="text-lg leading-none">＋</span> Add Item
        </button>
      </div>
    </div>
  );
};

export default Gears;
