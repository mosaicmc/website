import { Helmet } from "react-helmet-async";
import { FileWarning, ShieldCheck, Scale, AlertTriangle } from "lucide-react";
import Section from "@/components/ui/Section";
import { PolicyPageFooter } from "@/components/policies/PolicyPageFooter";

export default function WhistleblowerPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Whistleblower Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="How to report misconduct safely at Mosaic, protections provided, and investigation process."
        />
      </Helmet>

      <Section padding="lg" containerClassName="max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight">Whistleblower Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Guidance for reporting misconduct, ensuring confidentiality, and protections against retaliation.
          </p>
        </div>

        <div className="grid gap-6">
          {/* What is Reportable */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileWarning className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Reportable Concerns</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Fraud, corruption, or serious misconduct.</li>
              <li>Risks to health, safety, or the public.</li>
              <li>Breach of law or Mosaic policies.</li>
            </ul>
          </div>

        {/* Protections */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Protections</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Confidential reporting channels and anonymity options.</li>
              <li>No retaliation for good-faith reports.</li>
              <li>Support available throughout the process.</li>
            </ul>
          </div>

          {/* Investigation */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Investigation Process</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Prompt assessment of reports and triage.</li>
              <li>Evidence-based investigation respecting confidentiality.</li>
              <li>Findings inform corrective actions and improvements.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If you or someone else is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>
        </div>

        <PolicyPageFooter policyKey="whistleblower" policyName="Whistleblower Policy" />
      </Section>
    </div>
  );
}
