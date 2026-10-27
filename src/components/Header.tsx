import React, { useState } from 'react';
import { TabType } from '../types';
import { PROFILE_AVATAR } from '../data/artworks';

interface HeaderProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'sobre-mi', label: 'SOBRE MÍ' },
    { id: 'obras', label: 'OBRAS' },
    { id: 'contacto', label: 'CONTACTO' },
  ];

  const handleNavClick = (tab: TabType) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#fef8f4]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(61,57,53,0.03)] border-b border-[#e7e1de]/40">
      <div className="h-20 w-full px-6 md:px-16 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Zone */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left cursor-pointer transition-opacity"
        >
          <span className="font-editorial text-lg md:text-xl text-[#1d1b19] tracking-wider uppercase group-hover:text-[#4c0c20] transition-colors duration-300">
            Florencia Passini
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] tracking-[0.2em] uppercase font-sans-clean transition-colors duration-200 cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-[#4c0c20] font-medium'
                    : 'text-[#534345] hover:text-[#1d1b19]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#4c0c20]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User profile & Mobile Menu toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('sobre-mi')}
            title="Sobre la artista"
            className="flex items-center cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src={PROFILE_AVATAR}
              alt="Florencia Passini retrato"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e7e1de]"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              style={{ display: 'none' }}
              className="w-8 h-8 rounded-full bg-[#4c0c20] text-white text-[11px] font-editorial items-center justify-center tracking-wider"
            >
              FP
            </div>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-[#534345] hover:text-[#1d1b19] transition-colors"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#fef8f4] border-b border-[#e7e1de] px-6 py-4 flex flex-col gap-3 shadow-md animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-xs uppercase tracking-[0.2em] flex items-center justify-between ${
                  isActive ? 'text-[#4c0c20] font-medium' : 'text-[#534345]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4c0c20]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
