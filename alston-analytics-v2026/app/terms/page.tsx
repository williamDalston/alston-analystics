import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Alston Analytics',
  description: 'Terms of Service for Alston Analytics - Terms and conditions for using our services.',
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <p className="text-soft-clay/60 font-mono text-sm mb-12">
          Last updated: January 2026
        </p>

        <div className="space-y-8 text-soft-clay/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Alston Analytics website and services ("Services"), you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">2. Services Description</h2>
            <p className="mb-4">Alston Analytics provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Strategic consulting services</li>
              <li>Power BI architecture and dashboard development</li>
              <li>Data analytics assessments and health checks</li>
              <li>Executive training and frameworks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">3. Purchases and Payments</h2>
            <p className="mb-4">For paid services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments are processed securely through Stripe.</li>
              <li>Prices are displayed in USD unless otherwise specified.</li>
              <li>Payment is required in full before service delivery begins.</li>
              <li>You agree to provide accurate billing information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">4. Refund Policy</h2>
            <p>
              For assessment and consulting services, refunds may be requested within 7 days of purchase if
              the service has not yet been delivered. Once work has commenced or deliverables have been
              provided, refunds are handled on a case-by-case basis. Please contact us at
              info@alstonanalytics.com to discuss any concerns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, and software, is the property
              of Alston Analytics and is protected by intellectual property laws.
            </p>
            <p>
              For custom deliverables created for clients (dashboards, reports, etc.), ownership rights
              will be specified in individual service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">6. User Responsibilities</h2>
            <p className="mb-4">When using our Services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Use the Services only for lawful purposes</li>
              <li>Not attempt to interfere with or disrupt the Services</li>
              <li>Not reverse engineer or copy our proprietary methods</li>
              <li>Maintain the confidentiality of any credentials provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">7. Confidentiality</h2>
            <p>
              We treat all client data and business information as confidential. We will not disclose
              your proprietary information to third parties without your consent, except as required
              by law or as necessary to provide our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Alston Analytics shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your
              use of our Services. Our total liability shall not exceed the amount you paid for
              the specific service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">9. Disclaimer of Warranties</h2>
            <p>
              Our Services are provided "as is" without warranties of any kind, either express or
              implied. While we strive to provide accurate and helpful insights, we do not guarantee
              specific business outcomes or results from our consulting services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Alston Analytics from any claims, damages,
              or expenses arising from your use of our Services or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Services at any time
              for violation of these Terms or for any other reason at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">13. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Continued use of our Services after changes
              constitutes acceptance of the modified Terms. Material changes will be communicated
              through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stellar-white mb-4">14. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
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
