"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation, Trans } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const title = "Contact Form";

const buildFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, {
      message: t('contact.form.validation.nameMin'),
    }),
    email: z
      .email({
        error: t('contact.form.validation.emailInvalid'),
      })
      .min(1, {
        error: t('contact.form.validation.emailRequired'),
      }),
    service: z.string().min(1, {
      message: t('contact.form.validation.serviceRequired'),
    }),
    location: z.string().min(1, {
      message: t('contact.form.validation.locationRequired'),
    }),
    message: z.string().min(10, {
      message: t('contact.form.validation.messageMin'),
    }),
  });

const Example = () => {
  const { t } = useTranslation();
  const formSchema = buildFormSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      location: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const to = "info@mosaicmc.org.au";
    const subject = `Website inquiry — ${values.service} (${values.location})`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Service: ${values.service}`,
      `Preferred Office: ${values.location}`,
      "",
      "Message:",
      values.message,
    ].join("\n");
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form className="space-y-4 text-left" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{t('contact.form.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('contact.form.intro')}</p>
            <p className="text-sm text-muted-foreground">
              <Trans
                i18nKey="contact.form.responseTime"
                components={{ strong: <span className="font-semibold" /> }}
              />
            </p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">{t('contact.form.fields.name')}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2"
                    placeholder="John Doe"
                    aria-describedby="contact-name-desc"
                    {...field}
                  />
                </FormControl>
                <FormDescription id="contact-name-desc">{t('contact.form.descriptions.name')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">{t('contact.form.fields.email')}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2"
                    placeholder="you@example.com"
                    type="email"
                    aria-describedby="contact-email-desc"
                    {...field}
                  />
                </FormControl>
                <FormDescription id="contact-email-desc">{t('contact.form.descriptions.email')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left">{t('contact.form.fields.service')}</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                        <SelectTrigger aria-describedby="contact-service-desc" className="bg-background w-full focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2">
                          <SelectValue placeholder={t('contact.form.fields.serviceOptions.select')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="settlement">{t('contact.form.fields.serviceOptions.settlement')}</SelectItem>
                        <SelectItem value="aged-care">{t('contact.form.fields.serviceOptions.agedCare')}</SelectItem>
                        <SelectItem value="family">{t('contact.form.fields.serviceOptions.familySupport')}</SelectItem>
                        <SelectItem value="community">{t('contact.form.fields.serviceOptions.communityEngagement')}</SelectItem>
                        <SelectItem value="volunteer">{t('contact.form.fields.serviceOptions.volunteer')}</SelectItem>
                        <SelectItem value="general">{t('contact.form.fields.serviceOptions.general')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription id="contact-service-desc">{t('contact.form.descriptions.service')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left">{t('contact.form.fields.location')}</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                        <SelectTrigger aria-describedby="contact-location-desc" className="bg-background w-full focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2">
                          <SelectValue placeholder={t('contact.form.fields.locationOptions.select')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="newcastle">{t('contact.form.fields.locationOptions.newcastle')}</SelectItem>
                        <SelectItem value="central-coast">{t('contact.form.fields.locationOptions.centralCoast')}</SelectItem>
                        <SelectItem value="armidale">{t('contact.form.fields.locationOptions.armidale') ?? 'Armidale'}</SelectItem>
                        <SelectItem value="tamworth">{t('contact.form.fields.locationOptions.tamworth') ?? 'Tamworth'}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription id="contact-location-desc">{t('contact.form.descriptions.location')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">{t('contact.form.fields.message')}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-background focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2"
                    placeholder={t('contact.form.fields.placeholders.message')}
                    rows={5}
                    aria-describedby="contact-message-desc"
                    {...field}
                  />
                </FormControl>
                <FormDescription id="contact-message-desc">{t('contact.form.descriptions.message')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2" type="submit">
            {t('contact.form.submit')}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            {t('contact.form.privacyNote')}
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Example;
