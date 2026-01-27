import { Helmet } from "react-helmet-async";
import { Users, HeartHandshake, Globe, AlertTriangle } from "lucide-react";
import { PolicyPageFooter } from "@/components/policies/PolicyPageFooter";

export default function DiversityInclusionPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mosaic Diversity & Inclusion Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Mosaic's commitment to diversity and inclusion. Our policies supporting multicultural communities and equal opportunity."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Diversity & Inclusion Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Mosaic celebrates diversity and fosters inclusion. This summary outlines our commitment, responsibilities, and
            how to raise concerns.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Commitment */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <HeartHandshake className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Our Commitment</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Promote equitable access and culturally safe services.</li>
              <li>Eliminate discriminatory practices and systemic barriers.</li>
              <li>Support diverse identities across staff, volunteers and clients.</li>
            </ul>
          </div>

          {/* Principles */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Principles</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Respect, dignity and inclusion guide all interactions.</li>
              <li>Accessibility and language support are prioritised.</li>
              <li>Zero tolerance for discrimination and harassment.</li>
            </ul>
          </div>

          {/* Responsibilities & Reporting */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Responsibilities & Reporting</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Everyone shares responsibility for inclusion. If you experience or witness exclusionary behaviour or
              discrimination, report it promptly.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Speak with your manager or HR in the first instance.</li>
              <li>Use our formal reporting process for serious concerns.</li>
              <li>Protection from retaliation is provided under relevant policies.</li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                If you or someone else is in immediate danger, call <a className="text-primary hover:underline" href="tel:000">000</a>.
              </span>
            </div>
          </div>

          {/* Review */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Policy Review</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This policy is reviewed regularly to ensure it remains current and effective.
            </p>
          </div>
        </div>

        <PolicyPageFooter policyKey="diversity-inclusion" policyName="Diversity & Inclusion Policy" />
      </section>
    </div>
  );
}
