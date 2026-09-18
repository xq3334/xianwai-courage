// 结局海报：六个结局各一张彩铅意象图，文件名与结局 id 一致。
//
// 这批图刻意不沿用角色立绘的画风，也没有用任何角色参考图。结局讲的是一整个
// 学期沉淀下来的生活方式，不是某个场景里的某一个人 —— 所以画面走物件与线条的
// 象征（空椅子、断掉的线、没画完的那条线），不画脸。
//
// 不做预加载：一次通关只会到达其中一个结局，六张全预热是白花流量。海报由
// CSS 淡入，加载期间先占住版位，不会让整个结局面板跳动。
const ENDING_ART_PATH = 'assets/endings';
const IMAGE_EXTENSION = 'webp';

// alt 文本描述画面本身，而不是重复旁边已有的结局标题。
// 海报承载的是标题和正文都没说出口的那层情绪，读屏用户同样需要。
const ENDING_POSTERS = {
  borrowed: '空桌面对一块整齐的展板，地上众人的脚印都朝展板汇去，独独缺了一行',
  burden: '一个只有轮廓的背影，背着高得摇晃的书堆，无数细线从书堆连向地上一双双朝向不同的空鞋',
  island: '一张空椅子立在小小的纸岛上，剪断的线被重新垒成围住椅子的矮墙',
  applause: '活动散场后的空教室，纸屑还在半空落着，桌上那张表格只有一行是空白的',
  departure: '清晨推开一扇窗，一条线从屋里伸到窗外，在半空停住，还没有画完',
  repair: '两条曾经缠成死结的线如今分开并行，又朝同一个远处弯去，中间是一张用针脚缝好、裂痕仍清晰可见的纸'
};

export function hasEndingPoster(endingId) {
  return Object.hasOwn(ENDING_POSTERS, endingId);
}

export function resolveEndingPosterSource(endingId) {
  if (!hasEndingPoster(endingId)) return null;
  return `${ENDING_ART_PATH}/${endingId}.${IMAGE_EXTENSION}`;
}

export function describeEndingPoster(endingId) {
  return ENDING_POSTERS[endingId] || '';
}

export function listEndingPosterIds() {
  return Object.keys(ENDING_POSTERS);
}
