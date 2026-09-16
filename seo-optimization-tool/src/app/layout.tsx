import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RetroFit SEO Analyzer",
  description: "A premium SEO optimization tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
