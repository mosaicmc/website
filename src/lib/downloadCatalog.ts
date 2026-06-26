import { DOWNLOAD_CATEGORIES, DownloadCategory } from "@/lib/constants";

export type DownloadItem = {
  id: string;
  label: string;
  category: DownloadCategory;
  path: string;
};

export const DOWNLOAD_CATALOG: DownloadItem[] = [
  // --- Corporate Policies ---
  {
    id: "policy-child-safety",
    label: "Mosaic Child Safety Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Child Safety Policy.pdf",
  },
  {
    id: "policy-diversity-inclusion",
    label: "Mosaic Diversity and Inclusion Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Diversity and Inclusion Policy .pdf",
  },
  {
    id: "policy-child-safety-plain",
    label: "Child Safety Policy (Plain English)",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Plain English-Child Safety Policy.pdf",
  },
  {
    id: "policy-code-of-conduct",
    label: "Mosaic Code of Conduct",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Code of Conduct.pdf",
  },
  {
    id: "policy-quality-management",
    label: "Mosaic Quality Management Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Quality Management Policy .pdf",
  },
  {
    id: "policy-whs",
    label: "Mosaic Work Health and Safety Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Work Health and Safety Policy.pdf",
  },
  {
    id: "policy-whistleblower",
    label: "Mosaic Whistleblower Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Whistleblower Policy .pdf",
  },
  {
    id: "policy-privacy",
    label: "Mosaic Privacy Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Privacy Policy.pdf",
  },
  {
    id: "policy-feedback-complaints",
    label: "Mosaic Feedback and Complaints Policy",
    category: DOWNLOAD_CATEGORIES.CORPORATE_POLICY,
    path: "/Policies PDFs/Mosaic Feedback and Complaints Policy .pdf",
  },

  // --- Volunteer PDs (Armidale) ---
  {
    id: "pd-armidale-digital-literacy",
    label: "Digital Literacy Support (Armidale)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/armidale/digital-literacy-support.pdf",
  },
  {
    id: "pd-armidale-citizenship-support",
    label: "Citizenship Application Support (Armidale)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/armidale/citizenship-application-support.pdf",
  },
  {
    id: "pd-armidale-homework-tutor",
    label: "Homework Centre Tutor (Armidale)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/armidale/homework-centre-tutor.pdf",
  },

  // --- Volunteer PDs (Newcastle) ---
  {
    id: "pd-newcastle-photo-video",
    label: "Photography and Videography Support (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/photography-and-videography-support.pdf",
  },
  {
    id: "pd-newcastle-graphic-design",
    label: "Graphic Design Support (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/graphic-design-support.pdf",
  },
  {
    id: "pd-newcastle-social-media",
    label: "Social Media Marketing Support (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/social-media-marketing-support.pdf",
  },
  {
    id: "pd-newcastle-marketing-admin",
    label: "Marketing Administration Support (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/marketing-administration-support.pdf",
  },
  {
    id: "pd-newcastle-aged-care-home",
    label: "Aged Care Home Visitor (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/aged-care-home-visitor.pdf",
  },
  {
    id: "pd-newcastle-aged-care-facility",
    label: "Aged Care Facility Visitor (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/aged-care-facility-visitor.pdf",
  },
  {
    id: "pd-newcastle-housing-mentor",
    label: "Housing Mentor (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/housing-mentor.pdf",
  },
  {
    id: "pd-newcastle-employment-mentor",
    label: "Employment Mentor (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/employment-mentor.pdf",
  },
  {
    id: "pd-newcastle-homework-club",
    label: "Homework Club Tutor (Newcastle)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/newcastle/homework-club-tutor.pdf",
  },

  // --- Volunteer PDs (Central Coast) ---
  {
    id: "pd-central-coast-aged-care-home",
    label: "Aged Care Home Visitor (Central Coast)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/central-coast/aged-care-home-visitor.pdf",
  },
  {
    id: "pd-central-coast-aged-care-facility",
    label: "Aged Care Facility Visitor (Central Coast)",
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
    path: "/pd/central-coast/aged-care-facility-visitor.pdf",
  },

  // --- Brochures ---
  {
    id: "brochure-general",
    label: "Mosaic General Brochure",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/generic-mosaic.pdf",
  },
  {
    id: "brochure-settlement",
    label: "Settlement Support Brochure",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/settlement-support.pdf",
  },
  {
    id: "brochure-community",
    label: "Community Engagement Brochure",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/community-engagement.pdf",
  },
  {
    id: "brochure-family",
    label: "Family Support Brochure",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/family-support.pdf",
  },
  {
    id: "brochure-aged-care",
    label: "Aged Care Brochure",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/aged-care.pdf",
  },
  {
    id: "brochure-aged-care-guide-2026",
    label: "Aged Care Guide 2026",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/Aged Care_Guide 2026.pdf",
  },
  {
    id: "brochure-refugee-week",
    label: "Mosaic Refugee Week 2026",
    category: DOWNLOAD_CATEGORIES.BROCHURE,
    path: "/brochures/Refugee Week.pdf",
  },

  // --- Price Lists ---
  {
    id: "price-list-sah-2026",
    label: "SaH Pricelist 2026",
    category: DOWNLOAD_CATEGORIES.PRICE_LIST,
    path: "/brochures/Home_Care_Price_List/SaH Pricelist 2026.pdf",
  },

  // --- Historical Documents ---
  {
    id: "history-1978-galbally-fraser",
    label: "1978 Galbally Report - PM Fraser",
    category: DOWNLOAD_CATEGORIES.HISTORICAL_DOC,
    path: "/images/History_720px_webp/1978_Galbally Report_01_PM_Fraser.pdf",
  },
  {
    id: "history-1978-galbally-bertelli",
    label: "1978 Galbally Report - Bertelli",
    category: DOWNLOAD_CATEGORIES.HISTORICAL_DOC,
    path: "/images/History_720px_webp/1978_Galbally Report 02_bertelli_1.pdf",
  },
  {
    id: "history-1981-opening-address",
    label: "1981 Opening of MRC Address",
    category: DOWNLOAD_CATEGORIES.HISTORICAL_DOC,
    path: "/images/History_720px_webp/1981_OPENING OF MRC ADDRESS BY MINI.pdf",
  },

  // --- External Resources ---
  {
    id: "scoa-ssqf-framework",
    label: "SCoA Settlement Services Quality Framework",
    category: DOWNLOAD_CATEGORIES.PROJECT_REPORT,
    path: "https://scoa.org.au/wp-content/uploads/2021/02/SCoA-SSQF.pdf",
  },

  // --- Annual Reports ---
  {
    id: "annual-report-1991",
    label: "Annual Report 1990-1991",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1990-1991.pdf",
  },
  {
    id: "annual-report-1992",
    label: "Annual Report 1992",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1992.pdf",
  },
  {
    id: "annual-report-1993",
    label: "Annual Report 1993",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1993.pdf",
  },
  {
    id: "annual-report-1994",
    label: "Annual Report 1994",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1994.pdf",
  },
  {
    id: "annual-report-1995",
    label: "Annual Report 1995",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1995.pdf",
  },
  {
    id: "annual-report-1996",
    label: "Annual Report 1996",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1996.pdf",
  },
  {
    id: "annual-report-1997",
    label: "Annual Report 1997",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1997.pdf",
  },
  {
    id: "annual-report-1998",
    label: "Annual Report 1998",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1998.pdf",
  },
  {
    id: "annual-report-1999",
    label: "Annual Report 1999",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 1999.pdf",
  },
  {
    id: "annual-report-2000",
    label: "Annual Report 2000",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2000.pdf",
  },
  {
    id: "annual-report-2001",
    label: "Annual Report 2001",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2001.pdf",
  },
  {
    id: "annual-report-2002",
    label: "Annual Report 2002",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2002.pdf",
  },
  {
    id: "annual-report-2003",
    label: "Annual Report 2003",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2003.pdf",
  },
  {
    id: "annual-report-2004",
    label: "Annual Report 2004",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2004.pdf",
  },
  {
    id: "annual-report-2005",
    label: "Annual Report 2005",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2005.pdf",
  },
  {
    id: "annual-report-2006",
    label: "Annual Report 2006",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2006.pdf",
  },
  {
    id: "annual-report-2007",
    label: "Annual Report 2007",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2007.pdf",
  },
  {
    id: "annual-report-2008",
    label: "Annual Report 2008",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2008-1.pdf",
  },
  {
    id: "annual-report-2009",
    label: "Annual Report 2009",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2009.pdf",
  },
  {
    id: "annual-report-2010",
    label: "Annual Report 2010",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2010-1.pdf",
  },
  {
    id: "annual-report-2011",
    label: "Annual Report 2011",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2011-1.pdf",
  },
  {
    id: "annual-report-2012",
    label: "Annual Report 2012",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2012.pdf",
  },
  {
    id: "annual-report-2013",
    label: "Annual Report 2013",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2013.pdf",
  },
  {
    id: "annual-report-2014",
    label: "Annual Report 2014",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2014-1.pdf",
  },
  {
    id: "annual-report-2015",
    label: "Annual Report 2015",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2015.pdf",
  },
  {
    id: "annual-report-2016",
    label: "Annual Report 2016",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2016-1.pdf",
  },
  {
    id: "annual-report-2017",
    label: "Annual Report 2017",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2017-1.pdf",
  },
  {
    id: "annual-report-2018",
    label: "Annual Report 2018",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2018.pdf",
  },
  {
    id: "annual-report-2019",
    label: "Annual Report 2019",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2019.pdf",
  },
  {
    id: "annual-report-2020",
    label: "Annual Report 2020",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2020.pdf",
  },
  {
    id: "annual-report-2021",
    label: "Annual Report 2021",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2021.pdf",
  },
  {
    id: "annual-report-2022",
    label: "Annual Report 2022",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2022.pdf",
  },
  {
    id: "annual-report-2023",
    label: "Annual Report 2023",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2023.pdf",
  },
  {
    id: "annual-report-2024",
    label: "Annual Report 2024",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "https://mosaicmc.org.au/wp-content/uploads/2025/10/Annual-Report-2024.pdf",
  },
  {
    id: "annual-report-2025",
    label: "Annual Report 2025",
    category: DOWNLOAD_CATEGORIES.ANNUAL_REPORT,
    path: "/annual-reports/Annual Report 2025.pdf",
  },
  {
    id: "price-list-chsp-2025",
    label: "CHSP Pricelist 2025",
    category: DOWNLOAD_CATEGORIES.PRICE_LIST,
    path: "/brochures/Home_Care_Price_List/CHSP Pricelist 2025.pdf",
  },

  // --- Project Reports ---
  {
    id: "project-report-reap",
    label: "REAP Project Report",
    category: DOWNLOAD_CATEGORIES.PROJECT_REPORT,
    path: "/Project Reports/REAP Project Report.pdf",
  },
  {
    id: "project-report-welcoming-workplaces",
    label: "Welcoming Workplaces Project Final Report",
    category: DOWNLOAD_CATEGORIES.PROJECT_REPORT,
    path: "/Project Reports/Innovation Fund_Welcoming Workplaces Project_Final Report.pdf",
  },
  {
    id: "shared-leaders-forum-summary-2026",
    label: "Leaders Forum Summary (18 May 2026)",
    category: DOWNLOAD_CATEGORIES.PROJECT_REPORT,
    path: "/Documents/Leaders_Forum_18May2026_Summary.pdf",
  },
];
