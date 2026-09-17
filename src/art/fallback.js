// 资源映射：24 张立绘和 12 张场景全部接入

const CHARACTER_FALLBACK = {
  protagonist: 'protagonist',
  'protagonist-firm': 'protagonist-firm',
  'protagonist-smile': 'protagonist-smile',
  'protagonist-worry': 'protagonist-worry',
  linche: 'linche',
  'linche-grin': 'linche-grin',
  'linche-sulk': 'linche-sulk',
  'linche-plead': 'linche-plead',
  guyan: 'guyan',
  'guyan-sharp': 'guyan-sharp',
  'guyan-pause': 'guyan-pause',
  'guyan-soft': 'guyan-soft',
  xuhe: 'xuhe',
  'xuhe-sorry': 'xuhe-sorry',
  'xuhe-try': 'xuhe-try',
  'xuhe-happy': 'xuhe-happy',
  shen: 'shen',
  'shen-nod': 'shen-nod',
  'shen-ask': 'shen-ask',
  'shen-wait': 'shen-wait',
  mother: 'mother',
  'mother-quiet': 'mother-quiet',
  'mother-upset': 'mother-upset',
  'mother-worry': 'mother-worry'
};

const SCENE_FALLBACK = {
  classroom: 'classroom-day',
  'classroom-day': 'classroom-day',
  'classroom-sunset': 'classroom-sunset',
  'classroom-tense': 'classroom-day',
  'classroom-afternoon': 'classroom-afternoon',
  'classroom-morning': 'classroom-morning',
  'classroom-dusk': 'classroom-dusk',
  'classroom-empty': 'classroom-empty',
  'classroom-back': 'classroom-day',
  'classroom-presentation': 'classroom-day',
  bedroom: 'bedroom-night',
  'bedroom-night': 'bedroom-night',
  'home-dining': 'home-dining',
  'home-night': 'bedroom-night',
  corridor: 'corridor',
  hallway: 'corridor',
  hall: 'hall',
  library: 'library',
  office: 'office',
  stairwell: 'stairwell',
  'school-gate': 'school-gate',
  clarity: 'clarity',
  entangled: 'entangled',
  'counseling-room': 'office',
  rooftop: 'rooftop-day',
  'rooftop-day': 'rooftop-day',
  'rooftop-sunset': 'rooftop-sunset',
  playground: 'playground',
  'street-winter': 'school-gate'
};

export function resolveCharacterImage(characterId) {
  return CHARACTER_FALLBACK[characterId] || 'protagonist';
}

export function resolveSceneImage(sceneId) {
  return SCENE_FALLBACK[sceneId] || 'classroom-day';
}
