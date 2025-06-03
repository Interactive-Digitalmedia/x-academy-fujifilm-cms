import * as React from "react";

import StepIndicator from "@/components/blogs/StepIndicator";
import PublishingDetails from "@/components/blogs/PublishingDetails";
import BlogImage from "@/components/blogs/BlogImage";
import BlogContent from "@/components/blogs/BlogContent";
import CTAButton from "@/components/blogs/CTAButton";
import MetaDescription from "@/components/blogs/MetaDesctiption";
import { parseZonedDateTime } from "@internationalized/date";

interface Tag {
  name: string;
  color: string;
}

interface BlogData {
  title: string;
  author: string;
  publishingDate: any;
  tags: Tag[];
  heroImage: {
    file: any;
    url: string;
    description: string;
  };
  content: string;
  cta: {
    text: string;
    link: string;
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

interface BlogsProps {}

const Blogs: React.FunctionComponent<BlogsProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  // Main blog data state
  const [blogData, setBlogData] = React.useState<BlogData>({
    // Step 1: Publishing Details
    title: "",
    author: "",
    publishingDate: parseZonedDateTime("2024-06-03T10:00[America/New_York]"), //don't delete this is important
    tags: [],

    // Step 2: Blog Image
    heroImage: {
      file: null,
      url: "",
      description: "",
    },

    // Step 3: Blog Content
    content: "",

    // Step 4: CTA Button
    cta: {
      text: "",
      link: "",
    },

    // Step 5: Meta Description
    slug: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  // Helper function to update blog data
  const updateBlogData = (field: keyof BlogData, value: any) => {
    setBlogData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // TODO: Add state for other steps when needed
  // const [selectedImage, setSelectedImage] = React.useState(null);
  // const [blogContent, setBlogContent] = React.useState("");
  // const [ctaButtonText, setCtaButtonText] = React.useState("");
  // const [ctaButtonLink, setCtaButtonLink] = React.useState("");
  // const [metaTitle, setMetaTitle] = React.useState("");
  // const [metaDescription, setMetaDescription] = React.useState("");

  const steps = [
    { number: 1, title: "Publishing Details" },
    { number: 2, title: "Blog Image" },
    { number: 3, title: "Blog Content" },
    { number: 4, title: "CTA Button" },
    { number: 5, title: "Meta Description" },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublishBlog = () => {
    console.log("Final Blog Data:", blogData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PublishingDetails
            blogData={blogData}
            updateBlogData={updateBlogData}
          />
        );
      case 1:
        return <BlogImage />;
      case 2:
        return <BlogContent />;
      case 3:
        return <CTAButton />;
      case 4:
        return <MetaDescription />;
      default:
        return (
          <PublishingDetails
            blogData={blogData}
            updateBlogData={updateBlogData}
          />
        );
    }
  };

  return (
    <div className="bg-white h-full rounded-xl p-8">
      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <div className="mb-8">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg font-medium ${
            currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        <button
          onClick={
            currentStep === steps.length - 1
              ? handlePublishBlog
              : handleNextStep
          }
          disabled={currentStep === steps.length - 1 ? false : false}
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg font-medium"
        >
          {currentStep === steps.length - 1 ? "Publish Blog" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default Blogs;
