import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { FloatingDock } from "@/components/navigation/FloatingDock";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { FocusManager } from "@/components/providers/FocusManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050A0E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  userScalable: true,
  viewportFit: "cover", // Safe area support for notched devices
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alstonanalytics.com"),
  title: {
    default: "Alston Analytics | Data is organic",
    template: "%s | Alston Analytics",
  },
  description: "Transform raw complexity into executive clarity. Strategic consulting, Power BI engineering, and sovereign thinking.",
  keywords: ["analytics", "consulting", "power bi", "data visualization", "business intelligence"],
  authors: [{ name: "Alston Analytics" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Alston Analytics",
    description: "Data is organic. We prune the chaos.",
    type: "website",
    locale: "en_US",
    siteName: "Alston Analytics",
    url: "https://alstonanalytics.com",
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Alston Analytics — Data is organic',
      },
    ],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  twitter: {
    card: "summary_large_image",
    title: "Alston Analytics",
    description: "Data is organic. We prune the chaos.",
    creator: "@AlstonAnalytics",
    images: ['/og.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Alston Analytics",
              url: "https://alstonanalytics.com",
              logo: "https://alstonanalytics.com/icon.png",
              sameAs: ["https://twitter.com/AlstonAnalytics"],
              description:
                "Transform raw complexity into executive clarity. Strategic consulting, Power BI engineering, and sovereign thinking.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <FocusManager />
          <ModeToggle />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <FloatingDock />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
