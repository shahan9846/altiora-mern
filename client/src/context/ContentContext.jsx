import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getPages } from '../api/client';
import { DEFAULTS, IMAGE_KEYS, PAGES } from '../content/schema';
import { useSeoTags } from '../content/seo';
import { pathFor } from '../content/paths';

// Loads the wording and SEO the admin has edited (Dashboard → Pages) once, and shares it with every page.
// Anything not edited falls back to the default wording in content/schema.js.
const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [pages, setPages] = useState({});
  const [loaded, setLoaded] = useState(false); // the web addresses are known once this is true (they may be custom)

  const reload = useCallback(
    () => getPages().then(setPages).catch(() => { /* keep showing the default wording */ }).finally(() => setLoaded(true)),
    []
  );
  useEffect(() => { reload(); }, [reload]);
  // If the API is slow (a sleeping free server can need a minute), stop waiting after a few seconds: the pages
  // already show the default wording, and the saved texts and addresses are applied whenever the answer arrives.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const value = useMemo(() => ({ pages, reload, loaded }), [pages, reload, loaded]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}

// Returns a lookup: c('hero.title') -> the edited text, or the default when none was saved.
// A text that was cleared and saved comes back as '' and the page must not show it (see the "&&" checks in the pages).
// Only full web addresses become links (anything else, such as "javascript:...", is ignored and the icon stays hidden)
const webAddress = (value) => (/^https?:\/\/\S+$/i.test(value || '') ? value : '');

function makeLookup(pageKey, content) {
  return (field) => {
    const v = content[field];
    if (typeof v === 'string') {
      if (v.trim()) return v;
      if (!IMAGE_KEYS[pageKey]?.has(field)) return ''; // a text cleared on purpose stays empty: the page hides it
    }
    const d = DEFAULTS[pageKey]?.[field];
    if (d === undefined && import.meta.env.DEV) console.warn(`[content] unknown field "${field}" on page "${pageKey}"`);
    return d ?? '';
  };
}

// Text for one page. It also writes that page's SEO tags (title, description, share image, canonical).
export function usePage(pageKey) {
  const { pages } = useContent();
  const page = pages[pageKey] || {};
  const site = pages.site || {};
  const def = PAGES[pageKey];

  const c = useMemo(() => makeLookup(pageKey, page.content || {}), [pageKey, page.content]);

  const seo = page.seo || {};
  const title = (seo.title || '').trim() || def?.seo?.title || '';
  const description = (seo.description || '').trim() || def?.seo?.description || (site.seo?.description || '').trim() || PAGES.site.seo.description;
  const ownImage = (seo.image || '').trim();
  const image = ownImage || (site.seo?.image || '').trim();
  // the alt text belongs to the picture that is used: the page's own, or the site's default
  const imageAlt = ((ownImage ? seo.imageAlt : site.seo?.imageAlt) || '').trim();
  const canonical = (seo.canonical || '').trim();
  // the site settings entry has no page of its own, so it writes no tags
  useSeoTags(def?.seo?.title ? { title, description, image, imageAlt, canonical } : {});

  return c;
}

// Web address of a page: const path = usePaths(); <Link to={path('contact')}>. Follows a custom address set in the dashboard.
export function usePaths() {
  const { pages } = useContent();
  return useCallback((key) => pathFor(key, pages), [pages]);
}

// Contact details and links from Site settings, ready to use.
export function useSite() {
  const c = usePage('site');
  return useMemo(() => {
    const number = c('whatsappNumber').replace(/\D/g, '');
    const mapQuery = c('mapQuery').trim();
    return {
      c,
      phone: c('phone'),
      email: c('email'),
      address: c('address'),
      // empty when the WhatsApp number was cleared: the pages then hide every WhatsApp button
      whatsappUrl: number ? `https://wa.me/${number}?text=${encodeURIComponent(c('whatsappMessage'))}` : '',
      social: { linkedin: webAddress(c('linkedin')), instagram: webAddress(c('instagram')), facebook: webAddress(c('facebook')), x: webAddress(c('x')), tiktok: webAddress(c('tiktok')) },
      mapSrc: mapQuery ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed` : '', // empty = no map
    };
  }, [c]);
}

// Turns "line one\nline two" into text with a line break between the lines.
export function Lines({ text }) {
  const parts = String(text).split('\n');
  return parts.map((line, i) => (i === 0 ? line : [<br key={i} />, line]));
}
