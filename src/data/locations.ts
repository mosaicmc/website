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
    name: "locations.charlestown.name",
    address: "locations.charlestown.address",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "locations.charlestown.hours.weekdays",
      weekend: "locations.common.hours.weekend",
    },
    services: [
      "locations.services.settlementSupport",
      "locations.services.homeCare",
      "locations.services.familySupport",
      "locations.services.communityPrograms",
      "locations.services.youthServices",
      "locations.services.acvvs",
    ],
    staff: [
      { name: "Sarah Chen", role: "roles.ceo", languages: ["languages.english", "languages.mandarin"] },
      { name: "Ahmed Hassan", role: "roles.settlementDirector", languages: ["languages.english", "languages.arabic", "languages.french"] },
      { name: "Maria Santos", role: "roles.homeCareDirector", languages: ["languages.english", "languages.tagalog", "languages.spanish"] },
    ],
    transport: [
      "locations.charlestown.transport.bus",
      "locations.charlestown.transport.localBus",
      "locations.charlestown.transport.parking",
    ],
    image: assetPath("/images/Location/Location_Charlestown_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/1Gz2RxDMd5kq2k1D7",
    videoWebm: assetPath("/media/charlestown_720p.webm"),
    videoMp4: undefined,
  },
  {
    name: "locations.centralCoast.name",
    address:
      "locations.centralCoast.address",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "locations.centralCoast.hours.weekdays",
      weekend: "locations.common.hours.weekend",
    },
    services: [
      "locations.services.settlementSupport",
      "locations.services.homeCare",
      "locations.services.familyServices",
      "locations.services.communityPrograms",
      "locations.services.youthServices",
      "locations.services.acvvs",
    ],
    staff: [
      { name: "Lisa Wong", role: "roles.officeManager", languages: ["languages.english", "languages.mandarin", "languages.cantonese"] },
      { name: "Carlos Rodriguez", role: "roles.settlementWorker", languages: ["languages.english", "languages.spanish", "languages.portuguese"] },
    ],
    transport: [
      "locations.centralCoast.transport.bus",
      "locations.centralCoast.transport.accessible",
    ],
    image: assetPath("/images/Location/Location_Central-Coast_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/yqR8oGEx4TDEPcmD7",
    videoWebm: assetPath("/media/central-coast_720p.webm"),
    videoMp4: undefined,
  },
  {
    name: "locations.tamworth.name",
    address: "locations.tamworth.address",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "locations.tamworth.hours.weekdays",
      weekend: "locations.common.hours.weekend",
    },
    services: ["locations.services.settlementSupport", "locations.services.communityPrograms", "locations.services.youthServices"],
    staff: [{ name: "David Thompson", role: "roles.regionalManager", languages: ["languages.english"] }],
    transport: ["locations.tamworth.transport.bus", "locations.tamworth.transport.parking"],
    image: assetPath("/images/Location/Location_Tamworth_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/ranJYc6KHfv8k28r7",
    videoWebm: assetPath("/media/tamworth_720p.webm"),
    videoMp4: undefined,
  },
  {
    name: "locations.armidale.name",
    address: "locations.armidale.address",
    phone: "1800 813 205",
    email: "info@mosaicmc.org.au",
    hours: {
      weekdays: "locations.armidale.hours.weekdays",
      weekend: "locations.common.hours.weekend",
    },
    services: ["locations.services.settlementSupport", "locations.services.communityPrograms", "locations.services.youthServices"],
    staff: [
      { name: "Fatima Al-Zahra", role: "roles.settlementWorker", languages: ["languages.english", "languages.arabic", "languages.farsi"] },
    ],
    transport: ["locations.armidale.transport.bus", "locations.armidale.transport.parking"],
    image: assetPath("/images/Location/Location_Armidale_720p.webp"),
    directionsUrl: "https://maps.app.goo.gl/1jZ6aD7bC1w2k1D7",
    videoWebm: assetPath("/media/armidale_720p.webm"),
    videoMp4: undefined,
  },
];
