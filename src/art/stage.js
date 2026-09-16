// 舞台渲染：加载场景背景与人物立绘，按说话人切换表情
// 资源为 WebP（体积约为 PNG 的 4%，且保留立绘的透明通道）
import { resolveCharacterImage, resolveSceneImage } from './fallback.js';

const SCENE_PATH = 'assets/scenes';
const CHARACTER_PATH = 'assets/characters';
const IMAGE_EXTENSION = 'webp';

// 剧本里的旧场景名 → 实际图片文件名
const SCENE_ALIASES = {
  classroom: 'classroom-day',
  home: 'home-dining',
  bedroom: 'bedroom-night',
  'night-desk': 'bedroom-night',
  default: 'classroom-day',
};

// 说话人 → 立绘文件前缀
export const SPEAKER_PORTRAITS = {
  '林澈': 'linche-grin',
  '顾言': 'guyan-sharp',
  '许禾': 'xuhe-sorry',
  '沈老师': 'protagonist',
  '妈妈': 'protagonist',
};

// 基准资源：用户指定的6个WebP文件
const BASELINE_CHARACTERS = [
  'protagonist',
  'linche-grin',
  'guyan-sharp',
  'xuhe-sorry'
];

const BASELINE_SCENES = [
  'classroom-day',
  'bedroom-night'
];

export function resolveSceneFile(sceneId) {
  const aliased = SCENE_ALIASES[sceneId] || sceneId;
  return resolveSceneImage(aliased);
}

// 立绘文件名：所有变体通过fallback映射到4个基准角色图
export function resolvePortraitFile(portraitId, emotion) {
  const fullId = emotion ? `${portraitId}-${emotion}` : portraitId;
  return resolveCharacterImage(fullId);
}

// 预加载：避免切场景时闪白
export function preloadArtwork() {
  BASELINE_SCENES.forEach((name) => {
    const image = new Image();
    image.src = `${SCENE_PATH}/${name}.${IMAGE_EXTENSION}`;
  });

  BASELINE_CHARACTERS.forEach((file) => {
    const image = new Image();
    image.src = `${CHARACTER_PATH}/${file}.${IMAGE_EXTENSION}`;
  });
}

export function renderTitleArt() {
  const container = document.getElementById('title-art');
  container.innerHTML =
    `<img class="title-art-image" src="${SCENE_PATH}/classroom-day.${IMAGE_EXTENSION}" alt="">`;
}

let currentSceneFile = null;

export function renderStageArt(sceneId, characters = []) {
  const backdrop = document.getElementById('stage-backdrop');
  const cast = document.getElementById('stage-cast');
  const sceneFile = resolveSceneFile(sceneId);

  // 同一张背景连续出现时不重画，避免每句台词都淡入一次
  if (sceneFile !== currentSceneFile) {
    currentSceneFile = sceneFile;
    backdrop.innerHTML =
      `<img class="scene-photo" src="${SCENE_PATH}/${sceneFile}.${IMAGE_EXTENSION}" alt="">`;
    const image = backdrop.querySelector('.scene-photo');
    requestAnimationFrame(() => image.classList.add('is-shown'));
  }

  renderCast(cast, characters);
}

function renderCast(cast, characters) {
  const signature = characters.map((entry) => `${entry.id}:${entry.emotion || ''}`).join('|');
  if (cast.dataset.cast === signature) return;
  cast.dataset.cast = signature;

  cast.innerHTML = '';

  characters.forEach((entry, index) => {
    const position = entry.position || defaultPosition(index, characters.length);
    const file = resolvePortraitFile(entry.id, entry.emotion);

    const slot = document.createElement('div');
    slot.className = `cast-slot cast-${position}`;
    slot.dataset.portraitId = entry.id;
    slot.innerHTML = `<img class="cast-portrait" src="${CHARACTER_PATH}/${file}.${IMAGE_EXTENSION}" alt="">`;
    cast.appendChild(slot);

    requestAnimationFrame(() => slot.classList.add('is-present'));
  });
}

// 说话的人亮起来，其他人压暗
export function updateCastFocus(speaker) {
  const speakingId = SPEAKER_PORTRAITS[speaker] || (speaker ? null : 'protagonist');
  const slots = document.querySelectorAll('.cast-slot');

  slots.forEach((slot) => {
    const isSpeaking = speakingId !== null && slot.dataset.portraitId === speakingId;
    slot.classList.toggle('is-speaking', isSpeaking);
    slot.classList.toggle('is-dim', speakingId !== null && !isSpeaking);
  });
}

function defaultPosition(index, total) {
  if (total === 1) return 'center';
  if (total === 2) return index === 0 ? 'left' : 'right';
  return ['left', 'center', 'right'][index] || 'center';
}
