export interface VariantConfig {
  background: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  shadowColor: string;
  pattern?: string;
}

export const questionVariants: Record<string, VariantConfig> = {
  'gradient-rose': {
    background: 'bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/90 backdrop-blur-sm dark:bg-white/[0.07]',
    textColor: 'text-rose-900 dark:text-rose-100',
    accentColor: 'bg-rose-500 hover:bg-rose-600',
    borderColor: 'border-rose-300 dark:border-white/[0.12]',
    shadowColor: 'shadow-rose-200/50 dark:shadow-black/30',
    pattern: 'bg-[radial-gradient(circle_at_30%_20%,rgba(255,228,230,0.4)_0%,transparent_50%)]',
  },
  'hearts-pattern': {
    background: 'bg-gradient-to-tr from-red-50 via-pink-100 to-red-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/95 backdrop-blur-md dark:bg-white/[0.07]',
    textColor: 'text-red-900 dark:text-rose-100',
    accentColor: 'bg-red-500 hover:bg-red-600',
    borderColor: 'border-red-200 dark:border-white/[0.12]',
    shadowColor: 'shadow-red-300/40 dark:shadow-black/30',
    pattern: 'bg-[url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 30c-5-5-10-10-10-15 0-3 2-5 5-5 2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 2 5 5 0 5-5 10-10 15z\' fill=\'%23fecdd3\' opacity=\'0.3\'/%3E%3C/svg%3E")]',
  },
  'romantic-purple': {
    background: 'bg-gradient-to-bl from-purple-100 via-fuchsia-50 to-purple-200 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/85 backdrop-blur-lg dark:bg-white/[0.07]',
    textColor: 'text-purple-900 dark:text-rose-100',
    accentColor: 'bg-purple-600 hover:bg-purple-700',
    borderColor: 'border-purple-300 dark:border-white/[0.12]',
    shadowColor: 'shadow-purple-300/50 dark:shadow-black/30',
    pattern: 'bg-[radial-gradient(ellipse_at_70%_80%,rgba(216,180,254,0.3)_0%,transparent_60%)]',
  },
  'pastel-dream': {
    background: 'bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/80 backdrop-blur-xl dark:bg-white/[0.07]',
    textColor: 'text-indigo-900 dark:text-rose-100',
    accentColor: 'bg-pink-400 hover:bg-pink-500',
    borderColor: 'border-pink-200 dark:border-white/[0.12]',
    shadowColor: 'shadow-indigo-200/40 dark:shadow-black/30',
    pattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(251,207,232,0.4)_0%,rgba(224,231,255,0.4)_100%)]',
  },
  'love-bubbles': {
    background: 'bg-gradient-to-tl from-rose-200 via-pink-100 to-orange-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/90 backdrop-blur-md dark:bg-white/[0.07]',
    textColor: 'text-orange-900 dark:text-rose-100',
    accentColor: 'bg-orange-500 hover:bg-orange-600',
    borderColor: 'border-orange-200 dark:border-white/[0.12]',
    shadowColor: 'shadow-orange-300/40 dark:shadow-black/30',
    pattern: 'bg-[radial-gradient(circle_at_20%_30%,rgba(254,215,170,0.5)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(254,205,211,0.5)_0%,transparent_40%)]',
  },
  'soft-crimson': {
    background: 'bg-gradient-to-br from-red-100 via-rose-100 to-pink-200 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/92 backdrop-blur-sm dark:bg-white/[0.07]',
    textColor: 'text-red-800 dark:text-rose-100',
    accentColor: 'bg-red-600 hover:bg-red-700',
    borderColor: 'border-red-300 dark:border-white/[0.12]',
    shadowColor: 'shadow-red-400/30 dark:shadow-black/30',
    pattern: 'bg-[linear-gradient(135deg,rgba(254,202,202,0.3)_25%,transparent_25%,transparent_50%,rgba(254,202,202,0.3)_50%,rgba(254,202,202,0.3)_75%,transparent_75%,transparent)] bg-[length:20px_20px]',
  },
  'golden-glow': {
    background: 'bg-gradient-to-tr from-amber-100 via-yellow-50 to-orange-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950',
    cardBg: 'bg-white/88 backdrop-blur-lg dark:bg-white/[0.07]',
    textColor: 'text-amber-900 dark:text-rose-100',
    accentColor: 'bg-amber-500 hover:bg-amber-600',
    borderColor: 'border-amber-300 dark:border-white/[0.12]',
    shadowColor: 'shadow-amber-400/40 dark:shadow-black/30',
    pattern: 'bg-[radial-gradient(circle_at_40%_40%,rgba(252,211,77,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.2)_0%,transparent_40%)]',
  },
};
