import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Alston Analytics',
  description: 'Privacy Policy for Alston Analytics - How we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-deep-void text-soft-clay py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-data-cyan hover:text-stellar-white transition-colors mb-8 font-mono text-sm"
        >
          <span>←</span> Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-stellar-white mb-8 glow-electric">
          Privacy Policy
        </h1>

        <p className="text-soft-clay/60 font-mono text-sm mb-12">
          Last updated: January 2026
        </p>

        <div className="space-y-8 text-soft-clay/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">1. Introduction</h2>
            <p>
              Alston Analytics ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website
              at alstonanalytics.com or engage with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-stellar-white">Contact Information:</strong> Email address, name, and any details you provide through our chat interface or contact forms.</li>
              <li><strong className="text-stellar-white">Payment Information:</strong> When you purchase services, payment processing is handled securely by Stripe. We do not store your full credit card details.</li>
              <li><strong className="text-stellar-white">Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and actions taken.</li>
              <li><strong className="text-stellar-white">Technical Data:</strong> IP address, browser type, device information, and operating system.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process payments and deliver purchased services</li>
              <li>Send you relevant updates about our services (with your consent)</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">4. Data Sharing</h2>
            <p className="mb-4">We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-stellar-white">Service Providers:</strong> Third parties that help us operate our business (e.g., Stripe for payments, Vercel for hosting).</li>
              <li><strong className="text-stellar-white">Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">5. Cookies & Tracking</h2>
            <p>
              We use essential cookies to ensure our website functions properly. We may also use analytics tools
              to understand how visitors use our site. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. All data transmitted to our site is
              encrypted using SSL/TLS technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">7. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">8. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was
              collected, including to satisfy legal, accounting, or reporting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material changes
              by posting the new policy on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">11. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="mt-4 text-data-cyan font-mono">
              <a href="mailto:info@alstonanalytics.com" className="hover:text-stellar-white transition-colors">
                info@alstonanalytics.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-stellar-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-data-cyan hover:text-stellar-white transition-colors font-mono text-sm"
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
