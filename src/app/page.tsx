import { MainCard } from '@/components/main-card';

export default function Home() {
  return (
    <div className="container relative flex-1">
      <section className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 py-12 text-center md:py-16">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
          Live Currency Converter
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Your reliable source for real-time exchange rates, remittance
          calculations, and rate alerts.
        </p>
      </section>
      <section className="pb-12">
        <MainCard />
      </section>
    </div>
  );
}
