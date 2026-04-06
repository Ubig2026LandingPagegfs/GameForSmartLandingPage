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

const notWebp = images.filter(f => f.ext !== '.webp' && f.ext !== '.gif' && f.ext !== '.svg');

fs.writeFileSync('scan_results.json', JSON.stringify({
    total: images.length,
    notWebp: notWebp.map(x => ({
        ...x,
        path: x.path.replace(publicDir, '')
    }))
}, null, 2));

console.log("Wrote to scan_results.json");
