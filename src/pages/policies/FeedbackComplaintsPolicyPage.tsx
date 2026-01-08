import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MessageCircle, HeartHandshake, FileText, Ear, Clock, ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";

export default function FeedbackComplaintsPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Feedback and Complaints Policy | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="How to provide feedback or make a complaint about Mosaic’s services, and how we will handle it."
        />
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Feedback and Complaints Policy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Your opinion matters to us. We want to hear what you think about our services and the way our staff work with you.
          </p>
        </div>

        <div className="grid gap-6">
          {/* What this policy is about */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <HeartHandshake className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">What this policy is about</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Everyone who uses our services or engages with us has the right to give us their honest feedback. This helps us understand what we’re doing well and where we can improve. We can learn to do things in different and better ways.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>We love to hear compliments and other positive feedback, and we also want to hear when things don’t meet your expectations.</li>
              <li>We want you to know that when you share your concerns or make a complaint we will always listen carefully.</li>
              <li>We will always treat you with understanding and respect.</li>
              <li>Making a complaint will not affect the service we offer you.</li>
              <li>We will always keep your information private and confidential. We will follow our Privacy Policy.</li>
            </ul>
          </div>

          {/* How can you make a complaint */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">How can you make a complaint?</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span>You can make your complaint through our online form: <a href="https://forms.mosaicmc.org.au/Feedback" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mosaic Portal</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>You can also email us: <a href="mailto:feedback@mosaicmc.org.au" className="text-primary hover:underline">feedback@mosaicmc.org.au</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>Or call us: <a href="tel:1800813205" className="text-primary hover:underline">1800 813 205</a></span>
              </li>
            </ul>
            <p className="mt-4 text-sm font-medium">Who can provide us with feedback or make a complaint?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              If you are not happy with a service and you want to speak to the person, it is a good first step. If you do not want to speak with the person you can make a complaint using our online form.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              You can use your name when you make a complaint. If you don’t want to use your name, you can choose another name (pseudonym) or you can choose not to give any name (be anonymous). If you do not use your name, we might not be able to give a full response to your complaint.
            </p>
          </div>

          {/* What can you complain about */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">What can you complain about?</h2>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>You can make a complaint about any of our services or activities or how we do things.</li>
              <li>You can make a complaint about how our staff work with you.</li>
              <li>You can make a complaint when the things we do don’t meet your expectations.</li>
            </ul>
            <p className="mt-4 text-sm font-medium">When can you make a complaint?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You can make a complaint whenever you choose to. If you want, it is a good idea to try to talk to the person you have a problem with first. If talking does not fix the problem or you do not want to talk to the person, you can make a formal complaint.
            </p>
          </div>

          {/* What do I say in the complaint */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Ear className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">What do I say in the complaint?</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              To help us understand your concerns, you can tell us:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>What the feedback is about. Provide some details to help us understand.</li>
              <li>What happened, when it happened, where it happened and who was involved, and the names of people who also saw it happen.</li>
              <li>Tell us about a decision made by Mosaic that you are unhappy with.</li>
              <li>How you think the problem can be fixed or the outcome you want to happen.</li>
              <li>Any other information which you think will help us understand the situation and how you feel.</li>
            </ul>
          </div>

          {/* How complaints are handled */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">How complaints are handled</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>How will Mosaic record the complaint?</strong><br />
              We keep accurate records of all formal complaints, including what we did and what happened in the end. Only the people who need to know about the complaint and support the investigation into your complaint will be able to see the information.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>What will happen when I make a complaint?</strong><br />
              After you make a complaint, one of our team will get in touch to explain next steps and how long it might take. They will give you other resources and useful information about our complaints process.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              We aim to resolve all complaints quickly. Sometimes we need to spend more time finding out what happened, or working out how to prevent something happening again. We will keep you informed as we do this work.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>How will Mosaic respond to your complaint?</strong><br />
              We will always:
            </p>
            <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
              <li>Treat your complaint seriously.</li>
              <li>Act quickly.</li>
              <li>Treat everyone fairly and with respect.</li>
            </ul>
            <p className="mt-1 text-sm text-muted-foreground">
              We will never:
            </p>
            <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
              <li>Change the way we support you if you make a complaint.</li>
            </ul>
          </div>

          {/* What else can happen */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">What to do if you are not satisfied</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              If you are not happy with how we have responded to your complaint you can make a complaint to government regulators:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
              <li>
                For aged care complaints: <a href="https://www.agedcarequality.gov.au/making-complaint" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Aged Care Quality and Safety Commission</a> (1800 951 822)
              </li>
              <li>
                For complaints about how Mosaic has handled your private information: <a href="https://www.oaic.gov.au/privacy/privacy-complaints" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Office of the Australian Information Commissioner (OAIC)</a>
              </li>
              <li>
                For other complaints: <a href="https://www.ombo.nsw.gov.au/complaints" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NSW Ombudsman</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/company/knowledge-base"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-base font-medium shadow-sm hover:shadow-md hover:bg-muted transition-colors text-foreground focus:outline-none focus:ring-2 ring-ocean ring-offset-2 ring-offset-background"
          >
            Back to Knowledge Base
          </Link>
        </div>
      </section>
    </div>
  );
}
