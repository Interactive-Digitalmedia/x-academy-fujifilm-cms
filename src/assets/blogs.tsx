import blogImg from '../../public/images/banner/event2.jpg'

export const blogs = [
  {
    id: '1',
    title: 'A Guide To Clicking Long Exposure Shots',
    category: 'Street',
    author: {
      name: 'Praveen Bhat',
      avatar: `${blogImg}`
    },
    image: `${blogImg}`,
    excerpt:
      'Unlock the secrets to stunning long exposure street photography with this step-by-step guide.',
    link: '/blogs/long-exposure-street'
  },
  {
    id: '2',
    title: 'Mastering the Art of Macro Photography',
    category: 'Macro',
    author: {
      name: 'Emily Parker',
      avatar: `${blogImg}`
    },
    image: `${blogImg}`,
    excerpt:
      'Dive into the world of macro photography and discover tips for capturing tiny details.',
    link: '/blogs/macro-photography'
  },
  {
    id: '3',
    title: 'Top 10 Landscape Photography Locations',
    category: 'Landscape',
    author: {
      name: 'Carlos Ramirez',
      avatar: `${blogImg}`
    },
    image: `${blogImg}`,
    excerpt:
      'From mountain peaks to coastal vistas, explore the best spots for breathtaking landscapes.',
    link: '/blogs/top-landscape-locations'
  }
]
