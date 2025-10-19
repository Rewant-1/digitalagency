const fs = require('fs').promises;
const path = require('path');

async function copyRecursive(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    for (const e of entries) {
      await copyRecursive(path.join(src, e), path.join(dest, e));
    }
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }
}

async function main() {
  const root = process.cwd();
  const publishDir = path.join(root, 'dist_site');

  // Remove previous publish folder if present
  try {
    await fs.rm(publishDir, { recursive: true, force: true });
  } catch (err) {
    // ignore
  }

  await fs.mkdir(publishDir, { recursive: true });

  const itemsToCopy = ['index.html', 'script.js', 'images'];
  for (const item of itemsToCopy) {
    const src = path.join(root, item);
    const dest = path.join(publishDir, item);
    try {
      await copyRecursive(src, dest);
      console.log(`Copied ${item}`);
    } catch (err) {
      console.warn(`Skipping ${item}: ${err.message}`);
    }
  }

  // Copy generated CSS from dist/styles.css if present
  const builtCss = path.join(root, 'dist', 'styles.css');
  const cssDest = path.join(publishDir, 'styles.css');
  try {
    await fs.copyFile(builtCss, cssDest);
    console.log('Copied dist/styles.css -> dist_site/styles.css');
  } catch (err) {
    console.warn(`No built CSS found at ${builtCss}: ${err.message}`);
  }

  console.log('Prepared publish folder at dist_site/');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
