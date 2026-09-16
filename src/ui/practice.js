// UI：现实练习
import { state } from '../state.js';
import { showOverlay, hideOverlay } from './overlay.js';

export function renderPractice(node, onComplete) {
  showOverlay(`
    <h2 class="overlay-title">现实练习</h2>
    <div class="overlay-body">
      <p>${node.prompt}</p>
      
      <div class="field">
        <textarea class="paper-input" id="practice-input" placeholder="写下你的想法或计划..." style="min-height:140px;"></textarea>
      </div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="ink-button" data-action="save" style="flex:1;">保存到笔记</button>
        <button class="ink-button" data-action="skip" style="flex:1;border-color:var(--rule);color:var(--ink-soft);">暂时跳过</button>
      </div>

      <p class="overlay-note" style="margin-top:1rem;">你随时可以在「烦恼笔记」中查看保存的内容。</p>
    </div>
  `, (event) => {
    const action = event.target.dataset.action;

    if (action === 'save') {
      const content = document.getElementById('practice-input').value.trim();
      if (content) {
        state.notebookEntries.push({ content, timestamp: Date.now() });
        state.save();
      }
      hideOverlay();
      onComplete();
    } else if (action === 'skip') {
      hideOverlay();
      onComplete();
    }
  });
}
