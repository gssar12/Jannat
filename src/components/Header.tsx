import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentStep: 'intro' | 'questions' | 'final';
  questionIndex?: number;
  totalQuestions?: number;
  onReset?: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  questionIndex = 0,
  totalQuestions = 6,
  onReset,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="w-full max-w-xl mx-auto px-4 sm:px-5 py-4 flex items-center justify-between text-neutral-400 select-none z-20">
      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <span className="font-cinzel tracking-[0.25em] sm:tracking-[0.3em] text-xs sm:text-sm text-neutral-200 font-semibold uppercase">
          JANNAT
        </span>
      </div>

      {/* Center status */}
      <div className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-400">
        {currentStep === 'questions' ? (
          <span>
            {String(questionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
          </span>
        ) : currentStep === 'final' ? (
          <span className="text-neutral-400 font-cinzel tracking-wider text-[11px]">JASAR × JANNAT</span>
        ) : null}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Prominent Music Toggle Badge */}
        <button
          data-audio-toggle="true"
          onClick={onToggleMusic}
          title={isMusicPlaying ? 'إيقاف صوت الأغنية' : 'تشغيل صوت الأغنية'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 ${
            isMusicPlaying
              ? 'bg-neutral-900 border-neutral-600 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
          }`}
          aria-label={isMusicPlaying ? 'إيقاف صوت الأغنية' : 'تشغيل صوت الأغنية'}
        >
          {isMusicPlaying ? (
            <>
              {/* Animated Mini Equalizer Bars */}
              <div className="flex items-end gap-[2px] h-3 shrink-0">
                <span className="w-[2px] bg-emerald-400 h-2 animate-pulse" />
                <span
                  className="w-[2px] bg-emerald-300 h-3 animate-pulse"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-[2px] bg-emerald-400 h-1.5 animate-pulse"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium">الأغنية شغالة</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-xs font-medium text-neutral-300">تشغيل الأغنية</span>
            </>
          )}
        </button>

        {/* Reset button */}
        {currentStep !== 'intro' && onReset && (
          <button
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            title="إعادة من البداية"
            className="p-1.5 sm:p-2 rounded-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="إعادة التجربة"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
