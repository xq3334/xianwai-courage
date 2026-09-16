# 开发文档

本文档提供游戏开发、维护和扩展的完整指南。**特别重要**：如果上下文被压缩后丢失信息，请参考本文档重建项目理解。

## 📋 目录

1. [架构概览](#架构概览)
2. [关键系统说明](#关键系统说明)
3. [节点类型详解](#节点类型详解)
4. [特质系统](#特质系统)
5. [添加新章节](#添加新章节)
6. [扩展剧情指南](#扩展剧情指南)
7. [已知问题](#已知问题)
8. [调试技巧](#调试技巧)

---

## 架构概览

### 技术栈

- **纯ES6模块** - 无构建工具，使用原生 `import/export`
- **无框架** - 原生JavaScript + DOM操作
- **localStorage** - 自动存档系统
- **静态资源** - 直接引用图片/音频文件

### 核心模块

```
src/
├── engine.js          # 游戏引擎：节点加载、渲染分发、流程控制
├── state.js           # 状态管理：特质值、存档、选择历史
├── ui/
│   ├── dialogue.js    # 渲染对话和观察节点
│   ├── choice.js      # 渲染选择节点（未使用）
│   └── menu.js        # 主菜单、存档菜单
└── content/
    ├── chapters-v2.js # 章节索引和导出
    └── ch*.js         # 各章节内容
```

### 数据流

```
用户操作 → engine.goTo(nodeId)
         ↓
    engine.loadNode()
         ↓
    engine.renderNodeBody() ← 根据 node.type 分发
         ↓
    ui/dialogue.js 渲染 → 用户点击 → applyEffects() → goTo(next)
```

---

## 关键系统说明

### 1. 引擎核心 (`engine.js`)

#### 关键方法

**`loadNode(chapterId, nodeId)`**
- 从章节模块加载指定节点
- 更新当前章节/节点状态
- 触发渲染

**`renderNodeBody(node)`**
- 根据 `node.type` 分发到不同渲染器
- 支持类型：`dialogue`, `choice`, `observation`, `taskSeparation`, `practice`, `end`

**`goTo(target)`**
- 处理节点跳转
- 特殊处理：
  - `'END'` → 调用 `finishChapter()`
  - 跨章节跳转（如 `'ch5:start'`）

**`applyEffects(effects)`**
- 应用特质变化
- 格式：`[{ trait: 'autonomy', delta: 5 }]`

**`finishChapter()`**
- 章节结束处理
- 根据 `node.nextChapter` 跳转下一章或结局

### 2. 状态管理 (`state.js`)

#### 特质系统

```javascript
this.traits = {
  autonomy: 0,    // 自主性
  boundary: 0,    // 边界感
  ally: 0,        // 同伴视角
  acceptance: 0,  // 接受不完美
  repair: 0,      // 修复能力
  action: 0       // 行动力
};
```

#### 存档系统

- **自动存档**：每次节点跳转自动保存
- **存档内容**：
  - 当前章节和节点
  - 所有特质值
  - 选择历史记录
- **存档位置**：`localStorage` 键名 `xianwai_save`

#### 重要方法

- `modifyTrait(traitName, delta)` - 修改特质值
- `getTrait(traitName)` - 获取特质值
- `save()` / `load()` - 存档管理
- `recordChoice(chapter, node, text)` - 记录选择历史

### 3. 对话渲染 (`ui/dialogue.js`)

#### 渲染流程

1. 显示背景图 (`node.art`)
2. 渲染角色名 (`node.speaker`)
3. 渲染对话文本 (`node.text`)
4. 渲染选择按钮（如果是 `choice` 类型）
5. 点击后触发 `callback`

#### 选择节点渲染

**重要**：选择节点有两种格式，引擎只支持第一种！

**✅ 正确格式（章节0-3使用）**：
```javascript
{
  type: 'choice',
  choices: [
    { 
      text: '选项文本', 
      effects: [{ trait: 'autonomy', delta: 5 }], 
      next: 'nodeId' 
    }
  ]
}
```

**❌ 错误格式（章节4-8使用，需要修复）**：
```javascript
{
  type: 'choice',
  options: [  // 应该是 choices
    { 
      label: '选项文本',  // 应该是 text
      traits: { autonomy: 5 },  // 应该是 effects
      next: 'nodeId' 
    }
  ]
}
```

---

## 节点类型详解

### 1. `dialogue` - 对话节点

```javascript
{
  type: 'dialogue',
  art: 'classroom',           // 背景图文件名（不含路径）
  speaker: '林澈',            // 说话人名字
  text: '「你真的准备好了吗？」', // 对话内容
  next: 'node2'               // 下一个节点ID
}
```

### 2. `choice` - 选择节点

```javascript
{
  type: 'choice',
  art: 'classroom',
  prompt: '你决定：',         // 选择前的提示文本
  choices: [
    {
      text: '主动说："我们谈谈吧。"',
      effects: [
        { trait: 'autonomy', delta: 2 },
        { trait: 'ally', delta: 1 }
      ],
      next: 'take_lead'
    },
    {
      text: '等别人先开口',
      effects: [{ trait: 'boundary', delta: 1 }],
      next: 'wait_observe'
    }
  ]
}
```

### 3. `observation` - 观察节点

用于内心独白、旁白叙述。

```javascript
{
  type: 'observation',
  art: 'classroom',
  text: '你注意到林澈的表情变了。',
  next: 'node3'
}
```

### 4. `taskSeparation` - 任务分隔节点

用于章节内的场景转换。

```javascript
{
  type: 'taskSeparation',
  art: 'corridor',
  text: '— 第二天 —',
  next: 'day2_start'
}
```

### 5. `practice` - 练习节点

用于心理课上的思考题。

```javascript
{
  type: 'practice',
  art: 'classroom',
  text: '沈老师：「试着写下你对边界的理解。」',
  next: 'after_practice'
}
```

### 6. `end` - 章节结束节点

```javascript
{
  type: 'end',
  art: 'classroom',
  nextChapter: 'ch5'  // 下一章ID，或 'finale' 跳转结局
}
```

---

## 特质系统

### 特质含义

| 特质 | 低值含义 | 高值含义 | 影响结局 |
|-----|---------|---------|---------|
| **autonomy** | 依赖他人认可，讨好型 | 能够自主做决定 | 核心特质 |
| **boundary** | 边界模糊，过度承担或逃避 | 边界清晰，懂得拒绝 | 核心特质 |
| **ally** | 竞争视角，对立思维 | 同伴视角，合作思维 | 影响人际线 |
| **acceptance** | 苛责自己和他人 | 接受不完美 | 影响心态 |
| **repair** | 冲突后逃避 | 主动修复关系 | 影响关系线 |
| **action** | 只思考不行动 | 把想法转化为行动 | 影响成长速度 |

### 结局判定逻辑

终章(`ch-finale-v2.js`)根据特质值分支：

```javascript
// 简化示例
if (autonomy >= 15 && boundary >= 12) {
  // 结局A：健康成长
} else if (autonomy < 8 && boundary < 8) {
  // 结局C：继续困境
} else {
  // 结局B：过渡状态
}
```

### 特质设计原则

1. **单个选择**：+1到+3，极少+5
2. **关键转折点**：可以+5
3. **负值慎用**：只在明显倒退时使用
4. **多维影响**：重要选择可同时影响2-3个特质

---

## 添加新章节

### 步骤1：创建章节文件

在 `src/content/` 创建新文件，如 `ch9-v2.js`：

```javascript
export const ch9 = {
  start: {
    type: 'dialogue',
    art: 'classroom',
    speaker: '旁白',
    text: '新学期开始了……',
    next: 'node1'
  },
  
  node1: {
    type: 'choice',
    art: 'classroom',
    prompt: '你决定：',
    choices: [
      {
        text: '主动找林澈聊聊',
        effects: [{ trait: 'autonomy', delta: 2 }],
        next: 'talk_linche'
      },
      {
        text: '先观察一下情况',
        effects: [{ trait: 'boundary', delta: 1 }],
        next: 'observe'
      }
    ]
  },
  
  // ... 更多节点
  
  chapter_end: {
    type: 'end',
    art: 'classroom',
    nextChapter: 'ch10'  // 或 'finale'
  }
};
```

### 步骤2：注册章节

在 `src/content/chapters-v2.js` 中：

```javascript
import { ch9 } from './ch9-v2.js';

export const chapters = {
  prologue: ch0Prologue,
  ch1: ch1,
  // ...
  ch8: ch8,
  ch9: ch9,  // 添加新章节
  finale: chFinale
};

export const chapterOrder = [
  'prologue', 'ch1', 'ch2', 'ch3', 'ch4',
  'ch5', 'ch6', 'ch7', 'ch8', 'ch9', 'finale'  // 添加到顺序
];
```

### 步骤3：更新上一章的结束节点

修改 `ch8-v2.js` 的结束节点：

```javascript
chapter_end: {
  type: 'end',
  art: 'classroom',
  nextChapter: 'ch9'  // 改为指向新章节
}
```

---

## 扩展剧情指南

### 场景1：添加新的支线剧情

如果要在现有章节中添加可选支线：

1. **添加分支选择**：在主线某个 `choice` 节点增加新选项
2. **创建支线节点链**：支线独立的节点序列
3. **回归主线**：支线结束后 `next` 指向主线汇合点

```javascript
// 主线选择点
main_choice: {
  type: 'choice',
  choices: [
    { text: '继续主线', next: 'main_path' },
    { text: '探索支线', next: 'side_branch_1' }  // 新增
  ]
},

// 支线内容
side_branch_1: {
  type: 'dialogue',
  text: '支线剧情...',
  next: 'side_branch_2'
},

side_branch_2: {
  type: 'dialogue',
  text: '支线结束',
  next: 'main_convergence'  // 回归主线
},

// 主线汇合点
main_convergence: {
  type: 'dialogue',
  text: '无论如何，你们继续前进...',
  next: 'chapter_end'
}
```

### 场景2：添加新角色

1. **在节点中使用新 `speaker` 名字**
2. **可选**：添加角色立绘（需要扩展渲染系统）
3. **确保**：角色出场有合理的情境铺垫

### 场景3：添加新的特质维度

如果要增加新特质（如 `empathy`）：

1. **修改 `state.js`**：
```javascript
this.traits = {
  // ... 现有特质
  empathy: 0  // 新增
};
```

2. **在章节内容中使用**：
```javascript
effects: [{ trait: 'empathy', delta: 3 }]
```

3. **更新结局判定**：在 `ch-finale-v2.js` 中加入新特质的判断逻辑

### 场景4：添加新结局

在 `ch-finale-v2.js` 中：

1. **创建新的结局分支节点**
2. **在 `ending_choice` 节点修改判定逻辑**
3. **添加新结局的节点链**

```javascript
ending_choice: {
  type: 'dialogue',
  text: '',
  next: () => {
    const a = state.getTrait('autonomy');
    const b = state.getTrait('boundary');
    
    // 新增结局D的判定
    if (a >= 20 && b >= 15) return 'ending_d_start';
    
    if (a >= 15 && b >= 12) return 'ending_a_start';
    // ... 其他结局
  }
},

ending_d_start: {
  type: 'dialogue',
  speaker: '旁白',
  text: '你已经成长为真正独立的人……',
  next: 'ending_d_final'
},

ending_d_final: {
  type: 'end',
  art: 'sunset',
  nextChapter: null  // 游戏真正结束
}
```

---

## 已知问题

### ✅ [已修复 2026-09-14] 严重Bug：选择节点格式不兼容

**问题描述**：
- 引擎期望：`node.choices` 数组，包含 `text` 和 `effects` 属性
- 章节4-8实际使用：`node.options` 数组，包含 `label` 和 `traits` 属性

**影响范围**：
- ch4-v2.js: 5个选择节点
- ch5-v2.js: 5个选择节点
- ch6-v2.js: 3个选择节点
- ch7-v2.js: 5个选择节点
- ch8-v2.js: 2个选择节点
- ch-finale-v2.js: 1个选择节点
- **共21个节点无法正常工作**

**症状**：
到达这些章节的选择点时，浏览器会报错：
```
TypeError: Cannot read property 'map' of undefined
```
选择按钮无法渲染，游戏卡死。

**修复记录**：

**采用方案A：修改引擎实现向后兼容**

✅ **修改1：`src/engine.js` (第157-175行)**
```javascript
if (node.type === 'choice') {
  renderChoices(node, (choiceIndex) => {
    // 兼容两种格式：choices/options
    const choicesArray = node.choices || node.options;
    const choice = choicesArray[choiceIndex];
    const choiceText = choice.text || choice.label;
    
    // 兼容 effects 和 traits 两种格式
    let effects = choice.effects;
    if (!effects && choice.traits) {
      effects = Object.entries(choice.traits).map(([trait, delta]) => ({
        trait,
        delta
      }));
    }
    
    state.recordChoice(state.currentChapter, state.currentNode, choiceText);
    this.applyEffects(effects);
    this.goTo(choice.next);
  });
  return;
}
```

✅ **修改2：`src/ui/dialogue.js` (第79-84行)**
```javascript
const choiceList = document.getElementById('choice-list');
// 兼容两种格式：choices/options 和 text/label
const choicesArray = node.choices || node.options;
choiceList.innerHTML = choicesArray.map((choice, idx) => {
  const text = choice.text || choice.label;
  return `<li><button data-choice="${idx}">${text}</button></li>`;
}).join('');
```

**测试验证**：
- ✅ 引擎现在可以同时识别 `choices` 和 `options` 字段
- ✅ 引擎现在可以同时识别 `text` 和 `label` 字段
- ✅ 引擎现在可以将 `traits: {autonomy: 2}` 自动转换为 `effects: [{trait: 'autonomy', delta: 2}]`
- ✅ 章节0-3的旧格式依然正常工作
- ✅ 章节4-8的新格式现在可以正常运行

**后续建议**：
虽然引擎已兼容，但为了代码一致性，建议后续将章节4-8逐步统一到标准格式（`choices`/`text`/`effects`）。

---

### ✅ [已修复 2026-09-16] 严重Bug：线上页面按钮全部无响应

**问题描述**：
线上 GitHub Pages 打开后画面正常，但所有按钮点不动。

**根本原因**：
GitHub Pages 构建的是 `master` 分支，而所有修复都推到了 `main` 分支。
`master` 上的 `src/engine.js` 从 `chapters-v2.js` 导入了 `chapterOrder`，但 `master` 版本的
`chapters-v2.js` 只导出了 `chapters` 和 `chapterList`，没有 `chapterOrder`。

```
The requested module './content/chapters-v2.js' does not provide an export named 'chapterOrder'
```

ES 模块的导入是在执行前静态解析的。这个错误让整个模块图直接中止，
`main.js` 里的 `engine.init()` 从未执行，所以事件监听器一个都没绑上。
HTML 和 CSS 是静态的，所以画面看起来完全正常 —— 这正是它难以定位的原因。

**关键教训**：
「画面正常但完全没有交互」几乎总是模块加载失败，而不是某个按钮的逻辑写错了。

**修复方式**：
`main` 分支已包含 `export { chapterList as chapterOrder };`，且 `main` 是 `master` 的直接后继
（`git merge-base origin/master origin/main` 等于 master 的 HEAD），因此把 `main` 快进合并到
`master` 即可，不会丢任何文件（`master` 162 个文件，`main` 170 个，是严格超集）。

---

### ✅ [已修复 2026-09-16] 严重Bug：进入第四章即卡死

**问题描述**：
章节入口节点名不统一：
- 序章 ~ 第三章：入口节点叫 `start`
- 第四章 ~ 终章：入口节点叫 `opening`

每个章节都用 `start: 'opening'` 字段声明了自己的入口，但引擎完全忽略这个字段，
在 `finishChapter()` 和 `showChapterSelect()` 里硬编码了 `loadNode(chapterId, 'start')`。

**影响范围**：
ch4 / ch5 / ch6 / ch7 / ch8 / finale —— 共 6 个章节。
第三章结束后控制台报 `节点不存在：ch4 / start`，然后画面停在原地不动，游戏无法继续。
**这意味着之前修复的 21 个选择节点其实一个都到不了。**

**修复方式**：

在 `src/engine.js` 新增 `resolveEntryNodeId()`，以章节自己声明的 `start` 字段为准：

```javascript
resolveEntryNodeId(chapterId) {
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
```

两处硬编码 `'start'` 的调用点改为使用它：
- `finishChapter()`：`this.loadNode(nextChapterId, this.resolveEntryNodeId(nextChapterId))`
- `showChapterSelect()`：`this.loadNode(chapterId, this.resolveEntryNodeId(chapterId))`

这样新增章节时无论入口叫什么，只要在章节对象里声明 `start` 字段就能正常衔接。

---

## 自动化校验

新增两个脚本，用来在本地抓出「浏览器里只表现为卡住」的剧本问题：

```bash
npm run validate   # 校验节点引用、选择格式、章节衔接、孤立节点
npm run simulate   # 模拟 5 条不同选择路线，走完全程
npm test           # 两个一起跑
npm run serve      # 本地预览 http://localhost:8090
```

`validate-chapters.mjs` 检查的内容：
- 每章能否找到入口节点（`start` / `opening` / 声明的 `start` 字段）
- 所有 `next` 指向的节点是否真实存在
- 选择节点是否有选项、每个选项是否有文本和 `next`
- 每章是否有结束出口（`END` / `ENDING:` / `type: 'end'`）
- 是否存在无法从入口到达的孤立节点

`simulate-playthrough.mjs` 会用「每次都选第 N 个选项」的策略跑 5 条路线，
验证每条路线都能从序章走到结局。当前结果：

```
OK  always-pick-#0: 章节 10/10，选择 28 次
OK  always-pick-#1: 章节 10/10，选择 25 次
OK  always-pick-#2: 章节 10/10，选择 27 次
OK  always-pick-#3: 章节 10/10，选择 26 次
OK  always-pick-#4: 章节 10/10，选择 26 次
```

修复前跑同样的脚本，5 条路线全部停在 `章节 4/10`。

---

## 部署说明

**GitHub Pages 构建的是 `master` 分支**，不是 `main`。
推送修复后必须同步 `master`，否则线上跑的还是旧代码：

```bash
git push origin main
git checkout master && git merge main && git push origin master
git checkout main
```

---

## 修复历史

### 2026-09-16
- **[Critical]** 修复线上按钮全部无响应：`master` 分支缺少 `chapterOrder` 导出，导致整个 ES 模块图加载中止
- **[Critical]** 修复进入第四章即卡死：引擎硬编码入口节点为 `'start'`，但 ch4 之后的章节入口叫 `'opening'`
- 新增 `resolveEntryNodeId()`，改为读取章节自己声明的 `start` 字段
- 新增 `validate-chapters.mjs` 和 `simulate-playthrough.mjs` 自动化校验
- 新增 `serve.mjs` 本地预览服务器，`package.json` 补齐 scripts
- 修改文件：`src/engine.js`、`package.json`

### 2026-09-14
- **[Critical]** 修复选择节点格式不兼容问题，使引擎支持 `choices`/`options` 和 `text`/`label` 双格式
- 修改文件：`src/engine.js`、`src/ui/dialogue.js`
- 影响范围：章节4-8的21个选择节点现已可正常运行

---
    state.recordChoice(state.currentChapter, state.currentNode, choice.text);
    this.applyEffects(choice.effects);
    this.goTo(choice.next);
  });
  return;
}

// 修改后
if (node.type === 'choice') {
  renderChoices(node, (choiceIndex) => {
    // 兼容两种格式
    const choicesArray = node.choices || node.options;
    const choice = choicesArray[choiceIndex];
    const choiceText = choice.text || choice.label;
    
    // 兼容 effects 和 traits 两种格式
    let effects = choice.effects;
    if (!effects && choice.traits) {
      effects = Object.entries(choice.traits).map(([trait, delta]) => ({
        trait,
        delta
      }));
    }
    
    state.recordChoice(state.currentChapter, state.currentNode, choiceText);
    this.applyEffects(effects);
    this.goTo(choice.next);
  });
  return;
}
```

修改 `src/ui/dialogue.js` (约79-80行):
```javascript
// 修改前
choiceList.innerHTML = node.choices.map((choice, idx) => 
  `<li><button data-choice="${idx}">${choice.text}</button></li>`
).join('');

// 修改后
const choicesArray = node.choices || node.options;
choiceList.innerHTML = choicesArray.map((choice, idx) => {
  const text = choice.text || choice.label;
  return `<li><button data-choice="${idx}">${text}</button></li>`;
}).join('');
```

**方案B：修改内容文件**

批量替换章节4-8的所有选择节点，将：
```javascript
options: [{ label: '...', traits: {...}, next: '...' }]
```
转换为：
```javascript
choices: [{ text: '...', effects: [{trait: '...', delta: ...}], next: '...' }]
```

---

## 调试技巧

### 1. 查看当前特质值

在浏览器控制台：
```javascript
window.game.state.traits
// 输出：{ autonomy: 12, boundary: 8, ... }
```

### 2. 手动跳转节点

```javascript
window.game.goTo('ch5:start')  // 跳到第5章开头
window.game.goTo('finale:ending_a_start')  // 跳到结局A
```

### 3. 修改特质值

```javascript
window.game.state.modifyTrait('autonomy', 10)  // 增加10点自主性
```

### 4. 查看选择历史

```javascript
window.game.state.choices
// 输出：[ {chapter: 'ch1', node: 'choice1', text: '...'}, ... ]
```

### 5. 清除存档重新开始

```javascript
localStorage.removeItem('xianwai_save');
location.reload();
```

### 6. 启用详细日志

在 `engine.js` 开头添加：
```javascript
const DEBUG = true;

loadNode(chapterId, nodeId) {
  if (DEBUG) console.log(`Loading: ${chapterId}:${nodeId}`);
  // ...
}
```

### 7. 检查节点连接

创建脚本 `validate-nodes.js`：
```javascript
import { chapters } from './src/content/chapters-v2.js';

for (const [chId, chData] of Object.entries(chapters)) {
  for (const [nodeId, node] of Object.entries(chData)) {
    if (node.next && typeof node.next === 'string') {
      if (!node.next.includes(':') && !chData[node.next]) {
        console.error(`❌ ${chId}:${nodeId} -> ${node.next} (不存在)`);
      }
    }
    
    if (node.choices) {
      node.choices.forEach((choice, idx) => {
        if (!chData[choice.next]) {
          console.error(`❌ ${chId}:${nodeId} 选项${idx} -> ${choice.next} (不存在)`);
        }
      });
    }
  }
}
```

---

## 性能优化

### 图片资源

- 背景图建议尺寸：1920x1080 或 1280x720
- 格式：WebP（更小） > PNG > JPEG
- 使用图片压缩工具减小文件体积

### 音频资源

- 背景音乐：MP3，码率128kbps
- 音效：MP3，短小精悍
- 预加载关键音频

### localStorage限制

- 浏览器通常限制5-10MB
- 避免在存档中保存大量历史数据
- 定期清理旧存档

---

## 发布清单

部署到GitHub Pages前：

- [ ] 修复选择节点格式Bug
- [ ] 测试完整流程（从序章到结局）
- [ ] 检查所有图片资源路径
- [ ] 压缩图片资源
- [ ] 添加loading界面
- [ ] 测试存档/读档功能
- [ ] 检查移动端兼容性
- [ ] 添加错误边界处理
- [ ] 更新README中的在线体验链接

---

## 许可与贡献

本项目采用MIT许可证。欢迎提交Issue和PR，特别是：

- 新剧情分支
- 角色深化
- UI/UX改进
- Bug修复
- 性能优化

---

**最后更新**：2026-09-16  
**维护者**：xq3334  
**项目地址**：https://github.com/xq3334/xianwai-book1
