export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            CurrencyCompass ("us", "we", or "our") operates the CurrencyCompass website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <h2 className="text-2xl font-bold mt-8">1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          <h3>Types of Data Collected</h3>
          <ul>
            <li><strong>Personal Data:</strong> While using our Rate Alerts feature, we may ask you to provide us with your email address. We use this to send you notifications as requested.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
          </ul>
          <h2 className="text-2xl font-bold mt-8">2. Use of Data</h2>
          <p>
            CurrencyCompass uses the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To provide you with rate alert notifications if you have subscribed to them.</li>
          </ul>
          <h2 className="text-2xl font-bold mt-8">3. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          <h2 className="text-2xl font-bold mt-8">4. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
