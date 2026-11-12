'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EVENT_TEMPLATES } from '@/lib/templates';
import { EventCategory } from '@/types';
import {
  Gift,
  Heart,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  Share2,
  Smartphone,
  Star,
  ExternalLink,
  SlidersHorizontal,
  CalendarCheck
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('casamento');
  const currentTemplate = EVENT_TEMPLATES[selectedCategory];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-rose-50/60 via-white to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide uppercase shadow-2xs mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>A Nova Geração de Listas de Presentes</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 max-w-3xl mx-auto leading-[1.15]">
            A lista de presentes que seus convidados{' '}
            <span className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              vão amar usar.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Perfeito para <strong>Casamentos, Aniversários, Chá de Bebê e Casa Nova</strong>. Cada nicho com design exclusivo, bloqueio automático de presentes repetidos e modo de lista de convidados pré-cadastrada.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/criar"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-base shadow-lg shadow-rose-200 transition-all hover:scale-102 active:scale-98"
            >
              <Gift className="w-5 h-5" />
              <span>Criar Minha Lista Grátis</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/evento/casamento-mari-e-leo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 shadow-sm transition-all hover:border-slate-300"
            >
              <span>Ver Exemplo de Casamento</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Micro Provas Sociais */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Sem taxas ou pegadinhas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Bloqueio de itens em tempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Funciona direto no WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Interativa de Nichos & Templates */}
      <section id="nichos" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
              Templates Sob Medida
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Cada celebração tem a sua própria identidade
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Chega de páginas genéricas. O <strong>QueroEsse</strong> personaliza as cores, tipografia e sugestões de presentes de acordo com o seu tipo de evento.
            </p>
          </div>

          {/* Abas dos Nichos */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {(Object.keys(EVENT_TEMPLATES) as EventCategory[]).map((cat) => {
              const tmpl = EVENT_TEMPLATES[cat];
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md scale-102'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-base">{tmpl.heroEmoji}</span>
                  <span>{tmpl.name.split('/')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Preview do Template Selecionado */}
          <div className={`rounded-3xl p-6 sm:p-10 border ${currentTemplate.cardStyle} transition-all duration-300`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  {currentTemplate.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {currentTemplate.name}
                </h3>
                <p className="text-slate-600 text-sm mt-1 max-w-xl">
                  {currentTemplate.tagline}
                </p>
              </div>

              <Link
                href={`/criar?nicho=${selectedCategory}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-transform hover:scale-102"
              >
                <span>Usar este Template</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid de Exemplos de Presentes para este nicho */}
            <div className="mt-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Sugestões inteligentes prontas para este nicho:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentTemplate.sampleGifts.slice(0, 4).map((gift, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {gift.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={gift.imageUrl}
                          alt={gift.title}
                          className="w-full h-32 rounded-xl object-cover mb-3"
                        />
                      )}
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                        {gift.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mt-0.5">
                        {gift.title}
                      </h4>
                      {gift.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {gift.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">
                        {gift.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      {gift.totalQuantity > 1 && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {gift.totalQuantity} cotas/unid.
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona & Diferenciais */}
      <section id="como-funciona" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
              Simples & Poderoso
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Como o QueroEsse resolve os maiores problemas
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Pensado do início ao fim para eliminar atritos para os convidados e facilitar o controle do anfitrião.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-5 shadow-2xs">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Bloqueio Inteligente de Itens
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Assim que um convidado confirma a escolha, o presente é bloqueado automaticamente para outros convidados. Se você pedir 3 unidades (ex: toalhas), o sistema desconta e só bloqueia quando as 3 forem preenchidas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-5 shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Modo Lista de Convidados
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Se você tem 40 convidados, pode colar a lista de nomes no painel! Ao abrir o link, o convidado apenas seleciona seu nome no topo. É rápido, sem precisar preencher cadastros cansativos.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-5 shadow-2xs">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Onde Comprar & Link no Zap
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Coloque o link direto da loja onde encontrar (Amazon, Magazine Luiza, etc.) e o valor estimado (opcional). Quando terminar, compartilhe no WhatsApp com 1 clique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Listas de Demonstração */}
      <section id="exemplos" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
            Teste na Prática
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Veja como fica para quem recebe o link
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Criamos duas listas completas de demonstração com presentes e convidados já configurados para você experimentar agora mesmo:
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Demo Casamento */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/70 via-rose-50/40 to-white border border-amber-200/80 flex flex-col justify-between shadow-sm">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  💍 Casamento Real
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3">
                  Mariana & Leonardo
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Demonstração com <strong>Modo Lista Fechada</strong> (10 convidados cadastrados), cotas de Lua de Mel, itens de cozinha e presentes já reservados.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <Link
                  href="/evento/casamento-mari-e-leo"
                  className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1.5"
                >
                  <span>Abrir como Convidado</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/evento/casamento-mari-e-leo/painel"
                  className="px-3 py-1.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Painel do Anfitrião
                </Link>
              </div>
            </div>

            {/* Demo Aniversário */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/70 via-pink-50/40 to-white border border-purple-200/80 flex flex-col justify-between shadow-sm">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                  🎂 Aniversário 30 Anos
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3">
                  Pedro Faz 30 Anos!
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Demonstração com <strong>Modo Aberto</strong> (qualquer um digita seu nome), cotas de rodada de chopp artesanal e eletrônicos.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-200/60 flex items-center justify-between">
                <Link
                  href="/evento/trintei-do-pedro"
                  className="text-xs font-bold text-purple-900 hover:text-purple-700 flex items-center gap-1.5"
                >
                  <span>Abrir como Convidado</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/evento/trintei-do-pedro/painel"
                  className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Painel do Anfitrião
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Final de Criação */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-14 h-14 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-6 border border-rose-500/30">
            <Gift className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            Pronto para criar a lista de presentes perfeita?
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Leva menos de 2 minutos. Escolha o nicho, importe sugestões com 1 clique e compartilhe o link no WhatsApp com seus convidados.
          </p>

          <div className="mt-8">
            <Link
              href="/criar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base shadow-xl shadow-rose-900/40 hover:scale-102 active:scale-98 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Começar Minha Lista Agora</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
