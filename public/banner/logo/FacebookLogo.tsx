import React from 'react'

interface FaceBookLogoProps {
  width?: number
  height?: number
  className?: string
}

const FaceBookLogo: React.FC<FaceBookLogoProps> = ({
  width = 24,
  height = 24,
  className
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_822_31117)'>
        <path
          d='M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38823 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.8 13.875 9.749V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z'
          fill='#1877F2'
        />
        <path
          d='M16.6711 15.4688L17.2031 12H13.875V9.749C13.875 8.8 14.3399 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9165 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_822_31117'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default FaceBookLogo
