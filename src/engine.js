// 主引擎：场景推进、分支跳转、结局判定
import { state } from './state.js';

// 切换新旧版本：将下面的 'chapters.js' 改为 'chapters-v2.js' 即可使用新版剧本
import { chapters, chapterOrder } from './content/chapters-v2.js';
import { renderDialogue, renderChoices } from './ui/dialogue.js';
import { showOverlay, hideOverlay } from './ui/overlay.js';
import { renderHandbook } from './ui/handbook.js';
import { renderNotebook } from './ui/notebook.js';
import { renderObservation } from './ui/observation.js';
import { renderTaskSeparation } from './ui/taskSeparation.js';
import { renderPractice } from './ui/practice.js';
import { renderEnding } from './ui/ending.js';
import { renderTitleArt, renderStageArt, preloadArtwork } from './art/stage.js';

// 说话人 → 人物立绘。主角始终在场，说话的人站到他对面。
const SPEAKER_FIGURES = {
  '林澈': 'linche',
  '顾言': 'guyan',
  '许禾': 'xuhe',
  '沈老师': 'shen',
  '妈妈': 'mother',
};

export const engine = {
  init() {
    renderTitleArt();
    preloadArtwork();
    this.bindTitleScreen();
    this.bindSceneBar();
    this.bindKeyboard();

    if (state.hasSave()) {
      document.getElementById('continue-button').hidden = false;
    }
  },

  bindTitleScreen() {
    document.getElementById('title-screen').addEventListener('click', (event) => {
      const action = event.target.dataset.action;
      if (!action) return;

      if (action === 'continue') {
        state.load();
        this.enterScene();
      } else if (action === 'new-game') {
        const confirmed = !state.hasSave() || confirm('开始新的一学期会覆盖当前存档，确定吗？');
        if (confirmed) {
          state.clear();
          this.enterScene();
        }
      } else if (action === 'chapters') {
        this.showChapterSelect();
      } else if (action === 'handbook') {
        renderHandbook();
      } else if (action === 'notebook') {
        renderNotebook();
      } else if (action === 'about') {
        this.showAbout();
      }
    });
  },

  bindSceneBar() {
    document.querySelector('.scene-bar').addEventListener('click', (event) => {
      const action = event.target.dataset.action;
      if (action === 'handbook') {
        renderHandbook();
      } else if (action === 'notebook') {
        renderNotebook();
      } else if (action === 'save-quit') {
        state.save();
        this.switchScreen('title-screen');
        document.getElementById('continue-button').hidden = false;
      }
    });
  },

  // 空格或回车推进对话，与点击「继续」等价
  bindKeyboard() {
    document.addEventListener('keydown', (event) => {
      const isAdvanceKey = event.key === ' ' || event.key === 'Enter';
      const sceneIsActive = document.getElementById('scene-screen').classList.contains('is-active');
      const overlayIsOpen = !document.getElementById('overlay').hidden;
      const dialogueIsVisible = !document.getElementById('dialogue').hidden;

      if (isAdvanceKey && sceneIsActive && !overlayIsOpen && dialogueIsVisible) {
        event.preventDefault();
        document.getElementById('advance-button').click();
      }
    });
  },

  enterScene() {
    this.switchScreen('scene-screen');
    this.loadNode(state.currentChapter, state.currentNode);
  },

  // 章节入口节点名不统一：序章到第三章叫 'start'，第四章之后叫 'opening'。
  // 以章节自己声明的 start 字段为准，避免进章即卡死。
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
  },

  loadNode(chapterId, nodeId) {
    const chapter = chapters[chapterId];
    if (!chapter) {
      console.error(`章节不存在：${chapterId}`);
      return;
    }

    const node = chapter.nodes[nodeId];
    if (!node) {
      console.error(`节点不存在：${chapterId} / ${nodeId}`);
      return;
    }

    state.currentChapter = chapterId;
    state.currentNode = nodeId;
    this.applyEffects(node.effects);
    state.save();

    document.getElementById('chapter-label').textContent = chapter.title;
    
    // 自动推断在场人物
    const characters = this.resolveCast(node);
    renderStageArt(node.art || 'default', characters);
    
    this.renderNodeBody(node);
  },

  // 节点可以用 cast 显式指定在场的人；否则按说话人推断
  resolveCast(node) {
    if (node.cast) return node.cast;

    const otherFigure = SPEAKER_FIGURES[node.speaker];
    if (!otherFigure) {
      return [{ id: 'protagonist', position: 'center' }];
    }

    return [
      { id: 'protagonist', position: 'left', dim: true },
      { id: otherFigure, position: 'right' },
    ];
  },

  applyEffects(effects) {
    if (!effects) return;
    effects.forEach((effect) => {
      if (effect.trait) state.modifyTrait(effect.trait, effect.delta);
      if (effect.unlockCard) state.unlockCard(effect.unlockCard);
    });
  },

  renderNodeBody(node) {
    if (node.type === 'dialogue') {
      renderDialogue(node, () => this.goTo(node.next));
      return;
    }

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

    if (node.type === 'observation') {
      renderObservation(node, () => this.goTo(node.next));
      return;
    }

    if (node.type === 'taskSeparation') {
      renderTaskSeparation(node, () => this.goTo(node.next));
      return;
    }

    if (node.type === 'practice') {
      renderPractice(node, () => this.goTo(node.next));
      return;
    }

    console.error(`未知的节点类型：${node.type}`);
  },

  goTo(target) {
    if (target === 'END') {
      this.finishChapter();
    } else if (target.startsWith('ENDING:')) {
      renderEnding(target.replace('ENDING:', ''));
    } else {
      this.loadNode(state.currentChapter, target);
    }
  },

  finishChapter() {
    const nextChapterId = this.getNextChapterId(state.currentChapter);
    if (!nextChapterId) {
      renderEnding(this.decideEnding());
      return;
    }

    state.unlockChapter(nextChapterId);
    this.loadNode(nextChapterId, this.resolveEntryNodeId(nextChapterId));
  },

  getNextChapterId(currentChapterId) {
    const index = chapterOrder.findIndex((entry) => entry.id === currentChapterId);
    if (index < 0 || index === chapterOrder.length - 1) return null;
    return chapterOrder[index + 1].id;
  },

  // 结局不是好坏评分，而是「主角现在习惯怎样面对人生」
  decideEnding() {
    const { autonomy, boundary, ally, acceptance, repair, action } = state.traits;

    const candidates = [
      { id: 'borrowed', score: -autonomy * 1.5 - action },
      { id: 'burden', score: -boundary * 1.5 + Math.max(ally, 0) * 0.5 },
      { id: 'island', score: -ally * 1.5 - repair + Math.max(boundary, 0) * 0.5 },
      { id: 'applause', score: -acceptance * 1.5 - autonomy * 0.5 },
      { id: 'departure', score: autonomy + action + acceptance * 0.5 },
      { id: 'repair', score: repair * 1.5 + ally + boundary * 0.5 }
    ];

    candidates.sort((left, right) => right.score - left.score);
    return candidates[0].id;
  },

  switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('is-active'));
    document.getElementById(screenId).classList.add('is-active');
  },

  showChapterSelect() {
    const listItems = chapterOrder.map((entry) => {
      const isUnlocked = state.unlockedChapters.includes(entry.id);
      const label = isUnlocked ? entry.title : `${entry.title}（未解锁）`;
      return `<li><button class="ink-button" data-chapter="${entry.id}" ${isUnlocked ? '' : 'disabled'}>${label}</button></li>`;
    }).join('');

    showOverlay(`
      <button class="overlay-close" aria-label="关闭">×</button>
      <h2 class="overlay-title">章节选择</h2>
      <div class="overlay-body">
        <p class="overlay-note">从某一章重新开始，会沿用你当前的选择记录。</p>
        <ul class="chapter-list">${listItems}</ul>
      </div>
    `, (event) => {
      const chapterId = event.target.dataset.chapter;
      if (!chapterId) return;
      hideOverlay();
      this.switchScreen('scene-screen');
      this.loadNode(chapterId, this.resolveEntryNodeId(chapterId));
    });
  },

  showAbout() {
    showOverlay(`
      <button class="overlay-close" aria-label="关闭">×</button>
      <h2 class="overlay-title">关于这部作品</h2>
      <div class="overlay-body">
        <p>《线外》是一部原创叙事选择游戏，受阿德勒心理学启发。第一部《被讨厌的勇气》讲一名高二学生的一个学期：学业、人际关系，以及对未来的迷茫。</p>
        <p>游戏里没有「正确答案」。六种结局呈现的是不同的生活方式，以及各自的代价，而不是分数。</p>
        <p><b>三点说明：</b></p>
        <ul>
          <li>「被讨厌」不等于被欺凌、威胁或伤害。遇到这类情况，寻求老师、家长或专业机构的帮助是有效且必要的行动。</li>
          <li>目的论不是用来责备当事人。过去的经历、家庭环境、现实条件和心理健康状况都会真实地影响一个人。</li>
          <li>本作为原创故事，不是《被讨厌的勇气》一书的官方改编。</li>
        </ul>
        <p class="overlay-note">如果你正被强烈的情绪困扰，请联系信任的成年人或专业心理支持机构。</p>
      </div>
    `);
  }
};
