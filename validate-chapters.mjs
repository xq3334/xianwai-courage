// 校验剧本图的完整性：节点引用、选择格式、章节衔接、孤立节点。
// 这些错误在浏览器里只会表现为「卡住」，很难定位，所以在本地先跑一遍。
import { chapters, chapterList } from './src/content/chapters-v2.js';

const TERMINAL_TARGETS = new Set(['END']);
const problems = [];
const warnings = [];

function isTerminalTarget(target) {
  return TERMINAL_TARGETS.has(target) || target.startsWith('ENDING:');
}

function describeLocation(chapterId, nodeId) {
  return `${chapterId}:${nodeId}`;
}

function collectChoiceEntries(node) {
  // 引擎已兼容两种字段名，校验时也要同时接受
  const rawEntries = node.choices || node.options || [];
  return rawEntries.map((entry) => ({
    label: entry.text ?? entry.label,
    next: entry.next,
    effects: entry.effects,
    traits: entry.traits,
  }));
}

for (const chapterId of Object.keys(chapters)) {
  const chapterNodes = chapters[chapterId].nodes;

  if (!chapterNodes) {
    problems.push(`章节 ${chapterId} 缺少 nodes 对象`);
    continue;
  }

  // 入口节点名不统一（'start' / 'opening'），以章节声明的 start 字段为准
  const declaredEntryNodeId = chapters[chapterId].start;
  const entryNodeId =
    declaredEntryNodeId && chapterNodes[declaredEntryNodeId]
      ? declaredEntryNodeId
      : chapterNodes.start
        ? 'start'
        : chapterNodes.opening
          ? 'opening'
          : null;

  if (!entryNodeId) {
    problems.push(`章节 ${chapterId} 找不到入口节点（既无 start 也无 opening）`);
    continue;
  }
  if (declaredEntryNodeId && !chapterNodes[declaredEntryNodeId]) {
    problems.push(`章节 ${chapterId} 声明入口为 '${declaredEntryNodeId}'，但该节点不存在`);
  }

  const reachableNodeIds = new Set([entryNodeId]);
  let hasTerminalNode = false;

  for (const [nodeId, node] of Object.entries(chapterNodes)) {
    const location = describeLocation(chapterId, nodeId);
    const outgoingTargets = [];

    if (node.type === 'choice') {
      const choiceEntries = collectChoiceEntries(node);

      if (choiceEntries.length === 0) {
        problems.push(`${location} 是 choice 节点但没有任何选项`);
      }

      choiceEntries.forEach((entry, index) => {
        if (!entry.label) {
          problems.push(`${location} 选项 ${index} 缺少 text/label，按钮会显示为空`);
        }
        if (!entry.next) {
          problems.push(`${location} 选项 ${index} 缺少 next，点击后会卡住`);
        } else {
          outgoingTargets.push(entry.next);
        }
        if (entry.effects && entry.traits) {
          warnings.push(`${location} 选项 ${index} 同时有 effects 和 traits，traits 会被忽略`);
        }
      });
    } else if (node.type === 'end') {
      hasTerminalNode = true;
    } else if (node.next) {
      outgoingTargets.push(node.next);
    } else if (node.type !== 'end') {
      problems.push(`${location} (type=${node.type}) 缺少 next，推进后会卡住`);
    }

    for (const target of outgoingTargets) {
      if (typeof target !== 'string') {
        problems.push(`${location} 的 next 不是字符串：${JSON.stringify(target)}`);
        continue;
      }
      if (isTerminalTarget(target)) {
        hasTerminalNode = true;
        continue;
      }
      if (!chapterNodes[target]) {
        problems.push(`${location} -> ${target} 目标节点不存在`);
        continue;
      }
      reachableNodeIds.add(target);
    }
  }

  if (!hasTerminalNode) {
    problems.push(`章节 ${chapterId} 没有任何结束出口（END / ENDING: / type:'end'）`);
  }

  for (const nodeId of Object.keys(chapterNodes)) {
    if (!reachableNodeIds.has(nodeId)) {
      warnings.push(`${describeLocation(chapterId, nodeId)} 无法从 start 到达（孤立节点）`);
    }
  }
}

const chapterIdsInOrder = chapterList.map((entry) => entry.id);
for (const chapterId of chapterIdsInOrder) {
  if (!chapters[chapterId]) {
    problems.push(`chapterList 引用了不存在的章节：${chapterId}`);
  }
}
for (const chapterId of Object.keys(chapters)) {
  if (!chapterIdsInOrder.includes(chapterId)) {
    warnings.push(`章节 ${chapterId} 未登记在 chapterList 中，顺序推进会跳过它`);
  }
}

console.log(`章节数：${Object.keys(chapters).length}，chapterList 顺序：${chapterIdsInOrder.join(' -> ')}`);
console.log('');

if (warnings.length > 0) {
  console.log(`警告 ${warnings.length} 条：`);
  warnings.forEach((warning) => console.log(`  ! ${warning}`));
  console.log('');
}

if (problems.length > 0) {
  console.log(`错误 ${problems.length} 条：`);
  problems.forEach((problem) => console.log(`  x ${problem}`));
  process.exit(1);
}

console.log('剧本图校验通过：所有节点引用有效，每章都有结束出口。');
