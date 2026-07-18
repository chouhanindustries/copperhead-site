/** Shared helpers for the blog routes. */

/** Canonical path for a post, from its collection id (the filename slug). */
export const postPath = (id: string) => `/blog/${id}/`;

/** '14 July 2026'. Fixed to en-GB so the build does not depend on the host locale. */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
