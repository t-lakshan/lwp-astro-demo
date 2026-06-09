// wp.ts — the connection to WordPress.
// These functions fetch content from the WP REST API as JSON (like wp_remote_get in PHP).
// The base URL points at the LWP staging site; we can move it to a .env file later
// when the site goes to a real domain.

const WP_BASE = 'https://lwp-astro-1.instawp.site/wp-json/wp/v2';

async function getJSON(path: string) {
  const res = await fetch(`${WP_BASE}${path}`);
  if (!res.ok) throw new Error(`WP fetch failed ${res.status}: ${path}`);
  return res.json();
}

// Home page (WP Page ID 7) — fields live under .meta
export const getHome = () => getJSON('/pages/7');

// Focused Guides CPT — used in Stage 2.
// Order oldest→newest (id asc) so the cards appear in the intended design order;
// WP's default is newest-first. Swap to a dedicated order field later if needed.
export const getGuides = () => getJSON('/focused_guide?orderby=id&order=asc');
export const getGuide = (slug: string) =>
  getJSON(`/focused_guide?slug=${slug}`).then((a) => a[0]);
