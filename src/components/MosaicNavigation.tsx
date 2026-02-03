"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { prefetchOnHover, prefetchRoute } from "@/lib/prefetch";
import { Menu, X, Home, Heart, Users, Globe, LucideIcon, AlertTriangle, Book, ShieldCheck, Search, ExternalLink, UserPlus } from "lucide-react";
import { logSearchQuery } from '@/lib/searchAnalytics';
import { auSpelling } from '@/lib/auSpelling';
import { LocalSearchClient, initSearchConfigs } from '@/lib/searchClient';
import { ThemeToggle } from './ui/theme-toggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import CustomNavigation from './CustomNavigation';

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

import { assetPath } from '@/lib/utils';

const Logo = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <Link to="/" className="flex-shrink-0 group relative flex items-center h-12 md:h-[60px]">
      <img
        className="block transition-all duration-500 group-hover:scale-105 hover:drop-shadow-lg h-full w-auto max-w-none"
        src={theme === 'dark' ? assetPath('/images/Logos/Mosaic_Logo_white_Dark.svg') : assetPath('/images/Logos/320w/Mosaic_Logo_Blue_Light_320px.svg')}
        alt={t('nav.logoAlt')}
        loading="lazy"
        decoding="async"
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
  const [showOverlay, setShowOverlay] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  // Facets and sort mode are currently static/unused in UI, defined here to satisfy render logic
  const selectedFacets: string[] = [];
  const sortMode: 'relevance' | 'alpha' = 'relevance';

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
      const alphaLight = 0.95 + 0.05 * p;
      const alphaDark = 0.96 + 0.04 * p;
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

  React.useEffect(() => {
    prefetchRoute('/donate');

    const ensureLink = (rel: string, href: string) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (rel === 'preconnect') link.crossOrigin = '';
      document.head.appendChild(link);
    };

    ensureLink('dns-prefetch', 'https://mosaicmc.raisely.com');
    ensureLink('preconnect', 'https://mosaicmc.raisely.com');
  }, []);

  // Check if current path matches navigation item
  const isActivePath = (href: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      return location.pathname.startsWith(href);
    }
    return location.pathname === href;
  };

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

  const getInvolvedLinks: {
    title: string;
    href?: string;
    external?: string;
    description: string;
    icon: LucideIcon;
  }[] = [
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

  const mainNavigation = [
    { title: t('nav.home'), href: '/' },
    { title: t('nav.services'), href: '/services' },
    { title: t('nav.about'), href: '/about' },
    { title: t('nav.resources'), href: '/resources' },
    { title: t('nav.getInvolved'), href: '/get-involved' },
    { title: t('nav.contact'), href: '/contact-us' },
  ];

  const handleCloseCrisisBanner = () => {
    setShowCrisisBanner(false);
  };

  React.useEffect(() => {
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
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i18n.language]);

  React.useEffect(() => {
    let isActive = true;
    const ensureSearchClient = async () => {
      if (clientRef.current) return;
      await loadSearchIndex();
      await initSearchConfigs();
      if (!isActive) return;
      clientRef.current = new LocalSearchClient(runtimeIndex, i18n.language);
    };

    if (isSearchOpen) {
      ensureSearchClient();
    }

    return () => {
      isActive = false;
    };
  }, [i18n.language, isSearchOpen, searchQuery]);

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

  function buildSnippet(text: string, query: string, maxLen = 140) {
    const clean = (text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1);
    if (!tokens.length) return clean.slice(0, maxLen);
    const lower = clean.toLowerCase();
    let idx = -1;
    for (const token of tokens) {
      const pos = lower.indexOf(token);
      if (pos !== -1) {
        idx = idx === -1 ? pos : Math.min(idx, pos);
      }
    }
    if (idx === -1) return clean.slice(0, maxLen);
    const start = Math.max(0, idx - 32);
    const end = Math.min(clean.length, start + maxLen);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < clean.length ? '…' : '';
    return `${prefix}${clean.slice(start, end)}${suffix}`;
  }

  function highlightText(text: string, query: string) {
    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1);
    if (!tokens.length) return text;
    const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
    const testRegex = new RegExp(`^(${escaped.join('|')})$`, 'i');
    return text.split(regex).map((part, index) =>
      testRegex.test(part) ? (
        <mark
          key={`${part}-${index}`}
          className="bg-amber-200/80 text-slate-900 dark:bg-amber-500/25 dark:text-white rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      )
    );
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
    <header>
      {/* Crisis Support Banner */}
      {showCrisisBanner && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium relative z-[120]">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 sm:space-x-4">
            <span className="text-sm">{t('nav.menu.crisis.banner')}</span>
            <Link 
              to="/resources"
              className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-md transition-colors text-sm font-medium"
            >
              <ShieldCheck className="w-3 h-3 me-1" />
              {t('nav.menu.crisis.button')}
            </Link>
            <button
              onClick={handleCloseCrisisBanner}
              className="ms-2 p-1 hover:bg-red-700 rounded transition-colors"
              aria-label={t('nav.menu.crisis.close')}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <nav ref={glassRef} className="nav-glass sticky top-0 z-50 w-full" aria-label="Main navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 h-full">
              <CustomNavigation
                isEmergencyMode={isEmergencyMode}
                services={services}
                aboutLinks={aboutLinks}
                getInvolvedLinks={getInvolvedLinks}
                resourcesLinks={resourcesLinks}
                isActivePath={isActivePath}
                labels={{
                  home: t('nav.home'),
                  services: t('nav.services'),
                  about: 'About',
                  getInvolved: t('nav.getInvolved'),
                  resources: 'Resources',
                }}
                onPrefetch={{
                  services: () => {
                    prefetchRoute('/services');
                    services.forEach((s) => prefetchRoute(s.href));
                  },
                  about: () => {
                    prefetchRoute('/about');
                    prefetchRoute('/company/news');
                  },
                  getInvolved: () => {
                    prefetchRoute('/get-involved');
                    prefetchRoute('/donate');
                  },
                  resources: () => {
                    prefetchRoute('/resources');
                    resourcesLinks.forEach((r) => prefetchRoute(r.href));
                  },
                }}
              />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 relative h-full shrink-0 flex-nowrap" dir="ltr">
              <button
                type="button"
                aria-label={t('nav.menu.openSearch')}
                onClick={() => {
                  setIsSearchOpen((v) => {
                    const next = !v;
                    return next;
                  });
                }}
                className="inline-flex items-center justify-center h-11 md:h-11 min-w-[44px] px-3 rounded-lg text-ocean dark:text-sky hover:bg-sand/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background shrink-0"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className={`${showOverlay ? 'fixed inset-0 max-w-2xl mx-auto mt-24' : 'absolute right-0 top-12'} z-50 w-80 sm:w-[36rem] rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-950 p-3 shadow-2xl text-slate-900 dark:text-slate-100`}>
                  <div className="flex items-center gap-2">
                    <input
                      id="header-search-input"
                      autoFocus
                      type="text"
                      aria-label="Search site"
                      value={searchQuery}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSearchQuery(v);
                        setShowAll(false);
                      }}
                      placeholder="Search the site"
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    />
                    <button
                      type="button"
                      aria-label={t('nav.menu.closeSearch')}
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="h-11 w-11 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 max-h-64 overflow-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
                    {searchQuery.trim() || showAll ? (
                      <ul className="flex flex-col gap-1">
                        {(() => {
                          const q = searchQuery.trim().toLowerCase();
                          const isAllSel = showAll || q === 'all';
                          const results = isAllSel
                            ? allResults(runtimeIndex, selectedFacets, sortMode)
                            : (clientRef.current ? clientRef.current.search(searchQuery, selectedFacets) : rankResults(searchQuery, runtimeIndex, selectedFacets));
                          const ordered = results;
                          return ordered.slice(0, 12).map((item, index) => {
                            const snippet = buildSnippet(item.body, searchQuery);
                            return (
                          <li key={`${item.path}-${item.title}-${index}`}>
                            <Link
                              to={item.path}
                              className="block rounded-md border border-transparent bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm transition-colors hover:border-slate-200 hover:bg-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                          {...prefetchOnHover(item.path)}
                              onClick={() => { logSearchQuery(searchQuery, i18n.language); setIsSearchOpen(false); setSearchQuery(""); setShowOverlay(false); setShowAll(false); }}
                            >
                              <div className="leading-snug font-semibold">
                                {highlightText(item.title, searchQuery)}
                              </div>
                              {snippet && (
                                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                                  {highlightText(snippet, searchQuery)}
                                </div>
                              )}
                            </Link>
                          </li>
                            );
                          });
                        })()}
                        {!showAll && (clientRef.current ? clientRef.current.search(searchQuery, selectedFacets) : rankResults(searchQuery, runtimeIndex, selectedFacets)).length === 0 && (
                          <li className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                            {t('nav.search.noResults')}
                          </li>
                        )}
                      </ul>
                    ) : (
                      <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">{t('nav.search.typeToSearch')}</div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-end">
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t('nav.search.close')}</div>
                  </div>
                </div>
              )}
              
            {/* Theme Toggle */}
              {!isEmergencyMode && (
                <div className="inline-flex items-center h-11 md:h-11 shrink-0">
                  <ThemeToggle />
                </div>
              )}

              {/* Language Switcher */}
              <LanguageSwitcher menuId="language-menu-desktop" className="shrink-0" />
              
              {/* Action Buttons Group */}
              {!isEmergencyMode && (
                <div className="flex items-center gap-2 shrink-0">
                  <Button 
                    variant="cta"
                    size="cta-sm" 
                    asChild
                    className="bg-sun bg-gradient-to-r from-sun to-earth hover:from-sun/90 hover:to-earth/90 text-ocean font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <Link to="/donate" {...prefetchOnHover('/donate')}><span>{t('nav.donate')}</span></Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu + Quick Actions */}
            <div className="xl:hidden flex items-center gap-2">
              {/* Compact Language Switcher visible in header on mobile */}
              <LanguageSwitcher showText={false} menuId="language-menu-mobile-icon" />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 min-h-[44px] min-w-[44px]">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
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
                      <span>{t('nav.home')}</span>
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
                          <span>{t('nav.services')}</span>
                        </Link>
                        <div className="ps-4 space-y-3">
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
                                <span>{service.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                    
                    {!isEmergencyMode && (
                      <>
                        <Link 
                          to="/about" 
                          className={cn("text-lg font-medium transition-colors no-underline hover:no-underline",
                            isActivePath('/about')
                              ? "text-white hover:text-white dark:text-ocean bg-ocean dark:bg-sky px-4 py-2 rounded-lg shadow-lg"
                              : "text-gray-800 dark:text-gray-200 hover:text-ocean dark:hover:text-sky",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          )}
                          {...prefetchOnHover('/about')}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{t('nav.about')}</span>
                        </Link>
                        <div className="ps-4 space-y-3">
                          {aboutLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.title}
                                to={link.href}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                {...prefetchOnHover(link.href)}
                                onClick={() => setIsOpen(false)}
                              >
                                <Icon className="h-4 w-4" />
                                <span>{link.title}</span>
                              </Link>
                            );
                          })}
                          <Link
                            to="/about#our-story"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <Home className="h-4 w-4" />
                            <span>Our Story</span>
                          </Link>
                        </div>
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
                          <span>{t('nav.resources')}</span>
                        </Link>
                        <div className="ps-4 space-y-3">
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
                                <span>{res.title}</span>
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
                          <span>{t('nav.getInvolved')}</span>
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
                                  <span>{gi.title}</span>
                                </Link>
                              );
                            }
                            return (
                              <a
                                key={gi.title}
                                href={gi.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${gi.title} (opens in new tab)`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Icon className="h-4 w-4" />
                                <span>{gi.title}</span>
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
                            );
                          })}
                        </div>
                      </>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200/30 dark:border-slate-700/30 space-y-3">
                      {/* Full Language Switcher inside mobile menu */}
                      <LanguageSwitcher showText={false} menuId="language-menu-mobile-sheet" />
                      {!isEmergencyMode && (
                        <>
                          <Button variant="outline" size="sm" asChild className="w-full border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-sand/50 dark:hover:bg-slate-800/50">
                        <a href="tel:1800813205">📞 {t('nav.menu.callAction')}</a>
                      </Button>
                      <Button 
                        size="default" 
                        asChild 
                        className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold h-9 text-sm px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      >
                        <Link to="/donate" {...prefetchOnHover('/donate')} onClick={() => setIsOpen(false)}>
                          <span>{t('nav.menu.donateExtended')}</span>
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
    </header>
  );
}
