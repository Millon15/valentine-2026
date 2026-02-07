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
  | { type: 'SHOW_VALENTINE' };

const initialState: QuizState = {
  step: 'intro',
  questionIndex: 0,
  answers: [],
  emailSent: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
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

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleStart = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  const handleAnswer = async (letterSegment: string) => {
    dispatch({ type: 'ANSWER_QUESTION', letterSegment });
    
    const isLastQuestion = state.questionIndex === questions.length - 1;
    if (isLastQuestion) {
      try {
        const newAnswers = [...state.answers];
        newAnswers[state.questionIndex] = letterSegment;
        
        await sendQuizAnswers({
          user_name: 'Tanya',
          user_email: 'tanya@example.com',
          answers: JSON.stringify(newAnswers),
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to send quiz answers:', error);
      }
    }
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
          onYes={async () => {
            await triggerCelebration();
          }}
        />
        <Footer />
      </>
    );
  }

  return null;
}
