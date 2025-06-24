import EventConcluded from "/public/banner/eventConcluded.png"

const ActivityConcludedCard = () => {
  return (
    <div className='card overflow-hidden p-4'>
      <div className='relative aspect-video w-full overflow-hidden'>
        <img
          src={EventConcluded}
          alt='Event Concluded'
          className='h-full w-full rounded-[8px] object-cover'
        />
        <div className='justify-left absolute inset-0 flex items-center p-4'>
          <h2 className='text-left text-3xl font-bold leading-tight text-white'>
            This Event Has <br /> Concluded
          </h2>
        </div>
      </div>

      <div className='p-4 text-sm'>
        <p className='mb-2 text-gray-400'>
          • This ticket grants access to one photography workshop/session at
          Fujifilm X Academy.
        </p>
        <p className='text-gray-400'>
          • Learn at your own pace — a typical session lasts around 2 hours,
          including hands-on activities.
        </p>
      </div>

      <div className='p-4 pt-0'>
        <button className='normal-btn w-full'>Explore Similar Events</button>
      </div>
    </div>
  )
}

export default ActivityConcludedCard