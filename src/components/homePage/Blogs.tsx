import * as React from 'react'
import { useRef, useState, useEffect } from 'react'

interface Author {
  name: string
  avatar: string
}

interface Blog {
  id: string | number
  title: string
  category: string
  image: string
  author: Author
  link: string
  excerpt?: string // Making excerpt optional as it was commented out in the original code
}

interface BlogsProps {
  blogs: Blog[]
  viewBlogsBlack: string // Path to dark theme logo
  viewBlogsWhite: string // Path to light theme logo
}

const Blogs: React.FunctionComponent<BlogsProps> = ({
  blogs,
  viewBlogsBlack,
  viewBlogsWhite
}) => {
  const blogContainerRef = useRef<HTMLDivElement>(null)
  const [activeBlogIndex, setActiveBlogIndex] = useState(0)

  // Function to scroll to a specific blog
  const scrollToBlog = (index: number) => {
    if (blogContainerRef.current) {
      const blogElements =
        blogContainerRef.current.querySelectorAll(':scope > div')
      if (blogElements[index]) {
        blogElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
        setActiveBlogIndex(index)
      }
    }
  }

  // Detect which blog is currently visible in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (blogContainerRef.current) {
        const container = blogContainerRef.current
        const blogElements = container.querySelectorAll(':scope > div')

        // Find the first blog element that is fully visible
        const containerTop = container.scrollTop
        const containerBottom = containerTop + container.clientHeight

        for (let i = 0; i < blogElements.length; i++) {
          const element = blogElements[i] as HTMLElement
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight

          // Check if element is fully or mostly visible in the container
          if (
            (elementTop >= containerTop && elementBottom <= containerBottom) ||
            (elementTop < containerTop &&
              elementBottom > containerTop + container.clientHeight / 2)
          ) {
            setActiveBlogIndex(i)
            break
          }
        }
      }
    }

    const containerElement = blogContainerRef.current
    if (containerElement) {
      containerElement.addEventListener('scroll', handleScroll)
      // Initialize with the first visible blog
      handleScroll()
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className='card flex justify-between rounded-2xl md:px-6'>
      {/* Left: Static Text */}
      <div className='flex flex-col justify-center'>
        <div className='h-24 w-60 overflow-hidden'>
          <img
            src={viewBlogsBlack}
            className='hidden h-[100%] w-[100%] dark:block'
            alt='Logo Dark'
          />
          <img
            src={viewBlogsWhite}
            className='block h-[100%] w-[100%] dark:hidden'
            alt='Logo Light'
          />
        </div>
        <p className='mt-4 font-medium'>
          Stay updated on all the exciting <br /> events hosted by FujiFilms!
        </p>
      </div>

      {/* Right: Scrollable Vertical Blog Slider */}
      <div className='relative flex'>
        {/* Blog scroll container */}
        <div
          ref={blogContainerRef}
          className='max-h-[320px] w-full overflow-y-auto'
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE 10+
            WebkitOverflowScrolling: 'touch' // iOS momentum scrolling
          }}
        >
          {blogs.map((blog) => (
            <div key={blog.id} className='flex items-center'>
              {/* Image + Tag */}
              <div className='relative h-[280px] w-[380px] flex-shrink-0 overflow-hidden rounded-xl'>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='h-[100%] w-[100%] overflow-hidden'
                />
                <span className='absolute left-12 top-10 rounded-md bg-blue-500 px-3 py-1 text-xs font-semibold text-white'>
                  {blog.category}
                </span>
              </div>

              {/* Text Content */}
              <div className='flex flex-1 flex-col justify-between'>
                <h3 className='mb-1 text-base font-semibold'>{blog.title}</h3>
                <div className='mb-3 flex items-center gap-2'>
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className='h-6 w-6 rounded-full object-cover'
                  />
                  <p className='text-sm text-gray-700'>{blog.author.name}</p>
                </div>
                {/* <p className='mb-4 text-sm text-gray-600'>{blog.excerpt}</p> */}
                <a href={blog.link}>
                  <button
                    className='normal-btn !rounded-full'
                  >
                    Discover More
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Pagination Dots */}
        <div className='ml-3 flex flex-col items-center justify-center gap-2'>
          {blogs.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToBlog(i)}
              className={`w-2 rounded-full transition-all duration-300 ${
                i === activeBlogIndex
                  ? 'h-8 bg-black dark:bg-white'
                  : 'h-2 bg-[#999999]'
              }`}
              aria-label={`Go to blog ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
