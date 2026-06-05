import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ghilman Zikra | Portfolio",
  description: "Web Portofolio Pribadi Ghilman Zikra",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-[#0A0E17] text-gray-100 overflow-x-hidden">

        {/* ===== AURORA BACKGROUND — teal + ocean blue ===== */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#0A0E17]" />

          {/* Film grain */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />

          {/* Orb 1 — top-left MINT */}
          <div className="absolute top-[-8%] left-[-8%] w-[650px] h-[650px] rounded-full animate-aurora" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.28) 0%, rgba(20,184,166,0.12) 50%, transparent 70%)', filter: 'blur(70px)' }} />

          {/* Orb 2 — top-right BLUE */}
          <div className="absolute top-[2%] right-[-12%] w-[560px] h-[560px] rounded-full animate-aurora" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(37,99,235,0.10) 50%, transparent 70%)', filter: 'blur(75px)', animationDelay: '2.5s' }} />

          {/* Orb 3 — mid TEAL */}
          <div className="absolute top-[42%] left-[25%] w-[420px] h-[420px] rounded-full animate-aurora" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.14) 0%, transparent 70%)', filter: 'blur(90px)', animationDelay: '4s' }} />

          {/* Orb 4 — bottom-right BLUE */}
          <div className="absolute bottom-[8%] right-[3%] w-[480px] h-[480px] rounded-full animate-aurora" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)', filter: 'blur(80px)', animationDelay: '6s' }} />

          {/* Orb 5 — bottom-left MINT accent */}
          <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full animate-aurora" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.10) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `linear-gradient(rgba(45,212,191,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.4) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
        </div>

        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}