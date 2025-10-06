import { MainCard } from '@/components/main-card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Compass } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <header className="flex w-full max-w-4xl items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Compass className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Currency Compass
          </h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex w-full flex-1 items-start justify-center p-4 md:items-center">
        <MainCard />
      </main>
    </div>
  );
}
