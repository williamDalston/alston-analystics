import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'The Command Line: Strategic dialogues, not discovery calls. Start a conversation with Alston Analytics or reach us at info@alstonanalytics.com.',
  keywords: ['contact', 'consulting', 'strategic dialogue', 'data analytics', 'power bi consulting'],
  openGraph: {
    title: 'Contact | Alston Analytics',
    description: 'The Command Line: Strategic dialogues, not discovery calls.',
    url: 'https://alstonanalytics.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

