// Simple build script to concatenate modular components
const fs = require('fs');
const path = require('path');

const files = [
  'components/Icons.js',
  'utils/scroll.js',
  'components/Header.js',
  'components/Hero.js',
  'components/Problem.js',
  'components/Capabilities.js',
  'components/Comparison.js',
  'components/AgenticSection.js',
  'components/About.js',
  'components/Testimonials.js',
  'components/Pricing.js',
  'components/FAQ.js',
  'components/Contact.js',
  'components/Footer.js',
  'components/CookieConsent.js',
  'app.js'
];

let bundle = '';

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    bundle += `\n// ===== ${file} =====\n`;
    bundle += fs.readFileSync(filePath, 'utf8');
    bundle += '\n';
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// Write bundled file
fs.writeFileSync(path.join(__dirname, 'bundle.js'), bundle);
console.log('Bundle created successfully!');
