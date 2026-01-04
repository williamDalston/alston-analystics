import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-deep-void text-soft-clay relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-moss/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 px-6">
        <h1 className="text-9xl font-bold text-electric-moss/20 font-mono">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-bold glow-electric text-electric-moss">
          Signal Lost
        </h2>
        
        <p className="text-lg text-soft-clay/70 max-w-md mx-auto">
          The data point you are looking for has been pruned or does not exist in this dataset.
        </p>

        <div className="pt-8">
          <Link
            href="/"
            className="glass-heavy px-8 py-4 rounded-full text-electric-moss font-mono font-bold hover:bg-electric-moss/10 transition-all duration-300 inline-block glow-electric"
          >
            Return to Source
          </Link>
        </div>
      </div>
    </div>
  );
}