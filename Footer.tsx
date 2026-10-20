import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, FileText, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  const showTerms = () => {
    setModalContent({
      title: 'Foydalanish shartlari (Terms of Service)',
      body: `1. Platformadan foydalanish maqsadi: MathOlymp faqat ta’lim va matematika olimpiadalariga tayyorgarlik ko‘rish uchun mo‘ljallangan.
2. Intellektual mulk: Olimpiada masalalari rasmiy manbalardan iqtibos sifatida o‘quv maqsadida olingan bo‘lib, ularning mualliflik huquqlari tegishli olimpiada tashkiliy qo‘mitalariga tegishli.
3. AI tahlil: AI yordamchisi tomonidan taqdim etilayotgan xulosalar maslahat xarakteriga ega bo‘lib, rasmiy hakamlik natijasi hisoblanmaydi.
4. Xavfsizlik: Foydalanuvchilar o‘z akkaunti xavfsizligi va taqdim etilgan yechimlarining halolligi uchun javobgardirlar.`,
    });
  };

  const showPrivacy = () => {
    setModalContent({
      title: 'Maxfiylik siyosati (Privacy Policy)',
      body: `1. Shaxsiy ma’lumotlar: MathOlymp o‘quvchilarning faqat ta’lim jarayoni uchun zarur bo‘lgan ma’lumotlarini (ism, familiya, sinf, guruh va email) saqlaydi.
2. Yosh chegarasi va himoya: Voyaga yetmagan o‘quvchilardan ortiqcha shaxsiy ma’lumotlar (aniq yashash manzili, telefon raqami yoki pasport ma’lumotlari) talab qilinmaydi.
3. Yechimlar va fayllar: Yuklangan qo‘lyozma suratlar faqat AI tekshiruvi va o‘quvchining shaxsiy portfoliosi uchun qayta ishlanadi va begona shaxslarga berilmaydi.
4. Cookie va hisob: Ma’lumotlar xavfsiz shifrlangan muhitda saqlanadi.`,
    });
  };

  return (
    <footer className="bg-[#0C0318] border-t border-[#3B1D63] text-purple-300 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#E879F9] flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white font-mono">
                Math<span className="text-[#A855F7]">OlympJon</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-900/60 text-purple-300 border border-purple-500/30 rounded">
                .UZ
              </span>
            </div>
            <p className="text-xs text-purple-300/80 leading-relaxed max-w-md">
              O‘zbekistonlik maktab o‘quvchilarining matematika olimpiadalariga puxta tayyorlanishi,
              mantiqiy va nostandart masalalarni tahlil qilishi hamda AI ko‘magida o‘z bilimlarini
              yangi bosqichga olib chiqishi uchun yaratilgan milliy ta’lim platformasi.
            </p>
            <div className="p-3 rounded-xl bg-[#17072E] border border-[#3B1D63] text-xs space-y-1">
              <span className="text-amber-300 font-bold block">
                ★ Loyiha muallifi va bosh ma’muri: Asilbek Botirov
              </span>
              <span className="text-purple-300 text-[11px] block">
                Mirzo Ulug‘bek nomidagi ixtisoslashtirilgan maktab • 9-sinf o‘quvchisi
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Asosiy bo‘limlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/olympiads')}
                  className="hover:text-white transition"
                >
                  Olimpiadalar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/problems')}
                  className="hover:text-white transition"
                >
                  Masalalar bazasi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/dashboard')}
                  className="hover:text-white transition"
                >
                  O‘quvchi profili
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Huquqiy va xavfsizlik
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={showTerms}
                  className="flex items-center gap-1.5 hover:text-white transition text-left"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Foydalanish shartlari
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={showPrivacy}
                  className="flex items-center gap-1.5 hover:text-white transition text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Maxfiylik siyosati
                </button>
              </li>
              <li>
                <span className="text-[11px] text-purple-400/80 block mt-2">
                  Aloqa ma’lumoti: Sozlamalar paneli orqali bog‘lanish faollashtiriladi.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#220B3B] flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400/70 gap-2">
          <p>© {new Date().getFullYear()} MathOlympJon (matholympjon.uz) — Asilbek Botirov (Mirzo Ulug‘bek maktabi). Barcha huquqlar himoyalangan.</p>
          <p className="font-mono text-[11px]">
            O‘zbekiston Respublikasi yosh matematiklari uchun maxsus
          </p>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#190A35] border border-[#7C3AED]/60 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#3B1D63] pb-3">
              <h3 className="text-lg font-bold text-white">{modalContent.title}</h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="text-purple-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-purple-200 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
              {modalContent.body}
            </div>
            <div className="text-right pt-2">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-lg transition"
              >
                Tushunarli
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
