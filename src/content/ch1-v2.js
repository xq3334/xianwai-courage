// 第一章：林澈的边界（基于新大纲v2，兼容原引擎格式）
export const chapter1 = {
  id: 'ch1',
  title: '第一章：林澈的边界',
  start: 'start',
  nodes: {
    // 场景1：周二中午，小组讨论
    start: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '周二中午。小组四人第一次正式讨论，气氛有些紧张。', 
      next: 'lc1' 
    },

    lc1: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「我昨晚想了一下，咱们这个题目可以这样分工——」', 
      next: 'lc2' 
    },

    lc2: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他开始分配任务，语速很快，看起来很有规划。你发现：你的任务已经被他定好了。', 
      next: 'gy1' 
    },

    gy1: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「等一下，谁说你是组长？」', 
      next: 'lc3' 
    },

    lc3: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「我……我不是组长，我只是提个建议……」', 
      next: 'gy2' 
    },

    gy2: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「建议？你已经全分配完了。」', 
      next: 'xh1' 
    },

    xh1: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '许禾缩着肩膀不说话。林澈看向你，眼神像在求救。', 
      next: 'choice1' 
    },

    choice1: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你……', 
      choices: [
        { 
          text: '「我觉得方案挺好的，咱们可以照着做。」', 
          effects: [
            { trait: 'autonomy', delta: -5 },
            { trait: 'boundary', delta: -5 },
            { trait: 'ally', delta: 3 }
          ], 
          next: 'help_lc' 
        },
        { 
          text: '「要不大家都说说想法？」', 
          effects: [{ trait: 'ally', delta: 5 }], 
          next: 'neutral' 
        },
        { 
          text: '「确实，应该先讨论再分工。」', 
          effects: [
            { trait: 'autonomy', delta: 5 },
            { trait: 'boundary', delta: 5 }
          ], 
          next: 'support_gy' 
        }
      ]
    },

    // 分支A：帮林澈
    help_lc: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '林澈松了口气。顾言冷笑了一声。', 
      next: 'gy_out_a' 
    },

    gy_out_a: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「行，那你们俩搭档吧，我自己做我的部分。」', 
      next: 'gy_earphone_a' 
    },

    gy_earphone_a: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他戴上耳机，不再参与讨论。许禾小声说：「我……我听你们的……」', 
      next: 'lc_thanks_a' 
    },

    lc_thanks_a: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「还是你懂我。」', 
      next: 'inner_a' 
    },

    inner_a: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他的笑容让我不安。我是真的赞同，还是只是不想让他难堪？', 
      next: 'corridor' 
    },

    // 分支B：中立
    neutral: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '林澈有点失落，顾言稍微缓和了一些。', 
      next: 'gy_ask_b' 
    },

    gy_ask_b: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「说吧，你的方案具体是什么。」', 
      next: 'lc_retry_b' 
    },

    lc_retry_b: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '林澈重新讲了一遍，这次语气弱了些。讨论过程中你发现：林澈的方案确实很周全，但没考虑每个人的意见。许禾始终没说话。', 
      next: 'corridor' 
    },

    // 分支C：站顾言
    support_gy: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '林澈脸色变了，气氛很僵。林澈看着你，眼神里有受伤和不解。', 
      next: 'lc_hurt_c' 
    },

    lc_hurt_c: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「行，那你们讨论吧，我听着。」', 
      next: 'gy_satisfied_c' 
    },

    gy_satisfied_c: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「这才对。」', 
      next: 'silent_c' 
    },

    silent_c: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '接下来的讨论里，林澈一直没说话。', 
      next: 'corridor' 
    },

    // 场景2：放学后走廊
    corridor: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '放学后，你正在整理书包。', 
      next: 'lc_call' 
    },

    lc_call: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「哎，等一下。」', 
      next: 'lc_complex' 
    },

    lc_complex: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他的表情有点复杂，欲言又止。', 
      next: 'lc_question' 
    },

    lc_question: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「你是不是……觉得我太强势了？」', 
      next: 'choice2' 
    },

    choice2: { 
      type: 'choice', 
      art: 'corridor', 
      prompt: '你的回答是……', 
      choices: [
        { 
          text: '「没有，你挺好的。」', 
          effects: [
            { trait: 'autonomy', delta: -5 },
            { trait: 'boundary', delta: -5 }
          ], 
          next: 'comfort' 
        },
        { 
          text: '「有一点……但你是为了团队好。」', 
          effects: [
            { trait: 'autonomy', delta: 3 },
            { trait: 'boundary', delta: 3 }
          ], 
          next: 'honest_soft' 
        },
        { 
          text: '「有。你没问过我想不想要那个任务。」', 
          effects: [
            { trait: 'autonomy', delta: 8 },
            { trait: 'boundary', delta: 8 }
          ], 
          next: 'direct' 
        }
      ]
    },

    comfort: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「我就知道，咱俩这么多年，我还不了解你？」', 
      next: 'comfort_after' 
    },

    comfort_after: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他继续用他的方式"照顾"你。', 
      next: 'tuanjian' 
    },

    honest_soft: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「……我以后注意。」', 
      next: 'honest_after' 
    },

    honest_after: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他开始变得小心翼翼，但底层逻辑没变。', 
      next: 'tuanjian' 
    },

    direct: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '林澈愣住，然后苦笑。', 
      next: 'direct_after' 
    },

    direct_after: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「原来你一直这么想。那以后我不管了。」', 
      next: 'tuanjian' 
    },

    tuanjian: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「对了，下周班里要搞团建，我帮你报名了。」', 
      next: 'try_refuse' 
    },

    try_refuse: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '你：「……我不是说想自己——」', 
      next: 'interrupt' 
    },

    interrupt: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「哎呀报名截止了，我怕你忘记，先帮你占上了，不想去再说。」', 
      next: 'pat' 
    },

    pat: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他拍拍你肩膀就走了。', 
      next: 'inner2' 
    },

    inner2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '为什么我说不出"我不想去"这四个字？', 
      next: 'night2' 
    },

    // 场景3：周五晚上
    night2: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '周五晚上。躺在床上刷手机，看到小组群里的消息。', 
      next: 'draft' 
    },

    draft: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '林澈发了一份他整理的"初稿"，说"大家看看有没有要补充的"。', 
      next: 'gy_msg' 
    },

    gy_msg: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '顾言', 
      text: '【群消息】你做完了？', 
      next: 'lc_reply' 
    },

    lc_reply: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '林澈', 
      text: '【群消息】也不算，就是把思路先理一下。', 
      next: 'gy_silent' 
    },

    gy_silent: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '顾言没再回复。许禾发了个"辛苦了"的表情。', 
      next: 'inner3' 
    },

    inner3: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '他又自己做完了。他是真的想帮忙，还是不信任我们？还是……他就是习惯掌控一切？', 
      next: 'choice3' 
    },

    choice3: { 
      type: 'choice', 
      art: 'night-desk', 
      prompt: '你的想法是……', 
      choices: [
        { 
          text: '算了，他做得好，我就不用那么累了。', 
          effects: [
            { trait: 'autonomy', delta: -8 },
            { trait: 'action', delta: -5 }
          ], 
          next: 'rely' 
        },
        { 
          text: '我应该也做点什么，不能总让他一个人。', 
          effects: [{ trait: 'action', delta: 5 }], 
          next: 'guilt' 
        },
        { 
          text: '他这样搞，我们还算一个组吗？', 
          effects: [
            { trait: 'autonomy', delta: 5 },
            { trait: 'boundary', delta: 5 }
          ], 
          next: 'resist' 
        }
      ]
    },

    rely: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '手机又震动了，这次是私聊。', 
      next: 'xh_msg' 
    },

    guilt: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '手机又震动了，这次是私聊。', 
      next: 'xh_msg' 
    },

    resist: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '手机又震动了，这次是私聊。', 
      next: 'xh_msg' 
    },

    xh_msg: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '许禾', 
      text: '【私聊】在吗？能找你聊聊吗？', 
      next: 'predict' 
    },

    predict: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '你看着这条消息，有种不好的预感。', 
      next: 'end' 
    },

    end: { type: 'end', nextChapter: 'ch2' }
  }
};
