import React from 'react';
import { AiEvaluationFeedback } from '../types/index.ts';
import { MathView } from './MathView.tsx';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Target, 
  ArrowRight, 
  ShieldAlert,
  Bot
} from 'lucide-react';

interface AiFeedbackCardProps {
  feedback: AiEvaluationFeedback;
}

export const AiFeedbackCard: React.FC<AiFeedbackCardProps> = ({ feedback }) => {
  const getCategoryConfig = () => {
    switch (feedback.category) {
      case 'To‘g‘ri yechim':
        return {
          icon: CheckCircle,
          colorClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/50',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          title: 'To‘g‘ri yechim! Ajoyib natija!',
        };
      case 'Qisman to‘g‘ri':
        return {
          icon: AlertTriangle,
          colorClass: 'text-amber-400 bg-amber-950/40 border-amber-500/50',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          title: 'Qisman to‘g‘ri yechim',
        };
      case 'Xato bor':
        return {
          icon: XCircle,
          colorClass: 'text-rose-400 bg-rose-950/40 border-rose-500/50',
          badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          title: 'Yechimda mantiqiy yoki hisoblash xatosi aniqlandi',
        };
      case 'Tekshirish uchun ma’lumot yetarli emas':
      default:
        return {
          icon: HelpCircle,
          colorClass: 'text-purple-400 bg-purple-950/40 border-purple-500/50',
          badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          title: 'Tekshirish uchun ma’lumot yetarli emas',
        };
    }
  };

  const config = getCategoryConfig();
  const IconComponent = config.icon;

  return (
    <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-6 shadow-2xl space-y-6 glow-purple-sm">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2C134E]">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${config.colorClass}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${config.badgeClass}`}>
                {feedback.category}
              </span>
              <span className="text-xs text-purple-400 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                {feedback.modelUsed}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{config.title}</h3>
          </div>
        </div>

        {/* Score Pill */}
        <div className="bg-[#130728] border border-[#3B1D63] px-5 py-3 rounded-xl flex items-center gap-3 self-start md:self-auto">
          <div className="text-right">
            <span className="text-xs text-purple-400 block font-medium">Baholash mezoni</span>
            <span className="text-xs text-purple-300">IMO Rubrika</span>
          </div>
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#E879F9]">
            {feedback.scoreEstimate} / {feedback.maxScore}
          </div>
        </div>
      </div>

      {/* Overall Assessment */}
      <div className="space-y-2">
        <h4 className="text-xs uppercase font-bold tracking-wider text-purple-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-400" />
          Umumiy xulosa va tahlil
        </h4>
        <div className="text-purple-100 text-sm leading-relaxed bg-[#120626] p-4 rounded-xl border border-[#2D1452]">
          <MathView content={feedback.overallAssessment} />
        </div>
      </div>

      {/* Correct Reasoning Steps */}
      {feedback.correctReasoningSteps && feedback.correctReasoningSteps.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            To‘g‘ri olib borilgan qadamlar:
          </h4>
          <ul className="space-y-2">
            {feedback.correctReasoningSteps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-purple-200 bg-[#14062B]/60 p-3 rounded-lg border border-emerald-900/30"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <MathView content={step} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* First Important Error & Explanation */}
      {feedback.firstImportantError && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Asosiy xato joyi:</span>
          </div>
          <div className="text-sm text-rose-200 bg-rose-950/40 p-3 rounded-lg border border-rose-900/50">
            <MathView content={feedback.firstImportantError} />
          </div>

          {feedback.errorExplanation && (
            <div className="text-xs text-purple-200 space-y-1">
              <span className="font-semibold text-rose-300">Nega bu xato?</span>
              <p className="leading-relaxed">
                <MathView content={feedback.errorExplanation} />
              </p>
            </div>
          )}

          {feedback.correctionSuggestion && (
            <div className="text-xs text-purple-200 bg-[#16062E] p-3 rounded-lg border border-[#7C3AED]/40 space-y-1">
              <span className="font-semibold text-pink-300">Qanday to‘g‘rilash tavsiya etiladi:</span>
              <p className="leading-relaxed">
                <MathView content={feedback.correctionSuggestion} />
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recommended Next Step */}
      {feedback.recommendedNextStep && (
        <div className="flex items-start gap-3 p-3.5 bg-gradient-to-r from-[#200B44] to-[#160830] border border-[#7C3AED]/40 rounded-xl text-xs text-purple-200">
          <Target className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Tavsiya etiladigan keyingi qadam:</span>
            <MathView content={feedback.recommendedNextStep} />
          </div>
        </div>
      )}

      {/* Confidence & Official Disclaimer Notice */}
      <div className="pt-3 border-t border-[#291349] flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-400 gap-2">
        <span>
          AI ishonch darajasi: <strong className="text-purple-200">{Math.round(feedback.confidence * 100)}%</strong>
          {feedback.uncertaintyNotes && ` (${feedback.uncertaintyNotes})`}
        </span>
        <span className="italic text-purple-400/80">
          * Ushbu baho sun’iy intellekt tomonidan hisoblangan va rasmiy olimpiada natijasi hisoblanmaydi.
        </span>
      </div>
    </div>
  );
};
