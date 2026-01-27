import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BookOpen,
  Briefcase,
  HeartPulse,
  Home,
  Languages,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Program = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: JSX.Element;
  group: 'essentials' | 'wellbeing' | 'community';
};

const CardDesignExploration = () => {
  const [activeModal, setActiveModal] = useState<Program | null>(null);
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>('education-training');
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeModal) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModal(null);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModal]);

  const programs = useMemo<Program[]>(() => [
    {
      id: 'education-training',
      title: 'Education & Training',
      description: 'Supporting access to education, training, and skill development.',
      features: [
        'Learning pathways and course guidance.',
        'Support with vocational training and certificates.',
        'Referrals to local education providers.',
      ],
      icon: <BookOpen className="h-6 w-6" />,
      group: 'essentials',
    },
    {
      id: 'employment',
      title: 'Employment',
      description: 'Job readiness, employment pathways, and workplace support.',
      features: [
        'Resume and interview preparation.',
        'Job search support and referrals.',
        'Workplace rights information.',
      ],
      icon: <Briefcase className="h-6 w-6" />,
      group: 'essentials',
    },
    {
      id: 'health-wellbeing',
      title: 'Health & Wellbeing',
      description: 'Connecting to health services and promoting wellbeing.',
      features: [
        'Connections to local health services.',
        'Wellbeing and community support.',
        'Guidance on navigating care systems.',
      ],
      icon: <HeartPulse className="h-6 w-6" />,
      group: 'wellbeing',
    },
    {
      id: 'housing',
      title: 'Housing',
      description: 'Assistance finding safe and affordable housing.',
      features: [
        'Rental application support.',
        'Connections to housing providers.',
        'Help understanding tenancy rights.',
      ],
      icon: <Home className="h-6 w-6" />,
      group: 'wellbeing',
    },
    {
      id: 'language-services',
      title: 'Language Services',
      description: 'Interpreter services and English language support.',
      features: [
        'Interpreter booking assistance.',
        'English conversation practice.',
        'Connections to language classes.',
      ],
      icon: <Languages className="h-6 w-6" />,
      group: 'community',
    },
  ], []);

  const groupedPrograms = {
    essentials: programs.filter((program) => program.group === 'essentials'),
    wellbeing: programs.filter((program) => program.group === 'wellbeing'),
    community: programs.filter((program) => program.group === 'community'),
  };

  const getAccentClass = (group: Program['group']) => {
    if (group === 'essentials') return 'bg-sky';
    if (group === 'wellbeing') return 'bg-leaf';
    return 'bg-earth';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Card Design Exploration | Mosaic Multicultural Connections</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="Internal card layout exploration for Mosaic, comparing component patterns, spacing, and interaction states to guide future UI decisions."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Card Design Exploration
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Readable Program Presentation Options
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            These are exploration-only layouts focused on readability, clarity, and accessibility for multicultural
            audiences. No production pages were changed.
          </p>
        </header>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold">Option A: Simple Accordion</h2>
            <p className="text-base text-muted-foreground mt-2">
              High-contrast text, larger body copy, and a straightforward click-to-expand pattern.
            </p>
          </div>
          <div className="grid gap-4">
            {programs.map((program) => {
              const isOpen = activeAccordionId === program.id;
              return (
                <div
                  key={program.id}
                  className="rounded-2xl border border-border bg-card px-6 py-4"
                >
                  <button
                    type="button"
                    className="w-full text-left text-lg font-semibold text-foreground flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-expanded={isOpen}
                    onClick={() => setActiveAccordionId(isOpen ? null : program.id)}
                  >
                    <span className="text-sky-700" aria-hidden="true">
                      {program.icon}
                    </span>
                    {program.title}
                  </button>
                  {isOpen && (
                    <div className="mt-4 space-y-4 text-base text-foreground">
                      <p className="text-muted-foreground">{program.description}</p>
                      <ul className="space-y-2">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-sky-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold">Option B: Card Grid + Modal</h2>
            <p className="text-base text-muted-foreground mt-2">
              Scanable cards with a dialog overlay for full details, avoiding hover dependency.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setActiveModal(program)}
                aria-haspopup="dialog"
                className="text-left rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sky-700" aria-hidden="true">
                    {program.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
                </div>
                <p className="mt-3 text-base text-muted-foreground">{program.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-sky-700">View details</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold">Option B2: Responsive Grid</h2>
            <p className="text-base text-muted-foreground mt-2">
              Responsive layout with 1 column on mobile, 2 on tablet, and 4 on desktop for easy scanning.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {programs.map((program) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setActiveModal(program)}
                aria-haspopup="dialog"
                className="h-full text-left rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sky-700" aria-hidden="true">
                    {program.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
                </div>
                <p className="mt-3 text-base text-muted-foreground">{program.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-sky-700">View details</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold">Option B3: Styled Responsive Grid</h2>
            <p className="text-base text-muted-foreground mt-2">
              Responsive grid with the same visual styling, depth, and transitions used on the service pages.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {programs.map((program) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setActiveModal(program)}
                aria-haspopup="dialog"
                className="h-full text-left rounded-2xl border border-border bg-white/80 dark:bg-white/10 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center gap-4">
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getAccentClass(program.group)}`}>
                    <span className="text-white" aria-hidden="true">
                      {program.icon}
                    </span>
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
                </div>
                <p className="mt-3 text-base text-muted-foreground">{program.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-sky-700">View details</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold">Option C: Tabbed Sections</h2>
            <p className="text-base text-muted-foreground mt-2">
              Grouped programs with visible content per category and no hover interaction.
            </p>
          </div>
          <div className="grid gap-3">
            {(['essentials', 'wellbeing', 'community'] as const).map((group) => (
              <div key={group} className="rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {group === 'essentials' && 'Essentials'}
                    {group === 'wellbeing' && 'Wellbeing'}
                    {group === 'community' && 'Community'}
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {groupedPrograms[group].map((program) => {
                    const isOpen = activeListId === program.id;
                    return (
                      <div key={program.id} className="px-6 py-4">
                        <button
                          type="button"
                          className="w-full text-left flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-expanded={isOpen}
                          onClick={() => setActiveListId(isOpen ? null : program.id)}
                        >
                          <span className="mt-1 text-sky-700" aria-hidden="true">
                            {program.icon}
                          </span>
                          <div>
                            <p className="text-lg font-semibold">{program.title}</p>
                            <p className="text-base text-muted-foreground">{program.description}</p>
                          </div>
                        </button>
                        {isOpen && (
                          <ul className="mt-3 space-y-2 text-base">
                            {program.features.map((feature, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-sky-600 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="presentation"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-modal-title"
            aria-describedby="card-modal-desc"
            className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sky-700" aria-hidden="true">
                  {activeModal.icon}
                </span>
                <h3 id="card-modal-title" className="text-xl font-semibold">
                  {activeModal.title}
                </h3>
              </div>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p id="card-modal-desc" className="mt-4 text-base text-muted-foreground">
              {activeModal.description}
            </p>
            <ul className="mt-4 space-y-2 text-base">
              {activeModal.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setActiveModal(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDesignExploration;
