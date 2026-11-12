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
    const titleOrHost = event.hostName || event.title;
    const parts = titleOrHost.split(/ e | & |,| /i).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)} & ${parts[1].charAt(0)}`.toUpperCase();
    }
    return titleOrHost.charAt(0).toUpperCase();
  };

  const isDark = template.isDarkTheme;

  return (
    <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 shadow-md ${template.cardStyle}`}>
      {/* ================= ESTILO 1: MONOGRAMA CLÁSSICO IMPERIAL ================= */}
      {template.heroPattern === 'monogram' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-[#faf6ee] via-white to-[#faf6ee] border-b border-amber-200/60">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-amber-300 p-1 flex items-center justify-center shadow-sm bg-white/80">
            <div className="w-full h-full rounded-full border border-amber-200 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/50 to-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-700 font-serif">M&L</span>
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
            <span className="text-amber-600 text-sm">❦ ❧ ❖</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto italic font-serif leading-relaxed">
            &ldquo;{event.description}&rdquo;
          </p>
        </div>
      )}

      {/* ================= ESTILO 2: ROMÂNTICO ROSE GOLD & CRISTAL (SUPER ROSA ELEGANTE) ================= */}
      {template.heroPattern === 'rose-gold' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-[#fff0f3] via-[#fdf4f5] to-white border-b-2 border-rose-200">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full border-2 border-rose-300 p-1 flex items-center justify-center shadow-md bg-white/90">
            <div className="w-full h-full rounded-full border border-rose-200 flex items-center justify-center bg-gradient-to-b from-rose-100/70 to-pink-50">
              <Sparkles className="w-8 h-8 text-rose-500 animate-pulse" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-rose-100 text-rose-700 border border-rose-300 mb-3 shadow-xs">
            🌸 {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-serif text-rose-950 leading-tight mb-3 ${template.fontTitle}`}>
            {event.title}
          </h1>

          <div className="flex items-center justify-center gap-2 my-3 text-rose-400">
            <span>✧</span>
            <div className="h-px w-12 bg-rose-200"></div>
            <span>💖</span>
            <div className="h-px w-12 bg-rose-200"></div>
            <span>✧</span>
          </div>

          <p className="text-xs sm:text-sm text-rose-900/80 max-w-lg mx-auto italic leading-relaxed">
            &ldquo;{event.description}&rdquo;
          </p>
        </div>
      )}

      {/* ================= ESTILO 3: PINK PARTY / BARBIE GLAM (SUPER ROSA VIBRANTE) ================= */}
      {template.heroPattern === 'pink-party' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-pink-200 via-rose-100 to-white border-b-2 border-pink-400">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-300 mb-3 animate-bounce">
            💖 {template.badge}
          </div>

          <h1 className={`text-4xl sm:text-6xl font-black text-pink-700 tracking-tight leading-tight drop-shadow-xs ${template.fontTitle}`}>
            {event.title}
          </h1>

          <div className="flex items-center justify-center gap-2 my-3 text-pink-500 font-bold text-lg">
            <span>✨ 🪩 🥂 ✨</span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-pink-900/90 max-w-md mx-auto leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 4: VINTAGE FLORAL & ROSA ANTIGO ================= */}
      {template.heroPattern === 'vintage-floral' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-[#fffbf9] border-b border-rose-200">
          <span className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-rose-800/80 mb-2 block">
            🥀 {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-serif text-rose-950 leading-tight mb-2 ${template.fontTitle}`}>
            {event.title}
          </h1>

          <div className="flex items-center justify-center gap-3 my-3">
            <span className="text-rose-400 text-xs">❦ ────── 🌹 ────── ❦</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-serif italic leading-relaxed">
            &ldquo;{event.description}&rdquo;
          </p>
        </div>
      )}

      {/* ================= ESTILO 5: CHÁ REVELAÇÃO (ROSA & AZUL SPLIT) ================= */}
      {template.heroPattern === 'revelacao' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-r from-pink-100 via-white to-sky-100 border-b-2 border-purple-200">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-pink-500 text-white shadow-xs">
              🎀 Menina?
            </span>
            <span className="text-purple-600 font-black text-sm">OU</span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-sky-500 text-white shadow-xs">
              🧸 Menino?
            </span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight ${template.fontTitle}`}>
            {event.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 6: JARDIM ENCANTADO & LUZES DE FADA ================= */}
      {template.heroPattern === 'jardim-luzes' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-[#f2f8f2] via-[#fafdfa] to-white border-b border-emerald-200">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            🌿 {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-serif text-emerald-950 leading-tight mb-2 ${template.fontTitle}`}>
            {event.title}
          </h1>

          <div className="flex items-center justify-center gap-2 my-2 text-amber-500 text-sm">
            <span>✨ 🍃 ✨ 🍃 ✨</span>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/80 max-w-md mx-auto leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 7: DOCE SONHO / NUVENS ================= */}
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

      {/* ================= ESTILO 8: BOHO ARCOS & TERRACOTA ================= */}
      {template.heroPattern === 'boho-arch' && (
        <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-[#faf3ec] border-b border-orange-200/60">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100/80 text-orange-900 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200">
            <span>🌾</span>
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

      {/* ================= ESTILO 9: NEON NIGHT / BALADA CYBER (DARK) ================= */}
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

      {/* ================= ESTILO 10: SUNSET TROPICAL ================= */}
      {template.heroPattern === 'sunset-tropical' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-orange-200/90 via-rose-100 to-amber-50 border-b border-orange-200">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500 text-white shadow-md mb-2">
            🍹 {template.badge}
          </span>
          <h1 className={`text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight ${template.fontTitle}`}>
            {event.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 11: SAFÁRI BABY ================= */}
      {template.heroPattern === 'safari-baby' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-[#f5f7f2] border-b border-lime-200">
          <div className="w-14 h-14 rounded-full bg-lime-100 text-lime-800 text-2xl flex items-center justify-center mx-auto mb-2 border border-lime-300">
            🦁
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-lime-800 block mb-1">
            {template.badge}
          </span>
          <h1 className={`text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight ${template.fontTitle}`}>
            {event.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 12: BOTECO & AMIGOS ================= */}
      {template.heroPattern === 'boteco-chalk' && (
        <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-gradient-to-b from-amber-100 via-yellow-50 to-white border-b-2 border-amber-300">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-200 text-amber-900 border border-amber-400 mb-2">
            🍺 {template.badge}
          </span>

          <h1 className={`text-3xl sm:text-5xl font-black text-amber-950 uppercase tracking-tight ${template.fontTitle}`}>
            {event.title}
          </h1>

          <p className="text-xs sm:text-sm text-amber-900/80 max-w-md mx-auto mt-2 font-medium">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 13: INDUSTRIAL LOFT ================= */}
      {template.heroPattern === 'industrial-loft' && (
        <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-[#f8f5f0] border-b-2 border-stone-800">
          <span className="inline-block px-3 py-0.5 rounded-none text-xs font-black uppercase tracking-widest bg-stone-900 text-amber-50 mb-2">
            {template.badge}
          </span>
          <h1 className={`text-3xl sm:text-5xl font-black text-stone-900 uppercase tracking-tight ${template.fontTitle}`}>
            {event.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto mt-2 font-medium">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 14: MIDNIGHT STAR (DARK) ================= */}
      {template.heroPattern === 'midnight-star' && (
        <div className="relative pt-12 pb-10 px-6 sm:px-12 text-center bg-gradient-to-b from-[#0a0d24] via-[#060814] to-[#060814] border-b border-sky-500/30">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/40 mb-3 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            🌌 {template.badge}
          </span>
          <h1 className={`text-3xl sm:text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] ${template.fontTitle}`}>
            {event.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-sky-200/80 max-w-md mx-auto leading-relaxed">
            {event.description}
          </p>
        </div>
      )}

      {/* ================= ESTILO 15: MINIMALISTA / GLAM (FALLBACK) ================= */}
      {template.heroPattern !== 'monogram' &&
        template.heroPattern !== 'rose-gold' &&
        template.heroPattern !== 'pink-party' &&
        template.heroPattern !== 'vintage-floral' &&
        template.heroPattern !== 'revelacao' &&
        template.heroPattern !== 'jardim-luzes' &&
        template.heroPattern !== 'cloud-stars' &&
        template.heroPattern !== 'boho-arch' &&
        template.heroPattern !== 'neon-glow' &&
        template.heroPattern !== 'sunset-tropical' &&
        template.heroPattern !== 'safari-baby' &&
        template.heroPattern !== 'boteco-chalk' &&
        template.heroPattern !== 'industrial-loft' &&
        template.heroPattern !== 'midnight-star' && (
          <div className="relative pt-10 pb-8 px-6 sm:px-10 text-center bg-white border-b border-slate-100">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 block mb-2">
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
