export type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine';

export interface QuizState {
  step: Step;
  questionIndex: number;
  answers: string[];
  emailSent: boolean;
  reachedEnd: boolean;
  yesClicked: boolean;
}

export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; letterSegment: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SHOW_SCORE' }
  | { type: 'SHOW_LETTER' }
  | { type: 'SHOW_VALENTINE' }
  | { type: 'MARK_EMAIL_SENT' }
  | { type: 'MARK_YES_CLICKED' }
  | { type: 'RESTORE_STATE'; state: QuizState }
  | { type: 'NAVIGATE_TO'; step: Step; questionIndex: number };
