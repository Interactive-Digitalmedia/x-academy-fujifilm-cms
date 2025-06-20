import * as React from "react";
import {Button} from "@nextui-org/react";

interface BlogData {
  title: string;
  author: string;
  publishingDate: any;
  tags: any[];
  heroImage: {
    file: any;
    url: string;
    description: string;
  };
  content: string;
  cta: {
    text: string;
    link: string;
    isEnabled: boolean;
    style: {
      color: string;
      size: string;
      variant: string;
    };
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface CTAButtonProps {
  blogData: BlogData;
  updateBlogData: (field: keyof BlogData, value: any) => void;
}

const CTAButton: React.FunctionComponent<CTAButtonProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [showSettings, setShowSettings] = React.useState(false);



  const updateCTAField = (field: string, value: any) => {
    updateBlogData("cta", {
      ...blogData.cta,
      [field]: value,
    });
  };


  return (
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">CTA Button</h2>


      {blogData.cta.isEnabled && (
        <>
          {/* Button Link */}
          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Button Link
            </label>
            <input
              type="url"
              placeholder="XYZ"
              value={blogData.cta.link}
              onChange={(e) => updateCTAField("link", e.target.value)}
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            />
          </div>

          {/* Button Text */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Button Text
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="XYZ"
                value={blogData.cta.text}
                onChange={(e) => updateCTAField("text", e.target.value)}
                className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              />
             
            </div>
          </div>   
        </>
      )}
    </div>
  );
};

export default CTAButton;
