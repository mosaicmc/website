"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .email({
      error: "Please enter a valid email address.",
    })
    .min(1, {
      error: "Email is required.",
    }),
  service: z.string().min(1, {
    message: "Please select a service.",
  }),
  location: z.string().min(1, {
    message: "Please select an office.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Example = () => {
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
            <h2 className="text-2xl font-bold">Contact us</h2>
            <p className="text-sm text-muted-foreground">
              Use the form below to ask a question, request support, or connect with a local Mosaic office. Our team will respond within <span className="font-semibold">48 business hours</span>.
            </p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please enter your full name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-left">Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2"
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>We’ll use this email to reply to your enquiry.</FormDescription>
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
                  <FormLabel className="text-left">Service interest</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                        <SelectTrigger className="bg-background w-full focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="settlement">Settlement Support</SelectItem>
                        <SelectItem value="aged-care">Home Care Services</SelectItem>
                        <SelectItem value="family">Family Support</SelectItem>
                        <SelectItem value="community">Community Engagement</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the service you’re enquiring about so we can direct your message to the right team.</FormDescription>
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
                  <FormLabel className="text-left">Preferred office</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                        <SelectTrigger className="bg-background w-full focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2">
                          <SelectValue placeholder="Select an office" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="newcastle">Newcastle</SelectItem>
                        <SelectItem value="central-coast">Central Coast</SelectItem>
                        <SelectItem value="armidale">Armidale</SelectItem>
                        <SelectItem value="tamworth">Tamworth</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose the office closest to you, or the location you’d like to connect with.</FormDescription>
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
                <FormLabel className="text-left">Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none bg-background focus-visible:ring-ocean focus-visible:border-ocean focus-visible:ring-offset-2"
                    placeholder="How can we help you?"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Tell us a little about your situation or enquiry. The more detail you provide, the better we can help.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2" type="submit">
            Send Message
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Your information is kept private and shared only with the Mosaic team supporting your request.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Example;
