import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from 'react-i18next';
import RelatedServices from '@/components/RelatedServices';
import { Phone, AlertTriangle, Flame, CloudLightning, Satellite, Radio, Zap, MapPin } from "lucide-react";
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';
import BackLink from "../../components/ui/BackLink";

export default function EmergencyTranslationPage() {
  const { t } = useTranslation();

  const emergencyItems = [
    {
      title: t('emergency.items.lifeThreatening.title'),
      desc: t('emergency.items.lifeThreatening.desc'),
      action: { label: "000", href: "tel:000" },
      icon: AlertTriangle,
    },
    {
      title: t('emergency.items.bushfire.title'),
      desc: t('emergency.items.bushfire.desc'),
      action: { label: "1800 679 737", href: "tel:1800679737" },
      icon: Flame,
    },
    {
      title: t('emergency.items.floods.title'),
      desc: t('emergency.items.floods.desc'),
      action: { label: "132 500", href: "tel:132500" },
      icon: CloudLightning,
    },
    {
      title: t('emergency.items.ses.title'),
      desc: t('emergency.items.ses.desc'),
      action: { label: "138 737", href: "tel:138737" },
      icon: Phone,
    },
    {
      title: t('emergency.items.power.title'),
      desc: t('emergency.items.power.desc'),
      action: { label: "13 13 88", href: "tel:131388" },
      icon: Zap,
    },
    {
      title: t('emergency.items.weather.title'),
      desc: t('emergency.items.weather.desc'),
      link: { label: "bom.gov.au", href: "https://www.bom.gov.au/" },
      icon: Satellite,
    },
    {
      title: t('emergency.items.traffic.title'),
      desc: t('emergency.items.traffic.desc'),
      link: { label: "livetraffic.com", href: "https://www.livetraffic.com/" },
      icon: MapPin,
    },
    {
      title: t('emergency.items.local.title'),
      desc: t('emergency.items.local.desc'),
      link: { label: "Download app", href: "https://www.nsw.gov.au/emergencies/near-me" },
      icon: AlertTriangle,
    },
    {
      title: t('emergency.items.radio.title'),
      desc: t('emergency.items.radio.desc'),
      link: { label: "Listen live", href: "https://www.abc.net.au/newcastle/" },
      icon: Radio,
    },
  ];

  const accentFor = (title: string) => {
    if (title.includes('Life threatening')) return 'bg-sun';
    if (title.includes('bushfire') || title.includes('Floods') || title.includes('storms') || title.includes('tsunamis')) return 'bg-leaf';
    if (title.includes('Power') || title.includes('Traffic')) return 'bg-earth';
    if (title.includes('Hazards') || title.includes('Weather')) return 'bg-sky';
    return 'bg-ocean';
  };

  

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('emergency.title')} | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content={t('emergency.description')}
        />
      </Helmet>

      <Section overlay padding="lg" center containerClassName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 md:space-y-12">
          <div>
            <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight text-brand-gradient">{t('emergency.title')}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">{t('emergency.description')}</p>
          </div>

          <Tabs defaultValue="quick" className="space-y-6">
            <TabsList className="mx-auto">
              <TabsTrigger value="quick">{t('emergency.tabs.quick')}</TabsTrigger>
              <TabsTrigger value="contacts">{t('emergency.tabs.contacts')}</TabsTrigger>
              <TabsTrigger value="language">{t('emergency.tabs.language')}</TabsTrigger>
              <TabsTrigger value="links">{t('emergency.tabs.links')}</TabsTrigger>
            </TabsList>
            <TabsContent value="quick">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch justify-center justify-items-center text-center max-w-[860px] mx-auto">
                <Card className="glass-surface group relative h-full w-full max-w-[380px] min-h-[240px] flex flex-col transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-sun text-white p-3">
                          <AlertTriangle className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Call 000</h3>
                          <p className="text-sm text-muted-foreground">Police • Fire • Ambulance</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="px-6 pb-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a href="tel:000" aria-label={t('emergency.aria.call000')}>
                          Call now
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
                <Card className="glass-surface group relative h-full w-full max-w-[380px] min-h-[240px] flex flex-col transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-earth text-white p-3">
                          <Phone className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{t('emergency.tis.title')}</h3>
                          <p className="text-sm text-muted-foreground">{t('emergency.tis.subtitle')}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="px-6 pb-6 pt-0">
                      <div className="grid grid-cols-1 gap-3">
                        <Button asChild variant="outline" className="h-11 w-full">
                          <a href="tel:131450" aria-label={t('emergency.aria.callTis')}>{t('emergency.tis.call')}</a>
                        </Button>
                        <Button asChild variant="outline" className="h-11 w-full">
                          <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" aria-label={t('emergency.aria.openNswEmergency')}>
                            {t('emergency.tis.info')}
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contacts">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-center justify-items-center">
                {emergencyItems.map((item) => {
                  const Icon = item.icon;
                  const isSesGeneral = item.title.startsWith('NSW SES');
                  const displayTitle = isSesGeneral ? 'NSW SES' : item.desc;
                  const displaySubtitle = isSesGeneral ? item.desc : item.title;
                  return (
                    <Card key={item.title} className="group relative h-full w-full max-w-[420px] min-h-[260px] flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                      <div className="relative z-10 h-full flex flex-col">
                        <CardHeader className="p-6">
                          <div className="flex items-center gap-4">
                            <span className={`inline-flex items-center justify-center rounded-lg ${accentFor(item.title)} text-white p-3`}>
                              {Icon ? <Icon className="h-6 w-6" /> : null}
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{displayTitle}</h3>
                              <p className="text-sm text-muted-foreground">{displaySubtitle}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-1" />
                        <CardHeader className="p-6 pt-0">
                          {item.action ? (
                            <Button asChild variant="outline" className="h-11 w-full">
                              <a href={item.action.href} aria-label={t('emergency.aria.callAction', { title: displayTitle, number: item.action.label })}>
                                {`Call ${item.action.label}`}
                              </a>
                            </Button>
                          ) : item.link ? (
                            <Button asChild variant="outline" className="h-11 w-full">
                              <a href={item.link.href} target="_blank" rel="noopener noreferrer" aria-label={t('emergency.aria.openAction', { title: displayTitle })}>
                                {item.link.label}
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </a>
                            </Button>
                          ) : null}
                        </CardHeader>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="language">
                  <Card className="glass-surface mt-3 h-full flex flex-col">
              <CardHeader className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Trans i18nKey="emergency.languageSupport.intro">
                    If you need language support, call the Translating & Interpreting Service on <a className="mc-link" href="tel:131450">131 450</a>. Ask for an interpreter and the language you speak.
                  </Trans>
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <Button asChild className="w-full md:w-auto h-11">
                      <a href="tel:131450" aria-label={t('emergency.aria.callTis')}>{t('emergency.tis.call')}</a>
                    </Button>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{t('emergency.languageSupport.whenCalling')}</h3>
                        <p className="text-sm text-muted-foreground">{t('emergency.languageSupport.whenCallingDesc')}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{t('emergency.languageSupport.atHospitals')}</h3>
                        <p className="text-sm text-muted-foreground">{t('emergency.languageSupport.atHospitalsDesc')}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{t('emergency.languageSupport.beforeYouCall')}</h3>
                        <p className="text-sm text-muted-foreground">{t('emergency.languageSupport.beforeYouCallDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="rounded-lg border border-border bg-sand/40 dark:bg-sand/25 p-5">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t('emergency.languageSupport.whatToSay')}</h3>
                      <p className="text-base text-foreground">“{t('emergency.languageSupport.script')}”</p>
                      <div className="mt-3 flex justify-center md:justify-end">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(t('emergency.languageSupport.script'))}
                          aria-label={t('emergency.aria.copyScript')}
                        >
                          {t('emergency.languageSupport.copyScript')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button asChild variant="outline" className="w-full md:w-auto h-11">
                      <a href="https://www.tisnational.gov.au/" target="_blank" rel="noopener noreferrer" aria-label={t('emergency.aria.visitTis')}>{t('emergency.languageSupport.visitTis')}</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="links">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-center justify-items-center">
                <Card className="glass-surface group relative h-full w-full max-w-[420px] min-h-[260px] flex flex-col transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-3">
                          <Satellite className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{t('emergency.nswEmergencies.title')}</h3>
                          <p className="text-sm text-muted-foreground">{t('emergency.nswEmergencies.desc')}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="p-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a
                          href="https://www.nsw.gov.au/emergency"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('emergency.aria.openNswEmergency')}
                        >
                          {t('emergency.nswEmergencies.open')}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
                <Card className="glass-surface group relative h-full w-full max-w-[420px] min-h-[260px] flex flex-col transition-all duration-500 group-hover:scale-[1.02]">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-sky text-white p-3">
                          <AlertTriangle className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{t('emergency.hazardsNearMe.title')}</h3>
                          <p className="text-sm text-muted-foreground">{t('emergency.hazardsNearMe.desc')}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="p-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a
                          href="https://www.nsw.gov.au/emergencies/near-me"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('emergency.aria.openHazards')}
                        >
                          {t('emergency.hazardsNearMe.open')}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
                <Card className="glass-surface group relative h-full w-full max-w-[420px] min-h-[260px] flex flex-col transition-all duration-500 group-hover:scale-[1.02]">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-3">
                          <MapPin className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{t('emergency.liveTraffic.title')}</h3>
                          <p className="text-sm text-muted-foreground">{t('emergency.liveTraffic.desc')}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="p-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a
                          href="https://www.livetraffic.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('emergency.aria.openLiveTraffic')}
                        >
                          {t('emergency.liveTraffic.open')}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>


          <div className="mt-10">
            <BackLink to="/resources">{t('emergency.backToResources')}</BackLink>
          </div>
        </div>
      </Section>
      <RelatedServices />
    </div>
  );
}
