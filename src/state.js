// 状态管理：玩家进度、隐藏特质、存档
export const state = {
  // 玩家特质（不向玩家展示，用于结局计算）
  traits: {
    autonomy: 0,        // 自主选择 vs 依赖认可
    boundary: 0,        // 边界清晰 vs 过度承担/逃避
    ally: 0,            // 同伴视角 vs 竞争视角
    acceptance: 0,      // 接受不完美
    repair: 0,          // 冲突后修复
    action: 0           // 把思考转化为行动
  },

  // 进度
  currentChapter: 'prologue',
  currentNode: 'start',
  unlockedChapters: ['prologue'],
  unlockedCards: [],
  notebookEntries: [],
  choices: [],

  // 修改特质
  modifyTrait(traitName, delta) {
    if (traitName in this.traits) {
      this.traits[traitName] += delta;
    }
  },

  // 记录选择
  recordChoice(chapterId, nodeId, choiceText) {
    this.choices.push({ chapterId, nodeId, choiceText, timestamp: Date.now() });
  },

  // 解锁章节
  unlockChapter(chapterId) {
    if (!this.unlockedChapters.includes(chapterId)) {
      this.unlockedChapters.push(chapterId);
    }
  },

  // 解锁知识卡片
  unlockCard(cardId) {
    if (!this.unlockedCards.includes(cardId)) {
      this.unlockedCards.push(cardId);
    }
  },

  // 保存到 localStorage
  save() {
    const data = {
      traits: this.traits,
      currentChapter: this.currentChapter,
      currentNode: this.currentNode,
      unlockedChapters: this.unlockedChapters,
      unlockedCards: this.unlockedCards,
      notebookEntries: this.notebookEntries,
      choices: this.choices
    };
    localStorage.setItem('xianwai_book1_save', JSON.stringify(data));
  },

  // 从 localStorage 加载
  load() {
    const raw = localStorage.getItem('xianwai_book1_save');
    if (!raw) return false;
    try {
      const data = JSON.parse(raw);
      Object.assign(this.traits, data.traits);
      this.currentChapter = data.currentChapter;
      this.currentNode = data.currentNode;
      this.unlockedChapters = data.unlockedChapters;
      this.unlockedCards = data.unlockedCards;
      this.notebookEntries = data.notebookEntries || [];
      this.choices = data.choices || [];
      return true;
    } catch (e) {
      console.error('加载存档失败', e);
      return false;
    }
  },

  // 清除存档
  clear() {
    localStorage.removeItem('xianwai_book1_save');
    this.traits = { autonomy: 0, boundary: 0, ally: 0, acceptance: 0, repair: 0, action: 0 };
    this.currentChapter = 'prologue';
    this.currentNode = 'start';
    this.unlockedChapters = ['prologue'];
    this.unlockedCards = [];
    this.notebookEntries = [];
    this.choices = [];
  },

  // 检查是否有存档
  hasSave() {
    return !!localStorage.getItem('xianwai_book1_save');
  }
};
