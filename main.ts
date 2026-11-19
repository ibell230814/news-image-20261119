// make.fun bounty entry — "Sum up 19 November's world news in one image".
//
// The deliverable picture lives next to this file as entry.png. It is a
// single-page digest of Thursday, 19 November 2026: the first-ever
// Trump–Xi–Putin trilateral meeting in Shenzhen, Ukraine's latest strike
// on the Kerch Bridge, Iran broadening its Gulf attacks after the US hit
// Qeshm Island, the ICJ finding that Myanmar committed genocide against
// the Rohingya, Israel wrapping up its first ground operation beyond
// Gaza's Yellow Line since the October 2025 truce, and Anthropic's
// record-setting $81bn IPO debut on Nasdaq.
//
// What this program does is deliberately boring: it reads that PNG,
// sanity-checks it, and writes the exact same bytes to
// "<output dir>/entry.png". The output dir is /output inside the grading
// sandbox, or whatever MAKEFUN_OUTPUT_DIR points at when run by hand.
// Because nothing is re-encoded, repeated runs are byte-identical.
//
// Run it locally with:
//   MAKEFUN_OUTPUT_DIR=./out node main.ts

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Every PNG file starts with this fixed eight-byte signature.
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
// The bounty caps the picture at 1 MiB, so refuse anything larger.
const BYTE_LIMIT = 1024 * 1024;

function checkPicture(bytes: Buffer): void {
  if (bytes.length > BYTE_LIMIT) {
    throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
  }
  const headerOk = PNG_MAGIC.every((value, i) => bytes[i] === value);
  if (!headerOk) {
    throw new Error('entry.png does not start with a PNG signature');
  }
}

async function loadPicture(path: string): Promise<Buffer> {
  try {
    return await readFile(path);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') {
      throw new Error(`no entry.png found at ${path} — it must sit beside main.ts`);
    }
    throw err;
  }
}

async function main(): Promise<void> {
  const here = dirname(fileURLToPath(import.meta.url));
  const picture = await loadPicture(resolve(here, 'entry.png'));
  checkPicture(picture);

  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  await mkdir(targetDir, { recursive: true });
  const destination = resolve(targetDir, 'entry.png');
  await writeFile(destination, picture);

  console.log(`wrote ${destination} (${picture.length} bytes)`);
}

await main();
