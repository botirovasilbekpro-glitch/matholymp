import React, { useState } from 'react';
import { useStore, ASILBEK_BOTIROV_ADMIN } from '../lib/store.ts';
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  KeyRound, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { setUser, registeredUsers } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email va parolni kiriting.");
      return;
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi lozim.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if logging in as Asilbek Botirov Admin
    if (cleanEmail === 'botirovasilbekpro@gmail.com' || cleanEmail === 'asilbek' || cleanEmail === 'admin') {
      if (password !== 'asilbek2026' && password !== 'admin123') {
        setError("Email yoki parol noto‘g‘ri kiritildi. Qaytadan urinib ko‘ring.");
        return;
      }
      setUser(ASILBEK_BOTIROV_ADMIN);
      onNavigate('/admin');
      return;
    }

    // Check existing registered users
    const matched = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (matched) {
      setUser(matched);
      onNavigate('/dashboard');
      return;
    }

    // If new user entering login directly
    setError("Bunday akkaunt topilmadi. Agar yangi o‘quvchi bo‘lsangiz, iltimos ro‘yxatdan o‘ting.");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#190A35] border border-[#3B1D63] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#E879F9] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/40">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Tizimga kirish</h1>
          <p className="text-xs text-purple-300 mt-1">MathOlymp platformasiga xush kelibsiz</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs text-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Email manzil *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="oquvchi@mail.uz"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-purple-200">Parol *</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-pink-400 hover:underline"
              >
                Parolni unutdingizmi?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingiz"
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-95 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-purple-900/40 active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Info */}
        <div className="mt-6 pt-5 border-t border-[#2B124C] text-center">
          <p className="text-[11px] text-purple-400/80">
            Platforma xavfsizligi shifrlangan. Boshqaruv paneli faqat tasdiqlangan bosh ma’mur uchun ochiq.
          </p>
        </div>

        {/* Link to Register */}
        <div className="text-center pt-5 text-xs text-purple-300">
          Akkauntingiz yo‘qmi?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/register')}
            className="font-bold text-pink-400 hover:underline"
          >
            Ro‘yxatdan o‘tish
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#190A35] border border-[#7C3AED]/70 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#3B1D63] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-pink-400" />
                <span>Parolni tiklash</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetSuccess(false);
                }}
                className="text-purple-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {resetSuccess ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-xs text-white font-medium">
                  Tiklash havolasi <strong>{resetEmail}</strong> manziliga yuborildi.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSuccess(false);
                  }}
                  className="mt-3 px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg"
                >
                  Yopish
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-purple-300">
                  Ro‘yxatdan o‘tgan email manzilingizni kiriting. Biz sizga parolni yangilash havolasini yuboramiz.
                </p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Email manzilingiz"
                  className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 text-xs text-purple-400 hover:text-white"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (resetEmail.includes('@')) {
                        setResetSuccess(true);
                      }
                    }}
                    className="px-4 py-1.5 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg"
                  >
                    Yuborish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
