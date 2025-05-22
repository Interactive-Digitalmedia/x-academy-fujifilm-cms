import React from 'react'
type Props = {
  image: string
}
const ShowcaseBanner: React.FC<Props> = ({ image }) => {
  return (
    <div className='relative w-full overflow-hidden rounded-[16px] border-none'>
      {/* Background Image */}
      <img
        src={image}
        alt='Showcase Banner'
        className='h-auto w-full object-cover'
      />
      {/* Overlay Content */}
      <div className='absolute inset-0 flex items-center px-6 md:px-[80px]'>
        <div className='max-w-md py-5 text-white'>
          <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-white/80'>
            A Fujifilm Initiative
          </p>
          <h2 className='mb-4 text-3xl font-bold leading-tight md:text-4xl'>
            Showcase your work
          </h2>
          <p className='mb-6 text-sm text-white/80 md:text-base'>
            Share your most compelling shots and stand a chance to be featured
            on Fujifilm India’s official platforms.
          </p>
          <button className='rounded-full bg-[#0094FF] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#007DD6]'>
            Get Featured
          </button>
        </div>
      </div>
    </div>
  )
}
export default ShowcaseBanner
