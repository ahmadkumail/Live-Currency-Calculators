import { CurrencyConverter } from '@/components/currency-converter';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <div className="container relative mx-auto flex min-h-screen flex-1 flex-col justify-center px-4 py-8 md:py-12">
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          {siteConfig.name}
        </h1>
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          {siteConfig.description}
        </p>
      </section>
      <section className="mx-auto mt-8 w-full max-w-2xl">
        <CurrencyConverter />
      </section>
    </div>
  );
}
