import { assetPath } from '@/lib/utils';

export type OfficeLocation = {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: { weekdays: string; weekend: string };
  services: string[];
  staff: { name: string; role: string; languages: string[] }[];
  transport: string[];
  image: string;
  directionsUrl?: string;
  videoWebm?: string;
  videoMp4?: string;
};

export const LOCATIONS: OfficeLocation[] = [
  {
    name: "Charlestown (Head Office)",
    address: "Level 3, 3 Hopetoun St, Charlestown NSW 2290",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "Monday to Friday - 9:00am - 5:00pm",
      weekend: "Closed weekends",
    },
    services: [
      "Settlement Support",
      "Home Care",
      "Family Support",
      "Community Programs",
      "Youth Services",
      "Aged Care Volunteer Visitors Scheme (ACVVS)",
    ],
    staff: [
      { name: "Sarah Chen", role: "CEO", languages: ["English", "Mandarin"] },
      { name: "Ahmed Hassan", role: "Settlement Director", languages: ["English", "Arabic", "French"] },
      { name: "Maria Santos", role: "Home Care Director", languages: ["English", "Tagalog", "Spanish"] },
    ],
    transport: [
      "Charlestown Square bus interchange",
      "Local bus services",
      "Paid parking available",
    ],
    image: assetPath("/images/Location/Location_Charlestown_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/1Gz2RxDMd5kq2k1D7",
    videoWebm: assetPath("/media/charlestown_720p.webm"),
    videoMp4: undefined,
  },
  {
    name: "Central Coast",
    address:
      "Tuggerah Lakes Community Centre, 1 Bay Village Road, Bateau Bay NSW 2261",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "Monday to Friday - 8:00am - 4:00pm",
      weekend: "Closed weekends",
    },
    services: [
      "Settlement Support",
      "Home Care",
      "Family Services",
      "Community Programs",
      "Youth Services",
      "Aged Care Volunteer Visitors Scheme (ACVVS)",
    ],
    staff: [
      { name: "Lisa Wong", role: "Office Manager", languages: ["English", "Mandarin", "Cantonese"] },
      { name: "Carlos Rodriguez", role: "Settlement Worker", languages: ["English", "Spanish", "Portuguese"] },
    ],
    transport: [
      "Nearest bus routes and parking available",
      "Wheelchair accessible",
    ],
    image: assetPath("/images/Location/Location_Central-Coast_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/yqR8oGEx4TDEPcmD7",
    videoWebm: assetPath("/media/central-coast_720p.webm"),
    videoMp4: undefined,
  },
  {
    name: "Tamworth",
    address: "3/345 Peel Street, Tamworth NSW 2340",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "Monday to Friday - 8:00am - 4:00pm",
      weekend: "Closed weekends",
    },
    services: ["Settlement Support", "Community Programs", "Youth Services"],
    staff: [{ name: "David Thompson", role: "Regional Manager", languages: ["English"] }],
    transport: ["Local bus services", "Street parking available"],
    image: assetPath("/images/Location/Location_Tamworth_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/ranJYc6KHfv8k28r7",
    videoWebm: assetPath("/media/tamworth_720p.webm"),
    videoMp4: undefined,
  },
  {
    name: "Armidale",
    address: "86 Beardy Street, Armidale NSW 2350",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "Monday to Friday - 9:00am - 5:00pm",
      weekend: "Closed weekends",
    },
    services: ["Settlement Support", "Community Programs", "Youth Services"],
    staff: [
      { name: "Fatima Al-Zahra", role: "Settlement Worker", languages: ["English", "Arabic", "Farsi"] },
    ],
    transport: ["Local bus services", "Street parking available"],
    image: assetPath("/images/Location/Location_Armidale_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/1jZ6aD7bC1w2k1D7",
    videoWebm: assetPath("/media/armidale_720p.webm"),
    videoMp4: undefined,
  },
];
