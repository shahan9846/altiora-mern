import { useEffect } from 'react';
import { imageUrl } from '../api/client';

const SITE_NAME = 'Altiora Business Advisory';

// Creates, updates or removes one <meta>/<link> tag in <head> (tags created here are marked so they can be replaced)
function setTag(tag, attrName, attrValue, contentAttr, value) {
  const selector = `${tag}[${attrName}="${attrValue}"]`;
  let el = document.head.querySelector(selector);
  if (!value) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute(contentAttr, value);
}

const absolute = (src) => {
  try { return new URL(imageUrl(src), window.location.origin).href; } catch { return ''; }
};

// Writes the page title and the SEO / social-sharing tags for the current page.
// Note: tags written here are visible to Google (which runs JavaScript) but not to link-preview
// bots such as WhatsApp or Facebook, which only read the original HTML.
function applySeo({ title, description, image, imageAlt, canonical }) {
  if (title) document.title = title;
  setTag('meta', 'name', 'description', 'content', description);
  const own = window.location.origin + window.location.pathname;
  const url = canonical || own; // a custom canonical address set in the dashboard wins
  setTag('link', 'rel', 'canonical', 'href', url);
  setTag('meta', 'property', 'og:type', 'content', 'website');
  setTag('meta', 'property', 'og:site_name', 'content', SITE_NAME);
  setTag('meta', 'property', 'og:title', 'content', title);
  setTag('meta', 'property', 'og:description', 'content', description);
  setTag('meta', 'property', 'og:url', 'content', url);
  setTag('meta', 'property', 'og:image', 'content', image ? absolute(image) : '');
  setTag('meta', 'property', 'og:image:alt', 'content', image ? imageAlt : '');
  setTag('meta', 'name', 'twitter:card', 'content', image ? 'summary_large_image' : 'summary');
  setTag('meta', 'name', 'twitter:title', 'content', title);
  setTag('meta', 'name', 'twitter:description', 'content', description);
  setTag('meta', 'name', 'twitter:image', 'content', image ? absolute(image) : '');
  setTag('meta', 'name', 'twitter:image:alt', 'content', image ? imageAlt : '');
}

// Hook form: re-applies whenever any value changes
export function useSeoTags({ title, description, image, imageAlt, canonical }) {
  useEffect(() => {
    if (!title) return; // nothing to write (e.g. the site-settings entry), leave the page's own tags alone
    applySeo({ title, description, image, imageAlt, canonical });
  }, [title, description, image, imageAlt, canonical]);
}

// Admin screens must never appear in search results: adds <meta name="robots" content="noindex"> while mounted
export function useNoIndex() {
  useEffect(() => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    el.setAttribute('content', 'noindex, nofollow');
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
}
