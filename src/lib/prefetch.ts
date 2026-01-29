const STORIES_ENABLED = process.env.NEXT_PUBLIC_FEATURE_STORIES_PAGE === 'true';

const prefetched = new Set<string>();

type Prefetcher = () => Promise<unknown>;

const routeImportMap: Record<string, Prefetcher> = {
  '/': () => import('../screens/HomePage'),
  '/about': () => import('../screens/AboutPage'),
  '/services': () => import('../screens/ServicesPage'),
  '/services/settlement-support': () => import('../screens/services/SettlementSupportPage'),
  '/services/aged-care': () => import('../screens/services/AgedCarePage'),
  '/services/family-support': () => import('../screens/services/FamilySupportPage'),
  '/services/community-engagement': () => import('../screens/services/CommunityEngagementPage'),
  '/locations': () => import('../screens/LocationsPage'),
  '/contact-us': () => import('../screens/LocationsPage'),
  '/get-involved': () => import('../screens/GetInvolvedPage'),
  '/resources': () => import('../screens/ResourcesPage'),
  '/resources/emergency-services': () => import('../screens/resources/EmergencyServicesPage'),
  '/resources/translation-services': () => import('../screens/resources/TranslationServicesPage'),
  '/resources/emergency-translation': () => import('../screens/resources/EmergencyTranslationPage'),
  '/resources/annual-reports': () => import('../screens/resources/AnnualReportsPage'),
  '/resources/helpful-links': () => import('../screens/resources/HelpfulLinksPage'),
  '/resources/faqs': () => import('../screens/resources/FAQPage'),
  ...(STORIES_ENABLED ? { '/stories': () => import('../screens/StoriesPage') } : {}),
  '/contact': () => import('../screens/LocationsPage'),
  '/donate': () => import('../screens/DonatePage'),
  '/policies/code-of-conduct': () => import('../screens/policies/CodeOfConductPolicyPage'),
  '/policies/diversity-inclusion': () => import('../screens/policies/DiversityInclusionPolicyPage'),
  '/policies/whistleblower': () => import('../screens/policies/WhistleblowerPolicyPage'),
  '/policies/quality-management': () => import('../screens/policies/QualityManagementPolicyPage'),
  '/policies/work-health-safety': () => import('../screens/policies/WorkHealthSafetyPolicyPage'),
  '/company/knowledge-base': () => import('../screens/company/KnowledgeBasePage'),
  '/company/news': () => import('../screens/company/NewsPage'),
};

export function prefetchRoute(path: string) {
  if (!path || prefetched.has(path)) return;
  const loader = routeImportMap[path];
  if (!loader) return; // no matching lazy route
  // Trigger dynamic import; ignore errors to avoid UI disruption
  loader().catch(() => {});
  prefetched.add(path);
}

// Convenience helper to attach to link components
export function prefetchOnHover(path: string) {
  return {
    onMouseEnter: () => prefetchRoute(path),
    onFocus: () => prefetchRoute(path),
  };
}
