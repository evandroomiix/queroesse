'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { loginWithGoogle } from '@/lib/storage';
import { Gift, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      router.push('/');
    }, 400);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle(email.split('@')[0], email);
      router.push('/');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-rose-200">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Acesse sua Conta</h2>
            <p className="text-xs text-slate-500 mt-1">
              Gerencie suas listas de presentes, acompanhe os mimos e leia os recados dos convidados.
            </p>
          </div>

          {/* Botão Google Login */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-2xs transition-all hover:scale-101 active:scale-98"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar com o Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">ou com seu e-mail</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Entrar ou Criar Conta
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Acesso seguro sem complicações</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
