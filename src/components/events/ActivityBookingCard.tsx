import { Booking } from '@/types'
import React, { useState } from 'react'

interface ActivityBookingCardProps {
  eventData: {
    ticketPrice: number
    pendingSeats: number
  }
  onBookNow?: (selectedSeats: number) => void
  bookingData?: Booking | null
}

const ActivityBookingCard: React.FC<ActivityBookingCardProps> = ({
  eventData,
  onBookNow,
  bookingData
}) => {
  const [selectedSeats, setSelectedSeats] = useState(1)

  const handleSeatClick = (num: number) => {
    setSelectedSeats(num)
  }

  return (
    <div className='card space-y-6 p-4'>
      <h2 className='text-xl font-semibold text-gray-500'>Book Ticket</h2>

      <div className='flex items-center justify-between'>
        <div>
          <p className='text-lg font-bold'>Regular Ticket</p>
          <p className='text-base'>
            ₹{eventData?.ticketPrice === 0 ? 'Free' : eventData?.ticketPrice}
          </p>
        </div>
        <div className='flex w-[35%] justify-between rounded-[8px] bg-[#006C51] px-4 py-2 text-left text-white shadow-[0_0_10px_#00994B80]'>
          <p className='pt-2 text-xs leading-none'>
            • Spots
            <br />
            Left
          </p>
          <p className='text-3xl font-semibold leading-tight'>
            {eventData?.pendingSeats}
          </p>
        </div>
      </div>

      <div>
        <h4 className='text-md mb-3 font-semibold'>How Many Seats?</h4>
        <div className='grid grid-cols-6 gap-3'>
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isDisabled = num > eventData?.pendingSeats
            return (
              <button
                key={num}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-medium text-white transition-all ${
                  isDisabled
                    ? 'cursor-not-allowed bg-gray-500 opacity-50'
                    : num === selectedSeats
                      ? 'bg-primary shadow-md'
                      : 'bg-[#2A2A2A] hover:bg-[#444]'
                }`}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) handleSeatClick(num)
                }}
              >
                {num}
              </button>
            )
          })}
        </div>
      </div>

      <div className='mt-1 space-y-2 text-xs text-gray-400'>
        <p>
          • This ticket grants access to one photography workshop/session at
          Fujifilm X Academy.
        </p>
        <p>
          • Learn at your own pace — a typical session lasts around 2 hours,
          including hands-on activities.
        </p>
      </div>
      {bookingData && (
        <div className='font-medium'>
          <p>
            You have booked {bookingData?.numberOfSeats} seats for this event.
          </p>
        </div>
      )}

      <div className='flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <button
          className='normal-btn w-full'
          onClick={() => onBookNow?.(selectedSeats)}
        >
          Book Now
        </button>
        {/* <div className='flex items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium'>
          <span>⏳</span>
          <span>00:24:55</span>
        </div> */}
      </div>
    </div>
  )
}

export default ActivityBookingCard