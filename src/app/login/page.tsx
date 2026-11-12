'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { loginWithGoogle } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import { Gift, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  const handleRealGoogleOAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });

      if (error) {
        console.warn('Google Provider no Supabase:', error.message);
        setGoogleNotice(true);
        setIsLoading(false);
      }
    } catch {
      setGoogleNotice(true);
      setIsLoading(false);
    }
  };

  const handleInstantEvandro = () => {
    loginWithGoogle('Evandro Magno', 'evandroomiix.lc@gmail.com');
    router.push('/');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    loginWithGoogle(name.trim(), email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`);
    router.push('/');
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

          {/* Botão de Acesso Rápido com seu perfil */}
          <button
            onClick={handleInstantEvandro}
            className="w-full p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 flex items-center justify-between text-left transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white font-extrabold flex items-center justify-center shadow-xs">
                E
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                  Acesso Rápido Imediato
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  Entrar como Evandro Magno
                </span>
                <span className="text-xs text-slate-500 block">evandroomiix.lc@gmail.com</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Botão Google Login */}
          <button
            onClick={handleRealGoogleOAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider shadow-2xs transition-all hover:scale-101 active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Conectar via Conta Google</span>
          </button>

          {googleNotice && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
              <strong>Aviso:</strong> O provedor Google no Supabase ainda não foi ativado com o Client ID no Google Cloud. Clique no botão <strong>Acesso Rápido</strong> acima para entrar imediatamente!
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">ou informe outro nome</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleCustomLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Eduardo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-mail (Opcional)
              </label>
              <input
                type="email"
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
              Entrar como Anfitrião
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
