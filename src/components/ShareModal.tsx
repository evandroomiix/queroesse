'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  slug: string;
}

export default function ShareModal({ isOpen, onClose, eventTitle, slug }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/evento/${slug}`
    : `https://queroesse.app/evento/${slug}`;

  const whatsappMessage = encodeURIComponent(
    `Oi! 💖 Criei nossa lista de presentes no QueroEsse para o evento: *${eventTitle}*.\n\nVocê pode ver os itens sugeridos e reservar o seu direto pelo link:\n👉 ${currentUrl}`
  );

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-slate-100 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
              Compartilhar com os Convidados
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
              Link da sua Lista
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Envie esse link para seus convidados. Eles poderão escolher o que dar e o sistema bloqueia escolhas repetidas automaticamente.
        </p>

        {/* Campo de Copiar Link */}
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="w-full bg-transparent px-2 text-xs font-mono text-slate-700 focus:outline-none select-all truncate"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Botão de WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-200 mb-3"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Compartilhar no WhatsApp</span>
        </a>

        {/* QR Code Simulado em SVG para Impressão */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <QrCode className="w-5 h-5 text-slate-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">QR Code do Convite</p>
              <p className="text-[11px] text-slate-500">Pronto para colocar no convite impresso</p>
            </div>
          </div>
          <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-300 shadow-2xs flex items-center justify-center">
            {/* SVG estilizado representando QR code */}
            <svg viewBox="0 0 24 24" className="w-full h-full text-slate-800 fill-current">
              <path d="M2 2h8v8H2zm2 2v4h4V4zm10-2h8v8h-8zm2 2v4h4V4zM2 14h8v8H2zm2 2v4h4v-4zm10 4h2v2h-2zm2-2h2v2h-2zm-2-2h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-6-2h2v2h-2zm6-4h2v2h-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
