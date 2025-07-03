import { Blog, CTA } from "@/types";
import * as React from "react";
import { Button } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";

interface CTAButtonProps {
  blogData: Partial<Blog>;
  updateBlogData: (field: keyof Blog, value: any) => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ blogData, updateBlogData }) => {
  const ctaArray: CTA[] = blogData.cta || [];
  const handleCTAChange = (index: number, field: keyof CTA, value: string) => {
    const updatedCTA = [...ctaArray];
    updatedCTA[index] = {
      ...updatedCTA[index],
      [field]: value,
    };
    updateBlogData("cta", updatedCTA);
  };

  const addCTA = () => {
    updateBlogData("cta", [...ctaArray, { text: "", link: "" }]);
  };

  const removeCTA = (index: number) => {
    const updatedCTA = ctaArray.filter((_, i) => i !== index);
    updateBlogData("cta", updatedCTA);
  };

  return (
    <div className="space-y-4 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">CTA Buttons</h2>

      {blogData.cta?.map((ctaItem, index) => (
        <div
          key={index}
          className="border p-4 rounded-md shadow-sm bg-white space-y-4 relative"
        >
          <div className="absolute top-2 right-2">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={() => removeCTA(index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={ctaItem.text}
              onChange={(e) => handleCTAChange(index, "text", e.target.value)}
              placeholder="Example: Learn More"
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Button Link
            </label>
            <input
              type="url"
              value={ctaItem.link}
              onChange={(e) => handleCTAChange(index, "link", e.target.value)}
              placeholder="https://example.com"
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            />
          </div>
        </div>
      ))}

      <Button
        onPress={addCTA}
        variant="bordered"
        color="primary"
        className="mt-2"
        startContent={<Plus size={16} />}
      >
        Add CTA
      </Button>
    </div>
  );
};

export default CTAButton;
