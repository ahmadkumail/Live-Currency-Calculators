import { MainCard } from '@/components/main-card';

export default function Home() {
  return (
    <div className="container relative mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center py-8 md:py-12">
      <header className="mb-4 px-4 text-center sm:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Live Currency Converter & Remittance Guide
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:mt-4 sm:text-lg">
          Your reliable source for real-time exchange rates, remittance
          fee calculations, and smart transfer advice.
        </p>
      </header>
      <section className="w-full px-2 sm:px-0">
        <MainCard />
      </section>
    </div>
  );
}
