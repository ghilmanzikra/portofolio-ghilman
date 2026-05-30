"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State pengontrol buka/tutup menu di HP

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-[#0A0E17]/60 border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Bagian Kiri: Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="group flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Ghilman Zikra Logo" 
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-110 active:scale-95 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              />
              <span className="text-xl font-extrabold text-white tracking-tight hidden sm:block">
                Ghilman<span className="text-[#2DD4BF]">.</span>
              </span>
            </a>
          </div>

          {/* Bagian Kanan: Menu Navigasi DESKTOP (Sembunyi di HP) */}
          <div className="hidden md:flex items-center space-x-7">
            <a href="#home" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Beranda</a>
            <a href="#projects" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Karya</a>
            <a href="#about" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Profil</a>
            <a href="#experience" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Pengalaman</a>
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

          {/* Tombol Hamburger Khusus MOBILE (Muncul hanya di HP) */}
          <div className="flex md:hidden items-center gap-3">
      
            {/* Tombol Hamburger Tiga Garis Animasi */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-[#2DD4BF] p-2 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Laci Dropdown Menu MOBILE (Hanya meluncur turun saat ditekan di HP) */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0A0E17]/95 backdrop-blur-lg border-b border-white/10 ${
        isOpen ? "max-h-64 opacity-100 py-3" : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        <div className="px-4 space-y-1 flex flex-col">
          <a href="#home" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Beranda</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Karya</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Profil</a>
          <a href="#experience" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Pengalaman</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider">Kontak</a>
        </div>
      </div>
    </nav>
  );
}