import PublishingDetails from "@/components/blogs/PublishingDetails";
import BlogImage from "@/components/blogs/BlogImage";
import BlogContent from "@/components/blogs/BlogContent";
import CTAButton from "@/components/blogs/CTAButton";
import MetaDescription from "@/components/blogs/MetaDesctiption";
import { uploadBlog, updateBlog, getBlogById } from "@/api/blogApi";
import { Blog } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BlogEditMainCard from "@/components/blogs/BlogEditMainCard";
import { useEffect, useState } from "react";

const steps = [
  "Publishing Details",
  "Blog Image",
  "Blog Content",
  "CTA Button",
  "Meta Description",
];

interface CreateBlogLayoutProps {
  data?: Partial<Blog>;
  mode?: "create" | "update";
  onSuccess?: () => void;
}

export default function CreateBlogLayout({
  data,
  mode = "create",
  onSuccess,
}: CreateBlogLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<Partial<Blog>>(data || {});
  const [initialData] = useState<Partial<Blog>>(data || {});
  const isDataChanged =
    JSON.stringify(blogData) !== JSON.stringify(initialData);
  const { id } = useParams<{ id?: string }>();
  const updateBlogData = (field: keyof Blog, value: any) => {
    setBlogData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await getBlogById(id);
        if (res) {
          setBlogData(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch activity");
        console.error("Fetch error:", error);
      }
    })();
  }, [id]);

  const validateStep = (step: number, data: Partial<Blog>) => {
    switch (step) {
      case 0:
        if (!data.title?.trim()) return "Title is required";
        if (data.authorModel === "Other") {
          if (!data.customAuthor?.name?.trim())
            return "Custom author name is required";
          if (!data.customAuthor?.about?.trim())
            return "Custom author about is required";
          if (!data.customAuthor?.image?.trim())
            return "Custom author image is required";
        } else {
          const authorId =
            typeof data.author === "string" ? data.author : data.author?._id;
          if (!authorId?.trim()) return "Author is required";
        }
        if (!data.publishedDate?.trim()) return "Publishing date is required";
        return null;
      case 1:
        if (!data.blogImage) return "Blog hero image required";
        return null;
      case 2:
        if (!data.content?.trim()) return "Blog content is required";
        return null;
      case 3:
        if (!data.cta || !data.cta[0]?.text || !data.cta[0]?.link)
          return "CTA text and link are required";
        return null;
      case 4:
        if (!data.metaData?.metaTitle?.trim()) return "Meta title is required";
        if (!data.metaData?.metaDescription?.trim())
          return "Meta description is required";
        return null;
      default:
        return null;
    }
  };

  const transformToPayload = (data: Partial<Blog>) => {
    const isCustomAuthor = data.authorModel === "Other";
    return {
      title: data.title,
      authorModel: data.authorModel,
      author: isCustomAuthor ? undefined : data.author,
      customAuthor: isCustomAuthor
        ? {
            name: data.customAuthor?.name || "",
            about: data.customAuthor?.about || "",
            image: data.customAuthor?.image || "",
            social: {
              facebook: data.customAuthor?.socialMediaUrls?.facebook || "",
              instagram: data.customAuthor?.socialMediaUrls?.instagram || "",
            },
          }
        : undefined,
      publishedDate: data.publishedDate,
      tags: data.tags || [],
      blogImage: data.blogImage,
      content: data.content,
      cta: data.cta || [],
      metaData: data.metaData || {},
      status: data.status || "draft",
    };
  };

  const handleNextOrSubmit = async () => {
    const error = validateStep(currentStep, blogData);
    if (error) {
      toast.error(error);
      return;
    }

    const payload = transformToPayload(blogData);

    try {
      if (currentStep === 0 && !blogData._id) {
        const res = await uploadBlog(payload);
        if (res.status === 201) {
          toast.success("Blog created!");
          setBlogData((prev) => ({
            ...prev,
            _id: res.data._id,
          }));
          setCurrentStep((prev) => prev + 1);
        } else {
          toast.error(res.message);
        }
      } else if (blogData._id) {
        const res = await updateBlog(blogData._id, payload);
        if (res.status === 200) {
          toast.success("Changes saved!");
          if (currentStep === steps.length - 1) {
            setTimeout(() => navigate("/blogs"), 1500);
          } else {
            setCurrentStep((prev) => prev + 1);
          }
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error("❌ Blog save error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateSubmit = async () => {
    const error = validateStep(currentStep, blogData);
    if (error) {
      toast.error(error);
      return;
    }

    if (!blogData._id) return;

    try {
      const res = await updateBlog(blogData._id, transformToPayload(blogData));
      if (res.status === 200) {
        toast.success("Blog updated!");
        onSuccess?.();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Something went wrong!");
    }
  };

  const renderCurrentStep = () => {
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
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {id && <BlogEditMainCard data={blogData} />}
      <div className="bgCard h-[89vh] flex flex-col">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(index)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition 
                  ${
                    currentStep === index
                      ? "text-black font-semibold"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full border ${
                    currentStep === index
                      ? " text-white bg-[#1098F7]"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="whitespace-nowrap">{step}</span>
              </button>
              {index < steps.length - 1 && (
                <div className="min-w-[30px] h-px bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto pt-2 px-6 pb-6">
          {renderCurrentStep()}
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto -mb-2 flex justify-between items-center pt-2.5 border-t border-gray-200 px-6 -py-1 bg-white">
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>

          <div className="flex gap-4">
            {mode === "update" && (
              <button
                onClick={handleUpdateSubmit}
                disabled={!isDataChanged}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isDataChanged
                    ? "bg-[#1098F7] text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            )}
            <button
              onClick={handleNextOrSubmit}
              className="bg-[#1098F7] text-white  px-6 py-2 rounded-lg font-medium"
            >
              {currentStep === steps.length - 1 ? "Publish Blog" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
