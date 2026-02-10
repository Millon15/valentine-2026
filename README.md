# Valentine's Day Quiz 2026 ❤️

A white-label Valentine's Day quiz that generates a personalized love letter from the recipient's answers. Fork it, customize it, send it to your person.

## Quick Start

```bash
# 1. Clone & install
git clone https://github.com/millon15/valentine-2026.git
cd valentine-2026 && bun install

# 2. Personalize — edit these two files:
#    config/config.ts   → names, screen text, button labels
#    config/content.ts  → quiz questions, answers, letter segments

# 3. Run locally
bun run dev

# 4. Deploy — push to GitHub, enable Pages (Settings → Pages → Source: GitHub Actions)
#    Live at: https://<your-username>.github.io/valentine-2026/
```

---

## Table of Contents

- [Features](#features)
- [Local Setup](#local-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Commands](#available-commands)
- [EmailJS Setup (Optional)](#emailjs-setup-optional)
- [Customization](#customization)
  - [White-Label Config](#white-label-config)
  - [Update Quiz Questions](#update-quiz-questions)
  - [Swap Videos](#swap-videos)
  - [Customize Design Variants](#customize-design-variants)
  - [Customize Email Template](#customize-email-template)
- [Deployment](#deployment)
  - [Automatic Deployment to GitHub Pages](#automatic-deployment-to-github-pages)
  - [Manual Deployment](#manual-deployment)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Testing](#testing)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [License](#license)
- [Questions?](#questions)

## Features

- **Interactive Quiz**: 7 thoughtfully designed questions with multiple question types
  - Multiple choice questions
  - Heart rating scales (1-5)
  - Yes/No questions
  - Emoji reaction selections
- **Personalized Love Letter**: Answers are assembled into a unique love letter
- **Beautiful Design**: 7 unique visual themes with gradient backgrounds and animations
- **Confetti Celebrations**: Animated confetti bursts at key moments
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Email Integration**: Quiz answers can be sent via EmailJS (optional)
- **Accessibility**: Respects `prefers-reduced-motion` for users with motion sensitivity

## Local Setup

### Prerequisites
- [Bun](https://bun.sh) (fast JavaScript runtime)

### Installation

```bash
# Install dependencies
bun install

# Start development server with hot reload
bun run dev
```

The app will be available at `http://localhost:5173/valentine-2026/`

### Available Commands

```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview

# Run tests
bun run test
```

## EmailJS Setup (Optional)

### TL;DR

**What it does**: Sends quiz answers to your email (no backend needed). Free tier: 200 emails/month.

**Quick Setup**:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Add email service (Gmail/Outlook) → get **Service ID**
3. Create template using our [`quiz-answers.html`](./email-templates/quiz-answers.html) → get **Template ID**
4. Get **Public Key** from Account → API Keys
5. Add to `.env`:
   ```bash
   EMAILJS_SERVICE_ID=service_abc123
   EMAILJS_TEMPLATE_ID=template_xyz789
   EMAILJS_PUBLIC_KEY=pk_abc123xyz789
   ```

**Gracefully degrades** if not configured (won't break the quiz).

---

### Full Setup Guide

For detailed step-by-step instructions, see **[email-templates/SETUP.md](./email-templates/SETUP.md)**.

**Our Custom Email Template**:
- 💝 Beautiful gradient design with emoji decorations
- 📊 Formatted participant details and quiz answers  
- 💌 Optional love letter preview section
- 📱 Mobile-responsive layout (600px max-width)
- ✨ Works with Gmail, Outlook, Apple Mail, Yahoo, ProtonMail

**Template Documentation**: [`email-templates/README.md`](./email-templates/README.md)

## Customization

### White-Label Config

All user-facing text is centralized in [`config/config.ts`](./config/config.ts). Edit this single file to personalize the entire quiz -- no other source files need to change.

**What you can customize:**

| Section | What it controls |
|---|---|
| `recipientName` / `senderName` | Names used across all screens |
| `pageTitle` | Browser tab title |
| `intro` | Welcome screen greeting, message, button label, time estimate |
| `scoreReveal` | "100% Match" results screen heading, message, button |
| `loveLetter` | Love letter heading, closing line, signature, button |
| `valentine` | "Will you be my Valentine?" question, subtitle, buttons, witty "No" messages |
| `footer` | Footer text (`{sender}` and `{recipient}` are replaced automatically) |

**Example -- change names:**

```ts
// config/config.ts
export const config = {
  recipientName: 'Alex',
  senderName: 'Jordan',
  // ...
};
```

### Update Quiz Questions

Edit [`config/content.ts`](./config/content.ts) to modify:
- Question text and answer options
- Letter segments (text assembled into the final love letter)
- Design variants (visual themes per question)
- Question types (`multipleChoice`, `heartRating`, `yesNo`, `emojiReaction`)

### Swap Videos

Place video files in `public/videos/` and reference them in `config/content.ts` via the `videoSrc` field:

```ts
{
  id: 'q1',
  type: 'multipleChoice',
  question: 'Your question here',
  videoSrc: 'videos/my-video.mp4',  // relative to public/
  // ...
}
```

Supported formats: `.mp4`, `.webm`. Keep files under 15-20 MB for fast loading. Not every question needs a video -- omit `videoSrc` to show only the question card.

### Customize Design Variants

Edit `/src/styles/questionVariants.ts` to modify:
- Background gradients
- Card styling
- Text colors
- Accent colors
- Decorative patterns

### Customize Email Template

The project includes a professional HTML email template for quiz notifications:

**Template Location**: [`email-templates/quiz-answers.html`](./email-templates/quiz-answers.html)

**Features**:
- 💝 Beautiful gradient design with emoji decorations
- 📊 Formatted participant details and quiz answers
- 💌 Optional love letter preview section
- 📱 Mobile-responsive layout (600px max-width)
- ✨ Inline CSS for email client compatibility

**Full Documentation**: See [`email-templates/README.md`](./email-templates/README.md) for:
- Complete variable reference
- Setup instructions for EmailJS
- Customization guide
- Email client compatibility list
- Testing tips

## Deployment

### Automatic Deployment to GitHub Pages

This project uses GitHub Actions for automatic deployment.

#### First-Time Setup

1. Go to **Settings > Pages** in the GitHub repository
2. Under **Source**, select **"GitHub Actions"** (not "Deploy from a branch")
3. Click **Save**

#### How It Works

Once Pages is enabled, every push to the `master` branch triggers the workflow defined in `.github/workflows/deploy.yml`:

1. Installs dependencies with Bun
2. Runs tests
3. Builds the project (`vite build` with `base: '/valentine-2026/'`)
4. Uploads the `dist/` artifact and deploys to GitHub Pages

**Live URL**: `https://millon15.github.io/valentine-2026/`

### Manual Deployment

```bash
# Build the project
bun run build

# The dist/ folder is ready to deploy
```

## Project Structure

```
config/
├── config.ts              # White-label configuration (names, text, messages)
└── content.ts             # Quiz questions, answers, and letter segments
src/
├── components/            # React components
│   ├── IntroScreen.tsx
│   ├── QuestionCard.tsx
│   ├── ProgressBar.tsx
│   ├── ScoreReveal.tsx
│   ├── LoveLetter.tsx
│   ├── ValentinePrompt.tsx
│   └── ...
├── data/
│   └── questions.ts       # Quiz questions and letter segments
├── styles/
│   └── questionVariants.ts  # Design themes
├── utils/
│   ├── confetti.ts        # Celebration animations
│   ├── selectionBurst.ts  # Selection feedback effects
│   └── emailjs.ts         # Email integration
├── App.tsx                # Main app component
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Vitest** - Testing framework
- **EmailJS** - Email notifications (optional)
- **canvas-confetti** - Celebration animations

## Testing

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test --watch

# Run specific test file
bun run test QuestionCard.test.tsx
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Bundle Size**: ~232 KB JavaScript (73 KB gzipped)
- **CSS**: ~49 KB (8 KB gzipped)
- **Load Time**: <2 seconds on 4G
- **Mobile Optimized**: Reduced animations and particle counts on mobile devices

## Accessibility

- ✅ Keyboard navigation support
- ✅ Respects `prefers-reduced-motion` media query
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Color contrast meets WCAG AA standards

## License

Private project - All rights reserved

## Questions?

For setup issues or customization help, refer to:
- [email-templates/SETUP.md](./email-templates/SETUP.md) - EmailJS configuration guide
- [email-templates/README.md](./email-templates/README.md) - Email template documentation
- [CLAUDE.md](./CLAUDE.md) - Development guidelines
