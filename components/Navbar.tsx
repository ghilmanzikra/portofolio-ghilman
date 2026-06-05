"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // 🚀 Import pendeteksi URL Next.js

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // 🚀 Mendapatkan URL saat ini

  // Mengecek apakah kita sedang berada di halaman galeri
  const isGallery = pathname === '/galeri';

  // Efek mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMounted(true), []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#05080f83]/90 backdrop-blur-xl py-1 shadow-lg' 
        : 'bg-transparent py-1'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          
          {/* =========================================
            LOGIKA LOGO CERDAS (BERUBAH SESUAI HALAMAN)
            ========================================= */}
        <div className="flex-shrink-0">
          {isGallery ? (
            /* TAMPILAN DI HALAMAN GALERI (TOMBOL KEMBALI) */
            <Link href="/#home" className="group flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:bg-[#2DD4BF] group-hover:text-[#0A0E17] group-hover:border-[#2DD4BF] transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight hidden sm:block transition-colors group-hover:text-[#2DD4BF]">
                Kembali
              </span>
            </Link>
          ) : (
            /* TAMPILAN DI HALAMAN UTAMA (LOGO ASLI) */
            <Link href="/#home" className="group flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Ghilman Zikra Logo" 
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 active:scale-95 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              />
              <span className="text-xl font-extrabold text-white tracking-tight hidden sm:block">
                Ghilman<span className="text-[#2DD4BF]">.</span>
              </span>
            </Link>
          )}
        </div>

          {/* Bagian Kanan: Menu Navigasi DESKTOP */}
          <div className="hidden md:flex items-center space-x-7">
            <Link href="/#home" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Beranda</Link>
            
            {/* 🚀 UPGRADE: Link Karya sekarang mengarah langsung ke halaman /galeri 🚀 */}
            <Link href="/galeri" className="text-[#2DD4BF] hover:text-white font-bold transition text-sm uppercase tracking-wider drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
              Galeri Karya
            </Link>
            
            <Link href="/#about" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Profil</Link>
            <Link href="/#experience" className="text-gray-300 hover:text-[#2DD4BF] font-semibold transition text-sm uppercase tracking-wider">Pengalaman</Link>
            {/* Tombol Hubungi Saya yang Baru */}
            <Link 
              href="/#contact" 
              className="px-6 py-2.5 rounded-full font-bold text-[#0A0E17] bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] hover:from-[#5EEAD4] hover:to-[#60A5FA] transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:-translate-y-1"
            >
              Hubungi Saya
            </Link>
          </div>

          {/* Tombol Hamburger & Sakelar Lampu Khusus MOBILE */}
          <div className="flex md:hidden items-center gap-3">

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

      {/* Laci Dropdown Menu MOBILE */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0A0E17]/95 backdrop-blur-lg border-b border-white/10 ${
        isOpen ? "max-h-80 opacity-100 py-3" : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        <div className="px-4 space-y-1 flex flex-col">
          <Link href="/#home" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Beranda</Link>
          
          {/* 🚀 UPGRADE: Link Mobile ke Galeri 🚀 */}
          <Link href="/galeri" onClick={() => setIsOpen(false)} className="text-[#2DD4BF] hover:text-white py-2.5 rounded-md font-bold text-sm uppercase tracking-wider border-b border-white/5">
            Galeri Karya
          </Link>
          
          <Link href="/#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Profil</Link>
          <Link href="/#experience" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider border-b border-white/5">Pengalaman</Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2DD4BF] py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider">Kontak</Link>
        </div>
      </div>
    </nav>
  );
}