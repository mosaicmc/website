import { Helmet } from "react-helmet-async";
import { Lock, FileText, Share2, ShieldAlert, Mail, Building } from "lucide-react";
import { PolicyPageFooter } from "@/components/policies/PolicyPageFooter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="How Mosaic collects, uses, and protects your personal information in accordance with Australian privacy laws."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Mosaic recognises and respects your right to privacy, dignity and confidentiality. This policy outlines how we collect, use and protect your personal information.
          </p>
        </div>

        <div className="grid gap-6">
          {/* What this policy is about */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">What this policy is about</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              There are laws to protect your personal information. Mosaic follows those laws. We will keep your information private. This means we will not tell people about your information unless you give us permission, or the law tells us to.
            </p>
          </div>

          {/* What information we collect */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">What information we collect</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We collect information from you to help us assist and support you and provide the services you ask for. We get information about things such as:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Your name, address and contact details.</li>
              <li>Your health and other medical information including your Medicare number.</li>
              <li>Financial information such as your income or your pension details.</li>
              <li>Case notes done by our workers.</li>
              <li>Information about the services and supports we provide to you.</li>
            </ul>
            <p className="mt-3 text-sm font-medium">
              Please tell us if you don’t want to share some information with us.
            </p>
          </div>

          {/* How we get your information */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Share2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">How we get your information</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Most of the time we ask you directly for your information, or by phoning you, or by email.</li>
              <li>We get information about you when you visit our website or Facebook or other social media.</li>
              <li>We will always tell you how we are going to use your information.</li>
              <li>When you give us consent or permission, we can get information about you from other people too.</li>
            </ul>
          </div>

          {/* How we use your information */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">How we use your information</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We only use your information for the reason or purpose you gave permission for. This is usually to provide you with the assistance, services and supports you ask for. If we need to use it for something else, we must ask for your permission first.
            </p>
          </div>

          {/* How and when we share your information */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">How and when we share your information</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Sometimes we need to give information about you to a Government Agency. If we can, we remove anything that can identify you.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sometimes we will need to give your information to someone else without your permission. This happens when:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>The law tells us to do so.</li>
              <li>We believe that it is to stop you or someone else from getting hurt or dying.</li>
              <li>To find you if you get lost.</li>
            </ul>
          </div>

          {/* Australian laws protect your privacy */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Australian laws protect your privacy</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              In Australia, we have laws about privacy and confidentiality. These laws require us to:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>Keep all information we have about you safe.</li>
              <li>Tell you what we are going to use your information for.</li>
              <li>Allow you to see your information and change it when you ask us to.</li>
              <li>Ask you to tell us if you are not happy with the way we have used your information.</li>
            </ul>
          </div>

          {/* When you want to complain */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">When you want to complain about how we use your information</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              If you feel that we have not kept your information private, you can send us a complaint:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>By visiting our website and completing the complaint form: <a href="https://forms.mosaicmc.org.au/Feedback" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mosaic Portal</a></li>
              <li>Send us an email to <a href="mailto:info@mosaicmc.org.au" className="text-primary hover:underline">info@mosaicmc.org.au</a></li>
              <li>Call us on the phone <a href="tel:0249693399" className="text-primary hover:underline">02 4969 3399</a></li>
              <li>Talk to one of our workers</li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              If you are not happy with the way we have helped you with your complaint, you can complain to the <a href="http://www.oaic.gov.au/consumer-data-right/consumer-data-right-complaints/how-to-make-a-consumer-data-right-complaint" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Australian Information Commissioner (OAIC)</a>.
            </p>
          </div>
        </div>

        <PolicyPageFooter policyKey="privacy" policyName="Privacy Policy" />
      </section>
    </div>
  );
}
