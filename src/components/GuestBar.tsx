'use client';

import React, { useState } from 'react';
import { UserCheck, Search, Users, Sparkles, Check, ChevronDown } from 'lucide-react';
import { Guest, GuestMode } from '@/types';

interface GuestBarProps {
  guestMode: GuestMode;
  predefinedGuests: Guest[];
  activeGuestName: string;
  onSelectGuest: (name: string) => void;
  accentColor?: string;
}

export default function GuestBar({
  guestMode,
  predefinedGuests,
  activeGuestName,
  onSelectGuest,
  accentColor = '#f43f5e',
}: GuestBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [manualInput, setManualInput] = useState('');

  if (activeGuestName) {
    return (
      <div className="w-full bg-white/90 backdrop-blur-sm border border-emerald-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-xs">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-emerald-700 flex items-center gap-1.5">
              <span>Convidado Identificado</span>
              <Sparkles className="w-3.5 h-3.5" />
            </p>
            <h4 className="text-base font-bold text-slate-900">
              Olá, <span className="text-emerald-700">{activeGuestName}</span>! Que alegria ter você aqui.
            </h4>
          </div>
        </div>

        <button
          onClick={() => onSelectGuest('')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors"
        >
          Não é você? Trocar convidado
        </button>
      </div>
    );
  }

  // Se o evento tem lista pré-cadastrada pelo anfitrião
  if (guestMode === 'predefined' && predefinedGuests.length > 0) {
    const filteredGuests = predefinedGuests.filter((g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="w-full bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
              Identificação do Convidado
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Quem está acessando a lista de presentes?
            </h3>
            <p className="text-xs text-slate-500">
              O anfitrião cadastrou a lista de convidados. Selecione seu nome para reservar presentes sem complicação:
            </p>
          </div>
        </div>

        {/* Seletor Dropdown com busca */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl text-left text-sm font-medium text-slate-700 transition-all focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Clique aqui para encontrar seu nome na lista ({predefinedGuests.length} convidados)...</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-30 max-h-72 flex flex-col gap-2 animate-in fade-in zoom-in-95">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Digite seu primeiro nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
                  autoFocus
                />
              </div>

              <div className="overflow-y-auto space-y-1 flex-1 pr-1">
                {filteredGuests.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    Nenhum convidado encontrado com &ldquo;{searchTerm}&rdquo;.
                  </div>
                ) : (
                  filteredGuests.map((guest) => (
                    <button
                      key={guest.id}
                      onClick={() => {
                        onSelectGuest(guest.name);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl text-left hover:bg-rose-50 hover:text-rose-700 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-rose-200 text-slate-700 group-hover:text-rose-800 flex items-center justify-center text-xs font-bold">
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800 group-hover:text-rose-900">
                          {guest.name}
                        </span>
                      </div>

                      {guest.reservedCount > 0 && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Já escolheu presente
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Modo aberto (convidado pode identificar-se opcionalmente antes ou na hora do modal)
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <Users className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Você é nosso convidado especial!
          </h4>
          <p className="text-xs text-slate-500">
            Fique à vontade para olhar os presentes. Você pode informar seu nome ao escolher um item.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Seu nome (opcional)..."
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          className="text-xs px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-rose-500"
        />
        <button
          onClick={() => {
            if (manualInput.trim()) onSelectGuest(manualInput.trim());
          }}
          disabled={!manualInput.trim()}
          className="text-xs font-semibold px-3 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 disabled:opacity-40 transition-colors"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
