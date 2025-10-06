export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">About CurrencyCompass</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to CurrencyCompass, your reliable guide to global finance. Our mission is to provide you with the most accurate, real-time exchange rates and financial tools to make your international transactions seamless and cost-effective.
        </p>
        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            In an increasingly connected world, navigating the complexities of currency exchange can be daunting. Whether you're a traveler, an international business, or sending money back home to your loved ones, you need a tool you can trust. That's where CurrencyCompass comes in.
          </p>
          <h2 className="text-2xl font-bold mt-8">Our Features</h2>
          <ul>
            <li><strong>Live Currency Converter:</strong> Get up-to-the-minute exchange rates for hundreds of currencies.</li>
            <li><strong>Remittance Calculator:</strong> Compare different banks and services to find the cheapest and fastest way to send money abroad.</li>
            <li><strong>Smart Advisor:</strong> Our AI-powered tool gives you personalized recommendations to minimize fees and maximize what your recipient gets.</li>
            <li><strong>Rate Alerts:</strong> Set your desired exchange rate and get notified instantly when it's met. Never miss the perfect time to convert your currency.</li>
          </ul>
          <h2 className="text-2xl font-bold mt-8">Our Vision</h2>
          <p>
            We believe in financial transparency and empowerment. Our goal is to demystify foreign exchange and give you the power to make informed decisions. We are constantly working to improve our tools and add new features to serve you better.
          </p>
          <p>
            Thank you for choosing CurrencyCompass. We're excited to be part of your financial journey.
          </p>
        </div>
      </div>
    </div>
  );
}
