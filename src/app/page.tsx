import { MainCard } from '@/components/main-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Live Currency Rates in Pakistan – USD to PKR & More (Real-Time Updates)",
  description:
    "Check today's live currency rates in Pakistan. Convert USD, AED, GBP, and other currencies to PKR with real-time exchange updates and remittance guidance.",
  keywords:
    "currency rates Pakistan, USD to PKR, AED to PKR, GBP to PKR, live currency converter Pakistan, exchange rates today, remittance Pakistan, currency conversion Pakistan",
  openGraph: {
    title:
      "Live Currency Rates in Pakistan – USD to PKR & More (Real-Time Updates)",
    description:
      "Real-time currency converter for Pakistan. Check latest USD to PKR, AED to PKR, and other exchange rates updated daily.",
    url: "https://www.livecurrencyconverter.website/",
    type: "website",
    images: ["https://www.livecurrencyconverter.website/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Live Currency Rates in Pakistan – USD to PKR & More (Real-Time Updates)",
    description:
      "Check today’s live exchange rates in Pakistan for USD, AED, GBP and more. Get accurate remittance and currency conversion info.",
    images: ["https://www.livecurrencyconverter.website/og-image.png"],
  },
  alternates: {
    canonical: "https://www.livecurrencyconverter.website/",
  },
};


export default function Home() {
  return (
    <>
    <div className="container relative mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center py-8 md:py-12">
      <header className="mb-4 px-4 text-center sm:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Live Currency Rates in Pakistan (USD, AED, GBP to PKR)
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:mt-4 sm:text-lg">
          Stay updated with real-time exchange rates in Pakistan. Convert USD,
          AED, GBP, and more to PKR instantly. Get live interbank and open market
          rates along with remittance insights.
        </p>
      </header>
      <section className="w-full px-2 sm:px-0">
        <MainCard />
      </section>
       <section className="mt-12 w-full space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            💵 USD to PKR Rate Today
          </h2>
          <p className="text-muted-foreground">
            The live USD to PKR exchange rate in Pakistan is updated frequently
            based on interbank and open market data. Check today’s official and
            estimated conversion rates before sending remittances or making
            currency exchanges.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">💰 AED to PKR Rate</h2>
          <p className="text-muted-foreground">
            AED to PKR rate helps overseas Pakistanis in the UAE calculate their
            remittance value accurately. Stay informed with real-time updates on
            the AED to PKR exchange rate in Pakistan.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">💷 GBP to PKR Rate</h2>
          <p className="text-muted-foreground">
            The GBP to PKR rate fluctuates daily depending on the forex market.
            Use our converter to check live rates for better decision-making on
            remittances and transfers.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            🧭 Remittance & Currency Conversion Guide
          </h2>
          <p className="text-muted-foreground">
            Learn how to transfer money efficiently to Pakistan. Understand bank
            charges, interbank rates, and exchange margins to ensure you get the
            best conversion value on every transfer.
          </p>
        </div>
      </section>
    </div>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CurrencyConversionService",
            name: "Live Currency Converter Pakistan",
            description:
              "Real-time currency converter and exchange rate updates for Pakistan, including USD to PKR, AED to PKR, and GBP to PKR rates.",
            provider: {
              "@type": "Organization",
              name: "Live Currency Converter",
              url: "https://www.livecurrencyconverter.website",
            },
            areaServed: {
              "@type": "Country",
              name: "Pakistan",
            },
            currency: ["USD", "AED", "GBP", "PKR"],
            url: "https://www.livecurrencyconverter.website",
          }),
        }}
      />
    </>
  );
}
