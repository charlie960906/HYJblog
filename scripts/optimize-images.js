const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDirectory = path.join(process.cwd(), 'public', 'images');

function getImageFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getImageFiles(entryPath);
    return /\.(jpe?g|png)$/i.test(entry.name) ? [entryPath] : [];
  });
}

async function optimizeImages() {
  const imageFiles = getImageFiles(imagesDirectory);

  await Promise.all(imageFiles.map(async (sourcePath) => {
    const relativePath = path.relative(imagesDirectory, sourcePath);
    const outputPath = path.join(imagesDirectory, relativePath.replace(/\.(jpe?g|png)$/i, '.webp'));
    const sourceStats = fs.statSync(sourcePath);

    if (fs.existsSync(outputPath) && fs.statSync(outputPath).mtimeMs >= sourceStats.mtimeMs) return;

    await sharp(sourcePath)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(outputPath);
  }));
}

optimizeImages().catch((error) => {
  console.error('Image optimization failed:', error);
  process.exitCode = 1;
});