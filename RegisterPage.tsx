import React, { useState } from 'react';
import { useStore } from '../lib/store.ts';
import { StudentGroup, Grade, UserProfile } from '../types/index.ts';
import { 
  validateRegistration, 
  getDefaultGradeForGroup, 
  getGradesForGroup 
} from '../lib/validation.ts';
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Trophy 
} from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { registerNewUser } = useStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [group, setGroup] = useState<StudentGroup>('Junior');
  const [grade, setGrade] = useState<Grade>(5);
  const [school, setSchool] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Group change automatically resets grade to a valid option
  const handleGroupChange = (newGroup: StudentGroup) => {
    setGroup(newGroup);
    const validDefault = getDefaultGradeForGroup(newGroup);
    setGrade(validDefault);

    // Clear grade error if present
    if (errors.grade) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.grade;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validation = validateRegistration({
      firstName,
      lastName,
      group,
      grade,
      email,
      password,
      confirmPassword,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Create authenticated user profile
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      group,
      grade,
      school: school.trim() || undefined,
      region: region.trim() || undefined,
      role: 'student',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      registerNewUser(newUser);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onNavigate('/dashboard');
      }, 1200);
    }, 600);
  };

  const gradesList = getGradesForGroup(group);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-[#190A35] border border-[#3B1D63] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand & Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#E879F9] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/40">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            MathOlymp ga a’zo bo‘ling
          </h1>
          <p className="text-xs sm:text-sm text-purple-300 mt-1">
            Matematika olimpiadalariga tayyorgarlikni bugun boshlang!
          </p>
        </div>

        {success ? (
          <div className="text-center py-10 space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Ro‘yxatdan o‘tish muvaffaqiyatli!</h3>
            <p className="text-xs text-purple-300">Shaxsiy kabinetingizga yo‘naltirilmoqda...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Ism & Familiya */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                  Ism *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ismingiz"
                  className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
                  required
                />
                {errors.firstName && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                  Familiya *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Familiyangiz"
                  className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
                  required
                />
                {errors.lastName && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Guruh Tanlash (Junior / Senior) */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Olimpiada guruhi *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleGroupChange('Junior')}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                    group === 'Junior'
                      ? 'bg-[#7C3AED] border-[#A855F7] text-white shadow-md'
                      : 'bg-[#120626] border-[#3B1D63] text-purple-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Junior (5–8 sinflar)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGroupChange('Senior')}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                    group === 'Senior'
                      ? 'bg-[#2563EB] border-[#38BDF8] text-white shadow-md'
                      : 'bg-[#120626] border-[#3B1D63] text-purple-300 hover:text-white'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Senior (9–11 sinflar)</span>
                </button>
              </div>
              {errors.group && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.group}</p>
              )}
            </div>

            {/* Sinf Tanlash (Faqat guruhga ruxsat etilgan sinflar) */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Sinf * ({group} guruhi doirasida)
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as Grade)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
              >
                {gradesList.map((g) => (
                  <option key={g} value={g}>
                    {g}-sinf
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.grade}</p>
              )}
            </div>

            {/* Email */}
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
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Parol */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Parol *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
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
              {errors.password && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Parolni Takrorlash */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Parolni takrorlash *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Parolni qayta kiriting"
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
                required
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#E879F9] hover:opacity-95 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-purple-900/40 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? "Ro‘yxatdan o‘tkazilmoqda..." : "Ro‘yxatdan o‘tish"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Link to Login */}
            <div className="text-center pt-2 text-xs text-purple-300">
              Akkauntingiz bormi?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="font-bold text-pink-400 hover:underline"
              >
                Kirish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
