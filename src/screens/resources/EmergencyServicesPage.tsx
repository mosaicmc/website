"use client";

import RelatedServices from '@/components/RelatedServices';
import { Phone, AlertTriangle, Flame, CloudLightning, Satellite, Radio, Zap, MapPin, Languages, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Section from '@/components/ui/Section';
import { useTranslation } from 'react-i18next';

export default function EmergencyServicesPage() {
  const { t } = useTranslation();
  
  const items = [
    {
      id: "lifeThreatening",
      title: t('emergencyServices.items.lifeThreatening.title'),
      desc: t('emergencyServices.items.lifeThreatening.desc'),
      action: { label: t('emergencyServices.actions.call000'), href: "tel:000" },
      icon: AlertTriangle,
    },
    {
      id: "bushfire",
      title: t('emergencyServices.items.bushfire.title'),
      desc: t('emergencyServices.items.bushfire.desc'),
      action: { label: "1800 679 737", href: "tel:1800679737" },
      icon: Flame,
    },
    {
      id: "floods",
      title: t('emergencyServices.items.floods.title'),
      desc: t('emergencyServices.items.floods.desc'),
      action: { label: "132 500", href: "tel:132500" },
      icon: CloudLightning,
    },
    {
      id: "sesGeneral",
      title: t('emergencyServices.items.sesGeneral.title'),
      desc: t('emergencyServices.items.sesGeneral.desc'),
      action: { label: "138 737", href: "tel:138737" },
      icon: Phone,
    },
    {
      id: "power",
      title: t('emergencyServices.items.power.title'),
      desc: t('emergencyServices.items.power.desc'),
      action: { label: "13 13 88", href: "tel:131388" },
      icon: Zap,
    },
    {
      id: "weather",
      title: t('emergencyServices.items.weather.title'),
      desc: t('emergencyServices.items.weather.desc'),
      link: { label: "bom.gov.au", href: "https://www.bom.gov.au/" },
      icon: Satellite,
    },
    {
      id: "traffic",
      title: t('emergencyServices.items.traffic.title'),
      desc: t('emergencyServices.items.traffic.desc'),
      link: { label: "livetraffic.com", href: "https://www.livetraffic.com/" },
      icon: MapPin,
    },
    {
      id: "localInfo",
      title: t('emergencyServices.items.localInfo.title'),
      desc: t('emergencyServices.items.localInfo.desc'),
      link: { label: t('emergencyServices.actions.download'), href: "https://www.nsw.gov.au/emergencies/near-me" },
      icon: AlertTriangle,
    },
    {
      id: "radio",
      title: t('emergencyServices.items.radio.title'),
      desc: t('emergencyServices.items.radio.desc'),
      link: { label: t('emergencyServices.actions.listen'), href: "https://www.abc.net.au/newcastle/" },
      icon: Radio,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      

      <Section padding="lg" center overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
          <div className="text-center mb-10">
            <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight">{t('emergencyServices.title')}</h1>
            <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
              {t('emergencyServices.description')}
            </p>
          </div>

          {/* Quick Actions Bar - unified styling */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <a href="tel:000" className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition flex items-center justify-between" aria-label={t('emergencyServices.quickActions.call000.title')}>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-sun text-white p-2">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t('emergencyServices.quickActions.call000.title')}</div>
                  <div className="text-xs text-muted-foreground">{t('emergencyServices.quickActions.call000.desc')}</div>
                </div>
              </div>
              <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition">{t('emergencyServices.actions.call')}</span>
            </a>
            <a href="tel:131450" className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition flex items-center justify-between" aria-label={t('emergencyServices.quickActions.tis.title')}>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-earth text-white p-2">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t('emergencyServices.quickActions.tis.title')}</div>
                  <div className="text-xs text-muted-foreground">{t('emergencyServices.quickActions.tis.desc')}</div>
                </div>
              </div>
              <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition">{t('emergencyServices.actions.call')}</span>
            </a>
            <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition flex items-center justify-between" aria-label="Open NSW Government emergency information (opens in new tab)">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-leaf text-white p-2">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t('emergencyServices.quickActions.nswInfo.title')}</div>
                  <div className="text-xs text-muted-foreground">{t('emergencyServices.quickActions.nswInfo.desc')}</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-primary text-sm opacity-0 group-hover:opacity-100 transition">
                Open
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </span>
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 text-primary p-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    {item.action ? (
                      <a
                        href={item.action.href}
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        <Phone className="h-4 w-4" /> {item.action.label}
                      </a>
                    ) : item.link ? (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.link.label} (opens in new tab)`}
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        {item.link.label}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            {t('emergencyServices.footer.support')} <a className="text-primary hover:underline" href="tel:131450">131 450</a> {t('emergencyServices.footer.interpreter')}
          </div>

          <div className="mt-10 text-center">
            <Link to="/resources/emergency-translation" className="text-primary hover:underline">
              {t('emergencyServices.footer.link')} →
            </Link>
          </div>
      </Section>
      <RelatedServices />
    </div>
  );
}
