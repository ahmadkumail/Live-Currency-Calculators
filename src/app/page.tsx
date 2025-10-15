export default function Home() {
  return (
    <div className="container relative mx-auto flex min-h-screen max-w-4xl flex-1 flex-col items-center justify-center px-4 py-8 text-center md:py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Welcome to Your New Site
      </h1>
      <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
        This is a clean, basic starting point. All previous code has been reset.
      </p>
      <p className="mt-2 text-base text-muted-foreground">
        You can now build your application from a stable foundation.
      </p>
    </div>
  );
}
