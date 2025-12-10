import React from 'react';
import { serviceYearsBase } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import RelatedServices from '@/components/RelatedServices';
// import { Timeline } from '../components/ui/timeline';
import { Card, CardContent } from '../components/ui/card';
import { ShieldCheck, Eye, Handshake, Users, Lightbulb, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BoardSection } from '@/components/BoardSection';
import { ManagementSection } from '@/components/ManagementSection';

const AboutPage = () => {
  const storyData = [
    { year: "1978", label: "1978", description: "Galbally Report laid groundwork for Australia’s multicultural policy.", image: undefined as unknown as string, alt: "Galbally Report (PDF)", details: "‘Review of Post‑Arrival Programs and Services to Migrants (1978)’ set a foundation for migrant integration and equal opportunity.", gallery: [], links: [
      { label: "Galbally Report 01 (PDF)", href: "/images/History_720px_webp/1978_Galbally Report_01_PM_Fraser.pdf" },
      { label: "Galbally Report 02 (PDF)", href: "/images/History_720px_webp/1978_Galbally Report 02_bertelli_1.pdf" }
    ] },
    { year: "1981", label: "May 1981", description: "Migrant Resource Centre opened with two staff.", image: "/images/History_720px_webp/1981_Ian MacPhee.webp", alt: "Foundation year in Newcastle and the Hunter Region", details: "Opened in Newcastle under a council‑administered interim committee, serving local communities.", gallery: [] },
    { year: "1984", label: "1984", description: "Moved to 8 Chaucer St, Hamilton.", image: "/images/History_720px_webp/1984_Chaucer Street.webp", alt: "Relocation to 8 Chaucer Street Hamilton", details: "Relocated for better access; base for over 40 years." },
    { year: "1985", label: "1985", description: "Formally incorporated; outreach expanded.", image: "/images/History_720px_webp/1985.webp", alt: "Incorporation and outreach to Singleton and Muswellbrook", details: "Management moved to elected community members and outreach expanded." },
    { year: "1989", label: "December 1989", description: "Disaster recovery after Newcastle Earthquake.", image: "/images/History_720px_webp/1989_Earthquake01.webp", alt: "Newcastle Earthquake response", details: "Helped families and businesses rebuild.", gallery: [
      "/images/History_720px_webp/1989_Earthquake02.webp",
      "/images/History_720px_webp/1989_Earthquake03.webp"
    ] },
    { year: "1990", label: "1990 Carnivale", description: "Carnivale celebrations and community rebuilding.", image: "/images/History_720px_webp/1990_Carnivale01.webp", alt: "1990 Carnivale", details: "Carnivale with Hamilton Chamber and Ethnic Communities Council.", gallery: [
      "/images/History_720px_webp/1990_Carnivale03.webp",
      "/images/History_720px_webp/1990_Carnivale04.webp",
      "/images/History_720px_webp/1990_Carnivale05.webp",
      "/images/History_720px_webp/1990_Carnivale06.webp",
      "/images/History_720px_webp/1990_Carnivale07.webp",
      "/images/History_720px_webp/1990_Carnivale.webp"
    ] },
    { year: "1991", label: "1991", description: "Tenth anniversary; new services.", image: "/images/History_720px_webp/1991_10Years_AGM.webp", alt: "Tenth anniversary", details: "Expanded services including Community Visitors Scheme.", gallery: [
      "/images/History_720px_webp/1991_10Years_AGM01.webp",
      "/images/History_720px_webp/1991_10Years_AGM02.webp"
    ] },
    { year: "1999", label: "1999", description: "Supported nearly 900 Kosovar refugees.", image: "/images/History_720px_webp/1999_Kosovar01.webp", alt: "Kosovar refugee support", details: "Interagency collaboration for settlement assistance.", gallery: [
      "/images/History_720px_webp/1999_Kosovar02.webp",
      "/images/History_720px_webp/1999_Kosovar03.webp",
      "/images/History_720px_webp/1999_Kosovar04.webp",
      "/images/History_720px_webp/1999_Kosovar05.webp"
    ] },
    { year: "2006", label: "2006", description: "Twenty five years of service.", image: "/images/History_720px_webp/2006_SilverJubilee.webp", alt: "Silver Jubilee", details: "Broader outreach across regional NSW." },
    { year: "2007", label: "2007", description: "Became Northern Settlement Services Ltd.", image: "/images/History_720px_webp/2007_NSS.webp", alt: "Northern Settlement Services Ltd", details: "Secured charitable status and donor concessions." },
    { year: "2010", label: "2010", description: "Leadership transition; Lulu Tantos appointed CEO.", image: "/images/History_720px_webp/2010_Lulu Tantos.webp", alt: "Leadership transition", details: "Steered program diversification.", gallery: [] },
    { year: "2014", label: "2014", description: "AGM moments.", image: "/images/History_720px_webp/2014 NSS_AGM - 05.webp", alt: "AGM 2014", details: "Annual gathering and governance.", gallery: [] },
    { year: "2019", label: "2019", description: "Sharon Daishe appointed CEO.", image: "/images/History_720px_webp/2019_ShaonDaishe.webp", alt: "CEO appointment", details: "New chapter of innovation and vision." },
    { year: "2021", label: "2021", description: "Forty years celebrated.", image: "/images/History_720px_webp/2021_40th Celebration01.webp", alt: "40th Celebration", details: "Celebrations across NSW.", gallery: [
      "/images/History_720px_webp/2021_40th Celebration04.webp",
      "/images/History_720px_webp/2021_40th Celebration05.webp",
      "/images/History_720px_webp/2021_40th Celebration06.webp",
      "/images/History_720px_webp/2021_40th Celebration07.webp"
    ] },
    { year: "2024", label: "November 2024", description: "Head office relocated to Charlestown.", image: "/images/History_720px_webp/2024_Charlestown.webp", alt: "Charlestown relocation", details: "Modern, accessible base for growth.", gallery: [
      "/images/History_720px_webp/2024_Charlestown01.webp",
      "/images/History_720px_webp/2024_Charlestown02.webp",
      "/images/History_720px_webp/2024_Closing01.webp",
      "/images/History_720px_webp/2024_Closing02.webp",
      "/images/History_720px_webp/2024_Closing03.webp"
    ] },
  ];
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
    { name: "Sandra Feltham", title: "Chair", role: "Board Member since 2020", credentials: "Masters Public Health (Distinction), Grad Dip Urban & Regional Planning, BSc (Hons) Human Geography • Cert IV TAE • RN, RM", bio: "Hello! I’m Sandra Feltham. I have over 40 years’ experience in health and local government, specialising in inclusive, community‑focused strategic planning. I’ve advised government, service providers and community groups, and served on advisory and executive boards. My motivation is a belief in the strength and value of cultural diversity in Australia. My vision is for inclusive, resilient communities where every individual feels seen, heard and empowered.", social: [{ platform: 'linkedin', href: '#' }] },
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
      bio: "Hi, I’m Sharon. I’m passionate about equity and find Mosaic’s soulful purpose — helping people have power over their lives — the most rewarding part of my role. Delivering enduring positive impact for people and planet is the most important task of leadership, and how I measure my career highlights. My leadership career of over 25 years includes roles as a CEO in rural‑remote local government in two states, living with First Nations communities in the beautiful Australian outback. This followed volunteering with an education not‑for‑profit in rural Tanzania, an experience that changed my career focus. Outside of work, I am a Rotarian and remain a passionate supporter of the education program in Tanzania. I love being outdoors horse‑riding, kayaking and camping with my family including three sons and six grandchildren."
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
      name: "",
      title: "Manager, Home Care Services",
      level: 3 as const,
      languages: [],
      bio: "Bio will be added from Management_bios."
    },
    {
      name: "Jawaid Pardehi",
      title: "Manager, Settlement, Families & Communities",
      level: 3 as const,
      languages: ["English", "Urdu", "Hindi"],
      bio: "I’m Jawaid, and I’m passionate about creating opportunities for refugees and migrants to thrive in their new communities. I possess over a decade of experience in community development and program management. My career has been dedicated to empowering individuals and fostering inclusive communities. I have led initiatives across casework, community programs, youth engagement and settlement services, focused on building pathways for long‑term success. At Mosaic, I’m inspired by the resilience of the CALD communities we serve. My role focuses on developing and delivering impactful programs that foster social cohesion, enhance workforce readiness and increase cultural awareness — including women’s programs, parenting workshops and cultural awareness training — to build a stronger, more inclusive society. I also lead teams across the Central Coast, Newcastle and New England regions. Outside work, I’m a history enthusiast and a passionate cricket fan who enjoys exploring the landscapes of regional Australia with my family."
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
  const currentIndex = activeStory ? filteredHistory.findIndex((s) => s.year === activeStory.year) : -1;
  const canPrevStory = currentIndex > 0;
  const canNextStory = currentIndex >= 0 && currentIndex < filteredHistory.length - 1;
  const goPrevStory = () => {
    if (!canPrevStory) return;
    const next = filteredHistory[currentIndex - 1];
    setActiveStory(next);
    setSelectedDecade(deriveDecade(next.year));
    setSelectedYear(next.year);
    setActiveImageIndex(0);
    setLastImageDirection('left');
  };
  const goNextStory = () => {
    if (!canNextStory) return;
    const next = filteredHistory[currentIndex + 1];
    setActiveStory(next);
    setSelectedDecade(deriveDecade(next.year));
    setSelectedYear(next.year);
    setActiveImageIndex(0);
    setLastImageDirection('right');
  };

  const activeImages = React.useMemo(() => {
    if (!activeStory) return [] as string[];
    const list = Array.isArray(activeStory.gallery) && activeStory.gallery.length > 0
      ? [activeStory.image, ...activeStory.gallery]
      : activeStory.image
        ? [activeStory.image]
        : [];
    return list;
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
      <section className="relative section-spacing bg-gradient-to-br from-sand via-sky/20 to-ocean/10 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
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
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              About{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-ocean bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-ocean">
                Mosaic Multicultural Connections
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              For <span className="font-bold text-ocean dark:text-sky">{serviceYearsBase()}+ years</span>, we've been dedicated to supporting diverse communities across NSW,
              helping families build new lives while celebrating their cultural heritage.
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

      {/* Mission, Vision & Values - Compact */}
      <section className="relative py-12 bg-gradient-to-br from-sand/30 via-sky/10 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <AnimatedBackground variant="subtle" className="opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-5 py-1.5 text-xs shadow-sm">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Mission • Vision • Values</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <Card className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="h-6 w-6 text-ocean dark:text-sky" />
                  <h3 className="text-base font-semibold text-foreground">Mission</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">To support and inspire culturally diverse people and communities to overcome barriers and thrive.</p>
              </CardContent>
            </Card>
            <Card className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="h-6 w-6 text-ocean dark:text-sky" />
                  <h3 className="text-base font-semibold text-foreground">Vision</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">A connected community where diversity defines and nourishes us.</p>
              </CardContent>
            </Card>
            <Card className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-ocean dark:text-sky" />
                  <h3 className="text-base font-semibold text-foreground">Values</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'trust', title: 'TRUST', Icon: ShieldCheck },
                    { key: 'transparency', title: 'TRANSPARENCY', Icon: Eye },
                    { key: 'respect', title: 'RESPECT', Icon: Handshake },
                    { key: 'collaboration', title: 'COLLABORATION', Icon: Users },
                    { key: 'creation', title: 'CREATION', Icon: Lightbulb },
                  ].map(({ key, title, Icon }) => (
                    <span key={key} className="inline-flex items-center gap-2 rounded-full bg-sand/50 dark:bg-white/10 border border-border px-3 py-1 text-xs font-semibold text-foreground">
                      <Icon className="h-4 w-4 text-ocean dark:text-sky" />
                      {title}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership */}

      <section className="relative section-spacing bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden" role="region" aria-label="Board of Directors">
        <div className="absolute inset-0 bg-gradient-to-br from-sand/30 via-transparent to-sky/20 dark:from-slate-900/40 dark:to-ocean/20 pointer-events-none"></div>
        <AnimatedBackground variant="subtle" className="opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10 flex items-start justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">The Mosaic Story</h2>
            <p className="text-muted-foreground">Milestones across 40+ years of service in NSW</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground relative z-10">
            <span>Select Year</span>
            <YearSelect
              years={yearsInSelectedDecade}
              value={selectedYear}
              onChange={(v) => setSelectedYear(v)}
            />
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
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="region"
          aria-label="Timeline decade slider"
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
            style={{ gridTemplateColumns: `repeat(${Math.min(4, Math.max(1, filteredHistory.length))}, minmax(260px, 1fr))` }}
          >
            {filteredHistory.map((item, idx) => (
              <div key={idx} className="story-card snap-start min-w-[260px] md:min-w-0">
                <button
                  aria-label={`Open details for ${item.label}`}
                  onClick={() => { setActiveStory(item); setSelectedDecade(deriveDecade(item.year)); setSelectedYear(item.year); setActiveImageIndex(0); setLastImageDirection(null); }}
                  className="group relative w-full text-left rounded-2xl border border-border bg-background shadow-sm overflow-hidden hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-40 md:h-48 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
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
            className="fixed inset-0 z-[60] flex items-center justify-center"
            aria-labelledby="story-dialog-title"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setActiveStory(null);
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
              onClick={() => setActiveStory(null)}
            />
            <div className="relative max-w-2xl w-[92%] md:w-[70%] rounded-2xl border border-border bg-background shadow-xl">
              <button
                aria-label="Close dialog"
                onClick={() => setActiveStory(null)}
                className="absolute bottom-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground shadow hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative">
                {activeStory.image ? (
                  <div className="w-full h-48 md:h-56 overflow-hidden rounded-t-2xl">
                    <AnimatePresence mode="wait" custom={lastImageDirection}>
                      <motion.img
                        key={`${activeStory.year}-${activeImageIndex}`}
                        src={activeImages[activeImageIndex]}
                        alt={activeStory.alt}
                        initial={{ opacity: 0, x: lastImageDirection === 'right' ? 40 : lastImageDirection === 'left' ? -40 : 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: lastImageDirection === 'right' ? -40 : lastImageDirection === 'left' ? 40 : 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                        className="w-full h-full object-cover"
                        onAnimationStart={() => setIsImageAnimating(true)}
                        onAnimationComplete={() => setIsImageAnimating(false)}
                      />
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="w-full h-48 md:h-56 rounded-t-2xl bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">No image available — see Related PDFs below</span>
                  </div>
                )}
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
              </div>
              <div className="p-6 pb-16">
                <h3 id="story-dialog-title" className="text-xl md:text-2xl font-bold text-foreground mb-2">{activeStory.label}</h3>
                <p className="text-muted-foreground mb-4">{activeStory.description}</p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">{activeStory.details}</p>
                {Array.isArray(activeStory.gallery) && activeStory.gallery.length > 0 && (
                  <div className="mt-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {[activeStory.image, ...activeStory.gallery].map((src, idx) => (
                        <button
                          key={idx}
                          aria-label={`View image ${idx + 1}`}
                          onClick={() => { setLastImageDirection(idx > activeImageIndex ? 'right' : 'left'); setActiveImageIndex(idx); }}
                          className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border ${activeImageIndex === idx ? 'border-ocean' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-ring`}
                        >
                          <img src={src} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
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
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground mb-2">More like this</p>
                  <div className="flex flex-wrap gap-2">
                    {filteredHistory.map((s, idx) => (
                      <button
                        key={`${s.year}-${idx}`}
                        onClick={() => { setActiveStory(s); setSelectedDecade(deriveDecade(s.year)); setSelectedYear(s.year); setActiveImageIndex(0); setLastImageDirection(null); }}
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs ${s.year === activeStory.year ? 'bg-muted text-foreground border-border' : 'bg-background text-muted-foreground border-border hover:bg-sand/60'} focus:outline-none focus:ring-2 focus:ring-ring`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Board */}
      <section className="relative section-spacing bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden" role="region" aria-labelledby="board-title">
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
      <section className="relative section-spacing bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 via-sky/10 to-ocean/5 dark:from-ocean/20 dark:via-sky/5 dark:to-ocean/10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-leaf/20 dark:bg-leaf/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center subsection-break">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Management</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">Our</span>{" "}
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">
                Management Team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Structured to reflect reporting lines while keeping a clean, premium presentation.
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
                    <p className="text-sm text-muted-foreground mb-2">Languages: {activeManager.languages.join(', ')}</p>
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
