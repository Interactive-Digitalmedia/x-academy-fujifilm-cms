// import calender from '/images/calendar.svg'

import useDeviceDetect from "@/hooks/useDeviceDetect"

export default function Topbar() {
  const isMobile = useDeviceDetect()
  function getCover() {
    const now = new Date()
    const hour = now.getHours()

    if (hour >= 20 || hour < 5) {
      return 'night'
    } else if (hour >= 5 && hour < 12) {
      return 'sunrise'
    } else if (hour >= 12 && hour < 16) {
      return 'sunset'
    } else {
      return 'sunset'
    }
  }

  return (
    // <>
    //   <section className='topbar'>
    //     <div className='flex flex-row items-center bg-black px-4 py-[3rem]'></div>
    //   </section>
    // </>
    <>
      <section className='topbar relative'>
        {/* Video Background */}
        {/* <video
          className='absolute inset-0 h-full w-full object-cover'
          src='/videos/windmill.mp4' // path to your video
          autoPlay
          loop
          muted
        /> */}
        <img
          className={`absolute inset-0 h-full w-full object-cover ${isMobile ? 'rounded-none' : 'rounded-t-xl'}`}
          src={`/images/${getCover()}.png`} // path to your video
        />

        {/* Topbar Content */}
        <div className='relative z-10 flex flex-row items-center px-4 py-[3rem] shadow-lg'>
          {/* Add your topbar content here */}
        </div>
      </section>
    </>
  )
}
