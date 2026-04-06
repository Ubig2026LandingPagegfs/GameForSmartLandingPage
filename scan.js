const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = walk(path.join(dir, file), fileList);
    } else {
      fileList.push({
        path: path.join(dir, file),
        ext: path.extname(file).toLowerCase(),
        sizeKB: Math.round(stat.size / 1024)
      });
    }
  }
  return fileList;
}

const allFiles = walk(publicDir);
const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const images = allFiles.filter(f => imageExts.includes(f.ext));

const notWebp = images.filter(f => f.ext !== '.webp');
const largeImages = images.filter(f => f.sizeKB > 500);

console.log('Total Images:', images.length);
console.log('Non-WebP Images:', notWebp.length);
console.log('Images > 500KB:', largeImages.length);

if (notWebp.length > 0) {
    console.log('\n--- Non-Webp ---');
    notWebp.slice(0, 10).forEach(i => console.log(`${i.path.replace(publicDir, '')} (${i.sizeKB} KB)`));
    if(notWebp.length > 10) console.log('...');
}

if (largeImages.length > 0) {
    console.log('\n--- > 500KB ---');
    largeImages.slice(0, 10).forEach(i => console.log(`${i.path.replace(publicDir, '')} (${i.sizeKB} KB) [${i.ext}]`));
    if(largeImages.length > 10) console.log('...');
}
