"use client";
import { useState, useEffect, useRef } from 'react';
import { projectsData } from '../data/projects'; // <-- Menghubungkan ke gudang data baru kita!

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

  const aboutSection    = useInView();
  const projectsSection = useInView();
  const certSection     = useInView();
  const contactSection  = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Daftar Kategori Filter Baru yang kamu minta persis!
  const categories = ['Semua', 'Logo', 'Flyer Digital', 'Spanduk', 'Sertifikat', 'Twibbon'];

  const certificatesData = [
    { id: 1, title: "Ketua Kurmatif 2025",    issuer: "HMTI UIN Suska",  image: "/cert-kurmatif.jpg" },
    { id: 2, title: "Peserta Web Dev",         issuer: "Campus Course",   image: "/cert-web.jpg"      },
    { id: 3, title: "Sertifikat Organisasi",   issuer: "HIMATIF",         image: "/cert-org.jpg"      },
  ];

  const filteredProjects = projectsData.filter(p =>
    activeFilter === 'Semua' ? true : p.category === activeFilter
  );

  return (
    <div className="flex flex-col gap-32 pb-24">

      {/* =============================================
          SECTION 1 : HERO
          ============================================= */}
      <section id="home" className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative">

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#2DD4BF]/8 rounded-full blur-[80px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#3B82F6]/8 rounded-full blur-[80px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

        {/* Badge */}
        <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-[#2DD4BF] font-medium text-sm mb-8 border border-[#2DD4BF]/20">
            <span className="flex w-2 h-2 rounded-full bg-[#2DD4BF] mr-2 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            Multimedia Designer
          </div>
        </div>

        {/* Headline */}
        <div className={`transition-all duration-700 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.05]">
            <span className="text-white">Membangun </span>
            <span className="gradient-text animate-text-glow">Kreativitas</span>
            <br />
            <span className="text-white">Menjadi </span>
            <span className="text-gray-400">Nyata.</span>
          </h1>
        </div>

        {/* Subtext */}
        <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Halo! Saya <span className="font-bold text-white">Ghilman Zikra</span>.{' '}
            Seorang mahasiswa Teknik Informatika, desainer sosial media, dan calon kreator animasi. Saya suka mengubah ide menjadi karya yang interaktif.
          </p>
        </div>

        {/* CTA */}
        <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#projects"
            className="group relative px-8 py-4 rounded-xl font-bold text-[#0A0E17] overflow-hidden shadow-[0_0_30px_rgba(45,212,191,0.25)] hover:shadow-[0_0_50px_rgba(45,212,191,0.45)] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] group-hover:from-[#5EEAD4] group-hover:to-[#60A5FA] transition-all duration-300" />
            <span className="relative flex items-center gap-2 font-black">
              Lihat Karya Saya
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <a
            href="#about"
            className="group px-8 py-4 rounded-xl font-bold glass-card glass-card-hover text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Kenalan Lebih Jauh
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-gray-600 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#2DD4BF]/60 to-transparent animate-pulse" />
        </div>
      </section>


      {/* =============================================
          SECTION 2 : ABOUT
          ============================================= */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={aboutSection.ref}>
        <GlassCard
          className={`p-8 md:p-12 transition-all duration-700 ${aboutSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          hover={false}
        >
          {/* Left accent bar — teal → blue */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2DD4BF] via-[#3B82F6] to-transparent rounded-l-2xl" />

          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Profile photo */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative group cursor-pointer">
                {/* Glow */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] blur-xl opacity-25 group-hover:opacity-55 group-hover:blur-2xl transition-all duration-500" />
                {/* Spinning ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#3B82F6] to-[#2DD4BF] opacity-50 animate-spin" style={{ animationDuration: '8s' }} />
                {/* Frame */}
                <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-[3px] bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] transform transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-105 shadow-[0_0_40px_rgba(45,212,191,0.25)] group-hover:shadow-[0_0_60px_rgba(45,212,191,0.5)]">
                  <div className="w-full h-full rounded-full bg-[#0C111A] border border-white/10 overflow-hidden flex items-center justify-center">
                    <img src="/foto-profil.png" alt="Ghilman Zikra" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-2/3 flex flex-col gap-5">
              <div>
                <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest uppercase">Tentang Saya</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                  Designer <span className="gradient-text">Multimedia ✨</span>
                </h2>
              </div>

              <p className="text-gray-400 leading-relaxed">
                Hai! Aku Ghilman Zikra, seorang Multimedia Designer yang hobi menjembatani dunia visual dan teknologi. Fokus utama aku adalah memproduksi konten multimedia—mulai dari graphic design, produksi video kreatif, hingga fotografi. Sebagai anak Teknik Informatika, aku juga punya nilai plus di bidang UI/UX dan frontend development.
              </p>

              <p className="text-gray-400 leading-relaxed">
                Dengan pengalaman memimpin berbagai tim kreatif, aku selalu siap menciptakan pengalaman digital yang rapi, estetik, dan efektif menyampaikan pesan.
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mt-1">
                {['Canva', 'Capcut', 'Figma', 'Illustrator', 'Photoshop'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-semibold rounded-full glass-card border border-[#2DD4BF]/20 text-[#2DD4BF]">
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href="/cv.pdf"
                download
                className="group self-start flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-[#2DD4BF]/[0.08] border border-white/10 hover:border-[#2DD4BF]/40 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
              >
                <svg className="w-5 h-5 text-[#2DD4BF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Unduh CV Saya
              </a>
            </div>
          </div>
        </GlassCard>
      </section>


      {/* =============================================
          SECTION 3 : GALERI KARYA
          ============================================= */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" ref={projectsSection.ref}>

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${projectsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest uppercase">Portofolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-3">Galeri Karya 🎨</h2>
          <p className="text-gray-400 text-lg">Eksplorasi desain, kode, dan visual.</p>
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${projectsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#0A0E17] font-black shadow-[0_0_20px_rgba(45,212,191,0.35)]'
                  : 'glass-card text-gray-400 hover:text-white border border-white/[0.06] hover:border-[#2DD4BF]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] transition-all duration-700 delay-300 ${projectsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`${project.span} rounded-3xl p-6 border border-white/[0.07] backdrop-blur-xl hover:shadow-2xl hover:shadow-[#2DD4BF]/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group cursor-pointer animate-fade-in-up ${project.color}`}
            >
              {/* Project image */}
              {project.image && (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/90 via-[#0A0E17]/20 to-transparent pointer-events-none" />
                </>
              )}

              {/* WIP indicator */}
              {project.isWip && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center animate-pulse">
                      <span className="text-3xl">🎬</span>
                    </div>
                    <div className="absolute -inset-2 rounded-full border border-[#2DD4BF]/10 animate-ping" />
                  </div>
                </div>
              )}

              {/* Badge */}
              <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase border ${project.badge}`}>
                {project.isWip ? 'Coming Soon' : 'Klik Review'}
              </div>

              {/* Title */}
              <div className="relative z-10 flex flex-col h-full justify-end">
                <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-gray-300 font-medium">{project.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =============================================
          SECTION 4 : SERTIFIKAT
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

          {/* Certificate gallery slide-down */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showCertificates ? "max-h-[2000px] mt-12 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#2DD4BF]/10">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/[0.08] hover:border-[#2DD4BF]/30 transition-all cursor-pointer overflow-hidden hover:-translate-y-1"
                  onClick={() => setSelectedProject({ title: cert.title, fullDesc: `Diterbitkan oleh ${cert.issuer}`, category: "Sertifikat", badge: "bg-[#2DD4BF]/15 text-[#2DD4BF] border-[#2DD4BF]/30" })}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0C111A]">
                    <div className="w-full h-full bg-[#111827] flex items-center justify-center text-white/20 font-bold italic text-sm">
                      Gambar Sertifikat
                    </div>
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                      <div className="text-white/[0.06] text-4xl font-black rotate-45 whitespace-nowrap uppercase tracking-[1rem]">
                        Ghilman Zikra • Ghilman Zikra •
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#2DD4BF]/0 group-hover:bg-[#2DD4BF]/10 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-[#0A0E17] font-black text-sm bg-[#2DD4BF] px-4 py-2 rounded-full shadow-lg">
                        Zoom View
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="text-white font-bold">{cert.title}</h4>
                    <p className="text-[#2DD4BF]/70 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>


      {/* =============================================
          MODAL POP-UP
          ============================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative z-10 w-full max-w-2xl animate-scale-up">
            <GlassCard className="p-8" hover={false}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/10 to-[#3B82F6]/10 rounded-2xl" />
              <div className="relative z-10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-0 right-0 w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/50 transition-all duration-200"
                >✕</button>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${selectedProject.badge ?? 'bg-[#2DD4BF]/15 text-[#2DD4BF] border-[#2DD4BF]/30'}`}>
                  {selectedProject.category}
                </span>

                <h2 className="text-3xl font-black text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{selectedProject.fullDesc}</p>

                <div className="flex gap-4">
                  <button className="group relative px-6 py-3 rounded-xl font-black text-[#0A0E17] overflow-hidden shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_35px_rgba(45,212,191,0.4)] transition-all duration-300">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] group-hover:from-[#5EEAD4] group-hover:to-[#60A5FA] transition-all duration-300" />
                    <span className="relative">Lihat Detail Penuh</span>
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 rounded-xl font-bold glass-card text-gray-400 hover:text-white transition-all duration-200"
                  >Tutup</button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}


      {/* =============================================
          SECTION 5 : KONTAK
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