import * as React from "react";
import { Search, Grid3X3, List, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface Tag {
  name: string;
  color: string;
}

interface BlogData {
  id: string;
  title: string;
  author: string;
  publishingDate: any;
  publishedDate: string; // Added for BlogDetails
  status: "Draft" | "Published";
  tags: Tag[];
  heroImage: {
    file: any;
    url: string;
    description: string;
  };
  gallery: string[]; // Added gallery array
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

export const dummyBlogs: BlogData[] = [
  {
    id: "1",
    title: "A Guide to clicking Long Exposure shots",
    author: "Praveen Bhat",
    publishingDate: new Date("2024-01-15"),
    publishedDate: "January 15, 2024",
    status: "Draft",
    tags: [
      { name: "Street", color: "blue" },
      { name: "Photography", color: "green" },
    ],
    heroImage: {
      file: null,
      url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=300&fit=crop",
      description: "Photography studio setup with photographer and model",
    },
    gallery: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
    ],
    content:
      "Learn the art of long exposure photography with professional techniques and expert tips. Long exposure photography is a technique that uses a slow shutter speed to capture the movement of objects over time, creating stunning visual effects.\n\nThis comprehensive guide will walk you through everything you need to know about mastering long exposure shots, from understanding the basic principles to advanced techniques used by professional photographers.\n\nWhether you're photographing flowing water, moving clouds, or light trails, this guide will help you create breathtaking images that capture time in motion.",
    cta: {
      text: "Read More",
      link: "/blog/long-exposure-guide",
      isEnabled: true,
      style: {
        color: "blue",
        size: "medium",
        variant: "outline",
      },
    },
    slug: "guide-to-long-exposure-shots",
    metaTitle: "Complete Guide to Long Exposure Photography",
    metaDescription:
      "Master long exposure photography techniques with our comprehensive guide",
    keywords: "photography, long exposure, camera techniques",
  },
  {
    id: "2",
    title: "A Guide to clicking Long Exposure shots",
    author: "Praveen Bhat",
    publishingDate: new Date("2024-02-10"),
    publishedDate: "February 10, 2024",
    status: "Published",
    tags: [
      { name: "Street", color: "blue" },
      { name: "Tutorial", color: "purple" },
    ],
    heroImage: {
      file: null,
      url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=300&fit=crop",
      description: "Professional photography studio with lighting equipment",
    },
    gallery: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1554048612-b6a482b22881?w=800&h=600&fit=crop",
    ],
    content:
      "Advanced techniques for capturing stunning long exposure photographs that will elevate your photography skills to the next level. Building upon basic long exposure principles, this guide explores sophisticated methods used by professional photographers.\n\nDiscover how to use neutral density filters effectively, master different shutter speeds for various effects, and learn post-processing techniques that enhance your long exposure images.\n\nFrom seascapes to urban photography, these advanced techniques will help you create compelling images that stand out in any portfolio.",
    cta: {
      text: "Learn More",
      link: "/blog/advanced-long-exposure",
      isEnabled: true,
      style: {
        color: "green",
        size: "medium",
        variant: "solid",
      },
    },
    slug: "advanced-long-exposure-techniques",
    metaTitle: "Advanced Long Exposure Photography Techniques",
    metaDescription: "Take your long exposure photography to the next level",
    keywords: "advanced photography, long exposure, professional techniques",
  },
  {
    id: "3",
    title: "A Guide to clicking Long Exposure shots",
    author: "Praveen Bhat",
    publishingDate: new Date("2024-03-05"),
    publishedDate: "March 5, 2024",
    status: "Draft",
    tags: [
      { name: "Street", color: "blue" },
      { name: "Beginner", color: "orange" },
    ],
    heroImage: {
      file: null,
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop",
      description: "Hands holding a professional camera with scenic background",
    },
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495707902641-75ce1052c4a5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
    ],
    content:
      "Essential tips for beginners starting with long exposure photography. If you're new to photography or looking to explore long exposure techniques, this beginner-friendly guide is perfect for you.\n\nWe'll start with the basics: what equipment you need, fundamental camera settings, and simple techniques that will help you capture your first successful long exposure shots.\n\nNo prior experience needed - just bring your camera and enthusiasm to learn. By the end of this guide, you'll have the confidence to experiment with long exposure photography on your own.",
    cta: {
      text: "Get Started",
      link: "/blog/beginner-long-exposure",
      isEnabled: true,
      style: {
        color: "orange",
        size: "large",
        variant: "solid",
      },
    },
    slug: "beginner-long-exposure-guide",
    metaTitle: "Long Exposure Photography for Beginners",
    metaDescription:
      "Start your journey into long exposure photography with our beginner guide",
    keywords: "beginner photography, long exposure basics, camera tips",
  },
];

interface BlogsGridProps {
  blogs: BlogData[];
  handleBlogClick: (blog: BlogData) => void; // Changed to pass full blog object
}

const BlogsGrid: React.FunctionComponent<BlogsGridProps> = ({
  blogs,
  handleBlogClick,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          onClick={() => {
            handleBlogClick(blog); // Pass full blog object
          }}
          className="card cursor-pointer rounded-lg shadow-sm transition-all hover:shadow-md bg-white border"
        >
          {/* Blog Image */}
          <div className="relative overflow-hidden">
            <div className="rounded-lg p-2">
              <img
                src={blog.heroImage.url}
                alt={blog.heroImage.description}
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>

            {/* Category Badge */}
            <div className="absolute left-4 top-4">
              <span className="rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                {blog.tags[0]?.name || "General"}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="px-4 pt-2">
            <span
              className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${
                blog.status === "Published"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {blog.status}
            </span>
          </div>

          {/* Blog Content */}
          <div className="p-4 pt-2">
            <h3 className="mb-3 line-clamp-2 text-base font-medium text-gray-900 dark:text-white">
              {blog.title}
            </h3>

            {/* Author Info */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="flex h-full w-full items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  {blog.author.charAt(0)}
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {blog.author}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface BlogsProps {}

const Blogs: React.FunctionComponent<BlogsProps> = () => {
  const navigate = useNavigate();

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const handleBlogClick = (blog: BlogData) => {
    // Changed to receive full blog object
    console.log("Blog clicked:", blog.title);
    const slug = slugify(blog.title);
    // Navigate to blog details page with the full blog object
    navigate(`/blogs/${slug}`, { state: { blog } }); // Pass full blog object
  };

  return (
    <>
      <div className="bg-white h-max rounded-xl p-4">
        <div className="flex justify-between items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="relative w-full mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* View Toggle Icons */}
            <div className="flex items-center gap-1 border border-muted rounded-md bg-muted/20 p-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                // onClick={() => navigate("/events")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="p-2 h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Dates Button */}
            <Button variant="outline" size="sm" className="h-[41px] px-3 gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Dates</span>
            </Button>

            {/* Filters Button */}
            <Button variant="outline" size="sm" className="h-[41px] px-3 gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </Button>
          </div>
        </div>

        {/* BlogsGrid Component */}
        <BlogsGrid blogs={dummyBlogs} handleBlogClick={handleBlogClick} />
      </div>
    </>
  );
};

export default Blogs;
