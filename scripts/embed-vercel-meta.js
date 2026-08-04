/**
 * On Vercel builds, copy system env into CRA-visible REACT_APP_* vars
 * so the client can tell preview vs production / which git branch.
 */
const fs = require('fs');
const path = require('path');

const lines = [];

if (process.env.VERCEL_ENV) {
  lines.push(`REACT_APP_VERCEL_ENV=${process.env.VERCEL_ENV}`);
}
if (process.env.VERCEL_GIT_COMMIT_REF) {
  lines.push(`REACT_APP_GIT_BRANCH=${process.env.VERCEL_GIT_COMMIT_REF}`);
}

if (!lines.length) {
  process.exit(0);
}

const out = path.join(__dirname, '..', '.env.production.local');
fs.writeFileSync(out, `${lines.join('\n')}\n`);
console.log(`Wrote ${out}: ${lines.join(', ')}`);
