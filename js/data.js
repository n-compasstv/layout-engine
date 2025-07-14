import { storage, getUrlParams } from './utils.js';

const REFERENCE_WIDTH = 1920;
const REFERENCE_HEIGHT = 1080;

const { eid, rid, from, to, count } = getUrlParams();

const params = new URLSearchParams();
params.append('from', from || new Date().toISOString().split('T')[0]);
if (to) params.append('to', to);
if (count) params.append('count', count);

const queryParams = params.toString() ? `?${params.toString()}` : '';

console.log({ rid }, getUrlParams());

export const ARTICLES_API_URL = rid ? `https://rss-parser-ai.onrender.com/api/feeds/articles?rssSchemaId=${rid}` : '';
export const ELEMENTS_API_URL = eid ? `https://dummyjson.com/c/${eid}` : '';

// Fetch content (articles) with caching
export async function fetchContentData() {
    const cacheKey = rid;
    const urlKey = `${rid}_url`;
    const cache = storage.get(cacheKey);
    const cachedUrl = localStorage.getItem(urlKey);
    const isSameUrl = cachedUrl === ARTICLES_API_URL;

    if (cache && isSameUrl) {
        const { data, cachedAt } = cache;
        const age = Date.now() - new Date(cachedAt).getTime();
        if (age < 60 * 60 * 1000) {
            console.log('Using cached data');
            return data.articles || [];
        }
    }

    try {
        const res = await fetch(ARTICLES_API_URL);
        if (!res.ok) throw new Error(`Articles API failed: ${res.status}`);

        const raw = await res.json();
        const articles = Array.isArray(raw.articles) ? raw.articles : [];

        storage.set(cacheKey, { cachedAt: new Date().toISOString(), data: raw });
        localStorage.setItem(urlKey, ARTICLES_API_URL);

        return articles;
    } catch (err) {
        console.error('Fetch content error:', err);
        return [];
    }
}

// Fetch layout elements template with caching
export async function fetchElementsTemplate() {
    const cacheKey = `${eid}_elements`;
    const urlKey = `${eid}_elements_url`;
    const cache = storage.get(cacheKey);
    const cachedUrl = localStorage.getItem(urlKey);
    const isSameUrl = cachedUrl === ELEMENTS_API_URL;

    if (cache && isSameUrl) {
        const { data, cachedAt } = cache;
        const age = Date.now() - new Date(cachedAt).getTime();
        if (age < 60 * 60 * 1000) {
            console.log('Using cached elements');
            return data.elements || data;
        }
    }

    try {
        const res = await fetch(ELEMENTS_API_URL);
        if (!res.ok) throw new Error(`Elements API failed: ${res.status}`);

        const data = await res.json();

        storage.set(cacheKey, { cachedAt: new Date().toISOString(), data });
        localStorage.setItem(urlKey, ELEMENTS_API_URL);

        return data.elements || data;
    } catch (err) {
        console.error('Fetch elements error:', err);
        return [];
    }
}

// Determine next content index
export function getCurrentContentIndex(array) {
    if (!array || array.length === 0) return 0;
    const current = parseInt(localStorage.getItem('currentContentIndex')) || 0;
    const next = (current + 1) % array.length;
    localStorage.setItem('currentContentIndex', next.toString());
    return next;
}
