import React from 'react'
import { useNavigate } from 'react-router-dom'


type Props = {
  image: string
}
const AmbassadorBanner: React.FC<Props> = ({ image }) => {

  const navigate = useNavigate()

  
    const handleDiscoverMoreClick = () => {
      navigate(`/Ambassadors`)
    }


  return (
    <div className='relative mt-12 flex w-full items-center justify-center'>
      {/* Background Image */}
      <img
        src={image}
        alt='Ambassador Banner'
        className='h-auto w-full rounded-[8px] object-cover'
      />
      {/* Overlay Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
        <h2 className='mb-2 text-3xl font-bold text-white md:text-5xl'>
          Our Ambassadors
        </h2>
        <p className='mb-4 text-sm text-white md:text-base'>
          Recognized for their vision, voice, and dedication to the craft
        </p>
        <button className='rounded-full bg-[#0094FF] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#007DD6]' onClick={handleDiscoverMoreClick}>
          Discover More
        </button>
      </div>
    </div>
  )
}
export default AmbassadorBanner
