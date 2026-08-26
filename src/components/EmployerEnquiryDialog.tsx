"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EMPLOYER_EMAIL = "M.Narayanamurthy@mosaicmc.org.au";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  organisation: z.string().min(2, { message: "Please enter your organisation's name." }),
  website: z.string().min(1, { message: "Please enter your organisation's website." }),
  industry: z.string().min(2, { message: "Please enter your industry." }),
  role: z.string().min(2, { message: "Please enter your role." }),
  message: z
    .string()
    .min(10, { message: "Please tell us a little more about how you'd like to partner with us." }),
});

type FormValues = z.infer<typeof formSchema>;

interface EmployerEnquiryDialogProps {
  trigger: React.ReactNode;
}

export function EmployerEnquiryDialog({ trigger }: EmployerEnquiryDialogProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organisation: "",
      website: "",
      industry: "",
      role: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    const subject = `HARVEST Employer Enquiry — ${values.organisation}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone number: ${values.phone}`,
      `Organisation: ${values.organisation}`,
      `Website: ${values.website}`,
      `Industry: ${values.industry}`,
      `Role: ${values.role}`,
      "",
      "How they'd like to partner with us:",
      values.message,
    ].join("\n");
    const mailto = `mailto:${EMPLOYER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Employer Enquiries</DialogTitle>
          <DialogDescription>
            Tell us a bit about your organisation and how you&apos;d like to partner with HARVEST.
            We&apos;ll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane.smith@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="0400 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Organisation</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Farms Pty Ltd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="Agriculture & Food Processing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="HR Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you like to partner with us?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your organisation, roles you're looking to fill, and how you'd like to work with HARVEST..."
                      rows={5}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Mail className="h-4 w-4 me-2" />
              Send Enquiry
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
