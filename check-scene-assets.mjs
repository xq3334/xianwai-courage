// 校验剧本用到的每个场景名都能落到一张真实存在、且已预加载的图上。
//
// 为什么需要这个脚本：fallback.js 的 resolveSceneImage 对认不出的名字一律返回
// 'classroom-day'。这个兜底让线上不会碎，但也把两类错误藏得很深 ——
// 场景名拼错、以及新图加了映射却没人用，两者在浏览器里都表现为「背景就是不对，
// 但也不报错」。validate-chapters.mjs 只看节点跳转，看不到这一层。
//
// 另外校验预加载清单：漏了不会报错，只是那张图第一次出现时闪一下白，很容易漏掉。
import fs from 'node:fs';
import path from 'node:path';
import { chapters, chapterList } from './src/content/chapters-v2.js';
import { endings } from './src/content/endings.js';
import { resolveSceneFile, isImageryScene } from './src/art/stage.js';
import { hasEndingPoster, listEndingPosterIds, describeEndingPoster } from './src/art/endingArt.js';

const projectRoot = process.cwd();
const SCENES_DIRECTORY = path.join(projectRoot, 'assets', 'scenes');
const ENDINGS_DIRECTORY = path.join(projectRoot, 'assets', 'endings');

const stageSource = fs.readFileSync(path.join(projectRoot, 'src', 'art', 'stage.js'), 'utf8');
const fallbackSource = fs.readFileSync(path.join(projectRoot, 'src', 'art', 'fallback.js'), 'utf8');

function extractObjectLiteralKeys(source, declarationName) {
  const blockMatch = source.match(new RegExp(`const ${declarationName} = \\{([\\s\\S]*?)\\n\\};`));
  if (!blockMatch) return new Set();

  const keys = [...blockMatch[1].matchAll(/^\s*'?([\w-]+)'?\s*:/gm)].map((match) => match[1]);
  return new Set(keys);
}

function extractArrayLiteralValues(source, declarationName) {
  const blockMatch = source.match(new RegExp(`const ${declarationName} = \\[([\\s\\S]*?)\\];`));
  if (!blockMatch) return new Set();

  const values = [...blockMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
  return new Set(values);
}

const preloadedScenes = extractArrayLiteralValues(stageSource, 'BASELINE_SCENES');
const knownSceneNames = new Set([
  ...extractObjectLiteralKeys(stageSource, 'SCENE_ALIASES'),
  ...extractObjectLiteralKeys(fallbackSource, 'SCENE_FALLBACK')
]);

const availableSceneFiles = new Set(
  fs.readdirSync(SCENES_DIRECTORY)
    .filter((fileName) => fileName.endsWith('.webp'))
    .map((fileName) => path.basename(fileName, '.webp'))
);

// 收集剧本里每个 art 值，以及它出现在哪些章节
const sceneUsage = new Map();

for (const { id: chapterId } of chapterList) {
  for (const [nodeId, node] of Object.entries(chapters[chapterId].nodes)) {
    if (!node.art) continue;
    if (!sceneUsage.has(node.art)) {
      sceneUsage.set(node.art, { count: 0, firstLocation: `${chapterId}/${nodeId}` });
    }
    sceneUsage.get(node.art).count += 1;
  }
}

const problems = [];
const usedSceneFiles = new Set();

for (const [sceneName, usage] of sceneUsage) {
  if (!knownSceneNames.has(sceneName)) {
    problems.push(
      `场景名 '${sceneName}' 没有任何映射，会静默兜底成 classroom-day` +
      `（用了 ${usage.count} 次，例如 ${usage.firstLocation}）`
    );
    continue;
  }

  const resolvedFile = resolveSceneFile(sceneName);
  usedSceneFiles.add(resolvedFile);

  if (!availableSceneFiles.has(resolvedFile)) {
    problems.push(
      `场景 '${sceneName}' 映射到 ${resolvedFile}.webp，但这个文件不存在` +
      `（用了 ${usage.count} 次，例如 ${usage.firstLocation}）`
    );
    continue;
  }

  if (!preloadedScenes.has(resolvedFile)) {
    problems.push(
      `场景 ${resolvedFile}.webp 不在 BASELINE_SCENES 预加载清单里，第一次出现会闪白` +
      `（用了 ${usage.count} 次，例如 ${usage.firstLocation}）`
    );
  }
}

const imageryScenesInUse = [...sceneUsage.keys()].filter((sceneName) => isImageryScene(sceneName));

console.log(`剧本用到 ${sceneUsage.size} 个场景名，落到 ${usedSceneFiles.size} 张图上`);
console.log(`意象图使用情况：${imageryScenesInUse.length > 0 ? imageryScenesInUse.join(', ') : '（无）'}`);

const unusedSceneFiles = [...availableSceneFiles]
  .filter((fileName) => !usedSceneFiles.has(fileName))
  .sort();

if (unusedSceneFiles.length > 0) {
  console.log(`未被任何节点使用的图：${unusedSceneFiles.join(', ')}`);
}

// 结局海报：每个结局都该有一张图。
// 缺图不会报错（ending.js 会整块跳过海报），但结局是全程的落点，
// 六个里少一个不该靠通关到那一个结局才发现。
const availableEndingPosterFiles = fs.existsSync(ENDINGS_DIRECTORY)
  ? new Set(
      fs.readdirSync(ENDINGS_DIRECTORY)
        .filter((fileName) => fileName.endsWith('.webp'))
        .map((fileName) => path.basename(fileName, '.webp'))
    )
  : new Set();

const endingIds = Object.keys(endings);

for (const endingId of endingIds) {
  if (!hasEndingPoster(endingId)) {
    problems.push(`结局 '${endingId}' 在 endingArt.js 里没有登记海报，结局面板会只有文字`);
    continue;
  }

  if (!availableEndingPosterFiles.has(endingId)) {
    problems.push(`结局 '${endingId}' 登记了海报，但 assets/endings/${endingId}.webp 不存在`);
    continue;
  }

  // alt 缺失对读屏用户等于这张图不存在，而海报承载的正是正文没说出口的情绪
  if (describeEndingPoster(endingId).trim().length === 0) {
    problems.push(`结局 '${endingId}' 的海报没有 alt 描述，读屏用户会完全拿不到这张图`);
  }
}

const orphanedPosterIds = listEndingPosterIds().filter((posterId) => !endingIds.includes(posterId));
if (orphanedPosterIds.length > 0) {
  problems.push(`endingArt.js 登记了不存在的结局：${orphanedPosterIds.join(', ')}`);
}

console.log(
  `结局海报：${endingIds.filter((id) => availableEndingPosterFiles.has(id)).length}/${endingIds.length} 张就位`
);

if (problems.length > 0) {
  console.log('');
  console.log(`发现 ${problems.length} 个美术资源问题：`);
  problems.forEach((problem) => console.log(`  x ${problem}`));
  process.exit(1);
}

console.log('');
console.log('所有场景名都有映射、有图、且已预加载，六个结局都有海报。');
