import React from 'react';
import { useTranslation } from 'react-i18next';
import { serviceYearsBase } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import RelatedServices from '@/components/RelatedServices';
// import { Timeline } from '../components/ui/timeline';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FeatureMissionVision } from '@/components/ui/FeatureMissionVision';
import { FeatureValues } from '@/components/ui/FeatureValues';
import { AnimatePresence, motion } from 'framer-motion';
import { BoardSection } from '@/components/BoardSection';
import { ManagementSection } from '@/components/ManagementSection';
import { Link, useLocation } from 'react-router-dom';

const AboutPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        (el as HTMLElement).focus?.();
      }
    }
  }, [location.hash]);
  const storyData = React.useMemo(() => [
    { year: "1978", label: "1978", description: "The Galbally Report sets the foundation for inclusive settlement in Australia.", image: "/images/History_720px_webp/1978_Galbally Report.webp", alt: "Migrant Services and Programs (Galbally Report) cover", details: "As Australia became more culturally diverse, communities called for inclusion, access, and representation. In 1978, SBS amplified multicultural voices nationwide, while the Review of Post‑Arrival Programs and Services to Migrants (popularly called The Galbally Report, 1978) reshaped settlement policy. Its recommendations were fully adopted, leading to the creation of migrant resource centres across Australia that provided settlement support, advocacy, and guidance to help migrants and refugees participate fully in Australian life while maintaining their culture and identity.", gallery: ["/images/History_720px_webp/1978_Galbally Report.webp", "/images/History_720px_webp/1978_SBS.webp"], links: [
      { label: "Migrant Services and Programs – Statement by the Prime Minister, Mr. Malcolm Fraser", href: "/images/History_720px_webp/1978_Galbally Report_01_PM_Fraser.pdf" },
      { label: "It’s Not the Thought That Counts by Lidio Bertelli", href: "/images/History_720px_webp/1978_Galbally Report 02_bertelli_1.pdf" }
    ] },
    { year: "1981", label: "1981", description: "We open in Newcastle with two staff.", image: "/images/History_720px_webp/1981_Ian MacPhee.webp", alt: "Foundation year in Newcastle and the Hunter Region", details: "Mr Ian MacPhee officially opened the Newcastle Migrant Resource Centre on 20 May 1981. The Centre began operating in this region from upstairs premises at 414 Hunter Street above the State Bank building, with an interim Committee of Management and administered by the Newcastle City Council. There were just two staff: a Coordinator (the first being Veronica Hendry) and an Assistant Coordinator. The Centre operated from these premises for three years, serving as a fledgling community hub.", gallery: [], links: [
      { label: "Opening Address by Mr. Ian MacPhee, Minister for Immigration and Ethnic Affairs", href: "/images/History_720px_webp/1981_OPENING OF MRC ADDRESS BY MINI.pdf" }
    ] },
    { year: "1984", label: "1984", description: "We move to 8 Chaucer Street, Hamilton, closer to our communities.", image: "/images/History_720px_webp/1984_Chaucer Street.webp", alt: "Relocation to 8 Chaucer Street Hamilton", details: "In 1984 Violetta Walsh became Coordinator and led the organisation for 30 years across roles of coordinator, director and CEO. The premises chosen were 8 Chaucer Street, Hamilton, which remained the operational base for more than forty years, as the Migrant Resource Centre, then Northern Settlement Services, and finally Mosaic Multicultural Connections until the relocation to Charlestown.", gallery: [] },
    { year: "1985", label: "1985", description: "Formal incorporation strengthens community leadership and outreach.", image: "/images/History_720px_webp/1985.webp", alt: "Incorporation and outreach to Singleton and Muswellbrook", details: "In 1985, the organisation was formally incorporated, with governance led by elected members of ethnic communities and Faith Trent appointed as founding Chair. With additional support, outreach expanded beyond Newcastle to regional areas including Singleton and Muswellbrook. This period also saw strong investment in women’s leadership and community capacity, including programs that supported mature‑age migrant women into training, employment, and leadership roles, alongside initiatives to maintain community languages for migrant children." },
    { year: "1989", label: "1989", description: "Standing with the community in a time of crisis.", image: "/images/History_720px_webp/1989_Earthquake01.webp", alt: "Newcastle Earthquake response", details: "In late 1989, the Newcastle earthquake deeply affected families, businesses, and neighbourhoods across the city. The centre (MRC) played a vital role in recovery efforts, supporting displaced families and local businesses to access assistance, rebuild stability, and begin restoring community life.", gallery: [
      "/images/History_720px_webp/1989_Earthquake02.webp",
      "/images/History_720px_webp/1989_Earthquake03.webp"
    ] },
    { year: "1990", label: "1990", description: "Carnivale brings Hamilton together in a celebration of resilience and community.", image: "/images/History_720px_webp/1990_Carnivale01.webp", alt: "1990 Carnivale", details: "In 1990, Carnivale was launched as a street festival in Hamilton, bringing people together after a period of recovery and change. The Centre delivered the event in partnership with the Hamilton Chamber of Commerce and the Ethnic Communities Council, celebrating cultural diversity, connection, and the strength of the local community.", gallery: [
      "/images/History_720px_webp/1990_Carnivale03.webp",
      "/images/History_720px_webp/1990_Carnivale04.webp",
      "/images/History_720px_webp/1990_Carnivale05.webp",
      "/images/History_720px_webp/1990_Carnivale06.webp",
      "/images/History_720px_webp/1990_Carnivale07.webp",
      "/images/History_720px_webp/1990_Carnivale.webp"
    ] },
    { year: "1991", label: "1991", description: "Ten years on, our reach and community connections continue to grow.", image: "/images/History_720px_webp/1991_10Years_AGM.webp", alt: "Tenth anniversary", details: "In 1991, the Migrant Resource Centre (MRC) marked its tenth anniversary, growing from two staff to eleven and supporting people from more than 100 nationalities. During this period, services expanded across the Northwest of NSW and the Central Coast, including the launch of the Community Visitors Scheme for older migrants and the introduction of immigration assistance and advice.", gallery: [
      "/images/History_720px_webp/1991_10Years_AGM01.webp",
      "/images/History_720px_webp/1991_10Years_AGM02.webp"
    ] },
    { year: "1999", label: "1999", description: "Responding at the frontline during a humanitarian crisis.", image: "/images/History_720px_webp/1999_Kosovar01.webp", alt: "Kosovar refugee support", details: "In 1999, the Centre played a frontline role in the national humanitarian response for Kosovar refugees, supporting nearly 900 people displaced by conflict. Working alongside government and interagency partners, the organisation provided settlement support, referrals, and community liaison, while also expanding assistance for skilled migrants to have qualifications recognised and access local employment opportunities.", gallery: [
      "/images/History_720px_webp/1999_Kosovar02.webp",
      "/images/History_720px_webp/1999_Kosovar03.webp",
      "/images/History_720px_webp/1999_Kosovar04.webp",
      "/images/History_720px_webp/1999_Kosovar05.webp"
    ] },
    { year: "2001", label: "2001", description: "Twenty years of service and growing regional partnerships.", image: "/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv01.webp", alt: "20-year anniversary celebration", details: "In 2001, the organisation marked 20 years of service to the community, building on strong foundations of trust and connection. This period saw continued growth in regional outreach and partnerships, strengthening support for multicultural communities across the Hunter and surrounding regions.", gallery: [
      "/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv01.webp",
      "/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv02.webp",
      "/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv03.webp",
      "/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv04.webp",
    ] },
    { year: "2004", label: "2004", description: "Expanding regional presence across New England and the Northwest.", image: undefined as unknown as string, alt: "Historical entry 2004", details: "In 2004, MRC opened its Armidale office, strengthening settlement outreach across the New England region and the Northwest Plains. This expansion extended support to communities including Tamworth, Inverell, Wellington, and Gunnedah, bringing services closer to people where they lived.", gallery: [] },
    { year: "2005", label: "2005", description: "Expanding settlement and care in response to new humanitarian arrivals.", image: "/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office.webp", alt: "Central Coast office opening", details: "In 2005, MRC responded to the arrival of African refugees by expanding settlement support across the region, working in partnership with other migrant resource centres to deliver coordinated assistance. This period also saw the opening of a Central Coast office, strengthening welfare and aged care support in a rapidly growing community.", gallery: [
      "/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office01.webp",
      "/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office02.webp",
      "/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office03.webp",
    ] },
    { year: "2006", label: "2006", description: "Twenty-five years of service and expanding regional reach.", image: "/images/History_720px_webp/2006_SilverJubilee.webp", alt: "Silver Jubilee", details: "In 2006, the Migrant Resource Centre marked its 25th anniversary, supported by 24 staff and more than 100 volunteers. The opening of the Tamworth office strengthened regional outreach, with services extending through partnerships and travelling staff to communities including Dubbo, Orange, Bathurst, Lightning Ridge, and Coffs Harbour. This period also saw services broaden to include family support, migrant employment pathways, rural information campaigns, and community aged care.", gallery: [] },
    { year: "2007", label: "2007", description: "Charitable status strengthens sustainability and community impact.", image: "/images/History_720px_webp/2007_NSS.webp", alt: "Northern Settlement Services Ltd", details: "In 2007, the organisation became Northern Settlement Services Ltd and secured charitable status. This milestone strengthened long‑term sustainability, enabling greater support for communities through donor contributions and improved capacity to invest in staff and services." },
    { year: "2011", label: "2011", description: "Thirty years of service and a new chapter of leadership.", image: "/images/History_720px_webp/2011_VJW_Farewell.webp", alt: "Leadership transition", details: "In 2011, Northern Settlement Services (NSS) marked its 30th anniversary, supported by 45 staff and more than 200 volunteers across offices in Hamilton, the Central Coast, Tamworth, Armidale, and briefly Inverell. This year also marked a leadership transition, with long‑standing leader Violetta Walsh retiring after 27 years of service and Lulu Tantos appointed CEO, guiding the organisation into its next phase of growth and program diversification.", gallery: ["/images/History_720px_webp/2011_VJW_Farewell_01.webp", "/images/History_720px_webp/2011_VJW_Farewell_02.webp", "/images/History_720px_webp/2011_VJW_Farewell_03.webp", "/images/History_720px_webp/2011_VJW_Farewell_04.webp", "/images/History_720px_webp/2010_Lulu Tantos.webp"] },
    { year: "2019", label: "2019", description: "A new chapter focused on innovation and strategic direction.", image: "/images/History_720px_webp/2019_ShaonDaishe.webp", alt: "CEO appointment", details: "In 2019, Sharon Daishe was appointed CEO, bringing a renewed focus on innovation, strategy, and sustainability. This appointment marked the beginning of the next chapter in the organisation’s evolution, strengthening its capacity to respond to changing community needs." },
    { year: "2021", label: "2021", description: "Forty years of service, shaped by people and community.", image: "/images/History_720px_webp/2021_40th Celebration01.webp", alt: "40th Celebration", details: "In 2021, Northern Settlement Services marked 40 years of service, supported by 65 staff and more than 175 volunteers across NSW. Regional offices continued their work across the North and Northwest, strengthening connections and support for multicultural communities.", gallery: [
      "/images/History_720px_webp/2021_40th Celebration04.webp",
      "/images/History_720px_webp/2021_40th Celebration05.webp",
      "/images/History_720px_webp/2021_40th Celebration06.webp",
      "/images/History_720px_webp/2021_40th Celebration07.webp"
    ] },
    { year: "2022", label: "2022", description: "A new name reflecting a shared identity and evolving role.", image: "/images/History_720px_webp/2022_MosaicMC_Rebranding.webp", alt: "Mosaic Multicultural Connections rebranding", details: "In 2022, the organisation adopted the name Mosaic Multicultural Connections, reflecting its evolving role and the rich diversity of the communities it serves. The new name captured a renewed commitment to connection, inclusion, and support across all stages of life.", gallery: [] },
    { year: "2024", label: "2024", description: "A new home in Charlestown, honouring the past and looking ahead.", image: "/images/History_720px_webp/2024_Charlestown.webp", alt: "Charlestown relocation", details: "In 2024, Mosaic Multicultural Connections relocated its head office to Charlestown, marking a new chapter after more than 40 years at Chaucer Street in Hamilton. The transition was honoured through a closing ceremony that celebrated shared memories, community resilience, and the legacy of connection built over decades, with Mosaic’s first CEO, Violetta Walsh OAM, leading a ceremonial lock‑up to symbolically close one chapter and open another. The opening of Mosaic’s new headquarters at Hopetoun Street, Charlestown was marked with a Welcome to Country by Aunty Cheryl and Uncle Ray from Awabakal, and reflections from Lake Macquarie Mayor Adam Shultz and The Hon. Jodie Harrison MP, State Member for Charlestown. These moments reaffirmed values of inclusion, collaboration, and the resilience of migrants and refugees that continue to shape Mosaic’s work.", gallery: [
      "/images/History_720px_webp/2024_Charlestown01.webp",
      "/images/History_720px_webp/2024_Charlestown02.webp",
      "/images/History_720px_webp/2024_Closing01.webp",
      "/images/History_720px_webp/2024_Closing02.webp",
      "/images/History_720px_webp/2024_Closing03.webp"
    ] },
  ], []);
  const allYears = Array.from(new Set(storyData.map((d) => d.year)));
  const deriveDecade = (y: string) => `${Math.floor(Number(y) / 10) * 10}s`;
  const decades = Array.from(new Set(storyData.map((d) => deriveDecade(d.year))));
  const [selectedDecade, setSelectedDecade] = React.useState<string>("all");
  const [selectedYear, setSelectedYear] = React.useState<string>("all");

  const yearsInSelectedDecade = selectedDecade === "all"
    ? allYears
    : storyData
        .filter((d) => deriveDecade(d.year) === selectedDecade)
        .map((d) => d.year);

  const byDecade = selectedDecade === "all"
    ? storyData
    : storyData.filter((d) => deriveDecade(d.year) === selectedDecade);

  const filteredHistory = selectedYear === "all"
    ? byDecade
    : byDecade.filter((d) => d.year === selectedYear);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const decadeList = React.useMemo(() => [...decades].sort(), [decades]);
  const effectiveDecade = selectedDecade === "all" ? decadeList[0] : selectedDecade;
  const currentDecadeIndex = decadeList.indexOf(effectiveDecade);
  const canGoPrev = currentDecadeIndex > 0;
  const canGoNext = currentDecadeIndex >= 0 && currentDecadeIndex < decadeList.length - 1;
  const navHistoryRef = React.useRef<string[]>([]);
  const [activeStory, setActiveStory] = React.useState<typeof storyData[number] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = React.useState<number>(0);
  const [lastImageDirection, setLastImageDirection] = React.useState<'left' | 'right' | null>(null);
  const [isImageAnimating, setIsImageAnimating] = React.useState<boolean>(false);
  type BoardMember = {
    name: string;
    title?: string;
    role?: string;
    credentials?: string;
    languages?: string[];
    bio: string;
    social?: Array<{ platform: 'linkedin' | 'twitter' | 'website'; href: string }>;
  };
  const boardMembers: BoardMember[] = [
    { name: "Sandra Feltham", title: "Chair", role: "Board Member since 2020", credentials: "Masters Public Health (Distinction), Grad Dip Urban & Regional Planning, BSc (Hons) Human Geography • Cert IV TAE • RN, RM", languages: ["English"], bio: "Hello! I’m Sandra Feltham. I have over 40 years’ experience in health and local government, specialising in inclusive, community‑focused strategic planning. I’ve advised government, service providers and community groups, and served on advisory and executive boards. My motivation is a belief in the strength and value of cultural diversity in Australia. My vision is for inclusive, resilient communities where every individual feels seen, heard and empowered.", social: [{ platform: 'linkedin', href: '#' }] },
    { name: "Dr Shirley Schulz-Robinson", title: "Vice Chair", role: "Board Member since 2021", credentials: "PhD Health Administration, BA (Hons) Sociology • Assoc Dip Nursing Education • Dip Life Coaching • Cert IV Small Business Management • Cert IV TAE • RN", languages: ["English"], bio: "Hi, I’m Shirley Schulz‑Robinson. I bring lived experience as a migrant, carer and mature‑aged student, with a career spanning health, education and multicultural mental health. I’ve contributed to policy, research and advocacy, and served on boards and committees focused on ethics and quality. My motivation is equity, inclusion and the transformative power of community. My vision is compassionate, culturally intelligent and meaningful engagement where every voice is valued and every person can thrive." },
    { name: "Zachary Ekandi", title: "Director", role: "Board Member since 2022", credentials: "MInfoTech, BInfoSci, AdvDipMgmt, Cert IV TAE, NAATI Interpreter, QTEAC Counsellor, GradDip Migration Law (ongoing)", languages: ["English", "Swahili"], bio: "Hello! I’m Zachary Ekandi. I’m a Senior Educational Officer at TAFE NSW with extensive experience in multicultural education, community engagement and strategic partnerships. I’ve led initiatives supporting migrant and refugee learners, advised government and academic bodies, and championed inclusive education across NSW. My motivation is empowering culturally diverse communities and ensuring services are responsive, inclusive and impactful.", social: [{ platform: 'linkedin', href: '#' }] },
    { name: "Kasey Preston", title: "Director", role: "Board Member since 2023", credentials: "Bachelor of Business (Event Management), Diploma of Business, Cert IV Human Resources", languages: ["English"], bio: "Hi, I’m Kasey Preston. I work across vocational education and event management, and I help support international and CALD students at TAFE NSW. Raised in a culturally diverse family, I value storytelling and connection through multicultural engagement. My motivation is creating inclusive spaces where people from all backgrounds feel empowered and supported. My vision is to build bridges across cultures through education, celebration and community connection." },
    { name: "Naomi McLean", title: "Executive Committee Member", role: "Board Member since 2023", credentials: "BA (Asian Studies), Grad Cert Global Health, MA (Strategy and Policy)", languages: ["English"], bio: "Hello! I’m Naomi McLean. I’ve worked across education, health and international development. My career began in defence and evolved through roles in the public service and the tertiary sector, where I led governance reform and strategic initiatives. My motivation is equity and access for all. My vision is empowerment, connection and meaningful impact through education, advocacy and community engagement." },
    { name: "Peter Gittins", title: "Executive Committee Member", role: "Board Member since 2024", credentials: "BA, Dip Education, Cert ESL, Cert Business", languages: ["English"], bio: "Hi, I’m Peter Gittins. I am a retired international educator and an independent Councillor on Newcastle City Council. I’ve taught in PNG and Nepal and led international schools in Germany, Sri Lanka and Vietnam. I bring expertise in governance, financial management and strategic planning. My motivation is a lifelong commitment to education, inclusion and community development. My vision is to help Mosaic connect across cultures through thoughtful governance, strategic leadership and meaningful engagement." },
    { name: "Catherine Candiloro", title: "Director", role: "Board Member since 2025", credentials: "Master of International & Community Development, Grad Cert NFP Management, Specialist Cert Implementation Science", languages: ["English", "Spanish", "Italian"], bio: "Hello! I’m Catherine Candiloro. I bring lived experience as the child of a refugee and a career spanning government and NGOs. I’ve led refugee and child‑focused support programs and now work in regulation, with expertise in compliance, safeguarding and change management. Motivated by a desire to give back to my community, my vision is integrity, inclusion and strategic growth, where community voices are amplified." },
    { name: "Lauren Croiset", title: "Director", role: "Board Member since 2025", credentials: "Diploma of Counselling (currently studying)", languages: ["English", "French"], bio: "Hi, I’m Lauren Croiset. I’m a strategic leader in home care, with expertise in compliance, policy and operational excellence. I lead growth and community initiatives and volunteer in multicultural and gender‑focused organisations. My motivation is empowering others and contributing to a thriving, inclusive community. My vision is to help Mosaic grow ethically and sustainably, while continuing to be a beacon of support for those navigating settlement and belonging.", social: [{ platform: 'linkedin', href: '#' }, { platform: 'website', href: '#' }] },
  ] as const;
  const boardImgMap: Record<string, { webp: string; jpg: string }> = {
    "Sandra Feltham": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Sandra_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Sandra_128px.jpg",
    },
    "Dr Shirley Schulz-Robinson": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Shirley_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Shirley_128px.jpg",
    },
    "Zachary Ekandi": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Zac_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Zac_128px.jpg",
    },
    "Kasey Preston": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Kasey_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Kasey_128px.jpg",
    },
    "Naomi McLean": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Naomi_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Naomi_128px.jpg",
    },
    "Peter Gittins": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Peter_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Peter_128px.jpg",
    },
    "Catherine Candiloro": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Cat_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Cat_128px.jpg",
    },
    "Lauren Croiset": {
      webp: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Lo_128px.webp",
      jpg: "/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Lo_128px.jpg",
    },
  };
  
  type ManagementMember = {
    name: string;
    title: string;
    level: 1 | 2 | 3;
    languages?: string[];
    bio: string;
  };

  const managementMembers: ManagementMember[] = [
    {
      name: "Sharon Daishe",
      title: "Chief Executive Officer",
      level: 1 as const,
      languages: ["English"],
      bio: "Hi, I’m Sharon. I’m passionate about equity and find Mosaic’s soulful purpose, helping people have power over their lives, the most rewarding part of my role. Delivering enduring positive impact for people and planet is the most important task of leadership, and how I measure my career highlights. My leadership career of over 25 years includes roles as a CEO in rural‑remote local government in two states, living with First Nations communities in the beautiful Australian outback. This followed volunteering with an education not‑for‑profit in rural Tanzania, an experience that changed my career focus. Outside of work, I am a Rotarian and remain a passionate supporter of the education program in Tanzania. I love being outdoors horse‑riding, kayaking and camping with my family including three sons and six grandchildren."
    },
    {
      name: "Belinda Latimore",
      title: "General Manager, Programs",
      level: 2 as const,
      languages: ["English", "Australian"],
      bio: "Hi, I’m Belinda, and I’ve been part of the Mosaic family for 12 months. I have over 25 years of experience in the health and welfare industry across government, not‑for‑profit and charity sectors. I’m passionate about leading teams and believe each member has a unique story that adds value to the skills and experience we offer in service delivery. I respect the individual journey so that together we may thrive. I’ve recently taken up running and I’m enjoying the camaraderie of the running community."
    },
    {
      name: "Richard Hanson",
      title: "Manager, Finance & Corporate",
      level: 2 as const,
      languages: ["English", "Yorkshire"],
      bio: "Hi, I’m Richard. I’ve worked as a qualified accountant in finance and related roles across a wide range of industries and organisations for over 35 years in both Australia and the UK. As a migrant myself, I empathise with the challenges of migrating to a new country and value the chance to assist, in a small way, in making the transition easier for Mosaic’s clients. Outside work, I’m a watcher of any sport with a ball and a very lazy marathoner."
    },
    {
      name: "Karthik Ramamurthy",
      title: "Manager, Aged Care",
      level: 3 as const,
      languages: ["English", "Hindi", "Tamil"],
      bio: "Bio content to be provided later."
    },
    {
      name: "Jawaid Pardehi",
      title: "Manager, Settlement, Families & Communities",
      level: 3 as const,
      languages: ["English", "Urdu", "Hindi"],
      bio: "I’m Jawaid, and I’m passionate about creating opportunities for refugees and migrants to thrive in their new communities. I possess over a decade of experience in community development and program management. My career has been dedicated to empowering individuals and fostering inclusive communities. I have led initiatives across casework, community programs, youth engagement and settlement services, focused on building pathways for long‑term success. At Mosaic, I’m inspired by the resilience of the CALD communities we serve. My role focuses on developing and delivering impactful programs that foster social cohesion, enhance workforce readiness and increase cultural awareness, including women’s programs, parenting workshops and cultural awareness training, to build a stronger, more inclusive society. I also lead teams across the Central Coast, Newcastle and New England regions. Outside work, I’m a history enthusiast and a passionate cricket fan who enjoys exploring the landscapes of regional Australia with my family."
    },
  ];
  const managementImgMap: Record<string, { webp?: string; jpg?: string }> = {
    "Sharon Daishe": {
      webp: "/images/Management 128px/Management_Sharon_128px.webp",
      jpg: "/images/Management 128px/Management_Sharon_128px.jpg",
    },
    "Belinda Latimore": {
      webp: "/images/Management 128px/Management_Belinda_128px.webp",
      jpg: "/images/Management 128px/Management_Belinda_128px.jpg",
    },
    "Richard Hanson": {
      webp: "/images/Management 128px/Management_Richard_128px.webp",
      jpg: "/images/Management 128px/Management_Richard_128px.jpg",
    },
    "Karthik Ramamurthy": {
      webp: "/images/Management 128px/Management_Karthik_128px.webp",
      jpg: "/images/Management 128px/Management_Karthik_128px.jpg",
    },
    "Jawaid Pardehi": {
      webp: "/images/Management 128px/Management_Jawaid_128.webp",
      jpg: "/images/Management 128px/Management_Jawaid_128.jpg",
    },
  };
  const [activeManager, setActiveManager] = React.useState<ManagementMember | null>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  React.useEffect(() => {
    const onResize = () => setIsMobileOrTablet(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const modalBrowseList = React.useMemo(() => {
    return [...storyData].sort((a, b) => Number(a.year) - Number(b.year));
  }, [storyData]);
  const currentIndex = activeStory ? modalBrowseList.findIndex((s) => s.year === activeStory.year) : -1;
  const canPrevStory = currentIndex > 0;
  const canNextStory = currentIndex >= 0 && currentIndex < modalBrowseList.length - 1;
  const goPrevStory = () => {
    if (!canPrevStory) return;
    const next = modalBrowseList[currentIndex - 1];
    setActiveStory(next);
    setSelectedDecade(deriveDecade(next.year));
    setSelectedYear(next.year);
    setActiveImageIndex(0);
    setLastImageDirection('left');
  };
  const goNextStory = () => {
    if (!canNextStory) return;
    const next = modalBrowseList[currentIndex + 1];
    setActiveStory(next);
    setSelectedDecade(deriveDecade(next.year));
    setSelectedYear(next.year);
    setActiveImageIndex(0);
    setLastImageDirection('right');
  };

  const activeImages = React.useMemo(() => {
    if (!activeStory) return [] as string[];
    const srcs = [
      ...(activeStory.image ? [activeStory.image] : []),
      ...(Array.isArray(activeStory.gallery) ? activeStory.gallery : []),
    ];
    const unique = srcs.filter((s, i) => s && srcs.indexOf(s) === i);
    return unique;
  }, [activeStory]);
  const canPrevImage = activeImages.length > 1 && activeImageIndex > 0 && !isImageAnimating;
  const canNextImage = activeImages.length > 1 && activeImageIndex < activeImages.length - 1 && !isImageAnimating;
  const goPrevImage = () => {
    if (!canPrevImage) return;
    setLastImageDirection('left');
    setActiveImageIndex((i) => Math.max(0, i - 1));
  };
  const goNextImage = () => {
    if (!canNextImage) return;
    setLastImageDirection('right');
    setActiveImageIndex((i) => Math.min(activeImages.length - 1, i + 1));
  };

  const closeStoryModal = () => {
    setActiveStory(null);
    setSelectedYear("all");
    setActiveImageIndex(0);
    setLastImageDirection(null);
  };

  function YearSelect({ years, value, onChange }: { years: string[]; value: string; onChange: (v: string) => void }) {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [focusIndex, setFocusIndex] = React.useState<number>(() => Math.max(0, years.indexOf(value)));

    const toggle = () => setOpen((o) => !o);
    const close = () => setOpen(false);

    return (
      <div className="relative" aria-expanded={open}>
        <button
          ref={buttonRef}
          id="year-select-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={toggle}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {value === 'all' ? 'All' : value}
          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
        </button>
        {open && (
          <ul
            role="listbox"
            aria-labelledby="year-select-button"
            className="absolute right-0 mt-2 min-w-[8rem] rounded-md border border-border bg-background shadow focus:outline-none"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Escape') { close(); buttonRef.current?.focus(); }
              if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIndex((i) => Math.min(i + 1, years.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIndex((i) => Math.max(i - 1, 0)); }
              if (e.key === 'Enter') { const y = years[focusIndex]; onChange(y); close(); buttonRef.current?.focus(); }
            }}
          >
            <li>
              <button
                role="option"
                aria-selected={value === 'all'}
                onClick={() => { onChange('all'); close(); buttonRef.current?.focus(); }}
                className={`w-full text-left px-3 py-1.5 ${value === 'all' ? 'bg-ocean text-white' : 'text-muted-foreground hover:bg-sand/60'} focus:outline-none focus:ring-2 focus:ring-ring`}
              >
                All
              </button>
            </li>
            {years.map((y, idx) => (
              <li key={y}>
                <button
                  role="option"
                  aria-selected={value === y}
                  onMouseEnter={() => setFocusIndex(idx)}
                  onClick={() => { onChange(y); close(); buttonRef.current?.focus(); }}
                    className={`w-full text-left px-3 py-1.5 ${value === y ? 'bg-ocean text-white' : 'text-muted-foreground hover:bg-sand/60'} focus:outline-none focus:ring-2 focus:ring-ring`}
                  >
                    {y}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }

  const goPrevDecade = () => {
    if (!canGoPrev) return;
    const nextDecade = decadeList[currentDecadeIndex - 1];
    setSelectedDecade(nextDecade);
    setSelectedYear("all");
  };

  const goNextDecade = () => {
    if (!canGoNext) return;
    const nextDecade = decadeList[currentDecadeIndex + 1];
    setSelectedDecade(nextDecade);
    setSelectedYear("all");
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const first = el.querySelector('.story-card') as HTMLElement | null;
    const cardWidth = first ? first.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (!effectiveDecade) return;
    navHistoryRef.current.push(effectiveDecade);
    sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [effectiveDecade]);
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>About Mosaic Multicultural Connections</title>
        <meta name="description" content="Mosaic Multicultural Connections supports multicultural communities across Newcastle, the Hunter Region, Central Coast, Tamworth, Armidale, New England and North West NSW. Discover our mission, values and 40+ year story of settlement support, home care and family services." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "About Mosaic Multicultural Connections",
          "inLanguage": "en-AU",
          "about": [
            "multicultural support",
            "settlement services",
            "aged care",
            "family support",
            "refugee services",
            "community advocacy"
          ],
          "spatialCoverage": [
            "Newcastle",
            "Hunter Region",
            "Central Coast",
            "Tamworth",
            "Armidale",
            "New England",
            "North West NSW"
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Mosaic Multicultural Connections?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mosaic Multicultural Connections is a community organisation supporting culturally and linguistically diverse people across NSW through settlement support, home care, family services and community advocacy."
              }
            },
            {
              "@type": "Question",
              "name": "Where does Mosaic operate?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We serve communities in Newcastle, the Hunter Region, Central Coast, Tamworth, Armidale, New England and North West NSW."
              }
            },
            {
              "@type": "Question",
              "name": "How does Mosaic support newcomers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide information and referral, settlement and employment support, language services, home care programs and community connections to help people thrive."
              }
            }
          ]
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative section-spacing bg-page border-t border-divider transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/40 via-transparent to-sky/20 dark:from-slate-900/50 dark:to-ocean/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky/30 rounded-full blur-3xl dark:bg-sky/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean/30 rounded-full blur-3xl dark:bg-ocean/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Story</span>
            </div>
            
            <h1 className="fluid-h1 text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Where Belonging, Care, and Community Come Together
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              For <span className="font-bold text-ocean dark:text-foreground">{serviceYearsBase()}+ years</span>, Mosaic Multicultural Connections has walked alongside migrants and multicultural communities, offering support, care, and connection from first arrival through later life. From settling into life in Australia, to caring for loved ones at home, strengthening families, and building community leadership, our work spans{" "}
              <Link to="/services/settlement-support" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">Settlement Support</Link>,{" "}
              <Link to="/services/aged-care" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">Aged Care</Link>,{" "}
              <Link to="/services/family-support" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">Family Support</Link>,{" "}
              and{" "}
              <Link to="/services/community-engagement" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">Community Engagement</Link>{" "}
              programs across NSW.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { number: serviceYearsBase().toString(), label: "Years of Service", suffix: "+" },
                { number: "25", label: "Communities Served", suffix: "+" },
                { number: "15,000", label: "Families Supported", suffix: "+" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-md bg-white/60 dark:bg-white/10 rounded-xl p-6 border border-white/40 dark:border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-ocean dark:text-sky mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values - ShadCN-based */}
      <FeatureMissionVision
        mission="To support and inspire culturally diverse people and communities to overcome barriers and thrive."
        vision="A connected community where diversity defines and nourishes us."
      />
      <FeatureValues />

      {/* Leadership */}

      <section className="relative section-spacing border-t border-divider bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden" role="region" aria-label="Board of Directors">
        <div className="absolute inset-0 bg-gradient-to-br from-sand/30 via-transparent to-sky/20 dark:from-slate-900/40 dark:to-ocean/20 pointer-events-none"></div>
        <AnimatedBackground variant="subtle" className="opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10 flex items-start justify-between">
          <div>
            <h2 id="our-story-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-3 scroll-mt-28">The Mosaic Story</h2>
            <p className="text-muted-foreground">Milestones across 40+ years of service in NSW</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center flex-wrap gap-2 relative z-10" role="tablist" aria-label="Select Decade">
            <button
              aria-pressed={selectedDecade === "all"}
              onClick={() => { setSelectedDecade("all"); setSelectedYear("all"); }}
              className={`px-3 py-1 rounded-full border transition ${selectedDecade === "all" ? "bg-ocean text-white border-ocean" : "bg-background text-foreground border-border hover:bg-sand/60"} focus:outline-none focus:ring-2 focus:ring-ring`}
            >
              All
            </button>
            {decades.sort().map((dec) => (
              <button
                key={dec}
                aria-pressed={selectedDecade === dec}
                onClick={() => { setSelectedDecade(dec); setSelectedYear("all"); }}
                className={`px-3 py-1 rounded-full border transition ${selectedDecade === dec ? "bg-ocean text-white border-ocean" : "bg-background text-foreground border-border hover:bg-sand/60"} focus:outline-none focus:ring-2 focus:ring-ring`}
              >
                {dec}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
          role="region"
          aria-label="Timeline decade slider"
          id="our-story"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { goPrevDecade(); }
            if (e.key === 'ArrowRight') { goNextDecade(); }
          }}
        >
          <div
            className="flex md:grid gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory pb-2"
            ref={sliderRef}
            id="mosaic-story-slider"
            style={{
              gridTemplateColumns: `repeat(${Math.min(4, Math.max(1, filteredHistory.length))}, 260px)`,
              gridTemplateRows: filteredHistory.length > 4 ? 'repeat(2, auto)' : undefined,
              justifyContent: 'center',
            }}
          >
            {filteredHistory.map((item, idx) => (
              <div key={idx} className="story-card snap-start min-w-[260px] md:min-w-0 h-full">
                <button
                  aria-label={`Open details for ${item.label}`}
                  onClick={() => { setActiveStory(item); setSelectedDecade(deriveDecade(item.year)); setSelectedYear(item.year); setActiveImageIndex(0); setLastImageDirection(null); }}
                  className="group relative w-full h-full text-left rounded-2xl border border-border bg-background shadow-sm overflow-hidden hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition flex flex-col"
                >
                  {item.image ? (
                    <div className="w-full aspect-video flex items-start justify-center bg-background">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-contain object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 md:h-48 flex items-center justify-center bg-muted">
                      <span className="text-sm font-medium text-muted-foreground">View PDFs</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                aria-label={`Previous decade ${canGoPrev ? decadeList[currentDecadeIndex - 1] : ''}`}
                aria-controls="mosaic-story-slider"
                onClick={goPrevDecade}
                disabled={!canGoPrev}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-ring ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sand/60'}`}
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                aria-label={`Next decade ${canGoNext ? decadeList[currentDecadeIndex + 1] : ''}`}
                aria-controls="mosaic-story-slider"
                onClick={goNextDecade}
                disabled={!canGoNext}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-ring ${!canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sand/60'}`}
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button
                aria-label="Scroll to previous card"
                aria-controls="mosaic-story-slider"
                onClick={() => scrollByCard(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-ring hover:bg-sand/60"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                aria-label="Scroll to next card"
                aria-controls="mosaic-story-slider"
                onClick={() => scrollByCard(1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-ring hover:bg-sand/60"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>
        {activeStory && (
          <div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto pt-6 md:pt-10"
            aria-labelledby="story-dialog-title"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeStoryModal();
              if (e.key === 'ArrowLeft') {
                if (activeImages.length > 1) { goPrevImage(); } else { goPrevStory(); }
              }
              if (e.key === 'ArrowRight') {
                if (activeImages.length > 1) { goNextImage(); } else { goNextStory(); }
              }
            }}
          >
            <button
              aria-label="Close dialog"
              className="absolute inset-0 bg-black/50"
              onClick={closeStoryModal}
            />
            <div className="relative max-w-2xl w-[92%] md:w-[70%] rounded-2xl border border-border bg-background shadow-xl my-6 md:my-10">
              <button
                aria-label="Close dialog"
                onClick={closeStoryModal}
                className="absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground shadow hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative">
                {activeStory.image ? (
                  <div className="w-full max-h-[60vh] rounded-t-2xl flex items-start justify-center overflow-hidden bg-background">
                    <AnimatePresence mode="wait" custom={lastImageDirection}>
                      <motion.img
                        key={`${activeStory.year}-${activeImageIndex}`}
                        src={activeImages[activeImageIndex]}
                        alt={activeStory.alt}
                        initial={{ opacity: 0, x: lastImageDirection === 'right' ? 40 : lastImageDirection === 'left' ? -40 : 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: lastImageDirection === 'right' ? -40 : lastImageDirection === 'left' ? 40 : 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                        className="max-h-[60vh] max-w-full w-auto object-contain object-top"
                        onAnimationStart={() => setIsImageAnimating(true)}
                        onAnimationComplete={() => setIsImageAnimating(false)}
                      />
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="w-full h-48 md:h-56 rounded-t-2xl bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">No image available. See related PDFs below</span>
                  </div>
                )}
                {activeImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-background/80 border border-border shadow px-2 py-1">
                    <button
                      aria-label="Previous image"
                      onClick={goPrevImage}
                      disabled={!canPrevImage}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${canPrevImage ? 'text-foreground hover:bg-sand/60' : 'text-muted-foreground opacity-60 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="w-px h-5 bg-border/70" aria-hidden="true"></span>
                    <button
                      aria-label="Next image"
                      onClick={goNextImage}
                      disabled={!canNextImage}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${canNextImage ? 'text-foreground hover:bg-sand/60' : 'text-muted-foreground opacity-60 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 pb-16 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <h3 id="story-dialog-title" className="text-xl md:text-2xl font-bold text-foreground mb-2">{activeStory.label}</h3>
                <p className="text-muted-foreground mb-4">{activeStory.description}</p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">{activeStory.details}</p>
                {Array.isArray(activeStory.gallery) && activeStory.gallery.length > 0 && (
                  <div className="mt-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {activeImages.map((src, idx) => (
                        <button
                          key={idx}
                          aria-label={`View image ${idx + 1}`}
                          onClick={() => { setLastImageDirection(idx > activeImageIndex ? 'right' : 'left'); setActiveImageIndex(idx); }}
                          className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border ${activeImageIndex === idx ? 'border-ocean' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-ring`}
                        >
                            <img src={src} alt="" className="h-full w-full object-contain bg-background" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {(canPrevStory || canNextStory) && (
                  <div className="mt-6 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-background/80 border border-border shadow px-2 py-1">
                      {canPrevStory && (
                        <button
                          aria-label="Previous year"
                          onClick={goPrevStory}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                      )}
                      {canPrevStory && canNextStory && (
                        <span className="w-px h-5 bg-border/70" aria-hidden="true"></span>
                      )}
                      {canNextStory && (
                        <button
                          aria-label="Next year"
                          onClick={goNextStory}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {Array.isArray(activeStory.links) && activeStory.links.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground mb-2">Related</p>
                    <div className="flex flex-wrap gap-2">
                      {activeStory.links.map((l, idx) => (
                        <a
                          key={idx}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Board */}
      <section className="relative section-spacing border-t border-divider bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden" role="region" aria-labelledby="board-title">
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 via-sky/10 to-ocean/5 dark:from-ocean/20 dark:via-sky/5 dark:to-ocean/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center subsection-break">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Board of Directors</span>
            </div>
            <h2 id="board-title" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">Our</span>{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">
                Board
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Governance, strategy and community leadership grounded in lived experience and professionalism.</p>
          </div>
          <div>
            {(() => {
              const summarize = (text?: string, maxSentences = 2): string | undefined => {
                if (!text) return undefined;
                const trimmed = text.trim();
                const sentences = trimmed.split(/(?<=[.!?])\s+/);
                const pick = sentences.slice(0, Math.min(maxSentences, sentences.length)).join(' ');
                return pick;
              };
              const boardSummaries: Record<string, string> = {
                "Sandra Feltham": "40+ years’ experience in health and local government, specialising in inclusive strategic planning, governance and community-focused advisory work.",
                "Dr Shirley Schulz-Robinson": "Lived experience as migrant, carer and mature-aged student; career across health, education and multicultural mental health with focus on equity and inclusion.",
                "Zachary Ekandi": "Senior Educational Officer at TAFE NSW with deep experience in multicultural education, engagement and partnerships supporting migrant and refugee learners.",
                "Kasey Preston": "Works across vocational education and event management, supporting international and CALD students and promoting storytelling and multicultural connection.",
                "Naomi McLean": "Experience across education, health and international development, leading governance reform and strategic initiatives centred on equity and meaningful impact.",
                "Peter Gittins": "Retired international educator and Newcastle City Councillor with expertise in leadership, governance, financial management and multicultural engagement.",
                "Catherine Candiloro": "Career in government and NGOs leading refugee and child-focused programs; now specialising in regulation, compliance, safeguarding and community advocacy.",
                "Lauren Croiset": "Strategic leader in home care with expertise in compliance, policy and operations; leads growth and community initiatives and volunteers in multicultural organisations.",
              };
              const members = boardMembers.map((m) => ({
                name: m.name,
                role: m.title ? m.title : m.role,
                bio: m.bio,
                avatar: boardImgMap[m.name]?.jpg,
                social: m.social,
                languages: m.languages,
                credentialsSummary: summarize(m.credentials, 2),
                summary: boardSummaries[m.name],
              }));
              return <BoardSection members={members} />;
            })()}
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="relative section-spacing border-t border-divider bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 via-sky/10 to-ocean/5 dark:from-ocean/20 dark:via-sky/5 dark:to-ocean/10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-leaf/20 dark:bg-leaf/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center subsection-break">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('about.management.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">
                {t('about.management.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.management.description')}
            </p>
          </div>
          <div>
            {(() => {
              const members = managementMembers
                .filter((m) => m.name || m.title)
                .map((m) => ({
                  name: m.name || m.title,
                  role: m.title,
                  bio: m.bio,
                  languages: m.languages,
                  avatar: m.name ? (managementImgMap[m.name]?.webp ?? managementImgMap[m.name]?.jpg) : undefined,
                }));
              return <ManagementSection members={members} />;
            })()}
          </div>

          {!isMobileOrTablet && activeManager && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center"
              aria-labelledby="manager-dialog-title"
              role="dialog"
              aria-modal="true"
              onKeyDown={(e) => { if (e.key === 'Escape') setActiveManager(null); }}
            >
              <button aria-label="Close dialog" className="absolute inset-0 bg-black/50" onClick={() => setActiveManager(null)} />
              <div className="relative max-w-2xl w-[92%] md:w-[70%] rounded-2xl border border-border bg-background shadow-xl">
                <button
                  aria-label="Close dialog"
                  onClick={() => setActiveManager(null)}
                  className="absolute bottom-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground shadow hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="p-6 pb-16">
                  <h3 id="manager-dialog-title" className="text-xl md:text-2xl font-bold text-foreground mb-2">{activeManager.name || activeManager.title}</h3>
                  {activeManager.name && (<p className="text-muted-foreground mb-1">{activeManager.title}</p>)}
                  {activeManager.languages && activeManager.languages.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-2">{t('about.management.languagesLabel')}: {activeManager.languages.join(', ')}</p>
                  )}
                  <p className="text-sm md:text-base text-foreground leading-relaxed">{activeManager.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <RelatedServices />
    </div>
  );
};

export default AboutPage;
