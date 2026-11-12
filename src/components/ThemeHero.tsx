'use client';

import React from 'react';
import { EventData, EventTemplateConfig } from '@/types';
import { Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';

interface ThemeHeroProps {
  event: EventData;
  template: EventTemplateConfig;
}

export default function ThemeHero({ event, template }: ThemeHeroProps) {
  // Extrai iniciais para monograma (ex: Mariana & Leonardo -> M & L)
  const getInitials = () => {
    const parts = event.hostName.split(/ e | & |,| /i).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0).toUpperCase()} & ${parts[1].charAt(0).toUpperCase()}`;
    }
    return event.hostName.charAt(0).toUpperCase();
  };

  const isDark = template.isDarkTheme;

  return (
    <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 shadow-md ${template.cardStyle}`}>
      {/* ================= ESTILO 1: MONOGRAMA CLÁSSICO (CASAMENTO CLÁSSICO) ================= */}
      {template.heroPattern === 'monogram' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-[#faf6ee] via-white to-[#faf6ee] border-b border-amber-200/60">
          {/* Brasão Monograma */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-amber-300 p-1 flex items-center justify-center shadow-sm bg-white/80">
            <div className="w-full h-full rounded-full border border-amber-200 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/50 to-white">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-serif">M&L</span>
              <span className="text-xl font-bold font-serif text-amber-900 tracking-wider">
                {getInitials()}
              </span>
            </div>
          </div>

          <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-800/80 mb-2 block">
            {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-normal text-stone-900 leading-tight mb-3 ${template.fontTitle}`}>
            {event.title}
          </h1>

          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300"></div>
            <span className="text-amber-600 text-sm">❧ ❦ ☙</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto italic font-serif leading-relaxed">
            &ldquo;{event.description}&rdquo;
          </p>
        </div>
      )}

      {/* ================= ESTILO 2: BOHO ARCOS & TERRACOTA ================= */}
      {template.heroPattern === 'boho-arch' && (
        <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-[#faf3ec] border-b border-orange-200/60">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100/80 text-orange-900 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200">
            <span>🌿</span>
            <span>{template.badge}</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black text-[#6d2f1d] leading-tight mb-2 ${template.fontTitle}`}>
            {event.title}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 3: NEON NIGHT / BALADA CYBER (DARK) ================= */}
      {template.heroPattern === 'neon-glow' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-[#12072b] via-[#090a10] to-[#090a10] border-b border-purple-500/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-purple-600/20 blur-[80px] pointer-events-none"></div>

          <div className="relative">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              ⚡ {template.badge}
            </span>

            <h1 className={`text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] ${template.fontTitle}`}>
              {event.title}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      )}

      {/* ================= ESTILO 4: DOCE SONHO / NUVENS (CHÁ DE BEBÊ) ================= */}
      {template.heroPattern === 'cloud-stars' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-sky-100/70 via-white to-sky-50 border-b border-sky-100">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm text-2xl flex items-center justify-center mx-auto mb-3 border border-sky-200">
            🍼
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
            {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight ${template.fontTitle}`}>
            {event.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 5: BOTECO & AMIGOS ================= */}
      {template.heroPattern === 'boteco-chalk' && (
        <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-gradient-to-b from-amber-100 via-yellow-50 to-white border-b-2 border-amber-300">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-200 text-amber-900 border border-amber-400 mb-2">
            🍻 {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-black text-amber-950 uppercase tracking-tight ${template.fontTitle}`}>
            {event.title}
          </h1>

          <p className="text-xs sm:text-sm text-amber-900/80 max-w-md mx-auto mt-2 font-medium">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 6: MINIMALISTA ESCANDINAVO / GERAL ================= */}
      {(template.heroPattern === 'minimal-grid' || template.heroPattern === 'glam-sparkles') && (
        <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-white border-b border-slate-100">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2">
            {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight ${template.fontTitle}`}>
            {event.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= FOTO DE CAPA (SE HOUVER) ================= */}
      {event.coverImage && (
        <div className="relative h-44 sm:h-64 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}

      {/* ================= BARRA DE INFORMAÇÕES DO EVENTO (DATA, HORA, LOCAL) ================= */}
      <div className={`p-5 sm:p-6 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm font-semibold border-t ${
        isDark ? 'border-purple-500/20 bg-slate-900/90 text-purple-200' : 'border-slate-100 bg-white/90 text-slate-700'
      }`}>
        {event.date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>
              {new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        )}

        {event.time && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-500" />
            <span>{event.time}</span>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>{event.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
