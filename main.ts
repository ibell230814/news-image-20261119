// Entry for make.fun's "Sum up 19 November's world news in one image" bounty (Node 22, standard library only).
// The picture itself is entry.png beside this file: a one-page summary of Thursday 19 November 2026 — the
// first Trump–Xi–Putin trilateral summit in Shenzhen, Ukraine's third strike in four days on the Kerch
// Bridge, Iran widening its Gulf attacks after the US strike on Qeshm Island, the ICJ ruling Myanmar
// committed genocide against the Rohingya, Israel ending its first ground operation past Gaza's Yellow
// Line since the October 2025 truce, and Anthropic's record $81bn IPO debut on Nasdaq. build_image.py
// is the script that drew it (kept outside this repository).
//
// This program copies entry.png to /output/entry.png, byte for byte, so both grader runs write identical
// bytes. The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees
// exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourceImage = new URL('./entry.png', import.meta.url);
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, join(outputDir, 'entry.png'));
