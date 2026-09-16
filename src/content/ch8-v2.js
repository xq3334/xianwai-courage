// 第八章：林澈的摊牌
// 格式A版本，兼容现有引擎

export const ch8 = {
  id: 'ch8',
  title: '第八章：林澈的摊牌',
  start: 'opening',
  nodes: {
    opening: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【十二月初，小组作业答辩前夕】\n\n小组作业即将答辩，四人最后一次讨论。',
      next: 'atmosphere_better'
    },

    atmosphere_better: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '气氛比之前好多了，但仍然微妙。林澈主持讨论，但会征求意见。许禾能说出自己的想法了，虽然还是有点怕。顾言不再阴阳怪气，但仍然犀利。',
      next: 'inner_like_team'
    },

    inner_like_team: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（我们终于像个团队了。）',
      next: 'discussion_ends'
    },

    discussion_ends: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「那就这样，明天答辩。」',
      next: 'guyan_thanks'
    },

    guyan_thanks: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「辛苦了。」',
      next: 'xuhe_thanks'
    },

    xuhe_thanks: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「谢谢大家……」',
      next: 'inner_best_moment'
    },

    inner_best_moment: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '（这可能是这学期最好的时刻。）',
      next: 'defense_day'
    },

    defense_day: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【答辩当天】\n\n四人上台，顺利答辩。',
      next: 'teacher_comments'
    },

    teacher_comments: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '老师',
      text: '「整体不错，但能看出来……团队磨合得比较痛苦。」',
      next: 'teacher_comments_2'
    },

    teacher_comments_2: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '老师',
      text: '「不过最后的呈现，确实有你们自己的思考。」',
      next: 'score'
    },

    score: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '老师',
      text: '「分数：85分。」',
      next: 'after_defense'
    },

    after_defense: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '下台后——',
      next: 'linche_disappointed'
    },

    linche_disappointed: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '看起来有点失落：「我以为能到90……」',
      next: 'guyan_enough'
    },

    guyan_enough: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「够了，这个组能活到现在就不错了。」',
      next: 'xuhe_blames_self'
    },

    xuhe_blames_self: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '小声说：「都怪我拖后腿……」',
      next: 'you_comfort'
    },

    you_comfort: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"不是谁拖后腿。我们都尽力了。"',
      next: 'friday_afternoon'
    },

    friday_afternoon: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【周五下午，放学后】\n\n林澈把你拉到天台。',
      next: 'linche_wants_talk'
    },

    linche_wants_talk: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我想跟你说件事。」',
      next: 'linche_serious'
    },

    linche_serious: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '他的表情很认真，甚至有点紧张。',
      next: 'linche_admits'
    },

    linche_admits: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我知道……这学期我做了很多让你不舒服的事。」',
      next: 'linche_lists'
    },

    linche_lists: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「团建帮你报名，作业替你做决定，还有……控制你。」',
      next: 'silence'
    },

    silence: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '沉默。',
      next: 'linche_thought_helping'
    },

    linche_thought_helping: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我以为我是在帮你。」',
      next: 'linche_guyan_right'
    },

    linche_guyan_right: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「但顾言说得对——我不是在帮你，我是在证明你需要我。」',
      next: 'linche_voice_shakes'
    },

    linche_voice_shakes: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '他声音有点抖：「因为我害怕。」',
      next: 'you_ask_afraid'
    },

    you_ask_afraid: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"害怕什么？"',
      next: 'linche_fear'
    },

    linche_fear: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「害怕你不需要我了，就会离开我。」',
      next: 'linche_turns_away'
    },

    linche_turns_away: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '林澈背过身：',
      next: 'linche_backstory'
    },

    linche_backstory: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我从小就是这样。」',
      next: 'linche_parents_divorced'
    },

    linche_parents_divorced: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我爸妈离婚的时候，我妈跟我说："你要乖，要懂事，不然妈妈就不要你了。"」',
      next: 'linche_since_then'
    },

    linche_since_then: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「从那以后，我就特别怕被抛弃。」',
      next: 'linche_pattern'
    },

    linche_pattern: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「所以我拼命对别人好，让自己变得"有用"。」',
      next: 'linche_reason'
    },

    linche_reason: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「因为只要我有用，别人就不会离开我。」',
      next: 'linche_turns_back'
    },

    linche_turns_back: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '他转过来看着你：',
      next: 'linche_panicked'
    },

    linche_panicked: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「但你开始设置边界的时候，我慌了。」',
      next: 'linche_thought_abandon'
    },

    linche_thought_abandon: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我以为你要抛弃我。」',
      next: 'linche_tried_harder'
    },

    linche_tried_harder: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「所以我更拼命地"帮"你，想让你继续依赖我。」',
      next: 'linche_conflicted'
    },

    linche_conflicted: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「但你越来越独立。这让我既高兴，又害怕。」',
      next: 'choice_respond'
    },

    choice_respond: {
      type: 'choice',
      art: 'classroom',
      prompt: '你的回应：',
      choices: [
        { text: '"我不会离开你。"', next: 'comfort', effects: [{ trait: 'ally', delta: 2 }] },
        { text: '"但你这样……我确实想离开。"', next: 'honest', effects: [{ trait: 'autonomy', delta: 2 }, { trait: 'boundary', delta: 2 }] },
        { text: '"你不需要让自己那么有用。"', next: 'core_truth', effects: [{ trait: 'ally', delta: 3 }, { trait: 'acceptance', delta: 2 }] },
        { text: '沉默，等他继续', next: 'wait', effects: [{ trait: 'boundary', delta: 1 }] }
      ]
    },

    comfort: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我不会离开你。"',
      next: 'linche_relieved'
    },

    linche_relieved: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '松了口气：「真的？」',
      next: 'you_nod'
    },

    you_nod: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你点头。',
      next: 'linche_hugs'
    },

    linche_hugs: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '林澈笑了，但你知道——他的模式还没真正改变。',
      next: 'end_semester'
    },

    honest: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"但你这样……我确实想离开。"',
      next: 'linche_hurt'
    },

    linche_hurt: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '愣住了，眼神里有受伤。',
      next: 'you_continue_honest'
    },

    you_continue_honest: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"不是因为你不够好，而是因为你不让我做我自己。"',
      next: 'linche_understands'
    },

    linche_understands: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '低下头，沉默了很久：「……我明白了。」',
      next: 'linche_will_try'
    },

    linche_will_try: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「我会试着……放手。」',
      next: 'end_semester'
    },

    core_truth: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"你不需要让自己那么有用。"',
      next: 'linche_cries_sudden'
    },

    linche_cries_sudden: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '愣住，眼泪突然掉下来。',
      next: 'linche_questions_value'
    },

    linche_questions_value: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「但如果我没用了……我还有什么价值？」',
      next: 'you_answer_value'
    },

    you_answer_value: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"你的价值不在于你能帮我做什么。"',
      next: 'you_continue_value'
    },

    you_continue_value: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"在于你是林澈。"',
      next: 'you_examples'
    },

    you_examples: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"那个会在我考砸时陪我吃宵夜的林澈。那个会认真听我说话的林澈。"',
      next: 'you_not_controller'
    },

    you_not_controller: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"不是那个替我做决定的林澈。"',
      next: 'silence_2'
    },

    silence_2: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '沉默。',
      next: 'linche_cries'
    },

    linche_cries: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '林澈哭了，很久没说话。',
      next: 'linche_will_try_2'
    },

    linche_will_try_2: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '最后他说：「……我试试。」',
      next: 'linche_less_useful'
    },

    linche_less_useful: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「试着做一个"没那么有用"的林澈。」',
      next: 'you_pat_shoulder'
    },

    you_pat_shoulder: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你拍拍他肩膀："你本来就够好了。"',
      next: 'end_semester'
    },

    wait: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你沉默地等他继续。',
      next: 'linche_continues'
    },

    linche_continues: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '林澈',
      text: '「……对不起。我会改的。」',
      next: 'end_semester'
    },

    end_semester: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【周日，图书馆】\n\n你在图书馆，顾言坐到对面。',
      next: 'guyan_announcement'
    },

    guyan_announcement: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「我跟我妈说了。」',
      next: 'you_ask_what'
    },

    you_ask_what: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你愣住："说什么？"',
      next: 'guyan_switch_liberal'
    },

    guyan_switch_liberal: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「我想转文科。」',
      next: 'you_shocked'
    },

    you_shocked: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你震惊："她同意了？"',
      next: 'guyan_no'
    },

    guyan_no: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '苦笑：「没有。她说我疯了。」',
      next: 'guyan_but_said'
    },

    guyan_but_said: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「但我说了。这就够了。」',
      next: 'silence_3'
    },

    silence_3: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '沉默。',
      next: 'guyan_realization'
    },

    guyan_realization: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「我以前觉得，说了没用，不如不说。」',
      next: 'guyan_learned'
    },

    guyan_learned: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「但你让我明白——说不说是我的课题，听不听是她的课题。」',
      next: 'guyan_no_longer_holding'
    },

    guyan_no_longer_holding: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「至少我不再憋着了。」',
      next: 'guyan_thanks_you'
    },

    guyan_thanks_you: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '看着你：「谢谢你。」',
      next: 'you_did_nothing'
    },

    you_did_nothing: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你："我什么都没做。"',
      next: 'guyan_you_did'
    },

    guyan_you_did: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '顾言',
      text: '「你做了。你让我看到，改变是可能的。」',
      next: 'christmas_eve'
    },

    christmas_eve: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '【圣诞节前，放学路上】\n\n许禾追上你。',
      next: 'xuhe_calls'
    },

    xuhe_calls: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「等一下！」',
      next: 'xuhe_breathless'
    },

    xuhe_breathless: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '她气喘吁吁，看起来鼓起了很大勇气。',
      next: 'xuhe_apologizes'
    },

    xuhe_apologizes: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「我……我想跟你道歉。」',
      next: 'xuhe_rumor_apology'
    },

    xuhe_rumor_apology: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「上次造谣的事，是我不对。」',
      next: 'xuhe_was_angry'
    },

    xuhe_was_angry: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「我当时太生气了，觉得你抛弃了我。」',
      next: 'xuhe_realized'
    },

    xuhe_realized: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「但后来我想明白了……你没有抛弃我。」',
      next: 'xuhe_understanding'
    },

    xuhe_understanding: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「你只是……不想替我活。」',
      next: 'xuhe_lowers_head'
    },

    xuhe_lowers_head: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '她低下头：',
      next: 'xuhe_talked_to_girls'
    },

    xuhe_talked_to_girls: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「我也去找那几个女生谈了。」',
      next: 'xuhe_their_feedback'
    },

    xuhe_their_feedback: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「她们说……她们觉得我太粘人了，有点窒息。」',
      next: 'xuhe_hurt_but'
    },

    xuhe_hurt_but: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「听到的时候，我很难过。」',
      next: 'xuhe_at_least'
    },

    xuhe_at_least: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '「但至少……我知道原因了。」',
      next: 'choice_respond_xuhe'
    },

    choice_respond_xuhe: {
      type: 'choice',
      art: 'classroom',
      prompt: '你的回应：',
      choices: [
        { text: '"我接受你的道歉。"', next: 'accept_apology', effects: [{ trait: 'repair', delta: 2 }, { trait: 'ally', delta: 1 }] },
        { text: '"你做得很好。"', next: 'affirm_growth', effects: [{ trait: 'ally', delta: 2 }, { trait: 'acceptance', delta: 1 }] },
        { text: '"以后不要再这样了。"', next: 'warn', effects: [{ trait: 'boundary', delta: 2 }] },
        { text: '沉默，只是点头', next: 'nod_silently', effects: [{ trait: 'boundary', delta: 1 }] }
      ]
    },

    accept_apology: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"我接受你的道歉。"',
      next: 'xuhe_relieved'
    },

    xuhe_relieved: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '松了口气：「谢谢你……」',
      next: 'chapter_end'
    },

    affirm_growth: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"你做得很好。"',
      next: 'xuhe_eyes_light'
    },

    xuhe_eyes_light: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '眼睛亮了：「真的吗？」',
      next: 'you_confirm'
    },

    you_confirm: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你点头："真的。你在成长。"',
      next: 'xuhe_smiles'
    },

    xuhe_smiles: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '许禾第一次露出了真正的笑容。',
      next: 'chapter_end'
    },

    warn: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '"以后不要再这样了。"',
      next: 'xuhe_nods'
    },

    xuhe_nods: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '许禾',
      text: '点头：「我知道了。」',
      next: 'chapter_end'
    },

    nod_silently: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '你沉默地点了点头。',
      next: 'xuhe_understands'
    },

    xuhe_understands: {
      type: 'dialogue',
      art: 'classroom',
      speaker: '',
      text: '许禾似乎明白了什么，转身离开。',
      next: 'chapter_end'
    },

    chapter_end: {
      type: 'end',
      nextChapter: 'finale'
    }
  }
};
