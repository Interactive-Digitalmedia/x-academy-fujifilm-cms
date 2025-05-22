import * as React from 'react'
import { ChevronRight } from 'lucide-react'

interface SectionHeaderProps {
  // Required props
  title: string

  // Optional props
  showViewAll?: boolean
  viewAllText?: string
  onViewAllClick?: () => void
  className?: string
  iconSize?: number
}

const SectionHeader: React.FunctionComponent<SectionHeaderProps> = ({
  title,
  showViewAll = true,
  viewAllText = 'View All',
  onViewAllClick = () => {},
  className = '',
  iconSize = 14
}) => {
  return (

    <div className={`mb-6 mt-10 w-full border-b dark:border-[#3C3C3C] border-[#0000001A] ${className}`}>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>{title}</h2>

        {showViewAll && (
          <button
            onClick={onViewAllClick}
            className='flex items-center gap-1 text-sm hover:underline'
          >
            {viewAllText}{' '}
            <span className='text-base'>
              <ChevronRight size={iconSize} />
            </span>
          </button>
        )}
      </div>
      {/* <hr className='divider' /> */}
    </div>
  )
}

export default SectionHeader
