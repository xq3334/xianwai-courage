// UI：覆盖层面板。每次打开都换掉旧的点击处理，避免监听器叠加
let activeClickHandler = null;

export function showOverlay(htmlContent, onClick = null) {
  const overlay = document.getElementById('overlay');
  const sheet = document.getElementById('overlay-sheet');

  if (activeClickHandler) {
    sheet.removeEventListener('click', activeClickHandler);
    activeClickHandler = null;
  }

  sheet.innerHTML = htmlContent;
  overlay.hidden = false;
  sheet.scrollTop = 0;

  const closeButton = sheet.querySelector('.overlay-close');
  if (closeButton) {
    closeButton.addEventListener('click', hideOverlay);
  }

  if (onClick) {
    activeClickHandler = onClick;
    sheet.addEventListener('click', activeClickHandler);
  }
}

export function hideOverlay() {
  const overlay = document.getElementById('overlay');
  const sheet = document.getElementById('overlay-sheet');

  if (activeClickHandler) {
    sheet.removeEventListener('click', activeClickHandler);
    activeClickHandler = null;
  }

  overlay.hidden = true;
  sheet.innerHTML = '';
}
