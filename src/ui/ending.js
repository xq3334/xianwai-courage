// UI：结局展示
import { endings } from '../content/endings.js';
import { showOverlay, hideOverlay } from './overlay.js';
import { renderHandbook } from './handbook.js';
import { resolveEndingPosterSource, describeEndingPoster } from '../art/endingArt.js';

// 海报放在标题之前：先给一眼看得懂的画面，再让文字接手。
// 图缺失时整块不渲染，结局照旧可读 —— 海报是加分项，不是正文的前提。
function renderPosterMarkup(endingId) {
  const posterSource = resolveEndingPosterSource(endingId);
  if (!posterSource) return '';

  return `
      <figure class="ending-poster">
        <img class="ending-poster-image" src="${posterSource}"
             alt="${describeEndingPoster(endingId)}" loading="lazy" decoding="async">
      </figure>`;
}

export function renderEnding(endingId) {
  const ending = endings[endingId];
  if (!ending) {
    console.error(`结局不存在: ${endingId}`);
    return;
  }

  showOverlay(`
    <div class="ending-sheet">${renderPosterMarkup(endingId)}
      <h2 class="ending-title">${ending.title}</h2>
      <div class="ending-body">${ending.description}</div>
      <p class="ending-quote">${ending.quote}</p>
      <div class="ending-actions">
        <button class="ink-button" data-action="handbook">查看线外手册</button>
        <button class="ink-button" data-action="return">回到标题</button>
      </div>
    </div>
  `, (event) => {
    const action = event.target.dataset.action;
    if (action === 'return') {
      hideOverlay();
      document.querySelectorAll('.screen').forEach((s) => s.classList.remove('is-active'));
      document.getElementById('title-screen').classList.add('is-active');
    } else if (action === 'handbook') {
      hideOverlay();
      renderHandbook();
    }
  });
}
