// The web address of each page. A page keeps its default address until the admin sets a custom one
// (Dashboard → SEO → the page → Page URL). Home is always "/".
export const DEFAULT_PATHS = {
  home: '/',
  about: '/about',
  why: '/why-altiora',
  services: '/services',
  training: '/training',
  career: '/career-guidance',
  contact: '/contact',
};

export const pathFor = (key, pages) => {
  const slug = (pages?.[key]?.seo?.slug || '').trim();
  return key !== 'home' && slug ? '/' + slug : DEFAULT_PATHS[key];
};
