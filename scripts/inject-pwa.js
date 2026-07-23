// Injects PWA meta tags into the exported web build (dist/index.html).
// Run after `expo export --platform web`.
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const tags = [
  '<link rel="manifest" href="/Marocimmo-V1/manifest.json" />',
  '<meta name="theme-color" content="#17181C" />',
  '<meta name="mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
  '<meta name="apple-mobile-web-app-title" content="MarocImmo" />',
  '<link rel="apple-touch-icon" href="/Marocimmo-V1/icon-192.png" />',
  '<title>MarocImmo</title>',
].join('\n    ');

if (!html.includes('rel="manifest"')) {
  html = html.replace('</head>', `    ${tags}\n  </head>`);
  fs.writeFileSync(indexPath, html);
  console.log('PWA tags injected into dist/index.html');
} else {
  console.log('PWA tags already present');
}
