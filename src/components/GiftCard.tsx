'use client';

import React from 'react';
import { GiftItem, EventTemplateConfig } from '@/types';
import { ExternalLink, Check, Lock, Gift, Heart, Sparkles, ShoppingBag } from 'lucide-react';

interface GiftCardProps {
  gift: GiftItem;
  onReserve: (gift: GiftItem) => void;
  accentColor?: string;
  template?: EventTemplateConfig;
}

export default function GiftCard({ gift, onReserve, accentColor = '#f43f5e', template }: GiftCardProps) {
  const totalReserved = gift.reservations.reduce((acc, curr) => acc + curr.quantity, 0);
  const remaining = Math.max(0, gift.totalQuantity - totalReserved);
  const isFullyReserved = remaining === 0;

  // Lista dos nomes que reservaram
  const reservedNames = gift.reservations.map((r) => r.guestName);

  const isDark = template?.isDarkTheme;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden transition-all duration-300 border ${
        template?.cardStyle ||
        (isFullyReserved
          ? 'bg-slate-50/80 border-slate-200/90 opacity-90 rounded-3xl'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl')
      }`}
    >
      {/* Imagem do Produto / Capa */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {gift.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gift.imageUrl}
            alt={gift.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isFullyReserved ? 'grayscale-40' : 'group-hover:scale-105'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-rose-50 text-slate-400">
            <Gift className="w-12 h-12 text-rose-300 mb-1" />
            <span className="text-xs font-medium">Presente Especial</span>
          </div>
        )}

        {/* Badge da Categoria */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-slate-800 rounded-full shadow-xs border border-white/60">
            {gift.category}
          </span>
        </div>

        {/* Status de Reserva (Se esgotado) */}
        {isFullyReserved && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 text-center animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/90 text-white flex items-center justify-center mb-2 shadow-lg">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <span className="font-extrabold text-sm uppercase tracking-wide">
              Presente Já Reservado!
            </span>
            <p className="text-xs text-slate-200 mt-1 line-clamp-2">
              Por: {reservedNames.join(', ')}
            </p>
          </div>
        )}

        {/* Indicador de Unidades Múltiplas */}
        {!isFullyReserved && gift.totalQuantity > 1 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white rounded-full shadow-md">
              {remaining} de {gift.totalQuantity} disponíveis
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo textual */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className={`font-bold text-base leading-snug line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'} ${template?.fontTitle || ''}`}>
            {gift.title}
          </h3>

          {gift.description && (
            <p className={`mt-1.5 text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              {gift.description}
            </p>
          )}

          {/* Preço Estimado e Link da Loja */}
          <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 flex-wrap ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            {gift.price !== undefined && gift.price > 0 ? (
              <div>
                <span className={`text-[10px] block font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>Valor Sugerido</span>
                <span className={`text-base font-extrabold ${isDark ? 'text-purple-300' : 'text-slate-900'}`}>
                  {gift.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">Valor não especificado</span>
            )}

            {gift.storeUrl && (
              <a
                href={gift.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1.5 rounded-xl transition-colors"
                title="Ver onde encontrar este produto"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{gift.storeName ? `Ver na ${gift.storeName}` : 'Onde Comprar'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="mt-5">
          {isFullyReserved ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-200 text-slate-500 text-xs font-bold cursor-not-allowed uppercase tracking-wider"
            >
              <Lock className="w-4 h-4" />
              Indisponível (Já Escolhido)
            </button>
          ) : (
            <button
              onClick={() => onReserve(gift)}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-98 ${
                template?.buttonStyle || 'bg-slate-900 hover:bg-rose-600 text-white shadow-sm hover:shadow-lg'
              }`}
            >
              <Heart className="w-4 h-4 fill-current opacity-80" />
              <span>Quero Presentear Esse</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
