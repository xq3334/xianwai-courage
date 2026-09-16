// UI：烦恼笔记（玩家的现实练习记录）
import { state } from '../state.js';
import { showOverlay } from './overlay.js';

export function renderNotebook() {
  const entries = state.notebookEntries;
  
  const entriesHtml = entries.map((entry) => `
    <div class="note-entry">
      <p class="note-date">${new Date(entry.timestamp).toLocaleDateString('zh-CN')}</p>
      <p class="note-text">${entry.content}</p>
    </div>
  `).join('');

  const emptyMessage = '<p class="overlay-note">你在游戏中完成的现实练习会记录在这里。</p>';

  showOverlay(`
    <button class="overlay-close" aria-label="关闭">×</button>
    <h2 class="overlay-title">烦恼笔记</h2>
    <div class="overlay-body">
      ${entriesHtml || emptyMessage}
    </div>
  `);
}
