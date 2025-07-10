import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Blog } from "@/types";
import BlogsGrid from "./BlogsGrid";
import { getBlogs } from "@/api/blogApi";
import { Calendar } from "lucide-react";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import FiltersPopover from "@/components/ui/FiltersPopover";
import { DateRange } from "react-day-picker";
import { getAmbassadors } from "@/api/ambassadors";
import { Ambassador } from "@/types";

interface BlogsProps {}

const Blogs: React.FunctionComponent<BlogsProps> = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        if (res.status !== 200) {
          throw new Error("Failed to fetch blogs");
        }
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const res = await getAmbassadors();
        if (res.status !== 200) throw new Error("Failed to fetch ambassadors");

        setAmbassadors(res.data || []); // ✅ Set state here
      } catch (err) {
        console.error("Error fetching ambassadors:", err);
      }
    };

    fetchAmbassadors();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        searchTerm.length < 3 ||
        blog.title.toLowerCase().includes(lowerSearch) ||
        // blog.author.toLowerCase().includes(lowerSearch) ||
        blog.content.toLowerCase().includes(lowerSearch);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) =>
          blog.tags?.some(
            (blogTag) => blogTag.toLowerCase() === tag.toLowerCase()
          )
        );

      // const matchesAuthor =
      //   selectedAuthors.length === 0 || selectedAuthors.includes(blog.author);

      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(blog.status);

      const from = selectedRange?.from;
      const to = selectedRange?.to;
      const blogDate = new Date(blog.publishedDate); // Ensure it's a Date object
      const matchesDate = !from || !to || (blogDate >= from && blogDate <= to);

      return (
        matchesSearch &&
        // matchesAuthor &&
        matchesStatus &&
        matchesTags &&
        matchesDate
      );
    });

    setFilteredBlogs(filtered);
  }, [
    blogs,
    searchTerm,
    selectedTags,
    selectedAuthors,
    selectedStatus,
    selectedRange,
  ]);

  const handleBlogClick = (blog: Blog) => {
    navigate(`/blogs/${blog._id}`, { state: { blog } });
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* View Toggle Icons */}
            {/* <div className="flex items-center gap-1 border border-muted rounded-md bg-muted/20 p-1">
              <Button variant="secondary" size="sm" className="p-2 h-8 w-8">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
            </div> */}

            {/* Calendar Button + Popover */}
            <div className="relative">
              <button
                className={`h-[40px] px-3 gap-2 text-sm font-semibold flex items-center rounded-md ${
                  showCalendar
                    ? "bg-[#cdeafd] border border-[#1098f7] text-black"
                    : "bg-white border-2 border-gray-200 text-black"
                }`}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                <Calendar className="h-4 w-4" />
                <span>Dates</span>
              </button>

              {showCalendar && (
                <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 shadow-lg rounded-md p-2">
                  <CustomCalendar
                    mode="range"
                    selected={selectedRange}
                    onSelect={(range) => {
                      setSelectedRange(range);
                      if (range?.from && range?.to) setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* FiltersPopover like in EventView */}
            <FiltersPopover
              types={["Event", "Fashion", "Street", "Portrait", "Wildlife"]} // or your blog statuses
              selectedTypes={selectedTags}
              setSelectedTypes={setSelectedTags}
              selectedConductedBy={selectedAuthors}
              setSelectedConductedBy={setSelectedAuthors}
              isBlogPage={true}
              ambassadors={ambassadors}
              onReset={() => {
                setSelectedStatus([]);
                setSelectedAuthors([]);
                setSelectedTags([]); // optional, if you want tags too
              }}
            />
          </div>
        </div>

        {/* BlogsGrid Component */}
        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading blogs...</p>
        ) : !Array.isArray(blogs) || blogs.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No blogs found.</p>
        ) : (
          <BlogsGrid blogs={filteredBlogs} handleBlogClick={handleBlogClick} />
        )}
      </div>
    </>
  );
};

export default Blogs;
