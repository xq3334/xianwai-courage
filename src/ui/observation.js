// UI：暂停观察。目的以「候选假设」的方式出现，玩家可以否认全部选项
import { showOverlay, hideOverlay } from './overlay.js';

export function renderObservation(node, onComplete) {
  const fieldsHtml = node.questions.map((question, index) => {
    if (question.type === 'text') {
      return `
        <div class="field">
          <label class="field-label" for="observe-${index}">${question.question}</label>
          <textarea class="paper-input" id="observe-${index}" data-answer="${index}"></textarea>
        </div>
      `;
    }

    const optionsHtml = question.options.map((option, optionIndex) => `
      <label class="option-row">
        <input type="radio" name="observe-${index}" value="${optionIndex}" data-answer="${index}">
        <span>${option}</span>
      </label>
    `).join('');

    return `
      <div class="field">
        <span class="field-label">${question.question}</span>
        ${optionsHtml}
      </div>
    `;
  }).join('');

  showOverlay(`
    <h2 class="overlay-title">暂停观察</h2>
    <div class="overlay-body">
      <p>${node.prompt}</p>
      <p class="overlay-note">写多少都可以，也可以留空。这一页不打分，只帮你看清刚才发生了什么。</p>
      ${fieldsHtml}
      <button class="ink-button" data-role="submit">继续</button>
    </div>
  `, (event) => {
    if (event.target.dataset.role !== 'submit') return;

    const sheet = document.getElementById('overlay-sheet');
    const answers = {};

    sheet.querySelectorAll('textarea[data-answer]').forEach((field) => {
      answers[field.dataset.answer] = field.value.trim();
    });

    sheet.querySelectorAll('input[data-answer]:checked').forEach((input) => {
      const questionIndex = Number(input.dataset.answer);
      answers[questionIndex] = node.questions[questionIndex].options[Number(input.value)];
    });

    hideOverlay();
    onComplete(answers);
  });
}
