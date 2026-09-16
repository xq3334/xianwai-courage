// UI：对话和选择渲染
import { updateCastFocus } from '../art/stage.js';

let currentTypingAnimation = null;

export function renderDialogue(node, onAdvance) {
  const dialogueEl = document.getElementById('dialogue');
  const choicesEl = document.getElementById('choices');
  
  dialogueEl.hidden = false;
  choicesEl.hidden = true;

  document.getElementById('speaker').textContent = node.speaker || '';
  
  const lineEl = document.getElementById('line');
  const advanceBtn = document.getElementById('advance-button');
  
  // 清理上一个打字动画
  if (currentTypingAnimation) {
    clearTimeout(currentTypingAnimation);
    currentTypingAnimation = null;
  }
  
  // 根据说话人更新人物高亮
  updateCastFocus(node.speaker);
  
  // 打字机效果：逐字显示
  const fullText = node.text;
  let charIndex = 0;
  let isTypingComplete = false;
  
  lineEl.textContent = '';
  advanceBtn.textContent = '▶';
  advanceBtn.classList.add('is-typing');
  
  function typeNextChar() {
    if (charIndex < fullText.length) {
      lineEl.textContent += fullText[charIndex];
      charIndex++;
      currentTypingAnimation = setTimeout(typeNextChar, 40); // 每个字40ms
    } else {
      isTypingComplete = true;
      advanceBtn.textContent = '继续';
      advanceBtn.classList.remove('is-typing');
      currentTypingAnimation = null;
    }
  }
  
  typeNextChar();
  
  // 点击行为：如果正在打字则立刻显示全部，否则前进
  advanceBtn.onclick = () => {
    if (!isTypingComplete) {
      // 跳过打字动画，直接显示全文
      if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
        currentTypingAnimation = null;
      }
      lineEl.textContent = fullText;
      isTypingComplete = true;
      advanceBtn.textContent = '继续';
      advanceBtn.classList.remove('is-typing');
    } else {
      onAdvance(node.next);
    }
  };
}

export function renderChoices(node, onChoice) {
  const dialogueEl = document.getElementById('dialogue');
  const choicesEl = document.getElementById('choices');
  
  dialogueEl.hidden = true;
  choicesEl.hidden = false;

  document.getElementById('choices-prompt').textContent = node.prompt || '你会怎么做？';
  
  const choiceList = document.getElementById('choice-list');
  // 兼容两种格式：choices/options 和 text/label
  const choicesArray = node.choices || node.options;
  choiceList.innerHTML = choicesArray.map((choice, idx) => {
    const text = choice.text || choice.label;
    return `<li><button data-choice="${idx}">${text}</button></li>`;
  }).join('');

  choiceList.onclick = (e) => {
    const idx = e.target.dataset.choice;
    if (idx !== undefined) {
      onChoice(parseInt(idx));
    }
  };
}

export function clearScene() {
  document.getElementById('dialogue').hidden = true;
  document.getElementById('choices').hidden = true;
}
