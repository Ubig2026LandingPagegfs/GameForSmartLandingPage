const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_FOLDERS = [
  path.join(process.cwd(), "public/images"),
  path.join(process.cwd(), "public/assets"),
];

const SRC_FOLDER = path.join(process.cwd(), "src");

const MAX_WIDTH = 1920;
const QUALITY = 80;
const DELETE_ORIGINAL = true;

const EXCLUDED_FILES = [
  "favicon.png",
  "icon.png",
  "apple-touch-icon.png",
  "og-image.png",
  "twitter-image.png",
];

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const SOURCE_EXTENSIONS = [".tsx", ".ts", ".js", ".jsx", ".json", ".css"];

function shouldExclude(fileName) {
  return EXCLUDED_FILES.includes(fileName.toLowerCase());
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);

  if (!IMAGE_EXTENSIONS.includes(ext)) return;
  if (shouldExclude(fileName)) {
    console.log(`\u23ED Skip excluded: ${filePath}`);
    return;
  }

  const webpPath = filePath.replace(ext, ".webp");

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;

    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      });
    }

    await pipeline.webp({ quality: QUALITY }).toFile(webpPath);

    console.log(`\u2705 Converted: ${filePath} -> ${webpPath}`);

    if (DELETE_ORIGINAL) {
      fs.unlinkSync(filePath);
      console.log(`\uD83D\uDDD1 Deleted original: ${filePath}`);
    }

    updateSourceReferences(fileName, path.basename(webpPath));
  } catch (error) {
    console.error(`\u274C Failed: ${filePath}`, error.message);
  }
}

function updateSourceReferences(oldName, newName) {
  const files = getAllFiles(SRC_FOLDER);

  files.forEach((file) => {
    const ext = path.extname(file);

    if (!SOURCE_EXTENSIONS.includes(ext)) return;

    let content = fs.readFileSync(file, "utf8");

    if (content.includes(oldName)) {
      content = content.replaceAll(oldName, newName);
      fs.writeFileSync(file, content, "utf8");
      console.log(`\u270E Updated reference in: ${file}`);
    }
  });
}

function getAllFiles(dir) {
  let results = [];

  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}

async function scanAndOptimize() {
  for (const folder of IMAGE_FOLDERS) {
    if (!fs.existsSync(folder)) continue;

    const files = getAllFiles(folder);

    for (const file of files) {
      await processImage(file);
    }
  }

  console.log("\uD83C\uDF89 Image optimization completed");
}

scanAndOptimize();
