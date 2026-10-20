import React, { useState } from 'react';
import { useStore } from '../lib/store.ts';
import { StudentGroup, Grade } from '../types/index.ts';
import { 
  getDefaultGradeForGroup, 
  getGradesForGroup, 
  isGradeValidForGroup 
} from '../lib/validation.ts';
import { User, Save, CheckCircle2, ArrowLeft, School, MapPin } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, updateUserProfile } = useStore();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [group, setGroup] = useState<StudentGroup>(user?.group || 'Junior');
  const [grade, setGrade] = useState<Grade>(user?.grade || 5);
  const [school, setSchool] = useState(user?.school || '');
  const [region, setRegion] = useState(user?.region || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-white">Kirish talab qilinadi.</p>
      </div>
    );
  }

  const handleGroupChange = (newGroup: StudentGroup) => {
    setGroup(newGroup);
    // Automatic grade reset according to specification
    const defaultG = getDefaultGradeForGroup(newGroup);
    setGrade(defaultG);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Ism va familiyani kiritish majburiy.");
      return;
    }

    if (!isGradeValidForGroup(group, grade)) {
      setErrorMessage(`${group} guruhi uchun tanlangan sinf mos kelmaydi.`);
      return;
    }

    updateUserProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      group,
      grade,
      school: school.trim(),
      region: region.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const availableGrades = getGradesForGroup(group);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <button
        type="button"
        onClick={() => onNavigate('/dashboard')}
        className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Profilga qaytish</span>
      </button>

      <div className="bg-[#190A35] border border-[#3B1D63] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-[#2C134E] pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Profil ma’lumotlarini tahrirlash</h1>
            <p className="text-xs text-purple-300 mt-1">
              Ruxsat etilgan shaxsiy va ta’lim ma’lumotlaringizni yangilang.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ma’lumotlar muvaffaqiyatli yangilandi!</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Ism *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Familiya *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                required
              />
            </div>
          </div>

          {/* Group Selection */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Olimpiada guruhi *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleGroupChange('Junior')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition ${
                  group === 'Junior'
                    ? 'bg-[#7C3AED] border-[#A855F7] text-white shadow-md'
                    : 'bg-[#120626] border-[#3B1D63] text-purple-300 hover:text-white'
                }`}
              >
                Junior (5–8 sinflar)
              </button>
              <button
                type="button"
                onClick={() => handleGroupChange('Senior')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition ${
                  group === 'Senior'
                    ? 'bg-[#2563EB] border-[#38BDF8] text-white shadow-md'
                    : 'bg-[#120626] border-[#3B1D63] text-purple-300 hover:text-white'
                }`}
              >
                Senior (9–11 sinflar)
              </button>
            </div>
          </div>

          {/* Grade selection (filtered by group) */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Sinf * ({group} guruhi uchun ruxsat etilgan sinflar)
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value) as Grade)}
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
            >
              {availableGrades.map((g) => (
                <option key={g} value={g}>
                  {g}-sinf
                </option>
              ))}
            </select>
          </div>

          {/* School */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Maktab / Litsey nomi
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Masalan: 1-sonli ixtisoslashtirilgan maktab"
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Viloyat / Hudud
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Masalan: Toshkent shahri, Samarqand, Xorazm..."
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#2C134E] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/dashboard')}
              className="px-4 py-2.5 text-xs text-purple-300 hover:text-white transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-95 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Saqlash</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
