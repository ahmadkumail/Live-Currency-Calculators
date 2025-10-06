export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Terms and Conditions</h1>
        <p className="text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the CurrencyCompass website (the "Service") operated by CurrencyCompass ("us", "we", or "our").
          </p>
          <h2 className="text-2xl font-bold mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          <h2 className="text-2xl font-bold mt-8">2. Use of Service</h2>
          <p>
            The Service is provided for informational purposes only. The exchange rates, fees, and other financial data provided are for estimation purposes and are not guaranteed to be accurate. We are not a financial institution and do not provide financial services. You should verify all information with a qualified professional before making any financial decisions.
          </p>
          <h2 className="text-2xl font-bold mt-8">3. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of CurrencyCompass and its licensors. The Service is protected by copyright, trademark, and other laws of both the and foreign countries.
          </p>
          <h2 className="text-2xl font-bold mt-8">4. Limitation of Liability</h2>
          <p>
            In no event shall CurrencyCompass, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
          <h2 className="text-2xl font-bold mt-8">5. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
