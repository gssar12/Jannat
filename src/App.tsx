import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { QUESTIONS_DATA } from './data/questions';
import { Option, UserAnswer } from './types';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { FinalScreen } from './components/FinalScreen';
import { AnswerSummaryModal } from './components/AnswerSummaryModal';
import { sound } from './utils/audio';

type AppStep = 'intro' | 'questions' | 'final';

export default function App() {
  const [step, setStep] = useState<AppStep>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      audioRef.current.muted = false;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMusicPlaying(true);
          })
          .catch(() => {
            // Autoplay was prevented by browser policy, waiting for user gesture
          });
      }
    }
  };

  const toggleMusic = () => {
    sound.playClick();
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.volume = 0.9;
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => console.log('Audio error:', err));
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  // Start background music seamlessly on load or on very first screen interaction
  useEffect(() => {
    playMusic();

    const handleFirstTouch = (e: Event) => {
      // If user clicked directly on the audio toggle badge, let the button handle it
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-audio-toggle]')) {
        return;
      }

      playMusic();

      // Once interacted, clean up window listeners
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach((eventName) => {
        window.removeEventListener(eventName, handleFirstTouch);
      });
    };

    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach((eventName) => {
      window.addEventListener(eventName, handleFirstTouch, { passive: true });
    });

    return () => {
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach((eventName) => {
        window.removeEventListener(eventName, handleFirstTouch);
      });
    };
  }, []);

  const handleStart = () => {
    playMusic();
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setStep('questions');
  };

  const handleAnswerSelected = (selectedOption: Option) => {
    // If music isn't playing yet, ensure it plays on answering
    playMusic();

    const currentQ = QUESTIONS_DATA[currentQuestionIdx];
    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      selectedOptionText: selectedOption.text,
      reaction: selectedOption.reaction,
    };

    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== currentQ.id);
      return [...filtered, newAnswer];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < QUESTIONS_DATA.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setStep('final');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setStep('intro');
  };

  return (
    <div className="min-h-screen bg-[#050507] text-neutral-100 flex flex-col justify-between relative overflow-hidden cinematic-vignette pb-8 sm:pb-10">
      {/* Background audio element directly managed in the DOM */}
      <audio
        ref={audioRef}
        src="/audio/where_are_you_now.mp3"
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      {/* Subtle ambient lighting orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-neutral-800/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-neutral-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Persistent Minimal Header */}
      <Header
        currentStep={step}
        questionIndex={currentQuestionIdx}
        totalQuestions={QUESTIONS_DATA.length}
        onReset={step !== 'intro' ? handleRestart : undefined}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro-screen"
              className="w-full flex-1 flex flex-col justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <IntroScreen onStart={handleStart} />
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div
              key={`question-${currentQuestionIdx}`}
              className="w-full flex-1 flex flex-col justify-center items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionScreen
                questionData={QUESTIONS_DATA[currentQuestionIdx]}
                questionIndex={currentQuestionIdx}
                totalQuestions={QUESTIONS_DATA.length}
                onAnswerSelected={handleAnswerSelected}
                onNext={handleNextQuestion}
              />
            </motion.div>
          )}

          {step === 'final' && (
            <motion.div
              key="final-screen"
              className="w-full flex-1 flex flex-col justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FinalScreen
                answers={answers}
                onRestart={handleRestart}
                onOpenAnswersModal={() => setIsAnswersModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal for reviewing saved answers */}
      <AnswerSummaryModal
        isOpen={isAnswersModalOpen}
        onClose={() => setIsAnswersModalOpen(false)}
        answers={answers}
      />
    </div>
  );
}
