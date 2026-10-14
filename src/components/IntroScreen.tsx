import React from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import { ArrowLeft } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    sound.playClick();
    onStart();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-lg mx-auto w-full relative z-10 py-12">
      {/* Subtle ambient spotlight behind title */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

      {/* Main Title: JANNAT */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative"
      >
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-neutral-400 block mb-3">
          تجربة خاصة جداً
        </span>
        <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-[0.25em] text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.08)]">
          JANNAT
        </h1>
        <div className="w-16 h-[1px] bg-neutral-800 mx-auto mt-6" />
      </motion.div>

      {/* Intro Subtitle 1 */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg sm:text-xl font-medium text-neutral-200 mb-3 tracking-wide"
      >
        «يوه مين دخلت عندنا 😭🙏🏼»
      </motion.p>

      {/* Intro Subtitle 2 */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm sm:text-base text-neutral-400 mb-6 leading-relaxed"
      >
        «عندي لك كم سؤال، جاوبي بصدق بس 😔🥀»
      </motion.p>

      {/* Soundtrack label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-400 mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-pulse" />
        <span className="font-cinzel tracking-wider text-neutral-300">Where Are You Now</span>
        <span className="text-neutral-600">·</span>
        <span>أغنية خاصة</span>
      </motion.div>

      {/* Action Button: يلا ادخلي */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xs"
      >
        <button
          onClick={handleStart}
          className="group relative w-full py-4 px-6 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/60 hover:border-neutral-500 text-white font-medium text-base transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 overflow-hidden"
        >
          {/* Subtle button sheen highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
          <span>يلا ادخلي</span>
          <ArrowLeft className="w-4 h-4 text-neutral-400 group-hover:-translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] text-neutral-400 mt-4 tracking-wider">
          صممه جسار لجنات · تجربة هادية وسينمائية
        </p>
      </motion.div>
    </div>
  );
};
