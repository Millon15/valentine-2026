# Valentine's Day Quiz 2026 - Документация проекта

## Обзор проекта

Интерактивная викторина ко Дню святого Валентина (white-label), созданная с использованием React, Vite и Tailwind CSS. Она генерирует персонализированное любовное письмо на основе ответов получателя.

## Архитектура

### Структура каталогов

- **`config/`**: Централизованная конфигурация.
  - `config.ts`: Настройки white-label (имена, текст интерфейса).
  - `content.ts`: Вопросы викторины, ответы, ссылки на видео.
- **`src/`**: Исходный код приложения.
  - **`components/`**: React компоненты UI (Экраны, Вопросы и т.д.).
  - **`hooks/`**: Пользовательские хуки React (`useQuizNavigation`, `useQuizPersistence`).
  - **`utils/`**: Вспомогательные функции (`confetti.ts`, `emailjs.ts`).
  - **`styles/`**: Варианты Tailwind и конфигурации тем.
  - **`__tests__/`**: Модульные и интеграционные тесты.
- **`public/`**: Статические ресурсы (видео, изображения).
- **`email-templates/`**: HTML шаблоны для EmailJS.

### Ключевая логика

- **Точка входа**: `src/main.tsx`
- **Основное приложение**: `src/App.tsx` (Управляет маршрутизацией между экранами: Intro -> Quiz -> Score -> Letter -> Valentine)
- **Управление состоянием**: React `useState` + `useQuizPersistence` (localStorage).
- **Стилизация**: Tailwind CSS v4. Варианты дизайна определены в `src/styles/questionVariants.ts`.

## Технологический стек

- **Runtime**: Bun
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest
- **Language**: TypeScript

## Команды

### Разработка

```bash
# Запуск сервера разработки
bun run dev

# Запуск тестов
bun run test
bun run test --watch
```

### Сборка и превью

```bash
# Сборка для продакшена
bun run build

# Превью продакшен сборки
bun run preview
```

### Управление пакетами

- Используйте `bun install` (не npm/yarn).
- Используйте `bun add <package>` для добавления зависимостей.

## Соглашения

### Стиль кода

- **React**: Функциональные компоненты с хуками.
- **Стилизация**: Utility-first с Tailwind. Используйте `src/styles/questionVariants.ts` для тематической согласованности.
- **Конфигурация**: ЖЕСТКОЕ ТРЕБОВАНИЕ: Весь видимый пользователю текст должен находиться в `config/config.ts`. Не хардкодьте строки в компонентах.
- **Импорты**: Используйте относительные пути импорта.

### Тестирование

- Размещайте тесты компонентов в `src/__tests__` или `src/components/__tests__`.
- Используйте `screen` и `userEvent` из `@testing-library/react`.
- Запускайте тесты с помощью `bun test`.

### Развертывание

- **GitHub Pages**: Развертывается автоматически через GitHub Actions при пуше в `master`.
- **Базовый URL**: Настроен в `vite.config.ts` как `base: '/valentine-2026/'`.

## Конфигурация

- **EmailJS**: Настройте ключи в `.env` (см. `README.md` для деталей).
- **Видео**: Поместите в `public/videos/` и укажите ссылки в `config/content.ts`.

## Примечания по окружению

- **Bun**: Используйте `bun` для выполнения всех скриптов.
- **Env Vars**: Bun автоматически загружает `.env`.
