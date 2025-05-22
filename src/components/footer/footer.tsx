import React from 'react'
import XAcademyBlack from '../../../public/images/banner/logo/footerLogoBlack.png'
import XAcademyWhite from '../../../public/images/banner/logo/footerLogoWhite.png'

interface FooterProps {
  className?: string
}

const XAcademyFooter: React.FC<FooterProps> = ({ className = '' }) => {
  const footerLinks = {
    explore: [
      { name: 'Home', href: '/home' },
      { name: 'Discover', href: '/discover' },
      { name: 'Community', href: '/community' },
      { name: 'Shop', href: '/shop' },
      { name: 'Warranty Registration', href: '/warranty' }
    ],
    bookings: [
      { name: 'View Bookings', href: '/bookings/view' },
      { name: 'Manage Bookings', href: '/bookings/manage' },
      { name: 'Past Bookings', href: '/bookings/past' },
      { name: 'Customer Support', href: '/support' },
      { name: 'Gallery Showcase', href: '/gallery' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Teams', href: '/teams' },
      { name: 'Contact Us', href: '/contact' }
    ],
    legal: [
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' }
    ]
  }

  return (
    <footer className={`w-full ${className}`}>
      {/* Desktop XAcademyFooter */}
      <div className='hidden px-14 py-10 lg:block'>
        <div className=''>
          <div className='flex justify-between'>
            {/* Logo and Description */}
            <div className='mb-10 max-w-xl'>
              <div className='mb-6'>
                <div className=''>
                  <img
                    src={XAcademyWhite}
                    alt='X-Academy Logo'
                    className='hidden w-32 dark:block md:w-60'
                  />
                  <img
                    src={XAcademyBlack}
                    alt='X-Academy Logo'
                    className='block w-32 dark:hidden md:w-60'
                  />
                </div>
              </div>
              <p className='text-sm leading-relaxed'>
                X-Academy is Fujifilm&apos;s official learning platform,
                offering expert-led courses and workshops to help photographers
                master the X Series and GFX systems through hands-on, creative
                learning.
              </p>
            </div>

            {/* Navigation */}
            <div className='grid grid-cols-3 gap-8'>
              {/* Explore Column */}
              <div className=''>
                <h3 className='mb-4 text-lg font-medium'>Explore</h3>
                <ul className='space-y-3'>
                  {footerLinks.explore.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='transition-colors'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bookings Column */}
              <div>
                <h3 className='mb-4 text-lg font-medium'>Bookings</h3>
                <ul className='space-y-3'>
                  {footerLinks.bookings.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='transition-colors'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className='mb-4 text-lg font-medium'>Company</h3>
                <ul className='space-y-3'>
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='transition-colors'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Legal Links */}
          <div className='mt-10 flex items-center justify-between pt-4'>
            <p className='text-sm'>
              Copyright © 2025 fujifilmxindia. All rights reserved.
            </p>
            <div className='flex space-x-8'>
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-sm transition-colors'
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile XAcademyFooter */}
      <div className='px-8 py-8 lg:hidden'>
        <div className='flex flex-col space-y-8'>
          {/* Logo and Description */}
          <div className='flex flex-col items-center text-center'>
            <div className='mb-4'>
              <div className=''>
                <img
                  src={XAcademyWhite}
                  alt='X-Academy Logo'
                  className='hidden h-12 w-auto dark:block'
                />
                <img
                  src={XAcademyBlack}
                  alt='X-Academy Logo'
                  className='block h-12 w-auto dark:hidden'
                />
              </div>
            </div>
            <p className='px-2 text-sm'>
              X-Academy is Fujifilm&apos;s official learning platform, offering
              expert-led courses and workshops to help photographers master the
              X Series and GFX systems through hands-on, creative learning.
            </p>
          </div>

          {/* Section: Explore */}
          <div>
            <h3 className='mb-4 text-base font-medium'>Explore</h3>
            <ul className='space-y-4'>
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className='text-[14px] transition-colors'>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Bookings */}
          <div>
            <h3 className='mb-4 text-base font-medium'>Bookings</h3>
            <ul className='space-y-4'>
              {footerLinks.bookings.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className='text-[14px] transition-colors'>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Company */}
          <div>
            <h3 className='mb-4 text-base font-medium'>Company</h3>
            <ul className='space-y-4'>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className='text-[14px] transition-colors'>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and Copyright */}
          <div className='pt-6'>
            <div className='mb-4 flex justify-center space-x-4'>
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-sm transition-colors'
                >
                  {link.name}
                </a>
              ))}
            </div>
            <p className='text-center text-sm'>
              Copyright © 2025 fujifilmxindia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default XAcademyFooter
