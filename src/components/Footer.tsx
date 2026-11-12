'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Quero<span className="text-rose-500">Esse</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              A plataforma mais bonita, prática e inteligente para criar listas de presentes para casamentos, aniversários, chás de bebê e open house. Sem taxas abusivas, sem complicação.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conexão segura e bloqueio inteligente contra presentes duplicados</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Nichos & Modelos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/evento/casamento-mari-e-leo" className="hover:text-white transition-colors">
                  💍 Lista de Casamento
                </Link>
              </li>
              <li>
                <Link href="/evento/trintei-do-pedro" className="hover:text-white transition-colors">
                  🎂 Aniversário & 30tei
                </Link>
              </li>
              <li>
                <Link href="/criar?nicho=cha-de-bebe" className="hover:text-white transition-colors">
                  🍼 Chá de Bebê & Chá Rifa
                </Link>
              </li>
              <li>
                <Link href="/criar?nicho=casa-nova" className="hover:text-white transition-colors">
                  🏡 Casa Nova & Chá de Panela
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Recursos Especiais
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white transition-colors">
                  ✨ Bloqueio automático de itens
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  👥 Modo de lista de convidados
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  🛍️ Onde comprar & Preço sugerido
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  📱 Compartilhamento no WhatsApp
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 QueroEsse. Feito para celebrar momentos inesquecíveis.</p>
          <div className="flex items-center gap-1">
            <span>Criado com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para anfitriões e convidados felizes.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
