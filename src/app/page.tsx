import { MainCard } from '@/components/main-card';

export default function Home() {
  return (
    <div className="container relative mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Live Currency Converter
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your reliable source for real-time exchange rates, remittance
          calculations, and rate alerts.
        </p>
      </header>
      <section className="w-full">
        <MainCard />
      </section>
    </div>
  );
}
