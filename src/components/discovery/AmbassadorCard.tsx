// components/AmbassadorCard.tsx
import React from 'react'
// import

type Props = {
  ambassador: any
  onClick?: () => void
}

const AmbassadorCard: React.FC<Props> = ({ ambassador, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='flex w-[100%] cursor-pointer flex-col items-center rounded-lg'
    >
      <div className='h-[200px] w-[200px] overflow-hidden rounded-full'>
        <img
          src={ambassador?.image}
          alt={ambassador?.name}
          className='h-full w-full object-cover'
        />
      </div>
      <p className='text-center text-sm font-medium text-foreground'>
        {ambassador?.name}
      </p>
    </div>
  )
}

export default AmbassadorCard
