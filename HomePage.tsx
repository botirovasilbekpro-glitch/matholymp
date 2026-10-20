import React, { useState } from 'react';
import { HeroIllustration } from '../components/HeroIllustration.tsx';
import { AuthGuardModal } from '../components/AuthGuardModal.tsx';
import { useStore } from '../lib/store.ts';
import { 
  BookOpen, 
  Trophy, 
  Sparkles, 
  Cpu, 
  Database, 
  LineChart, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  Camera,
  School
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectGroupFilter: (group: 'Junior' | 'Senior') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectGroupFilter }) => {
  const { user } = useStore();
  const [authGuardOpen, setAuthGuardOpen] = useState(false);
  const [targetFeatureName, setTargetFeatureName] = useState("Olimpiadalar va masalalar");

  // Intercept navigation for unauthenticated guests
  const handleProtectedNavigate = (path: string, featureName: string) => {
    if (!user) {
      setTargetFeatureName(featureName);
      setAuthGuardOpen(true);
      return;
    }
    onNavigate(path);
  };

  const handleJuniorClick = () => {
    if (!user) {
      setTargetFeatureName("Junior (5–8 sinflar) bo‘limi");
      setAuthGuardOpen(true);
      return;
    }
    onSelectGroupFilter('Junior');
    onNavigate('/problems?group=Junior');
  };

  const handleSeniorClick = () => {
    if (!user) {
      setTargetFeatureName("Senior (9–11 sinflar) bo‘limi");
      setAuthGuardOpen(true);
      return;
    }
    onSelectGroupFilter('Senior');
    onNavigate('/problems?group=Senior');
  };

  return (
    <div className="space-y-24">
      {/* ============================================================ */}
      {/* B. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative pt-8 pb-12 lg:pt-16 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side text */}
            <div className="space-y-6 text-left">
              {/* Creator & Platform badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F0A3E] border border-[#7C3AED]/50 text-purple-200 text-xs font-semibold tracking-wide shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Matematika olimpiadalariga tayyorlanish platformasi</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 text-purple-300 text-[11px] font-medium">
                  <School className="w-3 h-3 text-pink-300" />
                  <span>Asilbek Botirov • Mirzo Ulug‘bek maktabi 9-sinf</span>
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Matematikada{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#E879F9] to-[#2563EB]">
                  chegaralarni
                </span>{' '}
                zabt et!
              </h1>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate(user ? '/problems' : '/register')}
                  className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#E879F9] hover:opacity-95 transition-all shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 active:scale-98 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{user ? "Masalalarga o‘tish" : "Ro‘yxatdan o‘tish"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleProtectedNavigate('/olympiads', 'Olimpiadalar katalogi')}
                  className="px-7 py-3.5 rounded-xl text-base font-bold text-purple-200 hover:text-white bg-[#190A35] hover:bg-[#230E4A] border border-[#3B1D63] hover:border-[#7C3AED] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span>Olimpiadalarni ko‘rish</span>
                </button>
              </div>

              {/* Quick trust metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2A114D] max-w-lg">
                <div>
                  <div className="text-xl font-black text-white font-mono">100%</div>
                  <div className="text-[11px] text-purple-300">Rasmiy masalalar</div>
                </div>
                <div>
                  <div className="text-xl font-black text-pink-400 font-mono">📸 Rasm</div>
                  <div className="text-[11px] text-purple-300">Daftardagi yechimni tekshirish</div>
                </div>
                <div>
                  <div className="text-xl font-black text-emerald-400 font-mono">AI</div>
                  <div className="text-[11px] text-purple-300">Bosqichma-bosqich tahlil</div>
                </div>
              </div>
            </div>

            {/* Right side 3D math illustration */}
            <div className="relative">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PLATFORM CREATOR BANNER: Asilbek Botirov                      */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1E093D] via-[#2A0F52] to-[#16062A] border-2 border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#E879F9]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#E879F9] to-[#2563EB] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-xl shadow-purple-950/60 shrink-0">
                AB
              </div>
              <div className="space-y-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Asilbek Botirov
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Loyiha Asoschisi & Bosh Ma’muri
                  </span>
                </div>
                <p className="text-purple-200 text-xs sm:text-sm font-medium">
                  Mirzo Ulug‘bek nomidagi ixtisoslashtirilgan maktab • 9-sinf o‘quvchisi
                </p>
                <p className="text-purple-300/80 text-xs max-w-2xl leading-relaxed">
                  Ushbu platforma O‘zbekiston maktab o‘quvchilarining matematika olimpiadalariga tayyorgarligini yangi bosqichga olib chiqish, daftarga yozilgan yechimlarni sun’iy intellekt orqali tekshirish va xalqaro musobaqalarga munosib bilim berish uchun ishlab chiqilgan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {user?.role === 'admin' ? (
                <button
                  type="button"
                  onClick={() => onNavigate('/admin')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xs shadow-lg transition flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Boshqaruviga o‘tish</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="px-4 py-2.5 rounded-xl bg-[#120626] border border-[#3B1D63] hover:border-[#7C3AED] text-purple-200 hover:text-white text-xs font-semibold transition"
                >
                  Asilbek Botirov (Admin kirish)
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* C. JUNIOR AND SENIOR SECTION                                 */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight mb-3">
            Qaysi guruhdansiz?
          </h2>
          <p className="text-purple-300 text-sm">
            O‘z yosh toifangizni tanlang va siz uchun moslashtirilgan murakkablikdagi olimpiada masalalariga kirishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Junior Card */}
          <div className="bg-[#190A35] border-2 border-[#7C3AED]/50 hover:border-[#A855F7] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/40 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#7C3AED]/10 rounded-full blur-2xl group-hover:bg-[#7C3AED]/20 transition" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shadow-lg">
                  <BookOpen className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-purple-200 border border-[#7C3AED]/40">
                  5–8-sinflar
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-3">Junior</h3>
              <p className="text-purple-200/90 text-sm leading-relaxed mb-6">
                Asosiy matematik tushunchalar, mantiqiy masalalar va olimpiadaga tayyorgarlik.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-purple-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Sonlar nazariyasi asoslari (bo‘linuvchanlik, EKUB, EKUK)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Mantiq, Dirixle prinsipi va qiziqarli kombinatorika</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Geometrik burchaklar, uchburchaklar tengligi va yuzalar</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleJuniorClick}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:opacity-95 transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Junior bo‘limiga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Senior Card */}
          <div className="bg-[#190A35] border-2 border-[#2563EB]/50 hover:border-[#38BDF8] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/40 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#2563EB]/10 rounded-full blur-2xl group-hover:bg-[#2563EB]/20 transition" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white shadow-lg">
                  <Trophy className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2563EB]/20 text-blue-200 border border-[#2563EB]/40">
                  9–11-sinflar
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-3">Senior</h3>
              <p className="text-purple-200/90 text-sm leading-relaxed mb-6">
                Murakkab olimpiada masalalari va xalqaro musobaqalarga tayyorgarlik.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-purple-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Klassik tengsizliklar (Koshi-Shvars, AM-GM, Yensen)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Diofant tenglamalari va modulli arifmetika</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Olimpiada geometriyasi va IMO terma jamoasi saralashlari</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleSeniorClick}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-95 transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Senior bo‘limiga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* D. FEATURES SECTION (Exact 4 Cards)                          */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[#1A0A35] border border-[#3B1D63] text-purple-300 text-xs font-semibold mb-2">
            MathOlymp imkoniyatlari
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Nega aynan MathOlymp?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Olimpiadalar */}
          <div 
            onClick={() => handleProtectedNavigate('/olympiads', 'Olimpiadalar katalogi')}
            className="bg-[#190A35] border border-[#3B1D63] hover:border-[#7C3AED] p-6 rounded-2xl transition duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#261049] group-hover:bg-[#7C3AED] text-[#A855F7] group-hover:text-white flex items-center justify-center mb-4 transition">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Olimpiadalar</h3>
              <p className="text-xs text-purple-300/90 leading-relaxed">
                Al-Xorazmiy, Respublika va xalqaro (IMO/BMO) saralash musobaqalari arxivi hamda yillik bosqichlari.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A114D] flex items-center gap-1 text-xs text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Ko‘rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: AI yordamchi va Daftardagi yechim */}
          <div 
            onClick={() => handleProtectedNavigate('/problems', 'AI yechim tahlilchisi')}
            className="bg-[#190A35] border border-[#3B1D63] hover:border-[#E879F9] p-6 rounded-2xl transition duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#261049] group-hover:bg-[#E879F9] text-[#E879F9] group-hover:text-black flex items-center justify-center mb-4 transition">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Daftardan rasm & AI</h3>
              <p className="text-xs text-purple-300/90 leading-relaxed">
                Daftarga yechgan ishingizni rasmga oling. AI qo‘lyozmangizni o‘qiydi, har bir qadamni tekshirib xatoni aytib beradi.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A114D] flex items-center gap-1 text-xs text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Sinab ko‘rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Masalalar bazasi */}
          <div 
            onClick={() => handleProtectedNavigate('/problems', 'Masalalar bazasi')}
            className="bg-[#190A35] border border-[#3B1D63] hover:border-[#2563EB] p-6 rounded-2xl transition duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#261049] group-hover:bg-[#2563EB] text-[#60A5FA] group-hover:text-white flex items-center justify-center mb-4 transition">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Masalalar bazasi</h3>
              <p className="text-xs text-purple-300/90 leading-relaxed">
                Yillar, bosqichlar, sinflar va qiyinchilik darajalari bo‘yicha tartiblangan boy matematik topshiriqlar arxivi.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A114D] flex items-center gap-1 text-xs text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Masalalarga o‘tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Natijalar */}
          <div 
            onClick={() => handleProtectedNavigate('/dashboard', 'O‘quvchi natijalari')}
            className="bg-[#190A35] border border-[#3B1D63] hover:border-[#A855F7] p-6 rounded-2xl transition duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#261049] group-hover:bg-[#A855F7] text-[#C084FC] group-hover:text-white flex items-center justify-center mb-4 transition">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Natijalar</h3>
              <p className="text-xs text-purple-300/90 leading-relaxed">
                Yechilgan masalalar soni, aniqlik ko‘rsatkichi va shaxsiy matematik o‘sishingizning dinamik monitoringi.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A114D] flex items-center gap-1 text-xs text-pink-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Profilni ochish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Auth Guard Modal */}
      <AuthGuardModal
        isOpen={authGuardOpen}
        onClose={() => setAuthGuardOpen(false)}
        onNavigate={onNavigate}
        targetFeatureName={targetFeatureName}
      />
    </div>
  );
};
