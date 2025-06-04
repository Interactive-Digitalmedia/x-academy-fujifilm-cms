export type Activity = {
  title: string;
  startDateTime: string;
  time: string;
  location: string;
  type: string;
  duration: number;
  language: string;
  about: {
    whyShouldYouAttend: string;
    whatsIncluded: string[];
    about: string;
  };
  gallery: string[];
  ambassador: string[];
  status: string;
  FAQ: {
    Q: string;
    A: string;
  }[];
  seatCount: number;
  pendingSeats: number;
  isFeatured: boolean;
  bannerImage: string;
  tags: string[];
  ambassadorName: string;
  gallery: string[];
};

// types/ambassador.ts
export interface Ambassador {
  userId: string; // e.g. MongoDB ObjectId string
  slug: string; // human-readable URL slug
  name: string; // display name
  profileImage: string; // avatar URL
  coverImage: string; // banner URL (for profile page)
  bio: string;
  expertiseTags: string[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    portfolio?: string;
  };
  gear: {
    name: string;
    image: string;
    productUrl: string;
  }[];
  isFeatured: boolean;
}

// Faq template schmema
