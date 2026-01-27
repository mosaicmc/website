import { Helmet } from "react-helmet-async";
import { ShieldCheck, Heart, AlertTriangle, UserCheck, FileText } from "lucide-react";
import { PolicyPageFooter } from "@/components/policies/PolicyPageFooter";

export default function ChildSafetyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Child Safety Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Mosaic Child Safety Policy. Our commitment to protecting children and young people in all our programs."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Child Safety Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Mosaic Multicultural Connections is committed to being a Child Safe Organisation. We prioritise the safety, wellbeing, and empowerment of all children and young people.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Commitment */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Our Commitment</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We have zero tolerance for child abuse. We are dedicated to creating environments where children feel safe, respected, and heard.
            </p>
            <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
              <li>We uphold the rights of the child at all times.</li>
              <li>We support the active participation of children in decisions that affect them.</li>
              <li>We respect diversity in cultures and child-rearing practices while keeping safety paramount.</li>
              <li>We are committed to the cultural safety of Aboriginal and Torres Strait Islander children.</li>
            </ul>
          </div>

          {/* Expected Conduct */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Conduct with Children</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              All staff, volunteers, and contractors must adhere to our Child Safety Code of Conduct, which includes:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
              <li>Treating children with respect, dignity, and kindness.</li>
              <li>Ensuring all interactions are observable and professional.</li>
              <li>Not engaging in any behaviour that is physically, emotionally, or sexually abusive.</li>
              <li>Never exchanging personal contact details or engaging with children on personal social media.</li>
              <li>Obtaining proper consent for any photography or recording.</li>
            </ul>
          </div>

          {/* Reporting */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Reporting Concerns</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Everyone is responsible for reporting suspected abuse or safety concerns.
            </p>
            <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
              <li>If a child is in immediate danger, call <a href="tel:000" className="text-primary hover:underline font-medium">000</a>.</li>
              <li>Report all concerns, allegations, or disclosures to the Child Safety Officer or Manager immediately.</li>
              <li>Mosaic will take all reports seriously and respond in accordance with our reporting procedures and legal obligations.</li>
              <li>We maintain confidentiality and support those who raise concerns in good faith.</li>
            </ul>
          </div>

          {/* Recruitment & Training */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Recruitment & Training</h2>
            </div>
            <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
              <li>All roles involving children require a valid Working With Children Check (WWCC).</li>
              <li>We conduct thorough reference checks and screening.</li>
              <li>Staff and volunteers receive induction and ongoing training on child safety and mandatory reporting.</li>
            </ul>
          </div>

          {/* Policy Review */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Review & Governance</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              This policy is reviewed annually or after any significant incident to ensure compliance with the Child Safe Standards and relevant legislation.
            </p>
          </div>
        </div>

        <PolicyPageFooter policyKey="child-safety" policyName="Child Safety Policy" />
      </section>
    </div>
  );
}
