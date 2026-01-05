import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Sovereign Mind',
  description: 'The Digital Dojo: Leadership is a science, not an art. Explore mental models, frameworks, and sovereign thinking for the modern executive. Learn about Inversion, Leverage, and Pareto principles.',
  keywords: ['leadership', 'mental models', 'frameworks', 'strategic thinking', 'executive development', 'inversion', 'leverage', 'pareto'],
  openGraph: {
    title: 'The Sovereign Mind | Alston Analytics',
    description: 'The Digital Dojo: Leadership is a science, not an art.',
    url: 'https://alstonanalytics.com/sovereign-mind',
  },
};

export default function SovereignMindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


