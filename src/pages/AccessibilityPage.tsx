import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/ui/PageTransition';

export default function AccessibilityPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Accessibility | Mosaic Multicultural Connections</title>
          <meta
            name="description"
            content="Mosaic website accessibility statement. Our commitment to WCAG 2.1 AA compliance and digital inclusion."
          />
        </Helmet>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Accessibility Statement</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Mosaic Multicultural Connections is committed to ensuring digital accessibility for people of all abilities.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
              <p>
                We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                These guidelines explain how to make web content more accessible for people with disabilities
                and more user-friendly for everyone.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Accessibility Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keyboard navigation support throughout the site</li>
                <li>Skip to main content link for screen reader users</li>
                <li>Descriptive alt text for all meaningful images</li>
                <li>Sufficient color contrast for text readability</li>
                <li>Resizable text up to 200% without loss of functionality</li>
                <li>Clear focus indicators for keyboard users</li>
                <li>Reduced motion support for users who prefer less animation</li>
                <li>Properly labeled form fields and error messages</li>
                <li>External links clearly identified</li>
                <li>Semantic HTML structure for screen readers</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Document Accessibility</h2>
              <p>
                Some documents on our website are provided in PDF format. If you require any document
                in an alternative format, please{' '}
                <Link to="/contact-us" className="text-primary hover:underline">contact us</Link> and
                we will do our best to accommodate your needs.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of our website. If you encounter any
                accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Email: <a href="mailto:info@mosaicmc.org.au" className="text-primary hover:underline">info@mosaicmc.org.au</a></li>
                <li>Phone: <a href="tel:1800813205" className="text-primary hover:underline">1800 813 205</a></li>
                <li>Or use our <Link to="/contact-us" className="text-primary hover:underline">Contact Form</Link></li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Compliance Status</h2>
              <p>
                This website is designed to conform with WCAG 2.1 Level AA standards. We regularly
                review our site to identify and fix accessibility issues.
              </p>

              <p className="text-sm text-gray-500 mt-8">
                Last updated: {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
