"use client";

export default function PolicyPage() {
  return (
    <div className="bg-white px-4 py-6  mb-12 text-gray-800">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">Privacy Policy</h1>
      <p className="mb-6">At Wahid Foundation, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, store, and use your data.</p>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Information We Collect</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>Full name, phone number, email address</li>
            <li>PAN Card Number (mandatory for Indian donors under tax regulations)</li>
            <li>Donation details (amount, frequency, method—note: no card or banking data is stored)</li>
            <li>Location or IP address (for analytics and fraud prevention)</li>
            <li>Any data submitted via contact or beneficiary forms</li>
          </ul>
        </li>
        <li>
          <strong>How We Use Your Information</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>Process donations and issue receipts</li>
            <li>Meet legal and regulatory requirements</li>
            <li>Share impact updates, newsletters, and reports</li>
            <li>Communicate project-related information and respond to queries</li>
            <li>Improve our website and engagement based on anonymized analytics</li>
          </ul>
        </li>
        <li>
          <strong>Zakat Compliance</strong>
          <p className="mt-1 ml-4">Zakat donations are tracked and managed separately. We verify eligibility of Zakat beneficiaries through a transparent and Shariah-compliant due diligence process.</p>
        </li>
        <li>
          <strong>Data Sharing</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>We do not sell or rent your data to third parties.</li>
            <li>We may share data with third-party vendors (e.g., payment gateways, cloud tools) strictly for operational use and under confidentiality agreements.</li>
            <li>We may disclose data to comply with legal obligations or government requests.</li>
          </ul>
        </li>
        <li>
          <strong>Cookies and Tracking</strong>
          <p className="mt-1 ml-4">Our website uses cookies to personalize content and track user interactions. You can manage cookie settings in your browser.</p>
        </li>
        <li>
          <strong>Data Security</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>SSL encryption</li>
            <li>Access controls</li>
            <li>Regular audits</li>
            <li>Secured cloud storage</li>
          </ul>
        </li>
        <li>
          <strong>Data Retention</strong>
          <p className="mt-1 ml-4">We retain data only for as long as required for legal, regulatory, and operational purposes.</p>
        </li>
        <li>
          <strong>Your Rights</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>Request to view or update your data</li>
            <li>Unsubscribe from communications</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
          </ul>
        </li>
        <li>
          <strong>Children’s Privacy</strong>
          <p className="mt-1 ml-4">We do not knowingly collect personal data from individuals under 13 years of age.</p>
        </li>
        <li>
          <strong>Updates to Privacy Policy</strong>
          <p className="mt-1 ml-4">We may revise this policy from time to time. The updated version will be available on this page.</p>
        </li>
      </ol>
    </div>
  );
}
