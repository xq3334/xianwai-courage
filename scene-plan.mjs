// 场景锚点表：按剧情时间线和情绪给每个节点分配背景图
//
// 工作方式：锚点标记"从这个节点开始换场景"，之后沿 next / choices 图遍历，
// 后续节点继承该场景，直到遇到下一个锚点。这样分支节点（在文件里往往堆在
// 末尾）也能拿到正确的场景，不必逐个手写。
//
// defaultScene 是该章入口场景，锚点之前的节点用它。
//
// overrides 是单节点例外：只改这一个节点，不向后传播，下一个节点回到锚点
// 给的场景。用于 clarity / entangled 这两张意象图——它们表现的是一瞬间的
// 心理状态，不是主角走进了另一个房间，所以只能覆盖一个节点。
//
// 不要手改章节文件里的 art 字段，apply-scene-plan.mjs 一跑就会覆盖回来。
// 所有场景归属都写在这张表里。

export const SCENE_PLAN = {
  prologue: {
    defaultScene: 'classroom-morning',
    anchors: {
      start: 'classroom-morning',
      linche_pull: 'corridor',
      canteen: 'hall',
      class: 'classroom-afternoon',
      night: 'bedroom-night'
    }
  },

  ch1: {
    defaultScene: 'classroom-day',
    anchors: {
      start: 'classroom-day',
      corridor: 'classroom-dusk',
      night2: 'bedroom-night'
    }
  },

  ch2: {
    defaultScene: 'hall',
    anchors: {
      start: 'hall',
      week_later: 'bedroom-night'
    }
  },

  ch3: {
    defaultScene: 'classroom-afternoon',
    anchors: {
      start: 'classroom-afternoon',
      chase_xuhe: 'corridor',
      chase_linche: 'corridor',
      leave_all: 'corridor',
      stay_with_gy: 'classroom-afternoon',
      rooftop_invite: 'rooftop-day',
      rooftop: 'rooftop-day',
      after_rooftop: 'classroom-dusk',
      group_broken: 'bedroom-night'
    }
  },

  ch4: {
    defaultScene: 'classroom-day',
    anchors: {
      opening: 'classroom-day',
      first_practice: 'classroom-afternoon',
      sunday_night: 'home-dining',
      escape_table: 'bedroom-night',
      next_day_counselor: 'office'
    },
    overrides: {
      inner_hope: 'clarity',
      inner_cant_say: 'entangled'
    }
  },

  ch5: {
    defaultScene: 'office',
    anchors: {
      opening: 'office',
      days_pass: 'classroom-afternoon',
      week_passes: 'bedroom-night'
    },
    overrides: {
      inner_hit: 'entangled',
      inner_exhausted: 'entangled'
    }
  },

  ch6: {
    defaultScene: 'classroom-morning',
    anchors: {
      opening: 'classroom-morning',
      group_discussion_time: 'classroom-morning',
      lunch_rooftop: 'rooftop-day',
      friday_meeting: 'classroom-afternoon',
      after_class: 'classroom-dusk',
      sunday_night: 'bedroom-night'
    },
    overrides: {
      inner_divided: 'entangled',
      inner_real_support: 'clarity',
      shock: 'entangled'
    }
  },

  ch7: {
    defaultScene: 'office',
    anchors: {
      opening: 'office',
      leave_office: 'corridor',
      guyan_waiting: 'stairwell',
      find_xuhe: 'classroom-day',
      go_to_rooftop: 'rooftop-sunset',
      days_later: 'office',
      exam_week: 'classroom-empty'
    },
    overrides: {
      feel_stares: 'entangled',
      inner_tired: 'entangled',
      inner_cracks_but_close: 'clarity'
    }
  },

  ch8: {
    defaultScene: 'classroom-day',
    anchors: {
      opening: 'classroom-day',
      defense_day: 'classroom-day',
      friday_afternoon: 'rooftop-sunset',
      end_semester: 'library',
      christmas_eve: 'school-gate'
    }
  },

  finale: {
    defaultScene: 'classroom-dusk',
    anchors: {},
    overrides: {
      inner2: 'clarity',
      inner4: 'entangled'
    }
  }
};
