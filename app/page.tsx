"use client";
import { useState, useEffect, useRef } from 'react';
import { projectsData } from '../data/projects'; // <-- Menghubungkan ke gudang data baru kita!
import Link from 'next/link';

/* =============================================
   INTERSECTION OBSERVER HOOK
   ============================================= */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

/* =============================================
   GLASS CARD COMPONENT
   ============================================= */
function GlassCard({
  children, className = '', hover = true, shine = true, onClick,
}: {
  children: React.ReactNode; className?: string;
  hover?: boolean; shine?: boolean; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl glass-card
        ${hover ? 'glass-card-hover cursor-pointer' : ''}
        ${shine ? 'glass-shine' : ''}
        ${className}`}
    >
      {/* Inner top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/20 to-transparent" />
      {children}
    </div>
  );
}

/* =============================================
   MAIN PAGE
   ============================================= */
export default function Home() {
  const [activeFilter, setActiveFilter]     = useState('Semua');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showCertificates, setShowCertificates] = useState(false);
  const [heroVisible, setHeroVisible]       = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

// 🚀 STATE BARU: Untuk mengatur Buka/Tutup deskripsi di Mobile
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Otomatis reset ke default setiap kali user membuka popup karya lain
  useEffect(() => {
    setCurrentImgIndex(0);
    setIsDescExpanded(false); // 🚀 Reset deskripsi jadi tertutup
  }, [selectedProject]);

  const aboutSection    = useInView();
  const projectsSection = useInView();
  const certSection     = useInView();
  const contactSection  = useInView();
  const skillsSection = useInView();
  const expSection = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Daftar Kategori Filter Baru yang kamu minta persis!
  const categories = ['Semua', 'Logo', 'Flyer Digital', 'Spanduk', 'Sertifikat', 'Twibbon'];

  // Mengambil otomatis semua data yang berkategori "Sertifikat" dari projectsData
  const certificatesData = projectsData.filter(p => p.category === 'Sertifikat');

  // Data Pengalaman Riil (Versi Desainer Asli! 🎨)
  const experiences = [
    {
      id: 1,
      role: "Kepala Departemen Infokom",
      company: "HIMATIF UIN Suska Riau",
      date: "2026 - Sekarang",
      desc: "Memimpin manajemen sosial media, publikasi, dan digital branding himpunan. Bertanggung jawab mengoordinasi dokumentasi menggunakan perlengkapan standar industri seperti Canon 600D."
    },
    {
      id: 2,
      role: "Creative & UI/UX Designer",
      company: "Proyek Kolaborasi Kampus",
      date: "2025 - 2026",
      desc: "Merancang antarmuka pengguna (UI) yang interaktif dan estetis menggunakan Figma, serta memastikan pengalaman pengguna (UX) yang mulus untuk berbagai keperluan proyek web."
    },
    {
      id: 3,
      role: "Multimedia Content Creator",
      company: "Berbagai Kepanitiaan",
      date: "2024 - Sekarang",
      desc: "Memproduksi konten grafis dan dokumentasi visual (Canva, CapCut, Illustrator) untuk kampanye acara, termasuk desain spanduk, flyer digital, dan perancangan identitas visual (logo)."
    }
  ];

  // Senjata Andalan (Tanpa Backend!)
  const skills = [
    { category: "Multimedia & Design 🎨", items: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva", "CapCut", "DSLR Photography"] },
    { category: "Frontend & UI/UX 💻", items: ["UI/UX Design", "Design Systems", "Layout Grids", "HTML & CSS", "Tailwind CSS"] }
  ];

  const filteredProjects = projectsData.filter(p =>
    activeFilter === 'Semua' ? true : p.category === activeFilter
  );

  return (
    <div className="flex flex-col gap-32 pb-24">

      {/* =============================================
          1. HERO SECTION (ULTIMATE VISUAL SPLIT LAYOUT - ROUNDED BACKDROP & COSMIC BORDER)
          ============================================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* 🚀 UPGRADE: MASKING DECK FOR DYNAMIC GRADIENT BORDER 🚀 */}
        {/* PANEL LUAR: Pemegang Warna Gradasi Penuh Teal ke Blue */}
        <div className="absolute top-0 inset-x-0 h-[100%] rounded-b-[4rem] md:rounded-b-[6rem] shadow-[0_25px_70px_rgba(0,0,0,0.5)] -z-10 overflow-hidden bg-gradient-to-r from-[#2DD4BF] via-[#3B82F6] to-[#2DD4BF] opacity-60 p-[5px] flex">
          
          {/* PANEL DALAM (The Real Panel): Masks the center, leaving a fine dynamic border.
              Padding 1.5px di atas menciptakan 'mask' sempurna */}
          <div className="relative w-full h-full bg-gradient-to-b from-[#0A0E17]/90 via-[#0D1527]/70 to-[#0A0E17]/20 backdrop-blur-3xl rounded-[inherit] overflow-hidden flex">
            {/* Bola cahaya aurora internal di dalam panel */}
            <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-[#2DD4BF]/5 rounded-full blur-[130px] animate-float pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-[#3B82F6]/5 rounded-full blur-[130px] animate-float pointer-events-none" style={{ animationDelay: '4s' }} />
          </div>

        </div>

        {/* Wadah Konten Utama */}
        <div className="max-w-5xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 text-left relative z-10 py-25">
          
          {/* === SISI KIRI: TEXT STACK INTRO ELEGAN === */}
          <div className="w-full lg:w-1/2 flex flex-col items-start order-2 lg:order-1">
            <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-[#2DD4BF] font-semibold text-xs uppercase tracking-wider mb-6 border border-[#2DD4BF]/20 shadow-[0_0_15px_rgba(45,212,191,0.1)] backdrop-blur-md">
                <span className="flex w-2 h-2 rounded-full bg-[#2DD4BF] mr-2 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                Multimedia Designer
              </div>
            </div>
            <div className={`transition-all duration-700 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-[1.15] text-white">
                Menciptakan <span className="gradient-text animate-text-glow">Visual,</span>
                <br />
                Menghidupkan <span className="text-gray-400">Imajinasi.</span>
              </h1>
            </div>
            <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-md font-medium">
                Halo! Saya <span className="font-bold text-white">Ghilman Zikra</span>. Mahasiswa Teknik Informatika yang mendedikasikan hasrat visual untuk menyusun elemen multimedia estetik, desain media sosial kreatif, dan rancangan UI/UX yang interaktif.
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#projects" className="group relative px-7 py-3.5 rounded-xl font-bold text-[#0A0E17] overflow-hidden shadow-[0_0_25px_rgba(45,212,191,0.25)] hover:shadow-[0_0_40px_rgba(45,212,191,0.45)] transition-all duration-300 hover:-translate-y-1 text-center">
                <span className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] group-hover:from-[#5EEAD4] group-hover:to-[#60A5FA] transition-all duration-300" />
                <span className="relative flex items-center justify-center gap-2 font-black tracking-wide">
                  Eksplorasi Karya
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </span>
              </a>
              <a href="#about" className="group px-7 py-3.5 rounded-xl font-bold glass-card glass-card-hover text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1 text-center border border-white/5">
                <span>Kenalan Lebih Jauh</span>
              </a>
            </div>
          </div>

          {/* === SISI KANAN: FOTO BULAT COSMIC & LOGO GAMBAR ASLI MELAYANG (BESAR) === */}
          <div className={`w-full lg:w-1/2 flex justify-center relative order-1 lg:order-2 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            
            {/* Efek Pijaran Aura Elektrik di Belakang Foto */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] rounded-full blur-[80px] opacity-30 animate-pulse pointer-events-none" />

            {/* BINGKAI FOTO BULAT COSMIC STYLE ABOUT SECTION */}
            <div className="relative group cursor-pointer">
              {/* Efek Bayangan Pijar Interaktif Tambahan */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] blur-2xl opacity-25 group-hover:opacity-60 group-hover:blur-3xl transition-all duration-500" />
              {/* Cincin Kosmik Berputar */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#3B82F6] to-[#2DD4BF] opacity-50 animate-spin" style={{ animationDuration: '9s' }} />
              {/* Bingkai Utama - 🟡 SIZE UPGRADED TO MAXIMUM 🟡 */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-[3px] bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 shadow-[0_0_40px_rgba(45,212,191,0.25)] group-hover:shadow-[0_0_60px_rgba(45,212,191,0.5)]">
                <div className="w-full h-full rounded-full bg-[#0C111A] border border-white/10 overflow-hidden flex items-center justify-center relative">
                  <img 
                    src="/foto-non-formal.webp" 
                    alt="Ghilman Zikra Creative Portrait" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>

            {/* Icon-Icon Aplikasi Melayang */}
            <div className="absolute -top-6 -left-1 md:left-1 animate-float glass-card border border-[#2DD4BF]/30 w-20 h-20 md:w-30 md:h-30 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-md bg-[#0C111A]/60 select-none group/icon z-20" style={{ animationDuration: '5s' }}>
              <img src="/icon/canva.png" alt="Canva Logo" className="w-10 h-10 md:w-25 md:h-25 object-contain transition-transform duration-300 group-hover/icon:scale-110" title="Canva" />
            </div>
            <div className="absolute top-2 -right-1 md:right-4 animate-float glass-card border border-white/10 w-16 h-16 md:w-25 md:h-25 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-md bg-black/60 select-none group/icon z-20" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
              <img src="/icon/capcut.png" alt="CapCut Logo" className="w-10 h-10 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover/icon:scale-110" title="CapCut" />
            </div>
            <div className="absolute bottom-6 -left-1 md:left-0 animate-float glass-card border border-[#00C4FF]/40 w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-md bg-[#001c3a]/70 select-none group/icon z-20" style={{ animationDuration: '5.5s', animationDelay: '0.7s' }}>
              <img src="/icon/photoshop.png" alt="Adobe Photoshop Logo" className="w-10 h-10 md:w-13 md:h-13 object-contain transition-transform duration-300 group-hover/icon:scale-110" title="Adobe Photoshop" />
            </div>
            <div className="absolute bottom-0 -right-1 md:right-2 animate-float glass-card border border-[#FF9A00]/40 w-16 h-16 md:w-25 md:h-25 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-md bg-[#331700]/70 select-none group/icon z-20" style={{ animationDuration: '6.5s', animationDelay: '2.2s' }}>
              <img src="/icon/illustrator.png" alt="Adobe Illustrator Logo" className="w-10 h-10 md:w-15 md:h-15 object-contain transition-transform duration-300 group-hover/icon:scale-110" title="Adobe Illustrator" />
            </div>

          </div>

        </div>
      </section>


        {/* =============================================
          2. SELECTED PROJECTS (GALERI KARYA - PORTRAIT 4:5)
          ============================================= */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={projectsSection.ref}>

        {/* TYPOGRAPHY JUDUL EDGY & MODERN */}
        <div className={`flex flex-col items-center justify-center mb-16 transition-all duration-700 ${projectsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block">
            {/* Dekorasi Bintang/Sparkle Kiri */}
            <div className="absolute -left-17 -top-7 text-[#3B82F6] animate-pulse">
              <svg className="w-15 h-15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
            </div>
            
            <h2 className=" text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#2DD4BF] to-purple-400 tracking-tighter drop-shadow-lg flex items-end">
              Porto<span className="text-white border-2 border-[#2DD4BF]/50 rounded-xl px-2 bg-white/5 backdrop-blur-sm -ml-2 -mb-2 shadow-[0_0_20px_rgba(45,212,191,0.2)]">folio</span>
            </h2>
            
            {/* Badge Tahun */}
            <div className="absolute -bottom-6 left-2 font-mono text-xl font-bold text-white tracking-widest bg-black/50 px-2 rounded">
              UNGGULAN
            </div>

            {/* Dekorasi Bintang/Sparkle Kanan */}
            <div className="absolute -right-19 bottom-0 text-[#2DD4BF] animate-pulse" style={{ animationDelay: '1s' }}>
              <svg className="w-15 h-15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
            </div>
          </div>
        </div>

        {/* GRID KARYA 4:5 UNTUK MOCKUP DENGAN BACKGROUND SERAGAM */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${projectsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Menampilkan 3 karya unggulan pertama di beranda */}
          {projectsData.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="aspect-[4/5] rounded-[2rem] p-5 glass-card glass-card-hover transition-all duration-500 relative flex flex-col group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-[60%] rounded-2xl overflow-hidden bg-black/50 mb-5">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy" 
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-sm">Image 4:5</div>
                )}
                
                {/* Overlay Hitam Halus saat Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Badge Kategori */}
                <div className={`absolute top-3 left-3 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${project.badge}`}>
                  {project.category}
                </div>
              </div>

              {/* Title & Info Container */}
              <div className="flex flex-col flex-grow justify-between px-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 line-clamp-1 group-hover:text-[#2DD4BF] transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed">{project.shortDesc}</p>
                </div>

                {/* Tombol Details */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full flex items-center justify-between text-sm font-bold text-gray-300 group-hover:text-[#2DD4BF] transition-colors"
                  >
                    <span>Details</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOMBOL KE HALAMAN GALERI BARU */}
        <div className="flex justify-center mt-16 relative z-20">
          <a
            href="/galeri"
            className="group relative px-8 py-4 rounded-2xl font-black text-white bg-white/5 border border-white/10 overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] transition-all duration-500 ease-out group-hover:w-full opacity-20" />
            <span className="relative flex items-center gap-3 tracking-wide">
              Lihat Karya Lainnya
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-[#2DD4BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </a>
        </div>
      </section>


      {/* =============================================
          SECTION 3 : ABOUT (BENTO BOX EDITION 🍱✨)
          ============================================= */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={aboutSection.ref}>
        <div className={`transition-all duration-1000 ${aboutSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Tentang <span className="gradient-text">Saya</span>
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-[#2DD4BF]/40 to-transparent rounded-full" />
          </div>

          {/* BENTO GRID CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 🍱 BENTO 1: PROFILE, LOCATION, & CV (Kiri - Tinggi) */}
            <GlassCard className="p-8 flex flex-col items-center justify-between lg:col-span-1 lg:row-span-2 gap-8" hover={true}>
              {/* Profile Photo with Cosmic Ring */}
              <div className="relative group cursor-pointer w-full flex justify-center mt-4">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] blur-xl opacity-25 group-hover:opacity-55 group-hover:blur-2xl transition-all duration-500" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#3B82F6] to-[#2DD4BF] opacity-50 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-[3px] bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 shadow-[0_0_40px_rgba(45,212,191,0.25)]">
                  <div className="w-full h-full rounded-full bg-[#0C111A] border border-white/10 overflow-hidden flex items-center justify-center">
                    <img src="/foto-profil.webp" alt="Ghilman Zikra" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Location & CV Button Container */}
              <div className="flex flex-col items-center gap-4 w-full mt-4">
                {/* Location Radar Badge */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 w-full justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2DD4BF]"></span>
                  </span>
                  <span className="text-gray-300 text-sm font-semibold tracking-wide">Pekanbaru, Riau</span>
                </div>

                {/* 🚀 LOGIC DOWNLOAD CV AKTIF DI SINI! */}
                {/* Pastikan kamu punya file cv-ghilman.pdf di dalam folder public */}
                <a
                  href="/cv-ghilman.pdf" 
                  download="CV_Ghilman_Zikra.pdf"
                  className="group flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[#2DD4BF] text-[#0A0E17] font-black hover:bg-[#5EEAD4] transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:-translate-y-1"
                >
                  Unduh CV Saya
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </GlassCard>

            {/* 🍱 BENTO 2: MAIN BIO (Kanan Atas - Lebar) */}
            <GlassCard className="p-8 lg:col-span-2 lg:row-span-1 flex flex-col justify-center" hover={true}>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                Designer <span className="gradient-text">Multimedia ✨</span>
              </h3>
              
              {/* Teks asli buatanmu tetap aman di sini! */}
              <div className="space-y-4 text-gray-400 leading-relaxed font-medium">
                <p>
                  Hai! Aku Ghilman Zikra, seorang Multimedia Designer yang hobi menjembatani dunia visual dan teknologi. Fokus utama aku adalah memproduksi konten multimedia—mulai dari graphic design, produksi video kreatif, hingga fotografi. Sebagai anak Teknik Informatika, aku juga punya nilai plus di bidang UI/UX dan frontend development.
                </p>
                <p>
                  Dengan pengalaman memimpin berbagai tim kreatif, aku selalu siap menciptakan pengalaman digital yang rapi, estetik, dan efektif menyampaikan pesan.
                </p>
              </div>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {['Canva', 'Capcut', 'Figma', 'Illustrator', 'Photoshop'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-[#0A0E17] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* 🍱 BENTO 3: PERSONALITY (Tengah Bawah) */}
            <GlassCard className="p-6 bg-gradient-to-br from-[#3B82F6]/10 to-transparent flex flex-col justify-center items-start group overflow-hidden" hover={true}>
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#3B82F6]/20 rounded-full blur-2xl group-hover:bg-[#3B82F6]/40 transition-all duration-500" />
              <span className="text-[#3B82F6] font-black text-4xl mb-2">ENFJ-T</span>
              <h4 className="text-white font-bold text-lg mb-1">The Protagonist</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pemimpin karismatik yang menginspirasi. Selalu antusias merangkul ide baru dan mengorkestrasi kolaborasi tim untuk mencapai visi visual yang luar biasa.
              </p>
            </GlassCard>

            {/* 🍱 BENTO 4: LEADERSHIP (Kanan Bawah) */}
            <GlassCard className="p-6 bg-gradient-to-br from-[#2DD4BF]/10 to-transparent flex flex-col justify-center h-full relative overflow-hidden" hover={true}>
              
              {/* Ornamen transparan di pojok kanan bawah agar kotak tidak sepi */}
              <div className="absolute -right-4 -bottom-4 text-[#2DD4BF] opacity-10 rotate-12 pointer-events-none">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-[#2DD4BF]/20 rounded-xl text-[#2DD4BF]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h4 className="text-white font-black text-xl tracking-wide">Kadep Infokom</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pr-2">
                  Bertanggung jawab memimpin departemen Informasi & Komunikasi HIMATIF, menjaga standar dokumentasi dan digital branding.
                </p>
              </div>
            </GlassCard>

          </div>
        </div>
      </section>


      {/* =============================================
          4. TOOLS MASTERY & SKILLS (Senjata Andalan)
          ============================================= */}
      <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={skillsSection.ref}>
        <div className={`text-center mb-10 transition-all duration-700 ${skillsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#3B82F6] font-semibold text-sm tracking-widest uppercase">Keahlian</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Senjata Andalan ⚔️</h2>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${skillsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {skills.map((skillGroup, index) => (
            <GlassCard key={index} className="p-8" hover={false}>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map(item => (
                  <span key={item} className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#0A0E17]/80 border border-white/10 text-gray-300 hover:text-[#2DD4BF] hover:border-[#2DD4BF]/50 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>


      {/* =============================================
          5. EXPERIENCE (Pembuktian Jam Terbang)
          ============================================= */}
      <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={expSection.ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${expSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest uppercase">Rekam Jejak</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Pengalaman Profesional 🚀</h2>
        </div>

        <div className={`relative transition-all duration-700 delay-200 ${expSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Garis vertikal timeline */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-[#2DD4BF]/50 via-[#3B82F6]/30 to-transparent" />
          
          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => (
              <div key={exp.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Titik tengah timeline */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A0E17] border-2 border-[#2DD4BF] shadow-[0_0_10px_rgba(45,212,191,0.8)] z-10" />
                
                {/* Konten Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <GlassCard className="p-6 inline-block w-full" hover={true}>
                    <span className="text-[#3B82F6] font-bold text-sm tracking-widest">{exp.date}</span>
                    <h3 className="text-xl font-black text-white mt-1">{exp.role}</h3>
                    <h4 className="text-gray-400 font-semibold mb-3">{exp.company}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{exp.desc}</p>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =============================================
          SECTION 6 : SERTIFIKAT
          ============================================= */}
      <section id="certificates" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={certSection.ref}>
        <GlassCard
          className={`p-8 md:p-12 transition-all duration-700 ${certSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          hover={false} shine={false}
        >
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/15 via-[#0A0E17]/60 to-[#3B82F6]/15 rounded-2xl" />
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2DD4BF]/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3B82F6]/15 rounded-full blur-[60px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest uppercase">Pencapaian</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4">
                Sertifikasi & Kepemimpinan 🏆
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Bukti dedikasi dan profesionalisme dalam mengelola kepanitiaan serta pengembangan skill teknologi.
              </p>
              {/* Stats */}
              <div className="flex gap-8 mt-6 justify-center md:justify-start">
                {[['8+', 'Sertifikat'], ['3+', 'Organisasi'], ['15+', 'Event']].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-black gradient-text">{num}</div>
                    <div className="text-gray-500 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowCertificates(!showCertificates)}
              className="group relative px-8 py-4 rounded-xl font-black text-[#0A0E17] overflow-hidden flex-shrink-0 shadow-[0_0_25px_rgba(45,212,191,0.25)] hover:shadow-[0_0_40px_rgba(45,212,191,0.45)] transition-all duration-300 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] group-hover:from-[#5EEAD4] group-hover:to-[#60A5FA] transition-all duration-300" />
              <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {showCertificates ? "Tutup Etalase" : "Lihat Koleksi Sertifikat"}
              </span>
            </button>
          </div>

          {/* KODE BARU: Naikkan max-h jadi 5000px dan tambah pb-4 */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showCertificates ? "max-h-[5000px] mt-12 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-4 border-t border-[#2DD4BF]/10">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/[0.08] hover:border-[#2DD4BF]/30 transition-all cursor-pointer overflow-hidden hover:-translate-y-1"
                  // 🚀 UPGRADE: Memanggil Mega Modal dengan data asli dari projectsData!
                  onClick={() => setSelectedProject(cert)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0C111A]">
                    
                    {/* 🚀 UPGRADE: Menampilkan gambar sertifikat asli! */}
                    {cert.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111827] flex items-center justify-center text-white/20 font-bold italic text-sm">
                        Tidak ada gambar
                      </div>
                    )}

                    {/* Hover overlay dengan Tombol */}
                    <div className="absolute inset-0 bg-[#2DD4BF]/0 group-hover:bg-[#2DD4BF]/10 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-[#0A0E17] font-black text-sm bg-[#2DD4BF] px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Lihat Detail
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="text-white font-bold line-clamp-1">{cert.title}</h4>
                    <p className="text-[#2DD4BF]/70 text-xs mt-1 line-clamp-1">{cert.shortDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>


      {/* =============================================
          MODAL POP-UP (KARYA DETAIL - TIKTOK LAYOUT MOBILE / SPLIT DESKTOP)
          ============================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-[#0A0E17]/90 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedProject(null)}
          />
          
          {/* KOTAK UTAMA MODAL */}
          <div className="relative z-10 w-full max-w-6xl max-h-[90vh] h-[85vh] md:h-auto md:max-h-[85vh] bg-[#0C111A] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-scale-up">
            
            {/* Tombol Tutup (Silang) */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 md:right-6 z-50 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-500/80 transition-all duration-200 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* ========================================================
                SISI GAMBAR: DI MOBILE JADI BACKGROUND FULL, DI DESKTOP JADI KANAN
                ======================================================== */}
            <div className={`absolute inset-0 md:relative w-full md:w-1/2 bg-[#05080F] flex items-center justify-center order-1 md:order-2 z-0 transition-all duration-300 ${isDescExpanded ? 'pointer-events-none md:pointer-events-auto filter brightness-50 md:brightness-100' : ''}`}>
              
              {selectedProject.images && selectedProject.images.length > 0 ? (
                /* ➡️ MODE 1: CAROUSEL */
                <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8 pb-24 md:pb-8">
                  <img src={selectedProject.images[currentImgIndex]} alt={`${selectedProject.title} - ${currentImgIndex + 1}`} className="max-w-full max-h-full md:max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/5 animate-scale-up" />
                  <button onClick={() => setCurrentImgIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))} className="absolute left-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#2DD4BF] hover:text-[#0A0E17] transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
                  <button onClick={() => setCurrentImgIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))} className="absolute right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#2DD4BF] hover:text-[#0A0E17] transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></button>
                  <div className="absolute top-6 md:bottom-6 md:top-auto px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-[#2DD4BF]">
                    {currentImgIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>
              ) : (
                /* ➡️ MODE 2: SCROLLABLE / SINGLE IMAGE */
                <div className={`w-full h-full flex items-start justify-center p-4 md:p-8 pb-32 md:pb-8 ${isDescExpanded ? 'overflow-hidden md:overflow-y-auto' : 'overflow-y-auto'} custom-scrollbar`}>
                  {(selectedProject.fullImage || selectedProject.image) ? (
                    <img 
                      src={selectedProject.fullImage || selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-auto rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5" 
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="text-gray-500 font-medium">Tidak ada gambar detail</div>
                  )}
                </div>
              )}
            </div>

            {/* ========================================================
                SISI TEKS: DI MOBILE JADI OVERLAY BAWAH (TIKTOK STYLE), DI DESKTOP JADI KIRI
                ======================================================== */}
            <div className={`absolute bottom-0 w-full md:relative md:w-1/2 z-10 flex flex-col md:border-r border-white/5 transition-all duration-500 ease-in-out order-2 md:order-1
              ${isDescExpanded ? 'h-[75vh] bg-[#0C111A]' : 'h-[30vh] md:h-auto bg-gradient-to-t from-[#0C111A] via-[#0C111A]/95 to-transparent'}`}
            >
              
              {/* Wadah Konten Teks Utama */}
              <div className={`p-6 sm:p-8 md:p-12 w-full flex-grow flex flex-col gap-4 md:gap-6 custom-scrollbar ${isDescExpanded ? 'overflow-y-auto' : 'overflow-hidden md:overflow-y-auto'}`}>
                <div>
                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border mb-3 ${selectedProject.badge ?? 'bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/20'}`}>
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-5xl font-black text-white leading-[1.1]">{selectedProject.title}</h2>
                </div>

                <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
                  {selectedProject.fullDesc}
                </p>

                {selectedProject.features && (
                  <div className="mt-2">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-base md:text-lg">
                      <span className="text-[#2DD4BF]">✨</span> Highlight
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400 text-xs md:text-base leading-relaxed">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.tools && (
                  <div className="mt-2 md:mt-4 pt-4 md:pt-6 border-t border-white/5">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                      <span className="text-amber-500">🛠️</span> Tools & Aplikasi
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 text-[10px] md:text-sm font-semibold rounded-xl bg-white/5 border border-white/10 text-gray-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TOMBOL BACA SELENGKAPNYA (HANYA MUNCUL DI MOBILE) */}
              <div className="md:hidden w-full p-4 bg-[#0C111A] border-t border-white/10 flex justify-center z-20 shadow-[0_-15px_20px_rgba(12,17,26,0.9)]">
                <button 
                  onClick={() => setIsDescExpanded(!isDescExpanded)} 
                  className="text-[#2DD4BF] font-bold text-sm flex items-center gap-2 px-6 py-2 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 transition-all active:scale-95"
                >
                  {isDescExpanded ? 'Tutup Deskripsi / See Less' : 'Baca Selengkapnya'}
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDescExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* =============================================
          SECTION 7 : KONTAK
          ============================================= */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 mb-10" ref={contactSection.ref}>
        <GlassCard
          className={`p-10 text-center transition-all duration-700 ${contactSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          hover={false}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-b from-[#2DD4BF]/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest uppercase">Kontak</span>
            <h2 className="text-4xl font-black text-white mt-2 mb-4">Mari Berkolaborasi! 🚀</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Tertarik untuk diskusi soal desain, ngoding bareng, atau punya tawaran proyek? Jangan ragu untuk menyapa saya melalui platform di bawah ini.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap justify-center gap-6">

              {/* EMAIL */}
              <a href="mailto:ghilmanzikra@gmail.com" className="group relative flex flex-col items-center gap-2">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/20 hover:border-red-500/40">
                  <svg className="w-7 h-7 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Email</span>
              </a>

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/ghil_z8" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center gap-2">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-500/25 hover:border-pink-500/40">
                  <svg className="w-7 h-7 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.204 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Instagram</span>
              </a>

              {/* X / TWITTER */}
              <a href="https://x.com/Ghil_z8" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center gap-2">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-400/20 hover:border-gray-400/40">
                  <svg className="w-6 h-6 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">X</span>
              </a>

              {/* FACEBOOK */}
              <a href="https://www.facebook.com/ghilman.ghilmanzikra" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center gap-2">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-600/20 hover:border-blue-500/40">
                  <svg className="w-7 h-7 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Facebook</span>
              </a>

              {/* GITHUB */}
              <a href="https://github.com/ghilmanzikra" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center gap-2">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-400/15 hover:border-gray-400/40">
                  <svg className="w-7 h-7 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">GitHub</span>
              </a>

              {/* LINKEDIN */}
              <a href="https://www.linkedin.com/in/ghilman-zikra/" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center gap-2">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2DD4BF]/25 hover:border-[#2DD4BF]/40">
                  <svg className="w-7 h-7 group-hover:text-[#2DD4BF] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">LinkedIn</span>
              </a>

            </div>
          </div>
        </GlassCard>
      </section>

    </div>
  );
}