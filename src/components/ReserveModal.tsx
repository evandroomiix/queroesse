'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GiftItem, Guest, GuestMode } from '@/types';
import { X, Heart, Sparkles, Check, ShoppingBag, ExternalLink, MessageSquare, User, Phone } from 'lucide-react';

interface ReserveModalProps {
  gift: GiftItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { guestName: string; guestPhone?: string; message?: string; quantity: number }) => Promise<boolean> | boolean;
  guestMode: GuestMode;
  predefinedGuests: Guest[];
  initialGuestName?: string;
}

export default function ReserveModal({
  gift,
  isOpen,
  onClose,
  onConfirm,
  guestMode,
  predefinedGuests,
  initialGuestName = '',
}: ReserveModalProps) {
  const [guestName, setGuestName] = useState(initialGuestName);
  const [guestPhone, setGuestPhone] = useState('');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !gift) return null;

  const totalReserved = gift.reservations.reduce((acc, curr) => acc + curr.quantity, 0);
  const maxAvailable = Math.max(1, gift.totalQuantity - totalReserved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage('Por favor, informe seu nome para que o anfitrião saiba quem está presenteando.');
      return;
    }

    setErrorMessage('');
    const ok = await onConfirm({
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      message: message.trim(),
      quantity,
    });

    if (ok) {
      // Disparo de confetes festivos!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'],
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }

      setIsSuccess(true);
    } else {
      setErrorMessage('Ops! Este presente acabou de ser reservado por outro convidado.');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Botão de Fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Tela de Sucesso */
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-md shadow-emerald-100 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600">
              Reserva Confirmada!
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              Obrigado pelo carinho, {guestName}!
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-sm">
              O presente <strong className="text-slate-800">&ldquo;{gift.title}&rdquo;</strong> foi reservado com sucesso em seu nome.
            </p>

            {gift.storeUrl && (
              <div className="mt-5 p-4 rounded-2xl bg-rose-50/70 border border-rose-100 w-full text-left">
                <p className="text-xs font-semibold text-rose-800 mb-1 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-rose-600" />
                  Deseja comprar online agora?
                </p>
                <p className="text-xs text-rose-700/80 mb-2">
                  O anfitrião deixou o link da loja onde encontrar este produto:
                </p>
                <a
                  href={gift.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl transition-colors shadow-xs"
                >
                  <span>Acessar {gift.storeName || 'Loja Sugerida'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <button
              onClick={handleClose}
              className="mt-6 w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm transition-colors"
            >
              Concluir & Voltar à Lista
            </button>
          </div>
        ) : (
          /* Formulário de Reserva */
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              {gift.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={gift.imageUrl}
                  alt={gift.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                  <Heart className="w-8 h-8" />
                </div>
              )}
              <div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                  {gift.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {gift.title}
                </h3>
                {gift.price && (
                  <span className="text-sm font-bold text-slate-700 block mt-1">
                    Valor sugerido: {gift.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Seletor de Quantidade (se o item tiver > 1 disponível) */}
              {maxAvailable > 1 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Quantas unidades você deseja presentear?
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-rose-500"
                    >
                      {Array.from({ length: maxAvailable }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'unidade' : 'unidades'}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-slate-400">
                      (Restam {maxAvailable} de {gift.totalQuantity} disponíveis)
                    </span>
                  </div>
                </div>
              )}

              {/* Nome do Convidado */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Seu Nome Completo *</span>
                </label>

                {guestMode === 'predefined' && predefinedGuests.length > 0 ? (
                  <div className="space-y-2">
                    <select
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-rose-500"
                    >
                      <option value="">-- Selecione seu nome na lista do anfitrião --</option>
                      {predefinedGuests.map((g) => (
                        <option key={g.id} value={g.name}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-400">
                      Não achou seu nome? Você também pode digitar abaixo:
                    </p>
                    <input
                      type="text"
                      placeholder="Ou digite seu nome aqui..."
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Luiza & Roberto"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                  />
                )}
              </div>

              {/* Telefone / WhatsApp Opcional */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>WhatsApp ou Telefone <span className="font-normal text-slate-400">(opcional)</span></span>
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Mensagem de Carinho */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mensagem ou Recado Especial <span className="font-normal text-slate-400">(opcional)</span></span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Escreva um recado carinhoso para o anfitrião..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-md shadow-rose-200 flex items-center justify-center gap-2 hover:scale-101 active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirmar & Reservar Presente</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Ao confirmar, o item será bloqueado na lista para evitar presentes repetidos.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
