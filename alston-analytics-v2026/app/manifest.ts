import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alston Analytics',
    short_name: 'Alston',
    description: 'Transform raw complexity into executive clarity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050A0E',
    theme_color: '#050A0E',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}