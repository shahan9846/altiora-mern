// Runs after `vite build`: writes robots.txt and sitemap.xml into dist/.
// The website address comes from SITE_URL (set it to your own domain), or from Netlify's built-in URL variable.
// The service pages are read from the live API (VITE_API_URL); if it cannot be reached, only the fixed pages are listed.
import { writeFileSync } from 'node:fs';

const site = (process.env.SITE_URL || process.env.URL || '').trim().replace(/\/+$/, '');
const api = (process.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

// default web address of each page; a page can have a custom one (Dashboard → SEO), read from the API below
const PAGES = { home: '/', about: '/about', services: '/services', training: '/training', why: '/why-altiora', career: '/career-guidance', contact: '/contact' };

let robots = 'User-agent: *\nAllow: /\nDisallow: /admin\n';

if (!site) {
  console.warn('seo-files: SITE_URL is not set, so no sitemap.xml was written. Set SITE_URL (e.g. https://www.example.com) and build again.');
} else {
  const addresses = { ...PAGES };
  let services = [];
  if (api) {
    try {
      const pagesRes = await fetch(`${api}/api/pages`);
      if (pagesRes.ok) {
        const saved = await pagesRes.json();
        for (const key of Object.keys(addresses)) {
          const slug = (saved[key]?.seo?.slug || '').trim();
          if (key !== 'home' && slug) addresses[key] = '/' + slug;
        }
      }
      const res = await fetch(`${api}/api/services`);
      if (res.ok) services = await res.json();
      else console.warn(`seo-files: services request returned ${res.status}; service pages left out.`);
    } catch (err) {
      console.warn(`seo-files: could not reach the API (${err.message}); custom page addresses and service pages left out.`);
    }
  } else {
    console.warn('seo-files: VITE_API_URL is not set; custom page addresses and service pages left out of the sitemap.');
  }
  const paths = [...Object.values(addresses), ...services.map((sv) => `${addresses.services}/${sv.slug}`)];
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${esc(site + (p === '/' ? '/' : p))}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  writeFileSync('dist/sitemap.xml', xml);
  robots += `\nSitemap: ${site}/sitemap.xml\n`;
  console.log(`seo-files: sitemap.xml written with ${paths.length} pages for ${site}`);
}

writeFileSync('dist/robots.txt', robots);

// ---- security and caching headers for Netlify (dist/_headers) ----
// The Content-Security-Policy lets the page load only what it needs: its own files, Google Fonts, the Google map,
// and the API at VITE_API_URL. The loading screen in index.html is an inline script, so its fingerprint is allowed.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

let apiOrigin = '';
try { apiOrigin = api ? new URL(api).origin : ''; } catch { /* leave empty */ }

const inlineScripts = existsSync('dist/index.html')
  ? [...readFileSync('dist/index.html', 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => `'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`)
  : [];

const csp = [
  "default-src 'self'",
  `script-src 'self' ${inlineScripts.join(' ')}`.trim(),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  `img-src 'self' data: https://res.cloudinary.com ${apiOrigin}`.trim(),
  `connect-src 'self' ${apiOrigin}`.trim(),
  'frame-src https://www.google.com https://maps.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

writeFileSync('dist/_headers', `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/assets/*.js
  Cache-Control: public, max-age=31536000, immutable
/assets/*.css
  Cache-Control: public, max-age=31536000, immutable
/assets/*.jpg
  Cache-Control: public, max-age=604800
/assets/*.png
  Cache-Control: public, max-age=604800
`);
console.log('seo-files: _headers written (security and caching headers)');
