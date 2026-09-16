// 第七章：信任的崩塌与重建
// 格式A版本，兼容现有引擎

export const ch7 = {
  id: 'ch7',
  title: '第七章：信任的崩塌与重建',
  start: 'opening',
  nodes: {
    opening: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【周一，被叫到办公室】',
      next: 'teacher_calls'
    },

    teacher_calls: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「有同学反映，你泄露了心理问卷的内容。」',
      next: 'serious_problem'
    },

    serious_problem: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「这是很严重的问题。」',
      next: 'you_explain'
    },

    you_explain: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你解释："我没有。"',
      next: 'teacher_questions'
    },

    teacher_questions: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「那为什么会有这个传言？」',
      next: 'you_accuse'
    },

    you_accuse: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你："是许禾造谣。"',
      next: 'teacher_evidence'
    },

    teacher_evidence: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '皱眉：「你有证据吗？」',
      next: 'choice_evidence'
    },

    choice_evidence: {
      type: 'choice',
      art: 'classroom',
      prompt: '你的回应：',
      choices: [
        { text: '拿出聊天截图', next: 'show_evidence', effects: [{ trait: 'action', delta: 2 }] },
        { text: '"我没有证据，但我没做过。"', next: 'no_evidence', effects: [{ trait: 'autonomy', delta: 1 }] },
        { text: '"反正您也不信，随便吧。"', next: 'give_up', effects: [{ trait: 'autonomy', delta: -2 }, { trait: 'acceptance', delta: -2 }] }
      ]
    },

    show_evidence: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你拿出手机，给班主任看截图。',
      next: 'teacher_reads'
    },

    teacher_reads: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '班主任仔细看了看。',
      next: 'teacher_not_enough'
    },

    teacher_not_enough: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「这只能证明你没跟许禾说，不能证明你没跟别人说。」',
      next: 'adjustment'
    },

    no_evidence: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我没有证据，但我没做过。"',
      next: 'teacher_sigh'
    },

    teacher_sigh: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '叹气：「没有证据，我也很难处理。」',
      next: 'adjustment'
    },

    give_up: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"反正您也不信，随便吧。"',
      next: 'teacher_angry'
    },

    teacher_angry: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '脸色一沉：「什么态度？」',
      next: 'immediate_suspension'
    },

    immediate_suspension: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「从今天开始，心理委员由班长接替。你回去好好反思。」',
      next: 'leave_office'
    },

    adjustment: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「这样，接下来的问卷由班长负责。你先休息一下。」',
      next: 'you_suspended'
    },

    you_suspended: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你："所以我被停职了？"',
      next: 'teacher_adjustment'
    },

    teacher_adjustment: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '班主任',
      text: '「不是停职，是……调整。」',
      next: 'leave_office'
    },

    leave_office: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '走出办公室。',
      next: 'feel_stares'
    },

    feel_stares: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（你感觉所有人都在看你。走廊里有人窃窃私语。）',
      next: 'see_xuhe'
    },

    see_xuhe: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '许禾远远看了你一眼，立刻低下头。',
      next: 'guyan_waiting'
    },

    guyan_waiting: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '顾言在楼梯口等你。「听说了。」',
      next: 'you_silent'
    },

    you_silent: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你没说话。',
      next: 'guyan_offers_help'
    },

    guyan_offers_help: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「要不要搞清楚到底是谁传的？」',
      next: 'you_puzzled'
    },

    you_puzzled: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你愣住："你有办法？"',
      next: 'guyan_connections'
    },

    guyan_connections: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「我认识信息部的人。」',
      next: 'choice_investigate'
    },

    choice_investigate: {
      type: 'choice',
      art: 'classroom',
      prompt: '你的决定：',
      choices: [
        { text: '"好，帮我查。"', next: 'counterattack', effects: [{ trait: 'action', delta: 2 }, { trait: 'boundary', delta: 1 }] },
        { text: '"算了，清者自清。"', next: 'let_go', effects: [{ trait: 'acceptance', delta: 2 }] },
        { text: '"我自己去问许禾。"', next: 'confront_xuhe', effects: [{ trait: 'autonomy', delta: 2 }, { trait: 'action', delta: 1 }] }
      ]
    },

    counterattack: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"好，帮我查。"',
      next: 'guyan_nods'
    },

    guyan_nods: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '点头：「给我一天时间。」',
      next: 'days_later'
    },

    let_go: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"算了，清者自清。"',
      next: 'guyan_frown'
    },

    guyan_frown: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '皱眉：「你确定？谣言不会自己消失。」',
      next: 'inner_tired'
    },

    inner_tired: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（我太累了。我不想再争了。）',
      next: 'days_later'
    },

    confront_xuhe: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我自己去问许禾。"',
      next: 'guyan_accompany'
    },

    guyan_accompany: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「需要我陪你吗？」',
      next: 'choice_alone_or_together'
    },

    choice_alone_or_together: {
      type: 'choice',
      art: 'classroom',
      prompt: '你的选择：',
      choices: [
        { text: '"不用，我自己去。"', next: 'alone_confront', effects: [{ trait: 'autonomy', delta: 2 }] },
        { text: '"好，一起去。"', next: 'together_confront', effects: [{ trait: 'ally', delta: 1 }] }
      ]
    },

    alone_confront: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"不用，我自己去。"',
      next: 'guyan_wait'
    },

    guyan_wait: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「行。我在天台等你。」',
      next: 'find_xuhe'
    },

    together_confront: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"好，一起去。"',
      next: 'find_xuhe'
    },

    find_xuhe: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你在教室后排堵住许禾。\n\n"我们谈谈。"',
      next: 'xuhe_scared'
    },

    xuhe_scared: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '缩了一下：「我……我要去吃饭……」',
      next: 'you_direct'
    },

    you_direct: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"你到底为什么要这么做？"',
      next: 'xuhe_denies'
    },

    xuhe_denies: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '眼泪掉下来：「我没有……我真的只是随口说的……」',
      next: 'xuhe_excuse'
    },

    xuhe_excuse: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「我不知道会传成这样……」',
      next: 'you_know'
    },

    you_know: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"你知道。你就是故意的。"',
      next: 'xuhe_breaks'
    },

    xuhe_breaks: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '突然爆发：「对！我就是故意的！」',
      next: 'xuhe_accusation'
    },

    xuhe_accusation: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「你明明答应帮我的！结果你说放弃就放弃！」',
      next: 'xuhe_pain'
    },

    xuhe_pain: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「你知道我一个人面对她们有多难吗？」',
      next: 'xuhe_why'
    },

    xuhe_why: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「你凭什么突然就不管我了？」',
      next: 'silence'
    },

    silence: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '沉默。',
      next: 'you_ask'
    },

    you_ask: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"所以你就要毁掉我？"',
      next: 'xuhe_not_meant'
    },

    xuhe_not_meant: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「我没想毁掉你……我只是……」',
      next: 'xuhe_wanted_you_to_know'
    },

    xuhe_wanted_you_to_know: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「我只是想让你知道，抛弃别人是什么感觉。」',
      next: 'inner_boundary_is_abandon'
    },

    inner_boundary_is_abandon: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（原来在她眼里，设置边界就是抛弃。）',
      next: 'choice_final_word'
    },

    choice_final_word: {
      type: 'choice',
      art: 'classroom',
      prompt: '你的回应：',
      choices: [
        { text: '"我从来没有抛弃你。"', next: 'explain', effects: [{ trait: 'repair', delta: 1 }] },
        { text: '"那现在你满意了？"', next: 'sarcastic', effects: [{ trait: 'boundary', delta: 2 }] },
        { text: '"我们结束了。"', next: 'end_it', effects: [{ trait: 'boundary', delta: 3 }, { trait: 'ally', delta: -2 }] },
        { text: '沉默转身离开', next: 'silent_leave', effects: [{ trait: 'autonomy', delta: 1 }] }
      ]
    },

    explain: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我从来没有抛弃你。"',
      next: 'xuhe_but'
    },

    xuhe_but: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「可是……」',
      next: 'no_response'
    },

    no_response: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '她没有再说话。你转身离开。',
      next: 'go_to_rooftop'
    },

    sarcastic: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"那现在你满意了？"',
      next: 'xuhe_cries_more'
    },

    xuhe_cries_more: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '许禾哭得更厉害了。你转身离开。',
      next: 'go_to_rooftop'
    },

    end_it: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我们结束了。"',
      next: 'xuhe_stunned'
    },

    xuhe_stunned: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '许禾愣住了。你转身离开，没有回头。',
      next: 'go_to_rooftop'
    },

    silent_leave: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你沉默地转身离开。',
      next: 'go_to_rooftop'
    },

    go_to_rooftop: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【天台】\n\n顾言坐在天台，风很大。你坐到他旁边。',
      next: 'guyan_water_bottle'
    },

    guyan_water_bottle: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '顾言递给你一瓶水，不说话，只是陪着。',
      next: 'long_silence'
    },

    long_silence: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '过了很久，你开口：',
      next: 'choice_what_to_say'
    },

    choice_what_to_say: {
      type: 'choice',
      art: 'classroom',
      prompt: '你说：',
      choices: [
        { text: '"我做错了吗？"', next: 'ask_if_wrong', effects: [{ trait: 'acceptance', delta: 1 }] },
        { text: '"我好累。"', next: 'express_tired', effects: [{ trait: 'acceptance', delta: 2 }] },
        { text: '沉默，靠在栏杆上', next: 'stay_silent', effects: [{ trait: 'autonomy', delta: 1 }] }
      ]
    },

    ask_if_wrong: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我做错了吗？"',
      next: 'guyan_no'
    },

    guyan_no: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「没有。」',
      next: 'guyan_reality'
    },

    guyan_reality: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「但你要接受一个现实：不是每个人都想成长。」',
      next: 'guyan_xuhe_doesnt_want'
    },

    guyan_xuhe_doesnt_want: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「许禾不想独立，她只想被照顾。」',
      next: 'guyan_betrayal'
    },

    guyan_betrayal: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「而你拒绝继续照顾她，在她眼里就是背叛。」',
      next: 'days_later'
    },

    express_tired: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我好累。"',
      next: 'guyan_tired_is_right'
    },

    guyan_tired_is_right: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「累就对了。」',
      next: 'guyan_change_is_hard'
    },

    guyan_change_is_hard: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「改变是最累的事。」',
      next: 'guyan_breaking_pattern'
    },

    guyan_breaking_pattern: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「你在打破旧的模式，但新的还没建立起来。」',
      next: 'guyan_gap_period'
    },

    guyan_gap_period: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「这个空档期，会很难。」',
      next: 'guyan_looks_far'
    },

    guyan_looks_far: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '他看着远处：「但熬过去了，就自由了。」',
      next: 'you_ask_guyan'
    },

    you_ask_guyan: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你突然问："你熬过去了吗？"',
      next: 'guyan_bitter_smile'
    },

    guyan_bitter_smile: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '愣住，然后苦笑：「没有。」',
      next: 'guyan_still_struggling'
    },

    guyan_still_struggling: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「我还在挣扎。」',
      next: 'guyan_mom_wants_science'
    },

    guyan_mom_wants_science: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「我妈还是想让我学理科，我还是不敢反抗。」',
      next: 'guyan_angry_reason'
    },

    guyan_angry_reason: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「所以我才会这么愤怒——我在你们身上看到了我自己的懦弱。」',
      next: 'silence_2'
    },

    silence_2: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '沉默。',
      next: 'you_suggest_together'
    },

    you_suggest_together: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你："那我们一起熬吧。"',
      next: 'guyan_smiles'
    },

    guyan_smiles: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '顾言看着你，慢慢笑了：「……行。」',
      next: 'days_later'
    },

    stay_silent: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你沉默地靠在栏杆上。顾言也不说话，只是陪着你。',
      next: 'days_later'
    },

    days_later: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【周四，沈老师的第二次谈话】',
      next: 'teacher_shen_heard'
    },

    teacher_shen_heard: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「听说你遇到了麻烦。」',
      next: 'you_nod'
    },

    you_nod: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你点头。',
      next: 'teacher_asks_fault'
    },

    teacher_asks_fault: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「你觉得是你的错吗？」',
      next: 'you_shake_head'
    },

    you_shake_head: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你摇头："但我不知道该怎么处理。"',
      next: 'teacher_praise'
    },

    teacher_praise: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「你已经处理得很好了。」',
      next: 'teacher_explains'
    },

    teacher_explains: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「你设置了边界，坚持了真相，也承受了后果。」',
      next: 'teacher_self_reliance'
    },

    teacher_self_reliance: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '沈老师',
      text: '「这就是"自立"的代价。」',
      next: 'unlock_card'
    },

    unlock_card: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【解锁知识卡片：自立的勇气】',
      next: 'exam_week'
    },

    exam_week: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【期中考试周】\n\n考试结束那天，你在整理东西。',
      next: 'note_from_guyan'
    },

    note_from_guyan: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '桌上多了一张便利贴："加油。——顾言"',
      next: 'you_smile'
    },

    you_smile: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你愣住，然后笑了。',
      next: 'candy_from_linche'
    },

    candy_from_linche: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '桌上还有一包糖，没留名字。但你认得那是林澈常吃的牌子。',
      next: 'inner_cracks_but_close'
    },

    inner_cracks_but_close: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（也许，真正的关系，就是即使有裂痕，也还愿意靠近。）',
      next: 'chapter_end'
    },

    chapter_end: {
      type: 'end',
      nextChapter: 'ch8'
    }
  }
};
