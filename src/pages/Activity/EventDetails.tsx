import { ChevronLeft } from 'lucide-react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import DisplayImage from '/public/images/banner/displayImage.png'
import ShieldImage from '/public/images/banner/shield.png'
import DateIcon from '/public/images/banner/icons/dateIcon.png'
import ClockIcon from '/public/images/banner/icons/clockIcon.png'
import LocationIcon from '/public/images/banner/icons/locationIcon.png'
import WorkshopIcon from '/public/images/banner/icons/workshopIcon.png'
import HourglassIcon from '/public/images/banner/icons/hourglassIcon.png'
import LanguageIcon from '/public/images/banner/icons/languageIcon.png'
import EventConcluded from '/public/images/banner/eventConcluded.png'
// import LunchIcon from '/public/images/banner/icons/lunchIcon.png'
// import CameraIcon from '/public/images/banner/icons/cameraIcon.png'
import InstagramIcon from '/public/images/banner/icons/instagramIcon.png'
import FacebookIcon from '/public/images/banner/icons/facebookIcon.png'
import EventAmbassador from '/public/images/banner/EventAmbassador.png'
import { Globe, Bookmark } from 'lucide-react'
import ActivityGrid from '@/components/homePage/ActivityGrid'
import NewsletterBanner from '@/components/homePage/NewsletterBanner'
import NewsletterImage from '/public/images/banner/newsletter.png'
import { demoActivities } from '@/assets/activities'
import {Accordion, AccordionItem} from '@nextui-org/react'
import ScheduleBulletIcon from '/public/images/banner/icons/scheduleBulletIcon.png'
import { useEffect, useState } from 'react'
import { TooltipComponent } from '@/components/TooltipComponent'
import React from 'react'
import { badgeColors } from '@/assets/badgeColors'
import GalleryMasonryGrid from '@/components/homePage/GalleryMasonryGrid'
import useGlobalStore from '@/state/GlobalState'


const EventDetails = () => {
  const { signedIn, setShowLoginModal } = useGlobalStore()
    const navigate = useNavigate()
    const pathSegments = location.pathname.split('/').filter(Boolean)
    // const { eventSlug } = useParams()
    const { state } = useLocation()
    const activity = state?.activity

      const [selectedIndex, setSelectedIndex] = useState(0)
      const [activeTab, setActiveTab] = useState('About')


      const isEventConcluded = React.useMemo(() => {
        if (!activity?.date) return false
        const eventDate = new Date(activity.date)
        const today = new Date()
        return eventDate < today
      }, [activity])

    


      const selectedImage = activity?.gallery?.[selectedIndex] || activity?.bannerImage
      const tabs = ['About', 'Ambassador', 'Schedule', 'FAQs']
      if (isEventConcluded) {
        tabs.push('Gallery')
      }


      const handleBookNowClick=()=>{
        if (!signedIn) {
          setShowLoginModal(true)
          return
        }
        navigate('/ticket-booking')
      }

  return (
    <section className="section">
       <div className="flex items-center space-x-2 px-4 py-3 text-sm">
             <button onClick={() => navigate(-1)} className="focus:outline-none">
               <ChevronLeft className="h-6 w-6" />
             </button>
       
             {pathSegments.map((segment, index) => {
               const isLast = index === pathSegments.length - 1
               return (
                 <React.Fragment key={index}>
                   {index > 0 && <span className="text-gray-500">/</span>}
                   <span className={isLast ? 'font-medium capitalize' : 'text-gray-500 capitalize'}>
                     {decodeURIComponent(segment)}
                   </span>
                 </React.Fragment>
               )
             })}
           </div>


    {/* three cards  */}

    <div className="flex flex-col lg:flex-row gap-6 mb-10 mt-4">
  {/* LEFT SECTION */}
  <div className="flex-1 max-h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollbar-hide">
    {/* Event Overview Card */}

    <div className="card relative p-4">
    {/* Top-right icons */}
    <div className="absolute top-4 right-4 flex gap-2">
      <button className="icon-button">
        <Globe className="h-5 w-5" />
      </button>
      <button className="icon-button">
        <Bookmark className="h-5 w-5" />
      </button>
    </div>

    {/* Title & Host Info */}
    <h2 className="text-2xl font-bold mb-1">{activity?.title}</h2>
    <p className="text-sm text-gray-400 mb-4">Hosted By</p>
    <div className="flex items-center gap-2 mb-4">
      <img src={DisplayImage} alt="host" className="h-8 w-8 rounded-full" />
      <span className="font-medium text-lg">{activity?.ambassadorName}</span>
      <TooltipComponent text="X-Ambassador">
  <img
    src={ShieldImage}
    alt="badge"
    className="h-6 ml-1 cursor-pointer"
  />
</TooltipComponent>
    </div>

    {/* Main Image */}
    <div className="aspect-video overflow-hidden rounded-xl mb-2">
      <img
        src={selectedImage}
        alt={activity?.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Dots */}
    <div className="mt-4 flex justify-center gap-2">
        {activity?.gallery?.map((_:any, i:any) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === i ? 'w-8 bg-black dark:bg-white'
                : 'w-2 bg-[#999999]'
            }`}
          ></button>
        ))}
      </div>

    {/* Thumbnail Gallery */}
    <div className="mt-6 grid grid-cols-5 gap-5 w-[100%] p-2">
  {activity?.gallery?.slice(0, 5).map((img: string, idx: number) => {
    const isSelected = selectedIndex === idx

    return (
      <div
        key={idx}
        className={`relative h-16 w-full cursor-pointer`}
        onClick={() => setSelectedIndex(idx)}
      >
        <img
          src={img}
          alt={`thumb-${idx}`}
          className="h-full w-full object-cover rounded-lg"
        />

        {isSelected && (
          <>
            <span className="corner top-left" />
            <span className="corner top-right" />
            <span className="corner bottom-left" />
            <span className="corner bottom-right" />
          </>
        )}
      </div>
    )
  })}
</div>


  </div>

  <div className="space-y-4 mt-6">
      {/* Tabs */}
      <div className="flex  text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 transition-all ${
              activeTab === tab
                ? 'font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Gallery' && (
  <div className="px-1 pt-2">
    <GalleryMasonryGrid images={activity?.gallery} />
  </div>
)}


{activeTab !== 'Gallery' && (
     <div className="card p-4 space-y-5 text-sm">
     {activeTab === 'About' && (
 <>
   {/* Tags */}
   <div className="flex flex-wrap gap-2">
     {activity?.tags?.map((tag: string, idx: number) => {
        const randomColor = badgeColors[Math.floor(Math.random() * badgeColors.length)]
       return (
         <span
           key={idx}
           className={`rounded-md px-3 py-1 text-xs font-semibold text-white ${randomColor}}`}
           // style={{ backgroundColor: color }}
         >
           {tag}
         </span>
       )
     })}
   </div>

   {/* Why Should You Attend */}
   {activity?.about?.whyShouldYouAttend && (
     <div>
       <h4 className="text-sm font-semibold text-gray-500 mb-2">
         Why Should You Attend?
       </h4>
       <ul className="list-disc pl-5 space-y-1">
         {activity.about.whyShouldYouAttend
           .split('.')
           .filter((s:any) => s.trim().length > 0)
           .map((point:any, i:any) => (
             <li key={i}>{point.trim()}.</li>
           ))}
       </ul>
     </div>
   )}

   {/* What's Included */}
   {activity?.about?.whatsIncluded?.length > 0 && (
     <div>
       <h4 className="text-sm font-semibold text-gray-500 mb-2">
         What’s Included
       </h4>
       <ul className="space-y-2">
         {activity.about.whatsIncluded.map((item:any, i:any) => (
           <li key={i} className="flex items-center gap-2">
             <span className="font-semibold">{item}</span>
           </li>
         ))}
       </ul>
     </div>
   )}

   {/* About Event */}
   {activity?.about?.about && (
     <div>
       <h4 className="text-sm font-semibold text-gray-500 mb-2">
         About Event
       </h4>
       <p className="leading-relaxed">{activity.about.about}</p>
     </div>
   )}
 </>
)}


       {/* Placeholder content for other tabs */}
       {activeTab === 'Ambassador' && (
 <div className="flex flex-col md:flex-row gap-6 items-start">
   {/* Ambassador Image */}
   <div className="w-full md:w-1/2 max-w-sm rounded-xl bg-white overflow-hidden text-center">
     <img
       src={EventAmbassador}
       alt="Tarun Khiwal"
       className="w-full rounded-md object-cover"
     />
   </div>

   {/* Ambassador Bio & Actions */}
   <div className="flex-1 space-y-4">
     <p className="leading-relaxed">
       Tarun Khiwal is an acclaimed Indian photographer known for blending
       fine art with fashion and cultural storytelling. His work reflects a
       deep connection with Indian aesthetics, tradition, and spiritual
       symbolism. <br /><br />
       A recipient of multiple international awards, Tarun continues to push
       boundaries through visual narratives.
     </p>

     {/* Read More */}
     <button className="w-full rounded-md icon-button py-2 text-center font-medium hover:bg-black dark:hover:bg-white/20 transition">
       Read More
     </button>

     {/* Social Links */}
     <div className="flex gap-2">
       <a
         href="https://instagram.com/tarunkhiwal"
         target="_blank"
         rel="noopener noreferrer"
         className="flex items-center gap-2 w-1/2 rounded-md px-4 py-2 text-sm icon-button transition"
       >
         <span>
           <img src={InstagramIcon}/></span> Instagram <span className="ml-auto">↗</span>
       </a>
       <a
         href="https://facebook.com/tarunkhiwal"
         target="_blank"
         rel="noopener noreferrer"
         className="flex items-center gap-2 rounded-md px-4 py-2 text-sm icon-button transition w-1/2"
       >
         <span><img src={FacebookIcon}/></span> Facebook <span className="ml-auto">↗</span>
       </a>
     </div>
   </div>
 </div>
)}

{activeTab === 'Schedule' && (
 <div className="space-y-6">
   {activity?.schedule?.map((day: any, dayIndex: any) => (
     <div key={dayIndex} className="space-y-4">
       {/* Day Title */}
       <h3 className="text-sm font-semibold text-gray-400">{day.dayTitle}</h3>

       {/* Sessions */}
       {day.sessions.map((session: any, index: any) => (
         <div key={index} className="flex gap-4 relative">
           {/* Timeline Column */}
           <div className="relative flex flex-col items-center">
             {/* Vertical Line */}
             {index !== day.sessions.length - 1 && (
               <div className="absolute top-6 left-1/2 -translate-x-1/2 h-full w-px bg-[#006C5180] z-0" />
             )}
             {/* Icon */}
             <img src={ScheduleBulletIcon} className="z-10 w-5 h-5" />
           </div>

           {/* Session Details */}
           <div className="flex-1 pb-4">
             <h4 className="font-semibold leading-tight">{session.title}</h4>
             <p className="text-sm font-medium mb-1">{session.time}</p>
             <ul className="list-disc pl-5 text-sm space-y-1">
               {session.bullets.map((point: any, i: any) => (
                 <li key={i}>{point}</li>
               ))}
             </ul>
           </div>
         </div>
       ))}
     </div>
   ))}
 </div>
)}


      
{activeTab === 'FAQs' && (
 <div className="space-y-4">
   <Accordion
     className="divide-y divide-white/10 border-none shadow-none"
   >
     {activity?.FAQ?.map((faq:any, index:any) => (
       <AccordionItem
         key={index}
         aria-label={`faq-${index}`}
         title={faq.Q}
       >
         {faq.A}
       </AccordionItem>
     ))}
   </Accordion>

   {/* Contact Us Button */}
   <button className="w-full rounded-md  py-2 text-center font-medium icon-button transition">
     Contact Us
   </button>
 </div>
)}


     </div>
)}
      {/* Content Card */}
   
    </div>


  </div>

  {/* RIGHT SECTION */}
  <div className="w-full lg:w-[400px] space-y-6 sticky top-24 self-start">
    {/* Details Card */}
    <div className="card p-4 space-y-4">
  <h3 className="text-lg font-semibold">Details</h3>

  <div className="space-y-4 text-sm">
    {/* Date */}
    <div className="flex items-start gap-3">
      <span className="text-red-500 mt-0.5">
        <img src={DateIcon}/>
      </span>
      <div>
        <p className="text-xs text-gray-500">Date</p>
        <p>{activity?.date}</p>
      </div>
    </div>

    {/* Time */}
    <div className="flex items-start gap-3">
      <span className="text-green-500 mt-0.5">
        <img src={ClockIcon}/>
      </span>
      <div>
        <p className="text-xs text-gray-500">Time</p>
        <p>{activity?.time} Onwards</p>
      </div>
    </div>

    {/* Location */}
    <div className="flex items-start gap-3">
      <span className="text-orange-500 mt-0.5">
        <img src={LocationIcon}/>
      </span>
      <div>
        <p className="text-xs text-gray-500">Location</p>
        <p className="underline cursor-pointer">{activity?.location}</p>
      </div>
    </div>

    {/* Type */}
    <div className="flex items-start gap-3">
      <span className="text-yellow-700 mt-0.5">
        <img src={WorkshopIcon}/>
      </span>
      <div>
        <p className="text-xs text-gray-500">Type</p>
        <p>{activity?.type}</p>
      </div>
    </div>

    {/* Duration */}
    <div className="flex items-start gap-3">
      <span className="text-blue-500 mt-0.5">
        <img src={HourglassIcon}/>
      </span>
      <div>
        <p className="text-xs text-gray-500">Duration</p>
        <p>{activity?.duration} Hours</p>
      </div>
    </div>

    {/* Language */}
    <div className="flex items-start gap-3">
      <span className="text-purple-500 mt-0.5">
        <img src={LanguageIcon}/>
      </span>
      <div>
        <p className="text-xs text-gray-500">Language</p>
        <p>{activity?.language}</p>
      </div>
    </div>
  </div>
</div>


{isEventConcluded ? (
  <div className="card p-4 overflow-hidden">
    {/* Banner Image with Text Overlay */}
    <div className="relative aspect-video w-full overflow-hidden">
      <img
        src={EventConcluded} // Replace with the correct path
        alt="Event Concluded"
        className="h-full w-full object-cover rounded-[8px]"
      />
      <div className="absolute inset-0 flex items-center justify-left p-4">
        <h2 className="text-3xl font-bold text-white leading-tight text-left">
          This Event Has <br /> Concluded
        </h2>
      </div>
    </div>

    {/* Notes */}
    <div className="p-4 text-sm">
      <p className="text-gray-400 mb-2">
        • This ticket grants access to one photography workshop/session at Fujifilm X Academy.
      </p>
      <p className="text-gray-400">
        • Learn at your own pace — a typical session lasts around 2 hours, including hands-on activities.
      </p>
    </div>

    {/* CTA Button */}
    <div className="p-4 pt-0">
      <button className="normal-btn w-full">Explore Similar Events</button>
    </div>
  </div>
):(
  <div className="card p-4 space-y-6">
  {/* Header */}
  <h2 className="text-xl font-semibold text-gray-500">Book Ticket</h2>

  {/* Ticket Info & Spots */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-lg font-bold">Regular Ticket</p>
      <p className="text-base ">₹2400</p>
    </div>
    <div className="rounded-[8px] bg-[#006C51] px-4 py-2 w-[35%] text-left text-white shadow-[0_0_10px_#00994B80] flex justify-between">
      <p className="text-xs leading-none pt-2">• Spots<br />Left</p>
      <p className="text-3xl font-semibold leading-tight">42</p>
    </div>
  </div>

  {/* Seat Selector */}
  <div>
    <h4 className="text-md font-semibold  mb-3">How Many Seats?</h4>
    <div className="grid grid-cols-6 gap-3">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <button
          key={num}
          className={`rounded-full h-12 w-12 text-white flex items-center justify-center text-lg font-medium ${
            num === 1
              ? 'bg-blue-500 shadow-md'
              : 'bg-[#2A2A2A] hover:bg-[#444]'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  </div>

  {/* Notes */}
  <div className="text-xs text-gray-400 space-y-2 mt-1">
    <p>• This ticket grants access to one photography workshop/session at Fujifilm X Academy.</p>
    <p>• Learn at your own pace — a typical session lasts around 2 hours, including hands-on activities.</p>
  </div>

  {/* Action */}
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1">
    <button onClick={handleBookNowClick} className="normal-btn">
      Book Now
    </button>
    <div className="flex items-center justify-center text-sm font-medium gap-2 bg-white/10 px-4 py-2 rounded-md">
      <span>⏳</span>
      <span>00:24:55</span>
    </div>
  </div>
</div>
)}


    {/* Ticket Booking Card */}
   



  </div>



</div>
<p className='font-medium mb-4 text-lg'>Suggested Events</p>
<ActivityGrid demoActivities={demoActivities} activeTab={'month'} />
<NewsletterBanner image={NewsletterImage} />
   
    </section>
  )
}

export default EventDetails