"use client";

import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { TrackedDownloadButton } from "@/components/TrackedDownloadButton";
import { PDFAccessibilityNotice } from '@/components/ui/PDFAccessibilityNotice';

type PolicyKey =
  | "code-of-conduct"
  | "diversity-inclusion"
  | "feedback-complaints"
  | "privacy"
  | "quality-management"
  | "whistleblower"
  | "work-health-safety"
  | "child-safety";

type PolicyPageFooterProps = {
  policyKey: PolicyKey;
  policyName: string;
};

const POLICY_IDS: Record<PolicyKey, string> = {
  "code-of-conduct": "policy-code-of-conduct",
  "diversity-inclusion": "policy-diversity-inclusion",
  "feedback-complaints": "policy-feedback-complaints",
  "privacy": "policy-privacy",
  "quality-management": "policy-quality-management",
  "whistleblower": "policy-whistleblower",
  "work-health-safety": "policy-whs",
  "child-safety": "policy-child-safety",
};

export function PolicyPageFooter({ policyKey, policyName }: PolicyPageFooterProps) {
  const downloadId = POLICY_IDS[policyKey];

  return (
    <>
      <p className="mt-8 mb-8 text-sm text-muted-foreground">
        This page summarises Mosaic&apos;s {policyName}. For detailed procedures, please write to{" "}
        <a href="mailto:info@mosaicmc.org.au" className="text-primary hover:underline">
          info@mosaicmc.org.au
        </a>
        .
      </p>
      <div className="flex w-full flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/company/knowledge-base"
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md hover:bg-muted transition-colors text-foreground focus:outline-none focus:ring-2 ring-ocean ring-offset-2 ring-offset-background"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Knowledge Base
        </Link>
        <div className="sm:ml-auto text-right">
          <TrackedDownloadButton
            downloadId={downloadId}
            className="inline-flex items-center gap-2 rounded-lg bg-ocean px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-ocean/90 transition focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
          >
            Download full policy (PDF)
          </TrackedDownloadButton>
          <PDFAccessibilityNotice className="mt-2" />
        </div>
      </div>
    </>
  );
}
