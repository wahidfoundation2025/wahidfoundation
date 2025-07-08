"use client";

export default function TermsPage() {
  return (
    <div className="px-4 py-6 text-gray-800 bg-white mb-12 text-justify">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">Terms &amp; Conditions</h1>
      <p className="mb-2"><strong>Organization:</strong> Wahid Foundation</p>
      <p className="mb-2"><strong>Website:</strong> <a href="https://www.wahid.org.in" className="text-emerald-600 underline" target="_blank" rel="noopener noreferrer">www.wahid.org.in</a></p>
      <p className="mb-6">Welcome to Wahid Foundation. By accessing our website or using our services, you agree to comply with the following Terms &amp; Conditions. Please read them carefully before making donations or using our platform.</p>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>About Wahid Foundation</strong>
          <p className="mt-1 ml-4">Wahid Foundation is a registered not-for-profit organization based in India. We work for the social, educational, and economic empowerment of marginalized, backward, and minority communities across India, without discrimination.</p>
        </li>
        <li>
          <strong>Purpose</strong>
          <p className="mt-1 ml-4">This platform is designed to enable users to donate, engage, and stay informed about our programs. We aim to create systemic change through education, healthcare, financial inclusion, and social justice initiatives.</p>
        </li>
        <li>
          <strong>Donations</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>We accept both general charity (Sadaqah) and Zakat donations. Zakat funds are used strictly in accordance with Islamic principles.</li>
            <li>Donations are voluntary and non-refundable, unless a proven technical error occurs.</li>
            <li>We accept one-time and recurring (monthly/yearly) contributions.</li>
            <li>Donors are required to submit PAN card details in compliance with Indian tax laws.</li>
            <li>A reasonable portion of donations is allocated to operational and administrative expenses (staff, tech, outreach, compliance), as standard for non-profit operations.</li>
            <li>Receipts are issued for all donations and can be used for personal records or tax compliance as applicable.</li>
          </ul>
        </li>
        <li>
          <strong>Use of Website</strong>
          <ul className="list-disc ml-8 mt-1 space-y-1">
            <li>You agree to use the website only for lawful and ethical purposes.</li>
            <li>All content (text, images, design, logos, etc.) is the property of Wahid Foundation and may not be copied or redistributed without written consent.</li>
            <li>Impersonation, fraud, misuse of donation systems, or spreading misinformation will lead to account suspension and possible legal action.</li>
          </ul>
        </li>
        <li>
          <strong>Transparency and Reporting</strong>
          <p className="mt-1 ml-4">We maintain transparency through regular updates, impact reports, and financial disclosures available to donors via email or on the website.</p>
        </li>
        <li>
          <strong>Third-Party Services</strong>
          <p className="mt-1 ml-4">We may use third-party tools or platforms (for forms, payments, analytics). While we choose secure and reputable vendors, we are not responsible for their privacy practices or terms.</p>
        </li>
        <li>
          <strong>Updates to Terms</strong>
          <p className="mt-1 ml-4">Wahid Foundation reserves the right to update these Terms &amp; Conditions at any time. Any changes will be published on this page with a revised effective date.</p>
        </li>
      </ol>
    </div>
  );
}
