'use client';

import React, { useState } from 'react';
import { EventCategory, EventTemplateConfig, TemplateId } from '@/types';
import { TEMPLATES_LIST, getTemplatesByCategory } from '@/lib/templates';
import { Smartphone, Monitor, Check, Sparkles, Heart, Gift, Users } from 'lucide-react';

interface LiveThemePreviewProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (template: EventTemplateConfig) => void;
  initialCategory?: EventCategory;
}

const NICHO_TABS: Array<{ id: EventCategory; label: string; emoji: string }> = [
  { id: 'casamento', label: 'Casamento', emoji: '💍' },
  { id: 'aniversario', label: 'Aniversário & Festas', emoji: '🎂' },
  { id: 'cha-de-bebe', label: 'Chá de Bebê', emoji: '🍼' },
  { id: 'casa-nova', label: 'Casa Nova & Open House', emoji: '🏡' },
  { id: 'geral', label: '15 Anos & Celebrações', emoji: '✨' },
];

export default function LiveThemePreview({
  selectedTemplateId,
  onSelectTemplate,
  initialCategory = 'casamento',
}: LiveThemePreviewProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>(initialCategory);
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');

  // Templates disponíveis no nicho ativo
  const availableTemplates = getTemplatesByCategory(activeCategory);

  // Template atualmente selecionado
  const currentTemplate =
    TEMPLATES_LIST.find((t) => t.id === selectedTemplateId) || availableTemplates[0] || TEMPLATES_LIST[0];

  const handleSelectNicho = (cat: EventCategory) => {
    setActiveCategory(cat);
    const firstInNicho = getTemplatesByCategory(cat)[0];
    if (firstInNicho) {
      onSelectTemplate(firstInNicho);
    }
  };

  const isDark = currentTemplate.isDarkTheme;

  return (
    <div className="space-y-6">
      {/* 1. SELETOR DE NICHOS */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          1. Selecione o Tipo do seu Evento (Nicho):
        </label>
        <div className="flex flex-wrap gap-2">
          {NICHO_TABS.map((nicho) => {
            const isSelected = activeCategory === nicho.id;
            return (
              <button
                key={nicho.id}
                type="button"
                onClick={() => handleSelectNicho(nicho.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md scale-102 ring-2 ring-slate-900/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{nicho.emoji}</span>
                <span>{nicho.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ÁREA DIVIDIDA: MODELOS DO NICHO + PREVIEW AO VIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA ESQUERDA: LISTA DE MODELOS DO NICHO (5 COLUNAS) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Escolha o Modelo ({availableTemplates.length} opções neste nicho):
            </label>
          </div>

          <div className="space-y-2.5">
            {availableTemplates.map((tmpl) => {
              const isSelected = currentTemplate.id === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => onSelectTemplate(tmpl)}
                  className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                        tmpl.isDarkTheme
                          ? 'bg-[#090a10] border-purple-500/40 text-white'
                          : 'bg-slate-100 border-slate-200'
                      }`}
                    >
                      {tmpl.heroEmoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                          {tmpl.badge}
                        </span>
                        {tmpl.isDarkTheme && (
                          <span className="text-[9px] bg-slate-900 text-purple-300 px-1.5 py-0.5 rounded-full font-bold">
                            Dark Mode
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {tmpl.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {tmpl.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-rose-500 bg-rose-500 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUNA DIREITA: PREVIEW AO VIVO EM TEMPO REAL (7 COLUNAS) */}
        <div className="lg:col-span-7 bg-slate-100 rounded-3xl p-4 sm:p-6 border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Preview ao Vivo do Modelo</span>
              </span>
              <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-500">
                {currentTemplate.name}
              </span>
            </div>

            {/* Alternador de Dispositivo */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  deviceMode === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Visualizar no Celular"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Celular</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  deviceMode === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Visualizar no Computador"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Desktop</span>
              </button>
            </div>
          </div>

          {/* MOCKUP DO DISPOSITIVO COM O VISUAL REAL DO TEMPLATE */}
          <div
            className={`mx-auto transition-all duration-300 shadow-2xl rounded-[32px] border-4 overflow-hidden ${
              deviceMode === 'mobile' ? 'max-w-[340px] border-slate-800' : 'w-full border-slate-300'
            }`}
          >
            {/* Notch superior se for celular */}
            {deviceMode === 'mobile' && (
              <div className="bg-slate-800 h-5 w-full flex items-center justify-center">
                <div className="w-20 h-3 bg-black rounded-b-xl"></div>
              </div>
            )}

            {/* TELA INTERNA DO SITE COM O TEMPLATE APLICADO */}
            <div className={`p-4 transition-colors duration-500 ${currentTemplate.bgClass} max-h-[460px] overflow-y-auto space-y-4`}>
              {/* Mini Cabeçalho Estilizado */}
              <div
                className={`p-5 rounded-2xl border text-center transition-all ${
                  currentTemplate.heroPattern === 'neon-glow'
                    ? 'bg-[#12072b] border-purple-500/40 text-white'
                    : currentTemplate.heroPattern === 'monogram'
                    ? 'bg-[#faf6ee] border-amber-300 text-stone-900'
                    : currentTemplate.heroPattern === 'boho-arch'
                    ? 'bg-[#faf3ec] border-orange-200 text-amber-950'
                    : currentTemplate.heroPattern === 'cloud-stars'
                    ? 'bg-gradient-to-b from-sky-100 to-white border-sky-200 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Monograma ou Ícone Temático */}
                {currentTemplate.heroPattern === 'monogram' && (
                  <div className="w-12 h-12 rounded-full border border-amber-400 mx-auto mb-2 flex items-center justify-center font-serif text-amber-800 text-xs font-bold bg-white">
                    M & L
                  </div>
                )}

                <span className="text-[9px] uppercase tracking-widest font-bold opacity-80 block mb-1">
                  {currentTemplate.badge}
                </span>

                <h3 className={`text-xl sm:text-2xl font-black leading-tight ${currentTemplate.fontTitle}`}>
                  {currentTemplate.category === 'casamento'
                    ? 'Mariana & Leonardo'
                    : currentTemplate.category === 'cha-de-bebe'
                    ? 'Chá da Alice'
                    : currentTemplate.category === 'casa-nova'
                    ? 'Open House da Ana'
                    : 'Pedro Faz 30 Anos!'}
                </h3>

                <p className="text-[10px] opacity-75 mt-1 max-w-xs mx-auto line-clamp-2">
                  {currentTemplate.tagline}
                </p>
              </div>

              {/* Barra de Identificação do Convidado */}
              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between text-[10px] ${
                  isDark
                    ? 'bg-slate-900/90 border-purple-500/20 text-purple-200'
                    : 'bg-white/90 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Users className="w-3.5 h-3.5 text-rose-500" />
                  <span>Selecione seu nome na lista...</span>
                </div>
                <span className="text-slate-400">40 convidados</span>
              </div>

              {/* Cards de Presentes com o estilo e botões reais do template */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={isDark ? 'text-white' : 'text-slate-800'}>Presentes Sugeridos</span>
                  <span className="text-rose-500">Ver Todos</span>
                </div>

                {currentTemplate.sampleGifts.slice(0, 2).map((gift, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      currentTemplate.cardStyle
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {gift.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={gift.imageUrl}
                          alt={gift.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                      )}
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500">
                          {gift.category}
                        </span>
                        <h4 className={`text-xs font-bold leading-snug line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'} ${currentTemplate.fontTitle}`}>
                          {gift.title}
                        </h4>
                        <span className={`text-[11px] font-extrabold block mt-0.5 ${isDark ? 'text-purple-300' : 'text-slate-800'}`}>
                          {gift.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-xs ${currentTemplate.buttonStyle}`}
                    >
                      Presentear
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-500 mt-3">
            ✨ O convidado verá a página exatamente com esta estética, fontes e cores.
          </p>
        </div>
      </div>
    </div>
  );
}
