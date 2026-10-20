import React, { useState } from 'react';
import { useStore } from '../lib/store.ts';
import { Problem, StudentGroup, DifficultyLevel, Grade, UserProfile, Olympiad } from '../types/index.ts';
import { MathView } from '../components/MathView.tsx';
import { 
  ShieldCheck, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  FileText, 
  Save, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Search, 
  GraduationCap, 
  School, 
  Lock, 
  Mail, 
  Sparkles,
  ArrowRight,
  Download,
  KeyRound,
  Trophy,
  ExternalLink
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (path: string) => void;
  onSelectProblem: (id: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, onSelectProblem }) => {
  const { 
    user, 
    problems, 
    olympiads, 
    addProblem, 
    updateProblem, 
    deleteProblem, 
    addOlympiad,
    updateOlympiad,
    deleteOlympiad,
    registeredUsers, 
    deleteRegisteredUser,
    updateRegisteredUser,
    isCurrentUserAdmin,
    switchToAsilbekAdmin 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'students' | 'problems' | 'new-problem' | 'olympiads'>('students');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // Editing state for problems
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);

  // Student directory search and filters
  const [studentSearch, setStudentSearch] = useState('');
  const [studentGroupFilter, setStudentGroupFilter] = useState<'All' | 'Junior' | 'Senior'>('All');

  // New problem form fields
  const [title, setTitle] = useState('');
  const [olympiadId, setOlympiadId] = useState(olympiads[0]?.id || '');
  const [year, setYear] = useState(2024);
  const [stage, setStage] = useState('Respublika bosqichi');
  const [group, setGroup] = useState<StudentGroup>('Junior');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("O'rta");
  const [topic, setTopic] = useState<'Algebra' | 'Geometriya' | 'Sonlar nazariyasi' | 'Kombinatorika' | 'Mantiq'>('Algebra');
  const [statementUz, setStatementUz] = useState('');
  const [officialAnswer, setOfficialAnswer] = useState('');
  const [officialSolution, setOfficialSolution] = useState('');
  const [sourceUrl, setSourceUrl] = useState('https://olimpiada.uzedu.uz');
  const [licensingStatus, setLicensingStatus] = useState('Rasmiy ta’lim arxivi');
  const [maxScore, setMaxScore] = useState(7);
  const [formSuccess, setFormSuccess] = useState(false);

  // New Olympiad form
  const [newOlympiadName, setNewOlympiadName] = useState('');
  const [newOlympiadDesc, setNewOlympiadDesc] = useState('');
  const [newOlympiadType, setNewOlympiadType] = useState('Milliy');

  // Verify Admin Access
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError(null);

    const success = switchToAsilbekAdmin(adminPasswordInput);
    if (!success) {
      setAdminAuthError("Kiritilgan maxfiy parol noto‘g‘ri. Iltimos, qaytadan tekshirib kiriting.");
      return;
    }
    setAdminPasswordInput('');
  };

  // If user is not Asilbek Botirov admin, protect page with password lock
  if (!isCurrentUserAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-rose-950/70 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400 shadow-xl">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">Boshqaruv Paneli Himoyalangan</h2>
          <p className="text-purple-300 text-xs mt-1.5 leading-relaxed">
            Ushbu bo‘lim faqat platforma asoschisi va bosh ma’muri{' '}
            <strong className="text-white">Asilbek Botirov</strong> (Mirzo Ulug‘bek maktabi, 9-sinf) uchun ruxsat etilgan.
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="p-5 bg-[#190A35] border border-[#3B1D63] rounded-2xl text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>Asilbek Botirov maxfiy parolini kiriting</span>
          </div>

          {adminAuthError && (
            <div className="p-2.5 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs text-rose-200">
              {adminAuthError}
            </div>
          )}

          <div>
            <label className="block text-xs text-purple-300 mb-1">Administrator paroli</label>
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="Maxfiy parolingiz"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin panelga kirish</span>
          </button>
        </form>

        <div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-xs text-purple-400 hover:text-white"
          >
            ← Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  // Filter registered students
  const filteredStudents = registeredUsers.filter((st: UserProfile) => {
    const matchesSearch =
      st.firstName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.lastName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      (st.school && st.school.toLowerCase().includes(studentSearch.toLowerCase())) ||
      (st.region && st.region.toLowerCase().includes(studentSearch.toLowerCase()));

    const matchesGroup =
      studentGroupFilter === 'All' || st.group === studentGroupFilter;

    return matchesSearch && matchesGroup;
  });

  const juniorStudentsCount = registeredUsers.filter((u) => u.group === 'Junior').length;
  const seniorStudentsCount = registeredUsers.filter((u) => u.group === 'Senior').length;

  // Export Registered Students to CSV/Excel
  const handleExportCSV = () => {
    const headers = ['Ism', 'Familiya', 'Email', 'Guruh', 'Sinf', 'Maktab', 'Viloyat', 'Ro‘yxatdan o‘tgan sana'];
    const rows = registeredUsers.map(u => [
      `"${u.firstName.replace(/"/g, '""')}"`,
      `"${u.lastName.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.group}"`,
      `"${u.grade}-sinf"`,
      `"${(u.school || 'Keltirilmagan').replace(/"/g, '""')}"`,
      `"${(u.region || 'Keltirilmagan').replace(/"/g, '""')}"`,
      `"${new Date(u.createdAt).toLocaleDateString('uz-UZ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `matholymp_oquvchilar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedOlympiad = olympiads.find((o) => o.id === olympiadId);
    const eligibleGrades: Grade[] = group === 'Junior' ? [5, 6, 7, 8] : [9, 10, 11];

    const newProblem: Problem = {
      id: editingProblemId || `prob-custom-${Date.now()}`,
      olympiadId,
      olympiadName: selectedOlympiad ? selectedOlympiad.name : 'Olimpiada',
      year: Number(year),
      stage: stage as any,
      group,
      eligibleGrades,
      problemNumber: editingProblemId ? (problems.find(p => p.id === editingProblemId)?.problemNumber || 1) : problems.length + 1,
      title: title.trim(),
      statementUz: statementUz.trim(),
      difficulty,
      topic,
      officialAnswer: officialAnswer.trim() || undefined,
      officialSolution: officialSolution.trim() || undefined,
      markingRubric: {
        maxScore,
        steps: [
          { score: Math.round(maxScore * 0.4), description: "Dastlabki to‘g‘ri g‘oya va ifodalarni kiritish" },
          { score: Math.round(maxScore * 0.4), description: "Asosiy oraliq tenglik yoki teoremani qo‘llash" },
          { score: Math.max(1, maxScore - Math.round(maxScore * 0.8)), description: "To‘liq yakuniy isbot" },
        ],
      },
      sourceUrl,
      licensingStatus,
      isPublished: true,
      hints: [
        "Masala shartidagi o‘zgaruvchilarni soddaroq ifodalarga keltiring.",
        "Xususiy qiymatlarni tekshirib ko‘ring.",
      ],
    };

    if (editingProblemId) {
      updateProblem(newProblem);
    } else {
      addProblem(newProblem);
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('problems');
      setEditingProblemId(null);
    }, 1000);
  };

  const handleEdit = (p: Problem) => {
    setEditingProblemId(p.id);
    setTitle(p.title);
    setOlympiadId(p.olympiadId);
    setYear(p.year);
    setStage(p.stage);
    setGroup(p.group);
    setDifficulty(p.difficulty);
    setTopic(p.topic);
    setStatementUz(p.statementUz);
    setOfficialAnswer(p.officialAnswer || '');
    setOfficialSolution(p.officialSolution || '');
    setSourceUrl(p.sourceUrl);
    setLicensingStatus(p.licensingStatus);
    setMaxScore(p.markingRubric?.maxScore || 7);
    setActiveTab('new-problem');
  };

  const handleDeleteProblem = (id: string) => {
    if (window.confirm("Haqiqatan ham ushbu masalani o‘chirmoqchimisiz?")) {
      deleteProblem(id);
    }
  };

  const handleAddOlympiad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOlympiadName.trim()) return;

    const newOlymp: Olympiad = {
      id: `olymp-${Date.now()}`,
      slug: newOlympiadName.toLowerCase().replace(/\s+/g, '-'),
      name: newOlympiadName.trim(),
      shortDescription: newOlympiadDesc.trim() || 'O‘zbekiston matematika olimpiadasi',
      competitionType: newOlympiadType,
      availableYears: [2024, 2023],
      eligibleGroups: ['Junior', 'Senior'],
      officialSourceUrl: 'https://olimpiada.uzedu.uz',
      licensingInfo: 'Rasmiy ta’lim arxivi',
      isPublished: true,
      problemCount: 0,
    };

    addOlympiad(newOlymp);
    setNewOlympiadName('');
    setNewOlympiadDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner with Asilbek Botirov Branding */}
      <div className="bg-gradient-to-r from-[#1E093D] via-[#2A0F52] to-[#190A35] border-2 border-[#7C3AED]/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#E879F9] to-[#2563EB] text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-purple-900/50">
            AB
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black text-white">
                Asilbek Botirov — Boshqaruv Paneli
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Asoschi & Bosh Admin
              </span>
            </div>
            <p className="text-purple-300 text-xs mt-1">
              Mirzo Ulug‘bek nomidagi ixtisoslashtirilgan maktab • 9-sinf o‘quvchisi
            </p>
            <p className="text-purple-400/80 text-[11px] mt-0.5">Email: botirovasilbekpro@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            title="Barcha ro‘yxatdan o‘tgan o‘quvchilarni Excel/CSV formatida yuklab olish"
          >
            <Download className="w-4 h-4" />
            <span>Excel / CSV Eksport</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="px-4 py-2.5 bg-[#190A35] hover:bg-[#251048] border border-[#3B1D63] text-purple-200 text-xs rounded-xl transition"
          >
            Saytga qaytish
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#190A35] p-1.5 rounded-2xl border border-[#3B1D63] text-xs">
        {/* Tab 1: Ro'yxatdan o'tgan o'quvchilar bazasi */}
        <button
          type="button"
          onClick={() => setActiveTab('students')}
          className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'students'
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white shadow-md'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>👥 Ro‘yxatdan o‘tgan o‘quvchilar ({registeredUsers.length})</span>
        </button>

        {/* Tab 2: Masalalar bazasi */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('problems');
            setEditingProblemId(null);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'problems'
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white shadow-md'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>📝 Masalalarni tahrirlash ({problems.length})</span>
        </button>

        {/* Tab 3: Yangi masala */}
        <button
          type="button"
          onClick={() => setActiveTab('new-problem')}
          className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'new-problem'
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white shadow-md'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{editingProblemId ? "✏️ Masalani tahrirlash" : "➕ Yangi masala qo‘shish"}</span>
        </button>

        {/* Tab 4: Olimpiadalarni boshqarish */}
        <button
          type="button"
          onClick={() => setActiveTab('olympiads')}
          className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === 'olympiads'
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white shadow-md'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>🏆 Olimpiadalar boshqaruvi ({olympiads.length})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: RO'YXATDAN O'TGAN O'QUVCHILAR BAZASI                   */}
      {/* ============================================================ */}
      {activeTab === 'students' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#190A35] border border-[#3B1D63] p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-400 block mb-1">Jami a’zo bo‘lganlar</span>
                <span className="text-3xl font-black text-white font-mono">{registeredUsers.length}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#190A35] border border-[#3B1D63] p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-400 block mb-1">Junior (5–8 sinflar)</span>
                <span className="text-3xl font-black text-purple-300 font-mono">{juniorStudentsCount}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#200B44] text-[#A855F7] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#190A35] border border-[#3B1D63] p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-400 block mb-1">Senior (9–11 sinflar)</span>
                <span className="text-3xl font-black text-blue-400 font-mono">{seniorStudentsCount}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-950/40 text-blue-400 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#190A35] border border-[#3B1D63] p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-400 block mb-1">CSV Eksport</span>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="mt-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Jadvalni ko‘chirish</span>
                </button>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-[#190A35] border border-[#3B1D63] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="O‘quvchi ismi, maktabi yoki emaili bo‘yicha..."
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-purple-400 text-[11px]">Guruh filtri:</span>
              <button
                type="button"
                onClick={() => setStudentGroupFilter('All')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  studentGroupFilter === 'All'
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-purple-300 bg-[#120626] border border-[#3B1D63]'
                }`}
              >
                Barchasi ({registeredUsers.length})
              </button>
              <button
                type="button"
                onClick={() => setStudentGroupFilter('Junior')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  studentGroupFilter === 'Junior'
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-purple-300 bg-[#120626] border border-[#3B1D63]'
                }`}
              >
                Junior (5–8)
              </button>
              <button
                type="button"
                onClick={() => setStudentGroupFilter('Senior')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  studentGroupFilter === 'Senior'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-purple-300 bg-[#120626] border border-[#3B1D63]'
                }`}
              >
                Senior (9–11)
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-purple-200">
                <thead className="bg-[#120626] border-b border-[#3B1D63] text-purple-300 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">O‘quvchi (F.I.Sh)</th>
                    <th className="p-4">Email Manzil</th>
                    <th className="p-4">Toifa & Sinf</th>
                    <th className="p-4">Maktab / Litsey</th>
                    <th className="p-4">Hudud (Viloyat)</th>
                    <th className="p-4">A’zo bo‘lgan sana</th>
                    <th className="p-4 text-right">Boshqaruv</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2B124C]">
                  {filteredStudents.map((st) => {
                    const isOwner = st.email.toLowerCase() === 'botirovasilbekpro@gmail.com';
                    return (
                      <tr key={st.id} className="hover:bg-[#16082E] transition">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-xs text-white font-bold shrink-0">
                            {st.firstName[0]}{st.lastName[0]}
                          </div>
                          <div>
                            <span className="text-sm">{st.firstName} {st.lastName}</span>
                            {isOwner && (
                              <span className="block text-[11px] text-amber-300 font-bold">
                                ★ Asilbek Botirov (Platforma Asoschisi)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-purple-300 font-mono text-[11px]">{st.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            st.group === 'Junior'
                              ? 'bg-purple-950 text-purple-300 border border-purple-800/40'
                              : 'bg-blue-950 text-blue-300 border border-blue-800/40'
                          }`}>
                            {st.group} • {st.grade}-sinf
                          </span>
                        </td>
                        <td className="p-4 text-purple-200 font-medium">{st.school || "Ko‘rsatilmagan"}</td>
                        <td className="p-4 text-purple-300">{st.region || "Ko‘rsatilmagan"}</td>
                        <td className="p-4 text-purple-400 text-[11px]">
                          {new Date(st.createdAt).toLocaleDateString('uz-UZ')}
                        </td>
                        <td className="p-4 text-right">
                          {!isOwner && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`${st.firstName} ${st.lastName} akkauntini o‘chirmoqchimisiz?`)) {
                                  deleteRegisteredUser(st.id);
                                }
                              }}
                              className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition"
                              title="O‘quvchini ro‘yxatdan o‘chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: MASALALARNI TAHRIRLASH VA BOSHQARISH                  */}
      {/* ============================================================ */}
      {activeTab === 'problems' && (
        <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl overflow-hidden shadow-xl space-y-4 p-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#2C134E] gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                Barcha rasmiy masalalar (Tahrirlash va O‘chirish)
              </h3>
              <p className="text-xs text-purple-300">
                Olimpiada masalalari shartini, javoblarini, ballarini yoki qiyinligini to‘g‘ridan-to‘g‘ri tahrirlashingiz mumkin.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingProblemId(null);
                setActiveTab('new-problem');
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi masala qo‘shish</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-purple-200">
              <thead className="bg-[#120626] border-b border-[#3B1D63] text-purple-300 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4"># / Nomi</th>
                  <th className="p-4">Olimpiada</th>
                  <th className="p-4">Guruh / Yil</th>
                  <th className="p-4">Mavzu</th>
                  <th className="p-4">Qiyinchilik</th>
                  <th className="p-4">Maksimal Ball</th>
                  <th className="p-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B124C]">
                {problems.map((prob) => (
                  <tr key={prob.id} className="hover:bg-[#16082E] transition">
                    <td className="p-4 font-semibold text-white max-w-xs truncate">
                      #{prob.problemNumber} {prob.title}
                    </td>
                    <td className="p-4 text-purple-200">{prob.olympiadName}</td>
                    <td className="p-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800/40 text-[10px]">
                        {prob.group} ({prob.year})
                      </span>
                    </td>
                    <td className="p-4 text-pink-300 font-medium">{prob.topic}</td>
                    <td className="p-4 font-semibold">{prob.difficulty}</td>
                    <td className="p-4 text-emerald-400 font-mono font-bold">{prob.markingRubric?.maxScore || 7} ball</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectProblem(prob.id);
                            onNavigate(`/problems/${prob.id}`);
                          }}
                          className="p-1.5 text-purple-300 hover:text-white hover:bg-purple-900/40 rounded transition"
                          title="Masalani ko‘rish va sinash"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEdit(prob)}
                          className="px-2.5 py-1.5 bg-blue-950 text-blue-300 hover:bg-blue-900/60 border border-blue-700/50 rounded-lg transition flex items-center gap-1 font-semibold"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Tahrirlash</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProblem(prob.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: YANGI MASALA QO'SHISH YOKI TAHRIRLASH                */}
      {/* ============================================================ */}
      {activeTab === 'new-problem' && (
        <form onSubmit={handleCreateProblem} className="bg-[#190A35] border border-[#3B1D63] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
          <div className="border-b border-[#2C134E] pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-pink-400" />
                <span>{editingProblemId ? "Masalani tahrirlash" : "Yangi rasmiy olimpiada masalasini kiritish"}</span>
              </h2>
              <p className="text-xs text-purple-300 mt-0.5">
                Admin sifatida masala sharti, formulalari, rasmiy yechimi va ball mezonini to‘liq o‘zgartirishingiz mumkin.
              </p>
            </div>
            {editingProblemId && (
              <button
                type="button"
                onClick={() => {
                  setEditingProblemId(null);
                  setTitle('');
                  setStatementUz('');
                  setOfficialAnswer('');
                  setOfficialSolution('');
                }}
                className="text-xs text-purple-400 hover:text-white underline"
              >
                Bekor qilish
              </button>
            )}
          </div>

          {formSuccess && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Masala muvaffaqiyatli saqlandi!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-purple-200 mb-1">Masala sarlavhasi *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: Tengsizliklar va simmetrik ifodalar"
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
                required
              />
            </div>

            {/* Olympiad */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Tegishli Olimpiada *</label>
              <select
                value={olympiadId}
                onChange={(e) => setOlympiadId(e.target.value)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                {olympiads.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Yil *</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            {/* Group */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Toifa guruhi *</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as StudentGroup)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Junior">Junior (5–8 sinflar)</option>
                <option value="Senior">Senior (9–11 sinflar)</option>
              </select>
            </div>

            {/* Stage */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Bosqich *</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Maktab bosqichi">Maktab bosqichi</option>
                <option value="Tuman bosqichi">Tuman bosqichi</option>
                <option value="Viloyat bosqichi">Viloyat bosqichi</option>
                <option value="Respublika bosqichi">Respublika bosqichi</option>
                <option value="Xalqaro saralash (TST)">Xalqaro saralash (TST)</option>
                <option value="Xalqaro olimpiada (IMO/BMO/EGMO)">Xalqaro olimpiada</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Qiyinchilik *</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Oson">Oson</option>
                <option value="O'rta">O‘rta</option>
                <option value="Qiyin">Qiyin</option>
                <option value="Olimpiada">Olimpiada</option>
              </select>
            </div>

            {/* Topic */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Mavzu *</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as any)}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Algebra">Algebra</option>
                <option value="Geometriya">Geometriya</option>
                <option value="Sonlar nazariyasi">Sonlar nazariyasi</option>
                <option value="Kombinatorika">Kombinatorika</option>
                <option value="Mantiq">Mantiq</option>
              </select>
            </div>

            {/* Max Score */}
            <div>
              <label className="block font-semibold text-purple-200 mb-1">Maksimal Ball *</label>
              <input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(Number(e.target.value))}
                className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          {/* Statement */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-purple-200">
                Masala sharti (O‘zbek tilida, LaTeX formulalari $...$ bilan) *
              </label>
              <span className="text-[10px] text-pink-400">Formula namunasi: $x^2 + y^2 = z^2$</span>
            </div>
            <textarea
              rows={4}
              value={statementUz}
              onChange={(e) => setStatementUz(e.target.value)}
              placeholder="Masala to‘liq shartini kiriting..."
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#7C3AED] font-mono leading-relaxed"
              required
            />
            {statementUz && (
              <div className="mt-2 p-3 bg-[#130728] border border-[#2B104E] rounded-xl">
                <span className="text-[10px] text-purple-400 block mb-1 uppercase tracking-wider font-semibold">Jonli Ko‘rinish (KaTeX):</span>
                <MathView content={statementUz} className="text-xs text-white" />
              </div>
            )}
          </div>

          {/* Official Answer */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">Rasmiy Yakuniy Javob</label>
            <input
              type="text"
              value={officialAnswer}
              onChange={(e) => setOfficialAnswer(e.target.value)}
              placeholder="Masalan: 156 va 264 sonlari"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          {/* Official Solution */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">Rasmiy Model Yechim (Isbot va tahlil)</label>
            <textarea
              rows={5}
              value={officialSolution}
              onChange={(e) => setOfficialSolution(e.target.value)}
              placeholder="To‘liq isbot va qadamlarni kiriting..."
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#7C3AED] font-mono leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2C134E]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('problems');
                setEditingProblemId(null);
              }}
              className="px-5 py-2.5 bg-[#120626] border border-[#3B1D63] text-purple-300 text-xs rounded-xl hover:text-white transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{editingProblemId ? "O‘zgarishlarni saqlash" : "Masalani nashr qilish"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================ */}
      {/* TAB 4: OLIMPIADALARNI BOSHQARISH                             */}
      {/* ============================================================ */}
      {activeTab === 'olympiads' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Add Olympiad Form */}
          <form onSubmit={handleAddOlympiad} className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Yangi olimpiada musobaqasini qo‘shish</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-purple-200 mb-1">Olimpiada nomi *</label>
                <input
                  type="text"
                  value={newOlympiadName}
                  onChange={(e) => setNewOlympiadName(e.target.value)}
                  placeholder="Masalan: Mirzo Ulug‘bek Nomidagi Matematika Olimpiadasi"
                  className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-1">Turi</label>
                <select
                  value={newOlympiadType}
                  onChange={(e) => setNewOlympiadType(e.target.value)}
                  className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="Milliy">Milliy Olimpiada</option>
                  <option value="Xalqaro">Xalqaro Musobaqa</option>
                  <option value="Ixtisoslashtirilgan">Ixtisoslashtirilgan Maktab Saralashi</option>
                </select>
              </div>

              <div>
                <label className="block text-purple-200 mb-1">Qisqa tavsif</label>
                <input
                  type="text"
                  value={newOlympiadDesc}
                  onChange={(e) => setNewOlympiadDesc(e.target.value)}
                  placeholder="Tavsifi..."
                  className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                + Olimpiadani qo‘shish
              </button>
            </div>
          </form>

          {/* Olympiads List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {olympiads.map((ol) => (
              <div key={ol.id} className="bg-[#190A35] border border-[#3B1D63] p-5 rounded-2xl flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {ol.competitionType}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{ol.name}</h4>
                    <p className="text-xs text-purple-300 mt-1">{ol.shortDescription}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`${ol.name} olimpiadasini o‘chirmoqchimisiz?`)) {
                        deleteOlympiad(ol.id);
                      }
                    }}
                    className="p-1.5 text-rose-400 hover:text-rose-300 rounded"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-purple-400 pt-2 border-t border-[#2C134E]">
                  <span>Yillar: {ol.availableYears.join(', ')}</span>
                  <span>Masalalar: {problems.filter(p => p.olympiadId === ol.id).length} ta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
