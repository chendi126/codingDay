# CodingDay - 1024程序员节特别项目

一个为程序员设计的治愈系互动项目，包含多个创意小游戏和放松工具。

## 🎮 项目介绍

CodingDay 是一个专为程序员打造的互动体验项目，包含以下特色功能：

### 主要功能

1. **逃离代码模式** (`minimal-escape.html`)
   - 模拟终端界面，提供音频引导的放松模式
   - 支持呼吸模式、冥想模式、自然声音等多种治愈方式
   - 完全支持闭眼使用，有音频引导

2. **1024程序员节 Meta编程游戏** (`emm/` 目录)
   - 基于2048的编程主题游戏
   - 支持通过编写JavaScript代码控制游戏
   - 提供丰富的API供玩家编程操作
   - 包含彩蛋和特殊效果

3. **程序员心灵SPA** (`emm/anti-programming.html`)
   - 情绪检测与治愈
   - 深呼吸引导功能
   - 治愈音乐播放
   - 随机惊喜功能

## 🚀 快速开始

### 本地运行

1. 克隆项目到本地
```bash
git clone https://github.com/chendi126/codingDay.git
cd codingDay
```

2. 启动本地服务器（任选一种方式）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

3. 访问项目
- 主页面: http://localhost:8000/minimal-escape.html
- 编程游戏: http://localhost:8000/emm/
- 心灵SPA: http://localhost:8000/emm/anti-programming.html

### 在线访问

直接访问GitHub Pages部署的页面：
- [逃离代码模式](https://chendi126.github.io/codingDay/minimal-escape.html)
- [1024编程游戏](https://chendi126.github.io/codingDay/emm/)
- [程序员心灵SPA](https://chendi126.github.io/codingDay/emm/anti-programming.html)

## 📁 项目结构

```
codingDay/
├── README.md                    # 项目说明文档
├── minimal-escape.html          # 逃离代码模式主页面
└── emm/                        # 1024程序员节游戏目录
    ├── index.html              # Meta编程游戏主页面
    ├── anti-programming.html   # 程序员心灵SPA页面
    ├── 404.html                # 404错误页面
    ├── game.js                 # 主游戏逻辑
    ├── anti-programming.js     # 心灵SPA功能
    ├── easter-eggs.js          # 彩蛋功能
    ├── effects.js              # 音效和视觉特效
    ├── test-api.js             # API测试代码
    └── README.md               # emm目录说明
```

## 🎯 游戏说明

### Meta编程游戏玩法

1. **基本操作**
   - 使用WASD键或方向键控制数字移动
   - 相同数字会合并，目标是达到1024
   - 可以在代码编辑器中编写JavaScript代码控制游戏

2. **API接口**
   - `game.move(direction)` - 移动方向 (up/down/left/right)
   - `game.getValue(row, col)` - 获取指定位置数值
   - `game.getBoard()` - 获取整个游戏板状态
   - `game.getScore()` - 获取当前得分
   - `game.addTile(row, col, value)` - 在指定位置添加数字
   - `game.log(message)` - 输出日志到控制台

3. **特殊功能**
   - 飘动的代码片段动画
   - 达到1024时的庆祝效果
   - 丰富的视觉特效和音效

### 心灵SPA功能

- **情绪检测**: 自动识别用户情绪状态
- **深呼吸**: 引导用户进行深呼吸放松
- **治愈音乐**: 播放舒缓的背景音乐
- **随机惊喜**: 随机触发正能量内容

## 🎨 技术特色

- **纯前端实现**: 无需后端服务，完全基于HTML/CSS/JavaScript
- **响应式设计**: 适配各种屏幕尺寸
- **Web Audio API**: 实现音频引导和音效
- **Canvas动画**: 丰富的视觉效果
- **现代ES6+语法**: 使用最新JavaScript特性

## 🎉 1024程序员节

这个项目特别为1024程序员节设计，旨在：
- 为程序员提供放松和治愈的空间
- 通过游戏化的方式缓解编程压力
- 庆祝程序员的节日，传递正能量
- 展示编程的趣味性和创造性

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT License - 详见LICENSE文件

## 🙏 致谢

感谢所有程序员的辛勤工作，祝1024程序员节快乐！

---

**Happy 1024 Day! 程序员节快乐！** 🎊💻🎉