/**
 * Build-time fetch of live adoption stats (GitHub stars, npm installs). Runs in
 * the Astro build (Node), so the numbers are baked into the HTML: no client JS,
 * no layout shift, no visitor-facing rate limits. The refresh cadence is the
 * deploy cadence, so a scheduled Actions run keeps them current (see the
 * `schedule` trigger in .github/workflows/astro.yml).
 *
 * Every fetch is guarded the same way assets.ts gates on file presence: if the
 * repo or package is not published yet (or an API is down), the value is null
 * and the UI hides that stat rather than shipping a broken control. Nothing to
 * render until `copperheadhq/copperhead` and the `copperhead` npm package
 * are public — the numbers appear on the first build after that.
 *
 * ES modules are singletons, so the two fetches run once for the whole build
 * even though the hero, proof and navbar all import `stats`.
 */
import { pkg, repo } from './config';

// Strip the origin so the same value feeds both the API path and any link.
const ghSlug = repo.replace(/^https?:\/\/github\.com\//, '');

// GITHUB_TOKEN is present in Actions and in Cloudflare's build environment; it
// lifts the unauthenticated 60/hr rate limit that a scheduled build would
// otherwise brush against. Optional locally.
const ghToken = process.env.GITHUB_TOKEN;

/**
 * A silent null is the right thing to render and the wrong thing to debug: a
 * dead stat looks identical whether the repo is private, the API is down or the
 * token has expired. So every miss says why on stderr, which is the Cloudflare
 * build log.
 */
function warn(message: string): null {
  console.warn(`[stats] ${message}`);
  return null;
}

async function fetchRepo(withToken: boolean): Promise<Response> {
  return fetch(`https://api.github.com/repos/${ghSlug}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(withToken && ghToken ? { Authorization: `Bearer ${ghToken}` } : {}),
    },
  });
}

async function ghStars(): Promise<number | null> {
  try {
    let res = await fetchRepo(true);

    // An expired or malformed token is worse than no token at all: the repo is
    // public, so the same request succeeds unauthenticated, but a bad bearer
    // earns a 401 and takes the stat down until somebody notices. Retry once
    // without it and spend the anonymous rate limit rather than the star count.
    if (res.status === 401 && ghToken) {
      warn('GitHub rejected the token (401), retrying unauthenticated');
      res = await fetchRepo(false);
    }

    if (!res.ok) return warn(`no GitHub stars: HTTP ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (typeof data.stargazers_count !== 'number') {
      return warn('no GitHub stars: no stargazers_count in the response');
    }
    return data.stargazers_count;
  } catch (err) {
    return warn(`no GitHub stars: ${err}`);
  }
}

async function npmDownloads(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${pkg}`,
    );
    if (!res.ok) return warn(`no npm installs: HTTP ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (typeof data.downloads !== 'number') {
      return warn('no npm installs: no downloads in the response');
    }
    return data.downloads;
  } catch (err) {
    return warn(`no npm installs: ${err}`);
  }
}

export const stats = {
  stars: await ghStars(),
  downloads: await npmDownloads(),
};

/** 1240 -> "1.2k", 12400 -> "12k", 980 -> "980". */
export function compact(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k >= 10 ? Math.round(k) : k.toFixed(1)}k`;
}
