// 深度内容检查：自动化测试容易漏掉的剧本问题
import { chapters, chapterList } from './src/content/chapters-v2.js';

const issues = [];
const warnings = [];

for (const { id: chapterId } of chapterList) {
  const chapter = chapters[chapterId];
  
  for (const [nodeId, node] of Object.entries(chapter.nodes)) {
    const loc = `${chapterId}:${nodeId}`;
    
    if (node.type === 'choice') {
      const choices = node.choices || node.options || [];
      
      if (choices.length === 0) {
        issues.push(`${loc} choice 节点没有任何选项`);
        continue;
      }
      
      if (choices.length === 1) {
        warnings.push(`${loc} choice 只有 1 个选项（形式选择）`);
      }
      
      choices.forEach((choice, idx) => {
        const text = choice.text || choice.label;
        
        if (!text || text.trim() === '') {
          issues.push(`${loc} 选项 #${idx} 文本为空`);
        }
        
        if (!choice.next) {
          issues.push(`${loc} 选项 #${idx} "${text}" 缺少 next`);
        }
        
        const hasEffects = choice.effects && choice.effects.length > 0;
        const hasTraits = choice.traits && Object.keys(choice.traits).length > 0;
        
        if (!hasEffects && !hasTraits) {
          warnings.push(`${loc} 选项 "${text}" 没有特质影响`);
        }
      });
      
      if (!node.prompt && !node.text) {
        warnings.push(`${loc} choice 节点没有 prompt 也没有 text`);
      }
    }
    
    if (['dialogue', 'observation', 'practice', 'taskSeparation'].includes(node.type)) {
      if (!node.next) {
        issues.push(`${loc} (${node.type}) 缺少 next 字段`);
      }
      
      if (!node.text || node.text.trim() === '') {
        issues.push(`${loc} (${node.type}) 文本为空`);
      }
      
      if (node.text && node.text.length > 200) {
        warnings.push(`${loc} 文本长度 ${node.text.length} 字符（可能需要拆分）`);
      }
    }
  }
}

console.log(`检查了 ${chapterList.length} 个章节\n`);

if (issues.length > 0) {
  console.log(`发现 ${issues.length} 个问题：`);
  issues.forEach(issue => console.log(`  ✗ ${issue}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log(`警告 ${warnings.length} 条：`);
  warnings.slice(0, 15).forEach(warning => console.log(`  ⚠ ${warning}`));
  if (warnings.length > 15) {
    console.log(`  ... 还有 ${warnings.length - 15} 条警告（省略）`);
  }
  console.log('');
}

if (issues.length === 0 && warnings.length === 0) {
  console.log('✓ 深度内容检查通过，未发现明显问题。');
}

if (issues.length > 0) {
  process.exit(1);
}
