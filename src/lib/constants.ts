export const DOWNLOAD_CATEGORIES = { 
  CORPORATE_POLICY: "Corporate Policy", 
  VOLUNTEER_PD: "Volunteer Position Description", 
  BROCHURE: "Brochure", 
  PRICE_LIST: "Price List", 
  ANNUAL_REPORT: "Annual Report", 
  PROJECT_REPORT: "Project Report", 
  HISTORICAL_DOC: "Historical Document", 
} as const;

export type DownloadCategory = typeof DOWNLOAD_CATEGORIES[keyof typeof DOWNLOAD_CATEGORIES];
