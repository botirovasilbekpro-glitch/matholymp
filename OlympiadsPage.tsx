import React, { useState } from 'react';
import { useStore } from '../lib/store.ts';
import { Olympiad, StudentGroup } from '../types/index.ts';
import { 
  Trophy, 
  Search, 
  Filter, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen 
} from 'lucide-react';

interface OlympiadsPageProps {
  onNavigate: (path: string) => void;
  onSelectOlympiad: (olympiadId: string) => void;
}

export const OlympiadsPage: React.FC<OlympiadsPageProps> = ({ onNavigate, onSelectOlympiad }) => {
  const { olympiads, problems } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<'All' | StudentGroup>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Unique types
  const types = Array.from(new Set(olympiads.map((o) => o.competitionType)));

  const filteredOlympiads = olympiads.filter((olymp) => {
    // Search
    const matchesSearch = 
      olymp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      olymp.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    // Group
    const matchesGroup = 
      selectedGroup === 'All' || olymp.eligibleGroups.includes(selectedGroup);

    // Type
    const matchesType = 
      selectedType === 'All' || olymp.competitionType === selectedType;

    return matchesSearch && matchesGroup && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#3B1D63]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F0A3E] text-purple-300 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Musobaqalar katalogi</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Matematika Olimpiadalari
          </h1>
          <p className="text-purple-300 text-sm mt-1 max-w-xl">
            O‘zbekiston va xalqaro miqyosdagi rasmiy olimpiadalar tarixi, yillik bosqichlari va haqiqiy masalalari.
          </p>
        </div>

        <div className="text-xs text-purple-300 bg-[#190A35] px-4 py-2 rounded-xl border border-[#3B1D63] self-start md:self-auto font-mono">
          Jami: <strong className="text-white">{filteredOlympiads.length}</strong> ta olimpiada
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-[#190A35] border border-[#3B1D63] p-4 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Olimpiada nomi bo‘yicha qidirish..."
              className="w-full bg-[#120626] border border-[#3B1D63] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          {/* Group & Type Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Group Filter */}
            <div className="flex items-center bg-[#120626] p-1 rounded-xl border border-[#3B1D63] text-xs">
              <button
                type="button"
                onClick={() => setSelectedGroup('All')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedGroup === 'All'
                    ? 'bg-[#7C3AED] text-white font-semibold'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Barchasi
              </button>
              <button
                type="button"
                onClick={() => setSelectedGroup('Junior')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedGroup === 'Junior'
                    ? 'bg-[#7C3AED] text-white font-semibold'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Junior (5–8)
              </button>
              <button
                type="button"
                onClick={() => setSelectedGroup('Senior')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedGroup === 'Senior'
                    ? 'bg-[#2563EB] text-white font-semibold'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Senior (9–11)
              </button>
            </div>

            {/* Type selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Musobaqa turi"
              className="bg-[#120626] border border-[#3B1D63] text-purple-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="All">Barcha turlar</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Olympiads Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOlympiads.map((olymp: Olympiad) => {
          const olympProblemsCount = problems.filter((p) => p.olympiadId === olymp.id).length;

          return (
            <div
              key={olymp.id}
              className="bg-[#190A35] border border-[#3B1D63] hover:border-[#7C3AED] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/50 group"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#251048] text-[#C084FC] border border-[#3B1D63]">
                    {olymp.competitionType}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {olymp.eligibleGroups.map((grp) => (
                      <span
                        key={grp}
                        className={`px-2 py-0.5 text-[10px] font-extrabold rounded ${
                          grp === 'Junior'
                            ? 'bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40'
                            : 'bg-[#2563EB]/20 text-blue-300 border border-[#2563EB]/40'
                        }`}
                      >
                        {grp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition mb-2">
                  {olymp.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-purple-300/80 leading-relaxed mb-4 line-clamp-3">
                  {olymp.shortDescription}
                </p>

                {/* Available Years list */}
                <div className="flex items-center gap-2 mb-4 text-xs text-purple-400">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  <span>Yillar:</span>
                  <div className="flex flex-wrap gap-1">
                    {olymp.availableYears.map((yr) => (
                      <span key={yr} className="px-1.5 py-0.5 bg-[#120626] rounded text-[11px] text-purple-200 border border-[#2D1452]">
                        {yr}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Official license tag */}
                <div className="flex items-center gap-1.5 text-[11px] text-purple-400 mb-6 bg-[#130728] p-2 rounded-lg border border-[#2B124C]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{olymp.licensingInfo}</span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-[#2A114D] flex items-center justify-between">
                <span className="text-xs text-purple-300 font-mono">
                  Masalalar: <strong className="text-white font-bold">{olympProblemsCount} ta</strong>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onSelectOlympiad(olymp.id);
                    onNavigate(`/problems?olympiad=${olymp.id}`);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:opacity-95 transition flex items-center gap-1.5 shadow-md group-hover:scale-102"
                >
                  <span>Masalalarni ko‘rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOlympiads.length === 0 && (
        <div className="text-center py-16 bg-[#190A35] border border-[#3B1D63] rounded-2xl p-8">
          <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white mb-1">Olimpiada topilmadi</h3>
          <p className="text-xs text-purple-300 mb-4">
            Qidiruv so‘zini o‘zgartirib yoki filtrlarni tozalab qaytadan urinib ko‘ring.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedGroup('All');
              setSelectedType('All');
            }}
            className="px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg"
          >
            Filtrlarni tozalash
          </button>
        </div>
      )}
    </div>
  );
};
