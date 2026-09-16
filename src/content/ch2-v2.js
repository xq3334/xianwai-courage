// 第二章：许禾的沼泽（基于新大纲v2，简化版）
export const chapter2 = {
  id: 'ch2',
  title: '第二章：许禾的沼泽',
  start: 'start',
  nodes: {
    start: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '周六下午。你约许禾在学校附近的奶茶店见面。', 
      next: 'xh1' 
    },

    xh1: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「我是不是很没用？林澈都做完了，我什么都没做……」', 
      next: 'xh2' 
    },

    xh2: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '她眼睛红红的，开始倾诉：自己很想努力，但不知道怎么做，怕做错被嫌弃。', 
      next: 'xh3' 
    },

    xh3: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「而且……班里有些女生好像不太喜欢我。」', 
      next: 'choice1' 
    },

    choice1: { 
      type: 'choice', 
      art: 'hall', 
      prompt: '你的反应是……', 
      choices: [
        { 
          text: '「哪些女生？她们怎么你了？」', 
          effects: [
            { trait: 'boundary', delta: -5 },
            { trait: 'ally', delta: 3 }
          ], 
          next: 'side_with_her' 
        },
        { 
          text: '「你觉得是为什么？」', 
          effects: [
            { trait: 'boundary', delta: 3 }
          ], 
          next: 'neutral' 
        },
        { 
          text: '「可能是你想多了？」', 
          effects: [
            { trait: 'ally', delta: -3 }
          ], 
          next: 'doubt' 
        }
      ]
    },

    side_with_her: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「她们总在我背后说话，我一走过去就不说了……你能帮我吗？」', 
      next: 'help_choice' 
    },

    neutral: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「我也不知道……可能是我太敏感了？但她们确实……不太理我。」', 
      next: 'help_choice' 
    },

    doubt: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「可能吧……但我真的感觉得到。」', 
      next: 'awkward' 
    },

    awkward: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '气氛有点尴尬。', 
      next: 'week_later' 
    },

    help_choice: { 
      type: 'choice', 
      art: 'hall', 
      prompt: '她问："你能不能帮我跟她们说说？"', 
      choices: [
        { 
          text: '「好，我帮你问问情况。」', 
          effects: [
            { trait: 'boundary', delta: -8 },
            { trait: 'action', delta: 3 }
          ], 
          next: 'take_responsibility' 
        },
        { 
          text: '「我可以观察，但不能替你解决。」', 
          effects: [
            { trait: 'boundary', delta: 5 },
            { trait: 'autonomy', delta: 3 }
          ], 
          next: 'set_boundary' 
        },
        { 
          text: '「这是你和她们之间的事。」', 
          effects: [
            { trait: 'boundary', delta: 8 },
            { trait: 'ally', delta: -5 }
          ], 
          next: 'refuse' 
        }
      ]
    },

    take_responsibility: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「谢谢你！我就知道你会帮我！」', 
      next: 'inner1' 
    },

    inner1: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '她感激地握住你的手。你感觉肩上突然多了一份重量。', 
      next: 'week_later' 
    },

    set_boundary: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「嗯……那你观察之后能告诉我吗？」', 
      next: 'disappointed' 
    },

    disappointed: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '她看起来有点失望，但接受了。', 
      next: 'week_later' 
    },

    refuse: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「可是……你是心理委员啊……」', 
      next: 'moral_pressure' 
    },

    moral_pressure: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '许禾', 
      text: '「……那算了，可能是我要求太多了。」', 
      next: 'inner2' 
    },

    inner2: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '她的语气里满是委屈，像在道德绑架。', 
      next: 'week_later' 
    },

    week_later: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '一周后，小组群里又炸了。', 
      next: 'group_fight' 
    },

    group_fight: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '林澈', 
      text: '【群消息】明天讨论第二阶段，都来吧。', 
      next: 'gy_refuse' 
    },

    gy_refuse: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '顾言', 
      text: '【群消息】我自己写完了，不用讨论。', 
      next: 'lc_angry' 
    },

    lc_angry: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '林澈', 
      text: '【群消息】？这是小组作业，你一个人写算什么？', 
      next: 'gy_sarcasm' 
    },

    gy_sarcasm: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '顾言', 
      text: '【群消息】反正你也都安排好了，我就省得浪费时间。', 
      next: 'fight_escalate' 
    },

    fight_escalate: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '两人开始在群里吵起来。许禾没说话。你夹在中间，不知道该说什么。', 
      next: 'final_choice' 
    },

    final_choice: { 
      type: 'choice', 
      art: 'night-desk', 
      prompt: '你……', 
      choices: [
        { 
          text: '劝架：「别吵了，明天见面好好说。」', 
          effects: [
            { trait: 'ally', delta: 3 },
            { trait: 'boundary', delta: -3 }
          ], 
          next: 'mediate' 
        },
        { 
          text: '@顾言：「有意见可以说，但别阴阳怪气。」', 
          effects: [
            { trait: 'ally', delta: -3 }
          ], 
          next: 'side_lc' 
        },
        { 
          text: '@林澈：「他确实有点道理。」', 
          effects: [
            { trait: 'autonomy', delta: 5 }
          ], 
          next: 'side_gy' 
        },
        { 
          text: '不发言，关掉手机', 
          effects: [
            { trait: 'action', delta: -5 }
          ], 
          next: 'escape' 
        }
      ]
    },

    mediate: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '群里安静了一会儿，但你知道，问题没有解决。', 
      next: 'end' 
    },

    side_lc: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '顾言', 
      text: '【群消息】行，你们继续吧。', 
      next: 'gy_exit' 
    },

    gy_exit: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '顾言退出了群聊。', 
      next: 'end' 
    },

    side_gy: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '林澈', 
      text: '【群消息】……随便你们。', 
      next: 'lc_hurt_end' 
    },

    lc_hurt_end: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '林澈没再说话。', 
      next: 'end' 
    },

    escape: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '你关掉手机，躺在床上。手机不停震动，但你不想看。', 
      next: 'end' 
    },

    end: { type: 'end', nextChapter: 'finale' }
  }
};
