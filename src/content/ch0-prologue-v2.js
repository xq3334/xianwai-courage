// 序章：意外的任命（基于新大纲v2，兼容原引擎格式）
export const prologue = {
  id: 'ch0',
  title: '序章：意外的任命',
  start: 'start',
  nodes: {
    start: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '高一开学第一天。教室里弥漫着新生的陌生感，零零散散的交谈声在空气里浮动。', 
      next: 'p2' 
    },

    p2: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '班主任', 
      text: '「好了，安静一下。现在宣布班委名单。班长是李明，学习委员是王静……」', 
      next: 'p3' 
    },

    p3: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '班主任', 
      text: '「心理委员……我看看……就你吧。」', 
      next: 'p4' 
    },

    p4: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '全班的目光突然集中过来。有人窃笑，有人投来同情的眼神。', 
      next: 'p5' 
    },

    p5: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「哎呀挺好的，这个轻松。」', 
      next: 'choice1' 
    },

    choice1: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你的反应是……', 
      choices: [
        { 
          text: '「老师我不太合适……」', 
          effects: [
            { trait: 'autonomy', delta: 5 },
            { trait: 'boundary', delta: 3 }
          ], 
          next: 'refuse' 
        },
        { 
          text: '「好的老师。」', 
          effects: [{ trait: 'autonomy', delta: -3 }], 
          next: 'accept' 
        },
        { 
          text: '沉默点头', 
          effects: [
            { trait: 'autonomy', delta: -5 },
            { trait: 'boundary', delta: -3 }
          ], 
          next: 'silent' 
        }
      ]
    },

    refuse: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '班主任', 
      text: '「就这么定了，名单已经报上去了。」', 
      next: 'bell' 
    },

    accept: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '班主任', 
      text: '「很好。就这么定了。」', 
      next: 'bell' 
    },

    silent: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '班主任', 
      text: '「那就这样。名单已经报上去了。」', 
      next: 'bell' 
    },

    bell: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '下课铃响。还没等你缓过神，林澈已经拉着你往外走。', 
      next: 'linche_pull' 
    },

    linche_pull: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「走走走，我带你认识几个人，以后你当心理委员有人帮忙。」', 
      next: 'canteen' 
    },

    // 场景2：食堂
    canteen: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '中午，食堂。林澈拉着你坐到一桌人旁边。', 
      next: 'intro' 
    },

    intro: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '林澈', 
      text: '「这是我初中同学，这是隔壁班的……对了，这是我们班新的心理委员。」', 
      next: 'joke' 
    },

    joke: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '同学', 
      text: '「哟，以后心情不好找你聊啊。」', 
      next: 'linche_answer' 
    },

    linche_answer: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '林澈', 
      text: '「没问题，她可好说话了。」', 
      next: 'inner1' 
    },

    inner1: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '他总是这样。说的都是好话，但为什么我觉得不舒服？', 
      next: 'choice2' 
    },

    choice2: { 
      type: 'choice', 
      art: 'hall', 
      prompt: '你……', 
      choices: [
        { 
          text: '顺着话题笑：「对，有事随时找我。」', 
          effects: [
            { trait: 'autonomy', delta: -5 },
            { trait: 'boundary', delta: -5 }
          ], 
          next: 'comply' 
        },
        { 
          text: '纠正：「也没那么好说话……」', 
          effects: [
            { trait: 'autonomy', delta: 3 },
            { trait: 'boundary', delta: 5 }
          ], 
          next: 'correct' 
        },
        { 
          text: '沉默吃饭，不接话', 
          effects: [
            { trait: 'autonomy', delta: -2 },
            { trait: 'boundary', delta: 2 }
          ], 
          next: 'eat_silent' 
        }
      ]
    },

    comply: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '林澈', 
      text: '「看吧，我就说嘛！」', 
      next: 'leave' 
    },

    correct: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '林澈', 
      text: '「哈哈，开玩笑的啦。」', 
      next: 'leave' 
    },

    eat_silent: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '气氛有点微妙。林澈察觉到了，但没说什么。', 
      next: 'leave' 
    },

    leave: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '林澈', 
      text: '「哎对了，下午有个小组作业分组，我帮你占个位置，咱俩一组啊。」', 
      next: 'run' 
    },

    run: { 
      type: 'dialogue', 
      art: 'hall', 
      speaker: '', 
      text: '你还没回答，他已经端着餐盘跑了。', 
      next: 'class' 
    },

    // 场景3：语文课分组
    class: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '下午，语文课。老师宣布四人小组作业——研究性学习，贯穿整学期。', 
      next: 'teacher' 
    },

    teacher: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '老师', 
      text: '「四人一组，自由组合。」', 
      next: 'wave' 
    },

    wave: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「还缺俩人，谁来——」', 
      next: 'guyan' 
    },

    guyan: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「我一个人。」', 
      next: 'guyan_sit' 
    },

    guyan_sit: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '一个戴眼镜的男生面无表情地坐过来，全程没看你们，只是翻着自己的书。', 
      next: 'linche_stun' 
    },

    linche_stun: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「呃……那还缺一个——」', 
      next: 'xuhe' 
    },

    xuhe: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '许禾', 
      text: '「我……我可以吗？」', 
      next: 'done' 
    },

    done: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「行啊，那就咱们四个！」', 
      next: 'weird' 
    },

    weird: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '顾言全程没看你们，翻着自己的书。许禾眼神闪躲，像怕被拒绝。你感觉这个组合……很微妙。', 
      next: 'choice3' 
    },

    choice3: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你……', 
      choices: [
        { 
          text: '主动说：「那我们先加个微信吧？」', 
          effects: [
            { trait: 'ally', delta: 5 },
            { trait: 'action', delta: 3 }
          ], 
          next: 'active' 
        },
        { 
          text: '观察三人，不说话', 
          effects: [{ trait: 'boundary', delta: 3 }], 
          next: 'observe' 
        },
        { 
          text: '小声对林澈说：「这俩人……靠谱吗？」', 
          effects: [
            { trait: 'ally', delta: -5 },
            { trait: 'boundary', delta: -3 }
          ], 
          next: 'doubt' 
        }
      ]
    },

    active: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「先别急着社交，看看题目要求再说。」', 
      next: 'awkward' 
    },

    observe: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「先别急着社交，看看题目要求再说。」', 
      next: 'awkward' 
    },

    doubt: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「我听到了。先别急着社交，看看题目要求再说。」', 
      next: 'awkward' 
    },

    awkward: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '气氛有点尴尬。下课铃响，四人加了微信后散了。', 
      next: 'night' 
    },

    // 场景4：晚上
    night: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '晚上，躺在床上刷手机，看到班级群消息。', 
      next: 'notice' 
    },

    notice: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '班长', 
      text: '【班级群】各班委明天中午开会。', 
      next: 'realize' 
    },

    realize: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '你突然意识到：自己真的成了心理委员。想起白天林澈的"安排"，顾言的冷漠，许禾的小心翼翼……', 
      next: 'inner2' 
    },

    inner2: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '我只是想安安静静读完高中。为什么突然要管别人的心理？管小组作业？管那些复杂的人？', 
      next: 'choice4' 
    },

    choice4: { 
      type: 'choice', 
      art: 'night-desk', 
      prompt: '你的想法是……', 
      choices: [
        { 
          text: '算了，反正也跑不掉，尽量做好吧。', 
          effects: [
            { trait: 'autonomy', delta: -5 },
            { trait: 'action', delta: -3 }
          ], 
          next: 'msg' 
        },
        { 
          text: '先应付着，别把自己搞太累。', 
          effects: [
            { trait: 'boundary', delta: 5 },
            { trait: 'action', delta: -3 }
          ], 
          next: 'msg' 
        },
        { 
          text: '既然要做，就做出点样子。', 
          effects: [
            { trait: 'autonomy', delta: 5 },
            { trait: 'action', delta: 5 }
          ], 
          next: 'msg' 
        }
      ]
    },

    msg: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '手机震动。林澈发来消息。', 
      next: 'msg2' 
    },

    msg2: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '林澈', 
      text: '【消息】明天小组讨论，我整理了个初步方案，你看看？', 
      next: 'doc' 
    },

    doc: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '你还没回复，他又发来一个3000字的文档。你盯着屏幕，不知道该说什么。', 
      next: 'end' 
    },

    end: { type: 'end', nextChapter: 'ch1' }
  }
};
