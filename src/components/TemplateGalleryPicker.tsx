'use client';

import React from 'react';
import { TEMPLATES_LIST } from '@/lib/templates';
import { EventTemplateConfig, TemplateId } from '@/types';
import { Check, Sparkles } from 'lucide-react';

interface TemplateGalleryPickerProps {
  selectedId: TemplateId;
  onSelect: (template: EventTemplateConfig) => void;
}

export default function TemplateGalleryPicker({ selectedId, onSelect }: TemplateGalleryPickerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Escolha a Estética & Tema do seu Evento ({TEMPLATES_LIST.length} Estilos Exclusivos)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cada template altera radicalmente as fontes, paleta de cores, molduras e o clima da sua página.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEMPLATES_LIST.map((tmpl) => {
          const isSelected = selectedId === tmpl.id;
          return (
            <div
              key={tmpl.id}
              onClick={() => onSelect(tmpl)}
              className={`group relative p-4 rounded-3xl cursor-pointer border-2 transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-500 ring-4 ring-rose-500/20 shadow-lg scale-102 bg-white'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md bg-white'
              }`}
            >
              {/* Badge Selecionado */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                {/* Mini Preview Estético do Template */}
                <div
                  className={`w-full h-24 rounded-2xl p-3 flex flex-col justify-between mb-3 border overflow-hidden ${
                    tmpl.isDarkTheme
                      ? 'bg-[#090a10] border-purple-500/40 text-white'
                      : tmpl.heroPattern === 'monogram'
                      ? 'bg-[#faf6ee] border-amber-300/60 text-stone-900'
                      : tmpl.heroPattern === 'boho-arch'
                      ? 'bg-[#faf3ec] border-orange-200 text-amber-950'
                      : tmpl.heroPattern === 'cloud-stars'
                      ? 'bg-gradient-to-b from-sky-100 to-white border-sky-200 text-sky-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{tmpl.heroEmoji}</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-black/10">
                      {tmpl.category}
                    </span>
                  </div>

                  {/* Amostra da tipografia real do template */}
                  <div>
                    <p className={`text-base font-bold leading-tight ${tmpl.fontTitle}`}>
                      {tmpl.name.split('&')[0]}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                    {tmpl.badge}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {tmpl.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {tmpl.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">
                  {tmpl.isDarkTheme ? 'Dark Mode' : 'Light Mode'}
                </span>
                <span
                  className={`font-bold ${
                    isSelected ? 'text-rose-600' : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  {isSelected ? '✓ Selecionado' : 'Escolher'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
