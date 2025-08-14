import { createHash } from 'crypto';
import fs from 'fs';

const CRITICAL = [
  'client/index.html',
  'client/src/main.tsx',
  'client/src/pages/home/Hero.tsx',
  'client/src/index.css'
];
const STATE = 'scripts/ui-freeze.json';

function hashFile(p){ return createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }

const mode = process.argv[2];
if (mode === '--lock') {
  const map = Object.fromEntries(CRITICAL.map(p => [p, hashFile(p)]));
  fs.writeFileSync(STATE, JSON.stringify(map, null, 2));
  console.log('[ui-freeze] baseline locked');
  process.exit(0);
}

if (mode === '--check') {
  if (!fs.existsSync(STATE)) process.exit(0);
  const baseline = JSON.parse(fs.readFileSync(STATE,'utf8'));
  const diffs = [];
  for (const p of Object.keys(baseline)) {
    const cur = hashFile(p);
    if (cur !== baseline[p]) diffs.push(p);
  }
  if (diffs.length) {
    console.error('[ui-freeze] blocked changes in:', diffs);
    process.exit(1);
  }
  process.exit(0);
}