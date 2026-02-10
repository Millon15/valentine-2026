import { config } from '../config';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 pointer-events-none z-0">
      <p className="text-center text-xs text-rose-400 opacity-40 py-2">
        Made with love by {config.senderName} for {config.recipientName} 💕
      </p>
    </footer>
  );
}
