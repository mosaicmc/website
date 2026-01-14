import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

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

const POLICY_PDFS: Record<PolicyKey, string> = {
  "code-of-conduct": "/Policies%20PDFs/Mosaic%20Code%20of%20Conduct.pdf",
  "diversity-inclusion": "/Policies%20PDFs/Mosaic%20Diversity%20and%20Inclusion%20Policy%20.pdf",
  "feedback-complaints": "/Policies%20PDFs/Mosaic%20Feedback%20and%20Complaints%20Policy%20.pdf",
  "privacy": "/Policies%20PDFs/Mosaic%20Privacy%20Policy.pdf",
  "quality-management": "/Policies%20PDFs/Mosaic%20Quality%20Management%20Policy%20.pdf",
  "whistleblower": "/Policies%20PDFs/Mosaic%20Whistleblower%20Policy%20.pdf",
  "work-health-safety": "/Policies%20PDFs/Mosaic%20Work%20Health%20and%20Safety%20Policy.pdf",
  "child-safety": "/Policies%20PDFs/Plain%20English-Child%20Safety%20Policy.pdf",
};

export function PolicyPageFooter({ policyKey, policyName }: PolicyPageFooterProps) {
  const pdfHref = POLICY_PDFS[policyKey];

  return (
    <>
      <p className="mt-8 text-xs text-muted-foreground">
        This page summarises Mosaic&apos;s {policyName}. For detailed procedures, please write to{" "}
        <a href="mailto:info@mosaicmc.org.au" className="text-primary hover:underline">
          info@mosaicmc.org.au
        </a>
        .
      </p>
      <div className="mt-6 flex items-center justify-between">
        <Link
          to="/company/knowledge-base"
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-base font-medium shadow-sm hover:shadow-md hover:bg-muted transition-colors text-foreground focus:outline-none focus:ring-2 ring-ocean ring-offset-2 ring-offset-background"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Knowledge Base
        </Link>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm shadow-sm hover:shadow-md transition"
        >
          Download full policy (PDF)
        </a>
      </div>
    </>
  );
}

