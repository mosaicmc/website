"use client";

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import jobsData from '@/data/jobs.json';

const CareersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      <Section padding="sm" center>
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="inline-flex items-center rounded-full bg-sand text-foreground px-4 py-1.5 text-sm shadow mb-4">
            <span className="me-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
            <span className="text-muted-foreground font-medium">{t('careersPage.badge')}</span>
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-5 text-foreground">{t('careersPage.title')}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t('careersPage.description')}
          </p>
        </div>
      </Section>

      {/* Manual Job Listing Section */}
      {jobsData.length > 0 && (
        <Section padding="sm" className="pb-8" containerClassName="max-w-5xl">
           <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-8">
            {jobsData.map((job) => (
              <Card key={job.id} className="rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full border-border/50">
                <CardHeader className="p-5 border-b border-border/50 bg-muted/20">
                  <h2 className="text-xl font-bold text-foreground line-clamp-2">{job.title}</h2>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {job.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 flex-grow">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button asChild className="w-full bg-ocean text-white hover:bg-ocean/90">
                    <a href={job.seekUrl} target="_blank" rel="noopener noreferrer">
                      Apply on SEEK <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
           </div>
        </Section>
      )}
    </div>
  );
};

export default CareersPage;
