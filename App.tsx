/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { OlympiadsPage } from './pages/OlympiadsPage.tsx';
import { ProblemsPage } from './pages/ProblemsPage.tsx';
import { ProblemDetailPage } from './pages/ProblemDetailPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { BookmarksPage } from './pages/BookmarksPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { SetupModal } from './components/SetupModal.tsx';
import { AuthGuardModal } from './components/AuthGuardModal.tsx';
import { useStore, store } from './lib/store.ts';
import { StudentGroup } from './types/index.ts';
import { Sparkles, Database, Lock, UserPlus, LogIn } from 'lucide-react';

export default function App() {
  const { user } = useStore();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [activeProblemId, setActiveProblemId] = useState<string>('prob-jun-1');
  const [groupFilter, setGroupFilter] = useState<StudentGroup | null>(null);
  const [olympiadFilter, setOlympiadFilter] = useState<string | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [authGuardOpen, setAuthGuardOpen] = useState(false);
  const [guardFeatureName, setGuardFeatureName] = useState('Olimpiadalar va masalalar');

  // Sync with browser hash / history
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      
      if (hash.startsWith('/problems/')) {
        const id = hash.replace('/problems/', '');
        if (id) {
          setActiveProblemId(id);
          setCurrentPath('/problems/:id');
          return;
        }
      }

      if (hash.startsWith('/problems?group=')) {
        const grp = hash.split('group=')[1] as StudentGroup;
        setGroupFilter(grp);
        setCurrentPath('/problems');
        return;
      }

      if (hash.startsWith('/problems?olympiad=')) {
        const olymp = hash.split('olympiad=')[1];
        setOlympiadFilter(olymp);
        setCurrentPath('/problems');
        return;
      }

      setCurrentPath(hash);
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    // Check up-to-date user directly from store
    const currentUser = store.getUser();

    // Protected routes check for unauthenticated users
    const isProtected = 
      path.startsWith('/olympiads') ||
      path.startsWith('/problems') ||
      path.startsWith('/dashboard') ||
      path.startsWith('/profile') ||
      path.startsWith('/bookmarks');

    if (path === '/login' || path === '/register' || path === '/') {
      setAuthGuardOpen(false);
    }

    if (isProtected && !currentUser) {
      setGuardFeatureName(
        path.startsWith('/olympiads') ? "Olimpiadalar katalogi" :
        path.startsWith('/problems') ? "Masalalar va yechish muharriri" :
        "Shaxsiy kabinet va profil"
      );
      setAuthGuardOpen(true);
      return;
    }

    setAuthGuardOpen(false);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path.startsWith('/problems/')) {
      const id = path.replace('/problems/', '');
      setActiveProblemId(id);
      setCurrentPath('/problems/:id');
      return;
    }

    if (path.startsWith('/problems?group=')) {
      const grp = path.split('group=')[1] as StudentGroup;
      setGroupFilter(grp);
      setCurrentPath('/problems');
      return;
    }

    if (path.startsWith('/problems?olympiad=')) {
      const olymp = path.split('olympiad=')[1];
      setOlympiadFilter(olymp);
      setCurrentPath('/problems');
      return;
    }

    setCurrentPath(path);
  };

  const renderCurrentView = () => {
    const currentUser = store.getUser();

    // If not authenticated and attempting to view protected pages
    const isProtected = 
      currentPath.startsWith('/problems/:id') ||
      currentPath === '/olympiads' ||
      currentPath === '/problems' ||
      currentPath === '/dashboard' ||
      currentPath === '/profile' ||
      currentPath === '/bookmarks';

    if (isProtected && !currentUser) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#E879F9] flex items-center justify-center mx-auto text-white shadow-2xl shadow-purple-900/60">
            <Lock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Ro‘yxatdan o‘tish talab etiladi</span>
            </div>
            <h2 className="text-3xl font-black text-white">
              Olimpiada masalalariga kirish cheklangan
            </h2>
            <p className="text-sm text-purple-200/90 leading-relaxed max-w-lg mx-auto">
              Hurmatli o‘quvchi! Olimpiadalarni ko‘rish, masalalarni yechish, daftarga yozilgan yechimni rasmga olib AI orqali tekshirtirish uchun avval tizimda ro‘yxatdan o‘tishingiz kerak.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#E879F9] hover:opacity-95 shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>Ro‘yxatdan o‘tish (O‘quvchilar uchun)</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs text-purple-200 hover:text-white bg-[#190A35] hover:bg-[#251048] border border-[#3B1D63] flex items-center justify-center gap-2 transition"
            >
              <LogIn className="w-4 h-4 text-purple-400" />
              <span>Tizimga kirish</span>
            </button>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs text-purple-400 hover:text-white transition"
            >
              ← Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      );
    }

    if (currentPath.startsWith('/problems/:id')) {
      return (
        <ProblemDetailPage
          problemId={activeProblemId}
          onNavigate={navigate}
        />
      );
    }

    switch (currentPath) {
      case '/':
        return (
          <HomePage
            onNavigate={navigate}
            onSelectGroupFilter={(grp) => setGroupFilter(grp)}
          />
        );
      case '/olympiads':
        return (
          <OlympiadsPage
            onNavigate={navigate}
            onSelectOlympiad={(olympId) => setOlympiadFilter(olympId)}
          />
        );
      case '/problems':
        return (
          <ProblemsPage
            onNavigate={navigate}
            onSelectProblem={(id) => {
              setActiveProblemId(id);
              navigate(`/problems/${id}`);
            }}
            initialGroupFilter={groupFilter}
            initialOlympiadFilter={olympiadFilter}
          />
        );
      case '/dashboard':
        return (
          <DashboardPage
            onNavigate={navigate}
            onSelectProblem={(id) => {
              setActiveProblemId(id);
              navigate(`/problems/${id}`);
            }}
          />
        );
      case '/profile':
        return <ProfilePage onNavigate={navigate} />;
      case '/bookmarks':
        return (
          <BookmarksPage
            onNavigate={navigate}
            onSelectProblem={(id) => {
              setActiveProblemId(id);
              navigate(`/problems/${id}`);
            }}
          />
        );
      case '/login':
        return <LoginPage onNavigate={navigate} />;
      case '/register':
        return <RegisterPage onNavigate={navigate} />;
      case '/admin':
        return (
          <AdminPage
            onNavigate={navigate}
            onSelectProblem={(id) => {
              setActiveProblemId(id);
              navigate(`/problems/${id}`);
            }}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onSelectGroupFilter={(grp) => setGroupFilter(grp)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#10051F] text-white flex flex-col selection:bg-[#7C3AED] selection:text-white relative">
      {/* Navbar Header */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Floating System & AI Status Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsSetupModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-[#190A35]/90 hover:bg-[#250E4A] backdrop-blur-md border border-[#7C3AED]/50 hover:border-[#A855F7] rounded-full text-xs font-semibold text-purple-200 hover:text-white shadow-xl shadow-purple-950/60 transition-all hover:scale-105 active:scale-95"
          title="Supabase va AI holati"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Database className="w-3.5 h-3.5 text-pink-400" />
          <span className="hidden sm:inline">Tizim holati (AI & DB)</span>
        </button>
      </div>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Setup / DB / AI Status Modal */}
      <SetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      {/* Global Auth Guard Modal */}
      <AuthGuardModal
        isOpen={authGuardOpen && !user && currentPath !== '/login' && currentPath !== '/register'}
        onClose={() => setAuthGuardOpen(false)}
        onNavigate={navigate}
        targetFeatureName={guardFeatureName}
      />
    </div>
  );
}
