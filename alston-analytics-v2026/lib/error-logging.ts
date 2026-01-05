/**
 * Error logging and monitoring utilities
 * Supports multiple error tracking services (Sentry, LogRocket, etc.)
 */

interface ErrorInfo {
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  error?: Error;
  context?: Record<string, any>;
}

// Log error to console (always)
function logToConsole(error: ErrorInfo) {
  console.error('Error logged:', {
    message: error.message,
    stack: error.stack || error.error?.stack,
    context: error.context,
  });
}

// Send error to Sentry (if configured)
function sendToSentry(error: ErrorInfo) {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error.error || new Error(error.message), {
      tags: error.context,
      extra: {
        source: error.source,
        line: error.line,
        column: error.column,
      },
    });
  }
}

// Send error to LogRocket (if configured)
function sendToLogRocket(error: ErrorInfo) {
  if (typeof window !== 'undefined' && (window as any).LogRocket) {
    (window as any).LogRocket.captureException(error.error || new Error(error.message), {
      tags: error.context,
    });
  }
}

// Main error logging function
export function logError(
  error: string | Error,
  context?: Record<string, any>
) {
  const errorInfo: ErrorInfo = {
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'string' ? undefined : error.stack,
    error: typeof error === 'string' ? undefined : error,
    context,
  };

  // Always log to console
  logToConsole(errorInfo);

  // Send to error tracking services if configured
  sendToSentry(errorInfo);
  sendToLogRocket(errorInfo);
}

// Initialize error tracking (call in layout or _app)
export function initErrorTracking() {
  if (typeof window === 'undefined') return;

  // Initialize Sentry (optional - uncomment and install @sentry/nextjs if using)
  // To enable Sentry error tracking:
  // 1. Install: npm install @sentry/nextjs
  // 2. Set NEXT_PUBLIC_SENTRY_DSN in .env.local
  // 3. Uncomment the code below
  /*
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 0.1,
        beforeSend(event, hint) {
          if (event.request) {
            delete event.request.cookies;
            delete event.request.headers?.authorization;
          }
          return event;
        },
      });
    }).catch(() => {
      console.log('Sentry not available - using console logging only');
    });
  }
  */

  // Global error handler
  window.addEventListener('error', (event) => {
    logError(event.error || event.message, {
      source: 'global-error-handler',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, {
      source: 'unhandled-rejection',
    });
  });
}

// Log performance metrics
export function logPerformanceMetric(name: string, value: number, unit: string = 'ms') {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name,
      value: Math.round(value),
      event_category: 'Performance',
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${name} = ${value}${unit}`);
  }
}

