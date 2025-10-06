import { MainCard } from '@/components/main-card';

export default function Home() {
  return (
    <div className="container relative mx-auto flex max-w-4xl flex-1 items-center justify-center">
      <section className="w-full">
        <MainCard />
      </section>
    </div>
  );
}
