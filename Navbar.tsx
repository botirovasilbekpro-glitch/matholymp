import React, { useState } from 'react';
import { useStore } from '../lib/store.ts';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Bookmark, 
  Shield, 
  BookOpen, 
  Trophy, 
  Settings,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, logout, switchRole } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Bosh sahifa', path: '/' },
    { label: 'Olimpiadalar', path: '/olympiads' },
    { label: 'Masalalar', path: '/problems' },
    { label: 'Profil', path: '/dashboard' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#10051F]/90 backdrop-blur-md border-b border-[#3B1D63]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: MathOlymp Logo */}
        <button
          type="button"
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 group focus:outline-none text-left"
          aria-label="MathOlympJon bosh sahifasiga o‘tish"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#E879F9] flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                Math<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#E879F9]">OlympJon</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-900/60 text-purple-300 border border-purple-500/30 rounded">
                .UZ
              </span>
            </div>
            <span className="text-[11px] text-purple-300/90 block -mt-0.5 font-medium">
              Asilbek Botirov • Mirzo Ulug‘bek maktabi 9-sinf
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#190A35]/60 border border-[#3B1D63] p-1.5 rounded-full px-4 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || 
              (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.path)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md'
                    : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {/* Direct Admin Button for Asilbek Botirov */}
              {(user.email.toLowerCase() === 'botirovasilbekpro@gmail.com' || user.role === 'admin') && (
                <button
                  type="button"
                  onClick={() => handleNav('/admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-600/20 border border-amber-500/50 text-amber-300 text-xs font-bold hover:bg-amber-500/30 shadow-md transition"
                  title="Asilbek Botirov admin paneli va o‘quvchilar ro‘yxati"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Boshqaruv</span>
                </button>
              )}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-[#190A35] hover:bg-[#220D45] border border-[#3B1D63] transition shadow-sm"
                >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white font-bold text-xs">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
                <div className="text-left text-xs">
                  <div className="font-semibold text-white leading-tight">
                    {user.firstName}
                  </div>
                  <div className="text-[11px] text-purple-300 flex items-center gap-1">
                    <span>{user.group}</span>
                    <span>•</span>
                    <span>{user.grade}-sinf</span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-purple-300" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#190A35] border border-[#3B1D63] rounded-xl shadow-2xl py-2 z-50 text-xs animate-fadeIn">
                  <div className="px-4 py-2 border-b border-[#2D1452]">
                    <p className="font-semibold text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-purple-400 text-[11px] truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#7C3AED]/30 text-purple-200 border border-[#7C3AED]/40">
                      {user.role === 'admin' ? '🛡️ Administrator' : `🎓 ${user.group} (${user.grade}-sinf)`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNav('/dashboard')}
                    className="w-full text-left px-4 py-2 hover:bg-[#250F4B] text-purple-200 hover:text-white flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-purple-400" />
                    Mening profilim
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('/bookmarks')}
                    className="w-full text-left px-4 py-2 hover:bg-[#250F4B] text-purple-200 hover:text-white flex items-center gap-2"
                  >
                    <Bookmark className="w-4 h-4 text-purple-400" />
                    Saqlangan masalalar
                  </button>

                  {user.email.toLowerCase() === 'botirovasilbekpro@gmail.com' || user.role === 'admin' ? (
                    <button
                      type="button"
                      onClick={() => handleNav('/admin')}
                      className="w-full text-left px-4 py-2 hover:bg-[#250F4B] text-amber-300 hover:text-amber-200 flex items-center gap-2 border-t border-[#2D1452]"
                    >
                      <Shield className="w-4 h-4 text-amber-400" />
                      Admin boshqaruvi (Asilbek Botirov)
                    </button>
                  ) : null}

                  <div className="border-t border-[#2D1452] mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        handleNav('/');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-950/40 text-rose-300 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Chiqish
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNav('/login')}
                className="px-4 py-2 text-sm font-semibold text-purple-200 hover:text-white transition"
              >
                Kirish
              </button>
              <button
                type="button"
                onClick={() => handleNav('/register')}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#E879F9] hover:opacity-90 rounded-xl transition shadow-md shadow-purple-900/30"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <button
              type="button"
              onClick={() => handleNav('/dashboard')}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white font-bold text-xs"
            >
              {user.firstName[0]}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-purple-300 hover:text-white rounded-lg bg-[#190A35] border border-[#3B1D63]"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#130728] border-b border-[#3B1D63] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNav(item.path)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-purple-200 hover:text-white hover:bg-[#1E0D3C]"
            >
              {item.label}
            </button>
          ))}

          {user ? (
            <div className="pt-3 border-t border-[#2C134E] space-y-2">
              <div className="px-4 py-2 bg-[#1A0937] rounded-lg">
                <p className="font-bold text-white text-sm">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-purple-300">{user.group} guruhi, {user.grade}-sinf</p>
              </div>
              <button
                type="button"
                onClick={() => handleNav('/bookmarks')}
                className="w-full text-left px-4 py-2 rounded-lg text-xs font-medium text-purple-200 hover:bg-[#1E0D3C] flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-purple-400" />
                Saqlangan masalalar
              </button>
              {(user.email.toLowerCase() === 'botirovasilbekpro@gmail.com' || user.role === 'admin') && (
                <button
                  type="button"
                  onClick={() => handleNav('/admin')}
                  className="w-full text-left px-4 py-2 rounded-lg text-xs font-medium text-amber-300 hover:bg-[#1E0D3C] flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin boshqaruvi (Asilbek Botirov)
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  handleNav('/');
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-950/40 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Chiqish
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#2C134E] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNav('/login')}
                className="w-full py-2.5 rounded-lg text-center font-medium bg-[#1E0D3C] text-purple-200"
              >
                Kirish
              </button>
              <button
                type="button"
                onClick={() => handleNav('/register')}
                className="w-full py-2.5 rounded-lg text-center font-medium bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
