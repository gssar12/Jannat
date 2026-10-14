import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserAnswer } from '../types';
import { X, CheckCircle2, Copy, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface AnswerSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: UserAnswer[];
}

export const AnswerSummaryModal: React.FC<AnswerSummaryModalProps> = ({
  isOpen,
  onClose,
  answers,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyReport = async () => {
    sound.playClick();
    const reportText = [
      '💌 اعترافات جنات لجسار 😭📝',
      '─────────────────────',
      ...answers.map(
        (ans, idx) =>
          `س${idx + 1}: ${ans.questionText}\n👈 جواب جنات: ${ans.selectedOptionText}\n🗣️ رد جسار: ${ans.reaction}\n`
      ),
      '─────────────────────',
      'صممه جسار لجنات · FOREVER & ALWAYS 🥀✨',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col text-right"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-900 mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">اعترافات جنات 😭📝</h3>
              <p className="text-xs text-neutral-400 mt-0.5">مسجلة رسميًا ولا يمكن التراجع عنها</p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of answers */}
          <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
            {answers.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-8">ما فيه إجابات مسجلة بعد!</p>
            ) : (
              answers.map((ans, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono">سؤال {idx + 1}</span>
                    <span className="flex items-center gap-1 text-neutral-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                      {ans.selectedOptionText}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-200">{ans.questionText}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-1 border-t border-neutral-800/50">
                    {ans.reaction}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer with Copy & Close */}
          <div className="pt-4 mt-2 border-t border-neutral-900 flex justify-between items-center text-[11px] text-neutral-400 gap-2">
            <span className="font-cinzel tracking-wider hidden sm:inline">JASAR × JANNAT</span>
            
            <div className="flex items-center gap-2 mr-auto sm:mr-0">
              {answers.length > 0 && (
                <button
                  onClick={handleCopyReport}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-xs cursor-pointer transition-colors flex items-center gap-1.5 border border-neutral-800"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>نسخ التقرير 📋</span>
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="px-4 py-1.5 rounded-xl bg-white text-black font-semibold text-xs cursor-pointer hover:bg-neutral-200 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
