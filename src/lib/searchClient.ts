import { auSpelling } from './auSpelling';

export type SearchItem = { path: string; title: string; body: string; tags: string[]; lang?: string };

type SynonymDict = Record<string, string[]>;
type TranslationLookup = Record<string, Record<string, string>>; // intent -> { lang -> phrase }
type ServiceMeta = { intent?: string; category?: string; priority?: number; tags?: string[] };

let synonymsDict: SynonymDict = {};
let translationsLookup: TranslationLookup = {};
let serviceMetadata: Record<string, ServiceMeta> = {};
let iconsMapping: Record<string, string> = {};

let configsLoaded = false;
export async function initSearchConfigs(): Promise<void> {
  if (configsLoaded) return;
  try {
    const [syn, tr, meta, ico] = await Promise.all([
      fetch('/search-config/synonyms.json').then((r) => r.ok ? r.json() : {}),
      fetch('/search-config/translations.json').then((r) => r.ok ? r.json() : {}),
      fetch('/search-config/metadata.json').then((r) => r.ok ? r.json() : {}),
      fetch('/search-config/icons.json').then((r) => r.ok ? r.json() : {})
    ]);
    synonymsDict = syn || {};
    translationsLookup = tr || {};
    serviceMetadata = meta || {};
    iconsMapping = ico || {};
  } catch { /* ignore */ }
  configsLoaded = true;
}

export type LangCode = 'en' | 'ar' | 'hi' | 'es' | 'vi';
export function detectLanguage(query: string): LangCode {
  const q = (query || '').trim();
  if (!q) return 'en';
  if (/[\u0600-\u06FF]/.test(q)) return 'ar';
  if (/[\u0900-\u097F]/.test(q)) return 'hi';
  const hasVi = /[ăĂâÂêÊôÔơƠưƯđĐáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữự]/.test(q);
  const hasEs = /[ñÑáéíóúÁÉÍÓÚüÜ]/.test(q);
  if (hasVi) return 'vi';
  if (hasEs) return 'es';
  return 'en';
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

function expandSynonyms(q: string): string[] {
  const base = q.toLowerCase();
  const syn: Record<string, string[]> = {
    'aged care': ['senior support', 'older people care', 'elder care', 'home care'],
    'home care': ['aged care', 'elder care', 'senior support'],
    employment: ['jobs', 'work support', 'job help', 'work'],
    settlement: ['migration', 'visa help', 'settlement support'],
    volunteers: ['volunteering', 'help out', 'get involved'],
    youth: ['young people programs', 'youth programs'],
    services: ['programs', 'support'],
    resources: ['forms', 'documents', 'brochures'],
    contact: ['phone', 'call', 'contact us']
  };
  const extra: Record<string, string[]> = {
    'older people': ['aged care'],
    'help for seniors': ['aged care'],
    'senior care': ['aged care'],
    'older people care': ['aged care'],
    'home care': ['aged care'],
    'aged services': ['aged care'],
    'find work': ['employment'],
    'job help': ['employment'],
    'jobs support': ['employment'],
    'help getting a job': ['employment'],
    'work support': ['employment'],
    'career help': ['employment'],
    'job search': ['employment'],
    'employment assistance': ['employment'],
    'resume help': ['employment'],
    'work programs': ['employment'],
    'help with paperwork': ['resources'],
    'child programs': ['youth programs'],
    'youth programs': ['youth programs'],
    'programs for young people': ['youth programs'],
    'kids activities': ['youth programs'],
    'family programs': ['youth programs'],
    'youth support': ['youth programs'],
    'activities for young people': ['youth programs'],
    'help settling': ['settlement'],
    forms: ['resources'],
    documents: ['resources'],
    'translation help': ['settlement support'],
    volunteer: ['volunteering', 'get involved'],
    'help out': ['volunteering', 'get involved'],
    'volunteering': ['volunteering', 'get involved'],
    'volunteer opportunities': ['volunteering', 'get involved'],
    brochures: ['resources'],
    'information packs': ['resources'],
    resources: ['resources'],
    'paperwork help': ['resources'],
    'how to apply': ['resources'],
    'application forms': ['resources'],
    'settlement services': ['settlement'],
    'settlement help': ['settlement'],
    'visa help': ['settlement support'],
    'migration help': ['settlement support'],
    'help moving to australia': ['settlement'],
    'support settling in australia': ['settlement'],
    'immigration support': ['settlement'],
    'newcomer support': ['settlement'],
    interpreting: ['settlement support'],
    'support for new arrivals': ['settlement']
  };
  const acc = new Set<string>([base]);
  for (const [k, arr] of Object.entries(syn)) {
    if (base.includes(k)) arr.forEach((a) => acc.add(a));
    for (const a of arr) if (base.includes(a)) acc.add(k);
  }
  for (const [k, arr] of Object.entries(extra)) {
    if (base.includes(k)) arr.forEach((a) => acc.add(a));
    for (const a of arr) if (base.includes(a)) acc.add(k);
  }
  // JSON dictionary integration (canonical intents -> phrase arrays)
  for (const arr of Object.values(synonymsDict)) {
    for (const phrase of arr) {
      const p = phrase.toLowerCase();
      if (base.includes(p) || p.includes(base)) acc.add(p);
    }
  }
  const aus = auSpelling(base);
  acc.add(aus);
  return Array.from(acc);
}

export function buildFacets(items: SearchItem[]): string[] {
  let hasServices = false;
  let hasPrograms = false;
  let hasAbout = false;
  let hasResources = false;
  for (const it of items) {
    const p = it.path || '';
    if (p.startsWith('/services')) hasServices = true;
    if (p === '/about') hasAbout = true;
    if (p.startsWith('/resources')) hasResources = true;
    const tagset = new Set((it.tags || []).map((t) => t.toLowerCase()));
    if (tagset.has('programs') || tagset.has('program')) hasPrograms = true;
  }
  const out: string[] = [];
  if (hasServices) out.push('Services');
  if (hasPrograms) out.push('Programs');
  if (hasAbout) out.push('About Mosaic');
  if (hasResources) out.push('Resources');
  return out;
}

export class LocalSearchClient {
  private items: SearchItem[];
  private lang: string;
  constructor(items: SearchItem[], lang: string = 'en') {
    this.items = items || [];
    this.lang = (lang || 'en').toLowerCase();
  }
  setLanguage(lang: string) { this.lang = (lang || 'en').toLowerCase(); }
  setItems(items: SearchItem[]) { this.items = items || []; }

  search(query: string, facets: string[] = []): SearchItem[] {
    const qs = expandSynonyms(query);
    const base = (query || '').trim().toLowerCase();
    const aus = auSpelling(base).toLowerCase();
    const lang = detectLanguage(query);
    const subset = this.items.filter((it) => (it.lang || 'en').toLowerCase() === lang);
    const tokens = new Set<string>();
    for (const it of subset) {
      for (const t of it.tags || []) tokens.add(t.toLowerCase());
      for (const w of (it.title || '').toLowerCase().split(/\W+/)) if (w) tokens.add(w);
    }
    const near = Array.from(tokens)
      .map((t) => ({ t, d: Math.min(levenshtein(base, t), levenshtein(aus, t)) }))
      .filter((x) => x.d <= 2)
      .sort((a, b) => a.d - b.d)
      .slice(0, 5)
      .map((x) => x.t);
    for (const n of near) qs.push(n);

    const intentPhraseToKey: Record<string, string> = {};
    for (const [intent, phrases] of Object.entries(synonymsDict)) {
      for (const p of phrases) intentPhraseToKey[p.toLowerCase()] = intent;
    }
    const queryIntents = new Set<string>();
    for (const t of qs) {
      const k = intentPhraseToKey[t.toLowerCase()];
      if (k) queryIntents.add(k);
    }
    const intentGroups: Record<string, string> = {
      aged_care: 'aged_care',
      employment: 'employment',
      settlement: 'settlement',
      settlement_support: 'settlement',
      youth_programs: 'youth_programs',
      resources: 'resources',
      volunteering: 'volunteering',
      contact: 'contact'
    };
    const categoryWeights: Record<string, number> = {
      Services: 8,
      Programs: 5,
      Resources: 3,
      About: 1
    };
    const scored = subset.map((it) => {
      const hay = `${it.title} ${it.body} ${(it.tags || []).join(' ')}`.toLowerCase();
      let score = 0;
      for (const term of qs) {
        if (!term) continue;
        if (it.title.toLowerCase() === term) score += 8;
        if (it.title.toLowerCase().startsWith(term)) score += 6;
        if (it.title.toLowerCase().includes(term)) score += 5;
        if (hay.includes(term)) score += 3;
      }
      if ((it.path || '').startsWith('/services')) score += 2;
      // Metadata priority boost
      const meta = serviceMetadata[it.path];
      if (meta && typeof meta.priority === 'number') score += Math.max(0, Math.min(10, meta.priority));
      // Category boosting
      if (meta && meta.category && categoryWeights[meta.category]) score += categoryWeights[meta.category];
      // Intent alignment
      if (meta && meta.intent) {
        const itemGroup = intentGroups[meta.intent] || meta.intent;
        let intentBoost = 0;
        for (const qi of queryIntents) {
          const qGroup = intentGroups[qi] || qi;
          if (qi === meta.intent) intentBoost = Math.max(intentBoost, 6);
          else if (qGroup === itemGroup) intentBoost = Math.max(intentBoost, 3);
        }
        score += intentBoost;
      }
      // Tag matching boosts
      if (meta && Array.isArray(meta.tags)) {
        const qset = new Set(qs.map((x) => x.toLowerCase()));
        for (const tg of meta.tags) {
          const tgl = (tg || '').toLowerCase();
          if (qset.has(tgl)) score += 2;
        }
      }
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

  suggestions(query: string): string[] {
    const base = (query || '').trim().toLowerCase();
    if (!base) return [];
    const aus = auSpelling(base).toLowerCase();
    const out: string[] = [];
    const lang = detectLanguage(query);
    const hasAged = /\b(aged|older|senior|elder|care)\b/.test(base);
    const hasJob = /\b(job|work|employment|career)\b/.test(base);
    const hasVisa = /\b(visa|settle|settlement|migration|immigration)\b/.test(base);
    const hasYouth = /\b(youth|child|children|kids|young|family)\b/.test(base);
    const hasForms = /\b(form|forms|document|documents|brochure|brochures|paperwork|apply|application)\b/.test(base);
    const phrase = (intent: string, fallback: string) => translationsLookup[intent]?.[lang] || fallback;
    if (hasAged) out.push(phrase('aged_care', 'Looking for home care support?'));
    if (hasJob) out.push(phrase('employment', 'Need help finding a job?'));
    if (hasVisa) out.push(phrase('settlement', 'Support with settling in Australia'));
    if (hasYouth) out.push(phrase('youth_programs', 'Programs for children and young people'));
    if (hasForms) out.push(phrase('resources', 'Need help with forms or documents?'));
    const texts: string[] = [];
    const subset = this.items.filter((it) => (it.lang || 'en').toLowerCase() === lang);
    for (const it of subset) {
      texts.push(it.title.toLowerCase());
      for (const t of it.tags || []) texts.push(t.toLowerCase());
    }
    const uniq = Array.from(new Set(texts));
    const scored = uniq.map((t) => ({ t, d: Math.min(levenshtein(base, t), levenshtein(aus, t)) }));
    const close = scored.filter((x) => x.d <= 2).sort((a, b) => a.d - b.d).slice(0, 5).map((x) => x.t);
    for (const c of close) if (out.length < 5) out.push(c);
    const _cfgTouch = !!translationsLookup && !!iconsMapping;
    if (_cfgTouch) { /* no-op: ensures configs are referenced without affecting behavior */ }
    const arr = Array.from(new Set(out)).slice(0, 5);
    return ['All', ...arr.filter((x) => x.toLowerCase() !== 'all')].slice(0, 5);
  }

  popularPrompts(): string[] {
    return [
      'Home care support',
      'Employment services',
      'Settlement help',
      'Youth & family programs'
    ];
  }
}
