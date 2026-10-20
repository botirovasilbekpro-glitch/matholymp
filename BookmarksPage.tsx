import React from 'react';
import { useStore } from '../lib/store.ts';
import { Problem } from '../types/index.ts';
import { MathView } from '../components/MathView.tsx';
import { Bookmark, BookmarkX, ArrowRight, ArrowLeft } from 'lucide-react';

interface BookmarksPageProps {
  onNavigate: (path: string) => void;
  onSelectProblem: (id: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({ onNavigate, onSelectProblem }) => {
  const { problems, bookmarks, toggleBookmark } = useStore();

  const savedProblems = problems.filter((p: Problem) => bookmarks.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-[#3B1D63]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/dashboard')}
            className="p-2 bg-[#190A35] border border-[#3B1D63] text-purple-300 hover:text-white rounded-xl transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">Saqlangan masalalar</h1>
            <p className="text-xs text-purple-300 mt-0.5">
              Keyinroq yechish yoki takrorlash uchun saqlab qo‘yilgan olimpiada topshiriqlari.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono bg-[#190A35] px-3.5 py-1.5 rounded-xl border border-[#3B1D63] text-purple-200">
          Jami: <strong className="text-pink-400">{savedProblems.length}</strong> ta
        </div>
      </div>

      {savedProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedProblems.map((prob) => (
            <div
              key={prob.id}
              className="bg-[#190A35] border border-[#3B1D63] hover:border-[#7C3AED] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-purple-300 bg-[#251048] px-2.5 py-0.5 rounded border border-[#3B1D63]">
                    {prob.olympiadName} • {prob.year}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(prob.id)}
                    className="text-pink-400 hover:text-rose-400 p-1"
                    title="Saqlangandan o‘chirish"
                  >
                    <BookmarkX className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  #{prob.problemNumber}-masala: {prob.title}
                </h3>

                <div className="bg-[#120626] p-3 rounded-xl border border-[#2A114D] mb-4 text-xs text-purple-200 line-clamp-3">
                  <MathView content={prob.statementUz} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#291349]">
                <span className="text-xs text-purple-400">{prob.group} ({prob.eligibleGrades.join(', ')}-sinf)</span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectProblem(prob.id);
                    onNavigate(`/problems/${prob.id}`);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-xs font-bold rounded-xl hover:opacity-95 transition flex items-center gap-1.5 shadow-md"
                >
                  <span>Yechishga o‘tish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#190A35] border border-[#3B1D63] rounded-2xl p-8 space-y-3">
          <Bookmark className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">Saqlangan masalalar mavjud emas</h3>
          <p className="text-xs text-purple-300 max-w-sm mx-auto">
            Masalalar katalogiga o‘ting va kerakli masalani belgi ustiga bosib saqlab qo‘ying.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/problems')}
            className="px-4 py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl"
          >
            Masalalar katalogiga o‘tish
          </button>
        </div>
      )}
    </div>
  );
};
