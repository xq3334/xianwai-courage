// 第三章：顾言的刺（基于新大纲v2）
export const chapter3 = {
  id: 'ch3',
  title: '第三章：顾言的刺',
  start: 'start',
  nodes: {
    // 场景1：周二，小组讨论（炸裂现场）
    start: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '周二下午。小组四人在教室后排，气氛冰冷。', 
      next: 'lc_start' 
    },

    lc_start: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「我们继续上次的——」', 
      next: 'gy_interrupt' 
    },

    gy_interrupt: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「你就不能先听听别人的想法吗？」', 
      next: 'lc_angry' 
    },

    lc_angry: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「我有不听吗？每次我提建议你都反对！」', 
      next: 'gy_attack' 
    },

    gy_attack: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「因为你的『建议』就是命令。」', 
      next: 'lc_red' 
    },

    lc_red: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「那你倒是说说你的想法啊！」', 
      next: 'gy_sarcastic' 
    },

    gy_sarcastic: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「说了有用吗？你会听？」', 
      next: 'xh_mediate' 
    },

    xh_mediate: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '许禾', 
      text: '「要不……别吵了……」', 
      next: 'gy_turn' 
    },

    gy_turn: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「你别说话了行吗？就会和稀泥。」', 
      next: 'xh_cry' 
    },

    xh_cry: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '许禾眼泪立刻下来了。', 
      next: 'lc_protect' 
    },

    lc_protect: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '林澈', 
      text: '「你针对我就算了，禾禾做错什么了？」', 
      next: 'gy_cruel' 
    },

    gy_cruel: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「她除了哭还会什么？」', 
      next: 'explosion' 
    },

    explosion: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '许禾哭着跑出了教室。林澈也摔门走了。就剩你和顾言。', 
      next: 'choice1' 
    },

    choice1: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你……', 
      choices: [
        { 
          text: '追许禾', 
          effects: [
            { trait: 'ally', delta: 3 },
            { trait: 'autonomy', delta: -3 }
          ], 
          next: 'chase_xuhe' 
        },
        { 
          text: '追林澈', 
          effects: [{ trait: 'ally', delta: 3 }], 
          next: 'chase_linche' 
        },
        { 
          text: '留下和顾言谈', 
          effects: [
            { trait: 'autonomy', delta: 8 },
            { trait: 'action', delta: 5 }
          ], 
          next: 'stay_with_gy' 
        },
        { 
          text: '一个人都不追，自己也走', 
          effects: [
            { trait: 'action', delta: -8 },
            { trait: 'ally', delta: -5 }
          ], 
          next: 'leave_all' 
        }
      ]
    },

    chase_xuhe: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '你追上许禾，她哭得很伤心。你安慰了她很久。', 
      next: 'xh_comfort' 
    },

    xh_comfort: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '许禾', 
      text: '「为什么他们都这么凶……我做错什么了……」', 
      next: 'group_broken' 
    },

    chase_linche: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '你追上林澈，他脸色很难看。', 
      next: 'lc_vent' 
    },

    lc_vent: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '林澈', 
      text: '「我受够顾言了。他凭什么那么说许禾？」', 
      next: 'group_broken' 
    },

    leave_all: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '你走出教室，在走廊上停下。你感觉自己要崩溃了。', 
      next: 'group_broken' 
    },

    // 核心分支：留下和顾言谈
    stay_with_gy: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '你坐回座位，看着顾言。', 
      next: 'gy_stare' 
    },

    gy_stare: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '顾言也盯着你,眼神像在说"你也要来说教吗"。', 
      next: 'silence' 
    },

    silence: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '沉默了十几秒。', 
      next: 'ask' 
    },

    ask: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '「你为什么这么生气？」', 
      next: 'gy_reaction' 
    },

    gy_reaction: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「……你没发现吗？这个组从头到尾就是林澈一个人的舞台。」', 
      next: 'gy_explain' 
    },

    gy_explain: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「他表面上说『团队合作』，实际上呢？他做主，你们配合，许禾装可怜，我就是个异类。」', 
      next: 'choice2' 
    },

    choice2: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你的回应是……', 
      choices: [
        { 
          text: '「他不是那个意思……」', 
          effects: [{ trait: 'ally', delta: -3 }], 
          next: 'defend_lc' 
        },
        { 
          text: '「你说的有道理，但你的方式也有问题。」', 
          effects: [{ trait: 'autonomy', delta: 3 }], 
          next: 'objective' 
        },
        { 
          text: '「所以你就用攻击的方式来证明你的存在？」', 
          effects: [{ trait: 'ally', delta: -5 }], 
          next: 'attack_back' 
        },
        { 
          text: '沉默，只是听着', 
          effects: [
            { trait: 'autonomy', delta: 5 },
            { trait: 'ally', delta: 5 }
          ], 
          next: 'listen' 
        }
      ]
    },

    defend_lc: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「你果然还是站他那边。」', 
      next: 'gy_leave1' 
    },

    gy_leave1: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他开始收拾东西。', 
      next: 'group_broken' 
    },

    objective: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「我的方式有问题？那你的方式呢？忍气吞声就对了？」', 
      next: 'group_broken' 
    },

    attack_back: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「……你果然和他们一样。」', 
      next: 'gy_leave2' 
    },

    gy_leave2: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他摔门离开。', 
      next: 'group_broken' 
    },

    // 深度分支：倾听
    listen: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '顾言盯着你，似乎在确认你是不是真的在听。', 
      next: 'gy_accusation' 
    },

    gy_accusation: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「你知道吗，我最烦的不是林澈，是你。」', 
      next: 'stunned' 
    },

    stunned: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '你愣住。', 
      next: 'gy_truth' 
    },

    gy_truth: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「你明明不舒服，为什么不说？你就这么怕得罪人？」', 
      next: 'gy_truth2' 
    },

    gy_truth2: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「林澈替你做决定，你忍着；许禾情绪勒索你，你也受着；我说句实话，你又觉得我太过分。」', 
      next: 'gy_truth3' 
    },

    gy_truth3: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「你这种人……最虚伪。」', 
      next: 'inner_knife' 
    },

    inner_knife: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他的话像刀子。因为都是真的。', 
      next: 'choice3' 
    },

    choice3: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你……', 
      choices: [
        { 
          text: '「你根本不了解我。」', 
          effects: [{ trait: 'autonomy', delta: -3 }], 
          next: 'defend_self' 
        },
        { 
          text: '「……也许你说得对。」', 
          effects: [
            { trait: 'autonomy', delta: 8 },
            { trait: 'acceptance', delta: 5 }
          ], 
          next: 'admit' 
        },
        { 
          text: '「那你呢？你就不虚伪？」', 
          effects: [{ trait: 'ally', delta: -5 }], 
          next: 'counter' 
        }
      ]
    },

    defend_self: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「是啊，我不了解。那就这样吧。」', 
      next: 'group_broken' 
    },

    counter: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「……随你怎么想。」', 
      next: 'group_broken' 
    },

    // 最深层分支：承认
    admit: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '顾言没想到你会承认，他愣住了。', 
      next: 'gy_soften' 
    },

    gy_soften: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「……你还挺诚实。」', 
      next: 'gy_sit' 
    },

    gy_sit: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '', 
      text: '他坐回来，语气稍微缓和。', 
      next: 'gy_confess' 
    },

    gy_confess: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「我不是针对你。我只是受不了……那种大家都装作很和谐的样子。」', 
      next: 'gy_confess2' 
    },

    gy_confess2: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「这个组已经烂了，为什么不能承认？」', 
      next: 'choice4' 
    },

    choice4: { 
      type: 'choice', 
      art: 'classroom', 
      prompt: '你的回应……', 
      choices: [
        { 
          text: '「那你觉得应该怎么办？」', 
          effects: [{ trait: 'action', delta: 3 }], 
          next: 'ask_solution' 
        },
        { 
          text: '「你想退出吗？」', 
          effects: [{ trait: 'boundary', delta: 3 }], 
          next: 'ask_quit' 
        },
        { 
          text: '「我也不知道该怎么办。」', 
          effects: [
            { trait: 'acceptance', delta: 5 },
            { trait: 'ally', delta: 5 }
          ], 
          next: 'honest_confusion' 
        }
      ]
    },

    ask_solution: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「……我不知道。但装作没事肯定不是办法。」', 
      next: 'rooftop_invite' 
    },

    ask_quit: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「想过。但退出就是认输。」', 
      next: 'rooftop_invite' 
    },

    honest_confusion: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「……至少你说实话了。」', 
      next: 'rooftop_invite' 
    },

    // 天台场景
    rooftop_invite: { 
      type: 'dialogue', 
      art: 'classroom', 
      speaker: '顾言', 
      text: '「出去走走。」', 
      next: 'rooftop' 
    },

    rooftop: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '两人站在天台，风很大。', 
      next: 'gy_question' 
    },

    gy_question: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「你当心理委员是被迫的吧？」', 
      next: 'nod' 
    },

    nod: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '你点头。', 
      next: 'gy_ask2' 
    },

    gy_ask2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「那你为什么还要管那么多？许禾的事，关你屁事。」', 
      next: 'answer' 
    },

    answer: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '「因为……我是心理委员？」', 
      next: 'gy_laugh' 
    },

    gy_laugh: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「所以你就要牺牲自己？」他嗤笑，「你是圣人吗？」', 
      next: 'gy_truth_xuhe' 
    },

    gy_truth_xuhe: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「我告诉你，许禾那种人，你帮不了的。她不想被帮，她只想被可怜。」', 
      next: 'gy_truth_lc' 
    },

    gy_truth_lc: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「林澈也一样。他不是在帮你，他是在证明『你需要他』。」', 
      next: 'gy_core' 
    },

    gy_core: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「你知道最可笑的是什么吗？」', 
      next: 'gy_stare2' 
    },

    gy_stare2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他转过来盯着你。', 
      next: 'gy_final' 
    },

    gy_final: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「你以为你在帮别人，实际上你只是不敢拒绝。」', 
      next: 'choice5' 
    },

    choice5: { 
      type: 'choice', 
      art: 'corridor', 
      prompt: '你……', 
      choices: [
        { 
          text: '「你说够了没有？」', 
          effects: [{ trait: 'autonomy', delta: -3 }], 
          next: 'resist' 
        },
        { 
          text: '沉默，思考', 
          effects: [{ trait: 'acceptance', delta: 5 }], 
          next: 'think' 
        },
        { 
          text: '「那你呢？你为什么这么愤怒？」', 
          effects: [
            { trait: 'ally', delta: 8 },
            { trait: 'autonomy', delta: 5 }
          ], 
          next: 'ask_him' 
        }
      ]
    },

    resist: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「……算了，当我没说。」', 
      next: 'group_broken' 
    },

    think: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '你沉默了很久。风吹过天台，很冷。', 
      next: 'group_broken' 
    },

    // 最深层：顾言的真相
    ask_him: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '顾言僵住了。', 
      next: 'gy_silence' 
    },

    gy_silence: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '沉默很久。', 
      next: 'gy_answer' 
    },

    gy_answer: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「……因为我讨厌看到你们浪费时间。」', 
      next: 'gy_explain2' 
    },

    gy_explain2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「林澈那么聪明，却把精力都花在控制别人上。」', 
      next: 'gy_explain3' 
    },

    gy_explain3: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「许禾明明可以独立，却选择装弱。」', 
      next: 'gy_explain4' 
    },

    gy_explain4: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「你明明可以拒绝，却选择忍受。」', 
      next: 'gy_low' 
    },

    gy_low: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他声音突然低下来。', 
      next: 'gy_hate' 
    },

    gy_hate: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「你们都在浪费自己的天赋。我最恨这种浪费。」', 
      next: 'choice6' 
    },

    choice6: { 
      type: 'choice', 
      art: 'corridor', 
      prompt: '你……', 
      choices: [
        { 
          text: '「为什么？」', 
          effects: [{ trait: 'ally', delta: 5 }], 
          next: 'ask_why' 
        },
        { 
          text: '「这和你有什么关系？」', 
          effects: [{ trait: 'ally', delta: -3 }], 
          next: 'question_relevance' 
        },
        { 
          text: '不说话，等他继续', 
          effects: [
            { trait: 'ally', delta: 8 },
            { trait: 'acceptance', delta: 5 }
          ], 
          next: 'wait' 
        }
      ]
    },

    question_relevance: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「……没什么关系。当我没说。」', 
      next: 'group_broken' 
    },

    ask_why: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '顾言背对着你。', 
      next: 'gy_past' 
    },

    wait: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '顾言背对着你，沉默了很久。', 
      next: 'gy_past' 
    },

    gy_past: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「因为我妈告诉我：浪费天赋的人，不配活着。」', 
      next: 'gy_shake' 
    },

    gy_shake: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他的声音在发抖。', 
      next: 'gy_story' 
    },

    gy_story: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「我初中有个朋友，成绩很好，但他不好好学，就想画画。」', 
      next: 'gy_story2' 
    },

    gy_story2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「后来中考他考砸了，他爸妈说他『愧对天赋』，他就……」', 
      next: 'gy_stop' 
    },

    gy_stop: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '他没说下去。', 
      next: 'gy_hate_self' 
    },

    gy_hate_self: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「所以我最见不得有天赋的人不努力。你们都是。」', 
      next: 'silence2' 
    },

    silence2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '沉默。', 
      next: 'gy_turn2' 
    },

    gy_turn2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '顾言转过来，眼睛红了但没哭。', 
      next: 'gy_self_hate' 
    },

    gy_self_hate: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「但我最恨的其实是我自己。」', 
      next: 'gy_truth_final' 
    },

    gy_truth_final: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「因为我也在浪费——我根本不想学什么理科，我他妈想学文学。」', 
      next: 'gy_truth_final2' 
    },

    gy_truth_final2: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「但我不敢。我怕让我妈失望。」', 
      next: 'final_choice' 
    },

    final_choice: { 
      type: 'choice', 
      art: 'corridor', 
      prompt: '你……', 
      choices: [
        { 
          text: '上前拍他肩膀', 
          effects: [{ trait: 'ally', delta: 5 }], 
          next: 'comfort' 
        },
        { 
          text: '「那你为什么不去做你想做的？」', 
          effects: [
            { trait: 'autonomy', delta: 3 },
            { trait: 'ally', delta: 3 }
          ], 
          next: 'challenge' 
        },
        { 
          text: '「……我理解你。」', 
          effects: [
            { trait: 'ally', delta: 8 },
            { trait: 'acceptance', delta: 5 }
          ], 
          next: 'empathy' 
        },
        { 
          text: '「但这不是你伤害别人的理由。」', 
          effects: [
            { trait: 'boundary', delta: 8 },
            { trait: 'ally', delta: -3 }
          ], 
          next: 'boundary' 
        }
      ]
    },

    comfort: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '顾言没有躲开，但也没说话。风吹过天台。', 
      next: 'after_rooftop' 
    },

    challenge: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「……我不知道。我做不到。」', 
      next: 'after_rooftop' 
    },

    empathy: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「……谢谢。」他的声音很低。', 
      next: 'after_rooftop' 
    },

    boundary: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '顾言', 
      text: '「……你说得对。」他低下头，「对不起。」', 
      next: 'after_rooftop' 
    },

    after_rooftop: { 
      type: 'dialogue', 
      art: 'corridor', 
      speaker: '', 
      text: '两人站了很久，没再说话。铃声响了，该回教室了。', 
      next: 'end' 
    },

    // 其他分支的汇合点
    group_broken: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '晚上躺在床上，小组群里一片死寂。', 
      next: 'inner_final' 
    },

    inner_final: { 
      type: 'dialogue', 
      art: 'night-desk', 
      speaker: '', 
      text: '这个组……已经彻底裂开了。', 
      next: 'end' 
    },

    end: { type: 'end', nextChapter: 'finale' }
  }
};
