import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QueroEsse • Listas de Presentes Inteligentes & Personalizadas",
  description:
    "Crie listas de presentes com templates sob medida para casamento, aniversário, chá de bebê e casa nova. Bloqueio automático de presentes repetidos e modo de lista de convidados pré-cadastrada.",
  keywords: [
    "lista de presentes",
    "casamento",
    "aniversário",
    "chá de bebê",
    "casa nova",
    "bloqueio de presentes",
    "convidados",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-rose-500 selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
