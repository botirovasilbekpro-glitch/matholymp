import React, { useState, useRef, useEffect } from 'react';
import { LatexToolbar } from './LatexToolbar.tsx';
import { MathView } from './MathView.tsx';
import { Eye, Edit3, Save, CheckCircle2, RotateCcw } from 'lucide-react';

interface SolutionEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSaveDraft?: () => void;
  placeholder?: string;
  problemId: string;
}

export const SolutionEditor: React.FC<SolutionEditorProps> = ({
  value,
  onChange,
  onSaveDraft,
  placeholder = "Yechimingizni matn va LaTeX formulalari orqali batafsil tushuntiring...\nMasalan: Uchburchak burchaklari yig'indisi $180^\\circ$ ga teng bo'lgani uchun...",
  problemId,
}) => {
  const [activeTab, setActiveTab] = useState<'split' | 'edit' | 'preview'>('split');
  const [draftSavedAlert, setDraftSavedAlert] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Insert LaTeX at current cursor position
  const handleInsertLatex = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + snippet);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextValue = value.substring(0, start) + snippet + value.substring(end);
    onChange(nextValue);

    setTimeout(() => {
      textarea.focus();
      const nextPos = start + snippet.length;
      textarea.setSelectionRange(nextPos, nextPos);
    }, 0);
  };

  const handleManualSave = () => {
    if (onSaveDraft) {
      onSaveDraft();
      setDraftSavedAlert(true);
      setTimeout(() => setDraftSavedAlert(false), 2500);
    }
  };

  const handleClear = () => {
    if (window.confirm("Yozilgan matnni tozalashni xohlaysizmi?")) {
      onChange('');
    }
  };

  return (
    <div className="bg-[#190A35] border border-[#3B1D63] rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Top Header & Tab Controls */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#130728] border-b border-[#3B1D63] gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'split'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-purple-300 hover:bg-[#200C3F]'
            }`}
          >
            <div className="w-3.5 h-3.5 flex border border-current rounded-sm overflow-hidden">
              <span className="w-1/2 bg-current opacity-40"></span>
            </div>
            <span className="hidden sm:inline">Qo‘shma ko‘rinish</span>
            <span className="sm:hidden">Split</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'edit'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-purple-300 hover:bg-[#200C3F]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Tahrirlash</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'preview'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-purple-300 hover:bg-[#200C3F]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Jonli natija (LaTeX)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {draftSavedAlert && (
            <span className="flex items-center gap-1 text-emerald-400 font-medium animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Qoralama saqlandi
            </span>
          )}
          {onSaveDraft && (
            <button
              type="button"
              onClick={handleManualSave}
              className="flex items-center gap-1 px-2.5 py-1 text-purple-300 hover:text-white bg-[#200C3F] hover:bg-[#2E1259] border border-[#3B1D63] rounded-md transition"
              title="Qoralamani saqlash"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Saqlash</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-purple-400 hover:text-purple-200 transition"
            title="Matnni tozalash"
            aria-label="Matnni tozalash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* LaTeX Quick Insertion Toolbar */}
      <LatexToolbar onInsertLatex={handleInsertLatex} />

      {/* Content Area */}
      <div className="min-h-[260px] flex-1">
        {activeTab === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#3B1D63] min-h-[280px]">
            {/* Editor textarea */}
            <div className="relative p-2">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-full min-h-[260px] p-3 bg-transparent text-white placeholder-purple-400/50 font-mono text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed"
                spellCheck={false}
              />
            </div>
            {/* Live rendered preview */}
            <div className="p-4 bg-[#14062B]/50 overflow-y-auto max-h-[360px]">
              <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-pink-400" />
                Matematik formula ko‘rinishi:
              </div>
              {value.trim() ? (
                <MathView content={value} className="text-sm" />
              ) : (
                <p className="text-purple-400/40 italic text-sm">
                  Yechim yozishni boshlang... LaTeX formulalar avtomatik chiroyli ko‘rinishda chiqadi.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="p-3">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full min-h-[280px] p-3 bg-transparent text-white placeholder-purple-400/50 font-mono text-sm resize-y focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="p-6 bg-[#14062B]/70 min-h-[280px]">
            <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-pink-400" />
              To‘liq matematik tasvir:
            </div>
            {value.trim() ? (
              <MathView content={value} className="text-base" />
            ) : (
              <p className="text-purple-400/40 italic">Hozircha hech narsa yozilmadi.</p>
            )}
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#120626] border-t border-[#3B1D63] text-xs text-purple-300">
        <span>Belgilar soni: {value.length}</span>
        <span className="text-purple-400">
          Formulalar: {((value.match(/\$/g) || []).length / 2) | 0} ta
        </span>
      </div>
    </div>
  );
};
