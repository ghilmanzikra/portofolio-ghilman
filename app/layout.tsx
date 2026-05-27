import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghilman Zikra | Portfolio",
  description: "Web Portofolio Pribadi Ghilman Zikra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#07070f] text-gray-100 overflow-x-hidden">

        {/* =============================================
            AURORA BACKGROUND SYSTEM (fixed, layered)
            ============================================= */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

          {/* Deep base */}
          <div className="absolute inset-0 bg-[#07070f]" />

          {/* Noise texture overlay for depth */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />

          {/* Aurora orb — top left violet */}
          <div
            className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full animate-aurora"
            style={{
              background: 'radial-gradient(circle, rgba(109,40,217,0.35) 0%, rgba(91,33,182,0.15) 50%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Aurora orb — top right blue */}
          <div
            className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] rounded-full animate-aurora"
            style={{
              background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(29,78,216,0.12) 50%, transparent 70%)',
              filter: 'blur(70px)',
              animationDelay: '2s',
            }}
          />

          {/* Aurora orb — mid-page pink/rose accent */}
          <div
            className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full animate-aurora"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animationDelay: '4s',
            }}
          />

          {/* Aurora orb — bottom right teal */}
          <div
            className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full animate-aurora"
            style={{
              background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
              filter: 'blur(90px)',
              animationDelay: '6s',
            }}
          />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* =============================================
            LAYOUT STRUCTURE
            ============================================= */}
        <Navbar />

        <main className="flex-grow pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}