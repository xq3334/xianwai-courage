// 场景锚点表：按剧情时间线和情绪给每个节点分配背景图
//
// 工作方式：锚点标记"从这个节点开始换场景"，之后沿 next / choices 图遍历，
// 后续节点继承该场景，直到遇到下一个锚点。这样分支节点（在文件里往往堆在
// 末尾）也能拿到正确的场景，不必逐个手写。
//
// defaultScene 是该章入口场景，锚点之前的节点用它。

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
    }
  },

  ch5: {
    defaultScene: 'office',
    anchors: {
      opening: 'office',
      days_pass: 'classroom-afternoon',
      week_passes: 'bedroom-night'
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
    anchors: {}
  }
};
