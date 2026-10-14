import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DEFAULT_PERSONAL_MESSAGE } from '../data/questions';
import { UserAnswer } from '../types';
import { sound } from '../utils/audio';
import { Edit3, Check, RotateCcw, ListChecks } from 'lucide-react';

interface FinalScreenProps {
  answers: UserAnswer[];
  onRestart: () => void;
  onOpenAnswersModal: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  answers,
  onRestart,
  onOpenAnswersModal,
}) => {
  // Allow Jasar to personalize the message easily directly in the UI or in data/questions.ts
  const [personalMessage, setPersonalMessage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jannat_jasar_custom_message');
      if (saved) return saved;
    }
    return DEFAULT_PERSONAL_MESSAGE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempMessage, setTempMessage] = useState(personalMessage);

  useEffect(() => {
    sound.playRevealTone();
  }, []);

  const saveCustomMessage = () => {
    setPersonalMessage(tempMessage);
    setIsEditing(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jannat_jasar_custom_message', tempMessage);
    }
    sound.playClick();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-xl mx-auto w-full relative z-10 py-12">
      {/* Soft atmospheric gradient in deep pure black */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-800/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Step 1: «طيب يا جنات، بعيدًا عن الطقطقة شوي 😔🙏🏼» */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg text-neutral-400 font-medium mb-4"
      >
        «طيب يا جنات، بعيدًا عن الطقطقة شوي 😔🙏🏼»
      </motion.p>

      {/* Step 2: «سويت لك الموقع ذا بنفسي، بس عشانك أنتِ.» */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-wide"
      >
        «سويت لك الموقع ذا بنفسي، بس عشانك أنتِ.»
      </motion.p>

      {/* Step 3: «ومهما طقطشنا وضحكنا، فيه شيء واحد أبيك تعرفينه...» */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm sm:text-base text-neutral-300 mb-8 max-w-md mx-auto leading-relaxed"
      >
        «ومهما طقطشنا وضحكنا، فيه شيء واحد أبيك تعرفينه...»
      </motion.p>

      {/* Step 4: The Personal Letter / Message Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg mb-8 relative"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950/90 border border-neutral-800 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-right relative group">
          {/* Subtle accent bar at top of card */}
          <div className="absolute top-0 right-10 left-10 h-[1px] bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />

          {/* Discreet Edit toggle for Jasar */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/80">
            <span className="text-xs font-mono tracking-wider text-neutral-400">
              رسالة خاصة · PERSONAL NOTE
            </span>
            <button
              onClick={() => {
                setTempMessage(personalMessage);
                setIsEditing(!isEditing);
              }}
              title="تعديل الرسالة (خاص بجسار)"
              className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer flex items-center gap-1 text-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'إلغاء' : 'تعديل النص'}</span>
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={tempMessage}
                onChange={(e) => setTempMessage(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-neutral-400 leading-relaxed"
                placeholder="اكتب رسالتك لجنات هنا..."
                dir="rtl"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveCustomMessage}
                  className="px-4 py-1.5 text-xs bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>حفظ الرسالة</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal whitespace-pre-line tracking-wide">
              {personalMessage}
            </p>
          )}
        </div>
      </motion.div>

      {/* Step 5: «المهم لا تتكبرين علينا بعد الموقع ذا 😭🥀» */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 5.0, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg font-medium text-neutral-300 mb-10"
      >
        «المهم لا تتكبرين علينا بعد الموقع ذا 😭🥀»
      </motion.p>

      {/* Actions: View Answers Recap & Restart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 5.8 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-14"
      >
        <button
          onClick={() => {
            sound.playClick();
            onOpenAnswersModal();
          }}
          className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <ListChecks className="w-4 h-4 text-neutral-400" />
          <span>شوفي إجاباتك ({answers.length}) 😭</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
          <span>عيدي التجربة من الأول 🥀</span>
        </button>
      </motion.div>

      {/* Step 6: Bottom Signature: JASAR × JANNAT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 6.3, ease: [0.16, 1, 0.3, 1] }}
        className="pt-6 border-t border-neutral-900 w-full max-w-xs"
      >
        <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.35em] text-neutral-300 uppercase">
          JASAR × JANNAT
        </h3>
        <p className="text-[11px] font-mono text-neutral-400 mt-2 tracking-widest uppercase">
          FOREVER & ALWAYS
        </p>
      </motion.div>
    </div>
  );
};
