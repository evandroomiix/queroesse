'use client';

import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, ArrowRight, ShieldCheck, Mail, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { loginWithGoogle } from '@/lib/storage';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  if (!isOpen) return null;

  const handleRealGoogleOAuth = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });

      if (error) {
        // Se o Google Cloud Console ainda não estiver configurado no Supabase
        console.warn('Google Provider no Supabase:', error.message);
        setGoogleNotice(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.warn('OAuth erro:', err);
      setGoogleNotice(true);
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const user = loginWithGoogle(
      name.trim(),
      email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`
    );
    onSuccess(user);
    onClose();
  };

  const handleInstantEvandro = () => {
    const user = loginWithGoogle('Evandro Magno', 'evandroomiix.lc@gmail.com');
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-rose-200">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Entrar no QueroEsse</h3>
          <p className="text-xs text-slate-500 mt-1">
            Identifique-se como anfitrião para gerenciar suas listas e acompanhar os presentes recebidos.
          </p>
        </div>

        {/* Botão Entrar como Evandro com 1 clique */}
        <div className="mb-4">
          <button
            onClick={handleInstantEvandro}
            className="w-full p-3 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shadow-xs">
                E
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                  Acesso Rápido Recomendado
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  Entrar como Evandro Magno
                </span>
                <span className="text-xs text-slate-500 block">evandroomiix.lc@gmail.com</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Botão Google OAuth */}
        <button
          onClick={handleRealGoogleOAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider shadow-2xs transition-all mb-4"
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
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
            <strong>Dica:</strong> Para o pop-up nativo da Google abrir, é necessário ativar o Google Provider no painel do Supabase. Enquanto isso, use o <strong>Acesso Rápido</strong> acima que já te conecta na hora!
          </div>
        )}

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">ou informe seus dados</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Formulário Manual */}
        <form onSubmit={handleQuickLogin} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              <span>Seu Nome *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Evandro Magno"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" />
              <span>Seu E-mail (Opcional)</span>
            </label>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Entrar como Anfitrião
          </button>
        </form>
      </div>
    </div>
  );
}
