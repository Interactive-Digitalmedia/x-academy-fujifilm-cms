import React, { useEffect, useState } from 'react'
import TicketBg from '/public/images/banner/ticketBg.png'
import TicketVariantGreen from '/public/images/banner/ticketVariants/ticketVariantGreen.png'
import TicketVariantOrange from '/public/images/banner/ticketVariants/ticketVariantOrange.png'
import TicketVariantBrown from '/public/images/banner/ticketVariants/ticketVariantBrown.png'
import TicketVariantBlue from '/public/images/banner/ticketVariants/ticketVariantBlue.png'
import TicketVariantLightGreen from '/public/images/banner/ticketVariants/ticketVariantLightGreen.png'
import DemoQrCode from '/public/images/banner/qrcode.png'
import DownloadIcon from '/public/images/banner/icons/downloadIcon.png'
import ShareIcon from '/public/images/banner/icons/shareIcon.png'
import CalendarIcon from '/public/images/banner/icons/calendarIcon.png'

const TicketBooking = () => {
  const bookingId = '2380012364'
  const [viewMode, setViewMode] = useState<'checkin' | 'public'>('checkin')
  const [variant, setVariant] = useState<string | null>(null)

  useEffect(() => {
    // List of variants
    const variants = [TicketVariantGreen, TicketVariantOrange, TicketVariantBrown, TicketVariantBlue, TicketVariantLightGreen]
    const randomIndex = Math.floor(Math.random() * variants.length)
    setVariant(variants[randomIndex])
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${TicketBg})`,
        backgroundColor: '#000'
      }}
    >



      {/* Wrap the ticket and buttons in one column */}
      <div className="flex flex-col items-center space-y-6 pt-[5rem]">

{/* Toggle Buttons */}
<div className="flex bg-black w-full p-[5px] rounded-[8px] border border-[#1A1A1A] shadow-inner">
  <button
    onClick={() => setViewMode('checkin')}
    className={`px-5 py-2 text-sm font-medium rounded-[8px] w-1/2 transition-all duration-150 ${
      viewMode === 'checkin'
        ? 'bg-[#161616] text-white shadow-sm'
        : 'bg-transparent text-white'
    }`}
  >
    Check-In View
  </button>
  <button
    onClick={() => setViewMode('public')}
    className={`px-5 py-2 text-sm font-medium rounded-[8px] w-1/2 transition-all duration-150 ${
      viewMode === 'public'
        ? 'bg-[#161616] text-white shadow-sm'
        : 'bg-transparent text-white'
    }`}
  >
    Public View
  </button>
</div>


        {/* Ticket Container */}
        <div className="relative">
          {/* Ticket Background */}
          <img
            src={variant || TicketVariantGreen}
            alt="Ticket"
            className="max-w-[280px] sm:max-w-sm md:max-w-md"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 px-6 left-[28%] top-8 flex flex-col items-start text-white font-sans">
            <div className="flex flex-col items-start space-y-1 ">
                <div className='border-b border-[#3C3C3C] pb-1 w-[80%]'>
              <p className="font-semibold text-2xl">Visual Alchemy And Fujifilm</p>
              <p className="text-lg text-gray-400 ">Monday, April 28th 2025</p>
              </div>
              <div className="pt-3 border-b border-[#3C3C3C] w-[80%] pb-1">
                <p className="font-semibold text-2xl">John Doe</p>
                <p className="text-lg text-gray-400">some@gmail.com</p>
              </div>

              <div className="pt-5 text-center">
                <p className="text-2xl">Bangalore</p>
                <p className="text-lg text-white">Quantity: 1</p>

                {/* QR Code Image */}
                <div className="pt-3">
                  <img  src={viewMode === 'checkin' ? DemoQrCode : ""} height="1000px" />
                </div>

                <p className="pt-2 text-lg text-gray-400">
                  Booking ID - {bookingId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
      {/* Action Buttons - Full width matching ticket */}
<div className="w-full max-w-[550px] space-y-3 px-2">
  {/* Row 1: Download + Share */}
  <div className="flex">
    <button className="w-1/2 flex items-center text-white space-x-2  justify-center !border p-2 !border-[#3C3C3C] !bg-[#1F1F1F] rounded-[8px]">
      <img src={DownloadIcon} className="w-4 h-4" />
      <span>Download</span>
    </button>

    <button className="w-1/2 flex space-x-2 text-white items-center justify-center !border p-2 !border-[#3C3C3C] !bg-[#1F1F1F] rounded-[8px] ml-2">
      <img src={ShareIcon} className="w-4 h-4" />
      <span>Share</span>
    </button>
  </div>

  {/* Row 2: Full width calendar button */}
  <button className="w-full flex items-center text-white space-x-2 justify-center !border p-2 !border-[#3C3C3C] !bg-[#1F1F1F] rounded-[8px]">
    <img src={CalendarIcon} className="w-4 h-4" />
    <span>Add to Calendar</span>
  </button>
</div>

      </div>
    </div>
  )
}

export default TicketBooking
