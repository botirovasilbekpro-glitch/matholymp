import React, { useState, useEffect } from 'react';
import { Database, Key, CheckCircle2, AlertCircle, Copy, Check, Sparkles, X } from 'lucide-react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'status' | 'supabase' | 'ai'>('status');
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<{
    aiConfigured: boolean;
    model: string;
    platform: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/status')
        .then((res) => res.json())
        .then((data) => setServerStatus(data))
        .catch(() => setServerStatus({ aiConfigured: false, model: 'Offline / Client Heuristic', platform: 'MathOlymp Client' }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copySqlSnippet = () => {
    const sql = `-- Supabase SQL Skriptini nusxalash:
-- Fayl: supabase/schema.sql
-- Barcha profiles, olympiads, problems, submissions va RLS politsiyalari mavjud.`;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#190A35] border border-[#7C3AED]/60 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleUp">
        <div className="flex items-center justify-between border-b border-[#3B1D63] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#260E4D] rounded-xl text-pink-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Tizim va AI Sozlamalari</h3>
              <p className="text-xs text-purple-300">Supabase, PostgreSQL va AI integratsiya holati</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-950 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-[#120626] p-1 rounded-xl border border-[#3B1D63] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'status' ? 'bg-[#7C3AED] text-white shadow' : 'text-purple-300 hover:text-white'
            }`}
          >
            Integratsiya holati
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('supabase')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'supabase' ? 'bg-[#7C3AED] text-white shadow' : 'text-purple-300 hover:text-white'
            }`}
          >
            Supabase SQL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'ai' ? 'bg-[#7C3AED] text-white shadow' : 'text-purple-300 hover:text-white'
            }`}
          >
            AI Modeli
          </button>
        </div>

        {/* Tab 1: Status */}
        {activeTab === 'status' && (
          <div className="space-y-4 text-xs text-purple-200">
            <div className="p-4 bg-[#120626] border border-[#2D1350] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Server-side AI (Gemini 2.5 Flash):</span>
                {serverStatus?.aiConfigured ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Faol
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-purple-300 font-bold bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/40">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Demo & Heuristic AI
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#230C40]">
                <span className="font-semibold text-white">Ma’lumotlar bazasi rejimi:</span>
                <span className="text-purple-300 font-mono">
                  Lokal saqlash (Offline-First / Demo)
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#230C40]">
                <span className="font-semibold text-white">KaTeX Matematik render:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Faol (KaTeX 0.16)
                </span>
              </div>
            </div>

            <p className="text-purple-300/80 leading-relaxed">
              * MathOlymp platformasi to‘liq avtonom ishlaydi. Agar tashqi Supabase yoki OpenAI/Gemini kalitlari kiritilmagan bo‘lsa, tizim o‘rnatilgan intellektual matematik tahlil moduli va xavfsiz qoralama rejimida xizmat ko‘rsatadi.
            </p>
          </div>
        )}

        {/* Tab 2: Supabase Schema */}
        {activeTab === 'supabase' && (
          <div className="space-y-3 text-xs">
            <p className="text-purple-200">
              Supabase loyihangizda SQL Editor bo‘limiga o‘ting va <code className="text-pink-300">supabase/schema.sql</code> faylini ishga tushiring:
            </p>
            <div className="bg-[#120626] border border-[#2D1350] rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-[11px] text-purple-300 space-y-1">
              <p className="text-emerald-400 font-bold">-- 1. Profiles jadvali va RLS</p>
              <p>CREATE TABLE public.profiles (...);</p>
              <p className="text-emerald-400 font-bold">-- 2. Olympiads & Problems jadvali</p>
              <p>CREATE TABLE public.olympiads (...);</p>
              <p>CREATE TABLE public.problems (...);</p>
              <p className="text-emerald-400 font-bold">-- 3. Submissions va AI Feedback</p>
              <p>CREATE TABLE public.submissions (...);</p>
              <p>CREATE TABLE public.ai_feedback (...);</p>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-purple-400 text-[11px]">Barcha jadvallar va RLS tayyorlangan</span>
              <button
                type="button"
                onClick={copySqlSnippet}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#250F4B] hover:bg-[#341666] text-purple-200 rounded-lg transition border border-[#3B1D63]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Nusxalandi" : "Nusxa olish"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: AI Modeli */}
        {activeTab === 'ai' && (
          <div className="space-y-3 text-xs text-purple-200">
            <p>
              MathOlymp serveri yechimlarni bosqichma-bosqich tahlil qilish, birinchi muhim xatoni ko‘rsatish va IMO rubrikasi bo‘yicha baholash uchun sun’iy intellektdan foydalanadi:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-purple-300">
              <li><strong>Vision Model:</strong> Qo‘lyozma suratlaridagi matematik formulalarni taniy oladi.</li>
              <li><strong>Hint Mode:</strong> Butun yechimni ochib yubormasdan, bosqichma-bosqich ishoralar beradi.</li>
              <li><strong>Full Solution Mode:</strong> To‘liq LaTeX isbotini ko‘rsatadi.</li>
            </ul>
          </div>
        )}

        <div className="text-right pt-2 border-t border-[#3B1D63]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-xl transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
