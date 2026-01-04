import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { FloatingDock } from "@/components/navigation/FloatingDock";
import { ModeToggle } from "@/components/ui/ModeToggle";

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
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alstonanalytics.com"),
  title: {
    default: "Alston Analytics | Data is Organic",
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
  openGraph: {
    title: "Alston Analytics",
    description: "Data is organic. We prune the chaos.",
    type: "website",
    locale: "en_US",
    siteName: "Alston Analytics",
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
          <ModeToggle />
          <main id="main-content">
            {children}
          </main>
          <FloatingDock />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
