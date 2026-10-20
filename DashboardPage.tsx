import React, { useState } from 'react';
import { useStore } from '../lib/store.ts';
import { 
  Trophy, 
  Target, 
  CheckCircle2, 
  Bookmark, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  User, 
  Sparkles, 
  Flame, 
  Settings,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
  onSelectProblem: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectProblem }) => {
  const { user, progress, problems, isBookmarked } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'saved'>('overview');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#190A35] border border-[#3B1D63] flex items-center justify-center mx-auto text-purple-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Kirish talab qilinadi</h2>
        <p className="text-purple-300 text-sm">
          Shaxsiy natijalar va profilni ko‘rish uchun tizimga kiring yoki ro‘yxatdan o‘ting.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="px-5 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold"
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/register')}
            className="px-5 py-2.5 bg-[#190A35] border border-[#3B1D63] text-purple-200 rounded-xl text-sm font-semibold"
          >
            Ro‘yxatdan o‘tish
          </button>
        </div>
      </div>
    );
  }

  const savedProblems = problems.filter((p) => isBookmarked(p.id));
  const recentSubmissions = progress?.submissions || [];
  const hasSubmissions = recentSubmissions.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-[#190A35] via-[#220B44] to-[#190A35] border border-[#3B1D63] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#A855F7] to-[#2563EB] flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-purple-900/40">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#7C3AED]/30 text-purple-200 border border-[#7C3AED]/50">
                  {user.group} guruhi
                </span>
              </div>
              <p className="text-purple-300 text-xs sm:text-sm mt-1">
                {user.grade}-sinf • {user.school || "Maktab belgilanmagan"} • {user.region || "O‘zbekiston"}
              </p>
              <p className="text-purple-400/80 text-xs mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/profile')}
              className="px-4 py-2 bg-[#14062B] hover:bg-[#250F4B] text-purple-200 hover:text-white border border-[#3B1D63] rounded-xl text-xs font-semibold transition flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>Profilni tahrirlash</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/problems')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-95 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-pink-200" />
              <span>Masala yechish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1: Attempted */}
        <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-400 font-medium block mb-1">
              Urinishlar (Masalalar)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {progress?.totalAttempted || 0}
            </div>
            <span className="text-[11px] text-purple-400 mt-1 block">Yechishga kirishilgan</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#251048] text-purple-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Solved */}
        <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-medium block mb-1">
              To‘liq yechilgan
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {progress?.solvedCount || 0}
            </div>
            <span className="text-[11px] text-purple-400 mt-1 block">To‘liq to‘g‘ri yechimlar</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: Accuracy */}
        <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-pink-400 font-medium block mb-1">
              Aniqlik foizi
            </span>
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#E879F9] font-mono">
              {progress?.accuracyPercentage || 0}%
            </div>
            <span className="text-[11px] text-purple-400 mt-1 block">
              {progress && progress.totalAttempted > 0
                ? "Muvaffaqiyat ko‘rsatkichi"
                : "Hali yetarli ma’lumot yo‘q"}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#290B44] text-pink-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Saved Bookmarks */}
        <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-400 font-medium block mb-1">
              Saqlangan masalalar
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
              {savedProblems.length}
            </div>
            <span className="text-[11px] text-purple-400 mt-1 block">Qayta ko‘rish uchun</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-950/60 text-blue-400 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Section Content with Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Submissions and Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#2C134E] pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>So‘nggi yechimlar va AI xulosalari</span>
              </h3>
              <span className="text-xs text-purple-400 font-mono">
                Jami: {recentSubmissions.length} ta
              </span>
            </div>

            {hasSubmissions ? (
              <div className="space-y-3">
                {recentSubmissions.map((sub) => {
                  const prob = problems.find((p) => p.id === sub.problemId);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        onSelectProblem(sub.problemId);
                        onNavigate(`/problems/${sub.problemId}`);
                      }}
                      className="p-4 bg-[#130728] hover:bg-[#1E0D3C] border border-[#2F1352] rounded-xl cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-purple-300">
                            {prob ? prob.title : "Matematik masala"}
                          </span>
                          <span className="text-[10px] text-purple-400">• {prob?.olympiadName}</span>
                        </div>
                        <div className="text-xs text-purple-400/80 mt-1 flex items-center gap-2">
                          <span>{new Date(sub.submittedAt).toLocaleString('uz-UZ')}</span>
                          <span>•</span>
                          <span className="capitalize">{sub.submissionType} format</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {sub.feedback && (
                          <div className="text-right">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              sub.feedback.category === 'To‘g‘ri yechim'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                : sub.feedback.category === 'Qisman to‘g‘ri'
                                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                            }`}>
                              {sub.feedback.category}
                            </span>
                            <span className="block text-xs font-mono font-bold text-pink-300 mt-1">
                              {sub.feedback.scoreEstimate}/{sub.feedback.maxScore} ball
                            </span>
                          </div>
                        )}
                        <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Attractive Empty State specified in prompt */
              <div className="text-center py-12 px-4 space-y-4 bg-[#14062B] rounded-xl border border-dashed border-[#3B1D63]">
                <div className="w-14 h-14 rounded-full bg-[#240F47] text-purple-300 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Hali masala yechmagansiz. Birinchi masalangizni boshlang!
                  </h4>
                  <p className="text-xs text-purple-300 max-w-sm mx-auto">
                    O‘zingizga yoqqan masalani tanlang, LaTeX muharriri yoki daftaringizdagi surat orqali yechim yuboring.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/problems')}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition"
                >
                  Birinchi masalani tanlash
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Saved Problems & Quick Shortcuts */}
        <div className="space-y-6">
          {/* Saved Bookmarks Widget */}
          <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2C134E] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-pink-400" />
                <span>Saqlangan masalalar ({savedProblems.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('/bookmarks')}
                className="text-xs text-purple-400 hover:text-white transition"
              >
                Barchasi
              </button>
            </div>

            {savedProblems.length > 0 ? (
              <div className="space-y-2">
                {savedProblems.slice(0, 4).map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => {
                      onSelectProblem(prob.id);
                      onNavigate(`/problems/${prob.id}`);
                    }}
                    className="p-3 bg-[#130728] hover:bg-[#1E0D3C] border border-[#2F1352] rounded-xl cursor-pointer transition text-xs space-y-1"
                  >
                    <div className="font-bold text-white truncate">{prob.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-purple-400">
                      <span>{prob.olympiadName}</span>
                      <span className="text-pink-300 font-semibold">{prob.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-purple-400/80 text-center py-4 italic">
                Saqlangan masalalar yo‘q.
              </p>
            )}
          </div>

          {/* Continue Learning Shortcuts */}
          <div className="bg-gradient-to-br from-[#200B44] to-[#14062B] border border-[#7C3AED]/40 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <TrendingUp className="w-4 h-4 text-pink-400" />
              <span>O‘rganishni davom ettirish</span>
            </div>
            <p className="text-xs text-purple-300 leading-relaxed">
              Siz {user.group} guruhida {user.grade}-sinf o‘quvchisisiz. Siz uchun tavsiya etilgan eng so‘nggi olimpiada masalalariga o‘ting.
            </p>
            <button
              type="button"
              onClick={() => onNavigate(`/problems?group=${user.group}`)}
              className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>{user.group} masalalariga o‘tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
