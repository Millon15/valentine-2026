import { useReducer, useEffect } from 'react';
import { IntroScreen } from './components/IntroScreen';
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
import { JourneyIndicator } from './components/JourneyIndicator';
import { questions } from '../config/content';
import { triggerCelebration } from './utils/confetti';
import { sendQuizAnswers, initializeEmailJS } from './utils/emailjs';
import { useQuizPersistence } from './hooks/useQuizPersistence';
import { useQuizNavigation } from './hooks/useQuizNavigation';
import { config } from '../config/config';
import type { Question } from './types/Question';

type Step = 'intro' | 'question' | 'score' | 'letter' | 'valentine';

interface QuizState {
  step: Step;
  questionIndex: number;
  answers: string[];
  emailSent: boolean;
  reachedEnd: boolean;
  yesClicked: boolean;
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
  | { type: 'MARK_YES_CLICKED' }
  | { type: 'RESTORE_STATE'; state: QuizState }
  | { type: 'NAVIGATE_TO'; step: Step; questionIndex: number };

const initialState: QuizState = {
  step: 'intro',
  questionIndex: 0,
  answers: [],
  emailSent: false,
  reachedEnd: false,
  yesClicked: false,
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
         reachedEnd: false,
         yesClicked: false,
       };

    case 'ANSWER_QUESTION': {
       const newAnswers = [...state.answers];
       newAnswers[state.questionIndex] = action.letterSegment;

       return {
         ...state,
         answers: newAnswers,
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
        reachedEnd: true,
        emailSent: state.emailSent,
      };

     case 'MARK_EMAIL_SENT':
       return { ...state, emailSent: true };

     case 'MARK_YES_CLICKED':
       return { ...state, yesClicked: true };

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
   useQuizNavigation(state, dispatch);

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

  const handleAdvance = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleJourneyNavigate = (step: 'intro' | 'question' | 'score' | 'letter' | 'valentine') => {
    if (step === 'question') {
      dispatch({ type: 'NAVIGATE_TO', step: 'question', questionIndex: questions.length - 1 });
    } else {
      dispatch({ type: 'NAVIGATE_TO', step, questionIndex: 0 });
    }
  };

  const journeyNav = state.reachedEnd ? handleJourneyNavigate : undefined;

  const currentQuestion = questions[state.questionIndex];
  const currentAnswer = state.answers[state.questionIndex] ?? null;

  // Render intro screen
  if (state.step === 'intro') {
    return (
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <JourneyIndicator currentStep={state.step} onNavigate={journeyNav} />
        <IntroScreen onStart={handleStart} />
      </div>
    );
  }

  if (state.step === 'question' && currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col animate-[fadeIn_0.4s_ease-in] relative">
        <JourneyIndicator currentStep={state.step} onNavigate={journeyNav} progress={{ current: state.questionIndex + 1, total: questions.length }} />

         <QuestionCard
           questionText={currentQuestion.question}
           videoSrc={currentQuestion.videoSrc}
           designVariant={currentQuestion.designVariant}
         >
          {currentQuestion.type === 'multipleChoice' && (
            <MultipleChoiceQuestion
              key={state.questionIndex}
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'heartRating' && (
            <HeartRatingQuestion
              key={state.questionIndex}
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'yesNo' && (
            <YesNoQuestion
              key={state.questionIndex}
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'emojiReaction' && (
            <EmojiReactionQuestion
              key={state.questionIndex}
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          )}

          <NavigationButtons
            onBack={handleBack}
            onNext={handleAdvance}
            showBack={state.questionIndex > 0}
            showNext={true}
            nextDisabled={currentAnswer === null}
          />
        </QuestionCard>
        <Footer />
      </div>
    );
  }

  if (state.step === 'score') {
    return (
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <JourneyIndicator currentStep={state.step} onNavigate={journeyNav} />
        <ScoreReveal
          onContinue={async () => {
            await triggerCelebration();
            dispatch({ type: 'SHOW_LETTER' });
          }}
        />
        <Footer />
      </div>
    );
  }

  if (state.step === 'letter') {
    return (
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <JourneyIndicator currentStep={state.step} onNavigate={journeyNav} />
        <LoveLetter
          letterSegments={state.answers}
          onContinue={() => dispatch({ type: 'SHOW_VALENTINE' })}
        />
        <Footer />
      </div>
    );
  }

  if (state.step === 'valentine') {
    return (
      <div className="animate-[fadeIn_0.5s_ease-out]">
        <JourneyIndicator currentStep={state.step} onNavigate={journeyNav} />
        <ValentinePrompt
          hideNoButton={state.yesClicked}
          onYes={async (noCount: number) => {
            dispatch({ type: 'MARK_YES_CLICKED' });
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
              `Dear ${config.recipientName},`,
              '',
              ...state.answers.filter(Boolean),
              '',
              config.loveLetter.closing,
              `${config.loveLetter.signaturePrefix} ${config.senderName} \u2764\uFE0F`,
            ].join('\n');

            try {
              await sendQuizAnswers({
                user_name: config.recipientName,
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
      </div>
    );
  }

  return null;
}
