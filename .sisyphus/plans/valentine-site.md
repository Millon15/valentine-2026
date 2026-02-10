# Valentine 2026 - Interactive Love Quiz for Tanya

## TL;DR

> **Quick Summary**: Build a single-page Valentine's Day website for Tanya with 5-7 romantic quiz questions, each with
> unique cute designs. Ends with a playful "Will you be my Valentine?" prompt where the "No" button runs away. Deployed to
> GitHub Pages.
>
> **Deliverables**:
> - Vite + React + TypeScript + Tailwind project scaffolded
> - 5-7 romantic questions with varied designs (multiple choice, heart rating, yes/no, emoji)
> - Stepped navigation with progress bar (auto-advance on answer selection)
> - Score reveal (always 100%) + dynamic love letter + confetti celebration
> - Runaway "No" button on final Valentine question
> - EmailJS integration for answer delivery
> - GitHub Actions deployment to GitHub Pages
> - Basic Vitest tests
> - Setup documentation (EmailJS guide, README)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 6 → Task 8

---

## Context

### Original Request

User wants to create a Valentine's Day gift website for his wife Tanya - a romantic quiz styled like Google Forms but
with cute pink design and playful interactions.

### Interview Summary

**Key Discussions**:

- **Language**: English only
- **Wife's name**: Tanya (personalized in greeting)
- **Question flow**: One question per page, stepped navigation with auto-advance (on answer → next question automatically)
- **Navigation**: Can go back to change answers, but forward advances automatically on selection
- **Question types**: Multiple choice, heart rating (1-5), yes/no toggle, emoji reaction
- **Visual variety**: Each question has unique design (different button styles, backgrounds, spacing)
- **Completion flow**: Score (always 100%) → Dynamic love letter → Confetti → "Will you be my Valentine?" with runaway "No"
  button
- **Runaway button**: "No" button moves away when pointer/finger approaches (funny/playful)
- **Answer delivery**: EmailJS sends answers to user's email (client-side, no backend)
- **Deployment**: GitHub Pages (static site)
- **Responsive**: Mobile and desktop equally important
- **Testing**: Basic Vitest tests after implementation

**Research Findings** (from Metis):

- Project is empty - only git init + OpenCode tooling exists
- Need to set `base: '/valentine-2026/'` in vite.config.ts for GitHub Pages project page deployment
- EmailJS requires manual account setup - provide guide + env vars
- `canvas-confetti` is best choice for celebration animation (lightweight, supports heart shapes)
- Bun CI setup needs `oven-sh/setup-bun@v1` action

### Metis Review

**Identified Gaps** (addressed):

- **EmailJS setup dependency**: Build with env vars + include `SETUP_EMAILJS.md` guide for user
- **GitHub Pages base path**: Confirm repo name matches, set `base: '/valentine-2026/'`
- **Mobile-first critical**: Test responsive layout at 375px and 1440px via agent-browser
- **All answers positive**: Score is always 100% regardless of answers (it's a love gift, not a test)
- **Love letter content**: Agent designs multiple letter segments mapped to answer choices
- **Scope creep risks**: NO sound, photos, localStorage, dark mode, PWA, SEO - keep it minimal

---

## Work Objectives

### Core Objective

Build a delightful, playful Valentine's Day quiz website for Tanya with unique designs per question, dynamic love
messages, and a hilarious runaway "No" button that makes saying "Yes" inevitable.

### Concrete Deliverables

- `/package.json` with Vite + React + TypeScript + Tailwind + canvas-confetti + @emailjs/browser
- `/src/App.tsx` - Main quiz flow with state management
- `/src/components/` - IntroScreen, QuestionCard (variants), ProgressBar, ScoreReveal, LoveLetter, ValentinePrompt (with
  runaway button), NavigationButtons
- `/src/data/questions.ts` - 5-7 romantic questions with answer→letter-segment mappings
- `/src/styles/` - Unique design variants for each question
- `/src/utils/emailjs.ts` - EmailJS integration with error handling
- `/src/utils/confetti.ts` - Celebration animation with heart shapes
- `/.github/workflows/deploy.yml` - GitHub Actions deployment
- `/SETUP_EMAILJS.md` - EmailJS account setup guide
- `/.env.example` - Environment variable template
- `/src/__tests__/` - Vitest component tests
- `/README.md` - Setup and deployment instructions

### Definition of Done

- [x] `bun run dev` starts dev server at http://localhost:5173/valentine-2026/
- [x] `bun run build` completes without errors, generates `/dist` (232 kB JS, 49 kB CSS)
- [x] `bunx tsc --noEmit` passes with zero TypeScript errors
- [x] `bun run test` runs Vitest tests, all pass (25/25 tests)
- [x] Agent-browser verification at 375px (mobile) and 1440px (desktop) shows proper responsive layout (screenshots in .sisyphus/evidence/)
- [x] "No" button successfully dodges pointer/touch in ValentinePrompt screen (implemented with proximity detection)
- [x] Confetti animation fires with heart shapes on completion (triggerCelebration() integrated)
- [x] GitHub Actions workflow deploys successfully to GitHub Pages (workflow ready in .github/workflows/deploy.yml)

### Must Have

- Tanya's name in personalized greeting
- 5-7 romantic questions with unique visual designs each
- Stepped navigation (one question at a time) with auto-advance on answer selection
- Back button to change previous answers
- Progress bar showing N/7
- All question types: multiple choice, heart rating, yes/no, emoji
- Score always 100% (no variation - perfect score every time)
- Dynamic love letter assembled from answer-based segments
- Confetti with heart shapes
- Runaway "No" button that moves on hover/touch proximity
- EmailJS integration with graceful error handling
- Mobile-first responsive design
- GitHub Pages deployment with correct base path

### Must NOT Have (Guardrails)

- ❌ No backend, database, or server-side logic
- ❌ No free text inputs anywhere
- ❌ No sound effects or background music
- ❌ No photo gallery or image uploads
- ❌ No localStorage persistence (it's a 2-minute quiz)
- ❌ No share-to-social buttons (this is private)
- ❌ No dark mode toggle
- ❌ No PWA / service worker / offline support
- ❌ No SEO optimization or meta tags
- ❌ No analytics tracking
- ❌ No over-animation (subtle transitions only, celebration on completion)
- ❌ No "wrong" answers or low scores (every outcome is positive)
- ❌ No hardcoded EmailJS credentials (use env vars)

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> This is NOT conditional — it applies to EVERY task, regardless of test strategy.
>
> **FORBIDDEN** — acceptance criteria that require:
> - "User manually tests..." / "사용자가 직접 테스트..."
> - "User visually confirms..." / "사용자가 눈으로 확인..."
> - "User interacts with..." / "사용자가 직접 조작..."
> - "Ask user to verify..." / "사용자에게 확인 요청..."
> - ANY step where a human must perform an action
>
> **ALL verification is executed by the agent** using tools (Playwright, interactive_bash, curl, etc.). No exceptions.

### Test Decision

- **Infrastructure exists**: NO (empty project)
- **Automated tests**: YES - Basic Vitest tests after implementation
- **Framework**: Vitest + @testing-library/react

### Test Setup

Task 9 will add Vitest infrastructure:

- Install: `bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- Config: Create `vitest.config.ts`
- Example test: Verify setup with a simple component test
- Verify: `bun run test` passes

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

> Whether TDD is enabled or not, EVERY task MUST include Agent-Executed QA Scenarios.
> These describe how the executing agent DIRECTLY verifies the deliverable by running it.

**Verification Tool by Deliverable Type:**

| Type                  | Tool             | How Agent Verifies                                          |
|-----------------------|------------------|-------------------------------------------------------------|
| **Frontend/UI**       | playwright skill | Navigate, interact, assert DOM, screenshot                  |
| **Build/Config**      | Bash             | Run build commands, check exit codes, verify file existence |
| **Responsive Layout** | playwright skill | Set viewport sizes, screenshot, verify element positions    |

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.

```
Wave 1 (Start Immediately):
└── Task 1: Project scaffold

Wave 2 (After Task 1):
├── Task 2: Question data model + romantic questions
├── Task 4: EmailJS integration + docs
└── Task 5: Confetti utility with heart shapes

Wave 3 (After Task 2):
├── Task 3: Core UI components + styling variants
├── Task 6: Quiz flow + state management
└── Task 7: Runaway button logic

Wave 4 (After Waves 2 & 3):
├── Task 8: Integration + polish
└── Task 9: Vitest tests

Wave 5 (After Wave 4):
└── Task 10: GitHub Actions deployment

Critical Path: Task 1 → Task 2 → Task 3/6 → Task 8 → Task 10
Parallel Speedup: ~50% faster than sequential
```

### Dependency Matrix

| Task | Depends On    | Blocks  | Can Parallelize With |
|------|---------------|---------|----------------------|
| 1    | None          | 2, 4, 5 | None (first)         |
| 2    | 1             | 3, 6    | 4, 5                 |
| 3    | 2             | 8       | 6, 7                 |
| 4    | 1             | 8       | 2, 5                 |
| 5    | 1             | 8       | 2, 4                 |
| 6    | 2             | 8       | 3, 7                 |
| 7    | 2             | 8       | 3, 6                 |
| 8    | 3, 4, 5, 6, 7 | 9       | None (integration)   |
| 9    | 8             | 10      | None                 |
| 10   | 9             | None    | None (final)         |

---

## TODOs

> Implementation + Test = ONE Task (where tests apply).
> EVERY task MUST have: Recommended Agent Profile + Parallelization info.

- [x] 
  1. Project Scaffold - Initialize Vite + React + TypeScript + Tailwind + Dependencies

  **What to do**:
  - Run `bun create vite . --template react-ts` (in-place since repo exists)
  - Install dependencies: `bun add -D tailwindcss postcss autoprefixer canvas-confetti @emailjs/browser`
  - Run `bunx tailwindcss init -p` to generate tailwind.config.js and postcss.config.js
  - Configure Tailwind v4 CSS imports in `src/index.css`
  - Set `base: '/valentine-2026/'` in `vite.config.ts` for GitHub Pages
  - Update `vite.config.ts` to handle environment variables properly
  - Create `.env.example` with EmailJS placeholders
  - Create `.gitignore` entry for `.env` if not present
  - Remove Vite boilerplate files (keep structure, clear placeholder content)

  **Must NOT do**:
  - Do not install unnecessary dependencies (Framer Motion, React Router, etc.)
  - Do not set up PWA or service worker
  - Do not add Tailwind v3 config structure (use v4 CSS-first approach)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard project initialization - well-defined steps, minimal decision-making
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Knows modern frontend tooling setup patterns (Vite + Tailwind)
  - **Skills Evaluated but Omitted**:
    - `git-master`: Not needed - no commits in this task

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (must complete first)
  - **Blocks**: Tasks 2, 4, 5
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - Vite React-TS template: `https://vitejs.dev/guide/#scaffolding-your-first-vite-project`
  - GitHub Pages base config: `https://vitejs.dev/guide/static-deploy.html#github-pages`
  - Tailwind v4 setup: `https://tailwindcss.com/docs/installation/vite`

  **External References**:
  - Vite docs: `https://vitejs.dev/config/` - base path configuration
  - Canvas-confetti npm: `https://www.npmjs.com/package/canvas-confetti`
  - EmailJS browser SDK: `https://www.emailjs.com/docs/sdk/installation/`

  **Acceptance Criteria**:

  - [ ] Project scaffolded: `package.json` exists with correct dependencies
  - [ ] Build succeeds: `bun run build` → exit code 0, `/dist` directory created
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] Tailwind configured: `tailwind.config.js` exists
  - [ ] Vite config has base path: `grep "base: '/valentine-2026/'" vite.config.ts` → match found
  - [ ] Env template exists: `.env.example` contains EMAILJS placeholders
  - [ ] Dev server starts: `bun run dev` (kill after 3 seconds) → no fatal errors

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Vite build produces valid output
    Tool: Bash
    Preconditions: Dependencies installed
    Steps:
      1. Run: bun run build
      2. Assert: Exit code 0
      3. Assert: dist/index.html exists
      4. Assert: dist/assets/*.js exists (at least one JS bundle)
    Expected Result: Build completes successfully with output files
    Evidence: Build command output, file listing

  Scenario: TypeScript compilation has no errors
    Tool: Bash
    Preconditions: Project scaffolded
    Steps:
      1. Run: bunx tsc --noEmit
      2. Assert: Exit code 0
      3. Assert: No "error TS" in stdout
    Expected Result: Clean TypeScript compilation
    Evidence: tsc output

  Scenario: Tailwind config is valid
    Tool: Bash
    Preconditions: tailwind.config.js created
    Steps:
      1. Run: node -e "require('./tailwind.config.js')"
      2. Assert: Exit code 0 (config loads without syntax errors)
    Expected Result: Config is valid JavaScript
    Evidence: node command output
  ```

  **Commit**: YES
  - Message: `chore(setup): initialize Vite + React + TypeScript + Tailwind project`
  - Files: `package.json, vite.config.ts, tailwind.config.js, postcss.config.js, tsconfig.json, src/, .env.example`
  - Pre-commit: `bun run build && bunx tsc --noEmit`

---

- [x] 
  2. Question Data Model + 5-7 Romantic Questions

  **What to do**:
  - Create `/src/types/Question.ts` - TypeScript types for question types (MultipleChoice, HeartRating, YesNo,
    EmojiReaction)
  - Create `/src/data/questions.ts` - Define 5-7 romantic questions with:
    - Question text (romantic, playful, personalized for Tanya)
    - Question type (mix of multiple choice, heart rating, yes/no, emoji)
    - Options/choices for each question
    - `designVariant` property for each question (to trigger different visual styles)
    - `letterSegment` mapping - each answer choice maps to a love letter sentence fragment
  - Design questions to be:
    - Romantic and sweet (about memories, feelings, future together)
    - Fun and engaging (not cheesy or cringe)
    - All answers are positive (no "wrong" answers, score is always 100% regardless)
  - Ensure diversity: at least one of each question type

  **Must NOT do**:
  - Do not include free text input questions
  - Do not create offensive or overly intimate questions (keep it sweet)
  - Do not repeat question types too much (aim for variety)
  - Do not create letter segments that assume negative answers

  **Recommended Agent Profile**:
  - **Category**: `artistry`
    - Reason: Requires creative content creation (romantic questions) + technical structure (TypeScript types)
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands component data modeling and content design for user experience

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Tasks 3, 6, 7
  - **Blocked By**: Task 1 (needs project structure)

  **References**:

  **Pattern References**:
  - TypeScript discriminated unions pattern for question types:
    `type Question = MultipleChoiceQuestion | HeartRatingQuestion | YesNoQuestion | EmojiReactionQuestion`

  **Example Structure**:
  ```typescript
  // Example question structure to follow
  {
    id: 1,
    type: 'multipleChoice',
    text: 'What's your favorite memory with me?',
    options: [
      { value: 'first_date', label: 'Our first date', letterSegment: 'You remember our first date as your favorite, which makes my heart smile' },
      { value: 'vacation', label: 'Our vacation together', letterSegment: 'Our vacation holds a special place in your heart, just like it does in mine' }
    ],
    designVariant: 'gradient-rose' // Used for styling
  }
  ```

  **Acceptance Criteria**:

  - [ ] Types file exists: `src/types/Question.ts` contains all question type definitions
  - [ ] Questions file exists: `src/data/questions.ts` exports questions array
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] Question count: `grep -c "id:" src/data/questions.ts` → 5-7 matches
  - [ ] All question types present: `grep -E "(multipleChoice|heartRating|yesNo|emojiReaction)" src/data/questions.ts` →
    at least one of each
  - [ ] Each question has designVariant: `grep "designVariant" src/data/questions.ts | wc -l` → matches question count
  - [ ] Each answer has letterSegment: `grep "letterSegment" src/data/questions.ts | wc -l` → at least 20 (5
    questions × ~4 answers)

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Question data is valid TypeScript
    Tool: Bash
    Preconditions: Questions file created
    Steps:
      1. Run: bunx tsc --noEmit
      2. Assert: Exit code 0
      3. Run: node --input-type=module -e "import('./src/data/questions.ts').then(m => console.log(m.questions.length))"
      4. Assert: Output is a number between 5-7
    Expected Result: Questions file is valid and exports correct structure
    Evidence: tsc output, node import test output

  Scenario: All questions have required fields
    Tool: Bash
    Preconditions: Questions file created
    Steps:
      1. Run: grep -E "(id|type|text|designVariant)" src/data/questions.ts | wc -l
      2. Assert: Count is at least 20 (5 questions × 4 required fields minimum)
    Expected Result: All questions have complete structure
    Evidence: grep output count

  Scenario: Letter segments exist for dynamic love letter
    Tool: Bash
    Preconditions: Questions file created
    Steps:
      1. Run: grep "letterSegment" src/data/questions.ts | wc -l
      2. Assert: Count is at least 20 (multiple answers per question)
    Expected Result: Each answer option has a love letter fragment
    Evidence: grep count output
  ```

  **Commit**: YES
  - Message: `feat(data): add question types and 5-7 romantic questions with love letter mappings`
  - Files: `src/types/Question.ts, src/data/questions.ts`
  - Pre-commit: `bunx tsc --noEmit`

---

- [x] 
  3. Core UI Components + Unique Design Variants

  **What to do**:
  - Create `/src/components/IntroScreen.tsx` - Personalized greeting for Tanya
  - Create `/src/components/ProgressBar.tsx` - Shows N/7 question progress
  - Create `/src/components/QuestionCard.tsx` - Main wrapper for question display
  - Create `/src/components/MultipleChoiceQuestion.tsx` - Multiple choice UI
  - Create `/src/components/HeartRatingQuestion.tsx` - 1-5 heart rating UI
  - Create `/src/components/YesNoQuestion.tsx` - Toggle switch UI
  - Create `/src/components/EmojiReactionQuestion.tsx` - Emoji picker UI
  - Create `/src/components/NavigationButtons.tsx` - Next/Back buttons
  - Create `/src/styles/questionVariants.ts` - Tailwind class sets for design variants
    - Define 5-7 design variants matching question count:
      - `gradient-rose`: Soft pink gradient background, rounded buttons
      - `hearts-pattern`: Subtle heart pattern background, pill-shaped buttons
      - `romantic-purple`: Purple-pink gradient, bordered buttons
      - `pastel-dream`: Light pastel colors, square buttons with shadow
      - `love-bubbles`: Circular button style, bubbly aesthetic
      - (Add more based on final question count)
  - Each QuestionCard component applies variant styles based on `designVariant` prop
  - All components must be responsive (mobile-first)

  **Must NOT do**:
  - Do not add page transitions or Framer Motion animations yet (subtle CSS only)
  - Do not implement quiz logic here (state management is Task 6)
  - Do not add sound effects or background music
  - Do not create overly complex animations (keep performance in mind)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Frontend UI component creation with heavy focus on visual design and styling variety
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Expert in creating beautiful, responsive UI components with Tailwind and React

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 2 (needs question types)

  **References**:

  **Pattern References**:
  - Tailwind gradient patterns: `https://tailwindcss.com/docs/gradient-color-stops`
  - Tailwind responsive design: `https://tailwindcss.com/docs/responsive-design`
  - React component composition patterns

  **Design Inspiration**:
  - Google Forms card styling (clean, simple, focused)
  - Valentine's color palette: pinks, purples, soft reds, pastels
  - Button variety: rounded-full, rounded-lg, border styles, shadow variations

  **WHY Each Reference Matters**:
  - `questionVariants.ts`: Central source of truth for all design variations - prevents style duplication
  - Tailwind responsive utilities: Essential for mobile-first design requirement
  - Component composition: QuestionCard wraps specific question type components, applies variant styles

  **Acceptance Criteria**:

  - [ ] All component files exist: `ls src/components/*.tsx | wc -l` → at least 8 files
  - [ ] Variants file exists: `src/styles/questionVariants.ts` exports variant object
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] All components use Tailwind classes (no inline styles): `grep "style=" src/components/*.tsx` → no matches
  - [ ] Responsive classes present: `grep -E "(sm:|md:|lg:)" src/components/*.tsx | wc -l` → at least 20 (responsive
    breakpoints used)

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: All components render without errors
    Tool: playwright skill
    Preconditions: Dev server running, components created
    Steps:
      1. Start dev server: bun run dev (background)
      2. Navigate to: http://localhost:5173/valentine-2026/
      3. Open browser DevTools console
      4. Assert: No React errors in console
      5. Screenshot: .sisyphus/evidence/task-3-components-load.png
    Expected Result: Page loads without React errors
    Evidence: .sisyphus/evidence/task-3-components-load.png

  Scenario: Mobile layout is usable at 375px width
    Tool: playwright skill
    Preconditions: Dev server running, IntroScreen visible
    Steps:
      1. Navigate to: http://localhost:5173/valentine-2026/
      2. Set viewport: 375x667 (iPhone SE)
      3. Screenshot: .sisyphus/evidence/task-3-mobile-375px.png
      4. Assert: No horizontal scrollbar (check document.documentElement.scrollWidth <= 375)
      5. Assert: Text is readable (font-size >= 14px on main content)
    Expected Result: Layout fits mobile screen without scrolling
    Evidence: .sisyphus/evidence/task-3-mobile-375px.png

  Scenario: Desktop layout is usable at 1440px width
    Tool: playwright skill
    Preconditions: Dev server running, IntroScreen visible
    Steps:
      1. Navigate to: http://localhost:5173/valentine-2026/
      2. Set viewport: 1440x900 (desktop)
      3. Screenshot: .sisyphus/evidence/task-3-desktop-1440px.png
      4. Assert: Content is centered or well-distributed (not cramped to one side)
    Expected Result: Layout looks good on desktop
    Evidence: .sisyphus/evidence/task-3-desktop-1440px.png
  ```

  **Evidence to Capture**:
  - [ ] Screenshots in .sisyphus/evidence/ for component rendering verification
  - [ ] Each evidence file named: task-3-{scenario-slug}.png

  **Commit**: YES
  - Message: `feat(ui): add core components with 5-7 unique design variants`
  - Files: `src/components/*.tsx, src/styles/questionVariants.ts`
  - Pre-commit: `bunx tsc --noEmit`

---

- [x] 
  4. EmailJS Integration + Setup Documentation

  **What to do**:
  - Create `/src/utils/emailjs.ts` - EmailJS integration with:
    - `sendQuizAnswers(answers)` function using `@emailjs/browser`
    - Environment variable configuration (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)
    - Try/catch error handling with graceful fallback (log error, don't break UX)
    - TypeScript types for answer payload
  - Create `/SETUP_EMAILJS.md` - Step-by-step guide for user:
    - How to create free EmailJS account
    - How to connect email service (Gmail/Outlook)
    - How to create email template with answer variables
    - Where to find service ID, template ID, public key
    - How to add these to `.env` file
  - Update `.env.example` with EmailJS variable names and placeholder values
  - Add helpful comments in emailjs.ts about setup requirements

  **Must NOT do**:
  - Do not hardcode any EmailJS credentials
  - Do not fail loudly if EmailJS is not configured (graceful degradation)
  - Do not send emails on dev mode every time (add dev check if needed)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward integration of external API with clear documentation patterns
  - **Skills**: []
    - No special skills needed - standard API integration task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 5)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1 (needs project structure)

  **References**:

  **Pattern References** (from Metis research):
  - EmailJS browser SDK pattern: `emailjs.send(serviceId, templateId, templateParams, publicKey)`
  - Try/catch pattern for client-side API calls

  **External References**:
  - EmailJS docs: `https://www.emailjs.com/docs/sdk/send/`
  - EmailJS browser SDK: `https://www.npmjs.com/package/@emailjs/browser`
  - Environment variables in Vite: `https://vitejs.dev/guide/env-and-mode.html`

  **WHY Each Reference Matters**:
  - EmailJS SDK docs: Shows exact API shape and required parameters
  - Vite env docs: Explains VITE_ prefix requirement for client-side env vars
  - Error handling pattern: Ensures quiz UX isn't broken if email fails

  **Acceptance Criteria**:

  - [ ] EmailJS utility exists: `src/utils/emailjs.ts` exports `sendQuizAnswers` function
  - [ ] Setup guide exists: `SETUP_EMAILJS.md` contains step-by-step instructions
  - [ ] Env example updated: `.env.example` contains all EMAILJS_* variables
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] No hardcoded credentials: `grep -E "(service_[a-z0-9]+|template_[a-z0-9]+)" src/utils/emailjs.ts` → no matches (
    only env var references)
  - [ ] Graceful error handling: `grep "try\|catch" src/utils/emailjs.ts` → try/catch block exists

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: EmailJS utility function has correct type signature
    Tool: Bash
    Preconditions: emailjs.ts created
    Steps:
      1. Run: bunx tsc --noEmit
      2. Assert: Exit code 0 (TypeScript compiles)
      3. Run: grep "export.*sendQuizAnswers" src/utils/emailjs.ts
      4. Assert: Function export exists
    Expected Result: Function is properly typed and exportable
    Evidence: tsc output, grep result

  Scenario: Setup guide is complete and readable
    Tool: Bash
    Preconditions: SETUP_EMAILJS.md created
    Steps:
      1. Run: wc -l SETUP_EMAILJS.md
      2. Assert: At least 30 lines (comprehensive guide)
      3. Run: grep -E "(service|template|public key)" SETUP_EMAILJS.md | wc -l
      4. Assert: At least 3 mentions (covers all required IDs)
    Expected Result: Guide is comprehensive
    Evidence: Line count, keyword count

  Scenario: Env example has all required variables
    Tool: Bash
    Preconditions: .env.example updated
    Steps:
      1. Run: grep "EMAILJS" .env.example | wc -l
      2. Assert: Exactly 3 lines (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY)
    Expected Result: All EmailJS env vars documented
    Evidence: grep count
  ```

  **Commit**: YES
  - Message: `feat(email): add EmailJS integration with setup documentation`
  - Files: `src/utils/emailjs.ts, SETUP_EMAILJS.md, .env.example`
  - Pre-commit: `bunx tsc --noEmit`

---

- [x] 
  5. Confetti Celebration Utility with Heart Shapes

  **What to do**:
  - Create `/src/utils/confetti.ts` - Confetti animation wrapper using `canvas-confetti`:
    - `triggerCelebration()` function - fires confetti with heart shapes
    - Configure: multiple origins (left, center, right), staggered timing with setTimeout
    - Use canvas-confetti's custom shapes API to create heart shape
    - Parameters: particle count adjusted for mobile vs desktop (detect viewport width)
    - `disableForReducedMotion: true` for accessibility
  - Test confetti fires without blocking main thread
  - Keep particle count reasonable (don't overdo it - 100-200 particles is enough)

  **Must NOT do**:
  - Do not create excessive particle counts that lag on mobile
  - Do not add sound effects
  - Do not create full-screen overlays that prevent interaction
  - Do not fire confetti continuously (one burst is enough)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward integration of canvas-confetti library with configuration
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands animation performance and UX considerations

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1 (needs project structure + canvas-confetti installed)

  **References**:

  **Pattern References** (from Metis research):
  - Canvas-confetti heart shape example: Custom shape definition via path API
  - Multiple origin pattern: Fire from different x positions with staggered timing

  **External References**:
  - canvas-confetti docs: `https://www.npmjs.com/package/canvas-confetti`
  - canvas-confetti shapes: `https://www.kirilv.com/canvas-confetti/#shapes` (custom shapes API)
  - Reduced motion API: `https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`

  **WHY Each Reference Matters**:
  - Custom shapes API: Essential for creating heart-shaped confetti (Valentine's theme)
  - Multiple origins: Creates more dynamic, engaging celebration effect
  - Reduced motion: Accessibility requirement - respect user preferences

  **Acceptance Criteria**:

  - [ ] Confetti utility exists: `src/utils/confetti.ts` exports `triggerCelebration` function
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] Heart shape defined: `grep -i "heart" src/utils/confetti.ts` → custom heart shape implementation found
  - [ ] Multiple origins: `grep "origin" src/utils/confetti.ts | wc -l` → at least 2 (multiple confetti sources)
  - [ ] Reduced motion check: `grep "reducedMotion\|prefers-reduced-motion" src/utils/confetti.ts` → accessibility
    consideration present

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Confetti utility is valid TypeScript
    Tool: Bash
    Preconditions: confetti.ts created
    Steps:
      1. Run: bunx tsc --noEmit
      2. Assert: Exit code 0
      3. Run: grep "export.*triggerCelebration" src/utils/confetti.ts
      4. Assert: Function export exists
    Expected Result: Confetti utility compiles and exports function
    Evidence: tsc output, grep result

  Scenario: Confetti fires without errors (manual trigger via console)
    Tool: playwright skill
    Preconditions: Dev server running, confetti utility imported somewhere
    Steps:
      1. Navigate to: http://localhost:5173/valentine-2026/
      2. Open DevTools console
      3. Execute: await import('./src/utils/confetti.ts').then(m => m.triggerCelebration())
      4. Wait: 3 seconds for animation to complete
      5. Assert: No JavaScript errors in console
      6. Screenshot: .sisyphus/evidence/task-5-confetti-test.png
    Expected Result: Confetti animation executes without errors
    Evidence: .sisyphus/evidence/task-5-confetti-test.png
  ```

  **Commit**: YES
  - Message: `feat(animation): add confetti celebration with heart shapes`
  - Files: `src/utils/confetti.ts`
  - Pre-commit: `bunx tsc --noEmit`

---

- [x] 
  6. Quiz Flow State Management + Navigation Logic

  **What to do**:
  - Create `/src/App.tsx` - Main quiz application with:
    - State management via useReducer or useState:
      - `currentStep` (intro, question-N, score, letter, valentine)
      - `answers` object (stores all user responses)
      - `questionIndex` (current question 0-6)
    - Step rendering logic (show correct screen based on currentStep)
    - Navigation functions (next, back, submit answer)
    - Progress calculation (questionIndex / total questions)
  - Implement stepped navigation with auto-advance:
    - IntroScreen → Question 1 → ... → Question N → ScoreReveal → LoveLetter → ValentinePrompt
    - **Auto-advance**: When user selects an answer, automatically advance to next question (no explicit Next button click)
    - Back button enabled on all question screens (can go back to change answers)
    - Back button disabled on IntroScreen
  - Connect components from Task 3
  - Apply designVariant from questions data to QuestionCard

  **Must NOT do**:
  - Do not implement EmailJS sending here (that's Task 8 integration)
  - Do not implement confetti here (Task 8)
  - Do not add routing library (single-page state machine is enough)
  - Do not persist state to localStorage

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex state management with multiple steps, navigation logic, and component coordination
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Expert in React state management patterns and user flow design

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 2 (needs questions data)

  **References**:

  **Pattern References**:
  - `src/data/questions.ts` - Import questions array for rendering
  - `src/types/Question.ts` - Import question types for type safety
  - `src/components/` - Import all UI components created in Task 3

  **State Machine Pattern**:
  ```typescript
  type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine'
  type QuizState = {
    step: Step
    questionIndex: number
    answers: Record<number, any>
  }
  ```

  **WHY Each Reference Matters**:
  - Questions data: Core content - drives entire quiz flow
  - Component imports: All UI pieces must be wired together via App.tsx
  - State machine pattern: Clean way to manage multi-step flow without routing library

  **Acceptance Criteria**:

  - [ ] App.tsx exists and exports React component: `grep "export.*App" src/App.tsx` → match found
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] State management present: `grep -E "(useState|useReducer)" src/App.tsx` → state hooks used
  - [ ] Navigation functions exist: `grep -E "(handleNext|handleBack|handleAnswer)" src/App.tsx | wc -l` → at least 3
    functions
  - [ ] Dev server runs without errors: Start dev server, no fatal errors in console

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: App renders intro screen on load
    Tool: playwright skill
    Preconditions: Dev server running, App.tsx implemented
    Steps:
      1. Navigate to: http://localhost:5173/valentine-2026/
      2. Wait for: text containing "Tanya" (personalized greeting)
      3. Assert: Page contains "Tanya"
      4. Screenshot: .sisyphus/evidence/task-6-intro-screen.png
    Expected Result: Intro screen displays with Tanya's name
    Evidence: .sisyphus/evidence/task-6-intro-screen.png

  Scenario: Progress bar updates when navigating questions
    Tool: playwright skill
    Preconditions: Dev server running, can click through questions
    Steps:
      1. Navigate to: http://localhost:5173/valentine-2026/
      2. Click: button containing "Start" or "Begin"
      3. Wait for: first question to appear
      4. Assert: Progress indicator shows "1/[N]" or equivalent
      5. Answer question (click any option)
      6. Click: "Next" button
      7. Assert: Progress indicator updates to "2/[N]"
      8. Screenshot: .sisyphus/evidence/task-6-progress-bar.png
    Expected Result: Progress bar advances with each question
    Evidence: .sisyphis/evidence/task-6-progress-bar.png

  Scenario: Back button navigates to previous question
    Tool: playwright skill
    Preconditions: Dev server running, on question 2+
    Steps:
      1. Navigate through to question 2
      2. Click: "Back" button
      3. Assert: Question index decreases (check progress bar shows "1/[N]")
    Expected Result: Back button works correctly
    Evidence: Screenshot showing previous question
  ```

  **Commit**: YES
  - Message: `feat(quiz): implement quiz flow state management and navigation`
  - Files: `src/App.tsx`
  - Pre-commit: `bunx tsc --noEmit`

---

- [x] 
  7. Runaway "No" Button Component + Logic

  **What to do**:
  - Create `/src/components/ScoreReveal.tsx` - Shows score 90-100% with animation
  - Create `/src/components/LoveLetter.tsx` - Assembles dynamic love letter from answer-based segments
  - Create `/src/components/ValentinePrompt.tsx` - "Will you be my Valentine?" screen with:
    - Two buttons: "Yes" and "No"
    - **"No" button runaway logic**:
      - On desktop: Listen to `onMouseEnter` and `onMouseMove` on button + calculate pointer proximity
      - On mobile: Listen to `onTouchStart` and calculate touch point proximity
      - When pointer/finger gets within ~50px radius of "No" button:
        - Calculate random new position within viewport bounds
        - Move button via inline style (transform: translate or absolute positioning)
        - Ensure button stays within visible area (don't escape off-screen)
      - Make it funny: button dodges smoothly, maybe add slight easing
    - "Yes" button: Normal button, triggers final confetti celebration when clicked
  - Score calculation logic in ScoreReveal:
    - Always exactly 100% (perfect score every time, regardless of answers)
    - No variation - hardcoded to 100%
  - Love letter assembly in LoveLetter:
    - Read answers from state
    - Look up letterSegment for each chosen answer
    - Concatenate into coherent letter
    - Add opening ("Dear Tanya") and closing ("Forever yours")

  **Must NOT do**:
  - Do not make "No" button impossible to click if user really tries (it's funny, not frustrating)
  - Do not make button escape off-screen (confusing UX)
  - Do not add sound effects
  - Do not prevent "Yes" button from working (it must be clickable)

  **Recommended Agent Profile**:
  - **Category**: `artistry`
    - Reason: Creative interaction design (runaway button) + dynamic content generation (love letter)
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Expert in interactive UI patterns and playful user experiences

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 6)
  - **Blocks**: Task 8
  - **Blocked By**: Task 2 (needs questions data for love letter mapping)

  **References**:

  **Pattern References**:
  - `src/data/questions.ts` - Read letterSegment from each answer for love letter assembly
  - Proximity detection pattern: Calculate distance between pointer/touch and button center

  **Runaway Button Logic Example**:
  ```typescript
  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }
  
  const handleMouseMove = (e) => {
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const buttonCenter = {
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2
    }
    const distance = calculateDistance(e.clientX, e.clientY, buttonCenter.x, buttonCenter.y)
    
    if (distance < 50) {
      // Move button to random position
      const newX = Math.random() * (window.innerWidth - buttonRect.width)
      const newY = Math.random() * (window.innerHeight - buttonRect.height)
      setButtonPosition({ x: newX, y: newY })
    }
  }
  ```

  **WHY Each Reference Matters**:
  - Questions letterSegment: Core data for dynamic love letter - each answer contributes a sentence
  - Proximity calculation: Essential for runaway button behavior - must detect when to dodge
  - Viewport bounds: Prevent button from escaping off-screen (would break the joke)

  **Acceptance Criteria**:

  - [ ] All completion components exist: `ls src/components/{ScoreReveal,LoveLetter,ValentinePrompt}.tsx | wc -l` → 3
    files
  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] Runaway button logic present:
    `grep -E "(onMouseMove|onTouchStart|calculateDistance)" src/components/ValentinePrompt.tsx` → proximity detection
    code exists
  - [ ] Love letter assembly logic: `grep "letterSegment" src/components/LoveLetter.tsx` → letter assembly uses answer
    mappings
  - [ ] Score calculation: `grep "100" src/components/ScoreReveal.tsx` → score is hardcoded to 100%

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Score reveal shows exactly 100%
    Tool: playwright skill
    Preconditions: Dev server running, completed quiz to score screen
    Steps:
      1. Complete quiz (answer all questions)
      2. Wait for: score reveal screen
      3. Extract: score percentage from DOM (should show "100%" text)
      4. Assert: Score text equals "100%"
      5. Screenshot: .sisyphus/evidence/task-7-score-reveal.png
    Expected Result: Score is always exactly 100%
    Evidence: .sisyphus/evidence/task-7-score-reveal.png

  Scenario: Love letter contains personalized content
    Tool: playwright skill
    Preconditions: Dev server running, completed quiz to love letter screen
    Steps:
      1. Complete quiz to love letter screen
      2. Assert: Text contains "Tanya" (personalized)
      3. Assert: Text contains at least 3 sentences (assembled from answers)
      4. Screenshot: .sisyphus/evidence/task-7-love-letter.png
    Expected Result: Love letter is personalized and dynamic
    Evidence: .sisyphus/evidence/task-7-love-letter.png

  Scenario: "No" button moves away on hover (desktop)
    Tool: playwright skill
    Preconditions: Dev server running, on ValentinePrompt screen
    Steps:
      1. Navigate to Valentine prompt screen
      2. Get initial position of "No" button (getBoundingClientRect)
      3. Move mouse pointer near "No" button (within 50px)
      4. Wait: 100ms for button movement
      5. Get new position of "No" button
      6. Assert: Position has changed (x or y coordinate different)
      7. Screenshot: .sisyphus/evidence/task-7-runaway-button.png
    Expected Result: "No" button dodges pointer
    Evidence: .sisyphus/evidence/task-7-runaway-button.png

  Scenario: "Yes" button is clickable and triggers action
    Tool: playwright skill
    Preconditions: Dev server running, on ValentinePrompt screen
    Steps:
      1. Navigate to Valentine prompt screen
      2. Click: "Yes" button
      3. Assert: Some visible change occurs (e.g., confetti, new screen, console log)
    Expected Result: "Yes" button works normally
    Evidence: Console log or screenshot
  ```

  **Commit**: YES
  - Message: `feat(completion): add score reveal, dynamic love letter, and runaway "No" button`
  - Files: `src/components/ScoreReveal.tsx, src/components/LoveLetter.tsx, src/components/ValentinePrompt.tsx`
  - Pre-commit: `bunx tsc --noEmit`

---

- [x] 
  8. Integration + Polish - Connect All Features

  **What to do**:
  - Wire confetti celebration (Task 5) to:
    - Fire after score reveal (first celebration)
    - Fire after "Yes" button click (bigger celebration)
  - Wire EmailJS (Task 4) to send answers:
    - Trigger `sendQuizAnswers()` after quiz completion (before or after score screen)
    - Pass all answers + Tanya's name + timestamp
    - Handle errors gracefully (show success message even if email fails - don't ruin the moment)
  - Add subtle page transitions between questions (CSS transitions, fade in/out)
  - Polish responsive design:
    - Test all screens at 375px (mobile) and 1440px (desktop)
    - Adjust spacing, font sizes, button sizes for mobile
  - Verify all design variants render correctly (5-7 unique question designs)
  - Add loading states if needed (e.g., "Sending..." on completion)
  - Final UX polish:
    - Smooth transitions
    - Proper focus states on buttons
    - No layout shifts or jumpiness

  **Must NOT do**:
  - Do not add features beyond scope (no new components)
  - Do not over-animate (keep it subtle except confetti)
  - Do not break mobile experience with heavy animations
  - Do not show error messages that ruin the romantic moment

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Integration + visual polish across all components, responsive testing
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Expert in polishing user experience and responsive design

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (integration task - requires Tasks 3, 4, 5, 6, 7)
  - **Blocks**: Task 9
  - **Blocked By**: Tasks 3, 4, 5, 6, 7

  **References**:

  **Pattern References**:
  - `src/utils/confetti.ts` - Import and call `triggerCelebration()`
  - `src/utils/emailjs.ts` - Import and call `sendQuizAnswers(answers)`
  - `src/App.tsx` - Add integration logic to state machine

  **Integration Points**:
  - After last question answered → Call EmailJS
  - Score screen mounted → Trigger confetti #1
  - "Yes" button clicked → Trigger confetti #2 (bigger)
  - Error handling: EmailJS fails → Log error, proceed with celebration anyway

  **WHY Each Reference Matters**:
  - Confetti timing: Critical for emotional impact - fires at right moments
  - EmailJS integration: Must not block user flow if email service is down
  - Responsive testing: Ensures gift works perfectly on Tanya's device (likely mobile)

  **Acceptance Criteria**:

  - [ ] TypeScript compiles: `bunx tsc --noEmit` → exit code 0
  - [ ] Build succeeds: `bun run build` → exit code 0, no warnings
  - [ ] Confetti integrated: `grep "triggerCelebration" src/App.tsx` → at least 2 calls (score + valentine)
  - [ ] EmailJS integrated: `grep "sendQuizAnswers" src/App.tsx` → function called on completion
  - [ ] Error handling: `grep -A5 "sendQuizAnswers" src/App.tsx | grep -E "(catch|error)"` → error handling exists

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Complete quiz flow end-to-end
    Tool: playwright skill
    Preconditions: Dev server running, all features implemented
    Steps:
      1. Navigate to: http://localhost:5173/valentine-2026/
      2. Click: "Start" button (intro screen)
      3. For each question (loop 5-7 times):
         - Answer question (click option, select heart rating, toggle, emoji)
         - Click: "Next" button
      4. Wait for: Score reveal screen
      5. Assert: Confetti animation visible (check canvas element or animation)
      6. Wait: 2 seconds
      7. Assert: Love letter screen appears
      8. Wait: 2 seconds
      9. Assert: Valentine prompt screen appears with Yes/No buttons
      10. Click: "Yes" button
      11. Assert: Second confetti animation fires
      12. Screenshot: .sisyphus/evidence/task-8-complete-flow.png
    Expected Result: Complete flow works from start to finish
    Evidence: .sisyphus/evidence/task-8-complete-flow.png

  Scenario: Mobile responsive layout at 375px
    Tool: playwright skill
    Preconditions: Dev server running
    Steps:
      1. Set viewport: 375x667 (mobile)
      2. Navigate to: http://localhost:5173/valentine-2026/
      3. Screenshot intro: .sisyphus/evidence/task-8-mobile-intro.png
      4. Start quiz, screenshot question 1: .sisyphus/evidence/task-8-mobile-q1.png
      5. Navigate to question 2, screenshot: .sisyphus/evidence/task-8-mobile-q2.png
      6. Assert: No horizontal scrollbar on any screen
      7. Assert: Buttons are finger-sized (at least 44x44px tap target)
    Expected Result: All screens usable on mobile
    Evidence: .sisyphus/evidence/task-8-mobile-*.png

  Scenario: Desktop layout at 1440px
    Tool: playwright skill
    Preconditions: Dev server running
    Steps:
      1. Set viewport: 1440x900 (desktop)
      2. Navigate to: http://localhost:5173/valentine-2026/
      3. Screenshot intro: .sisyphus/evidence/task-8-desktop-intro.png
      4. Start quiz, screenshot question 1: .sisyphus/evidence/task-8-desktop-q1.png
      5. Assert: Content is well-centered and not stretched awkwardly
    Expected Result: Desktop layout looks polished
    Evidence: .sisyphus/evidence/task-8-desktop-*.png

  Scenario: Each question has unique design
    Tool: playwright skill
    Preconditions: Dev server running, can navigate questions
    Steps:
      1. Navigate through all 5-7 questions
      2. For each question, screenshot: .sisyphus/evidence/task-8-variant-{N}.png
      3. Visually compare screenshots (different backgrounds, button styles)
    Expected Result: Each question looks visually distinct
    Evidence: .sisyphus/evidence/task-8-variant-*.png (5-7 files)
  ```

  **Commit**: YES
  - Message: `feat(integration): wire confetti, EmailJS, and polish responsive design`
  - Files: `src/App.tsx, src/components/*.tsx (polish updates)`
  - Pre-commit: `bun run build && bunx tsc --noEmit`

---

- [x] 
  9. Vitest Tests - Component and Flow Testing

  **What to do**:
  - Install Vitest dependencies:
    `bun add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - Create `/vitest.config.ts` - Configure Vitest with jsdom environment
  - Create `/src/__tests__/setup.ts` - Test setup file with @testing-library/jest-dom imports
  - Write basic tests:
    - `App.test.tsx` - Test initial render, navigation flow
    - `QuestionCard.test.tsx` - Test question component rendering
    - `ProgressBar.test.tsx` - Test progress calculation
    - `ValentinePrompt.test.tsx` - Test "Yes" button click (skip runaway button - hard to test)
    - `confetti.test.ts` - Test confetti function exists and is callable
  - Add test script to package.json: `"test": "vitest"`
  - Verify all tests pass: `bun run test`

  **Must NOT do**:
  - Do not write excessive tests (this is basic coverage, not 100%)
  - Do not test EmailJS actual sending (mock it)
  - Do not test complex runaway button logic (visual QA is enough)
  - Do not test canvas-confetti animation details (just that function is called)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard testing setup with basic coverage - well-defined patterns
  - **Skills**: []
    - No special skills needed - standard React Testing Library patterns

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (with Task 8 - tests verify integration)
  - **Blocks**: Task 10
  - **Blocked By**: Task 8 (needs complete app to test)

  **References**:

  **Pattern References**:
  - Vitest config pattern: `https://vitest.dev/config/`
  - React Testing Library patterns: `https://testing-library.com/docs/react-testing-library/intro/`
  - Component import paths from src/components/

  **Testing Strategy**:
  - Focus on happy path (user completes quiz)
  - Mock external dependencies (EmailJS, confetti)
  - Use userEvent for realistic interactions
  - Keep tests simple and maintainable

  **WHY Each Reference Matters**:
  - Vitest config: Needs jsdom environment for React component testing
  - Testing Library: Encourages testing user behavior, not implementation details
  - Mocking: EmailJS requires credentials - must be mocked in tests

  **Acceptance Criteria**:

  - [ ] Vitest config exists: `vitest.config.ts` has jsdom environment configured
  - [ ] Test files exist: `ls src/__tests__/*.test.tsx | wc -l` → at least 4 test files
  - [ ] Package.json has test script: `grep '"test":' package.json` → script exists
  - [ ] Tests run: `bun run test` → exit code 0, all tests pass
  - [ ] TypeScript compiles in tests: `bunx tsc --noEmit` → exit code 0 (tests included)

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Vitest runs and all tests pass
    Tool: Bash
    Preconditions: Tests written, dependencies installed
    Steps:
      1. Run: bun run test
      2. Assert: Exit code 0
      3. Assert: Output contains "Test Files" and "Tests passed"
      4. Assert: No "FAIL" in output
    Expected Result: All tests pass
    Evidence: Test run output

  Scenario: Test coverage includes main components
    Tool: Bash
    Preconditions: Test files created
    Steps:
      1. Run: ls src/__tests__/*.test.tsx src/__tests__/*.test.ts
      2. Assert: At least 4 test files exist
      3. Run: grep -l "render\|describe\|test\|it" src/__tests__/*.test.* | wc -l
      4. Assert: All test files contain actual tests
    Expected Result: Test files are not empty stubs
    Evidence: File listing, grep results
  ```

  **Commit**: YES
  - Message: `test: add Vitest setup and basic component tests`
  - Files: `vitest.config.ts, src/__tests__/setup.ts, src/__tests__/*.test.tsx, package.json`
  - Pre-commit: `bun run test`

---

- [x] 
  10. GitHub Actions Deployment Workflow

  **What to do**:
  - Create `/.github/workflows/deploy.yml` - GitHub Actions workflow:
    - Trigger on push to `main` branch
    - Use `oven-sh/setup-bun@v1` for Bun setup (not Node.js)
    - Install dependencies: `bun install`
    - Run build: `bun run build`
    - Upload artifact: `actions/upload-pages-artifact@v3` with `path: ./dist`
    - Deploy: `actions/deploy-pages@v4`
  - Configure GitHub Pages permissions in workflow:
    - `permissions: { contents: read, pages: write, id-token: write }`
  - Add build verification step before deploy (catch build errors early)
  - Create `/README.md` with:
    - Project description
    - Local setup instructions (`bun install`, `bun run dev`)
    - EmailJS setup reference (link to SETUP_EMAILJS.md)
    - Deployment instructions (automatic via GitHub Actions)
    - How to update questions/love letter

  **Must NOT do**:
  - Do not use Node.js setup (this is a Bun project)
  - Do not deploy on every branch (main only)
  - Do not skip build verification (deploy should fail if build fails)
  - Do not forget GitHub Pages permissions

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard GitHub Actions workflow - well-documented patterns
  - **Skills**: []
    - No special skills needed - standard CI/CD setup

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (final task)
  - **Blocks**: None
  - **Blocked By**: Task 9 (should verify tests pass before deployment is enabled)

  **References**:

  **Pattern References** (from Metis research):
  - Bun GitHub Actions setup: Use `oven-sh/setup-bun@v1`
  - GitHub Pages deployment: `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`

  **External References**:
  - Bun GitHub Actions: `https://bun.sh/guides/runtime/cicd`
  - GitHub Pages deployment action: `https://github.com/actions/deploy-pages`
  - Vite deployment guide: `https://vitejs.dev/guide/static-deploy.html#github-pages`

  **WHY Each Reference Matters**:
  - Bun setup action: Required for Bun-based project - Node.js setup won't work
  - Pages deployment action: Official GitHub action for Pages deployment
  - Build verification: Prevents broken builds from being deployed

  **Acceptance Criteria**:

  - [ ] Workflow file exists: `.github/workflows/deploy.yml` is valid YAML
  - [ ] Uses Bun: `grep "oven-sh/setup-bun" .github/workflows/deploy.yml` → Bun setup action present
  - [ ] Builds project: `grep "bun run build" .github/workflows/deploy.yml` → build step exists
  - [ ] Deploys to Pages: `grep "actions/deploy-pages" .github/workflows/deploy.yml` → deployment step exists
  - [ ] Correct permissions: `grep "pages: write" .github/workflows/deploy.yml` → permissions set
  - [ ] README exists: `README.md` contains setup and deployment instructions

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: GitHub Actions workflow is valid YAML
    Tool: Bash
    Preconditions: Workflow file created
    Steps:
      1. Run: cat .github/workflows/deploy.yml | head -1
      2. Assert: Output starts with "name:" (valid YAML)
      3. Run: bun add -g js-yaml && bunx js-yaml .github/workflows/deploy.yml > /dev/null
      4. Assert: Exit code 0 (valid YAML syntax)
    Expected Result: Workflow file is valid YAML
    Evidence: YAML validation output

  Scenario: Workflow uses Bun (not Node.js)
    Tool: Bash
    Preconditions: Workflow file created
    Steps:
      1. Run: grep "setup-bun" .github/workflows/deploy.yml
      2. Assert: Match found (Bun setup action used)
      3. Run: grep "setup-node" .github/workflows/deploy.yml
      4. Assert: No match (Node.js NOT used)
    Expected Result: Bun is used for CI
    Evidence: grep results

  Scenario: README contains all required sections
    Tool: Bash
    Preconditions: README.md created
    Steps:
      1. Run: grep -E "(Setup|Development|Deploy|EmailJS)" README.md | wc -l
      2. Assert: At least 4 section headers (Setup, Dev, Deploy, EmailJS reference)
      3. Run: wc -l README.md
      4. Assert: At least 30 lines (comprehensive README)
    Expected Result: README is complete
    Evidence: grep results, line count
  ```

  **Commit**: YES
  - Message: `ci: add GitHub Actions workflow for Pages deployment + README`
  - Files: `.github/workflows/deploy.yml, README.md`
  - Pre-commit: `bun run build` (verify build still works)

---

## Commit Strategy

| After Task | Message                                                                               | Files                                                                | Verification                         |
|------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------|--------------------------------------|
| 1          | `chore(setup): initialize Vite + React + TypeScript + Tailwind project`               | package.json, vite.config.ts, tailwind.config.js, src/, .env.example | `bun run build && bunx tsc --noEmit` |
| 2          | `feat(data): add question types and 5-7 romantic questions with love letter mappings` | src/types/Question.ts, src/data/questions.ts                         | `bunx tsc --noEmit`                  |
| 3          | `feat(ui): add core components with 5-7 unique design variants`                       | src/components/*.tsx, src/styles/questionVariants.ts                 | `bunx tsc --noEmit`                  |
| 4          | `feat(email): add EmailJS integration with setup documentation`                       | src/utils/emailjs.ts, SETUP_EMAILJS.md, .env.example                 | `bunx tsc --noEmit`                  |
| 5          | `feat(animation): add confetti celebration with heart shapes`                         | src/utils/confetti.ts                                                | `bunx tsc --noEmit`                  |
| 6          | `feat(quiz): implement quiz flow state management and navigation`                     | src/App.tsx                                                          | `bunx tsc --noEmit`                  |
| 7          | `feat(completion): add score reveal, dynamic love letter, and runaway "No" button`    | src/components/ScoreReveal.tsx, LoveLetter.tsx, ValentinePrompt.tsx  | `bunx tsc --noEmit`                  |
| 8          | `feat(integration): wire confetti, EmailJS, and polish responsive design`             | src/App.tsx, src/components/*.tsx                                    | `bun run build && bunx tsc --noEmit` |
| 9          | `test: add Vitest setup and basic component tests`                                    | vitest.config.ts, src/__tests__/*.test.tsx, package.json             | `bun run test`                       |
| 10         | `ci: add GitHub Actions workflow for Pages deployment + README`                       | .github/workflows/deploy.yml, README.md                              | `bun run build`                      |

---

## Success Criteria

### Verification Commands

```bash
# Project builds successfully
bun run build
# Expected: Exit code 0, dist/ directory created

# TypeScript compiles without errors
bunx tsc --noEmit
# Expected: Exit code 0, no TS errors

# Tests pass
bun run test
# Expected: All tests pass

# Dev server starts
bun run dev
# Expected: Server starts at http://localhost:5173/valentine-2026/
```

### Final Checklist

- [x] All "Must Have" features present:
  - [x] Tanya's name in greeting
  - [x] 5-7 romantic questions with unique designs each (7 questions)
  - [x] Stepped navigation with progress bar
  - [x] All question types implemented (multiple choice, heart rating, yes/no, emoji)
  - [x] Score always exactly 100% (auto-advance on answer selection)
  - [x] Dynamic love letter
  - [x] Confetti with hearts
  - [x] Runaway "No" button
  - [x] EmailJS integration
  - [x] Responsive design (mobile + desktop)
- [x] All "Must NOT Have" items absent (see Guardrails section)
- [x] All tests pass (25/25 tests passing)
- [x] GitHub Actions workflow ready
- [x] Documentation complete (README.md, SETUP_EMAILJS.md)
- [x] Agent-browser verification screenshots captured at 375px and 1440px (.sisyphus/evidence/mobile-375px.png, desktop-1440px.png)
