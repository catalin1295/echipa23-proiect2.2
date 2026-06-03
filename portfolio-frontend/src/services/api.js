import {
  MOCK_ARTICLES,
  MOCK_CATEGORIES,
  MOCK_ABOUT,
} from './mockData.js';

// Elimina slash-ul final din URL daca exista (evita //api/...)
const BASE = (import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');

/**
 * Helper generic pentru fetch din Strapi.
 * Returneaza data[] sau data din raspuns.
 */
async function strapiGet(path) {
  const res = await fetch(`${BASE}/api${path}`);
  if (!res.ok) throw new Error(`Strapi error ${res.status}: ${path}`);
  const json = await res.json();
  return json.data;
}

/* ────────────── ARTICOLE ────────────── */

export async function getArticles() {
  try {
    return await strapiGet('/articles?populate=*&sort=publishedAt:desc');
  } catch {
    console.warn('[api] Strapi indisponibil — se folosesc date mock pentru articles.');
    return MOCK_ARTICLES;
  }
}

export async function getArticleBySlug(slug) {
  try {
    const data = await strapiGet(
      `/articles?filters[slug][$eq]=${slug}&populate=*`
    );
    return data?.[0] ?? null;
  } catch {
    console.warn('[api] Strapi indisponibil — se cauta in mock.');
    return MOCK_ARTICLES.find(a => a.attributes.slug === slug) ?? null;
  }
}

/* ────────────── CATEGORII ────────────── */

export async function getCategories() {
  try {
    return await strapiGet('/categories?sort=name:asc');
  } catch {
    console.warn('[api] Strapi indisponibil — se folosesc date mock pentru categories.');
    return MOCK_CATEGORIES;
  }
}

/* ────────────── ABOUT (Single Type) ────────────── */

export async function getAbout() {
  try {
    return await strapiGet('/about?populate=*');
  } catch {
    console.warn('[api] Strapi indisponibil — se folosesc date mock pentru about.');
    return MOCK_ABOUT;
  }
}

/* ────────────── CONTACT ────────────── */

export async function sendContactForm({ name, email, subject, message }) {
  const res = await fetch(`${BASE}/api/contact-forms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { name, email, subject, message } }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Eroare ${res.status}`);
  }
  return res.json();
}

/* ────────────── HELPER URL imagine Strapi ────────────── */

export function strapiImageUrl(imageData) {
  if (!imageData?.data?.attributes?.url) return null;
  const url = imageData.data.attributes.url;
  // Daca e URL absolut (Cloudinary etc.), il returnam direct
  if (url.startsWith('http')) return url;
  return `${BASE}${url}`;
}
