"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  // Mencegah error "Hydration Mismatch" antara server dan client
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{children}</>;

  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>;
}