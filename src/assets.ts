import fs from 'node:fs';

/**
 * Build-time presence checks for assets that are not in the repo yet.
 * Sections and CTAs gate on these so the page never ships a dead control or a
 * broken image. Drop the file into public/ and the UI appears on next build.
 */
export const has = {
  video: fs.existsSync('public/copperhead-demo.mp4'),
  poster: fs.existsSync('public/demo-poster.png'),
  captions: fs.existsSync('public/copperhead-demo.vtt'),
  boardRender: fs.existsSync('public/pcb.png'),
};
