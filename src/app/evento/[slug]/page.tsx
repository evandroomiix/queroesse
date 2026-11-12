'use client';

import React, { useEffect, useState, use, Suspense } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuestBar from '@/components/GuestBar';
import GiftCard from '@/components/GiftCard';
import ReserveModal from '@/components/ReserveModal';
import ShareModal from '@/components/ShareModal';
import { getEventBySlug, reserveGift } from '@/lib/storage';
import { EVENT_TEMPLATES } from '@/lib/templates';
import { EventData, GiftItem } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Settings,
  Sparkles,
  Gift as GiftIcon,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

function EventContent({ params }: EventPageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const shouldOpenShare = searchParams.get('share') === 'true';

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados dos Modais
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(shouldOpenShare);

  // Estado do Convidado Ativo
  const [activeGuestName, setActiveGuestName] = useState<string>('');

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = () => {
    const data = getEventBySlug(resolvedParams.slug);
    setEvent(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('queroesse_storage_updated', handleUpdate);
    return () => window.removeEventListener('queroesse_storage_updated', handleUpdate);
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-bold text-slate-700">Carregando lista de presentes...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    notFound();
  }

  const template = EVENT_TEMPLATES[event.category] || EVENT_TEMPLATES.geral;

  // Categorias únicas dos presentes
  const categories = ['all', ...Array.from(new Set(event.gifts.map((g) => g.category)))];

  // Filtro de presentes
  const filteredGifts = event.gifts.filter((g) => {
    const matchCategory = selectedCategory === 'all' || g.category === selectedCategory;
    const matchSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.description && g.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Métricas
  const totalGiftsCount = event.gifts.reduce((sum, g) => sum + g.totalQuantity, 0);
  const reservedGiftsCount = event.gifts.reduce(
    (sum, g) => sum + g.reservations.reduce((rSum, r) => rSum + r.quantity, 0),
    0
  );

  const handleOpenReserve = (gift: GiftItem) => {
    setSelectedGift(gift);
    setIsReserveModalOpen(true);
  };

  const handleConfirmReservation = (reservationData: {
    guestName: string;
    guestPhone?: string;
    message?: string;
    quantity: number;
  }) => {
    if (!selectedGift) return false;
    const res = reserveGift(event.slug, selectedGift.id, reservationData);
    if (res.success) {
      setActiveGuestName(reservationData.guestName);
      loadData();
      return true;
    }
    return false;
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${template.bgGradient}`}>
      <Navbar />

      {/* Barra de Ações Superior do Anfitrião */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-2 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{event.title}</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-500">{template.badge}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-bold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar Link</span>
            </button>

            <Link
              href={`/evento/${event.slug}/painel`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Painel do Anfitrião</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 sm:py-10 w-full space-y-8">
        {/* ================= HERO DO EVENTO ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          {/* Capa */}
          {event.coverImage && (
            <div className="relative h-48 sm:h-72 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-rose-500/90 backdrop-blur-xs px-3 py-1 rounded-full">
                  {template.name.split('/')[0]}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black mt-2 drop-shadow-md">
                  {event.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 drop-shadow-xs">
                  Criado por {event.hostName}
                </p>
              </div>
            </div>
          )}

          {/* Dados e Mensagem dos Anfitriões */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium">
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

            {event.description && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{event.description}&rdquo;
              </div>
            )}

            {/* Progresso de Presentes */}
            <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>
                {reservedGiftsCount} de {totalGiftsCount} presentes já reservados
              </span>
              <span>
                {Math.round((reservedGiftsCount / Math.max(1, totalGiftsCount)) * 100)}% concluído
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${(reservedGiftsCount / Math.max(1, totalGiftsCount)) * 100}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* ================= IDENTIFICAÇÃO DO CONVIDADO (BARRA SUPERIOR) ================= */}
        <GuestBar
          guestMode={event.guestMode}
          predefinedGuests={event.predefinedGuests}
          activeGuestName={activeGuestName}
          onSelectGuest={(name) => setActiveGuestName(name)}
          accentColor={template.primaryColor}
        />

        {/* ================= FILTROS E BUSCA ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Categorias */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'Todos os Presentes' : cat}
              </button>
            ))}
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar presente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* ================= GRID DE PRESENTES ================= */}
        {filteredGifts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <GiftIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">Nenhum presente encontrado</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tente selecionar outra categoria ou limpar a busca.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onReserve={handleOpenReserve}
                accentColor={template.primaryColor}
              />
            ))}
          </div>
        )}
      </main>

      {/* ================= MODAIS ================= */}
      <ReserveModal
        gift={selectedGift}
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        onConfirm={handleConfirmReservation}
        guestMode={event.guestMode}
        predefinedGuests={event.predefinedGuests}
        initialGuestName={activeGuestName}
      />

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

export default function EventPage(props: EventPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-bold text-slate-700">Carregando lista de presentes...</p>
          </div>
        </div>
      }
    >
      <EventContent {...props} />
    </Suspense>
  );
}
