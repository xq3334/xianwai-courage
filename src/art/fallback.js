// 资源映射：将所有角色/场景ID映射到6个基准WebP文件
// 用户提供的基准资源：
// - protagonist.webp, linche-grin.webp, guyan-sharp.webp, xuhe-sorry.webp
// - classroom-day.webp, bedroom-night.webp

const CHARACTER_FALLBACK = {
  // 主角所有变体 → protagonist.webp
  'protagonist': 'protagonist',
  'protagonist-embarrassed': 'protagonist',
  'protagonist-hesitant': 'protagonist',
  'protagonist-lying-tired': 'protagonist',
  'protagonist-uncomfortable': 'protagonist',
  'protagonist-staring-phone': 'protagonist',
  'protagonist-forced-smile-mediating': 'protagonist',

  // 林澈所有变体 → linche-grin.webp
  'linche': 'linche-grin',
  'linche-grin': 'linche-grin',
  'linche-anxious-asking': 'linche-grin',
  'linche-cheerful-arranging': 'linche-grin',
  'linche-confident': 'linche-grin',
  'linche-pulling-cheerful': 'linche-grin',
  'linche-typing-angry': 'linche-grin',
  'linche-sulk': 'linche-grin',
  'linche-plead': 'linche-grin',

  // 顾言所有变体 → guyan-sharp.webp
  'guyan': 'guyan-sharp',
  'guyan-sharp': 'guyan-sharp',
  'guyan-male-cold': 'guyan-sharp',
  'guyan-male-angry': 'guyan-sharp',
  'guyan-male-sarcastic': 'guyan-sharp',
  'guyan-male-reading-cold': 'guyan-sharp',
  'guyan-male-typing-cold': 'guyan-sharp',
  'guyan-male-disappointed': 'guyan-sharp',
  'guyan-pause': 'guyan-sharp',
  'guyan-soft': 'guyan-sharp',

  // 许禾所有变体 → xuhe-sorry.webp
  'xuhe': 'xuhe-sorry',
  'xuhe-sorry': 'xuhe-sorry',
  'xuhe-red-eyes-complaining': 'xuhe-sorry',
  'xuhe-scared-asking': 'xuhe-sorry',
  'xuhe-pitiful-asking-help': 'xuhe-sorry',
  'xuhe-try': 'xuhe-sorry',
  'xuhe-happy': 'xuhe-sorry',

  // 配角角色 → 暂用主角图
  'teacher-shen': 'protagonist',
  'shen': 'protagonist',
  'shen-nod': 'protagonist',
  'shen-ask': 'protagonist',
  'teacher': 'protagonist',
  'mom': 'protagonist',
  'mother': 'protagonist',
  'mother-worry': 'protagonist',
  'mother-upset': 'protagonist'
};

const SCENE_FALLBACK = {
  // 教室所有变体 → classroom-day.webp
  'classroom': 'classroom-day',
  'classroom-day': 'classroom-day',
  'classroom-tense': 'classroom-day',
  'classroom-afternoon': 'classroom-day',
  'classroom-morning': 'classroom-day',
  'classroom-back': 'classroom-day',
  'classroom-presentation': 'classroom-day',

  // 卧室/家庭场景 → bedroom-night.webp
  'bedroom': 'bedroom-night',
  'bedroom-night': 'bedroom-night',
  'home-dining': 'bedroom-night',
  'home-night': 'bedroom-night',

  // 其他场景 → classroom-day.webp (临时)
  'office': 'classroom-day',
  'counseling-room': 'classroom-day',
  'rooftop': 'classroom-day',
  'rooftop-day': 'classroom-day',
  'rooftop-sunset': 'classroom-day',
  'hallway': 'classroom-day',
  'library': 'classroom-day',
  'street-winter': 'classroom-day'
};

export function resolveCharacterImage(characterId) {
  return CHARACTER_FALLBACK[characterId] || 'protagonist';
}

export function resolveSceneImage(sceneId) {
  return SCENE_FALLBACK[sceneId] || 'classroom-day';
}
