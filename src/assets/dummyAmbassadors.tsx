// import ambassadorImg from '../../../public/images/ambassadors/ambassadorsImg.png'
import ambassadorImg from '../../public/images/ambassadors/ambassadorsImg.png'

export const dummyAmbassadors = [
  {
    userId: '645f1a2e4b8c2f0012345678',
    slug: 'arjun-mehra',
    name: 'Arjun Mehra',
    profileImage: `${ambassadorImg}`,
    coverImage: 'https://example.com/ambassadors/arjun-cover.jpg',
    bio: 'Street photographer travelling the world to capture candid moments.',
    expertiseTags: ['Street Photography', 'Portraits'],
    socialLinks: {
      instagram: 'https://instagram.com/arjunmehra',
      portfolio: 'https://arjunmehra.com'
    },
    gear: [
      {
        name: 'Fujifilm X-T5',
        image: 'https://example.com/products/xt5.jpg',
        productUrl: '/products/fujifilm-x-t5'
      }
    ],
    isFeatured: true
  },
  {
    userId: '645f1a2e4b8c2f0098765432',
    slug: 'neha-kapoor',
    name: 'Neha Kapoor',
    profileImage: `${ambassadorImg}`,
    coverImage: 'https://example.com/ambassadors/neha-cover.jpg',
    bio: 'Fashion photographer blending studio and natural light.',
    expertiseTags: ['Fashion Photography', 'Editorial'],
    socialLinks: {
      instagram: 'https://instagram.com/nehakapoor',
      portfolio: 'https://nehakapoor.photos'
    },
    gear: [
      {
        name: 'Fujifilm GFX 100S',
        image: 'https://example.com/products/gfx100s.jpg',
        productUrl: '/products/fujifilm-gfx-100s'
      }
    ],
    isFeatured: true
  },
  {
    userId: '645f1a2e4b8c2f0043216789',
    slug: 'amit-rathi',
    name: 'Amit Rathi',
    profileImage: `${ambassadorImg}`,
    coverImage: 'https://example.com/ambassadors/amit-cover.jpg',
    bio: 'Wildlife enthusiast photographing rare species in their habitat.',
    expertiseTags: ['Wildlife Photography', 'Nature'],
    socialLinks: {
      instagram: 'https://instagram.com/amit_rathi'
    },
    gear: [
      {
        name: 'Fujifilm X-H2',
        image: 'https://example.com/products/xh2.jpg',
        productUrl: '/products/fujifilm-x-h2'
      }
    ],
    isFeatured: false
  },
  {
    userId: '645f1a2e4b8c2f0024681357',
    slug: 'praveen-bhat',
    name: 'Praveen Bhat',
    profileImage: `${ambassadorImg}`,
    coverImage: 'https://example.com/ambassadors/praveen-cover.jpg',
    bio: 'Event and portrait photographer with a flair for black-and-white.',
    expertiseTags: ['Portraits', 'Events'],
    socialLinks: {
      portfolio: 'https://praveenbhat.art'
    },
    gear: [
      {
        name: 'Fujifilm X-Pro3',
        image: 'https://example.com/products/xpro3.jpg',
        productUrl: '/products/fujifilm-x-pro3'
      }
    ],
    isFeatured: false
  },
  {
    userId: '645f1a2e4b8c2f0087654321',
    slug: 'ravi-iyer',
    name: 'Ravi Iyer',
    profileImage: `${ambassadorImg}`,
    coverImage: 'https://example.com/ambassadors/ravi-cover.jpg',
    bio: 'Architectural photographer capturing lines and shadows.',
    expertiseTags: ['Architecture', 'Abstract'],
    socialLinks: {
      instagram: 'https://instagram.com/raviiyer'
    },
    gear: [
      {
        name: 'Fujifilm GFX 50S II',
        image: 'https://example.com/products/gfx50s2.jpg',
        productUrl: '/products/fujifilm-gfx-50s-ii'
      }
    ],
    isFeatured: false
  }
]
