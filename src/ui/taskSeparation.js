// UI：课题分离。支持拖拽，也支持「先点事件，再点区域」的触屏操作
import { showOverlay, hideOverlay } from './overlay.js';

const ZONES = [
  { id: 'mine', title: '我可以决定' },
  { id: 'influence', title: '我可以影响，但不能决定' },
  { id: 'theirs', title: '最终由别人决定' }
];

export function renderTaskSeparation(node, onComplete) {
  const zonesHtml = ZONES.map((zone) => `
    <div class="task-zone" data-zone="${zone.id}">
      <strong class="zone-title">${zone.title}</strong>
    </div>
  `).join('');

  const itemsHtml = node.items.map((item, index) => `
    <div class="task-item" draggable="true" data-item="${index}">${item.text}</div>
  `).join('');

  showOverlay(`
    <h2 class="overlay-title">课题分离</h2>
    <div class="overlay-body">
      <p>${node.prompt}</p>
      <p class="overlay-note">拖动卡片，或先点一张卡片再点一个区域。没有标准答案，重点是你怎么想。</p>
      <div class="zone-grid">${zonesHtml}</div>
      <div class="task-tray" id="task-tray">${itemsHtml}</div>
      <button class="ink-button" data-role="submit">整理完了</button>
    </div>
  `);

  const sheet = document.getElementById('overlay-sheet');
  const zoneElements = sheet.querySelectorAll('.task-zone');
  let selectedItem = null;

  function selectItem(itemElement) {
    if (selectedItem) selectedItem.classList.remove('is-selected');
    selectedItem = selectedItem === itemElement ? null : itemElement;
    if (selectedItem) selectedItem.classList.add('is-selected');
  }

  sheet.addEventListener('dragstart', (event) => {
    const item = event.target.closest('.task-item');
    if (!item) return;
    event.dataTransfer.setData('text/plain', item.dataset.item);
    item.classList.add('is-dragging');
  });

  sheet.addEventListener('dragend', (event) => {
    const item = event.target.closest('.task-item');
    if (item) item.classList.remove('is-dragging');
  });

  zoneElements.forEach((zone) => {
    zone.addEventListener('dragover', (event) => {
      event.preventDefault();
      zone.classList.add('is-hovered');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('is-hovered'));

    zone.addEventListener('drop', (event) => {
      event.preventDefault();
      zone.classList.remove('is-hovered');
      const itemIndex = event.dataTransfer.getData('text/plain');
      const item = sheet.querySelector(`.task-item[data-item="${itemIndex}"]`);
      if (item) zone.appendChild(item);
    });
  });

  sheet.addEventListener('click', (event) => {
    const item = event.target.closest('.task-item');
    if (item) {
      selectItem(item);
      return;
    }

    const zone = event.target.closest('.task-zone');
    if (zone && selectedItem) {
      zone.appendChild(selectedItem);
      selectedItem.classList.remove('is-selected');
      selectedItem = null;
      return;
    }

    if (event.target.dataset.role === 'submit') {
      const placement = {};
      zoneElements.forEach((zoneElement) => {
        placement[zoneElement.dataset.zone] = Array.from(zoneElement.querySelectorAll('.task-item'))
          .map((element) => node.items[Number(element.dataset.item)].text);
      });
      hideOverlay();
      onComplete(placement);
    }
  });
}
