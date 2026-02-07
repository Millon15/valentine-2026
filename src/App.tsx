import { useReducer, useEffect } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { MultipleChoiceQuestion } from './components/MultipleChoiceQuestion';
import { HeartRatingQuestion } from './components/HeartRatingQuestion';
import { YesNoQuestion } from './components/YesNoQuestion';
import { EmojiReactionQuestion } from './components/EmojiReactionQuestion';
import { NavigationButtons } from './components/NavigationButtons';
import { ScoreReveal } from './components/ScoreReveal';
import { LoveLetter } from './components/LoveLetter';
import { ValentinePrompt } from './components/ValentinePrompt';
import { Footer } from './components/Footer';
import { questions } from './data/questions';
import { triggerCelebration } from './utils/confetti';
import { sendQuizAnswers, initializeEmailJS } from './utils/emailjs';
import { useQuizPersistence } from './hooks/useQuizPersistence';
import type { Question } from './types/Question';

type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine';

interface QuizState {
  step: Step;
  questionIndex: number;
  answers: string[];
  emailSent: boolean;
}

type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; letterSegment: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SHOW_SCORE' }
  | { type: 'SHOW_LETTER' }
  | { type: 'SHOW_VALENTINE' }
  | { type: 'MARK_EMAIL_SENT' }
  | { type: 'RESTORE_STATE'; state: QuizState }
  | { type: 'NAVIGATE_TO'; step: Step; questionIndex: number };

const initialState: QuizState = {
  step: 'intro',
  questionIndex: 0,
  answers: [],
  emailSent: false,
};

function getAnswerText(question: Question, letterSegment: string | undefined): string {
  if (!letterSegment) return '';
  for (const opt of question.options) {
    if (opt.letterSegment === letterSegment) {
      if ('text' in opt) return opt.text;
      if ('label' in opt) return `${opt.emoji} ${opt.label}`;
      if ('hearts' in opt) return `${'❤️'.repeat(opt.hearts)} (${opt.hearts}/5)`;
    }
  }
  return '';
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
       sessionStorage.removeItem('quiz-state');
       return {
         ...state,
         step: 'question',
         questionIndex: 0,
         answers: [],
         emailSent: false,
       };

    case 'ANSWER_QUESTION': {
       const newAnswers = [...state.answers];
       newAnswers[state.questionIndex] = action.letterSegment;

       // Auto-advance: if not the last question, move to next
       const isLastQuestion = state.questionIndex === questions.length - 1;
       
       return {
         ...state,
         answers: newAnswers,
         questionIndex: isLastQuestion ? state.questionIndex : state.questionIndex + 1,
         step: isLastQuestion ? 'score' : 'question',
         emailSent: state.emailSent,
       };
     }

    case 'NEXT_QUESTION':
      if (state.questionIndex < questions.length - 1) {
        return {
          ...state,
          questionIndex: state.questionIndex + 1,
          emailSent: state.emailSent,
        };
      }
      return {
        ...state,
        step: 'score',
        emailSent: state.emailSent,
      };

    case 'PREVIOUS_QUESTION':
      if (state.questionIndex > 0) {
        return {
          ...state,
          questionIndex: state.questionIndex - 1,
          emailSent: state.emailSent,
        };
      }
      return state;

    case 'SHOW_SCORE':
      return {
        ...state,
        step: 'score',
        emailSent: state.emailSent,
      };

    case 'SHOW_LETTER':
      return {
        ...state,
        step: 'letter',
        emailSent: state.emailSent,
      };

    case 'SHOW_VALENTINE':
      return {
        ...state,
        step: 'valentine',
        emailSent: state.emailSent,
      };

     case 'MARK_EMAIL_SENT':
       return { ...state, emailSent: true };

     case 'RESTORE_STATE':
       return action.state;

     case 'NAVIGATE_TO':
       return {
         ...state,
         step: action.step,
         questionIndex: action.questionIndex,
       };

     default:
       return state;
  }
}

export default function App() {
   const [state, dispatch] = useReducer(quizReducer, initialState);
   useQuizPersistence(state, dispatch);

   useEffect(() => {
     initializeEmailJS();
   }, []);

  const handleStart = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  const handleAnswer = (letterSegment: string) => {
    dispatch({ type: 'ANSWER_QUESTION', letterSegment });
  };

  const handleBack = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const currentQuestion = questions[state.questionIndex];
  const currentAnswer = state.answers[state.questionIndex] ?? null;

  // Render intro screen
  if (state.step === 'intro') {
    return <IntroScreen onStart={handleStart} />;
  }

  if (state.step === 'question' && currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col animate-[fadeIn_0.4s_ease-in] relative">
        <ProgressBar current={state.questionIndex + 1} total={questions.length} />
        
         <QuestionCard
           questionText={currentQuestion.question}
           videoSrc={currentQuestion.videoSrc}
         >
          {currentQuestion.type === 'multipleChoice' && (
            <MultipleChoiceQuestion
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'heartRating' && (
            <HeartRatingQuestion
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'yesNo' && (
            <YesNoQuestion
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'emojiReaction' && (
            <EmojiReactionQuestion
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          <NavigationButtons
            onBack={handleBack}
            showBack={state.questionIndex > 0}
            showNext={false}
          />
        </QuestionCard>
        <Footer />
      </div>
    );
  }

  if (state.step === 'score') {
    return (
      <>
        <ScoreReveal
          onContinue={async () => {
            await triggerCelebration();
            dispatch({ type: 'SHOW_LETTER' });
          }}
        />
        <Footer />
      </>
    );
  }

  if (state.step === 'letter') {
    return (
      <>
        <LoveLetter
          letterSegments={state.answers}
          onContinue={() => dispatch({ type: 'SHOW_VALENTINE' })}
        />
        <Footer />
      </>
    );
  }

  if (state.step === 'valentine') {
    return (
      <>
        <ValentinePrompt
          onYes={async (noCount: number) => {
            await triggerCelebration();

            if (state.emailSent) return;
            dispatch({ type: 'MARK_EMAIL_SENT' });

            const answersHtml = questions
              .map((q, i) => {
                const segment = state.answers[i];
                const answerText = getAnswerText(q, segment);
                return `<strong>${q.question}</strong><br/>${answerText || '\u2014'}`;
              })
              .join('<br/><br/>');

            const loveLetterText = [
              'Dear Tanya,',
              '',
              ...state.answers.filter(Boolean),
              '',
              'With all my love,',
              'Forever yours Vitas \u2764\uFE0F',
            ].join('\n');

            try {
              await sendQuizAnswers({
                user_name: 'Tanya',
                answers: answersHtml,
                love_letter: loveLetterText,
                no_count: String(noCount),
                timestamp: new Date().toISOString(),
              });
            } catch (error) {
              console.error('Failed to send quiz answers:', error);
            }
          }}
        />
        <Footer />
      </>
    );
  }

  return null;
}
