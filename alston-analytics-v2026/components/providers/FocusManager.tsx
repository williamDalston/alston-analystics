'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function FocusManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset focus to main content on route change
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        mainContent.focus();
        // Remove focus after a moment to prevent visible focus ring on auto-focus
        setTimeout(() => {
          mainContent.blur();
        }, 100);
      }, 100);
    }
  }, [pathname]);

  return null;
}

