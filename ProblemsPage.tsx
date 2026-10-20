import React, { useState, useMemo } from 'react';
import { useStore } from '../lib/store.ts';
import { Problem, StudentGroup, DifficultyLevel, Grade } from '../types/index.ts';
import { MathView } from '../components/MathView.tsx';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface ProblemsPageProps {
  onNavigate: (path: string) => void;
  onSelectProblem: (id: string) => void;
  initialGroupFilter?: StudentGroup | null;
  initialOlympiadFilter?: string | null;
}

export const ProblemsPage: React.FC<ProblemsPageProps> = ({
  onNavigate,
  onSelectProblem,
  initialGroupFilter,
  initialOlympiadFilter,
}) => {
  const { problems, olympiads, isBookmarked, toggleBookmark, submissions, user } = useStore();

  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroupFilter || 'All');
  const [selectedOlympiad, setSelectedOlympiad] = useState<string>(initialOlympiadFilter || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  // Solved problem IDs for current user
  const solvedProblemIds = useMemo(() => {
    if (!user) return new Set<string>();
    return new Set(
      submissions
        .filter((s) => s.userId === user.id && s.feedback?.category === 'To‘g‘ri yechim')
        .map((s) => s.problemId)
    );
  }, [submissions, user]);

  const filteredProblems = useMemo(() => {
    return problems.filter((prob: Problem) => {
      // Search in title, statement, or olympiad name
      const matchesSearch =
        prob.title.toLowerCase().includes(search.toLowerCase()) ||
        prob.statementUz.toLowerCase().includes(search.toLowerCase()) ||
        prob.olympiadName.toLowerCase().includes(search.toLowerCase());

      // Group
      const matchesGroup = selectedGroup === 'All' || prob.group === selectedGroup;

      // Olympiad
      const matchesOlympiad =
        selectedOlympiad === 'All' || prob.olympiadId === selectedOlympiad;

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;

      // Topic
      const matchesTopic = selectedTopic === 'All' || prob.topic === selectedTopic;

      // Grade
      const matchesGrade =
        selectedGrade === 'All' ||
        prob.eligibleGrades.includes(Number(selectedGrade) as Grade);

      return (
        matchesSearch &&
        matchesGroup &&
        matchesOlympiad &&
        matchesDifficulty &&
        matchesTopic &&
        matchesGrade
      );
    });
  }, [
    problems,
    search,
    selectedGroup,
    selectedOlympiad,
    selectedDifficulty,
    selectedTopic,
    selectedGrade,
  ]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedGroup('All');
    setSelectedOlympiad('All');
    setSelectedDifficulty('All');
    setSelectedTopic('All');
    setSelectedGrade('All');
  };

  const getDifficultyBadge = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'Oson':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40';
      case "O'rta":
        return 'bg-amber-950/60 text-amber-400 border-amber-500/40';
      case 'Qiyin':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
      case 'Olimpiada':
        return 'bg-rose-950/60 text-rose-300 border-rose-500/40';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#3B1D63]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F0A3E] text-purple-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            <span>Matematik masalalar arxivi</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Masalalar katalogi
          </h1>
          <p className="text-purple-300 text-sm mt-1 max-w-xl">
            Rasmiy olimpiadalarning haqiqiy masalalari, to‘liq formulalar va bosqichlar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="text-xs bg-[#190A35] px-3.5 py-2 rounded-xl border border-[#3B1D63] text-purple-300 font-mono">
              Yechilgan: <strong className="text-emerald-400 font-bold">{solvedProblemIds.size}</strong> ta
            </div>
          )}
          <div className="text-xs bg-[#190A35] px-3.5 py-2 rounded-xl border border-[#3B1D63] text-purple-300 font-mono">
            Topildi: <strong className="text-white font-bold">{filteredProblems.length}</strong> ta
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-[#190A35] border border-[#3B1D63] p-5 rounded-2xl space-y-4">
        {/* Row 1: Search + Group Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Masala matni, mavzusi yoki kalit so‘z bo‘yicha qidirish..."
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          {/* Junior / Senior group selector */}
          <div className="flex items-center bg-[#120626] p-1 rounded-xl border border-[#3B1D63] text-xs justify-center">
            <button
              type="button"
              onClick={() => setSelectedGroup('All')}
              className={`flex-1 py-1.5 px-3 rounded-lg transition font-medium ${
                selectedGroup === 'All'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Barcha guruhlar
            </button>
            <button
              type="button"
              onClick={() => setSelectedGroup('Junior')}
              className={`flex-1 py-1.5 px-3 rounded-lg transition font-medium ${
                selectedGroup === 'Junior'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Junior (5–8)
            </button>
            <button
              type="button"
              onClick={() => setSelectedGroup('Senior')}
              className={`flex-1 py-1.5 px-3 rounded-lg transition font-medium ${
                selectedGroup === 'Senior'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Senior (9–11)
            </button>
          </div>
        </div>

        {/* Row 2: Secondary Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#2A114E] text-xs">
          {/* Olympiad filter */}
          <div>
            <label className="block text-[11px] font-semibold text-purple-300 mb-1">
              Olimpiada:
            </label>
            <select
              value={selectedOlympiad}
              onChange={(e) => setSelectedOlympiad(e.target.value)}
              aria-label="Olimpiada"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-lg px-2.5 py-1.5 text-purple-200 focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="All">Barcha olimpiadalar</option>
              {olympiads.map((olymp) => (
                <option key={olymp.id} value={olymp.id}>
                  {olymp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty filter */}
          <div>
            <label className="block text-[11px] font-semibold text-purple-300 mb-1">
              Qiyinchilik:
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              aria-label="Qiyinchilik darajasi"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-lg px-2.5 py-1.5 text-purple-200 focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="All">Barcha darajalar</option>
              <option value="Oson">Oson</option>
              <option value="O'rta">O‘rta</option>
              <option value="Qiyin">Qiyin</option>
              <option value="Olimpiada">Olimpiada (Xalqaro)</option>
            </select>
          </div>

          {/* Topic filter */}
          <div>
            <label className="block text-[11px] font-semibold text-purple-300 mb-1">
              Mavzu (Bo‘lim):
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              aria-label="Mavzu"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-lg px-2.5 py-1.5 text-purple-200 focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="All">Barcha mavzular</option>
              <option value="Algebra">Algebra</option>
              <option value="Geometriya">Geometriya</option>
              <option value="Sonlar nazariyasi">Sonlar nazariyasi</option>
              <option value="Kombinatorika">Kombinatorika</option>
              <option value="Mantiq">Mantiq</option>
            </select>
          </div>

          {/* Grade filter */}
          <div>
            <label className="block text-[11px] font-semibold text-purple-300 mb-1">
              Sinf:
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              aria-label="Sinf"
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-lg px-2.5 py-1.5 text-purple-200 focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="All">Barcha sinflar</option>
              <option value="5">5-sinf</option>
              <option value="6">6-sinf</option>
              <option value="7">7-sinf</option>
              <option value="8">8-sinf</option>
              <option value="9">9-sinf</option>
              <option value="10">10-sinf</option>
              <option value="11">11-sinf</option>
            </select>
          </div>
        </div>

        {/* Reset button row */}
        {(search || selectedGroup !== 'All' || selectedOlympiad !== 'All' || selectedDifficulty !== 'All' || selectedTopic !== 'All' || selectedGrade !== 'All') && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Filtrlarni tozalash</span>
            </button>
          </div>
        )}
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.map((prob: Problem) => {
          const isSolved = solvedProblemIds.has(prob.id);
          const bookmarked = isBookmarked(prob.id);

          return (
            <div
              key={prob.id}
              className={`bg-[#190A35] border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-[#7C3AED] relative ${
                isSolved ? 'border-emerald-500/40 bg-[#160b2d]' : 'border-[#3B1D63]'
              }`}
            >
              {/* Top metadata tags */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md font-bold bg-[#261048] text-purple-200 border border-[#3B1D63]">
                    {prob.olympiadName} • {prob.year}
                  </span>
                  <span className="px-2 py-0.5 rounded-md font-medium bg-[#1F0A38] text-purple-300">
                    {prob.stage}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md font-semibold border text-[11px] ${getDifficultyBadge(prob.difficulty)}`}>
                    {prob.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#14062B] text-pink-300 border border-[#3B1D63]">
                    {prob.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isSolved && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Yechilgan
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(prob.id)}
                    className="p-1.5 rounded-lg text-purple-300 hover:text-pink-400 hover:bg-purple-900/30 transition"
                    title={bookmarked ? "Saqlangandan o‘chirish" : "Masalani saqlab qo‘yish"}
                    aria-label={bookmarked ? "Saqlangandan o‘chirish" : "Saqlash"}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-pink-400 fill-pink-400" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Problem Number */}
              <h2 className="text-xl font-bold text-white mb-3">
                #{prob.problemNumber}-masala: {prob.title}
              </h2>

              {/* Statement Preview with KaTeX */}
              <div className="bg-[#120626] p-4 rounded-xl border border-[#2B124C] mb-4 text-sm text-purple-100 max-h-36 overflow-hidden relative">
                <MathView content={prob.statementUz} />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#120626] to-transparent pointer-events-none" />
              </div>

              {/* Bottom Details & Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-purple-400 flex items-center gap-2">
                  <span>Sinflar: <strong>{prob.eligibleGrades.join(', ')}-sinf</strong></span>
                  <span>•</span>
                  <span>Guruh: <strong className="text-purple-200">{prob.group}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectProblem(prob.id);
                    onNavigate(`/problems/${prob.id}`);
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-95 transition shadow-md shadow-purple-900/30 flex items-center gap-2"
                >
                  <span>Masalani yechish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="text-center py-16 bg-[#190A35] border border-[#3B1D63] rounded-2xl p-8">
            <Layers className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">Masalalar topilmadi</h3>
            <p className="text-xs text-purple-300 mb-4">
              Tanlangan filtrlar bo‘yicha hozircha masala yo‘q. Filtrlarni o‘zgartiring.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
