import React from 'react';
import { 
  Lock, 
  UserPlus, 
  LogIn, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  X, 
  BookOpen, 
  Trophy 
} from 'lucide-react';

interface AuthGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  targetFeatureName?: string;
}

export const AuthGuardModal: React.FC<AuthGuardModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  targetFeatureName = "Olimpiadalar va masalalar bazasi",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#190A35] border-2 border-[#7C3AED]/70 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl shadow-purple-950/80 relative overflow-hidden animate-scaleUp">
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E879F9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-purple-400 hover:text-white p-1 rounded-lg hover:bg-purple-900/40 transition"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#E879F9] flex items-center justify-center mx-auto text-white shadow-xl shadow-purple-900/50">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Ro‘yxatdan o‘tish talab etiladi</span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {targetFeatureName}ga kirish cheklangan
          </h2>

          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-md mx-auto">
            Hurmatli o‘quvchi! Olimpiada masalalarini ko‘rish, daftardagi yechimlarni suratga olib tekshirtirish va AI tahlilidan foydalanish uchun platformada ro‘yxatdan o‘tishingiz yoki hisobingizga kirishingiz shart.
          </p>
        </div>

        {/* Benefits Box */}
        <div className="p-4 rounded-2xl bg-[#120626] border border-[#3B1D63] space-y-2.5 text-xs text-purple-200">
          <div className="font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-pink-400" />
            <span>Ro‘yxatdan o‘tgan o‘quvchilar uchun imkoniyatlar:</span>
          </div>
          <ul className="space-y-1.5 text-purple-300 pl-6 list-disc">
            <li>Junior (5–8) va Senior (9–11) toifalaridagi barcha masalalar</li>
            <li>Daftarga yozilgan yechimni rasmga tushirib AI ga tekshirtirish</li>
            <li>Bosqichma-bosqich ishoralar va rasmiy model yechimlar</li>
            <li>Shaxsiy kabinetda yechilgan masalalar va ballar statistikasi</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('/register');
            }}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#E879F9] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <UserPlus className="w-4 h-4" />
            <span>Ro‘yxatdan o‘tish (O‘quvchilar uchun)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('/login');
            }}
            className="w-full py-3 px-4 bg-[#120626] hover:bg-[#200B44] border border-[#3B1D63] hover:border-[#7C3AED] text-purple-200 hover:text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 text-purple-400" />
            <span>Mavjud hisob bilan tizimga kirish</span>
          </button>
        </div>

        {/* Asilbek Botirov Admin Quick Link */}
        <div className="pt-2 border-t border-[#2A114D] text-center">
          <p className="text-[11px] text-purple-400">
            Platforma asoschisimisiz?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate('/login');
              }}
              className="text-amber-300 hover:text-amber-200 underline font-semibold inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              Asilbek Botirov (Admin kirish)
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
