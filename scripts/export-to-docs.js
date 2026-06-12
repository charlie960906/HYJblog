const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const outDir = path.join(cwd, 'out');
const docsDir = path.join(cwd, 'docs');

function rmDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

try {
  if (!fs.existsSync(outDir)) {
    console.error('Export output not found: out/');
    process.exit(1);
  }

  rmDir(docsDir);
  fs.renameSync(outDir, docsDir);
  console.log('Moved out/ -> docs/');
} catch (err) {
  console.error('Failed to move out to docs:', err);
  process.exit(1);
}
