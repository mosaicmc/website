import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEmploymentHeroJobs } from '@/hooks/useEmploymentHeroJobs';
import { useEmploymentHeroMetadata } from '@/hooks/useEmploymentHeroMetadata';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

function snippet(text?: string, n: number = 180): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return clean.length > n ? clean.slice(0, n) + '…' : clean;
}

const CareersPage = () => {
  const { departments, loading: metaLoading } = useEmploymentHeroMetadata();
  const [deptId, setDeptId] = React.useState<string | null>(null);
  const { jobs, loading, error } = useEmploymentHeroJobs({ page_index: 1, country_codes: 'AU', department_ids: deptId ?? '' });

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Careers | Mosaic Multicultural Connections</title>
        <meta name="description" content="Explore open roles at Mosaic Multicultural Connections and apply online." />
      </Helmet>

      <Section padding="sm" center>
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="inline-flex items-center rounded-full bg-sand text-foreground px-4 py-1.5 text-sm shadow mb-4">
            <span className="mr-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
            <span className="text-muted-foreground font-medium">Join our team</span>
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-5 text-foreground">Careers</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Build a rewarding career helping multicultural communities while growing professionally.
          </p>
        </div>
      </Section>

      <Section overlay center className="py-3 md:py-4 lg:py-5 section-break" containerClassName="max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">{!loading && !error ? `${jobs.length} open role${jobs.length === 1 ? '' : 's'}` : ' '}</div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background">
                  Department: {deptId ? (departments.find(d => String(d.id) === String(deptId))?.name || deptId) : 'All'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[16rem]">
                <DropdownMenuLabel>Filter by department</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDeptId(null)}>All</DropdownMenuItem>
                {metaLoading && <DropdownMenuItem disabled>Loading…</DropdownMenuItem>}
                {!metaLoading && departments.map((d) => (
                  <DropdownMenuItem key={String(d.id)} onClick={() => setDeptId(String(d.id))}>{d.name || String(d.id)}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {loading && (
          <div className="text-center text-muted-foreground">Loading roles…</div>
        )}
        {error && (
          <div className="text-center text-muted-foreground">{error}</div>
        )}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {jobs.map((job) => (
              <Card key={String(job.id)} className="rounded-2xl shadow-xl overflow-hidden">
                <CardHeader className="p-4 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">{job.title || 'Role'}</h2>
                  <p className="text-sm text-muted-foreground">{job.department_name || '—'}</p>
                </CardHeader>
                <CardContent className="p-4 text-sm">
                  <p className="text-muted-foreground mb-3">
                    {job.city_name || 'City'}, {job.country_name || 'Country'}
                  </p>
                  <p className="text-muted-foreground mb-3">
                    {job.employment_type_name || 'Employment type'}
                  </p>
                  <p className="text-muted-foreground">{snippet(job.description)}</p>
                </CardContent>
                <CardFooter className="p-4">
                  {job.application_url ? (
                    <Button asChild className="bg-ocean text-white">
                      <a href={job.application_url} target="_blank" rel="noopener noreferrer">
                        Apply now
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="bg-muted text-muted-foreground">Application closed</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default CareersPage;
