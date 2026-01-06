/**
 * Analytics utility functions
 * Supports multiple analytics providers (Google Analytics, Plausible, Vercel Analytics)
 */

// Track page views
export function trackPageView(url: string) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('pageview', {
      props: { path: url },
    });
  }

  // Vercel Analytics (automatically tracked via @vercel/analytics)
}

// Track custom events
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, {
      props: properties,
    });
  }
}

// Track conversions
export function trackConversion(conversionType: string, value?: number) {
  trackEvent(conversionType, { value });
}

// Initialize analytics (call in layout or _app)
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Google Analytics initialization (if GA_ID is provided)
  if (process.env.NEXT_PUBLIC_GA_ID) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);
  }

  // Plausible Analytics initialization (if PLAUSIBLE_DOMAIN is provided)
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  }
}




