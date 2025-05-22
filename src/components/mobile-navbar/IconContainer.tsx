{
  /* <img
  loading='lazy'
  src={src}
  alt={alt}
  className='my-auto aspect-square w-6 self-stretch object-contain'
/> */
}

import React from 'react'

interface IconContainerProps {
  IconComponent?: React.ElementType
  className?: string
}

const IconContainer: React.FC<IconContainerProps> = ({
  IconComponent,
  className = ''
}) => (
  <div
    className={`my-auto flex min-h-[39px] w-10 items-center justify-center self-stretch rounded-[500px] ${className}`}
  >
    {IconComponent && <IconComponent />}
  </div>
)

export default IconContainer
