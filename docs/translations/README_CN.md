# 2026 情人节问答 ❤️

一个白标、互动式的情人节问答游戏，根据接收者的回答生成个性化的情书。使用 React, Vite 和 Tailwind CSS 构建。

**Fork 它，自定义它，部署到你自己的 GitHub Pages —— 发送给你爱的人！！！**

## 🚀 "一键极客" 设置 (最快 & 最酷)

**使用 AI 为您构建！**
**不到 15 分钟即可在 GitHub Pages 上获得个性化的情人节问答网站！**

### 1. 克隆 & 安装

```bash
git clone https://github.com/<your-username>/valentine-2026.git
cd valentine-2026
bun install
```

### 2. 召唤您的 AI 代理 🤖

告诉您的 AI 代理（如 Claude, Cursor 或 OpenCode）：

> **"问我 5 个关于我伴侣的问题（名字、最爱的回忆、内部笑话），以定制情人节问答。等待我的回答，然后用个性化的内容重新生成 `config/` 中的文件，并运行本地开发服务器。"**

### 3. 本地运行

```bash
# 启动开发服务器
bun run dev
```

---

## 手动设置指南

如果您更喜欢手动编辑文件或**直接在 GitHub 上编辑**。

### 1. Fork & 设置

1. **Fork 这个仓库**到您自己的 GitHub 账户。
2. **(可选) 直接在 GitHub 上编辑**：您可以直接在浏览器中（甚至手机上！）编辑 `config/` 文件，无需安装任何东西。**这是最简单的方法！**

### 2. 个性化

定制问答以适应您的关系。编辑 `config/` 目录中的文件：

*   **`config/config.ts`**: 更新名字 (`senderName`, `recipientName`)，UI 文本和消息。
*   **`config/content.ts`**: 修改问答题目、答案以及根据选择生成的情书片段。
*   **替换视频**: 将您自己的视频添加到 `public/videos/` 并更新 `content.ts` 中的引用。

### 3. 添加邮件通知 (可选)

使用 EmailJS 直接在您的收件箱中接收问答结果和生成的情书。

1. 按照 **[EmailJS 设置指南](../../email-templates/SETUP.md)** 获取您的 Service ID, Template ID 和 Public Key。
2. 在本地创建一个 `.env` 文件进行测试：
   ```env
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. 对于生产环境，在您的 GitHub 仓库设置中将这些添加为 **Secrets** (`Settings` > `Secrets and variables` > `Actions`)。

### 4. 部署到 GitHub Pages

1. 转到您的仓库 **Settings** > **Pages**。
2. 在 **Source** 下，选择 **GitHub Actions**。
3. 直接推送您的更改到您的 `master` 分支 :)
4. 等待 Action 完成。您的唯一情人节 URL 将是：
   `https://<your-username>.github.io/valentine-2026/`

---

## 功能特性

- **互动问答**: 7 个精心设计的问题，包含多种题型（多选、爱心评分、是/否、表情反应）。
- **个性化情书**: 答案自动组合成一封独特的情书。
- **精美设计**: 7 种独特的视觉主题，带有渐变背景和动画。
- **庆祝彩带**: 关键时刻的动画彩带爆发。
- **响应式设计**: 在手机、平板和桌面上无缝运行。
- **邮件集成**: 通过 EmailJS 发送答案（可选）。

## 本地开发

```bash
# 启动开发服务器
bun run dev

# 构建生产版本
bun run build

# 运行测试
bun run test
```

## 项目结构

```
config/
├── config.ts              # 白标配置 (名字, 文本)
└── content.ts             # 问题, 答案, 信件片段
src/
├── components/            # React 组件
├── styles/                # Tailwind 样式变体
└── utils/                 # EmailJS, 彩带逻辑
public/                    # 静态资源 (视频)
email-templates/           # 邮件模板 & 设置指南
```

## 技术栈

- **Runtime**: Bun
- **Framework**: React 19
- **Build**: Vite
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest

## 有问题？

有关设置问题或自定义帮助，请参阅：

- [email-templates/SETUP.md](../../email-templates/SETUP.md) - EmailJS 配置指南
- [email-templates/README.md](../../email-templates/README.md) - 邮件模板文档
- [CLAUDE.md](../../CLAUDE.md) - 开发指南
