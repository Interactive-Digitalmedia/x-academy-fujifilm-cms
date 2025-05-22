import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react'

type Blog = {
  id: string
  title: string
  category: string
  author: {
    name: string
    avatar: string
  }
  image: string
  excerpt: string
  link: string
}

type XBlogsCardProps = {
  blogs: Blog[]
  activeTab?: 'recent' | 'popular'
  maxItems?: number
}

const XBlogsCard = ({ blogs, activeTab, maxItems }: XBlogsCardProps) => {
  const navigate = useNavigate()
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])

  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Determine how many blogs to show based on screen size
  const blogsToShow = isMobile
    ? blogs.slice(0, 2) // Only show 2 on mobile
    : blogs // Show all on larger screens

  // Filter blogs based on activeTab if needed
  useEffect(() => {
    // This is a placeholder for actual filtering logic
    // You can implement real filtering based on dates, popularity, etc.
    if (activeTab === 'recent') {
      // Sort by most recent (in a real app, you'd have a date field)
      const filtered = [...blogsToShow].sort(
        (a, b) => parseInt(b.id) - parseInt(a.id) // Simple sorting by ID for demo
      )
      setFilteredBlogs(filtered.slice(0, maxItems || 6))
    } else if (activeTab === 'popular') {
      // In a real app, you'd sort by popularity metrics
      const filtered = [...blogsToShow]
      setFilteredBlogs(filtered.slice(0, maxItems || 6))
    } else {
      // No filtering, just limit the number if needed
      setFilteredBlogs(blogsToShow.slice(0, maxItems || blogsToShow.length))
    }
  }, [activeTab, blogsToShow, maxItems, blogs])

  // Handle navigation when a blog is clicked
  const handleBlogClick = (blog: Blog) => {
    navigate(blog.link)
  }

  // Handle bookmark functionality
  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent blog click when bookmark is clicked
    console.log(`Blog ${id} bookmarked`)
    // Add your bookmark logic here
  }

  // Function to determine category styling
  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case 'street':
        return 'bg-blue-500 text-white'
      case 'fashion':
        return 'bg-orange-400 text-white'
      case 'wildlife':
        return 'bg-emerald-600 text-white'
      case 'macro':
        return 'bg-purple-500 text-white'
      case 'landscape':
        return 'bg-green-500 text-white'
      case 'night':
        return 'bg-indigo-700 text-white'
      case 'portrait':
        return 'bg-rose-500 text-white'
      default:
        return 'bg-blue-600 text-white' // Default styling from your example
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className='cursor-pointer overflow-hidden rounded-2xl'
            onClick={() => handleBlogClick(blog)}
          >
            <div className='relative h-52 w-full'>
              <img
                src={blog.image}
                alt={blog.title}
                className='h-full w-full rounded-2xl object-cover'
              />
              <div
                className={`absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-semibold ${getCategoryStyles(blog.category)}`}
              >
                {blog.category}
              </div>
              <button
                className='absolute right-3 top-3 rounded-full bg-white bg-opacity-60 p-1 backdrop-blur-md transition-all hover:bg-opacity-80'
                onClick={(e) => handleBookmark(blog.id, e)}
                aria-label='Bookmark this article'
              >
                <Bookmark size={18} className='text-gray-700' />
              </button>
            </div>

            <div className='p-4'>
              <h3 className='line-clamp-2 text-lg font-semibold leading-snug'>
                {blog.title}
              </h3>

              <div className='mt-3 flex items-center gap-2'>
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className='h-7 w-7 rounded-full object-cover'
                />
                <span className='text-sm'>{blog.author.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discover More button - only show on small screens when we have more blogs than what's shown */}
      {isMobile && blogs.length > 2 && (
        <div className='mt-8 flex justify-center'>
          <button
            className='w-full max-w-sm rounded-xl bg-[#0094FF] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0080e0]'
            onClick={() => navigate('/blogs')} // Navigate to blogs page or any other action
          >
            Discover More
          </button>
        </div>
      )}
    </>
  )
}

export default XBlogsCard

