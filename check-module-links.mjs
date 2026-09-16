// 校验每个 import 的具名导出在目标模块里真实存在。
// 这正是当初线上白屏的原因：engine.js 导入了 chapters-v2.js 并未导出的 chapterOrder，
// ES 模块在链接阶段就失败，整个模块图中止，页面渲染正常但脚本一行都没跑。
// 用法：node check-module-links.mjs [根目录]
// 省略参数时检查当前仓库；传入目录可以检查从线上下载的部署产物。
import fs from 'node:fs';
import path from 'node:path';

const targetRoot = process.argv[2] ?? process.cwd();
const ENTRY_MODULE = path.join(targetRoot, 'src', 'main.js');
const IMPORT_STATEMENT_PATTERN = /import\s+([^'"]+?)\s+from\s+['"](\.[^'"]+)['"]/g;
const EXPORT_ALIAS_PATTERN = /export\s*\{([^}]*)\}/g;
const EXPORT_DECLARATION_PATTERN = /export\s+(?:const|let|var|function|class)\s+(\w+)/g;

function collectExportedNames(moduleSource) {
  const exportedNames = new Set();

  for (const match of moduleSource.matchAll(EXPORT_DECLARATION_PATTERN)) {
    exportedNames.add(match[1]);
  }

  // 处理 export { chapterList as chapterOrder } —— 对外可见的是别名
  for (const match of moduleSource.matchAll(EXPORT_ALIAS_PATTERN)) {
    for (const clause of match[1].split(',')) {
      const trimmedClause = clause.trim();
      if (!trimmedClause) continue;
      const aliasMatch = trimmedClause.match(/^(\w+)\s+as\s+(\w+)$/);
      exportedNames.add(aliasMatch ? aliasMatch[2] : trimmedClause);
    }
  }

  return exportedNames;
}

function parseImportedNames(importClause) {
  const namedBlockMatch = importClause.match(/\{([^}]*)\}/);
  if (!namedBlockMatch) return [];

  return namedBlockMatch[1]
    .split(',')
    .map((clause) => clause.trim())
    .filter(Boolean)
    .map((clause) => {
      const aliasMatch = clause.match(/^(\w+)\s+as\s+\w+$/);
      return aliasMatch ? aliasMatch[1] : clause;
    });
}

const problems = [];
const visitedModules = new Set();
const pendingModules = [ENTRY_MODULE];

while (pendingModules.length > 0) {
  const modulePath = pendingModules.pop();
  if (visitedModules.has(modulePath)) continue;
  visitedModules.add(modulePath);

  if (!fs.existsSync(modulePath)) {
    problems.push(`模块不存在：${path.relative(targetRoot, modulePath)}`);
    continue;
  }

  const moduleSource = fs.readFileSync(modulePath, 'utf8');
  const importerLabel = path.relative(targetRoot, modulePath).replace(/\\/g, '/');

  for (const match of moduleSource.matchAll(IMPORT_STATEMENT_PATTERN)) {
    const importedNames = parseImportedNames(match[1]);
    const resolvedPath = path.resolve(path.dirname(modulePath), match[2]);
    const targetLabel = path.relative(targetRoot, resolvedPath).replace(/\\/g, '/');

    if (!fs.existsSync(resolvedPath)) {
      problems.push(`${importerLabel} 导入了不存在的文件：${match[2]}`);
      continue;
    }

    const availableExports = collectExportedNames(fs.readFileSync(resolvedPath, 'utf8'));
    for (const importedName of importedNames) {
      if (!availableExports.has(importedName)) {
        problems.push(`${importerLabel} 导入 '${importedName}'，但 ${targetLabel} 没有导出它`);
      }
    }

    pendingModules.push(resolvedPath);
  }
}

console.log(`检查了 ${visitedModules.size} 个模块（从 src/main.js 出发）`);

if (problems.length > 0) {
  console.log(`发现 ${problems.length} 个会导致整个模块图加载失败的问题：`);
  problems.forEach((problem) => console.log(`  x ${problem}`));
  process.exit(1);
}

console.log('所有 import 的具名导出都真实存在，模块图可以正常链接。');
