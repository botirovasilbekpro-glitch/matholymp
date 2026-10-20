import React, { useState } from 'react';
import { QUICK_LATEX_SYMBOLS, LatexSymbolAction } from '../lib/math-parser.ts';
import { Sparkles, HelpCircle } from 'lucide-react';

interface LatexToolbarProps {
  onInsertLatex: (snippet: string) => void;
}

export const LatexToolbar: React.FC<LatexToolbarProps> = ({ onInsertLatex }) => {
  const [activeCategory, setActiveCategory] = useState<'Hammasi' | 'Asosiy' | 'Algebra' | 'Sonlar' | 'Geometriya'>('Hammasi');
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const filteredSymbols = activeCategory === 'Hammasi'
    ? QUICK_LATEX_SYMBOLS
    : QUICK_LATEX_SYMBOLS.filter((s) => s.category === activeCategory);

  return (
    <div className="bg-[#15082E] border-b border-[#3B1D63] p-2.5 rounded-t-xl select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#2A134A]">
        {/* Category filters */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs">
          {(['Hammasi', 'Asosiy', 'Algebra', 'Sonlar', 'Geometriya'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeCategory === cat
                  ? 'bg-[#7C3AED] text-white font-semibold'
                  : 'text-purple-300 hover:bg-[#251045]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick formatting helper */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => onInsertLatex('$$ \n\\text{formula}\n $$')}
            className="px-2 py-1 bg-[#251045] hover:bg-[#341663] text-purple-200 border border-[#3B1D63] rounded-md transition"
            title="Markaziy formula bloki"
          >
            $$ Bloki
          </button>
          <button
            type="button"
            onClick={() => onInsertLatex('$x$')}
            className="px-2 py-1 bg-[#251045] hover:bg-[#341663] text-purple-200 border border-[#3B1D63] rounded-md transition"
            title="Satr ichidagi formula"
          >
            $ Inline
          </button>
          <button
            type="button"
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="p-1 text-purple-300 hover:text-white transition"
            title="LaTeX yordamchisi"
            aria-label="LaTeX yordamchisi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick symbol buttons */}
      <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto pr-1">
        {filteredSymbols.map((item: LatexSymbolAction, idx: number) => (
          <button
            key={idx}
            type="button"
            onClick={() => onInsertLatex(item.latex)}
            title={`${item.description} (${item.latex})`}
            className="px-2.5 py-1 text-xs font-mono bg-[#1E0D3C] hover:bg-[#7C3AED] text-purple-200 hover:text-white border border-[#3B1D63] rounded-md transition-all active:scale-95 shadow-sm"
          >
            {item.label}
          </button>
        ))}
      </div>

      {showCheatsheet && (
        <div className="mt-2.5 p-3 bg-[#1B0C39] border border-[#7C3AED]/50 rounded-lg text-xs text-purple-200 space-y-1 animate-fadeIn">
          <div className="flex items-center gap-1.5 font-semibold text-purple-100">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>LaTeX qisqa qo‘llanmasi:</span>
          </div>
          <p>• Satr ichidagi formulalarni <code className="bg-purple-950 px-1 py-0.5 rounded text-pink-300">$...$</code> orasiga yozing (masalan, $x^2 + y^2 = 1$).</p>
          <p>• Katta alohida formulalarni <code className="bg-purple-950 px-1 py-0.5 rounded text-pink-300">$$...$$</code> orasiga yozing.</p>
          <p>• Kasr uchun: <code className="bg-purple-950 px-1 py-0.5 rounded text-pink-300">\frac{"{surat}"}{"{maxraj}"}</code>, ildiz uchun: <code className="bg-purple-950 px-1 py-0.5 rounded text-pink-300">\sqrt{"{x}"}</code>.</p>
        </div>
      )}
    </div>
  );
};
