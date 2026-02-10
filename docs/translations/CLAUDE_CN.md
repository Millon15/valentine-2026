# 2026 情人节问答 - 项目文档

## 项目概览

一个基于 React, Vite 和 Tailwind CSS 构建的白标、互动式情人节问答游戏。它根据接收者的回答生成一封个性化的情书。

## 架构

### 目录结构

- **`config/`**: 集中配置。
  - `config.ts`: 白标设置（名字、界面文本）。
  - `content.ts`: 问答题目、答案、视频链接。
- **`src/`**: 应用程序源代码。
  - **`components/`**: React UI 组件（屏幕、问题等）。
  - **`hooks/`**: 自定义 React Hooks (`useQuizNavigation`, `useQuizPersistence`)。
  - **`utils/`**: 辅助函数 (`confetti.ts`, `emailjs.ts`)。
  - **`styles/`**: Tailwind 变体和主题配置。
  - **`__tests__/`**: 单元测试和集成测试。
- **`public/`**: 静态资源（视频、图片）。
- **`email-templates/`**: EmailJS 的 HTML 模板。

### 核心逻辑

- **入口点**: `src/main.tsx`
- **主应用**: `src/App.tsx` (处理屏幕间的路由: Intro -> Quiz -> Score -> Letter -> Valentine)
- **状态管理**: React `useState` + `useQuizPersistence` (localStorage)。
- **样式**: Tailwind CSS v4。设计变体定义在 `src/styles/questionVariants.ts` 中。

## 技术栈

- **Runtime**: Bun
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest
- **Language**: TypeScript

## 命令

### 开发

```bash
# 启动开发服务器
bun run dev

# 运行测试
bun run test
bun run test --watch
```

### 构建 & 预览

```bash
# 构建生产版本
bun run build

# 预览生产构建
bun run preview
```

### 包管理

- 使用 `bun install` (而不是 npm/yarn)。
- 使用 `bun add <package>` 添加依赖。

## 约定

### 代码风格

- **React**: 带 Hooks 的函数式组件。
- **样式**: Utility-first 的 Tailwind。使用 `src/styles/questionVariants.ts` 保持主题一致性。
- **配置**: 硬性要求：所有面向用户的文本必须在 `config/config.ts` 中。不要在组件中硬编码字符串。
- **导入**: 使用相对导入。

### 测试

- 将组件测试放在 `src/__tests__` 或 `src/components/__tests__` 中。
- 使用 `@testing-library/react` 中的 `screen` 和 `userEvent`。
- 使用 `bun test` 运行测试。

### 部署

- **GitHub Pages**: 推送到 `master` 时通过 GitHub Actions 自动部署。
- **Base URL**: 在 `vite.config.ts` 中配置为 `base: '/valentine-2026/'`。

## 配置

- **EmailJS**: 在 `.env` 中设置密钥（详情见 `README.md`）。
- **视频**: 放置在 `public/videos/` 中并在 `config/content.ts` 中引用。

## 环境说明

- **Bun**: 使用 `bun` 执行所有脚本。
- **环境变量**: Bun 自动加载 `.env`。
