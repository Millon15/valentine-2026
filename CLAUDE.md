# Valentine's Day Quiz 2026 - Project Documentation

## Project Overview

A white-label, interactive Valentine's Day quiz built with React, Vite, and Tailwind CSS. It generates a personalized
love letter based on the recipient's answers.

## Architecture

### Directory Structure

- **`config/`**: Centralized configuration.
  - `config.ts`: White-label settings (names, UI text).
  - `content.ts`: Quiz questions, answers, video links.
- **`src/`**: Application source code.
  - **`components/`**: React UI components (Screens, Questions, etc.).
  - **`hooks/`**: Custom React hooks (`useQuizNavigation`, `useQuizPersistence`).
  - **`utils/`**: Helper functions (`confetti.ts`, `emailjs.ts`).
  - **`styles/`**: Tailwind variants and theme configurations.
  - **`__tests__/`**: Unit and integration tests.
- **`public/`**: Static assets (videos, images).
- **`email-templates/`**: HTML templates for EmailJS.

### Key Logic

- **Entry Point**: `src/main.tsx`
- **Main App**: `src/App.tsx` (Handles routing between screens: Intro -> Quiz -> Score -> Letter -> Valentine)
- **State Management**: React `useState` + `useQuizPersistence` (localStorage).
- **Styling**: Tailwind CSS v4. Design variants defined in `src/styles/questionVariants.ts`.

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest
- **Language**: TypeScript

## Commands

### Development

```bash
# Start dev server
bun run dev

# Run tests
bun run test
bun run test --watch
```

### Build & Preview

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Package Management

- Use `bun install` (not npm/yarn).
- Use `bun add <package>` to add dependencies.

## Conventions

### Coding Style

- **React**: Functional components with Hooks.
- **Styling**: Utility-first with Tailwind. Use `src/styles/questionVariants.ts` for thematic consistency.
- **Config**: HARD REQUIREMENT: All user-facing text must be in `config/config.ts`. Do not hardcode strings in
  components.
- **Imports**: Use relative imports.

### Testing

- Place component tests in `src/__tests__` or `src/components/__tests__`.
- Use `screen` and `userEvent` from `@testing-library/react`.
- Run tests with `bun test`.

### Deployment

- **GitHub Pages**: Deployed automatically via GitHub Actions on push to `master`.
- **Base URL**: Configured in `vite.config.ts` as `base: '/valentine-2026/'`.

## Configuration

- **EmailJS**: Setup keys in `.env` (see `README.md` for details).
- **Videos**: Place in `public/videos/` and reference in `config/content.ts`.

## Environment Notes

- **Bun**: Use `bun` for all script executions.
- **Env Vars**: Bun automatically loads `.env`.
