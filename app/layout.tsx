import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AppBackground from "@/components/AppBackground";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Que répondre quand...",
  description: "Réponses professionnelles adaptées à votre situation."
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className="bg-canvas text-ink antialiased">
        <AppBackground />
        <div className="relative z-10 min-h-screen">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
