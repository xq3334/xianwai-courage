// 按 scene-plan.mjs 的锚点重写各章节点的 art 字段。
// 加 --write 才会改文件，默认只打印预览。

import { readFileSync, writeFileSync } from 'node:fs';
import { SCENE_PLAN } from './scene-plan.mjs';
import { chapters, chapterList } from './src/content/chapters-v2.js';

const CHAPTER_FILES = {
  prologue: 'src/content/ch0-prologue-v2.js',
  ch1: 'src/content/ch1-v2.js',
  ch2: 'src/content/ch2-v2.js',
  ch3: 'src/content/ch3-v2.js',
  ch4: 'src/content/ch4-v2.js',
  ch5: 'src/content/ch5-v2.js',
  ch6: 'src/content/ch6-v2.js',
  ch7: 'src/content/ch7-v2.js',
  ch8: 'src/content/ch8-v2.js',
  finale: 'src/content/ch-finale-v2.js'
};

const shouldWriteFiles = process.argv.includes('--write');

function collectOutgoingNodeIds(node) {
  const targets = [];
  if (node.next) targets.push(node.next);

  const optionList = node.choices || node.options || [];
  for (const option of optionList) {
    if (option.next) targets.push(option.next);
  }

  return targets;
}

// 从每个锚点出发做广度优先遍历，把场景传播给后续节点。
// 遇到别的锚点就停下，那段归下一个锚点管。
function resolveSceneAssignments(chapterId) {
  const chapter = chapters[chapterId];
  const plan = SCENE_PLAN[chapterId];
  const anchors = plan.anchors;

  const assignments = new Map();
  const entryNodeId = chapter.start;
  const anchorNodeIds = Object.keys(anchors);

  const traversalOrder = anchorNodeIds.includes(entryNodeId)
    ? anchorNodeIds
    : [entryNodeId, ...anchorNodeIds];

  for (const anchorNodeId of traversalOrder) {
    const anchorScene = anchors[anchorNodeId] || plan.defaultScene;
    if (!chapter.nodes[anchorNodeId]) continue;

    const pending = [anchorNodeId];
    const visitedInThisPass = new Set();

    while (pending.length > 0) {
      const currentNodeId = pending.shift();
      if (visitedInThisPass.has(currentNodeId)) continue;
      visitedInThisPass.add(currentNodeId);

      const currentNode = chapter.nodes[currentNodeId];
      if (!currentNode) continue;

      const isForeignAnchor = currentNodeId !== anchorNodeId && anchors[currentNodeId];
      if (isForeignAnchor) continue;

      if (!assignments.has(currentNodeId)) {
        assignments.set(currentNodeId, anchorScene);
      }

      pending.push(...collectOutgoingNodeIds(currentNode));
    }
  }

  // 图上到不了的孤立节点兜底
  for (const nodeId of Object.keys(chapter.nodes)) {
    if (!assignments.has(nodeId)) {
      assignments.set(nodeId, plan.defaultScene);
    }
  }

  // 单节点覆盖最后生效，且不参与上面的传播，所以只改这一个节点。
  // 节点名写错时必须报错：静默跳过会让意象图看起来"配了但没生效"。
  const overrides = plan.overrides || {};
  for (const [nodeId, scene] of Object.entries(overrides)) {
    if (!chapter.nodes[nodeId]) {
      throw new Error(`${chapterId} 的 overrides 指向不存在的节点：${nodeId}`);
    }
    if (!chapter.nodes[nodeId].art) {
      throw new Error(`${chapterId} / ${nodeId} 没有 art 字段，覆盖不会生效`);
    }
    assignments.set(nodeId, scene);
  }

  return assignments;
}

// art 只改冒号后面的值，节点键名和缩进原样保留。
function rewriteChapterSource(chapterId, assignments) {
  const filePath = CHAPTER_FILES[chapterId];
  const sourceLines = readFileSync(filePath, 'utf8').split('\n');

  const nodeKeyPattern = /^(\s{4})([A-Za-z_][\w]*)\s*:\s*\{\s*$/;
  const artLinePattern = /^(\s*)art\s*:\s*'([^']*)'(,?)(\s*)$/;

  let currentNodeId = null;
  let changeCount = 0;

  const rewrittenLines = sourceLines.map((line) => {
    const nodeKeyMatch = line.match(nodeKeyPattern);
    if (nodeKeyMatch) {
      currentNodeId = nodeKeyMatch[2];
      return line;
    }

    const artMatch = line.match(artLinePattern);
    if (artMatch && currentNodeId && assignments.has(currentNodeId)) {
      const targetScene = assignments.get(currentNodeId);
      if (artMatch[2] !== targetScene) changeCount += 1;
      return `${artMatch[1]}art: '${targetScene}'${artMatch[3]}${artMatch[4]}`;
    }

    return line;
  });

  if (shouldWriteFiles) {
    writeFileSync(filePath, rewrittenLines.join('\n'), 'utf8');
  }

  return changeCount;
}

let totalChanges = 0;

for (const { id: chapterId } of chapterList) {
  const assignments = resolveSceneAssignments(chapterId);

  const sceneCounts = new Map();
  for (const [nodeId, scene] of assignments) {
    if (!chapters[chapterId].nodes[nodeId].art) continue;
    sceneCounts.set(scene, (sceneCounts.get(scene) || 0) + 1);
  }

  const changeCount = rewriteChapterSource(chapterId, assignments);
  totalChanges += changeCount;

  const breakdown = [...sceneCounts]
    .sort((left, right) => right[1] - left[1])
    .map(([scene, count]) => `${scene}×${count}`)
    .join(', ');

  console.log(`${chapterId.padEnd(9)} 改 ${String(changeCount).padStart(3)} 处 | ${breakdown}`);
}

console.log(`\n合计 ${totalChanges} 处 art 变更${shouldWriteFiles ? '（已写入）' : '（预览，加 --write 生效）'}`);
