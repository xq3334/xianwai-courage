import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const SCENES_DIRECTORY = 'assets/scenes';
const TARGET_WIDTH = 1280;
const WEBP_QUALITY = 82;
const OVERSIZED_THRESHOLD_BYTES = 500 * 1024;

const sceneFiles = readdirSync(SCENES_DIRECTORY).filter((name) => name.endsWith('.webp'));

const oversizedFiles = sceneFiles.filter((name) => {
  return statSync(join(SCENES_DIRECTORY, name)).size > OVERSIZED_THRESHOLD_BYTES;
});

if (oversizedFiles.length === 0) {
  console.log('没有需要压缩的场景图。');
  process.exit(0);
}

console.log(`发现 ${oversizedFiles.length} 张超大场景图，开始压缩...\n`);

let totalBytesSaved = 0;

for (const fileName of oversizedFiles) {
  const originalPath = join(SCENES_DIRECTORY, fileName);
  const temporaryPath = join(SCENES_DIRECTORY, `__compressing__${fileName}`);
  const originalBytes = statSync(originalPath).size;

  await sharp(originalPath)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(temporaryPath);

  const compressedBytes = statSync(temporaryPath).size;
  renameSync(temporaryPath, originalPath);

  const savedBytes = originalBytes - compressedBytes;
  totalBytesSaved += savedBytes;

  const originalKilobytes = Math.round(originalBytes / 1024);
  const compressedKilobytes = Math.round(compressedBytes / 1024);
  const reductionPercent = Math.round((savedBytes / originalBytes) * 100);

  console.log(
    `${fileName.padEnd(28)} ${String(originalKilobytes).padStart(5)} KB -> ` +
    `${String(compressedKilobytes).padStart(4)} KB  (-${reductionPercent}%)`
  );
}

console.log(`\n总计节省 ${Math.round(totalBytesSaved / 1024 / 1024 * 100) / 100} MB`);
