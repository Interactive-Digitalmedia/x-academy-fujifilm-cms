import * as React from "react";

import StepIndicator from "@/components/blogs/StepIndicator";
import PublishingDetails from "@/components/blogs/PublishingDetails";
import BlogImage from "@/components/blogs/BlogImage";
import BlogContent from "@/components/blogs/BlogContent";
import CTAButton from "@/components/blogs/CTAButton";
import MetaDescription from "@/components/blogs/MetaDesctiption";
import { updateBlog, uploadBlog } from "@/api/blogApi";
interface Tag {
  name: string;
  color: string;
}

interface BlogData {
  title: string;
  author: string;
  status: "draft" | "publish";
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

interface BlogsProps {}

const CreateBlog: React.FunctionComponent<BlogsProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  // Main blog data state
  const [blogData, setBlogData] = React.useState<BlogData>({
    title: "",
    author: "",
    publishingDate: "",
    tags: [],
    heroImage: { file: null, url: "", description: "" },
    content: "",
    cta: {
      text: "",
      link: "",
      isEnabled: true,
      style: {
        color: "blue",
        size: "md",
        variant: "solid",
      },
    },
    slug: "",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    status: "draft", // ← add this line
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

  const [blogId, setBlogId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const savedStep = localStorage.getItem("createBlogCurrentStep");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }
  }, []);
  
  React.useEffect(() => {
    localStorage.setItem("createBlogCurrentStep", String(currentStep));
  }, [currentStep]);

  const steps = [
    { number: 1, title: "Publishing Details" },
    { number: 2, title: "Blog Image" },
    { number: 3, title: "Blog Content" },
    { number: 4, title: "CTA Button" },
    { number: 5, title: "Meta Description" },
  ];



  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const transformToPayload = (blogData: BlogData) => {
    return {
      title: blogData.title,
      author: blogData.author,
      publishedDate: blogData.publishingDate,
      tags: blogData.tags.map(tag => tag.name),
      blogImages: [
        {
          url: blogData.heroImage.url,
          description: blogData.heroImage.description,
        },
      ],
      content: blogData.content,
      cta: [
        {
          text: blogData.cta.text,
          link: blogData.cta.link,
        },
      ],
      metaData: {
        slug: blogData.slug,
        metaTitle: blogData.metaTitle,
        metaDescription: blogData.metaDescription,
        keywords: blogData.keywords ,
      },
      status: blogData.status || "draft", // ← fallback default
    };
  };
  
  

  const handleNextStep = async () => {
    const payload = transformToPayload(blogData);
    try {
      if (!blogId) {
        const res = await uploadBlog(payload);
        setBlogId(res.data._id);
      } else {
        await updateBlog(blogId, payload);
      }
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to save blog step:", error);
    }
  };
  
  const handlePublishBlog = async () => {
    const payload = transformToPayload({
      ...blogData,
      status: "publish", // not "published"
    });

    try {
      if (blogId) {
        await updateBlog(blogId, payload);
      } else {
        const res = await uploadBlog(payload);
        setBlogId(res.data._id);
      }
      console.log("✅ Blog published");
    } catch (error) {
      console.error("❌ Failed to publish blog:", error);
    }
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
        return (
          <BlogImage blogData={blogData} updateBlogData={updateBlogData} />
        );
      case 2:
        return (
          <BlogContent blogData={blogData} updateBlogData={updateBlogData} />
        );
      case 3:
        return (
          <CTAButton blogData={blogData} updateBlogData={updateBlogData} />
        );
      case 4:
        return (
          <MetaDescription
            blogData={blogData}
            updateBlogData={updateBlogData}
          />
        );
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
    <div className="bg-white h-max rounded-xl p-4">
      {/* Step Indicator */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

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
          className="bg-[#1098F7] text-white hover:bg-[#1098F7] px-6 py-2 rounded-lg font-medium"
        >
          {currentStep === steps.length - 1 ? "Publish Blog" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
