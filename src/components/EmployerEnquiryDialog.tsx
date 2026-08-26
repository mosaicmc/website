"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const HUBSPOT_EMBED_SCRIPT_SRC = "//js-ap1.hsforms.net/forms/embed/v2.js";
const HUBSPOT_REGION = "ap1";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
        }) => void;
      };
    };
  }
}

interface EmployerEnquiryDialogProps {
  trigger: React.ReactNode;
  hubspotPortalId: string;
  hubspotFormId: string;
}

let hubspotScriptPromise: Promise<void> | null = null;

function loadHubspotScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hbspt) return Promise.resolve();
  if (hubspotScriptPromise) return hubspotScriptPromise;

  hubspotScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[src="${HUBSPOT_EMBED_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load HubSpot form script")));
      return;
    }
    const script = document.createElement("script");
    script.src = HUBSPOT_EMBED_SCRIPT_SRC;
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load HubSpot form script"));
    document.body.appendChild(script);
  });

  return hubspotScriptPromise;
}

export function EmployerEnquiryDialog({
  trigger,
  hubspotPortalId,
  hubspotFormId,
}: EmployerEnquiryDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const containerId = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  React.useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setStatus("loading");

    loadHubspotScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        window.hbspt?.forms.create({
          portalId: hubspotPortalId,
          formId: hubspotFormId,
          region: HUBSPOT_REGION,
          target: `#${containerId}`,
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [open, hubspotPortalId, hubspotFormId, containerId]);

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
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Loading form&hellip;</span>
          </div>
        )}
        {status === "error" && (
          <p className="py-6 text-center text-sm text-destructive">
            We couldn&apos;t load the enquiry form. Please refresh and try again, or email us
            directly.
          </p>
        )}
        <div id={containerId} ref={containerRef} className={status === "loading" ? "sr-only" : ""} />
      </DialogContent>
    </Dialog>
  );
}
