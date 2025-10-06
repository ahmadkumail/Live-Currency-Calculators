import { MainCard } from '@/components/main-card';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
      <header className="flex w-full flex-col items-center justify-between p-4 py-12 md:p-6 md:py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Currency Converter
        </h1>
        <p className="text-gray-600 mt-2">
          Your reliable source for real-time exchange rates
        </p>
      </header>
      <main className="flex w-full flex-1 items-start justify-center p-4">
        <MainCard />
      </main>
    </div>
  );
}
