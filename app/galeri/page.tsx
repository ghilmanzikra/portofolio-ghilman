"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { projectsData } from '../../data/projects'; // Menghubungkan ke gudang data kita

/* =============================================
   GLASS CARD COMPONENT
   ============================================= */
function GlassCard({
  children, className = '', hover = true,
}: {
  children: React.ReactNode; className?: string; hover?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/20 to-transparent" />
      {children}
    </div>
  );
}

export default function Galeri() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

// 🚀 STATE BARU: Untuk mengatur Buka/Tutup deskripsi di Mobile
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Otomatis reset ke default setiap kali user membuka popup karya lain
  useEffect(() => {
    setCurrentImgIndex(0);
    setIsDescExpanded(false); // 🚀 Reset deskripsi jadi tertutup
  }, [selectedProject]);

  // 🚀 UPGRADE 1: Ambil kategori dinamis, tapi KECUALIKAN kategori "Sertifikat"
  const categories = Array.from(
    new Set(
      projectsData
        .filter(p => p.category !== "Sertifikat") // Menyaring agar sertifikat organisasi tidak masuk galeri
        .map(p => p.category)
    )
  );
  
  // Set tab aktif pertama kali ke kategori paling atas
  const [activeTab, setActiveTab] = useState(categories[0]);

  // Efek scroll halus ketika tab diklik
  const handleScrollToSection = (category: string) => {
    setActiveTab(category);
    const element = document.getElementById(`section-${category}`);
    if (element) {
      // Offset 140px agar tidak tertutup Navbar dan Tab yang sticky
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Mengubah title halaman saat komponen dimuat
  useEffect(() => {
    document.title = "Galeri Karya | Ghilman Zikra";
  }, []);

  return (
    <main id="home" className="min-h-screen bg-[#05080f53] pt-32 pb-20 relative overflow-hidden">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-[#2DD4BF]/10 via-[#3B82F6]/5 to-transparent pointer-events-none -z-10" />
      
      {/* 🚀 ANTI-LAG: Tambahkan "hidden md:block" pada animasi orbs agar tidak merusak GPU Mobile */}
      <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#2DD4BF]/10 rounded-full blur-[130px] animate-float pointer-events-none -z-10" />
      <div className="hidden md:block absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-[#3B82F6]/10 rounded-full blur-[130px] animate-float pointer-events-none -z-10" style={{ animationDelay: '4s' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =============================================
            🚀 UPGRADE 3: HEADER HALAMAN DENGAN TYPOGRAPHY EDGY 🚀
            ============================================= */}
        <div className="flex flex-col items-center justify-center mb-12 animate-fade-in-up">
          <div className="relative inline-block mb-8 mt-4">
            {/* Dekorasi Bintang/Sparkle Kiri */}
            <div className="absolute -left-12 -top-4 text-[#3B82F6] animate-pulse">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
            </div>
            
            {/* Teks "Galeri Karya" dengan styling unik */}
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#2DD4BF] to-purple-400 tracking-tighter drop-shadow-lg flex items-end">
              Galeri<span className="text-white border-2 border-[#2DD4BF]/50 rounded-xl px-2 bg-white/5 backdrop-blur-sm -ml-2 -mb-2 shadow-[0_0_20px_rgba(45,212,191,0.2)]">Karya</span>
            </h1>
            
            {/* Badge Tahun 2026 */}
            <div className="absolute -bottom-6 left-0 font-mono text-md font-bold text-white tracking-widest bg-black/50 px-2 rounded">
              2023 - NOW
            </div>

            {/* Dekorasi Bintang/Sparkle Kanan */}
            <div className="absolute -right-16 bottom-0 text-[#2DD4BF] animate-pulse" style={{ animationDelay: '1s' }}>
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto text-center font-medium mt-4">
            Eksplorasi seluruh koleksi desain grafis, identitas visual, dan materi publikasi yang pernah saya kerjakan.
          </p>
        </div>

        {/* =============================================
            STICKY TAB CATEGORY NAVIGATION (TANPA 'SEMUA')
            ============================================= */}
        <div className="sticky top-16 z-40 bg-[#05080f83]/90 backdrop-blur-xl border-y border-white/10 py-4 mb-16 animate-fade-in-up shadow-[0_10px_30px_rgba(5,8,15,0.8)] -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto hide-scrollbar gap-3 sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleScrollToSection(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === cat 
                  ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#0A0E17] shadow-[0_0_20px_rgba(45,212,191,0.35)] scale-105' 
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-[#2DD4BF]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            KONTEN GALERI BERDASARKAN KATEGORI (GRID 4 KOLOM)
            ======================================================== */}
        <div className="space-y-24">
          {categories.map((category) => {
            
            // Ambil project yang sesuai dengan kategori ini
            const categoryProjects = projectsData.filter(p => p.category === category);
            
            if (categoryProjects.length === 0) return null;

            return (
              <section key={category} id={`section-${category}`} className="scroll-mt-40 animate-fade-in-up">
                
                {/* Judul Section Kategori */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl md:text-3xl font-black text-white">{category}</h2>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-[#2DD4BF]/40 to-transparent" />
                </div>

                {/* GRID 4 KOLOM (lg:grid-cols-4) UNTUK SETIAP SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryProjects.map((project) => (
                    <div
                      key={project.id}
                      className="aspect-[4/5] rounded-[2rem] p-5 glass-card glass-card-hover transition-all duration-500 relative flex flex-col group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-[65%] rounded-xl overflow-hidden bg-black/50 mb-4">
                        {/* 🚀 KODE BARU: Tambahkan loading="lazy" dan decoding="async" */}
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy" 
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-xs">Image 4:5</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                        
                        {/* Tombol Overlay Hover 'Lihat Detail' */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-[#2DD4BF] text-[#0A0E17] px-4 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Lihat Detail
                          </span>
                        </div>
                      </div>

                      {/* Title & Info */}
                      <div className="flex flex-col flex-grow justify-between px-1">
                        <div>
                          <h3 className="text-lg font-black text-white mb-1 line-clamp-1 group-hover:text-[#2DD4BF] transition-colors">{project.title}</h3>
                          <p className="text-gray-400 text-xs font-medium line-clamp-2 leading-relaxed">{project.shortDesc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </div>

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

                {/* 🚀 UPGRADE: TOMBOL CALL-TO-ACTION (LIVE DEMO / TONTON VIDEO) */}
                {selectedProject.demoLink && selectedProject.demoLink !== "#" && (
                  <div className="mt-4 md:mt-6 pt-4 border-t border-white/5">
                    <a 
                      href={selectedProject.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-black text-[#0A0E17] overflow-hidden shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all duration-300 hover:-translate-y-1"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] group-hover:from-[#5EEAD4] group-hover:to-[#60A5FA] transition-all duration-300" />
                      <span className="relative flex items-center justify-center gap-2 tracking-wide">
                        {/* Cek kategori untuk mengubah teks tombol */}
                        {selectedProject.category.toLowerCase().includes('video') ? (
                          <>🎬 Tonton Video Keseluruhan</>
                        ) : selectedProject.category.toLowerCase().includes('modul') || selectedProject.category.toLowerCase().includes('website') ? (
                          <>🚀 Eksplorasi Live Demo</>
                        ) : (
                          <>🔗 Kunjungi Tautan Karya</>
                        )}
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </span>
                    </a>
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

      {/* Style untuk animasi modal dan custom scrollbar (agar rapi di modal) */}
      <style jsx global>{`
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Custom Scrollbar untuk Modal biar estetik */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(45, 212, 191, 0.3);
        }
      `}</style>

    </main>
  );
}