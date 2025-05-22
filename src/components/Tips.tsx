import { ArrowRight, MessageCircleQuestion } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Tips() {
  return (
    <>
      <section className='grid w-[280px] flex-shrink-0 flex-grow-0 place-content-center gap-3'>
        <div className='tips-content mx-4'>
          <div className='tips-section-header mb-6'>
            <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
              We are doers.
            </h4>
            <p className='text-sm text-muted-foreground'>
              We are dedicated to making your lives better.
            </p>
          </div>
          <div className='button-group flex w-full flex-col gap-2'>
            <a
              href='https://forms.gle/brLdsKpMPAmSTHcc9'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full'
            >
              <Button variant={'secondary'} size={'sm'} className='w-full'>
                <MessageCircleQuestion className='mr-2 ms-2 h-4 w-4' />
                Help us improve <ArrowRight className='ml-2 ms-2 h-4 w-4' />
              </Button>
            </a>
          </div>
        </div>
        <img
          src='/images/Image-3.webp'
          alt='placeholder'
          className='translate-x-[13%]'
        />
      </section>
    </>
  )
}
