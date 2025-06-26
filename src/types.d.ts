export type Session = {
  day: string;
  title: string;
  speaker: string;
  startTime: string;
  endTime: string;
  description: string;
};

export type DaySchedule = {
  sessions: Session[];
};

export type AboutSection = {
  about: string;
  whyShouldYouAttend: string;
  whatsIncluded: string[];
};

type NormalizedFaqForForm = {
  _id: string;
  items: { Q: string; A: string }[];
};

export interface FaqItem {
  question: string;
  answer: string;
  _id?: string;
}

export interface Faq {
  _id: string;
  name: string;
  items: FaqItem[];
  faqType: "general" | "specific-event";
  createdAt?: string;
  updatedAt?: string;
}

export type Activity = {
  _id: string;
  activityName: string;
  tags: string[];
  activityType: string;
  activityCategory: string;
  startDate: string;
  endDate: string;
  location: string;
  language: string;
  venue: string;
  ambassadorId: string[] | Ambassador[];
  pricing: string; // e.g., "paid" or "free"
  amount: number;
  about: AboutSection;
  schedule: DaySchedule[];
  heroImage: string;
  gallery: string[];
  postEventImages: string[];
  eventManagerId: string[];
  duration: number; // in hours
  status: "draft" | "published";
  FAQ: string | Faq | NormalizedFaqForForm;
  seatCount: number;
  pendingSeats: number;
  isFeatured: boolean;
  stopRegistration: boolean;
  enableWaitlist: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// types/ambassador.ts
// export interface Ambassador {
//   userId: string; // e.g. MongoDB ObjectId string
//   slug: string; // human-readable URL slug
//   name: string; // display name
//   profileImage: string; // avatar URL
//   coverImage: string; // banner URL (for profile page)
//   bio: string;
//   expertiseTags: string[];
//   socialLinks: {
//     instagram?: string;
//     facebook?: string;
//     portfolio?: string;
//   };
//   gear: {
//     name: string;
//     image: string;
//     productUrl: string;
//   }[];
//   isFeatured: boolean;
// }

// Faq template schmema

export interface Ambassador {
  _id: string;
  fullname: string;
  profileImage?: string;
  bannerImage?: string;
  userName: string;
  bio?: string;
  about?: string;
  joinedDate: string;
  about?: {
    who?: string;
    about?: string;
  };
  gallery?: string[];
  location?: string;
  type: string;
  tags?: string[];
  socialMediaUrls?: {
    facebook?: string;
    instagram?: string;
  };
  gearDetails?: {
    gearOwned?: string;
    productName?: string;
    productLink?: string;
  }[];
  email: string;
  contactNumber: string;
  totalEvents?: string;
  upcomingEvents?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutUsContentType {
  _id?: string;
  type:
    | "about"
    | "termsandconditions"
    | "privacypolicy"
    | "refundpolicy"
    | "cookiespolicy"
    | "communityguidelines"
    | "contact";
  content?: string;
  contact?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      Xtwitter?: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProfileData {
  name: string;
  email: string;
  contactNumber: string;
  profileImage: string;
  state: string;
  socialMediaUrls: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  joinedAt: string;
}

export interface MetaData {
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface CTA {
  text?: string;
  link?: string;
}

export interface BlogImage {
  url?: string;
  description?: string;
}

export interface Blog {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  tags: string[];
  blogImages: BlogImage[];
  content: string;
  metaData?: MetaData;
  cta?: CTA[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  userId: string;
  activityId: string;
  numberOfSeats: number;
  status: "booked" | "waitlisted" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
