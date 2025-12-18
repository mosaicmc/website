import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { prefetchOnHover } from '@/lib/prefetch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type NewsItem = {
  title: string;
  date: string;
  summary: string;
  href?: string;
  type: 'Press Release' | 'News';
};

const demoNews: NewsItem[] = [
  {
    title: 'Mosaic Announces Community Engagement Initiative for 2025',
    date: '2025-01-15',
    summary:
      'A new initiative will support multicultural events and participation across NSW, focusing on inclusion and local leadership.',
    type: 'Press Release',
  },
  {
    title: 'Settlement Support Milestone: 5,000 Families Assisted',
    date: '2024-12-08',
    summary:
      'Our teams have supported 5,000 families with culturally appropriate services, with sustained outcomes across locations.',
    type: 'News',
  },
  {
    title: 'New Partnerships Strengthen Aged Care and Family Support',
    date: '2024-11-20',
    summary:
      'Partnerships with local organisations improve access to in‑home care and family programs for CALD communities.',
    type: 'Press Release',
  },
];

const externalLinks = [
  'https://www.abc.net.au/news/2016-04-04/government-yet-to-finalise-refugee-numbers-for-the-hunter-region/7295702',
  'https://www.abc.net.au/news/2016-03-01/congolese-refugee-calls-for-reform/7208142',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/new-lives-emerge-from-multicultural-program',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/class-in-for-multicultural-business-program',
  'https://greekreporter.com/2019/02/23/greek-orthodox-priest-receives-seniors-local-achievement-award/',
  'https://www.sbs.com.au/news/article/how-a-regional-australian-city-became-an-unlikely-home-for-hundreds-of-yazidi-refugees/z755d1rzl',
  'https://www.abc.net.au/news/2021-12-11/armidale-land-used-by-ezidi-refugees-to-work-grow-food/100680696',
  'https://hunterheadline.com.au/article/northern-settlement-services-rebrands-to-align-with-evolving-mission/',
  'https://newcastleweekly.com.au/newcastle-afghan-refugees-cleaning-up-after-tafe-course/',
  'https://www.theguardian.com/australia-news/2023/may/07/im-armidaleian-ezidi-refugees-put-down-new-roots-in-new-england',
  'https://www.netimes.com.au/2024/06/22/a-time-to-celebrate-and-raise-awareness-about-the-struggles-faced-by-refugees/',
  'https://www.abc.net.au/news/2024-08-02/housing-crisis-afghan-refugee-accommodation-struggle/104127114',
  'https://newcastleweekly.com.au/teens-bring-sense-of-home-to-wallsend-mural/',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/neighbourly-newy-celebrates-the-best-ingredients-of-multiculturalism',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/funding-boost-to-support-newcastle-communities-in-need',
  'https://dcj.nsw.gov.au/children-and-families/shining-a-light/culture-and-connection.html',
  'https://www.newsofthearea.com.au/celebrating-cultural-differences-on-international-womens-day',
];

const customThumbFor: Record<string, string> = {
  'https://www.abc.net.au/news/2016-04-04/government-yet-to-finalise-refugee-numbers-for-the-hunter-region/7295702': '/News_Thumbnails_720px_WEBP/4 Apr 2016.webp',
  'https://www.abc.net.au/news/2016-03-01/congolese-refugee-calls-for-reform/7208142': '/News_Thumbnails_720px_WEBP/1 Mar 2016.webp',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/new-lives-emerge-from-multicultural-program': '/News_Thumbnails_720px_WEBP/18 May 2017.webp',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/neighbourly-newy-celebrates-the-best-ingredients-of-multiculturalism': '/News_Thumbnails_720px_WEBP/03 May 2025.webp',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/class-in-for-multicultural-business-program': '/News_Thumbnails_720px_WEBP/15 Feb 2017.webp',
  'https://greekreporter.com/2019/02/23/greek-orthodox-priest-receives-seniors-local-achievement-award/': '/News_Thumbnails_720px_WEBP/February 23, 2019.webp',
  'https://www.sbs.com.au/news/article/how-a-regional-australian-city-became-an-unlikely-home-for-hundreds-of-yazidi-refugees/z755d1rzl': '/News_Thumbnails_720px_WEBP/27 December 2020.webp',
  'https://www.abc.net.au/news/2021-12-11/armidale-land-used-by-ezidi-refugees-to-work-grow-food/100680696': '/News_Thumbnails_720px_WEBP/11 Dec 2021.webp',
  'https://hunterheadline.com.au/article/northern-settlement-services-rebrands-to-align-with-evolving-mission/': '/News_Thumbnails_720px_WEBP/1 October 2022.webp',
  'https://newcastleweekly.com.au/newcastle-afghan-refugees-cleaning-up-after-tafe-course/': '/News_Thumbnails_720px_WEBP/26 June, 2023.webp',
  'https://www.theguardian.com/australia-news/2023/may/07/im-armidaleian-ezidi-refugees-put-down-new-roots-in-new-england': '/News_Thumbnails_720px_WEBP/7 May 2023.webp',
  'https://www.netimes.com.au/2024/06/22/a-time-to-celebrate-and-raise-awareness-about-the-struggles-faced-by-refugees/': '/News_Thumbnails_720px_WEBP/June 22, 2024.webp',
  'https://www.abc.net.au/news/2024-08-02/housing-crisis-afghan-refugee-accommodation-struggle/104127114': '/News_Thumbnails_720px_WEBP/2 Aug 2024.webp',
  'https://newcastleweekly.com.au/teens-bring-sense-of-home-to-wallsend-mural/': '/News_Thumbnails_720px_WEBP/May 8, 2024.webp',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/funding-boost-to-support-newcastle-communities-in-need': '/News_Thumbnails_720px_WEBP/10 Nov 2025.webp',
  'https://dcj.nsw.gov.au/children-and-families/shining-a-light/culture-and-connection.html': '/News_Thumbnails_720px_WEBP/30 March 2023.webp',
  'https://www.newsofthearea.com.au/celebrating-cultural-differences-on-international-womens-day': '/News_Thumbnails_720px_WEBP/International Women’s Day 2025.webp',
};

const customTitleFor: Record<string, string> = {
  'https://www.abc.net.au/news/2016-04-04/government-yet-to-finalise-refugee-numbers-for-the-hunter-region/7295702': 'Government yet to finalise refugee numbers for the Hunter region - ABC News',
  'https://www.abc.net.au/news/2016-03-01/congolese-refugee-calls-for-reform/7208142': 'Congolese refugee calls for overhaul of re-settlement services in Australia - ABC News',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/new-lives-emerge-from-multicultural-program': 'New lives emerge from multicultural program - City of Newcastle',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/class-in-for-multicultural-business-program': 'Class in for multicultural business program - City of Newcastle',
  'https://greekreporter.com/2019/02/23/greek-orthodox-priest-receives-seniors-local-achievement-award/': 'Greek Orthodox Priest Receives Seniors Local Achievement Award - GreekReporter.com',
  'https://www.sbs.com.au/news/article/how-a-regional-australian-city-became-an-unlikely-home-for-hundreds-of-yazidi-refugees/z755d1rzl': 'How a regional Australian city became an unlikely home for hundreds of Yazidi refugees | SBS News',
  'https://www.abc.net.au/news/2021-12-11/armidale-land-used-by-ezidi-refugees-to-work-grow-food/100680696': 'Armidale landholders donating land so Ezidi refugees can work and grow food - ABC News',
  'https://hunterheadline.com.au/article/northern-settlement-services-rebrands-to-align-with-evolving-mission/': 'Northern Settlement Services rebrands to align with evolving mission | Hunter Headline',
  'https://newcastleweekly.com.au/newcastle-afghan-refugees-cleaning-up-after-tafe-course/': 'Newcastle Afghan refugees cleaning up after TAFE course',
  'https://www.theguardian.com/australia-news/2023/may/07/im-armidaleian-ezidi-refugees-put-down-new-roots-in-new-england': '‘I’m Armidaleian’: Ezidi refugees put down new roots in New England | The Guardian',
  'https://www.netimes.com.au/2024/06/22/a-time-to-celebrate-and-raise-awareness-about-the-struggles-faced-by-refugees/': 'A time to celebrate and raise awareness about the struggles faced by Refugees',
  'https://www.abc.net.au/news/2024-08-02/housing-crisis-afghan-refugee-accommodation-struggle/104127114': "Australia's housing crisis impacts regional refugee communities - ABC News",
  'https://newcastleweekly.com.au/teens-bring-sense-of-home-to-wallsend-mural/': 'Teens bring sense of home to WALLSend mural | Newcastle Weekly',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/neighbourly-newy-celebrates-the-best-ingredients-of-multiculturalism': 'Neighbourly Newy celebrates the best ingredients of multiculturalism - City of Newcastle',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/funding-boost-to-support-newcastle-communities-in-need': 'Funding boost to support Newcastle communities in need',
  'https://dcj.nsw.gov.au/children-and-families/shining-a-light/culture-and-connection.html': 'Culture and connection | Communities and Justice',
  'https://www.newsofthearea.com.au/celebrating-cultural-differences-on-international-womens-day': 'Celebrating cultural differences on International Women’s Day - News Of The Area',
};
const contentTagFor: Record<string, string> = {
  'https://newcastleweekly.com.au/teens-bring-sense-of-home-to-wallsend-mural/': 'Community',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/class-in-for-multicultural-business-program': 'Community',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/funding-boost-to-support-newcastle-communities-in-need': 'Community',
  'https://www.newsofthearea.com.au/celebrating-cultural-differences-on-international-womens-day': 'Community',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/neighbourly-newy-celebrates-the-best-ingredients-of-multiculturalism': 'Community',
  'https://dcj.nsw.gov.au/children-and-families/shining-a-light/culture-and-connection.html': 'Family',
  'https://newcastle.nsw.gov.au/about-us/news-and-updates/latest-news/new-lives-emerge-from-multicultural-program': 'Community',
  'https://newcastleweekly.com.au/newcastle-afghan-refugees-cleaning-up-after-tafe-course/': 'Youth',
  'https://www.theguardian.com/australia-news/2023/may/07/im-armidaleian-ezidi-refugees-put-down-new-roots-in-new-england': 'Community',
  'https://www.sbs.com.au/news/article/how-a-regional-australian-city-became-an-unlikely-home-for-hundreds-of-yazidi-refugees/z755d1rzl': 'Settlement',
  'https://www.abc.net.au/news/2021-12-11/armidale-land-used-by-ezidi-refugees-to-work-grow-food/100680696': 'Community',
  'https://www.abc.net.au/news/2016-04-04/government-yet-to-finalise-refugee-numbers-for-the-hunter-region/7295702': 'Advocacy',
  'https://www.abc.net.au/news/2016-03-01/congolese-refugee-calls-for-reform/7208142': 'Advocacy',
  'https://www.netimes.com.au/2024/06/22/a-time-to-celebrate-and-raise-awareness-about-the-struggles-faced-by-refugees/': 'Advocacy',
  'https://hunterheadline.com.au/article/northern-settlement-services-rebrands-to-align-with-evolving-mission/': 'Company Update',
  'https://greekreporter.com/2019/02/23/greek-orthodox-priest-receives-seniors-local-achievement-award/': 'Community',
};
function parseDateFromThumbName(name: string): number {
  const cleaned = name.replace(/\.webp$/i, '').replace(/_/g, ' ').trim();
  const parsed = Date.parse(cleaned);
  if (!Number.isNaN(parsed)) return parsed;
  const yrMatch = cleaned.match(/\b(19|20)\d{2}\b/);
  if (yrMatch) return new Date(`${yrMatch[0]}-01-01`).getTime();
  return new Date('1970-01-01').getTime();
}
function thumbDateTs(url: string, fallbackYear?: string, fallbackDate?: string): number {
  const thumb = customThumbFor[url];
  if (thumb) {
    const base = decodeURI(thumb).split('/').pop() || '';
    return parseDateFromThumbName(base);
  }
  if (fallbackDate) {
    const d = Date.parse(fallbackDate);
    if (!Number.isNaN(d)) return d;
  }
  if (fallbackYear) return new Date(`${fallbackYear}-01-01`).getTime();
  return new Date('1970-01-01').getTime();
}
function formatThumbDate(url: string, fallbackYear?: string, fallbackDate?: string): string | null {
  const ts = thumbDateTs(url, fallbackYear, fallbackDate);
  if (!ts || ts === new Date('1970-01-01').getTime()) return null;
  try {
    return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return null;
  }
}
function deriveContentTag(url: string, title?: string): string | null {
  const text = `${(customTitleFor[url] || title || '').toLowerCase()} ${url.toLowerCase()}`;
  if (/(settlement|resettle|refugee|migrant|ezidi|afghan)/.test(text)) return 'Settlement';
  if (/(youth|teen|young|students)/.test(text)) return 'Youth';
  if (/(aged care|senior|elder|home care)/.test(text)) return 'Aged Care';
  if (/(advocacy|policy|awareness|crisis|housing)/.test(text)) return 'Advocacy';
  return null;
}
function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}
function yearFromUrl(url: string): string | null {
  const m = url.match(/\b(20\d{2})\b/);
  return m ? m[1] : null;
}
function stripOutletSuffix(text: string): string {
  const m = text.match(/^(.*?)(?:\s[-|]\s.+)$/);
  return m ? m[1].trim() : text.trim();
}
function outletName(url: string, title?: string): string {
  const t = (customTitleFor[url] || title || '').trim();
  const mm = t.match(/[-|]\s(.+)$/);
  if (mm && mm[1]) return mm[1].trim();
  const h = hostOf(url);
  if (h === 'abc.net.au') return 'ABC News';
  if (h === 'sbs.com.au') return 'SBS News';
  if (h === 'theguardian.com') return 'The Guardian';
  if (h === 'greekreporter.com') return 'GreekReporter.com';
  if (h === 'hunterheadline.com.au') return 'Hunter Headline';
  if (h === 'newcastle.nsw.gov.au') return 'City of Newcastle';
  return h;
}
function titleFor(url: string, title?: string): string {
  const base = (customTitleFor[url] || title || url).trim();
  return stripOutletSuffix(base);
}
function ariaLabelFor(url: string, title?: string): string {
  return `Read article on ${outletName(url, title)}: ${titleFor(url, title)}`;
}

export default function NewsPage() {
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [linkYears, setLinkYears] = useState<Record<string, string>>({});
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [linkDates, setLinkDates] = useState<Record<string, string>>({});
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const allTags = Array.from(new Set([
    ...Object.values(contentTagFor),
    ...externalLinks.map((u) => deriveContentTag(u, titles[u])).filter((x): x is string => !!x),
  ])).sort();
  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      const updates: Record<string, string> = {};
      const yearUpdates: Record<string, string> = {};
      const imageUpdates: Record<string, string> = {};
      const dateUpdates: Record<string, string> = {};
      await Promise.allSettled(
        externalLinks.map(async (u) => {
          const cacheKey = `externalTitle:${u}`;
          const cached = sessionStorage.getItem(cacheKey);
          const yearKey = `externalYear:${u}`;
          const cachedYear = sessionStorage.getItem(yearKey);
          const imgKey = `externalImage:${u}`;
          const cachedImg = sessionStorage.getItem(imgKey);
          const dateKey = `externalDate:${u}`;
          const cachedDate = sessionStorage.getItem(dateKey);
          if (cached) updates[u] = cached;
          if (cachedYear) yearUpdates[u] = cachedYear;
          if (cachedImg) imageUpdates[u] = cachedImg;
          if (cachedDate) dateUpdates[u] = cachedDate;
          if (cached && cachedYear && cachedImg && cachedDate) return;
          let proxy = '';
          try {
            const url = new URL(u);
            proxy = `https://r.jina.ai/http://${url.hostname}${url.pathname}${url.search || ''}`;
          } catch {
            proxy = `https://r.jina.ai/http://${u}`;
          }
          const res = await fetch(proxy, { signal: controller.signal });
          if (!res.ok) return;
          const html = await res.text();
          const og = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i);
          const tt = html.match(/<title[^>]*>([^<]+)<\/title>/i);
          const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
          const val = (og && og[1]) || (tt && tt[1]) || (h1 && h1[1]) || '';
          if (val) {
            updates[u] = val.trim();
            sessionStorage.setItem(cacheKey, val.trim());
          }
          const ogImg = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
          const twImg = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
          const imgVal = (ogImg && ogImg[1]) || (twImg && twImg[1]) || '';
          if (imgVal) {
            imageUpdates[u] = imgVal.trim();
            sessionStorage.setItem(imgKey, imgVal.trim());
          }
          const metaPublished = html.match(/<meta[^>]*property=["']article:published_time["'][^>]*content=["']([^"']+)["'][^>]*>/i);
          const jsonLdPublished = html.match(/datePublished["']\s*:\s*["']([^"']+)["']/i);
          const dateText = (metaPublished && metaPublished[1]) || (jsonLdPublished && jsonLdPublished[1]) || '';
          const fromUrl = yearFromUrl(u);
          let yr = '';
          if (dateText) {
            const ym = dateText.match(/\b(20\d{2})\b/);
            yr = ym ? ym[1] : '';
          }
          if (!yr && fromUrl) yr = fromUrl;
          if (dateText) {
            dateUpdates[u] = dateText;
            sessionStorage.setItem(dateKey, dateText);
          } else if (yr) {
            const fallback = `${yr}-01-01`;
            dateUpdates[u] = fallback;
            sessionStorage.setItem(dateKey, fallback);
          }
          if (yr) {
            yearUpdates[u] = yr;
            sessionStorage.setItem(yearKey, yr);
          }
        })
      );
      if (Object.keys(updates).length) {
        setTitles((prev) => ({ ...prev, ...updates }));
      }
      if (Object.keys(yearUpdates).length) {
        setLinkYears((prev) => ({ ...prev, ...yearUpdates }));
      }
      if (Object.keys(imageUpdates).length) {
        setThumbs((prev) => ({ ...prev, ...imageUpdates }));
      }
      if (Object.keys(dateUpdates).length) {
        setLinkDates((prev) => ({ ...prev, ...dateUpdates }));
      }
    };
    run().catch(() => {});
    return () => controller.abort();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Media & Press Coverage | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="External media coverage and press mentions about Mosaic Multicultural Connections, curated with latest articles first."
        />
      </Helmet>

      <Section variant="default" padding="lg" fade="top" divider="bottom" center>
        <div className="text-center subsection-break">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
            <span className="text-foreground/80 font-medium">Media & Press Coverage</span>
          </div>
          <h1 className="fluid-h1 text-4xl font-bold text-foreground mb-4">Media & Press</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mosaic Multicultural Connections is regularly featured by trusted media outlets for our work supporting people from multicultural and refugee backgrounds across NSW.
            <br /><br />
            These stories reflect the voices, experiences, and impact of the communities we walk alongside.
          </p>
        </div>
      </Section>

      {(() => {
        const validDemo = demoNews.filter((n) => typeof n.href === 'string' && n.href.trim().length > 0);
        if (validDemo.length === 0) return null;
        return (
          <Section variant="surface" divider="none" padding="sm">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by tag</span>
              <button
                aria-pressed={selectedTag === 'All'}
                onClick={() => setSelectedTag('All')}
                className={`px-3 py-1 rounded-full border transition ${selectedTag === 'All' ? 'bg-ocean text-white border-ocean' : 'bg-background text-foreground border-border hover:bg-sand/60'} focus:outline-none focus:ring-2 focus:ring-ring`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  aria-pressed={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full border transition ${selectedTag === tag ? 'bg-ocean text-white border-ocean' : 'bg-background text-foreground border-border hover:bg-sand/60'} focus:outline-none focus:ring-2 focus:ring-ring`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {validDemo.map((item, idx) => (
                <div
                  key={`${item.title}-${idx}`}
                  className="relative group overflow-hidden dark:border-white/20 dark:bg-white/10 backdrop-blur-xl duration-500 ease-out hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition min-h-[380px] md:min-h-[420px] flex"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="rounded-xl border-0 shadow-none flex-1 flex flex-col">
                    <CardHeader className="p-4 md:p-5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-2">
                          {item.type === 'Press Release' ? <Megaphone className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-muted-foreground">{item.type}</div>
                          <div className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <h2 className="mt-2 text-lg md:text-xl font-semibold text-foreground">{item.title}</h2>
                    </CardHeader>
                    <CardContent className="p-4 md:p-5">
                      <p className="text-sm md:text-base text-muted-foreground">{item.summary}</p>
                    </CardContent>
                    <CardFooter className="p-4 md:p-5 mt-auto">
                      <Button asChild variant="link" className="text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                        <Link to={item.href!} {...prefetchOnHover(item.href!)} aria-label={ariaLabelFor(item.href!, item.title)}>
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </Section>
        );
      })()}

      <Section variant="alt" divider="none" padding="sm">
        <div className="subsection-break mb-4">
          <h2 className="text-2xl font-bold text-foreground">Media Coverage</h2>
          <p className="text-muted-foreground">Explore news articles and media coverage featuring Mosaic Multicultural Connections.</p>
        </div>
        <Tabs value={selectedTag} onValueChange={(v) => setSelectedTag(v)} className="mb-4">
          <TabsList className="mx-0 flex-wrap">
            <TabsTrigger value="All">All</TabsTrigger>
            {['Youth','Community','Company Update','Family','Settlement','Advocacy'].map((t) => (
              <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {(() => {
          const sorted = [...externalLinks].sort((a, b) => {
            const ta = thumbDateTs(a, linkYears[a], linkDates[a]);
            const tb = thumbDateTs(b, linkYears[b], linkDates[b]);
            return tb - ta;
          });
          const byTag = selectedTag === 'All'
            ? sorted
            : sorted.filter((u) => {
                const tag = contentTagFor[u] || deriveContentTag(u, titles[u]);
                return tag === selectedTag;
              });
          return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-start">
              {byTag.map((url) => (
                <button
                  key={url}
                  aria-label={ariaLabelFor(url, titles[url])}
                  onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                  className="group relative w-full min-h-[380px] md:min-h-[420px] text-left rounded-2xl border border-border bg-card shadow-sm overflow-hidden hover:shadow-md hover:ring-1 hover:ring-ocean/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition duration-300 flex flex-col"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="rounded-2xl border-0 shadow-none overflow-hidden flex-1 flex flex-col">
                    {(customThumbFor[url] || thumbs[url]) && (
                      <div className="h-44 md:h-48 bg-muted">
                        <img
                          src={encodeURI(customThumbFor[url] || thumbs[url])}
                          alt={(titles[url] || hostOf(url))}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <CardHeader className="p-4 md:p-5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-lg bg-background border border-border p-2">
                          <img
                            src={`https://${hostOf(url)}/favicon.ico`}
                            alt={hostOf(url)}
                            className="h-5 w-5"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm text-muted-foreground">{outletName(url, titles[url])}</div>
                          {formatThumbDate(url, linkYears[url], linkDates[url]) && (
                            <div className="text-xs text-muted-foreground">{formatThumbDate(url, linkYears[url], linkDates[url])}</div>
                          )}
                        </div>
                      </div>
                      {(contentTagFor[url] || deriveContentTag(url, titles[url])) && (
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-full bg-background border border-border px-2 py-1 text-xs text-muted-foreground">
                            {contentTagFor[url] || deriveContentTag(url, titles[url])}
                          </span>
                        </div>
                      )}
                      <h4 className="mt-2 text-base md:text-lg font-semibold text-foreground break-words">
                        {titleFor(url, titles[url])}
                      </h4>
                    </CardHeader>
                  </Card>
                </button>
              ))}
            </div>
          );
        })()}
      </Section>
      
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-10 md:p-12 text-center border border-white/50 dark:border-white/20 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Interested in learning more about our work or media enquiries?</h2>
            <p className="text-base md:text-lg text-muted-foreground mt-3">Contact our team or explore our community stories.</p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/contact?topic=media"
                className="group inline-flex items-center justify-center rounded-xl bg-ocean text-white px-8 py-4 text-lg font-semibold shadow-xl hover:bg-ocean/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300"
                aria-label="Media enquiries"
              >
                Media enquiries
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <Link to="/contact-us" className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">Contact our team</Link>
              <span className="px-2 text-muted-foreground">•</span>
              <Link to="/stories" className="font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">Explore community stories</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
