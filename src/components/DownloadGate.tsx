import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const downloadSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type DownloadFormValues = z.infer<typeof downloadSchema>;

type DownloadGateProps = {
  downloadUrl: string;
  resourceLabel: string;
  children: (openForm: () => void) => React.ReactNode;
};

export function DownloadGate({ downloadUrl, resourceLabel, children }: DownloadGateProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const triggerDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
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
      if (!downloadUrl) {
        setSubmitError('We could not start your download. Please try again.');
        return;
      }
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
            downloadUrl,
            location: pageLocation,
            device,
          }),
        });
      } catch {
        setSubmitError('We could not record your details, but the download will continue.');
      }

      triggerDownload(downloadUrl);
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
      {showForm && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Please fill in your details to download {resourceLabel}.
          </p>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input autoComplete="given-name" inputMode="text" {...field} />
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
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input autoComplete="family-name" inputMode="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" inputMode="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {submitError && <p className="text-sm text-destructive">{submitError}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting ? 'Preparing download…' : 'Submit and download'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
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
        </div>
      )}
    </div>
  );
}
