import { Helmet } from "react-helmet-async";
import { ClipboardList, CheckCircle2, Layers, AlertTriangle } from "lucide-react";
import { PolicyPageFooter } from "@/components/policies/PolicyPageFooter";

export default function QualityManagementPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Quality Management Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Mosaic quality management framework. Our commitment to continuous improvement and service excellence."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Quality Management Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Our commitment to safe, effective, and culturally responsive services through quality assurance and
            continuous improvement.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Standards & Framework */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Layers className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Standards & Framework</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Alignment to relevant national standards and Mosaic policies.</li>
              <li>Documented procedures support consistent, safe delivery.</li>
            </ul>
          </div>

          {/* Assurance & Monitoring */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Assurance & Monitoring</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Regular audits, feedback collection and incident review.</li>
              <li>Corrective actions tracked to resolution.</li>
            </ul>
          </div>

          {/* Continuous Improvement */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Continuous Improvement</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Data-informed changes and periodic policy reviews.</li>
              <li>Staff training maintains competence and cultural safety.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If you or someone else is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>
        </div>

        <PolicyPageFooter policyKey="quality-management" policyName="Quality Management Policy" />
      </section>
    </div>
  );
}
