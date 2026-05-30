"use client";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'projects', 'certificates', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home',     label: 'Beranda',  id: 'home'     },
    { href: '#about',    label: 'Tentang',  id: 'about'    },
    { href: '#projects', label: 'Karya',    id: 'projects' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'backdrop-blur-xl bg-[#0A0E17]/80 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        : 'backdrop-blur-md bg-transparent border-b border-transparent'
    }`}>
      {/* Top shimmer line — teal */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ── */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <img
              src="/icon.png"
              alt="GZ Logo"
              className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.7)] active:scale-95"
            />
          </a>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 group ${
                  activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeSection === link.id && (
                  <span className="absolute inset-0 rounded-lg bg-white/[0.06] border border-[#2DD4BF]/15" />
                )}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-white/[0.04] transition-opacity duration-300" />
                <span className="relative">{link.label}</span>
                {activeSection === link.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6]" />
                )}
              </a>
            ))}

            {/* CTA button — teal → blue gradient */}
            <a
              href="#contact"
              className="ml-4 relative px-5 py-2 rounded-lg text-sm font-bold text-white overflow-hidden group shadow-[0_0_18px_rgba(45,212,191,0.2)] hover:shadow-[0_0_28px_rgba(45,212,191,0.4)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] group-hover:from-[#5EEAD4] group-hover:to-[#60A5FA] transition-all duration-300" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#2DD4BF]/20 to-[#3B82F6]/20 blur-md transition-opacity duration-300" />
              <span className="relative text-[#0A0E17] font-black">Hubungi Saya</span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-gray-300 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-gray-300 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-gray-300 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 flex flex-col gap-2 backdrop-blur-xl bg-[#0A0E17]/90 border-t border-white/[0.05]">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-[#2DD4BF]/[0.07] font-semibold transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#0A0E17] font-black text-center"
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </nav>
  );
}