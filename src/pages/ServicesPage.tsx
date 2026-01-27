import { Helmet } from 'react-helmet-async';
import ServicesList from '../components/features-06/features-06';
import RelatedServices from '@/components/RelatedServices';
import { AU } from '@/lib/auSpelling';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserPlus, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '@/components/ui/PageTransition';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="animate-fade-in">
      <Helmet>
        <title>{t('servicesPage.meta.title')}</title>
        <meta
          name="description"
          content="Explore Mosaic's services: settlement support, aged care, family programs, and community engagement for multicultural communities across NSW."
        />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem', position: 1,
              item: { '@type': 'Service',
                name: 'Settlement services',
                description: 'Personalised support for people from refugee, migrant and humanitarian backgrounds to help take control of their settlement journey and access essential services, information and opportunities.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/settlement-support'
              }
            },
            {
              '@type': 'ListItem', position: 2,
              item: { '@type': 'Service',
                name: 'Family support',
                description: 'Culturally appropriate programs for multicultural families with children aged 0–18.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/family-support'
              }
            },
            {
              '@type': 'ListItem', position: 3,
              item: { '@type': 'Service',
                name: 'Home care programs',
                description: 'Culturally responsive, in‑home and community based home care that honours cultural traditions.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/aged-care'
              }
            },
            {
              '@type': 'ListItem', position: 4,
              item: { '@type': 'Service',
                name: 'Community services',
                description: 'Personalised support to ensure access to opportunities, services and connections needed to thrive.',
                areaServed: 'NSW',
                url: 'https://mosaicmc.org.au/services/community-engagement'
              }
            }
          ]
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <Section variant="default" divider="top" fade="top">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">{t('servicesPage.hero.badge')}</span>
          </div>
          <h1 className="fluid-h1 text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">
            {AU(t('servicesPage.hero.title'))}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up">
            {AU(t('servicesPage.hero.description'))}
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
            {AU(t('servicesPage.hero.subtext'))}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up">
            <Button asChild variant="cta" size="lg">
              <a href="https://forms.mosaicmc.org.au/refer" target="_blank" rel="noopener noreferrer" aria-label={`${t('servicesPage.hero.referral')} (opens in new tab)`} className="inline-flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {t('servicesPage.hero.referral')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact-us">
                {t('servicesPage.hero.contact')}
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      


      {/* Services List Section */}
      <ServicesList
        title={t('servicesPage.list.title')}
      />
      <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
