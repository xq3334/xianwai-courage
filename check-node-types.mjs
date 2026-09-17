// 校验剧本里出现的每种 node.type，引擎的 renderNodeBody 都真的有分支处理。
//
// 为什么单独写一个脚本：simulate-playthrough.mjs 自己实现了一份推进逻辑，
// 里面包含 `node.type === 'end'` 的处理，而引擎当时并没有。
// 于是模拟全绿、线上却在序章最后一步停住 —— 脚本验证的是「应该怎样」，不是「实际怎样」。
// 这里直接读 engine.js 源码，比对它认识的类型和剧本实际用到的类型。
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.argv[2] ?? process.cwd();

const engineSource = fs.readFileSync(path.join(projectRoot, 'src', 'engine.js'), 'utf8');

// renderNodeBody 里的分支写法统一是 node.type === 'xxx'
const HANDLED_TYPE_PATTERN = /node\.type\s*===\s*'([^']+)'/g;
const handledTypes = new Set(
  [...engineSource.matchAll(HANDLED_TYPE_PATTERN)].map((match) => match[1])
);

const contentDirectory = path.join(projectRoot, 'src', 'content');
const chapterFileNames = fs
  .readdirSync(contentDirectory)
  .filter((fileName) => fileName.endsWith('.js') && fileName !== 'chapters-v2.js');

const NODE_TYPE_PATTERN = /type:\s*'([^']+)'/g;
const usedTypesWithLocations = new Map();

for (const fileName of chapterFileNames) {
  const chapterSource = fs.readFileSync(path.join(contentDirectory, fileName), 'utf8');
  for (const match of chapterSource.matchAll(NODE_TYPE_PATTERN)) {
    const nodeType = match[1];
    if (!usedTypesWithLocations.has(nodeType)) {
      usedTypesWithLocations.set(nodeType, new Set());
    }
    usedTypesWithLocations.get(nodeType).add(fileName);
  }
}

console.log(`引擎处理的节点类型：${[...handledTypes].sort().join(', ')}`);
console.log(`剧本使用的节点类型：${[...usedTypesWithLocations.keys()].sort().join(', ')}`);

const unhandledTypes = [...usedTypesWithLocations.keys()].filter(
  (nodeType) => !handledTypes.has(nodeType)
);

if (unhandledTypes.length > 0) {
  console.log('');
  console.log(`发现 ${unhandledTypes.length} 种引擎无法渲染的节点类型（到达即卡死）：`);
  for (const nodeType of unhandledTypes) {
    const files = [...usedTypesWithLocations.get(nodeType)].sort().join(', ');
    console.log(`  x '${nodeType}' 出现在：${files}`);
  }
  process.exit(1);
}

console.log('');
console.log('剧本用到的每种节点类型引擎都能渲染。');
