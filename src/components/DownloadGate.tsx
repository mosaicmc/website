"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { DOWNLOAD_CATEGORIES, DownloadCategory } from '@/lib/constants';

const downloadSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export type DownloadFormValues = z.infer<typeof downloadSchema>;

type DownloadGateProps = {
  downloadUrl: string;
  resourceLabel: string;
  resourceTypeLabel?: string;
  category?: DownloadCategory;
  onCustomSubmit?: (values: DownloadFormValues) => Promise<void>;
  children: (openForm: () => void) => React.ReactNode;
};

export function DownloadGate({
  downloadUrl,
  resourceLabel,
  resourceTypeLabel = 'brochure',
  category = DOWNLOAD_CATEGORIES.BROCHURE,
  onCustomSubmit,
  children,
}: DownloadGateProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useTranslation();

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const triggerDownload = (url: string) => {
    // Decode first to ensure we have the raw string, then encode properly
    // This handles both raw paths (with spaces) and already encoded paths
    const decodedUrl = decodeURI(url);
    const safeUrl = encodeURI(decodedUrl);
    
    const link = document.createElement('a');
    link.href = safeUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = ''; // Add download attribute to force download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDeviceType = (): string => {
    if (typeof window === 'undefined') return 'unknown';
    const ua = window.navigator.userAgent || '';
    const width = window.innerWidth || 0;
    if (/Mobi|Android/i.test(ua) || width < 640) return 'mobile';
    if (/Tablet|iPad/i.test(ua) || (width >= 640 && width < 1024)) return 'tablet';
    return 'desktop';
  };

  const onSubmit = async (values: DownloadFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (onCustomSubmit) {
        await onCustomSubmit(values);
      } else {
        if (!downloadUrl) {
          setSubmitError('We could not start your download. Please try again.');
          return;
        }
        const safeUrl = decodeURI(downloadUrl); // Use decoded URL for logging to be safe
        const pageLocation =
          typeof window !== 'undefined' && window.location ? window.location.href : '';
        const device = getDeviceType();

        try {
          await fetch('/api/download-gate-log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              resourceLabel,
              downloadUrl: safeUrl,
              category,
              location: pageLocation,
              device,
            }),
          });
        } catch {
          setSubmitError('We could not record your details, but the download will continue.');
        }

        triggerDownload(safeUrl);
      }
      form.reset();
      setShowForm(false);
    } catch {
      setSubmitError('We could not start your download. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {children(() => setShowForm(true))}
      <Sheet open={showForm} onOpenChange={(open) => {
        setShowForm(open);
        if (!open) {
          setSubmitError(null);
        }
      }}>
        <SheetContent side="right" className="w-full max-w-[420px] bg-white dark:bg-slate-900 border-l border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              Download {resourceTypeLabel.charAt(0).toUpperCase() + resourceTypeLabel.slice(1)}
            </SheetTitle>
            <SheetDescription>
              Please fill in your details to download {resourceLabel}.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              className="mt-6 space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              aria-describedby={submitError ? "downloadgate-error" : undefined}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dg_firstName">{t('form.firstName')}</FormLabel>
                    <FormControl>
                      <Input id="dg_firstName" autoComplete="given-name" inputMode="text" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dg_lastName">{t('form.lastName')}</FormLabel>
                    <FormControl>
                      <Input id="dg_lastName" autoComplete="family-name" inputMode="text" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dg_email">{t('form.email')}</FormLabel>
                    <FormControl>
                      <Input id="dg_email" type="email" autoComplete="email" inputMode="email" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {submitError && (
                <p
                  id="downloadgate-error"
                  role="alert"
                  aria-live="polite"
                  className="text-sm text-destructive"
                >
                  {submitError}
                </p>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ocean text-white hover:bg-ocean/90"
                >
                  {submitting ? 'Preparing download…' : 'Submit and download'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setShowForm(false);
                    setSubmitError(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
