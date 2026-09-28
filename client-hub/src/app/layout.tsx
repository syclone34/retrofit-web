import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client Hub | RetroFit Web Design",
  description: "Command Center and Client CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen`}>
        <div className="flex min-h-screen relative">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-[0]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none z-[0]" />
            
            <div className="max-w-7xl mx-auto h-full z-10 relative">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
