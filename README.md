# Valentine's Day Quiz 2026 ❤️

A white-label, interactive Valentine's Day quiz that generates a personalized love letter based on the recipient's
answers. Built with React, Vite, and Tailwind CSS.

**Fork it, customize it, deploy to your own Github Pages — send it to your loved one!!!**

## Quick How-to Guide

Follow these steps to create your own personalized Valentine's Day quiz.

### 1. Fork & Setup

1. **Fork this repository** to your own GitHub account.
2. **(Optional) Edit directly on GitHub**: You can edit the `config/` files directly in your browser (even on mobile!)
   without installing anything.
3. Or clone locally if you prefer:
   ```bash
   git clone https://github.com/<your-username>/valentine-2026.git
   cd valentine-2026
   bun install
   ```

### 2. Personalize

Customize the quiz to fit your relationship. Edit the files in the `config/` directory:

* **`config/config.ts`**: Update names (`senderName`, `recipientName`), UI text, and messages.
* **`config/content.ts`**: Modify quiz questions, answers, and the love letter segments generated based on their
  choices.
* **Swap Videos**: Add your own videos to `public/videos/` and update the references in `content.ts`.

### 3. Add Email Notifications (Optional)

Receive the quiz results and the generated love letter directly to your inbox using EmailJS.

1. Follow the **[EmailJS Setup Guide](./email-templates/SETUP.md)** to get your Service ID, Template ID, and Public Key.
2. Create a `.env` file locally for testing:
   ```env
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. For production, add these as **Secrets** in your GitHub Repository Settings
   (`Settings` > `Secrets and variables` > `Actions`).

### 4. Deploy to GitHub Pages

1. Go to your repository **Settings** > **Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Push your changes directly to YOUR `master` branch :)
4. Wait for the Action to complete. Your unique Valentine's URL will be:
   `https://<your-username>.github.io/valentine-2026/`

---

## Features

- **Interactive Quiz**: 7 thoughtfully designed questions with multiple question types (Multiple choice, Heart rating,
  Yes/No, Emoji reaction).
- **Personalized Love Letter**: Answers are automatically assembled into a unique love letter.
- **Beautiful Design**: 7 unique visual themes with gradient backgrounds and animations.
- **Confetti Celebrations**: Animated confetti bursts at key moments.
- **Responsive**: Works seamlessly on mobile, tablet, and desktop.
- **Email Integration**: Answers sent via EmailJS (optional).

## Local Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun run test
```

## Project Structure

```
config/
├── config.ts              # White-label configuration (names, text)
└── content.ts             # Questions, answers, letter segments
src/
├── components/            # React components
├── styles/                # Tailwind variants
└── utils/                 # EmailJS, confetti logic
public/                    # Static assets (videos)
email-templates/           # Email templates & setup guides
```

## Technology Stack

- **Runtime**: Bun
- **Framework**: React 19
- **Build**: Vite
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest

## Questions?

For setup issues or customization help, refer to:

- [email-templates/SETUP.md](./email-templates/SETUP.md) - EmailJS configuration guide
- [email-templates/README.md](./email-templates/README.md) - Email template documentation
- [CLAUDE.md](./CLAUDE.md) - Development guidelines
