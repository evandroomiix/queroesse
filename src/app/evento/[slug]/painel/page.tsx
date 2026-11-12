'use client';

import React, { useEffect, useState, use, Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShareModal from '@/components/ShareModal';
import ImagePicker from '@/components/ImagePicker';
import { getEventBySlug, saveEvent, addGiftToEvent, removeGiftFromEvent, cancelReservation } from '@/lib/storage';
import { EventData, GiftItem, Guest } from '@/types';
import {
  Gift,
  Users,
  MessageSquare,
  Sparkles,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  Clock,
  Eye,
  ArrowLeft,
  DollarSign,
  Heart,
  AlertCircle
} from 'lucide-react';

interface PanelPageProps {
  params: Promise<{ slug: string }>;
}

function HostPanelContent({ params }: PanelPageProps) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<EventData | null>(null);
  const [activeTab, setActiveTab] = useState<'presentes' | 'convidados' | 'recados'>('presentes');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Estado para adicionar presente rápido
  const [showAddGift, setShowAddGift] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Geral');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [newStoreUrl, setNewStoreUrl] = useState('');
  const [newStoreName, setNewStoreName] = useState('');
  const [newImage, setNewImage] = useState('');

  // Estado para adicionar novo convidado
  const [newGuestName, setNewGuestName] = useState('');

  const loadData = () => {
    const data = getEventBySlug(resolvedParams.slug);
    setEvent(data);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('queroesse_storage_updated', handleUpdate);
    return () => window.removeEventListener('queroesse_storage_updated', handleUpdate);
  }, [resolvedParams.slug]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-bold text-slate-700">Carregando painel do anfitrião...</p>
      </div>
    );
  }

  // Cálculos de métricas
  const totalUnits = event.gifts.reduce((sum, g) => sum + g.totalQuantity, 0);
  const reservedUnits = event.gifts.reduce(
    (sum, g) => sum + g.reservations.reduce((rSum, r) => rSum + r.quantity, 0),
    0
  );

  const totalEstimatedValue = event.gifts.reduce(
    (sum, g) => sum + (g.price || 0) * g.totalQuantity,
    0
  );

  const reservedValue = event.gifts.reduce((sum, g) => {
    const reservedQty = g.reservations.reduce((rSum, r) => rSum + r.quantity, 0);
    return sum + (g.price || 0) * reservedQty;
  }, 0);

  // Lista plana de todos os recados
  const allMessages = event.gifts.flatMap((gift) =>
    gift.reservations
      .filter((r) => r.message)
      .map((r) => ({
        ...r,
        giftTitle: gift.title,
      }))
  );

  const handleCreateGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addGiftToEvent(event.slug, {
      title: newTitle.trim(),
      category: newCategory.trim() || 'Geral',
      totalQuantity: Math.max(1, newQuantity),
      price: newPrice ? parseFloat(newPrice.replace(',', '.')) : undefined,
      storeUrl: newStoreUrl.trim() || undefined,
      storeName: newStoreName.trim() || undefined,
      imageUrl: newImage.trim() || undefined,
    });

    setNewTitle('');
    setNewPrice('');
    setNewQuantity(1);
    setNewStoreUrl('');
    setNewStoreName('');
    setNewImage('');
    setShowAddGift(false);
    loadData();
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const newGuest: Guest = {
      id: `guest-${Date.now()}`,
      name: newGuestName.trim(),
      reservedCount: 0,
    };

    const updatedEvent = {
      ...event,
      predefinedGuests: [...event.predefinedGuests, newGuest],
    };

    saveEvent(updatedEvent);
    setNewGuestName('');
    loadData();
  };

  const handleRemoveGuest = (guestId: string) => {
    if (confirm('Deseja remover este convidado da lista?')) {
      const updatedEvent = {
        ...event,
        predefinedGuests: event.predefinedGuests.filter((g) => g.id !== guestId),
      };
      saveEvent(updatedEvent);
      loadData();
    }
  };

  const handleRemoveGift = (giftId: string) => {
    if (confirm('Tem certeza que deseja excluir este presente?')) {
      removeGiftFromEvent(event.slug, giftId);
      loadData();
    }
  };

  const handleCancelReservation = (giftId: string, resId: string) => {
    if (confirm('Deseja cancelar esta reserva e liberar o presente para outros convidados?')) {
      cancelReservation(event.slug, giftId, resId);
      loadData();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Top Header */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/evento/${event.slug}`}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              title="Voltar à visão do convidado"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                Painel do Anfitrião
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar no WhatsApp</span>
            </button>

            <Link
              href={`/evento/${event.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <span>Ver como Convidado</span>
              <Eye className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full space-y-6">
        {/* ================= CARDS DE MÉTRICAS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Presentes</span>
              <Gift className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalUnits}</p>
            <p className="text-xs text-slate-500 mt-1">unidades no total</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Reservados</span>
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-600">{reservedUnits}</p>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round((reservedUnits / Math.max(1, totalUnits)) * 100)}% da lista concluída
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Valor dos Presentes</span>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {reservedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              de {totalEstimatedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Mural de Recados</span>
              <Heart className="w-4 h-4 text-pink-500" />
            </div>
            <p className="text-2xl font-black text-pink-600">{allMessages.length}</p>
            <p className="text-xs text-slate-500 mt-1">mensagens de carinho</p>
          </div>
        </div>

        {/* ================= ABAS DO PAINEL ================= */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('presentes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'presentes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Gerenciar Presentes ({event.gifts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('convidados')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'convidados'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>
              Lista de Convidados ({event.guestMode === 'predefined' ? event.predefinedGuests.length : 'Livre'})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('recados')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'recados'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mural de Recados ({allMessages.length})</span>
          </button>
        </div>

        {/* ================= ABA: PRESENTES ================= */}
        {activeTab === 'presentes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Itens e Status das Reservas
              </h3>
              <button
                onClick={() => setShowAddGift(!showAddGift)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Novo Presente</span>
              </button>
            </div>

            {/* Formulário Rápido de Adição */}
            {showAddGift && (
              <form
                onSubmit={handleCreateGift}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 animate-in fade-in"
              >
                <h4 className="text-xs font-bold text-slate-800">Novo Presente</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Título do presente *"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="sm:col-span-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="Categoria (ex: Cozinha)"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    type="number"
                    min={1}
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    placeholder="Quantidade"
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="Valor R$ (opcional)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="Nome da Loja"
                    value={newStoreName}
                    onChange={(e) => setNewStoreName(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="url"
                    placeholder="Link da Loja"
                    value={newStoreUrl}
                    onChange={(e) => setNewStoreUrl(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Foto do Produto
                  </label>
                  <ImagePicker value={newImage} onChange={setNewImage} productName={newTitle} />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddGift(false)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Salvar Presente
                  </button>
                </div>
              </form>
            )}

            {/* Lista dos Presentes com Reservas */}
            <div className="space-y-3">
              {event.gifts.map((gift) => {
                const totalRes = gift.reservations.reduce((sum, r) => sum + r.quantity, 0);
                const isFullyReserved = totalRes >= gift.totalQuantity;

                return (
                  <div
                    key={gift.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {gift.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={gift.imageUrl}
                            alt={gift.title}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                            <Gift className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-rose-600 uppercase">
                              {gift.category}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isFullyReserved
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : totalRes > 0
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {totalRes} de {gift.totalQuantity} reservado(s)
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">{gift.title}</h4>
                          <p className="text-xs text-slate-500">
                            {gift.price
                              ? gift.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                              : 'Sem valor estimado'}
                            {gift.storeName ? ` • ${gift.storeName}` : ''}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveGift(gift.id)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 self-end sm:self-center transition-colors"
                        title="Excluir presente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Exibição detalhada de quem reservou este presente */}
                    {gift.reservations.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Quem escolheu este presente:
                        </span>
                        {gift.reservations.map((res) => (
                          <div
                            key={res.id}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-bold text-slate-800">{res.guestName}</span>
                              {res.quantity > 1 && (
                                <span className="text-slate-500 font-semibold ml-1">
                                  ({res.quantity} unidades)
                                </span>
                              )}
                              {res.guestPhone && (
                                <span className="text-slate-400 ml-2">Tel: {res.guestPhone}</span>
                              )}
                              {res.message && (
                                <p className="text-slate-600 italic text-[11px] mt-0.5">
                                  &ldquo;{res.message}&rdquo;
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => handleCancelReservation(gift.id, res.id)}
                              className="text-[11px] font-semibold text-red-600 hover:underline shrink-0 ml-3"
                            >
                              Cancelar Reserva
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= ABA: CONVIDADOS ================= */}
        {activeTab === 'convidados' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Modo Atual:{' '}
                    {event.guestMode === 'predefined'
                      ? 'Lista Pré-Cadastrada (Convidados selecionam seu nome)'
                      : 'Modo Aberto (Qualquer pessoa com o link digita seu nome)'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    No modo pré-cadastrado, você tem total controle sobre quem são os 40 ou mais convidados da lista.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newMode = event.guestMode === 'predefined' ? 'open' : 'predefined';
                    saveEvent({ ...event, guestMode: newMode });
                    loadData();
                  }}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 shrink-0"
                >
                  Alternar para Modo {event.guestMode === 'predefined' ? 'Aberto' : 'Pré-Cadastrado'}
                </button>
              </div>
            </div>

            {event.guestMode === 'predefined' && (
              <>
                {/* Adicionar Convidado Rápido */}
                <form
                  onSubmit={handleAddGuest}
                  className="p-4 bg-white rounded-2xl border border-slate-200 flex gap-2"
                >
                  <input
                    type="text"
                    required
                    placeholder="Nome do novo convidado..."
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0"
                  >
                    + Adicionar à Lista
                  </button>
                </form>

                {/* Grid dos Convidados */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {event.predefinedGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{guest.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {guest.reservedCount > 0 ? (
                              <span className="text-emerald-600 font-semibold">
                                ✓ Já escolheu presente ({guest.reservedCount})
                              </span>
                            ) : (
                              <span className="text-slate-400">Ainda não escolheu</span>
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveGuest(guest.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Remover convidado"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= ABA: MURAL DE RECADOS ================= */}
        {activeTab === 'recados' && (
          <div>
            {allMessages.length === 0 ? (
              <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center">
                <Heart className="w-10 h-10 text-rose-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">Nenhum recado recebido ainda</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Assim que os convidados confirmarem os presentes com recados, eles aparecerão aqui com muito carinho.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-3xl border border-rose-100 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{msg.guestName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(msg.reservedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 italic leading-relaxed bg-rose-50/50 p-3 rounded-xl border border-rose-100/60">
                      &ldquo;{msg.message}&rdquo;
                    </p>

                    <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-rose-500" />
                      <span>Presente: <strong>{msg.giftTitle}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        eventTitle={event.title}
        slug={event.slug}
      />

      <Footer />
    </div>
  );
}

export default function HostPanelPage(props: PanelPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <p className="text-sm font-bold text-slate-700">Carregando painel do anfitrião...</p>
        </div>
      }
    >
      <HostPanelContent {...props} />
    </Suspense>
  );
}
