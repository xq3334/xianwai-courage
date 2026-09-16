# 《线外》交互式文字游戏

一个关于高中生人际关系成长的互动叙事游戏，探讨边界、自主性、关系修复等心理成长主题。

## 🎮 游戏简介

你是一名高中生，被意外任命为心理委员。在小组作业中，你需要面对三个性格迥异的组员：
- **林澈**：好友，习惯替你做决定
- **许禾**：软弱，依赖情绪勒索
- **顾言**：刺头，用攻击保护自己

你的每个选择都会影响隐藏的六个特质值，最终决定你的成长结局。

## 🎯 核心特质系统

游戏通过六个隐藏特质追踪玩家的心理成长：

| 特质 | 含义 | 极端表现 |
|-----|------|---------|
| `autonomy` | 自主选择 vs 依赖认可 | 自主/讨好 |
| `boundary` | 边界清晰 vs 过度承担/逃避 | 清晰/模糊 |
| `ally` | 同伴视角 vs 竞争视角 | 合作/对抗 |
| `acceptance` | 接受不完美 | 接纳/苛责 |
| `repair` | 冲突后修复能力 | 修复/逃避 |
| `action` | 把思考转化为行动 | 行动/拖延 |

## 📖 章节结构

- **序章**：意外的任命
- **第一章**：林澈的边界
- **第二章**：许禾的沼泽
- **第三章**：顾言的刺
- **第四章**：重建的尝试
- **第五章**：沈老师的课题
- **第六章**：同盟的瓦解
- **第七章**：信任的崩塌与重建
- **第八章**：林澈的摊牌
- **终章**：学期末的选择（3个结局）

## 🚀 快速开始

### 在线体验

访问 GitHub Pages：https://xq3334.github.io/xianwai-courage

### 本地运行

1. 克隆仓库
```bash
git clone https://github.com/xq3334/xianwai-courage.git
cd xianwai-courage
```

2. 直接用浏览器打开
```bash
# Windows
start index.html

# Mac/Linux
open index.html
```

无需任何构建步骤，游戏使用纯静态ES6模块。

## 🛠️ 技术架构

- **纯静态ES6模块** - 无构建工具，直接浏览器运行
- **localStorage存档** - 自动保存进度
- **模块化内容管理** - 每章独立文件，易于扩展

### 项目结构

```
xianwai-courage/
├── index.html              # 入口文件
├── src/
│   ├── engine.js           # 游戏引擎核心
│   ├── state.js            # 状态管理（特质、存档）
│   ├── ui/
│   │   ├── dialogue.js     # 对话渲染
│   │   ├── choice.js       # 选择渲染
│   │   └── menu.js         # 菜单系统
│   ├── content/
│   │   ├── chapters-v2.js  # 章节索引
│   │   ├── ch0-prologue-v2.js
│   │   ├── ch1-v2.js
│   │   ├── ...
│   │   └── ch-finale-v2.js
│   └── assets/
│       ├── art/            # 背景图片
│       └── audio/          # 音效（可选）
├── README.md
└── DEVELOPMENT.md          # 开发文档
```

## 📝 开发说明

查看 [DEVELOPMENT.md](./DEVELOPMENT.md) 获取详细的开发指南，包括：
- 如何添加新章节
- 节点类型说明
- 选择与特质系统
- 调试技巧
- 扩展剧情指南

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🎨 致谢

- 游戏设计与编剧：[Your Name]
- 技术实现：Claude (Cursor IDE)
