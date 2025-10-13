# Sweet Hut Cash Counter

SWEET HUT 专用越南盾点钞 Web App，为 iPhone 15 Pro 触控优化。支持九种固定面额录入、实时合计、可选本地恢复和基础离线能力，可直接添加到主屏幕当作 PWA 使用。

## 快速开始

```bash
npm install
npm run dev    # http://localhost:5173
```

可执行 `npm run build` 进行生产构建，`npm run preview` 在本地预览构建结果。

### 主要脚本
- `npm run dev`：启动 Vite 开发服务器。
- `npm run build`：先运行 `tsc` 类型检查，再输出生产包。
- `npm run preview`：预览生产包，适合在真实设备上调试。
- `npm run lint`：使用 ESLint 检查 TypeScript/React 代码。

## 项目结构
```
.
├── index.html                 # 入口 HTML + viewport/manifest 配置
├── public/
│   ├── icons/                 # PWA 图标 (192/512px)
│   ├── manifest.webmanifest   # 应用清单
│   └── service-worker.js      # 简易静态缓存 SW
├── src/
│   ├── App.tsx                # 主界面与状态逻辑
│   ├── components/            # 功能组件（面额宫格、编辑面板、重置条等）
│   ├── hooks/useAnimatedNumber.ts # 总金额滚动动画
│   ├── lib/                   # 类型定义与货币格式化工具
│   ├── index.css              # Tailwind 基础与全局样式
│   └── main.tsx               # React 入口 + SW 注册
├── tailwind.config.js         # 主题色彩、动效配置
└── vite.config.ts             # Vite + React SWC 配置
```

## 功能亮点
- 九种越南盾面额快速录入，仅显示已添加的面额项。
- 底部弹出式张数面板，提供步进器与直接输入两种模式，支持长按连加/连减。
- 实时小计与总额滚动动画，固定使用越南语 ₫ 货币格式。
- 重置操作带确认及 “本次清空不再提示” 记忆逻辑，状态保存在 `localStorage`，可恢复误刷新。
- 底部语言切换（默认 Tiếng Việt，可切换至 简体中文），便于前台同事快速改用熟悉语言。
- 基础 PWA（manifest + service worker）以便离线查看最近一次点钞数据。

## 添加到主屏幕 / 离线使用
1. 在 iPhone 15 Pro Safari 中打开 `http://<your-host>:5173`（或部署地址）。
2. 点击分享按钮 → 选择 “添加到主屏幕”。
3. 安装后可离线打开；首次加载需联网以便缓存静态资源。
4. service worker 采用 Cache First 策略；若发布新版本，可提示用户刷新更新资源。

## 手动测试清单
- 500000 × 3 → 总额显示 `1.500.000 ₫`。
- 录入 200000×2 + 50000×5，再将 50000 改为 3 → 总额应改为 `550.000 ₫`。
- 删除 10000 面额后，列表中不再显示该行，宫格仍可重新录入。
- 点击 “清空” 并确认 → 所有数据归零，本地存储被清空。
- 旋转为横屏或切换深色模式 → 布局保持可读、对比度达标，按钮仍 >=56pt。
- 底部语言切换按钮可在 Tiếng Việt / 简体中文 之间切换并保持高亮状态。

## 设计说明
- **触控尺寸**：所有主要按钮/卡片应用 `touch-target` 类，最小 56×56 pt，宫格按钮圆角 24px，便于拇指点按。
- **色板**：主色 `#1DBF73`（primary），强调色 `#FFB545`，暗色模式自动调整；列表与卡片沿用浅绿色/深灰背景形成层级。
- **动效**：录入成功触发 `animate-pulse-scale`（180ms），总金额使用 `useAnimatedNumber` 做平滑累加（260ms 惯性曲线）。
- **Safe Area**：顶部使用 `env(safe-area-inset-top)`，底部重置条与弹窗统一应用 `.safe-bottom`，保证在 iPhone 15 Pro 动态岛与底部指示条下可见。

## 浏览器兼容
- 主要针对移动端 Safari (iOS 17+) 与 Chromium 内核移动浏览器。
- 桌面浏览器可正常访问，但布局优先针对窄屏优化。

## 后续可拓展方向
1. 导出 CSV 或共享链接。
2. 自定义面额或批量扫码录入。
3. 更精细的多币种/多套显示主题。
