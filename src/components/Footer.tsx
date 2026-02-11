import { config } from '../../config/config';

export function Footer() {
  const footerText = config.footer.text
    .replace('{sender}', config.senderName)
    .replace('{recipient}', config.recipientName);

  return (
    <footer className="fixed bottom-0 left-0 right-0 pointer-events-none z-0">
      <p className="text-center text-xs text-rose-400 opacity-40 dark:text-rose-500/40 dark:opacity-100 py-2">
        {footerText} 💕
      </p>
    </footer>
  );
}
