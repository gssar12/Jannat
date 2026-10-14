import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Option, QuestionItem } from '../types';
import { sound } from '../utils/audio';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

interface QuestionScreenProps {
  questionData: QuestionItem;
  questionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (option: Option) => void;
  onNext: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  questionData,
  questionIndex,
  totalQuestions,
  onAnswerSelected,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [shouldShake, setShouldShake] = useState(false);

  const handleSelect = (option: Option) => {
    if (selectedOption) return; // Prevent double taps during reaction

    setSelectedOption(option);
    onAnswerSelected(option);

    // If answer is sassy / playful banter, play comedic wobble and add shake
    if (
      option.text.includes('لا') ||
      option.text.includes('تكفى') ||
      option.text.includes('خلصنا')
    ) {
      sound.playCheekyWobble();
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
    } else {
      sound.playSelect();
    }
  };

  const handleContinue = () => {
    sound.playWhoosh();
    setSelectedOption(null);
    onNext();
  };

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full relative z-10 py-8 ${
        shouldShake ? 'animate-playful-shake' : ''
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neutral-800/15 rounded-full blur-3xl pointer-events-none" />

      {/* Question Counter Pill-free indicator */}
      <div className="flex items-center gap-2 mb-6 text-neutral-400 text-xs font-mono tracking-widest">
        <span>السؤال {String(questionIndex + 1).padStart(2, '0')}</span>
        <span className="text-neutral-500">/</span>
        <span>{String(totalQuestions).padStart(2, '0')}</span>
      </div>

      {/* Progress Bar line */}
      <div className="w-full max-w-xs h-[2px] bg-neutral-900 rounded-full mb-10 overflow-hidden">
        <motion.div
          className="h-full bg-neutral-500"
          initial={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
          animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question Text */}
      <motion.div
        key={`q-${questionData.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10 w-full"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide leading-relaxed">
          {questionData.question}
        </h2>
      </motion.div>

      {/* Question Options or Reaction view */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        {questionData.options.map((option, idx) => {
          const isSelected = selectedOption?.id === option.id;
          const isOther = selectedOption && !isSelected;

          return (
            <motion.button
              key={option.id}
              disabled={selectedOption !== null}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: isOther ? 0.35 : 1,
                y: 0,
                scale: isSelected ? 1.02 : 1,
              }}
              transition={{
                duration: 0.4,
                delay: selectedOption ? 0 : 0.15 * (idx + 1),
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => handleSelect(option)}
              className={`w-full py-4 px-6 rounded-2xl text-right transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                isSelected
                  ? 'bg-neutral-800 border-neutral-400 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                  : 'bg-neutral-950/80 hover:bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 text-neutral-200'
              } ${selectedOption && !isSelected ? 'cursor-not-allowed opacity-40' : 'active:scale-[0.98]'}`}
            >
              <span className="text-base sm:text-lg font-medium">{option.text}</span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-white bg-white text-black'
                    : 'border-neutral-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Reaction Box */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm mt-8"
          >
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 text-center relative overflow-hidden backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
              
              <div className="flex items-center justify-center gap-1.5 text-neutral-400 text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>رد جسار:</span>
              </div>

              <p className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed mb-5">
                {selectedOption.reaction}
              </p>

              {/* Continue Button: كملي */}
              <button
                onClick={handleContinue}
                className="w-full py-3 px-5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-md"
              >
                <span>{questionIndex === totalQuestions - 1 ? 'المفاجأة الأخيرة...' : 'كملي'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
