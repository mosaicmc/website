import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
// Removed unused DropdownMenu imports after integrating Get Involved under Services/Resources patterns
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu-trigger-style";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { prefetchOnHover, prefetchRoute } from "@/lib/prefetch";
import { Menu, Phone, X, Home, Heart, Users, Globe, LucideIcon, AlertTriangle, Book, ShieldCheck, Search, UserPlus } from "lucide-react";
import { logSearchQuery, getMonthlyTop } from '@/lib/searchAnalytics';
import { auSpelling } from '@/lib/auSpelling';
import { LocalSearchClient, buildFacets as buildFacetsFromClient, initSearchConfigs } from '@/lib/searchClient';
import { ThemeToggle } from './ui/theme-toggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

type ServiceNavItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};


type SearchItem = { path: string; title: string; body: string; tags: string[]; lang?: string };
let runtimeIndex: SearchItem[] = [];
let indexLoaded = false;
async function loadSearchIndex() {
  if (indexLoaded) return;
  try {
    const res = await fetch(assetPath('/search-index.json'));
    const data = await res.json();
    runtimeIndex = Array.isArray(data.items) ? data.items : [];
    indexLoaded = true;
  } catch {
    runtimeIndex = [];
    indexLoaded = true;
  }
}

type ListItemProps = {
  title: string;
  to: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, to, icon: Icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={to}
            ref={ref}
            className={cn(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
              "text-foreground",
              // Improved hover/focus visibility in dark mode
              "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
              "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
              className
            )}
            {...prefetchOnHover(to)}
            {...props}
          >
            <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
              {Icon && <Icon className="h-5 w-5" />}
              {title}
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

import { assetPath } from '@/lib/utils';

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link to="/" className="flex-shrink-0 group relative flex items-center h-12 md:h-[60px]">
      <img
        className="block transition-all duration-500 group-hover:scale-105 hover:drop-shadow-lg h-full w-auto max-w-none"
        src={theme === 'dark' ? assetPath('/images/Logos/Mosaic_Logo_white_Dark.svg') : assetPath('/images/Logos/320w/Mosaic_Logo_Blue_Light_320px.svg')}
        alt="Mosaic Multicultural Connections"
      />
    </Link>
  );
};

export default function MosaicNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const isEmergencyMode = location.pathname.startsWith('/resources/emergency-');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacets, setSelectedFacets] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [topQueries, setTopQueries] = useState<{ query: string; count: number }[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [sortMode, setSortMode] = useState<'relevance' | 'alpha'>('relevance');
  const [showAll, setShowAll] = useState(false);
  const { theme } = useTheme();
  const glassRef = React.useRef<HTMLDivElement | null>(null);
  const clientRef = React.useRef<LocalSearchClient | null>(null);

  React.useEffect(() => {
    const el = glassRef.current;
    if (!el) return;
    el.style.transition = "all 300ms ease";
    (el.style as unknown as CSSStyleDeclaration & { webkitTransition?: string }).webkitTransition = "all 300ms ease";
    el.style.willChange = "opacity, backdrop-filter, transform, box-shadow, border-color";
    el.style.transform = "translateZ(0)";
    const update = () => {
      const y = window.scrollY || 0;
      let p = y / 300;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      const blur = 2 + 14 * p;
      const alphaLight = 0.15 + 0.35 * p;
      const alphaDark = 0.7 + 0.2 * p;
      // bgLight/bgDark construction removed - handled in CSS

      el.style.opacity = "1";
      
      // Update CSS variables for opacity/blur logic
      // Theme switching is now handled via CSS classes using these variables
      el.style.setProperty("--nav-opacity-light", alphaLight.toFixed(3));
      el.style.setProperty("--nav-opacity-dark", alphaDark.toFixed(3));
      el.style.setProperty("--nav-blur", `${blur}px`);
      
      const shadowAlpha = 0.05 + 0.15 * p;
      el.style.setProperty("--nav-shadow", `rgba(0,0,0,${shadowAlpha})`);
      
      const borderAlpha = 0.06 + 0.10 * p;
      el.style.setProperty("--nav-border-opacity", borderAlpha.toFixed(3));
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          update();
        });
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Observer no longer needed for theme switching as it's handled by CSS
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [theme]);

  React.useEffect(() => {
    const el = glassRef.current;
    if (!el) return;
    const applyOffset = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-offset", `${h}px`);
      (document.documentElement.style as unknown as CSSStyleDeclaration & { scrollPaddingTop?: string }).scrollPaddingTop = `${h}px`;
    };
    applyOffset();
    window.addEventListener("resize", applyOffset, { passive: true });
    return () => {
      window.removeEventListener("resize", applyOffset);
    };
  }, []);

  // Check if current path matches navigation item
  const isActivePath = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      return location.pathname.startsWith(href);
    }
    return location.pathname === href;
  };

  const mainNavigation = [
    { title: t('nav.home'), href: "/" },
    { title: t('nav.about'), href: "/about" },
    { title: t('nav.contact'), href: "/contact-us" },
  ];

  const services: ServiceNavItem[] = [
    {
      title: t('services.settlement'),
      href: "/services/settlement-support",
      description: t('serviceCards.settlement.description'),
      icon: Home,
    },
    {
      title: t('services.agedCare'),
      href: "/services/aged-care",
      description: t('serviceCards.agedCare.description'),
      icon: Heart,
    },
    {
      title: t('services.familySupport'),
      href: "/services/family-support",
      description: t('serviceCards.familySupport.description'),
      icon: Users,
    },
    {
      title: t('services.communityEngagement'),
      href: "/services/community-engagement",
      description: t('serviceCards.communityEngagement.description'),
      icon: Globe,
    },
  ];

  const aboutLinks = [
    {
      title: t('nav.menu.about.mosaic.title'),
      href: "/about",
      description: t('nav.menu.about.mosaic.description'),
      icon: Home,
    },
    {
      title: t('nav.menu.about.media.title'),
      href: "/company/news",
      description: t('nav.menu.about.media.description'),
      icon: Globe,
    },
  ];

  const resourcesLinks = [
    {
      title: t('nav.menu.resources.emergency.title'),
      href: "/resources/emergency-translation",
      description: t('nav.menu.resources.emergency.description'),
      icon: AlertTriangle,
    },
    {
      title: t('nav.menu.resources.links.title'),
      href: "/resources/helpful-links",
      description: t('nav.menu.resources.links.description'),
      icon: Globe,
    },
    {
      title: t('nav.menu.resources.knowledge.title'),
      href: "/company/knowledge-base",
      description: t('nav.menu.resources.knowledge.description'),
      icon: Book,
    },
    {
      title: t('nav.menu.resources.faqs.title'),
      href: "/resources/faqs",
      description: t('nav.menu.resources.faqs.description'),
      icon: Search,
    },
  ];

  const getInvolvedLinks = [
    {
      title: t('nav.menu.involved.careers.title'),
      href: "/company/careers",
      description: t('nav.menu.involved.careers.description'),
      icon: UserPlus,
    },
    {
      title: t('nav.menu.involved.volunteer.title'),
      href: "/get-involved",
      description: t('nav.menu.involved.volunteer.description'),
      icon: Users,
    },
    {
      title: t('nav.menu.involved.donate.title'),
      href: "/donate",
      description: t('nav.menu.involved.donate.description'),
      icon: Heart,
    },
  ];

  const handleCloseCrisisBanner = () => {
    setShowCrisisBanner(false);
  };

  React.useEffect(() => {
    loadSearchIndex().then(async () => {
      await initSearchConfigs();
      clientRef.current = new LocalSearchClient(runtimeIndex, i18n.language);
    });
    const onKey = (e: KeyboardEvent) => {
      const isMetaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isMetaK) {
        e.preventDefault();
        setShowOverlay((v) => !v);
        setIsSearchOpen(true);
        setTimeout(() => {
          const el = document.getElementById('header-search-input');
          (el as HTMLInputElement | null)?.focus();
        }, 20);
      } else if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          const el = document.getElementById('header-search-input');
          (el as HTMLInputElement | null)?.focus();
        }, 20);
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        const next = !(localStorage.getItem('mosaic-owner') === '1');
        localStorage.setItem('mosaic-owner', next ? '1' : '0');
        setIsOwner(next);
      }
    };
    window.addEventListener('keydown', onKey);
    const initialOwner = localStorage.getItem('mosaic-owner') === '1' || (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV;
    setIsOwner(!!initialOwner);
    return () => window.removeEventListener('keydown', onKey);
  }, [i18n.language]);

  React.useEffect(() => {
    if (clientRef.current) clientRef.current.setLanguage(i18n.language);
  }, [i18n.language]);

  function expandSynonyms(q: string): string[] {
    const base = q.toLowerCase();
    const syn: Record<string, string[]> = {
      volunteer: ['get involved', 'help', 'participate'],
      interpreting: ['translation', 'language', 'tis'],
      donate: ['support', 'give', 'funding'],
      services: ['programs', 'support'],
      emergency: ['000', 'police', 'fire', 'ambulance'],
      'aged care': ['elder care', 'elderly', 'senior', 'seniors'],
      'elder care': ['aged care', 'elderly', 'senior', 'seniors'],
      elder: ['aged care'],
      employment: ['jobs', 'job', 'career', 'work', 'get involved', 'work for us', 'volunteer', 'join our team'],
      jobs: ['employment', 'job', 'career', 'work', 'get involved', 'work for us', 'volunteer', 'join our team'],
      job: ['employment', 'jobs', 'career', 'work', 'get involved', 'work for us', 'join our team'],
      career: ['employment', 'jobs', 'work', 'get involved', 'work for us', 'join our team'],
      work: ['employment', 'jobs', 'career', 'get involved', 'work for us', 'join our team'],
      'old people': ['aged care', 'elderly', 'senior', 'seniors', 'elder care'],
      old: ['aged care', 'elderly', 'senior', 'seniors', 'elder care'],
    };
    const acc = new Set<string>([base]);
    for (const [k, arr] of Object.entries(syn)) {
      if (base.includes(k)) arr.forEach((a) => acc.add(a));
      for (const a of arr) if (base.includes(a)) acc.add(k);
    }

    const lang = (i18n.language || 'en').toLowerCase();
    const trans: Record<string, Record<string, string[]>> = {
      hi: {
        'रोजगार': ['employment', 'jobs', 'work'],
        'नौकरी': ['jobs', 'employment'],
        'करियर': ['career'],
        'काम': ['work', 'employment'],
        'वृद्ध': ['aged care', 'elder care'],
        'वृद्ध देखभाल': ['aged care', 'elder care'],
        'बुजुर्ग': ['aged care', 'elder care'],
        'सेवाएं': ['services'],
        'स्वयंसेवी': ['volunteer', 'get involved'],
        'naukri': ['jobs', 'employment'],
        'kaam': ['work', 'employment'],
        'buzurg': ['aged care', 'elder care'],
        'sewa': ['services'],
        'dekhbhal': ['aged care', 'elder care']
      },
      es: {
        'empleo': ['employment', 'jobs', 'work'],
        'trabajo': ['work', 'employment'],
        'carrera': ['career'],
        'ancianos': ['aged care', 'elder care'],
        'cuidado de mayores': ['aged care', 'elder care'],
        'servicios': ['services'],
        'voluntariado': ['volunteer', 'get involved']
      },
      vi: {
        'việc làm': ['employment', 'jobs', 'work'],
        'nghề nghiệp': ['career'],
        'người già': ['aged care', 'elder care'],
        'chăm sóc người cao tuổi': ['aged care', 'elder care'],
        'dịch vụ': ['services'],
        'tình nguyện': ['volunteer', 'get involved']
      },
      ar: {
        'عمل': ['work', 'employment'],
        'وظائف': ['jobs', 'employment'],
        'وظيفة': ['job', 'employment'],
        'مسار مهني': ['career'],
        'مسن': ['aged care', 'elder care'],
        'رعاية المسنين': ['aged care', 'elder care'],
        'خدمات': ['services'],
        'تطوع': ['volunteer', 'get involved']
      }
    };
    const langMap = trans[lang];
    if (langMap) {
      for (const [k, arr] of Object.entries(langMap)) {
        if (base.includes(k)) {
          acc.add(k);
          arr.forEach((a) => acc.add(a));
        }
      }
    }
    const aus = auSpelling(base);
    acc.add(aus);
    return Array.from(acc);
  }

  function rankResults(q: string, items: SearchItem[], facets: string[] = []): SearchItem[] {
    const qs = expandSynonyms(q);
    const lang = (i18n.language || 'en').toLowerCase();
    const scored = items.map((it) => {
      const hay = `${it.title} ${it.body} ${(it.tags || []).join(' ')}`.toLowerCase();
      let score = 0;
      for (const term of qs) {
        if (!term) continue;
        if (it.title.toLowerCase() === term) score += 8;
        if (it.title.toLowerCase().startsWith(term)) score += 6;
        if (it.title.toLowerCase().includes(term)) score += 5;
        if (hay.includes(term)) score += 3;
      }
      if (it.lang && it.lang.toLowerCase() === lang) score += 4;
      if (facets.length) {
        const tagset = new Set((it.tags || []).map((t) => t.toLowerCase()));
        for (const f of facets) if (tagset.has(f.toLowerCase())) score += 4;
      }
      return { it, score };
    });
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.it);
  }

  

  function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[m][n];
  }

  function buildSuggestions(q: string, items: SearchItem[]): string[] {
    const base = q.trim().toLowerCase();
    if (!base) return [];
    const aus = auSpelling(base).toLowerCase();
    const pool = new Set<string>();
    const texts: string[] = [];
    for (const it of items) {
      texts.push(it.title.toLowerCase());
      for (const t of it.tags || []) texts.push(t.toLowerCase());
    }
    const uniq = Array.from(new Set(texts));
    const scored = uniq.map((t) => ({ t, d: Math.min(levenshtein(base, t), levenshtein(aus, t)) }));
    const close = scored.filter((x) => x.d <= 3).sort((a, b) => a.d - b.d).slice(0, 5).map((x) => x.t);
    close.forEach((c) => pool.add(c));
    pool.add(aus);
    const arr = Array.from(pool).slice(0, 5);
    return ['All', ...arr.filter((x) => x.toLowerCase() !== 'all')].slice(0, 5);
  }

  function filterByFacets(items: SearchItem[], facets: string[]): SearchItem[] {
    if (!facets.length) return items;
    return items.filter((it) => {
      const tagset = new Set((it.tags || []).map((t) => t.toLowerCase()));
      return facets.some((f) => tagset.has(f.toLowerCase()));
    });
  }

  function allResults(items: SearchItem[], facets: string[], mode: 'relevance' | 'alpha'): SearchItem[] {
    const filtered = filterByFacets(items, facets);
    if (mode === 'alpha') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  }

  return (
    <>
      {/* Crisis Support Banner */}
      {showCrisisBanner && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium relative z-[120]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 sm:space-x-4">
            <span className="text-sm">{t('nav.menu.crisis.banner')}</span>
            <Link 
              to="/resources"
              className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-colors text-sm font-medium"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              {t('nav.menu.crisis.button')}
            </Link>
            <button
              onClick={handleCloseCrisisBanner}
              className="ml-2 p-1 hover:bg-red-700 rounded transition-colors"
              aria-label="Close crisis banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <nav ref={glassRef} className="nav-glass sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 h-full md:mt-[21px]">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home */}
                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActivePath('/')
                            ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
                            : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        )}
                        {...prefetchOnHover('/')}
                      >
                        {t('nav.home')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Services Dropdown */}
                  {!isEmergencyMode && (
                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuTrigger className={cn(
                      isActivePath('/services', true)
                        ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
                        : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    )}
                      onMouseEnter={() => {
                        prefetchRoute('/services');
                        services.forEach(s => prefetchRoute(s.href));
                      }}
                      onFocus={() => {
                        prefetchRoute('/services');
                        services.forEach(s => prefetchRoute(s.href));
                      }}
                    >{t('nav.services')}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-white dark:bg-slate-900/95 border border-white/30 dark:border-slate-700/50 shadow-2xl">
                      <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
                        <div className="col-span-2">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                            {t('nav.headers.coreServices')}
                          </h6>
                          <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                            {services.map((service) => (
                              <ListItem
                                key={service.title}
                                title={service.title}
                                to={service.href}
                                icon={service.icon}
                              >
                                {service.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>

                        <div className="pl-4">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                            {t('nav.headers.quickLinks')}
                          </h6>
                          <ul className="mt-2.5 grid gap-3 list-none">
                            <ListItem
                              title={t('nav.items.allServices.title')}
                              to="/services"
                              icon={Globe}
                            >
                              {t('nav.items.allServices.desc')}
                            </ListItem>
                            <ListItem
                              title={t('nav.items.getSupport.title')}
                              to="/contact-us"
                              icon={Phone}
                            >
                              {t('nav.items.getSupport.desc')}
                            </ListItem>
                            <li>
                              <a
                                href="https://forms.mosaicmc.org.au/refer"
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                  "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
                                  "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
                                  "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
                                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                                )}
                                aria-label="Make a Referral – external link"
                              >
                                <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
                                  <UserPlus className="h-5 w-5" />
                                  {t('nav.items.makeReferral.title')}
                                </div>
                                <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {t('nav.items.makeReferral.desc')}
                                </p>
                              </a>
                            </li>
                            {/* Removed duplicate Locations link from Services quick links */}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  )}

                  {/* Other Navigation Items (About, Stories) */}
                  {(() => {
                    const aboutActive = location.pathname.startsWith("/about") || location.pathname.startsWith("/company/news");
                    return (
                      <NavigationMenuItem className="flex items-center">
                        <NavigationMenuTrigger
                          className={cn(
                            aboutActive
                              ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
                              : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          )}
                          onMouseEnter={() => {
                            prefetchRoute("/about");
                            prefetchRoute("/company/news");
                          }}
                          onFocus={() => {
                            prefetchRoute("/about");
                            prefetchRoute("/company/news");
                          }}
                        >
                          {t('nav.about')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="p-4 bg-white dark:bg-slate-900/95 border border-white/30 dark:border-slate-700/50 shadow-2xl">
                          <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
                            <div className="col-span-2">
                              <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">
                                {t('nav.headers.aboutMosaic')}
                              </h6>
                              <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                                {aboutLinks.map((link) => (
                                  <ListItem key={link.title} title={link.title} to={link.href} icon={link.icon}>
                                    {link.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </div>
                            <div className="pl-4">
                              <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">{t('nav.headers.explore')}</h6>
                              <ul className="mt-2.5 grid gap-3 list-none">
                                <ListItem title={t('nav.items.ourStory.title')} to="/about#our-story-heading" icon={Home}>
                                  {t('nav.items.ourStory.desc')}
                                </ListItem>
                              </ul>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  })()}

                  {/* Get Involved Dropdown (standardized grid layout) */}
                  {!isEmergencyMode && (
                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuTrigger
                      className={cn(
                        isActivePath('/get-involved', true)
                          ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
                          : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      onMouseEnter={() => {
                        prefetchRoute('/get-involved');
                        prefetchRoute('/donate');
                      }}
                      onFocus={() => {
                        prefetchRoute('/get-involved');
                        prefetchRoute('/donate');
                      }}
                    >{t('nav.getInvolved')}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-white dark:bg-slate-900/95 border border-white/30 dark:border-slate-700/50 shadow-2xl">
                      <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-gray-200 dark:divide-slate-700">
                        <div className="col-span-2">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">{t('nav.headers.participate')}</h6>
                          <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                            {getInvolvedLinks.map((gi) => (
                              gi.href ? (
                                <ListItem key={gi.title} title={gi.title} to={gi.href} icon={gi.icon}>
                                  {gi.description}
                                </ListItem>
                              ) : (
                                <li key={gi.title}>
                                  <a
                                    href={gi.external}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                      "block select-none rounded-md p-3 leading-none no-underline outline-none transition-all",
                                      "hover:bg-sand/60 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-sky",
                                      "hover:shadow-sm border border-transparent hover:border-ocean/20 dark:hover:border-sky/20",
                                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                                    )}
                                  >
                                    <div className="font-semibold tracking-tight leading-none flex items-center gap-2 text-foreground">
                                      <gi.icon className="h-5 w-5" />
                                      {gi.title}
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {gi.description}
                                    </p>
                                  </a>
                                </li>
                              )
                            ))}
                          </ul>
                        </div>
                        <div className="pl-4">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-600 dark:text-gray-200">{t('nav.headers.explore')}</h6>
                          <ul className="mt-2.5 grid gap-3 list-none">
                            <ListItem title={t('nav.items.opportunities.title')} to="/get-involved" icon={Phone}>
                              {t('nav.items.opportunities.desc')}
                            </ListItem>
                            <ListItem title={t('nav.items.contactUs.title')} to="/contact-us" icon={Home}>
                              {t('nav.items.contactUs.desc')}
                            </ListItem>
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  )}

                  {/* Resources Dropdown */}
                  {!isEmergencyMode && (
                  <NavigationMenuItem className="flex items-center">
                    <NavigationMenuTrigger
                      className={cn(
                        isActivePath('/resources', true)
                          ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky hover:bg-ocean/90 dark:hover:bg-sky/90 transition-all shadow-lg hover:shadow-xl border border-ocean/20 dark:border-sky/20"
                          : "text-gray-800 dark:text-white hover:text-ocean dark:hover:text-sky hover:bg-sand/50 dark:hover:bg-slate-700/50",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      )}
                      onMouseEnter={() => {
                        prefetchRoute('/resources');
                        resourcesLinks.forEach(r => prefetchRoute(r.href));
                      }}
                      onFocus={() => {
                        prefetchRoute('/resources');
                        resourcesLinks.forEach(r => prefetchRoute(r.href));
                      }}
                    >{t('nav.resources')}</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-white dark:bg-slate-900/95 border border-white/30 dark:border-slate-700/50 shadow-2xl">
                      <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x divide-border">
                        <div className="col-span-2">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">{t('nav.headers.keyResources')}</h6>
                          <ul className="mt-2.5 grid grid-cols-2 gap-3 list-none">
                            {resourcesLinks.map((res) => (
                              <ListItem key={res.title} title={res.title} to={res.href} icon={res.icon}>
                                {res.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>
                        <div className="pl-4">
                          <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">{t('nav.headers.explore')}</h6>
                          <ul className="mt-2.5 grid gap-3 list-none">
                            <ListItem title={t('nav.items.allResources.title')} to="/resources" icon={Globe}>
                              {t('nav.items.allResources.desc')}
                            </ListItem>
                            <ListItem title={t('nav.items.contact.title')} to="/contact-us" icon={Phone}>
                              {t('nav.items.contact.desc')}
                            </ListItem>
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3 relative">
              <button
                type="button"
                aria-label="Open search"
                onClick={() => {
                  setIsSearchOpen((v) => {
                    const next = !v;
                    if (next && !searchQuery.trim()) {
                      const popular = clientRef.current ? clientRef.current.popularPrompts() : ['Home care support','Employment services','Settlement help (visa, migration)','Programs for children and young people'];
                      setSuggestions(popular);
                    }
                    return next;
                  });
                }}
                className="inline-flex items-center justify-center h-9 md:h-10 px-3 rounded-lg text-ocean dark:text-sky hover:bg-sand/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className={`${showOverlay ? 'fixed inset-0 max-w-2xl mx-auto mt-24' : 'absolute right-0 top-12'} z-50 w-80 sm:w-[36rem] rounded-xl border border-border bg-background p-3 shadow-2xl`}>
                  <div className="flex items-center gap-2">
                    <input
                      id="header-search-input"
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSearchQuery(v);
                        setShowAll(false);
                        if (!v.trim()) {
                          const popular = clientRef.current ? clientRef.current.popularPrompts() : ['Home care support','Employment services','Settlement help','Youth & family programs'];
                          setSuggestions(popular);
                          return;
                        }
                        const sugg = clientRef.current ? clientRef.current.suggestions(v) : buildSuggestions(v, runtimeIndex);
                        setSuggestions(sugg);
                      }}
                      placeholder={t('nav.search.placeholder')}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    />
                    <button
                      type="button"
                      aria-label="Close search"
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="p-2 rounded-md text-muted-foreground hover:bg-sand/50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            const isAll = s.toLowerCase() === 'all';
                            setShowAll(isAll);
                            setSearchQuery(s);
                            setSuggestions([]);
                          }}
                          className={cn(
                            "text-xs rounded-md px-2 py-1 border",
                            s.toLowerCase() === 'all'
                              ? "bg-ocean text-white border-ocean"
                              : "border-border hover:bg-sand/50 dark:hover:bg-slate-800/50"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery.trim() && suggestions.length === 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {t('nav.search.noSuggestions')}
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {buildFacetsFromClient(runtimeIndex).map((f) => {
                      const active = selectedFacets.includes(f);
                      return (
                        <button key={f} onClick={() => {
                          setSelectedFacets((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
                        }} className={cn("text-xs rounded-md px-2 py-1 border", active ? "bg-ocean text-white border-ocean" : "border-border hover:bg-sand/50 dark:hover:bg-slate-800/50")}> {f} </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="text-xs text-muted-foreground">{t('nav.search.sort')}</span>
                    <button
                      type="button"
                      className={cn("text-xs rounded-md px-2 py-1 border", sortMode === 'relevance' ? "bg-ocean text-white border-ocean" : "border-border hover:bg-sand/50 dark:hover:bg-slate-800/50")}
                      onClick={() => setSortMode('relevance')}
                    >
                      {t('nav.search.relevance')}
                    </button>
                    <button
                      type="button"
                      className={cn("text-xs rounded-md px-2 py-1 border", sortMode === 'alpha' ? "bg-ocean text-white border-ocean" : "border-border hover:bg-sand/50 dark:hover:bg-slate-800/50")}
                      onClick={() => setSortMode('alpha')}
                    >
                      {t('nav.search.az')}
                    </button>
                  </div>
                  <div className="mt-3 max-h-64 overflow-auto">
                    {searchQuery.trim() || showAll ? (
                      <ul className="divide-y divide-border">
                        {(() => {
                          const q = searchQuery.trim().toLowerCase();
                          const isAllSel = showAll || q === 'all';
                          const results = isAllSel
                            ? allResults(runtimeIndex, selectedFacets, sortMode)
                            : (clientRef.current ? clientRef.current.search(searchQuery, selectedFacets) : rankResults(searchQuery, runtimeIndex, selectedFacets));
                          const ordered = sortMode === 'alpha'
                            ? [...results].sort((a, b) => a.title.localeCompare(b.title))
                            : results;
                          return ordered.slice(0, 12).map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className="block rounded-md px-2 py-2 text-sm text-foreground hover:bg-sand/50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          {...prefetchOnHover(item.path)}
                              onClick={() => { logSearchQuery(searchQuery, i18n.language); setIsSearchOpen(false); setSearchQuery(""); setShowOverlay(false); setShowAll(false); }}
                            >
                              {item.title}
                            </Link>
                          </li>
                          ));
                        })()}
                        {!showAll && (clientRef.current ? clientRef.current.search(searchQuery, selectedFacets) : rankResults(searchQuery, runtimeIndex, selectedFacets)).length === 0 && (
                          <li className="px-2 py-1.5 text-sm text-muted-foreground">
                            {t('nav.search.noResults')}
                            <div className="mt-2 flex flex-wrap gap-1">
                              {['Home care','Employment support','Settlement help'].map((s) => (
                                <button key={s} onClick={() => { setSearchQuery(s); setSuggestions([]); }} className="text-xs rounded-md px-2 py-1 border border-border hover:bg-sand/50 dark:hover:bg-slate-800/50">
                                  {s}
                                </button>
                              ))}
                            </div>
                            <div className="mt-2">
                              <Link to="/contact-us" className="underline text-foreground" {...prefetchOnHover('/contact-us')} onClick={() => { setIsSearchOpen(false); setShowOverlay(false); }}>
                                {t('nav.search.contactHelp')}
                              </Link>
                            </div>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">{t('nav.search.typeToSearch')}</div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{t('nav.search.close')}</div>
                    {isOwner && (
                      <button
                        type="button"
                        className="text-xs rounded-md px-2 py-1 border border-border hover:bg-sand/50 dark:hover:bg-slate-800/50"
                        onClick={() => { setTopQueries(getMonthlyTop(undefined, 20)); }}
                      >{t('nav.search.viewTop')}</button>
                    )}
                  </div>
                  {isOwner && topQueries.length > 0 && (
                    <div className="mt-2 border-t border-border pt-2">
                      <div className="text-xs font-semibold mb-1">{t('nav.search.topSearches')}</div>
                      <ul className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                        {topQueries.map((x) => (
                          <li key={x.query} className="flex justify-between"><span>{x.query}</span><span>{x.count}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
            {/* Theme Toggle */}
            {!isEmergencyMode && (
              <div className="inline-flex items-center h-9 md:h-10">
                <ThemeToggle />
              </div>
            )}

              {/* Language Switcher */}
              <LanguageSwitcher menuId="language-menu-desktop" />
              
              {/* Action Buttons Group */}
              {!isEmergencyMode && (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="cta"
                    size="default" 
                    asChild
                    className="bg-sun bg-gradient-to-r from-sun to-earth hover:from-sun/90 hover:to-earth/90 text-ocean font-semibold h-9 md:h-10 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <Link to="/donate" {...prefetchOnHover('/donate')}>{t('nav.donate')}</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu + Quick Actions */}
            <div className="md:hidden flex items-center gap-2">
              {/* Compact Language Switcher visible in header on mobile */}
              <LanguageSwitcher showText={false} menuId="language-menu-mobile-icon" />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col space-y-4 mt-6">
                    <Link 
                      to="/" 
                      className={cn("text-lg font-medium transition-colors no-underline hover:no-underline",
                    isActivePath('/')
                          ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    )}
                      {...prefetchOnHover('/')}
                      onClick={() => setIsOpen(false)}
                    >
                      {t('nav.home')}
                    </Link>
                    
                    {!isEmergencyMode && (
                      <>
                        <Link 
                          to="/services" 
                          className={cn("text-lg font-medium transition-colors no-underline hover:no-underline",
                        isActivePath('/services', true)
                              ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                              : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        )}
                          {...prefetchOnHover('/services')}
                          onClick={() => setIsOpen(false)}
                        >
                          {t('nav.services')}
                        </Link>
                        <div className="pl-4 space-y-3">
                          {services.map((service) => {
                            const Icon = service.icon;
                            return (
                              <Link
                                key={service.title}
                                to={service.href}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                {...prefetchOnHover(service.href)}
                                onClick={() => setIsOpen(false)}
                              >
                                <Icon className="h-4 w-4" />
                                {service.title}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                    
                    {!isEmergencyMode && (
                      <>
                        {mainNavigation.slice(1, 3).map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            className={cn("text-lg font-medium transition-colors no-underline hover:no-underline",
                              isActivePath(item.href)
                                ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                                : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                            )}
                            {...prefetchOnHover(item.href)}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </>
                    )}

                    {!isEmergencyMode && (
                      <>
                        {/* Resources sub-links */}
                        <Link 
                          to="/resources" 
                          className={cn("text-lg font-medium transition-colors no-underline hover:no-underline",
                            isActivePath('/resources')
                              ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                              : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          )}
                          {...prefetchOnHover('/resources')}
                          onClick={() => setIsOpen(false)}
                        >
                          Resources
                        </Link>
                        <div className="pl-4 space-y-3">
                          {resourcesLinks.map((res) => {
                            const Icon = res.icon;
                            return (
                              <Link
                                key={res.title}
                                to={res.href}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                {...prefetchOnHover(res.href)}
                                onClick={() => setIsOpen(false)}
                              >
                                <Icon className="h-4 w-4" />
                                {res.title}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {!isEmergencyMode && (
                      <>
                        {/* Get Involved sub-links */}
                        <Link 
                          to="/get-involved" 
                          className={cn("text-lg font-medium transition-colors no-underline hover:no-underline",
                            isActivePath('/get-involved', true)
                              ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                              : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        )}
                          {...prefetchOnHover('/get-involved')}
                          onClick={() => setIsOpen(false)}
                        >
                          {t('nav.getInvolved')}
                        </Link>
                        <div className="pl-4 space-y-3">
                          {getInvolvedLinks.map((gi) => {
                            const Icon = gi.icon;
                            if (gi.href) {
                              return (
                                <Link
                                  key={gi.title}
                                  to={gi.href}
                                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                  {...prefetchOnHover(gi.href)}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Icon className="h-4 w-4" />
                                  {gi.title}
                                </Link>
                              );
                            }
                            return (
                              <a
                                key={gi.title}
                                href={gi.external}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Icon className="h-4 w-4" />
                                {gi.title}
                              </a>
                            );
                          })}
                        </div>
                      </>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200/30 dark:border-slate-700/30 space-y-3">
                      {/* Full Language Switcher inside mobile menu */}
                      <LanguageSwitcher menuId="language-menu-mobile-sheet" />
                      {!isEmergencyMode && (
                        <>
                          <Button variant="outline" size="sm" asChild className="w-full border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-sand/50 dark:hover:bg-slate-800/50">
                            <a href="tel:1800813205">📞 Call 1800 813 205</a>
                          </Button>
                          <Button 
                            size="default" 
                            asChild 
                            className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold h-9 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          >
                            <Link to="/donate" {...prefetchOnHover('/donate')} onClick={() => setIsOpen(false)}>
                              Donate to Support Our Community
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
