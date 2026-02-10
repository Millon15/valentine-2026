# EmailJS Setup Guide

This guide walks you through setting up EmailJS to send quiz answers from the Valentine's 2026 quiz application.

## Overview

EmailJS allows you to send emails directly from your web application without a backend server. The quiz uses EmailJS to
send user responses to your email address.

## Step 1: Create a Free EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click **"Sign Up"** in the top right corner
3. Choose **"Sign up with Google"** or **"Sign up with Email"**
4. Complete the registration process
5. Verify your email address

## Step 2: Create an Email Service

EmailJS needs to know which email service to use (Gmail, Outlook, etc.).

### Option A: Using Gmail

1. In the EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add Service"**
3. Select **"Gmail"** from the list
4. Click **"Connect with Gmail"**
5. Sign in with your Gmail account
6. Grant EmailJS permission to send emails
7. Copy the **Service ID** (looks like `service_abc123def456`)
8. Save it for later (Step 4)

### Option B: Using Outlook/Microsoft 365

1. In the EmailJS dashboard, click **"Email Services"**
2. Click **"Add Service"**
3. Select **"Gmail"** from the list
4. Enter your Gmail and password
5. Copy the **Service ID**
6. Save it for later (Step 4)

### Option C: Using Another Email Provider

1. In the EmailJS dashboard, click **"Email Services"**
2. Click **"Add Service"**
3. Select your email provider (Yahoo, SendGrid, etc.)
4. Follow the provider-specific instructions
5. Copy the **Service ID**
6. Save it for later (Step 4)

## Step 3: Create an Email Template

Email templates define how the quiz answers will be formatted in the email.

1. In the EmailJS dashboard, click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Give it a name (e.g., "Quiz Answers")
4. Paste the contents of `email-templates/quiz-answers.html` into the **HTML Content** editor
5. Copy the **Template ID** (looks like `template_xyz789abc123`)
6. Don't forget to **Save** it via small blue button somewhere in the right!

## Step 4: Get Your Public Key

1. In the EmailJS dashboard, click **"Account"** (top right menu)
2. Click **"API Keys"**
3. Copy your **Public Key** (looks like `pk_abc123xyz789def456`)
4. Save it for later

## Step 5: Add Credentials to Your `.env` File

1. In the project root, create or edit the `.env` file (if it doesn't exist)
2. Add these three lines:
   ```
   EMAILJS_SERVICE_ID=your_service_id_here
   EMAILJS_TEMPLATE_ID=your_template_id_here
   EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
3. Replace the placeholder values with your actual IDs from Steps 2, 3, and 4:
   - `your_service_id_here` → Your Service ID (e.g., `service_abc123`)
   - `your_template_id_here` → Your Template ID (e.g., `template_xyz789`)
   - `your_public_key_here` → Your Public Key (e.g., `pk_abc123xyz789`)

**Example:**

```
EMAILJS_SERVICE_ID=service_a1b2c3d4e5f6g7h8
EMAILJS_TEMPLATE_ID=template_x9y8z7w6v5u4t3s2
EMAILJS_PUBLIC_KEY=pk_live_abc123xyz789def456ghi789
```

## Step 6: Restart Your Development Server

After updating `.env`, restart your development server:

```bash
bun run dev
```

The application will now send quiz answers to your email when users submit the quiz.

## Troubleshooting

### "EmailJS not fully configured" Warning

**Problem:** You see this warning in the browser console.

**Solution:** Make sure all three environment variables are set in `.env`:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

Restart your dev server after updating `.env`.

### Emails Not Arriving

**Problem:** Quiz submissions complete but emails don't arrive.

**Possible causes:**

1. Check your email spam/junk folder
2. Verify the email service is connected in EmailJS dashboard
3. Check the browser console for error messages (F12 → Console tab)
4. Verify your template ID is correct in `.env`

### "Service not found" Error

**Problem:** You see this error in the console.

**Solution:** Double-check that your Service ID in `.env` matches exactly what's shown in the EmailJS dashboard. Copy
and paste to avoid typos.

### "Template not found" Error

**Problem:** You see this error in the console.

**Solution:** Double-check that your Template ID in `.env` matches exactly what's shown in the EmailJS dashboard.

## Security Notes

- **Never commit `.env` to Git** - It's already in `.gitignore`
- **Public Key is safe to expose** - It's designed to be public (used in browser)
- **Service ID and Template ID are semi-public** - They're visible in your EmailJS dashboard but shouldn't be shared
- **Keep your `.env` file private** - Don't share it with others

## Testing EmailJS

To test if EmailJS is working:

1. Open the quiz application in your browser
2. Complete the quiz and submit
3. Check your email inbox (and spam folder)
4. You should receive an email with the quiz answers

If you don't receive an email, check the browser console (F12) for error messages.

## Next Steps

- Customize the email template to match your branding
- Add additional template variables if needed
- Test with different email providers
- Monitor your EmailJS usage in the dashboard (free tier has limits)

## Free Tier Limits

EmailJS offers a free tier with these limits:

- 200 emails per month
- Unlimited email templates
- Unlimited email services

If you exceed the free tier, you can upgrade to a paid plan in your EmailJS account settings.

## Support

For more information about EmailJS:

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS SDK Reference](https://www.emailjs.com/docs/sdk/send/)
- [EmailJS Support](https://www.emailjs.com/support/)
