// 终章：学期末的选择
// 格式A版本，兼容现有引擎

export const finale = {
  id: 'finale',
  title: '终章：学期末的选择',
  start: 'opening',
  nodes: {
    opening: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '一月。期末考试周结束了。',
      next: 's2'
    },

    s2: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '这一学期发生了太多事。你和林澈、顾言、许禾的关系都经历了巨大变化。',
      next: 's3'
    },

    s3: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '班主任通知：「下学期班委要重新选举。」',
      next: 's4'
    },

    s4: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你看着窗外，想起开学第一天被点名当心理委员的那个下午。',
      next: 'inner1'
    },

    inner1: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（那时的我，只想安安静静读完高中。现在的我……）',
      next: 'decision'
    },

    decision: {
      type: 'choice',
      art: 'classroom',
      prompt: '关于下学期是否继续当心理委员，你的决定是……',
      choices: [
        { text: '申请退出，我需要休息', next: 'quit', effects: [{ trait: 'autonomy', delta: 5 }] },
        { text: '继续当，但要做出改变', next: 'continue', effects: [{ trait: 'autonomy', delta: 8 }, { trait: 'action', delta: 5 }] },
        { text: '继续当，维持现状', next: 'maintain', effects: [{ trait: 'autonomy', delta: -3 }] }
      ]
    },

    quit: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '',
      text: '晚上，你在家里和妈妈说了这个决定。',
      next: 'mom_reaction'
    },

    mom_reaction: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '妈妈',
      text: '「你说什么？你要退出？」',
      next: 'explain'
    },

    explain: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '',
      text: '「我想做回普通学生。这不是我想要的。」',
      next: 'mom_response'
    },

    mom_response: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '妈妈',
      text: '「那你想要什么？」',
      next: 'answer'
    },

    answer: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '',
      text: '「我想要一个普通的高中生活。不用被别人需要，也不用证明自己有价值。我就是我。这就够了。」',
      next: 'mom_silent'
    },

    mom_silent: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '妈妈',
      text: '「……你长大了。那就按你的想法做吧。」',
      next: 'inner2'
    },

    inner2: {
      type: 'dialogue',
      art: 'bedroom',
      speaker: '',
      text: '（原来，真正的自立，是敢于让别人失望。）',
      next: 'ending_quit'
    },

    ending_quit: {
      type: 'end',
      nextChapter: null
    },

    continue: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你找到沈老师，说出了自己的想法。',
      next: 'shen1'
    },

    shen1: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「你想继续当心理委员，但要做出改变？」',
      next: 'shen2'
    },

    shen2: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '「是的。我学会了设置边界，但我也想帮助别人。不是替他们解决问题，而是陪他们一起面对。」',
      next: 'shen3'
    },

    shen3: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「你已经找到了答案。这就是共同体感觉——在保持自我的同时，与他人建立真实的连接。」',
      next: 'inner3'
    },

    inner3: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（这不是结束。这是开始。）',
      next: 'ending_continue'
    },

    ending_continue: {
      type: 'end',
      nextChapter: null
    },

    maintain: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你决定继续当心理委员，就像之前一样。',
      next: 'inner4'
    },

    inner4: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（但内心深处，你知道自己并没有真正改变。）',
      next: 'ending_maintain'
    },

    ending_maintain: {
      type: 'end',
      nextChapter: null
    }
  }
};
