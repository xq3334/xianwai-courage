// UI：线外手册（知识卡片）
import { state } from '../state.js';
import { knowledgeCards } from '../content/knowledge.js';
import { showOverlay } from './overlay.js';

export function renderHandbook() {
  const unlockedCards = state.unlockedCards;
  
  const cardsHtml = Object.entries(knowledgeCards)
    .filter(([id]) => unlockedCards.includes(id))
    .map(([id, card]) => `
      <div class="knowledge-card">
        <h3>${card.title}</h3>
        <div class="card-row">
          <strong>生活问题：</strong>
          <p>${card.problem}</p>
        </div>
        <div class="card-row">
          <strong>阿德勒视角：</strong>
          <p>${card.perspective}</p>
        </div>
        <div class="card-row">
          <strong>容易产生的误解：</strong>
          <p>${card.misunderstanding}</p>
        </div>
        <div class="card-row is-action">
          <strong>今天就能做的小行动：</strong>
          <p>${card.action}</p>
        </div>
      </div>
    `).join('');

  const emptyMessage = '<p class="overlay-note">随着剧情推进，你解锁的知识卡片会出现在这里。</p>';

  showOverlay(`
    <button class="overlay-close" aria-label="关闭">×</button>
    <h2 class="overlay-title">线外手册</h2>
    <div class="overlay-body">
      ${cardsHtml || emptyMessage}
    </div>
  `);
}
