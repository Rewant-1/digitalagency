const fs = require('fs');
const path = require('path');

function walk(dir, prefix = '') {
  if (!fs.existsSync(dir)) {
    console.log(`${prefix}${path.basename(dir)} [MISSING]`);
    return;
  }
  const items = fs.readdirSync(dir);
  for (const it of items) {
    const full = path.join(dir, it);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      console.log(`${prefix}${it}/`);
      walk(full, prefix + '  ');
    } else {
      console.log(`${prefix}${it}`);
    }
  }
}

const root = process.cwd();
const publishDir = path.join(root, 'dist_site');
console.log('=== dist_site contents ===');
walk(publishDir);
console.log('=== end dist_site ===');
