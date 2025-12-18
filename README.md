# Alston Analytics Website

A modular, scalable website built with React and Tailwind CSS.

## Project Structure

```
/workspace
├── index.html              # Main HTML file with SEO and meta tags
├── bundle.js               # Bundled components (generated)
├── build.js                # Build script to create bundle
├── loader.js               # Module loader for bundle
├── components/             # React components
│   ├── Icons.js           # Icon components
│   ├── Header.js           # Navigation header
│   ├── Hero.js            # Hero section
│   ├── Problem.js         # Problem statement section
│   ├── Capabilities.js    # Capabilities section
│   ├── Comparison.js      # Comparison table
│   ├── AgenticSection.js  # Agentic analytics section
│   ├── About.js           # About section
│   ├── Testimonials.js    # Testimonials section
│   ├── Pricing.js         # Pricing/engagement models
│   ├── FAQ.js             # FAQ section
│   ├── Contact.js         # Contact form section
│   ├── Footer.js          # Footer component
│   └── CookieConsent.js   # Cookie consent banner
├── utils/                  # Utility functions
│   └── scroll.js          # Scroll utilities
├── app.js                  # Main app component
├── privacy-policy.html     # Privacy policy page
└── terms-of-service.html   # Terms of service page
```

## Development

### Building the Bundle

The website uses a modular component structure. To rebuild the bundle after making changes:

```bash
node build.js
```

This concatenates all component files into `bundle.js`, which is loaded by the website.

### Adding New Components

1. Create a new component file in `components/` directory
2. Export your component (using React.createElement or JSX)
3. Add the file to the `files` array in `build.js`
4. Import/use it in `app.js`
5. Run `node build.js` to rebuild

### Component Structure

Components use `React.createElement` for compatibility with CDN React. Each component should:

- Be self-contained
- Accept props as needed
- Return a React element

Example:
```javascript
const MyComponent = ({ title, description }) => {
  return React.createElement('section', {
    className: "py-24 px-6 bg-slate-950"
  }, [
    React.createElement('h2', { key: 'title' }, title),
    React.createElement('p', { key: 'desc' }, description)
  ]);
};
```

## Features

- ✅ Modular component architecture
- ✅ SEO optimized (meta tags, Open Graph, structured data)
- ✅ Privacy Policy and Terms of Service pages
- ✅ FAQ section
- ✅ Cookie consent banner
- ✅ Contact information and form
- ✅ Testimonials section
- ✅ Pricing/engagement models
- ✅ Enhanced About section
- ✅ Accessibility improvements (ARIA labels, keyboard navigation)

## Deployment

1. Ensure `bundle.js` is up to date (run `node build.js`)
2. Upload all files to your web server
3. Ensure the server serves files with proper MIME types

## Future Enhancements

To convert to a modern build system (e.g., Vite, Webpack):

1. Install build tools
2. Convert components to JSX/ES6 modules
3. Update imports/exports
4. Configure build pipeline
5. Update `index.html` to use built files

## License

Copyright © Alston Analytics. All rights reserved.
