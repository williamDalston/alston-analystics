import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Evidence of Order: See how Alston Analytics transforms chaos into executive weapons. Case studies from Fortune 500 supply chain overhauls to healthcare analytics platforms.',
  keywords: ['portfolio', 'case studies', 'power bi dashboards', 'data transformation', 'analytics solutions'],
  openGraph: {
    title: 'Portfolio | Alston Analytics',
    description: 'Evidence of Order: See how we transform chaos into executive weapons.',
    url: 'https://alstonanalytics.com/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


