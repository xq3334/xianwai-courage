// UI：结局展示
import { endings } from '../content/endings.js';
import { showOverlay, hideOverlay } from './overlay.js';
import { renderHandbook } from './handbook.js';

export function renderEnding(endingId) {
  const ending = endings[endingId];
  if (!ending) {
    console.error(`结局不存在: ${endingId}`);
    return;
  }

  showOverlay(`
    <div class="ending-sheet">
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
