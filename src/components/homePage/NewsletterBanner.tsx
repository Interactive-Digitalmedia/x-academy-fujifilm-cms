import React from 'react'

type Props = {
  image: string
}

const NewsletterBanner: React.FC<Props> = ({ image }) => {
  return (
    <div className="relative mt-10 w-full overflow-hidden rounded-[20px]">
      {/* Background Image */}
      <img
        src={image}
        alt="Newsletter Background"
        className="h-auto w-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[600px] px-6 pb-[60px] pt-[100px] text-white md:px-[80px]">
          {/* Email Input + Button */}
          <div className="mb-4 flex w-full overflow-hidden rounded-[12px] border-2 border-white bg-white">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-5 py-3 text-sm text-black placeholder-gray-500 focus:outline-none"
            />
            <button className="rounded-r-[10px] bg-[#0094FF] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#007dd6]">
              Subscribe
            </button>
          </div>

          {/* Subtext */}
          <p className="text-sm font-medium leading-relaxed text-white sm:text-base">
            So you don’t miss out on any fun events from FujiFilms!
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsletterBanner
