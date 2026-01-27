import React from 'react';
import { useTranslation } from 'react-i18next';
import { serviceYearsBase, assetPath } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import RelatedServices from '@/components/RelatedServices';
// import { Timeline } from '../components/ui/timeline';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { FeatureMissionVision } from '@/components/ui/FeatureMissionVision';
import { FeatureValues } from '@/components/ui/FeatureValues';
import { AnimatePresence, motion } from 'framer-motion';
import { BoardSection } from '@/components/BoardSection';
import { ManagementSection } from '@/components/ManagementSection';
import { Link, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/ui/PageTransition';
import { PDFAccessibilityNotice } from '@/components/ui/PDFAccessibilityNotice';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
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
    { year: "1978", label: t('aboutPage.history.items.1978.label'), description: t('aboutPage.history.items.1978.description'), image: assetPath("/images/History_720px_webp/1978_Galbally Report.webp"), alt: t('aboutPage.history.items.1978.alt'), details: t('aboutPage.history.items.1978.details'), gallery: [assetPath("/images/History_720px_webp/1978_Galbally Report.webp"), assetPath("/images/History_720px_webp/1978_SBS.webp")], links: [
      { label: t('aboutPage.history.items.1978.links.0.label'), href: assetPath("/images/History_720px_webp/1978_Galbally Report_01_PM_Fraser.pdf") },
      { label: t('aboutPage.history.items.1978.links.1.label'), href: assetPath("/images/History_720px_webp/1978_Galbally Report 02_bertelli_1.pdf") }
    ] },
    { year: "1981", label: t('aboutPage.history.items.1981.label'), description: t('aboutPage.history.items.1981.description'), image: assetPath("/images/History_720px_webp/1981_Ian MacPhee.webp"), alt: t('aboutPage.history.items.1981.alt'), details: t('aboutPage.history.items.1981.details'), gallery: [], links: [
      { label: t('aboutPage.history.items.1981.links.0.label'), href: assetPath("/images/History_720px_webp/1981_OPENING OF MRC ADDRESS BY MINI.pdf") }
    ] },
    { year: "1984", label: t('aboutPage.history.items.1984.label'), description: t('aboutPage.history.items.1984.description'), image: assetPath("/images/History_720px_webp/1984_Chaucer Street.webp"), alt: t('aboutPage.history.items.1984.alt'), details: t('aboutPage.history.items.1984.details'), gallery: [] },
    { year: "1985", label: t('aboutPage.history.items.1985.label'), description: t('aboutPage.history.items.1985.description'), image: assetPath("/images/History_720px_webp/1985.webp"), alt: t('aboutPage.history.items.1985.alt'), details: t('aboutPage.history.items.1985.details') },
    { year: "1989", label: t('aboutPage.history.items.1989.label'), description: t('aboutPage.history.items.1989.description'), image: assetPath("/images/History_720px_webp/1989_Earthquake01.webp"), alt: t('aboutPage.history.items.1989.alt'), details: t('aboutPage.history.items.1989.details'), gallery: [
      assetPath("/images/History_720px_webp/1989_Earthquake02.webp"),
      assetPath("/images/History_720px_webp/1989_Earthquake03.webp")
    ] },
    { year: "1990", label: t('aboutPage.history.items.1990.label'), description: t('aboutPage.history.items.1990.description'), image: assetPath("/images/History_720px_webp/1990_Carnivale01.webp"), alt: t('aboutPage.history.items.1990.alt'), details: t('aboutPage.history.items.1990.details'), gallery: [
      assetPath("/images/History_720px_webp/1990_Carnivale03.webp"),
      assetPath("/images/History_720px_webp/1990_Carnivale04.webp"),
      assetPath("/images/History_720px_webp/1990_Carnivale05.webp"),
      assetPath("/images/History_720px_webp/1990_Carnivale06.webp"),
      assetPath("/images/History_720px_webp/1990_Carnivale07.webp"),
      assetPath("/images/History_720px_webp/1990_Carnivale.webp")
    ] },
    { year: "1991", label: t('aboutPage.history.items.1991.label'), description: t('aboutPage.history.items.1991.description'), image: assetPath("/images/History_720px_webp/1991_10Years_AGM.webp"), alt: t('aboutPage.history.items.1991.alt'), details: t('aboutPage.history.items.1991.details'), gallery: [
      assetPath("/images/History_720px_webp/1991_10Years_AGM01.webp"),
      assetPath("/images/History_720px_webp/1991_10Years_AGM02.webp")
    ] },
    { year: "1999", label: t('aboutPage.history.items.1999.label'), description: t('aboutPage.history.items.1999.description'), image: assetPath("/images/History_720px_webp/1999_Kosovar01.webp"), alt: t('aboutPage.history.items.1999.alt'), details: t('aboutPage.history.items.1999.details'), gallery: [
      assetPath("/images/History_720px_webp/1999_Kosovar02.webp"),
      assetPath("/images/History_720px_webp/1999_Kosovar03.webp"),
      assetPath("/images/History_720px_webp/1999_Kosovar04.webp"),
      assetPath("/images/History_720px_webp/1999_Kosovar05.webp")
    ] },
    { year: "2001", label: t('aboutPage.history.items.2001.label'), description: t('aboutPage.history.items.2001.description'), image: assetPath("/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv01.webp"), alt: t('aboutPage.history.items.2001.alt'), details: t('aboutPage.history.items.2001.details'), gallery: [
      assetPath("/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv01.webp"),
      assetPath("/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv02.webp"),
      assetPath("/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv03.webp"),
      assetPath("/images/History_720px_webp/2001_10YearAnniv/2001_10YearAnniv04.webp"),
    ] },
    { year: "2004", label: t('aboutPage.history.items.2004.label'), description: t('aboutPage.history.items.2004.description'), image: undefined as unknown as string, alt: t('aboutPage.history.items.2004.alt'), details: t('aboutPage.history.items.2004.details'), gallery: [] },
    { year: "2005", label: t('aboutPage.history.items.2005.label'), description: t('aboutPage.history.items.2005.description'), image: assetPath("/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office.webp"), alt: t('aboutPage.history.items.2005.alt'), details: t('aboutPage.history.items.2005.details'), gallery: [
      assetPath("/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office01.webp"),
      assetPath("/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office02.webp"),
      assetPath("/images/History_720px_webp/2005_CentralCoast_Office/2005_CentralCoast_Office03.webp"),
    ] },
    { year: "2006", label: t('aboutPage.history.items.2006.label'), description: t('aboutPage.history.items.2006.description'), image: assetPath("/images/History_720px_webp/2006_SilverJubilee.webp"), alt: t('aboutPage.history.items.2006.alt'), details: t('aboutPage.history.items.2006.details'), gallery: [] },
    { year: "2007", label: t('aboutPage.history.items.2007.label'), description: t('aboutPage.history.items.2007.description'), image: assetPath("/images/History_720px_webp/2007_NSS.webp"), alt: t('aboutPage.history.items.2007.alt'), details: t('aboutPage.history.items.2007.details') },
    { year: "2011", label: t('aboutPage.history.items.2011.label'), description: t('aboutPage.history.items.2011.description'), image: assetPath("/images/History_720px_webp/2011_VJW_Farewell.webp"), alt: t('aboutPage.history.items.2011.alt'), details: t('aboutPage.history.items.2011.details'), gallery: [assetPath("/images/History_720px_webp/2011_VJW_Farewell_01.webp"), assetPath("/images/History_720px_webp/2011_VJW_Farewell_02.webp"), assetPath("/images/History_720px_webp/2011_VJW_Farewell_03.webp"), assetPath("/images/History_720px_webp/2011_VJW_Farewell_04.webp"), assetPath("/images/History_720px_webp/2011_VJW_Farewell_05.webp"), assetPath("/images/History_720px_webp/2010_Lulu Tantos.webp")] },
    { year: "2019", label: t('aboutPage.history.items.2019.label'), description: t('aboutPage.history.items.2019.description'), image: assetPath("/images/History_720px_webp/2019_ShaonDaishe.webp"), alt: t('aboutPage.history.items.2019.alt'), details: t('aboutPage.history.items.2019.details') },
    { year: "2021", label: t('aboutPage.history.items.2021.label'), description: t('aboutPage.history.items.2021.description'), image: assetPath("/images/History_720px_webp/2021_40th Celebration01.webp"), alt: t('aboutPage.history.items.2021.alt'), details: t('aboutPage.history.items.2021.details'), gallery: [
      assetPath("/images/History_720px_webp/2021_40th Celebration04.webp"),
      assetPath("/images/History_720px_webp/2021_40th Celebration05.webp"),
      assetPath("/images/History_720px_webp/2021_40th Celebration06.webp"),
      assetPath("/images/History_720px_webp/2021_40th Celebration07.webp")
    ] },
    { year: "2022", label: t('aboutPage.history.items.2022.label'), description: t('aboutPage.history.items.2022.description'), image: assetPath("/images/History_720px_webp/2022_MosaicMC_Rebranding.webp"), alt: t('aboutPage.history.items.2022.alt'), details: t('aboutPage.history.items.2022.details'), gallery: [] },
    { year: "2024", label: t('aboutPage.history.items.2024.label'), description: t('aboutPage.history.items.2024.description'), image: assetPath("/images/History_720px_webp/2024_Closing01.webp"), alt: t('aboutPage.history.items.2024.alt'), details: t('aboutPage.history.items.2024.details'), gallery: [
      assetPath("/images/History_720px_webp/2024_Closing01.webp"),
      assetPath("/images/History_720px_webp/2024_Closing07.webp"),
      assetPath("/images/History_720px_webp/2024_Closing02.webp"),
      assetPath("/images/History_720px_webp/2024_Closing05.webp"),
      assetPath("/images/History_720px_webp/2024_Closing03.webp"),
      assetPath("/images/History_720px_webp/2024_Closing06.webp"),
      assetPath("/images/History_720px_webp/2024_Closing04.webp"),
      assetPath("/images/History_720px_webp/2024_Closing.webp"),
      assetPath("/images/History_720px_webp/2024_Charlestown.webp"),
      assetPath("/images/History_720px_webp/2024_Charlestown01.webp"),
      assetPath("/images/History_720px_webp/2024_Charlestown02.webp"),
      assetPath("/images/History_720px_webp/2024_Closing09.webp"),
      assetPath("/images/History_720px_webp/2024_Charlestown04.webp")
    ] },
  ], [t]);
  const deriveDecade = (y: string) => `${Math.floor(Number(y) / 10) * 10}s`;
  const decades = Array.from(new Set(storyData.map((d) => deriveDecade(d.year))));
  const [selectedDecade, setSelectedDecade] = React.useState<string>("all");
  const [selectedYear, setSelectedYear] = React.useState<string>("all");

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
  const boardMembers = React.useMemo(() => [
    { id: "sandra", name: t('aboutPage.board.members.sandra.name'), title: t('aboutPage.board.members.sandra.title'), role: t('aboutPage.board.members.sandra.role'), credentials: t('aboutPage.board.members.sandra.credentials'), summary: t('aboutPage.board.members.sandra.summary'), languages: t('aboutPage.board.members.sandra.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.sandra.bio'), social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/sandra-feltham-2b16a535/' }] },
    { id: "shirley", name: t('aboutPage.board.members.shirley.name'), title: t('aboutPage.board.members.shirley.title'), role: t('aboutPage.board.members.shirley.role'), credentials: t('aboutPage.board.members.shirley.credentials'), summary: t('aboutPage.board.members.shirley.summary'), languages: t('aboutPage.board.members.shirley.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.shirley.bio'), social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/dr-shirley-schulz-robinson-pcc-%F0%9F%87%BA%F0%9F%87%A6-%F0%9F%87%B5%F0%9F%87%B8%F0%9F%87%AE%F0%9F%87%B1-43949938/' }] },
    { id: "zachary", name: t('aboutPage.board.members.zachary.name'), title: t('aboutPage.board.members.zachary.title'), role: t('aboutPage.board.members.zachary.role'), credentials: t('aboutPage.board.members.zachary.credentials'), summary: t('aboutPage.board.members.zachary.summary'), languages: t('aboutPage.board.members.zachary.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.zachary.bio'), social: [{ platform: 'linkedin' as const, href: '#' }] },
    { id: "raj", name: t('aboutPage.board.members.raj.name'), title: t('aboutPage.board.members.raj.title'), role: t('aboutPage.board.members.raj.role'), credentials: t('aboutPage.board.members.raj.credentials'), summary: t('aboutPage.board.members.raj.summary'), languages: t('aboutPage.board.members.raj.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.raj.bio'), social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/rajsirimanne/' }] },
    { id: "peter", name: t('aboutPage.board.members.peter.name'), title: t('aboutPage.board.members.peter.title'), role: t('aboutPage.board.members.peter.role'), credentials: t('aboutPage.board.members.peter.credentials'), summary: t('aboutPage.board.members.peter.summary'), languages: t('aboutPage.board.members.peter.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.peter.bio'), social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/peter-gittins-35bb376/' }] },
    { id: "catherine", name: t('aboutPage.board.members.catherine.name'), title: t('aboutPage.board.members.catherine.title'), role: t('aboutPage.board.members.catherine.role'), credentials: t('aboutPage.board.members.catherine.credentials'), summary: t('aboutPage.board.members.catherine.summary'), languages: t('aboutPage.board.members.catherine.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.catherine.bio'), social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/catherinecandiloro/' }] },
    { id: "lauren", name: t('aboutPage.board.members.lauren.name'), title: t('aboutPage.board.members.lauren.title'), role: t('aboutPage.board.members.lauren.role'), credentials: t('aboutPage.board.members.lauren.credentials'), summary: t('aboutPage.board.members.lauren.summary'), languages: t('aboutPage.board.members.lauren.languages', { returnObjects: true }) as string[], bio: t('aboutPage.board.members.lauren.bio'), social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/locroiset/' }] },
  ], [t]);
  const boardImgMap: Record<string, { webp: string; jpg: string }> = {
    "sandra": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Sandra_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Sandra_128px.webp"),
    },
    "shirley": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Shirley_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Shirley_128px.webp"),
    },
    "zachary": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Zac_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Zac_128px.webp"),
    },
    "raj": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Raj_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Raj_128px.webp"),
    },
    "peter": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Peter_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Peter_128px.webp"),
    },
    "catherine": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Cat_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Cat_128px.webp"),
    },
    "lauren": {
      webp: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Lo_128px.webp"),
      jpg: assetPath("/images/aged-care/Mosaic_Board_128px/Mosaic_Board_Lo_128px.webp"),
    },
  };
  
  type ManagementMember = {
    id: string;
    name: string;
    title: string;
    level: 1 | 2 | 3;
    languages?: string[];
    bio: string;
    credentialsSummary?: string;
    social?: Array<{ platform: 'linkedin' | 'twitter' | 'website'; href: string }>;
  };

  const managementMembers = React.useMemo(() => [
    {
      id: "sharon",
      name: t('aboutPage.management.members.sharon.name'),
      title: t('aboutPage.management.members.sharon.title'),
      level: 1 as const,
      languages: t('aboutPage.management.members.sharon.languages', { returnObjects: true }) as string[],
      bio: t('aboutPage.management.members.sharon.bio'),
      credentialsSummary: t('aboutPage.management.members.sharon.credentials'),
      social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/sdaishe/' }]
    },
    {
      id: "belinda",
      name: t('aboutPage.management.members.belinda.name'),
      title: t('aboutPage.management.members.belinda.title'),
      level: 2 as const,
      languages: t('aboutPage.management.members.belinda.languages', { returnObjects: true }) as string[],
      bio: t('aboutPage.management.members.belinda.bio'),
      credentialsSummary: t('aboutPage.management.members.belinda.credentials'),
      social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/belinda-latimore-46061175/' }]
    },
    {
      id: "richard",
      name: t('aboutPage.management.members.richard.name'),
      title: t('aboutPage.management.members.richard.title'),
      level: 2 as const,
      languages: t('aboutPage.management.members.richard.languages', { returnObjects: true }) as string[],
      bio: t('aboutPage.management.members.richard.bio'),
      credentialsSummary: t('aboutPage.management.members.richard.credentials'),
      social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/richardmarkhanson/' }]
    },
    {
      id: "karthik",
      name: t('aboutPage.management.members.karthik.name'),
      title: t('aboutPage.management.members.karthik.title'),
      level: 3 as const,
      languages: t('aboutPage.management.members.karthik.languages', { returnObjects: true }) as string[],
      bio: t('aboutPage.management.members.karthik.bio'),
      credentialsSummary: t('aboutPage.management.members.karthik.credentials'),
      social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/ramamurthykarthik/' }]
    },
    {
      id: "jawaid",
      name: t('aboutPage.management.members.jawaid.name'),
      title: t('aboutPage.management.members.jawaid.title'),
      level: 3 as const,
      languages: t('aboutPage.management.members.jawaid.languages', { returnObjects: true }) as string[],
      bio: t('aboutPage.management.members.jawaid.bio'),
      credentialsSummary: t('aboutPage.management.members.jawaid.credentials'),
      social: [{ platform: 'linkedin' as const, href: 'https://www.linkedin.com/in/jawaid-pardehi/' }]
    },
  ], [t]);
  const managementImgMap: Record<string, { webp?: string; jpg?: string }> = {
    "sharon": {
      webp: "/images/Management 128px/Management_Sharon_128px.webp",
      jpg: "/images/Management 128px/Management_Sharon_128px.webp",
    },
    "belinda": {
      webp: "/images/Management 128px/Management_Belinda_128px.webp",
      jpg: "/images/Management 128px/Management_Belinda_128px.webp",
    },
    "richard": {
      webp: "/images/Management 128px/Management_Richard_128px.webp",
      jpg: "/images/Management 128px/Management_Richard_128px.webp",
    },
    "karthik": {
      webp: "/images/Management 128px/Management_Karthik_128px.webp",
      jpg: "/images/Management 128px/Management_Karthik_128px.webp",
    },
    "jawaid": {
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
    <PageTransition>
      <div className="animate-fade-in">
      <Helmet>
        <title>{t('aboutPage.meta.title')} | {t('common.brandName')}</title>
        <meta name="description" content="Learn about Mosaic Multicultural Connections — 45 years supporting multicultural communities in NSW with culturally appropriate services and programs." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": t('aboutPage.meta.schema.webPage.name'),
          "inLanguage": i18n.language === 'hi' ? 'hi-IN' : 'en-AU',
          "about": t('aboutPage.meta.schema.webPage.about', { returnObjects: true }),
          "spatialCoverage": t('aboutPage.meta.schema.webPage.spatialCoverage', { returnObjects: true })
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": t('aboutPage.meta.schema.faqPage.q1.question'),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": t('aboutPage.meta.schema.faqPage.q1.answer')
              }
            },
            {
              "@type": "Question",
              "name": t('aboutPage.meta.schema.faqPage.q2.question'),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": t('aboutPage.meta.schema.faqPage.q2.answer')
              }
            },
            {
              "@type": "Question",
              "name": t('aboutPage.meta.schema.faqPage.q3.question'),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": t('aboutPage.meta.schema.faqPage.q3.answer')
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
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('aboutPage.hero.label')}</span>
            </div>
            
            <h1 className="fluid-h1 text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('aboutPage.hero.title')}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('aboutPage.hero.description_prefix', { years: serviceYearsBase() })}
              {" "}
              <Link to="/services/settlement-support" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('aboutPage.hero.services.settlement')}</Link>,{" "}
              <Link to="/services/aged-care" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('aboutPage.hero.services.agedCare')}</Link>,{" "}
              <Link to="/services/family-support" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('aboutPage.hero.services.family')}</Link>,{" "}
              and{" "}
              <Link to="/services/community-engagement" className="font-bold text-xl text-ocean dark:text-foreground hover:text-ocean/90 dark:hover:text-foreground focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background">{t('aboutPage.hero.services.community')}</Link>{" "}
              {t('aboutPage.hero.description_suffix')}
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
            { number: serviceYearsBase().toString(), label: t('aboutPage.hero.stats.yearsOfService'), suffix: "+" },
            { number: "25", label: t('aboutPage.hero.stats.communitiesServed'), suffix: "+" },
            { number: "15,000", label: t('aboutPage.hero.stats.familiesSupported'), suffix: "+" }
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
        mission={t('aboutPage.mission.mission')}
        vision={t('aboutPage.mission.vision')}
      />
      <FeatureValues />

      {/* Leadership */}

      <section className="relative section-spacing border-t border-divider bg-gradient-to-br from-sand/20 via-sky/5 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden" role="region" aria-label={t('about.boardOfDirectors')}>
        <div className="absolute inset-0 bg-gradient-to-br from-sand/30 via-transparent to-sky/20 dark:from-slate-900/40 dark:to-ocean/20 pointer-events-none"></div>
        <AnimatedBackground variant="subtle" className="opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10 flex items-start justify-between">
          <div>
            <h2 id="our-story-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-3 scroll-mt-40 md:scroll-mt-48">{t('about.mosaicStory')}</h2>
            <p className="text-muted-foreground">{t('about.milestonesTitle')}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center flex-wrap gap-2 relative z-10" aria-label={t('about.selectDecade')}>
            <button
              aria-pressed={selectedDecade === "all"}
              onClick={() => { setSelectedDecade("all"); setSelectedYear("all"); }}
              className={`px-3 py-1 rounded-full border transition ${selectedDecade === "all" ? "bg-ocean text-white border-ocean" : "bg-background text-foreground border-border hover:bg-sand/60"} focus:outline-none focus:ring-2 focus:ring-ring`}
            >
              {t('about.allDecades')}
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
          aria-label={t('about.timelineSlider')}
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
                  aria-label={t('about.openDetailsFor', { label: item.label })}
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
                      <span className="text-sm font-medium text-muted-foreground">{t('about.viewPdfs')}</span>
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
                aria-label={canGoPrev
                  ? t('about.previousDecadeWithValue', { decade: decadeList[currentDecadeIndex - 1] })
                  : t('about.previousDecade')}
                aria-controls="mosaic-story-slider"
                onClick={goPrevDecade}
                disabled={!canGoPrev}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-ring ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sand/60'}`}
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                aria-label={canGoNext
                  ? t('about.nextDecadeWithValue', { decade: decadeList[currentDecadeIndex + 1] })
                  : t('about.nextDecade')}
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
                aria-label={t('common.scrollPrevious')}
                aria-controls="mosaic-story-slider"
                onClick={() => scrollByCard(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-ring hover:bg-sand/60"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                aria-label={t('common.scrollNext')}
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
              aria-label={t('common.closeDialog')}
              className="absolute inset-0 bg-black/50"
              onClick={closeStoryModal}
            />
            <div className="relative max-w-2xl w-[92%] md:w-[70%] rounded-2xl border border-border bg-background shadow-xl my-6 md:my-10">
              <button
                aria-label={t('common.closeDialog')}
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
                    <span className="text-sm font-medium text-muted-foreground">{t('about.noImageAvailable')}</span>
                  </div>
                )}
                {activeImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-background/80 border border-border shadow px-2 py-1">
                    <button
                      aria-label={t('common.previousImage')}
                      onClick={goPrevImage}
                      disabled={!canPrevImage}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${canPrevImage ? 'text-foreground hover:bg-sand/60' : 'text-muted-foreground opacity-60 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="w-px h-5 bg-border/70" aria-hidden="true"></span>
                    <button
                      aria-label={t('common.nextImage')}
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
                          aria-label={t('common.viewImage', { index: idx + 1 })}
                          onClick={() => { setLastImageDirection(idx > activeImageIndex ? 'right' : 'left'); setActiveImageIndex(idx); }}
                          className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border ${activeImageIndex === idx ? 'border-ocean' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-ring`}
                        >
                            <img
                              src={src}
                              alt={t('common.imageAltWithIndex', { alt: activeStory.alt, index: idx + 1 })}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-contain bg-background"
                            />
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
                          aria-label={`${l.label} (opens in new tab)`}
                          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-sky"
                        >
                          {l.label}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                    <PDFAccessibilityNotice className="mt-3" />
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
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('aboutPage.board.badge')}</span>
            </div>
            <h2 id="board-title" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">
                {t('aboutPage.board.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('aboutPage.board.subtitle')}</p>
          </div>
          <div>
            {(() => {
              const members = boardMembers.map((m) => ({
                name: m.name,
                role: m.title ? m.title : m.role,
                bio: m.bio,
                avatar: boardImgMap[m.id]?.jpg,
                social: m.social,
                languages: m.languages,
                credentialsSummary: m.credentials,
                summary: m.summary,
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
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-leaf/20 dark:bg-leaf/10 rounded-full blur-3xl motion-safe:animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center subsection-break">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('aboutPage.management.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-ocean via-sky to-leaf bg-clip-text text-transparent dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-ocean dark:via-sky dark:to-leaf">
                {t('aboutPage.management.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('aboutPage.management.description')}
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
                  avatar: m.id ? (managementImgMap[m.id]?.webp ?? managementImgMap[m.id]?.jpg) : undefined,
                  credentialsSummary: m.credentialsSummary,
                  social: m.social,
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
              <button aria-label={t('common.closeDialog')} className="absolute inset-0 bg-black/50" onClick={() => setActiveManager(null)} />
              <div className="relative max-w-2xl w-[92%] md:w-[70%] rounded-2xl border border-border bg-background shadow-xl">
                <button
                  aria-label={t('common.closeDialog')}
                  onClick={() => setActiveManager(null)}
                  className="absolute bottom-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground shadow hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="p-6 pb-16">
                  <h3 id="manager-dialog-title" className="text-xl md:text-2xl font-bold text-foreground mb-2">{activeManager.name || activeManager.title}</h3>
                  {activeManager.name && (<p className="text-muted-foreground mb-1">{activeManager.title}</p>)}
                  {activeManager.languages && activeManager.languages.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-2">{t('aboutPage.management.languagesLabel')}: {activeManager.languages.join(', ')}</p>
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
    </PageTransition>
  );
};

export default AboutPage;
