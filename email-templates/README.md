# EmailJS Template

[Русский](../../docs/translations/email-templates/README_RU.md) | [中文](../../docs/translations/email-templates/README_CN.md)

This directory contains the HTML email template and setup documentation for the Valentine's Day Quiz app.

## Files

- **`quiz-answers.html`** - Production-ready HTML email template
- **`SETUP.md`** - Complete EmailJS setup guide (account creation, service setup, template configuration)
- **`README.md`** - This file (template documentation and usage)

## Template: `quiz-answers.html`

A beautifully designed email template that sends quiz results with:

### Features

- **Gradient Header** with emoji decorations 💕
- **Participant Details** section with name, email, and timestamp
- **Quiz Answers** displayed in a formatted code block
- **Love Letter Preview** (optional, conditionally rendered)
- **Perfect Score Badge** (always 100% ❤️)
- **Responsive Design** optimized for desktop and mobile email clients
- **Call-to-Action Button** linking to the live quiz
- **GitHub Star Link** in footer

### Design Highlights

- Modern gradient backgrounds (rose pink, purple, coral)
- Rounded corners and soft shadows
- Clean typography with system fonts
- Emoji accents throughout
- Mobile-responsive layout (max-width: 600px)
- Inline CSS for maximum email client compatibility

### EmailJS Variables

The template uses these EmailJS variables (automatically populated):

| Variable          | Description              | Example                          |
|-------------------|--------------------------|----------------------------------|
| `{{user_name}}`   | Participant's name       | "Tanya"                          |
| `{{user_email}}`  | Participant's email      | "tanya@example.com"              |
| `{{timestamp}}`   | Submission time          | "2026-02-14 18:30:00"            |
| `{{answers}}`     | Quiz answers (JSON/text) | Formatted string of Q&A          |
| `{{love_letter}}` | Generated love letter    | Optional, conditionally rendered |

### Usage in EmailJS Dashboard

**First-time setup?** See [SETUP.md](./SETUP.md) for complete step-by-step instructions.

**Quick Template Setup**:

1. Go to [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Click **"Create New Template"**
3. Copy the contents of `quiz-answers.html`
4. Paste into the **HTML Content** editor
5. Set **Subject Line**: `💕 New Valentine's Quiz Submission from {{user_name}}`
6. Save and copy the **Template ID**
7. Add Template ID to your `.env` file

### Preview

The email includes:

```
┌─────────────────────────────────────────┐
│  💕 Valentine's Day Quiz Results        │
│  Someone just completed the quiz! 🎉    │
├─────────────────────────────────────────┤
│  👤 Participant Details                 │
│  Name: Tanya                            │
│  Email: tanya@example.com               │
│  Submitted: 2026-02-14 18:30:00         │
├─────────────────────────────────────────┤
│  💝 Their Romantic Answers              │
│  [Formatted quiz responses]             │
├─────────────────────────────────────────┤
│  💌 Generated Love Letter               │
│  [Personalized love letter text]        │
├─────────────────────────────────────────┤
│            100%                         │
│      Perfect Love Score ❤️              │
├─────────────────────────────────────────┤
│       [View Live Quiz 💕]               │
├─────────────────────────────────────────┤
│  💝 Sent from Valentine's Day Quiz 2026 │
│  Built with ❤️ using React & EmailJS   │
│  ⭐ Star on GitHub                      │
└─────────────────────────────────────────┘
```

### Customization

To customize the template:

- **Colors**: Modify the `linear-gradient()` values
- **Fonts**: Change the `font-family` in the body style
- **Logo**: Add an image URL or use emoji instead
- **Footer Links**: Update the GitHub link to your own repo
- **Call-to-Action**: Change the button URL to your deployed site

### Testing

Send a test email from EmailJS dashboard:

1. Open your template in EmailJS
2. Click **"Test It"**
3. Fill in sample values for all variables
4. Send to your email
5. Check inbox (and spam folder)

### Email Client Compatibility

Tested and optimized for:

- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook (2016+, Web, Mobile)
- ✅ Apple Mail (macOS, iOS)
- ✅ Yahoo Mail
- ✅ ProtonMail
- ✅ Thunderbird

**Note**: All styles are inline CSS for maximum compatibility with email clients that strip `<style>` tags.
