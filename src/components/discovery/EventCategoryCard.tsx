// import * as React from 'react'

// interface EventCategoryCardsProps {}

// const EventCategoryCards: React.FunctionComponent<
//   EventCategoryCardsProps
// > = () => {
//   return (
//     <>
//       <div
//         key={category.id}
//         className='relative h-[200px] cursor-pointer overflow-hidden rounded-2xl'
//         onClick={() => handleCategoryClick(category.path)}
//       >
//         <img
//           src={category.imageSrc}
//           alt={category.title}
//           className='h-full w-full object-cover'
//         />
//         <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40'>
//           <h3 className='text-2xl font-bold text-white'>{category.title}</h3>
//         </div>
//       </div>
//     </>
//   )
// }

// export default EventCategoryCards

// type Props = {
//   title: string
//   imageSrc: string
//   onClick?: () => void
// }

// const CategoryCard = ({ title, imageSrc, onClick }: Props) => {
//   return (
//     <div
//       onClick={onClick}
//       className='group relative h-32 w-56 cursor-pointer overflow-hidden rounded-xl'
//     >
//       <img
//         src={imageSrc}
//         alt={title}
//         className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
//       />
//       <div className='absolute inset-0 bg-black/40' />
//       <h3 className='absolute bottom-3 left-3 z-10 text-lg font-semibold text-white'>
//         {title}
//       </h3>
//     </div>
//   )
// }

// export default CategoryCard

import React from 'react'
import { useNavigate } from 'react-router-dom'

type CategoryCardProps = {
  id: number
  title: string
  imageSrc: string
  path: string
}

const CategoryCard = ({ id, title, imageSrc, path }: CategoryCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(path)
  }

  return (
    <div
      className='relative h-[200px] cursor-pointer overflow-hidden rounded-2xl'
      onClick={handleClick}
    >
      <img src={imageSrc} alt={title} className='h-full w-full object-cover' />
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40'>
        <h3 className='text-2xl font-bold text-white'>{title}</h3>
      </div>
    </div>
  )
}

export default CategoryCard
