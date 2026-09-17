// 表情推断：根据台词内容为每句对话挑选立绘表情。
//
// 剧本里 687 个节点一句都没标 emotion，所以在修复前每个角色永远是同一张脸。
// 手工标注 318 句代价过高且容易漏，这里按台词的语气特征推断。
// 关键词按「越具体越优先」排序，命中即返回。

// 每个角色的可用表情，以及各表情的语气特征词
const EMOTION_RULES = {
  linche: {
    fallback: 'grin',
    rules: [
      { emotion: 'plead', keywords: ['求你', '帮我', '拜托', '别这样', '算我', '就一次', '好不好', '别生气', '对不起', '我错了'] },
      { emotion: 'sulk', keywords: ['凭什么', '你变了', '随便你', '算了', '无所谓', '不用你', '呵', '你们都', '为什么不', '失望'] },
      { emotion: 'grin', keywords: ['哈哈', '哎呀', '走走走', '没问题', '放心', '交给我', '挺好', '当然', '一起'] },
    ],
  },
  guyan: {
    fallback: 'sharp',
    rules: [
      { emotion: 'soft', keywords: ['谢谢', '对不起', '你说得对', '我不知道', '我做不到', '我也在浪费', '我不敢', '我怕', '我自己', '低下头', '声音很低'] },
      { emotion: 'pause', keywords: ['……也对', '缓缓', '点头', '可以试试', '还挺诚实', '至少你', '我想想', '或许', '也许'] },
      { emotion: 'sharp', keywords: ['虚伪', '最烦', '可笑', '不配', '你以为', '有用吗', '嗤笑', '别说话', '除了哭', '浪费', '认输', '烂了'] },
    ],
  },
  xuhe: {
    fallback: 'sorry',
    rules: [
      { emotion: 'happy', keywords: ['谢谢', '太好了', '真的吗', '我可以', '开心', '笑了'] },
      { emotion: 'try', keywords: ['我试试', '我来做', '我会', '我想', '让我', '我能不能', '我尽量'] },
      { emotion: 'sorry', keywords: ['对不起', '抱歉', '我不行', '我做不到', '别怪我', '我害怕', '哭', '眼泪', '红着眼', '是不是我'] },
    ],
  },
  shen: {
    fallback: 'ask',
    rules: [
      { emotion: 'nod', keywords: ['很好', '你说得对', '就是这样', '我明白', '点头', '不错', '有进步', '你已经'] },
      { emotion: 'wait', keywords: ['……', '慢慢说', '不着急', '想清楚', '你再想', '沉默', '等你'] },
      { emotion: 'ask', keywords: ['为什么', '你觉得', '怎么想', '是吗', '呢？', '什么', '如何', '真的'] },
    ],
  },
  mother: {
    fallback: 'worry',
    rules: [
      { emotion: 'upset', keywords: ['你说什么', '不行', '我不同意', '胡闹', '怎么能', '你要退出', '别人家', '丢人'] },
      { emotion: 'quiet', keywords: ['你长大了', '按你的想法', '随你', '……好', '沉默', '看着你'] },
      { emotion: 'worry', keywords: ['担心', '妈妈', '身体', '休息', '别累', '还好吗', '怎么了', '再想想'] },
    ],
  },
  protagonist: {
    fallback: 'worry',
    rules: [
      { emotion: 'firm', keywords: ['我不', '我拒绝', '我决定', '这是我', '我想要', '不用了', '我会说', '我自己'] },
      { emotion: 'smile', keywords: ['谢谢', '好的', '没关系', '我明白', '笑', '开心'] },
      { emotion: 'worry', keywords: ['我不知道', '也许', '可是', '但是', '怎么办', '不太', '有点'] },
    ],
  },
};

// 台词里的动作描写也参与判断，权重高于语气词
const ACTION_HINTS = [
  { pattern: /低下头|声音很低|沉默了很久/, emotion: { guyan: 'soft', xuhe: 'sorry', linche: 'sulk' } },
  { pattern: /嗤笑|冷笑|翻了个白眼/, emotion: { guyan: 'sharp', linche: 'sulk' } },
  { pattern: /点头|缓缓/, emotion: { guyan: 'pause', shen: 'nod' } },
  { pattern: /笑了|笑着|咧嘴/, emotion: { linche: 'grin', xuhe: 'happy', protagonist: 'smile' } },
  { pattern: /哭|眼泪|红着眼/, emotion: { xuhe: 'sorry' } },
];

export function inferEmotion(portraitId, text) {
  const config = EMOTION_RULES[portraitId];
  if (!config) return null;
  if (!text) return config.fallback;

  for (const hint of ACTION_HINTS) {
    if (hint.pattern.test(text) && hint.emotion[portraitId]) {
      return hint.emotion[portraitId];
    }
  }

  for (const rule of config.rules) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) {
      return rule.emotion;
    }
  }

  return config.fallback;
}

export function listEmotions(portraitId) {
  const config = EMOTION_RULES[portraitId];
  return config ? config.rules.map((rule) => rule.emotion) : [];
}
