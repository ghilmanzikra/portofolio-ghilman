export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-24 overflow-hidden">
      {/* Top separator — teal gradient */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent" />

      {/* Glow blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-[#2DD4BF]/10 blur-[80px] pointer-events-none" />

      <div className="relative backdrop-blur-md bg-[#0A0E17]/60 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-lg font-extrabold">
              <span className="text-white">Ghilman</span>
              <span className="gradient-text-subtle">Zikra</span>
              <span className="text-[#2DD4BF]">.</span>
            </span>
            <p className="text-gray-500 text-xs">Mahasiswa • UI Designer • Kreator Digital</p>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm font-medium order-last md:order-none">
            © {currentYear}{' '}
            <span className="text-gray-400 font-semibold">Ghilman Zikra</span>
            {' '}— Made In Indonesia 🇮🇩
          </p>

          {/* Back to top */}
          <a
            href="#home"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl glass-card glass-card-hover text-gray-400 hover:text-[#2DD4BF] text-sm font-semibold transition-all duration-300"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}