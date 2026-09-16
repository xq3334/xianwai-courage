// 章节索引 v2（基于新大纲）
import { prologue } from './ch0-prologue-v2.js';
import { chapter1 } from './ch1-v2.js';
import { chapter2 } from './ch2-v2.js';
import { chapter3 } from './ch3-v2.js';
import { ch4 } from './ch4-v2.js';
import { ch5 } from './ch5-v2.js';
import { ch6 } from './ch6-v2.js';
import { ch7 } from './ch7-v2.js';
import { ch8 } from './ch8-v2.js';
import { finale } from './ch-finale-v2.js';

export const chapters = {
  prologue,
  ch1: chapter1,
  ch2: chapter2,
  ch3: chapter3,
  ch4,
  ch5,
  ch6,
  ch7,
  ch8,
  finale
};

export const chapterList = [
  { id: 'prologue', title: '序章：意外的任命', chapter: prologue },
  { id: 'ch1', title: '第一章：林澈的边界', chapter: chapter1 },
  { id: 'ch2', title: '第二章：许禾的沼泽', chapter: chapter2 },
  { id: 'ch3', title: '第三章：顾言的刺', chapter: chapter3 },
  { id: 'ch4', title: '第四章：重建的尝试', chapter: ch4 },
  { id: 'ch5', title: '第五章：沈老师的课题', chapter: ch5 },
  { id: 'ch6', title: '第六章：同盟的瓦解', chapter: ch6 },
  { id: 'ch7', title: '第七章：信任的崩塌与重建', chapter: ch7 },
  { id: 'ch8', title: '第八章：林澈的摊牌', chapter: ch8 },
  { id: 'finale', title: '终章：学期末的选择', chapter: finale }
];

export { chapterList as chapterOrder };
