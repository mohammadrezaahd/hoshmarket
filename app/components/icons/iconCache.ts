// Shared in-memory cache and deduplication for icon SVGs
const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

const makeKey = (variant: string, name: string) => `${variant}/${name}`;

export async function fetchIconSvg(name: string, variant: string) {
  const key = makeKey(variant, name);

  if (cache.has(key)) {
    return cache.get(key) as string;
  }

  if (pending.has(key)) {
    return pending.get(key) as Promise<string>;
  }

  const p = fetch(`/icons/${variant}/${name}.svg`).then((res) => {
    if (!res.ok) throw new Error(`Icon not found: ${key}`);
    return res.text();
  }).then((text) => {
    cache.set(key, text);
    pending.delete(key);
    return text;
  }).catch((err) => {
    pending.delete(key);
    throw err;
  });

  pending.set(key, p);
  return p;
}

export function getCachedIconSvg(name: string, variant: string) {
  const key = makeKey(variant, name);
  return cache.get(key) || null;
}

export async function preloadIcons(list: Array<{ name: string; variant: string }>) {
  await Promise.all(
    list.map((i) => fetchIconSvg(i.name, i.variant).catch(() => null))
  );
}

export function clearIconCache() {
  cache.clear();
}

export default {
  fetchIconSvg,
  getCachedIconSvg,
  preloadIcons,
  clearIconCache,
};
