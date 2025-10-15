import { CurrencyConverter } from '@/components/currency-converter';

export default function Home() {
  return (
    <div className="container relative mx-auto flex min-h-screen flex-1 flex-col justify-center px-4 py-8 md:py-12">
      <section className="mx-auto w-full max-w-4xl">
        <CurrencyConverter />
      </section>
    </div>
  );
}
