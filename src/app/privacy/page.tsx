import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Quick Calculator',
  description: 'Our privacy policy outlines how we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p>
              Quick Calculator ("we", "our", or "us") operates the quick-calculator.org website (the "Site").
              This page informs you of our policies regarding the collection, use, and disclosure of personal data
              when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information Collection and Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Cookies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our Site and to hold certain information.
              Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Advertising Cookies:</strong> Used to display relevant advertisements</li>
              <li><strong>Performance Cookies:</strong> Monitor site performance and user experience</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Log Data</h3>
            <p>
              We collect information that your browser sends whenever you visit our Site ("Log Data").
              This may include your computer's Internet Protocol ("IP") address, browser type, browser version,
              the pages you visit, the time and date of your visit, and other statistics.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3 Calculator Usage</h3>
            <p>
              When you use our calculators, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Which calculators you use</li>
              <li>How often you use them</li>
              <li>Your interaction patterns (not the actual data you input)</li>
            </ul>
            <p className="text-sm text-gray-600 italic mt-2">
              Note: We do NOT store the actual values or sensitive information you enter into calculators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Use of Data</h2>
            <p>Quick Calculator uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Site</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To provide you with news, special offers and general information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet
              or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
              protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Data Protection Rights</h2>
            <p>
              Under GDPR and CCPA, you have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Right to Access:</strong> You have the right to access your personal data</li>
              <li><strong>Right to Rectification:</strong> You have the right to correct inaccurate data</li>
              <li><strong>Right to Erasure:</strong> You have the right to request deletion of your data</li>
              <li><strong>Right to Restrict Processing:</strong> You can limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> You can request your data in portable format</li>
              <li><strong>Right to Object:</strong> You can object to certain processing</li>
              <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookie Management</h2>
            <p>
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Refuse to accept cookies</li>
              <li>Alert you when a cookie is being sent</li>
              <li>Allow you to accept cookies selectively</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Note: If you disable cookies, some features of our Site may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics and advertising:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Google Analytics</li>
              <li>Google AdSense</li>
              <li>Other advertising partners</li>
            </ul>
            <p className="mt-4">
              These services may collect information about your visits to track and analyze usage data.
              Please review their privacy policies for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect
              personally identifiable information from children under 13. If we become aware that we have collected
              personal data from children under 13, we will delete such information immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@quick-calculator.org
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
