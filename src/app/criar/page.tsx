'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImagePicker from '@/components/ImagePicker';
import { EVENT_TEMPLATES } from '@/lib/templates';
import { saveEvent } from '@/lib/storage';
import { EventCategory, EventData, GiftItem, GuestMode, Guest } from '@/types';
import {
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Check,
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  ShoppingBag,
  ExternalLink,
  HelpCircle,
  Wand2
} from 'lucide-react';

function CreateEventContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialNicho = (searchParams.get('nicho') as EventCategory) || 'casamento';

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Passo 1: Informações do Evento
  const [category, setCategory] = useState<EventCategory>(initialNicho);
  const [title, setTitle] = useState('');
  const [hostName, setHostName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState(
    'Criamos esta lista com muito carinho para compartilhar este momento especial com vocês. Sintam-se à vontade para escolher o mimo que mais toca o coração!'
  );
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
  );

  // Passo 2: Convidados
  const [guestMode, setGuestMode] = useState<GuestMode>('predefined');
  const [bulkGuestsText, setBulkGuestsText] = useState(
    'Ana Carolina Mendonça\nCarlos Eduardo & Família\nJuliana e Roberto Prado\nTia Bete e Tio Jorge\nLucas Gabriel (Padrinho)\nFernanda Lima (Madrinha)\nVovô Arnaldo\nBeatriz Vasconcelos\nRodrigo e Camila Pires\nFelipe Fontana'
  );

  // Passo 3: Presentes
  const [gifts, setGifts] = useState<GiftItem[]>([]);

  // Estado para adicionar presente avulso
  const [newGiftTitle, setNewGiftTitle] = useState('');
  const [newGiftCategory, setNewGiftCategory] = useState('Geral');
  const [newGiftDesc, setNewGiftDesc] = useState('');
  const [newGiftQuantity, setNewGiftQuantity] = useState(1);
  const [newGiftPrice, setNewGiftPrice] = useState<string>('');
  const [newGiftStoreUrl, setNewGiftStoreUrl] = useState('');
  const [newGiftStoreName, setNewGiftStoreName] = useState('');
  const [newGiftImage, setNewGiftImage] = useState('');

  // Importar sugestões do nicho
  const handleImportTemplateSuggestions = () => {
    const template = EVENT_TEMPLATES[category];
    const importedGifts: GiftItem[] = template.sampleGifts.map((sample, idx) => ({
      ...sample,
      id: `imported-${Date.now()}-${idx}`,
      reservations: [],
    }));
    setGifts((prev) => [...prev, ...importedGifts]);
  };

  const handleAddCustomGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGiftTitle.trim()) return;

    const gift: GiftItem = {
      id: `custom-${Date.now()}`,
      title: newGiftTitle.trim(),
      category: newGiftCategory.trim() || 'Geral',
      description: newGiftDesc.trim() || undefined,
      totalQuantity: Math.max(1, newGiftQuantity),
      price: newGiftPrice ? parseFloat(newGiftPrice.replace(',', '.')) : undefined,
      storeUrl: newGiftStoreUrl.trim() || undefined,
      storeName: newGiftStoreName.trim() || undefined,
      imageUrl: newGiftImage.trim() || undefined,
      reservations: [],
    };

    setGifts((prev) => [gift, ...prev]);

    // Limpar campos
    setNewGiftTitle('');
    setNewGiftDesc('');
    setNewGiftQuantity(1);
    setNewGiftPrice('');
    setNewGiftStoreUrl('');
    setNewGiftStoreName('');
    setNewGiftImage('');
  };

  const handleRemoveGift = (id: string) => {
    setGifts((prev) => prev.filter((g) => g.id !== id));
  };

  const handleFinish = () => {
    if (!title.trim()) {
      alert('Por favor, informe o título do seu evento.');
      setStep(1);
      return;
    }

    // Processar convidados se modo pré-definido
    const parsedGuests: Guest[] =
      guestMode === 'predefined'
        ? bulkGuestsText
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((name, index) => ({
              id: `guest-${index + 1}`,
              name,
              reservedCount: 0,
            }))
        : [];

    // Gerar slug amigável
    const baseSlug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug || 'evento'}-${Date.now().toString(36).substring(3, 7)}`;

    const newEvent: EventData = {
      id: `event-${Date.now()}`,
      slug,
      title: title.trim(),
      hostName: hostName.trim() || 'Anfitrião',
      category,
      date: date || new Date().toISOString().split('T')[0],
      time: time || undefined,
      location: location || undefined,
      description: description.trim(),
      coverImage: coverImage || undefined,
      guestMode,
      predefinedGuests: parsedGuests,
      gifts: gifts.length > 0 ? gifts : EVENT_TEMPLATES[category].sampleGifts.map((s, idx) => ({
        ...s,
        id: `default-${idx}`,
        reservations: [],
      })),
      createdAt: new Date().toISOString(),
    };

    saveEvent(newEvent);
    // Redireciona direto para a página pública do evento
    router.push(`/evento/${slug}?share=true`);
  };

  const currentTemplate = EVENT_TEMPLATES[category];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Barra de Progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className={step >= 1 ? 'text-rose-600' : ''}>1. O Evento</span>
            <span className={step >= 2 ? 'text-rose-600' : ''}>2. Convidados</span>
            <span className={step >= 3 ? 'text-rose-600' : ''}>3. Presentes</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* ================= PASSO 1: DADOS DO EVENTO ================= */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs animate-in fade-in duration-200">
            <div className="mb-8 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Passo 1 de 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Qual é a celebração?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Escolha o nicho do evento para carregar o template visual e sugestões perfeitas.
              </p>
            </div>

            {/* Nichos / Templates */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Selecione o Tipo de Evento / Nicho:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(EVENT_TEMPLATES) as EventCategory[]).map((cat) => {
                  const tmpl = EVENT_TEMPLATES[cat];
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-2xl mb-2">{tmpl.heroEmoji}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{tmpl.name.split('/')[0]}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{tmpl.badge}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campos do Formulário */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Título da Lista ou Nome do Evento *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Casamento Mariana & Leonardo / 30 Anos do Pedro / Chá da Alice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nome do Anfitrião(a) ou Casal *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mariana Silva e Leonardo Santos"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Data do Evento</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Horário (Opcional)</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Local / Cidade (Opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Espaço Solar das Palmeiras - SP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mensagem de Boas-Vindas aos Convidados
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Foto de Capa (URL de Imagem)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-rose-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Já deixamos uma imagem de alta qualidade pronta para o nicho selecionado.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!title.trim()) {
                    alert('Por favor, informe o título da lista.');
                    return;
                  }
                  setStep(2);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md shadow-rose-200 transition-all hover:scale-102"
              >
                <span>Avançar para Convidados</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PASSO 2: CONFIGURAÇÃO DOS CONVIDADOS ================= */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs animate-in fade-in duration-200">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Passo 2 de 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Como os convidados vão se identificar?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Você pode deixar livre ou cadastrar a lista prévia para os convidados apenas escolherem quem são.
              </p>
            </div>

            {/* Opções de Modo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setGuestMode('predefined')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  guestMode === 'predefined'
                    ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                      <Users className="w-4 h-4" />
                    </span>
                    {guestMode === 'predefined' && (
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Lista Pré-Cadastrada
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Você cola a lista de convidados (ex: 40 pessoas) e quem abre o link escolhe o próprio nome em um menu no início da página.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setGuestMode('open')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  guestMode === 'open'
                    ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Modo Aberto (Digitação Livre)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Qualquer pessoa com o link pode abrir e apenas digita o próprio nome na hora em que for reservar o presente.
                  </p>
                </div>
              </button>
            </div>

            {/* Se for Modo Pré-Cadastrado, mostra a caixa para colar nomes */}
            {guestMode === 'predefined' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Cole os nomes dos convidados (um por linha):
                  </label>
                  <span className="text-xs font-bold text-rose-600">
                    {bulkGuestsText.split('\n').filter((l) => l.trim()).length} convidados detectados
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={bulkGuestsText}
                  onChange={(e) => setBulkGuestsText(e.target.value)}
                  placeholder="Nome do Convidado 1&#10;Nome do Convidado 2&#10;Nome do Convidado 3..."
                  className="w-full p-3 text-xs sm:text-sm font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-rose-500"
                />
                <p className="text-[11px] text-slate-500">
                  Dica: Se você já tem a lista no Excel, Bloco de Notas ou WhatsApp, basta copiar os nomes e colar aqui direto!
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (guestMode === 'predefined' && !bulkGuestsText.trim()) {
                    alert('Por favor, informe pelo menos 1 convidado ou mude para o modo livre.');
                    return;
                  }
                  setStep(3);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md shadow-rose-200 transition-all hover:scale-102"
              >
                <span>Avançar para Presentes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PASSO 3: ADICIONAR PRESENTES ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Passo 3 de 3
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Monte a sua Lista de Presentes
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Adicione itens com valores, lojas e quantidades, ou importe as sugestões do seu nicho.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleImportTemplateSuggestions}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 hover:from-rose-100 hover:to-amber-100 text-rose-800 border border-rose-200 text-xs font-bold shrink-0 transition-colors shadow-2xs"
                >
                  <Wand2 className="w-4 h-4 text-rose-600" />
                  <span>Importar Sugestões de {currentTemplate.name.split('/')[0]}</span>
                </button>
              </div>

              {/* Formulário de Adicionar Presente Avulso */}
              <form onSubmit={handleAddCustomGift} className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-rose-600" />
                  <span>Adicionar Novo Presente Personalizado</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Título do Presente *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jogo de Panelas Antiaderente"
                      value={newGiftTitle}
                      onChange={(e) => setNewGiftTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cozinha, Quarto, Bebidas"
                      value={newGiftCategory}
                      onChange={(e) => setNewGiftCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Quantidade Desejada
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={newGiftQuantity}
                      onChange={(e) => setNewGiftQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Valor Estimado (R$ Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 189,90"
                      value={newGiftPrice}
                      onChange={(e) => setNewGiftPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nome da Loja (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Amazon / Magalu"
                      value={newGiftStoreName}
                      onChange={(e) => setNewGiftStoreName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Link da Loja (Opcional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newGiftStoreUrl}
                      onChange={(e) => setNewGiftStoreUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Descrição / Observação (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cor preta ou vermelha, tamanho 28cm..."
                      value={newGiftDesc}
                      onChange={(e) => setNewGiftDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Foto do Produto (Envie do seu celular ou busque na internet)
                    </label>
                    <ImagePicker
                      value={newGiftImage}
                      onChange={setNewGiftImage}
                      productName={newGiftTitle}
                    />
                  </div>
                </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    + Adicionar à Lista
                  </button>
                </div>
              </form>

              {/* Lista dos Presentes Adicionados */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Itens na Lista ({gifts.length})
                  </h3>
                  {gifts.length === 0 && (
                    <span className="text-xs text-amber-600 font-semibold">
                      (Nenhum item adicionado ainda. Clique em &ldquo;Importar Sugestões&rdquo; acima para preencher com 1 clique!)
                    </span>
                  )}
                </div>

                {gifts.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                    <Gift className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-600">Sua lista está vazia</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Você pode usar o botão &ldquo;Importar Sugestões&rdquo; ou preencher o formulário acima para adicionar os presentes que deseja receber.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {gifts.map((g) => (
                      <div
                        key={g.id}
                        className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {g.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={g.imageUrl}
                              alt={g.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                              <Gift className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                                {g.category}
                              </span>
                              {g.totalQuantity > 1 && (
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                  {g.totalQuantity} unidades
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 leading-snug">
                              {g.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                              {g.price && (
                                <span className="font-semibold text-slate-800">
                                  {g.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                              )}
                              {g.storeName && <span>Loja: {g.storeName}</span>}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveGift(g.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões Finais de Navegação */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-rose-200 transition-all hover:scale-102"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Concluir & Publicar Lista</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <CreateEventContent />
    </Suspense>
  );
}
