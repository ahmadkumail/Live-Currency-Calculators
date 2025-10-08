import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import Script from 'next/script';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Live Currency Converter – Real-Time Exchange Rates & Remittance Fees',
  description:
    'Convert currencies instantly with live exchange rates, remittance fee calculator, and bank transfer comparison. Stay updated on global finance.',
  openGraph: {
    title:
      'Live Currency Converter – Real-Time Exchange Rates & Remittance Fees',
    description:
      'Check live exchange rates, remittance fees, and bank transfer costs worldwide.',
    type: 'website',
    url: 'https://www.livecurrencyconverter.website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google AdSense Verification */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5530405178327113"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LW9B2S8PPV" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LW9B2S8PPV');
          `}
        </Script>
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
