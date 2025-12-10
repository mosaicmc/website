import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Users, Handshake, ChevronRight, FileText, Phone, MapPin, Globe, Calendar } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { getRelatedPages, keyForPath, copyFor, RelatedItem } from '@/lib/related';

interface RelatedServicesProps { current?: 'settlement-support' | 'aged-care' | 'family-support' | 'community-engagement' }

export default function RelatedServices({ current }: RelatedServicesProps) {
  const location = useLocation();
  const path = location.pathname;
  const items: RelatedItem[] = getRelatedPages(path);
  const currentKey = current ?? keyForPath(path);
  const paragraph = copyFor(currentKey);

  const gradientFor = (color: string) => (
    color === 'sky' ? 'from-sky to-sky/80' :
    color === 'earth' ? 'from-earth to-earth/80' :
    color === 'care' ? 'from-care to-care/80' :
    color === 'leaf' ? 'from-leaf to-leaf/80' :
    'from-sun to-sun/80'
  );

  return (
    <Section overlay center>
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
          <span className="mr-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
          <span className="text-foreground font-medium">Related Services</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">You May Also Be Interested In</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{paragraph}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((svc) => (
            <Link
              key={svc.key}
              to={svc.link}
              aria-label={`${svc.title} – Learn more`}
              className="group block rounded-2xl focus:outline-none focus:ring-2 ring-ocean ring-offset-2 ring-offset-background transition-transform duration-300 hover:scale-[1.02]"
            >
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-lg text-white p-3 bg-gradient-to-br ${gradientFor(svc.color)} shadow-md`}>
                      {svc.icon === 'home' && <Home className="h-6 w-6" />}
                      {svc.icon === 'heart' && <Heart className="h-6 w-6" />}
                      {svc.icon === 'users' && <Users className="h-6 w-6" />}
                      {svc.icon === 'handshake' && <Handshake className="h-6 w-6" />}
                      {svc.icon === 'file' && <FileText className="h-6 w-6" />}
                      {svc.icon === 'phone' && <Phone className="h-6 w-6" />}
                      {svc.icon === 'map' && <MapPin className="h-6 w-6" />}
                      {svc.icon === 'globe' && <Globe className="h-6 w-6" />}
                      {svc.icon === 'calendar' && <Calendar className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{svc.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{svc.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="pt-4">
                  <div className="inline-flex items-center text-sm font-medium text-primary">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
    </Section>
  );
}
