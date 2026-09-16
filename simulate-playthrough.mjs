// 全流程模拟：按引擎的真实推进逻辑走完每一条分支。
// 目的是在不开浏览器的情况下，抓出「进章即卡死」「选项指向空节点」「结局 id 不存在」这类问题。
import { chapters, chapterList } from './src/content/chapters-v2.js';
import { endings } from './src/content/endings.js';

const MAX_STEPS_PER_RUN = 5000;

function resolveEntryNodeId(chapterId) {
  const chapter = chapters[chapterId];
  if (!chapter) return 'start';

  const declaredEntryNodeId = chapter.start;
  if (declaredEntryNodeId && chapter.nodes[declaredEntryNodeId]) {
    return declaredEntryNodeId;
  }
  if (chapter.nodes.start) return 'start';
  if (chapter.nodes.opening) return 'opening';
  return Object.keys(chapter.nodes)[0];
}

function getNextChapterId(currentChapterId) {
  const index = chapterList.findIndex((entry) => entry.id === currentChapterId);
  if (index < 0 || index === chapterList.length - 1) return null;
  return chapterList[index + 1].id;
}

function readChoiceEntries(node) {
  const rawEntries = node.choices || node.options || [];
  return rawEntries.map((entry) => ({
    label: entry.text ?? entry.label,
    next: entry.next,
    effects: entry.effects,
    traits: entry.traits,
  }));
}

// 模拟 engine.applyEffects，含 traits -> effects 的兼容转换
function applyChoiceToTraits(choiceEntry, traits) {
  let effects = choiceEntry.effects;
  if (!effects && choiceEntry.traits) {
    effects = Object.entries(choiceEntry.traits).map(([trait, delta]) => ({ trait, delta }));
  }
  if (!effects) return;

  for (const effect of effects) {
    if (effect.trait && effect.trait in traits) {
      traits[effect.trait] += effect.delta;
    }
  }
}

// 每次跑一条路线：遇到选择节点时固定取第 preferredChoiceIndex 个选项
function runPlaythrough(preferredChoiceIndex) {
  const traits = { autonomy: 0, boundary: 0, ally: 0, acceptance: 0, repair: 0, action: 0 };
  const visitedChapterIds = [];
  const failures = [];

  let currentChapterId = chapterList[0].id;
  let currentNodeId = resolveEntryNodeId(currentChapterId);
  let choiceCount = 0;
  let reachedEndingId = null;

  visitedChapterIds.push(currentChapterId);

  for (let step = 0; step < MAX_STEPS_PER_RUN; step += 1) {
    const chapter = chapters[currentChapterId];
    const node = chapter.nodes[currentNodeId];

    if (!node) {
      failures.push(`节点不存在：${currentChapterId}:${currentNodeId}`);
      break;
    }

    let nextTarget;

    if (node.type === 'choice') {
      const choiceEntries = readChoiceEntries(node);
      if (choiceEntries.length === 0) {
        failures.push(`${currentChapterId}:${currentNodeId} choice 节点没有选项`);
        break;
      }
      const chosen = choiceEntries[Math.min(preferredChoiceIndex, choiceEntries.length - 1)];
      applyChoiceToTraits(chosen, traits);
      choiceCount += 1;
      nextTarget = chosen.next;
    } else if (node.type === 'end') {
      nextTarget = 'END';
    } else {
      nextTarget = node.next;
    }

    if (typeof nextTarget !== 'string') {
      failures.push(`${currentChapterId}:${currentNodeId} 的 next 无效：${JSON.stringify(nextTarget)}`);
      break;
    }

    if (nextTarget.startsWith('ENDING:')) {
      reachedEndingId = nextTarget.replace('ENDING:', '');
      if (!endings[reachedEndingId]) {
        failures.push(`${currentChapterId}:${currentNodeId} 指向不存在的结局：${reachedEndingId}`);
      }
      break;
    }

    if (nextTarget === 'END') {
      const nextChapterId = getNextChapterId(currentChapterId);
      if (!nextChapterId) {
        reachedEndingId = '(按特质计算)';
        break;
      }
      currentChapterId = nextChapterId;
      currentNodeId = resolveEntryNodeId(currentChapterId);
      visitedChapterIds.push(currentChapterId);
      continue;
    }

    currentNodeId = nextTarget;
  }

  return { traits, visitedChapterIds, choiceCount, reachedEndingId, failures };
}

let totalFailures = 0;
const maxChoicesPerNode = 5;

for (let preferredChoiceIndex = 0; preferredChoiceIndex < maxChoicesPerNode; preferredChoiceIndex += 1) {
  const result = runPlaythrough(preferredChoiceIndex);
  const chapterPath = result.visitedChapterIds.join(' -> ');
  const status = result.failures.length === 0 ? 'OK  ' : 'FAIL';

  console.log(`${status} always-pick-#${preferredChoiceIndex}: 章节 ${result.visitedChapterIds.length}/${chapterList.length}，选择 ${result.choiceCount} 次，结局 ${result.reachedEndingId ?? '未到达'}`);
  console.log(`     路径: ${chapterPath}`);

  if (result.failures.length > 0) {
    totalFailures += result.failures.length;
    result.failures.forEach((failure) => console.log(`     x ${failure}`));
  }

  if (result.visitedChapterIds.length < chapterList.length && result.failures.length === 0) {
    console.log(`     ! 未走完全部章节（可能是提前进入结局分支）`);
  }
}

console.log('');
if (totalFailures > 0) {
  console.log(`模拟发现 ${totalFailures} 个问题。`);
  process.exit(1);
}
console.log('全流程模拟通过：每条路线都能从序章走到结局。');
