// src/components/discover/DiscoverHeader.tsx
import { Input, Button } from '@nextui-org/react'
import { Search } from 'lucide-react'

type DiscoverHeaderProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showBackButton: boolean
  onBackClick: () => void
  onCloseClick: () => void
}

const DiscoverHeader = ({
  searchQuery,
  setSearchQuery,
  showBackButton,
  onBackClick,
  onCloseClick
}: DiscoverHeaderProps) => {
  return (
    <>
      <nav className='fixed top-0 left-0 z-40 flex min-h-16 w-full items-center justify-between gap-10 bg-white/60 px-6 backdrop-blur-md dark:bg-black/30'>
        {showBackButton ? (
          <Button
            isIconOnly
            variant='light'
            onPress={onBackClick}
            className='mr-2'
          >
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18L9 12L15 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {/* <ChevronLeft size={24} color='black ' /> */}
          </Button>
        ) : (
          <div className='w-10'></div> // Empty space for alignment
        )}

        <div className='flex-1'>
          <Input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-4'
            size='md'
            variant='bordered'
            isClearable
            onClear={() => setSearchQuery('')}
            startContent={<Search size={18} className='text-gray-400' />}
            classNames={{
              base: 'max-w-full',
              mainWrapper: 'h-full',
              input: 'text-sm text-white',
              inputWrapper:
                'h-10 bg-transparent rounded-full border border-gray-700'
            }}
          />
        </div>

        <Button
          isIconOnly
          variant='light'
          onPress={onCloseClick}
          className='ml-2'
        >
          <svg
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 18L18 6M6 6L18 18'

              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Button>
      </nav>
    </>
  )
}

export default DiscoverHeader
