import * as React from "react";
import { Input, Button, Switch, Select, SelectItem } from "@nextui-org/react";

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
  keywords: string;
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

  const buttonColors = [
    { key: "blue", label: "Blue", class: "bg-blue-500 hover:bg-blue-600" },
    { key: "green", label: "Green", class: "bg-green-500 hover:bg-green-600" },
    {
      key: "purple",
      label: "Purple",
      class: "bg-purple-500 hover:bg-purple-600",
    },
    { key: "red", label: "Red", class: "bg-red-500 hover:bg-red-600" },
    {
      key: "orange",
      label: "Orange",
      class: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const buttonSizes = [
    { key: "sm", label: "Small", class: "px-4 py-2 text-sm" },
    { key: "md", label: "Medium", class: "px-6 py-3 text-base" },
    { key: "lg", label: "Large", class: "px-8 py-4 text-lg" },
  ];

  const buttonVariants = [
    { key: "solid", label: "Solid" },
    { key: "bordered", label: "Bordered" },
    { key: "ghost", label: "Ghost" },
  ];

  const updateCTAField = (field: string, value: any) => {
    updateBlogData("cta", {
      ...blogData.cta,
      [field]: value,
    });
  };

  const updateCTAStyle = (styleField: string, value: string) => {
    updateBlogData("cta", {
      ...blogData.cta,
      style: {
        ...blogData.cta.style,
        [styleField]: value,
      },
    });
  };

  const getButtonClasses = () => {
    const colorClass =
      buttonColors.find((c) => c.key === blogData.cta.style?.color)?.class ||
      "bg-blue-500 hover:bg-blue-600";
    const sizeClass =
      buttonSizes.find((s) => s.key === blogData.cta.style?.size)?.class ||
      "px-6 py-3 text-base";

    if (blogData.cta.style?.variant === "bordered") {
      return `border-2 border-current bg-transparent hover:bg-current hover:text-white ${sizeClass} text-blue-500`;
    } else if (blogData.cta.style?.variant === "ghost") {
      return `bg-transparent hover:bg-opacity-10 hover:bg-current ${sizeClass} text-blue-500`;
    }

    return `${colorClass} text-white ${sizeClass}`;
  };

  return (
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">CTA Button</h2>

      {/* Enable CTA Toggle */}
      {/* <div className="flex items-center gap-3">
        <Switch
          isSelected={blogData.cta.isEnabled}
          onValueChange={(value) => updateCTAField("isEnabled", value)}
          color="primary"
        />
        <label className="text-sm font-medium text-gray-600">
          Enable CTA Button
        </label>
      </div> */}

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
              <Button
                isIconOnly
                variant="light"
                onPress={() => setShowSettings(!showSettings)}
                className="shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Button Settings */}
          {/* {showSettings && (
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Button Styling
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  selectedKeys={
                    blogData.cta.style?.color
                      ? [blogData.cta.style.color]
                      : ["blue"]
                  }
                  onSelectionChange={(keys) =>
                    updateCTAStyle("color", Array.from(keys)[0] as string)
                  }
                  label="Color"
                  placeholder="Select color"
                  size="sm"
                >
                  {buttonColors.map((color) => (
                    <SelectItem key={color.key} value={color.key}>
                      {color.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  selectedKeys={
                    blogData.cta.style?.size
                      ? [blogData.cta.style.size]
                      : ["md"]
                  }
                  onSelectionChange={(keys) =>
                    updateCTAStyle("size", Array.from(keys)[0] as string)
                  }
                  label="Size"
                  placeholder="Select size"
                  size="sm"
                >
                  {buttonSizes.map((size) => (
                    <SelectItem key={size.key} value={size.key}>
                      {size.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  selectedKeys={
                    blogData.cta.style?.variant
                      ? [blogData.cta.style.variant]
                      : ["solid"]
                  }
                  onSelectionChange={(keys) =>
                    updateCTAStyle("variant", Array.from(keys)[0] as string)
                  }
                  label="Variant"
                  placeholder="Select variant"
                  size="sm"
                >
                  {buttonVariants.map((variant) => (
                    <SelectItem key={variant.key} value={variant.key}>
                      {variant.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          )} */}

          {/* Button Preview */}
          {/* <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-600">
              Button Preview
            </label>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              {blogData.cta.text && blogData.cta.link ? (
                <button
                  className={`font-medium rounded-lg transition-colors ${getButtonClasses()}`}
                  onClick={(e) => e.preventDefault()}
                >
                  {blogData.cta.text}
                </button>
              ) : (
                <div className="text-gray-400 text-sm">
                  Enter button text and link to see preview
                </div>
              )}
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default CTAButton;
