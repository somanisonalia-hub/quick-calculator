import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Quick Calculator',
  description: 'Terms and conditions for using Quick Calculator services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using the Quick Calculator website (quick-calculator.org), you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
              this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on the
              Quick Calculator website for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Engage in any unauthorized access to our systems or networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Disclaimer</h2>
            <p>
              The materials on the Quick Calculator website are provided "as is". Quick Calculator makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall Quick Calculator or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
              use the materials on the Quick Calculator website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Calculator Accuracy</h2>
            <p>
              While we strive to provide accurate calculators and information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All calculations are provided for informational purposes only</li>
              <li>We do not guarantee the accuracy of results</li>
              <li>Results may differ from official calculations due to rounding or other factors</li>
              <li>Users should verify important calculations with official sources</li>
              <li>Quick Calculator is not liable for decisions made based on calculator results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Financial and Legal Disclaimers</h2>
            <p>
              <strong>IMPORTANT:</strong> Quick Calculator is not a substitute for professional financial, legal, or
              medical advice. Our calculators are educational tools only.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Financial calculators do not constitute financial advice</li>
              <li>Health calculators are not medical advice or diagnosis</li>
              <li>Consult with qualified professionals before making important decisions</li>
              <li>Past performance does not guarantee future results</li>
              <li>Market conditions and individual circumstances vary</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Accuracy of Materials</h2>
            <p>
              The materials appearing on the Quick Calculator website could include technical, typographical,
              or photographic errors. Quick Calculator does not warrant that any of the materials on the website
              are accurate, complete, or current. Quick Calculator may make changes to the materials contained
              on the website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Links</h2>
            <p>
              Quick Calculator has not reviewed all of the sites linked to the website and is not responsible for
              the contents of any such linked site. The inclusion of any link does not imply endorsement by Quick Calculator
              of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Modifications</h2>
            <p>
              Quick Calculator may revise these terms of service for the website at any time without notice. By using
              the website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
              where Quick Calculator operates, and you irrevocably submit to the exclusive jurisdiction of the courts
              located in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the website for unlawful purposes or in violation of any laws</li>
              <li>Harass, abuse, or threaten others</li>
              <li>Engage in any form of hacking or unauthorized access</li>
              <li>Collect or track personal information without consent</li>
              <li>Spam or distribute malware</li>
              <li>Attempt to interfere with the proper working of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMISSIBLE BY LAW, QUICK CALCULATOR SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE OF OR INABILITY TO USE
              THE SITE OR SERVICES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              Email: support@quick-calculator.org
            </p>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg mt-8">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> January 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
