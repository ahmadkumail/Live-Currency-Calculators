import { CurrencyConverter } from '@/components/currency-converter';
import { Button } from '@/components/ui/button';
import { Globe, Repeat, History, Shield } from 'lucide-react';

const features = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'Global Coverage',
    description: 'Convert between hundreds of currencies from all over the world.',
  },
  {
    icon: <Repeat className="h-10 w-10 text-primary" />,
    title: 'Live Exchange Rates',
    description: 'Get the most up-to-date exchange rates for accurate conversions.',
  },
  {
    icon: <History className="h-10 w-10 text-primary" />,
    title: 'Historical Data',
    description: 'View historical data charts to analyze currency trends.',
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Secure & Reliable',
    description: 'Our service is secure and reliable, ensuring your data is safe.',
  },
];

const howItWorks = [
    {
        step: 1,
        title: 'Choose Currencies',
        description: 'Select the currency you want to convert from and the currency you want to convert to.',
    },
    {
        step: 2,
        title: 'Enter Amount',
        description: 'Input the amount of money you want to convert.',
    },
    {
        step: 3,
        title: 'Get Results',
        description: 'See the converted amount instantly based on live exchange rates.',
    },
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="w-full bg-gray-50/90 dark:bg-gray-900/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    The Smart Currency Converter
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                    Fast, reliable, and up-to-the-minute exchange rates. Convert currencies with confidence.
                </p>
            </div>
            <div className="mx-auto mt-12 w-full max-w-4xl">
                <CurrencyConverter />
            </div>
        </div>
      </section>

      <section id="features" className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Use Our Converter?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Everything you need for seamless currency conversions.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <div key={feature.title} className="flex flex-col items-center text-center">
                        {feature.icon}
                        <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full bg-gray-50/90 dark:bg-gray-900/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
                <p className="mt-4 text-lg text-muted-foreground">A simple 3-step process to get your conversion.</p>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {howItWorks.map((step) => (
                    <div key={step.step} className="flex items-start">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                            {step.step}
                        </div>
                        <div className="ml-6">
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                            <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      <section id="cta" className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Try the converter now and experience seamless currency conversions.</p>
            <div className="mt-8">
                <Button size="lg">Start Converting</Button>
            </div>
        </div>
      </section>
    </div>
  );
}
