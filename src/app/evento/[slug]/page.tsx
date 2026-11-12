'use client';

import React, { useEffect, useState, use, Suspense } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuestBar from '@/components/GuestBar';
import GiftCard from '@/components/GiftCard';
import ThemeHero from '@/components/ThemeHero';
import ReserveModal from '@/components/ReserveModal';
import ShareModal from '@/components/ShareModal';
import { getEventBySlug, reserveGift, syncEventFromCloud } from '@/lib/storage';
import { supabase } from '@/lib/supabase';
import { getTemplateById } from '@/lib/templates';
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

  const loadData = async () => {
    // 1. Tenta carregar do cache local imediatamente para a tela abrir sem atraso
    const localData = getEventBySlug(resolvedParams.slug);
    if (localData) {
      setEvent(localData);
      setLoading(false);
    }

    // 2. Busca na nuvem (Supabase) para ter os dados mais recentes de outros convidados
    const cloudData = await syncEventFromCloud(resolvedParams.slug);
    if (cloudData) {
      setEvent(cloudData);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => {
      const data = getEventBySlug(resolvedParams.slug);
      if (data) setEvent(data);
    };

    window.addEventListener('queroesse_storage_updated', handleUpdate);

    // Conexão em tempo real via Supabase: atualiza automaticamente se outro convidado reservar
    const channel = supabase
      .channel(`realtime-event-${resolvedParams.slug}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events', filter: `slug=eq.${resolvedParams.slug}` },
        (payload: any) => {
          if (payload.new && payload.new.data) {
            setEvent(payload.new.data);
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('queroesse_storage_updated', handleUpdate);
      supabase.removeChannel(channel);
    };
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

  const template = getTemplateById(event.templateId, event.category);

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

  const handleConfirmReservation = async (reservationData: {
    guestName: string;
    guestPhone?: string;
    message?: string;
    quantity: number;
  }) => {
    if (!selectedGift) return false;
    const res = await reserveGift(event.slug, selectedGift.id, reservationData);
    if (res.success) {
      setActiveGuestName(reservationData.guestName);
      loadData();
      return true;
    }
    return false;
  };

  const isDark = template.isDarkTheme;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${template.bgClass}`}>
      <Navbar />

      {/* Barra de Ações Superior do Anfitrião */}
      <div className={`border-b px-4 py-2 text-xs backdrop-blur-md sticky top-16 z-30 ${
        isDark ? 'bg-slate-900/90 border-purple-500/20 text-purple-200' : 'bg-white/80 border-slate-200/80 text-slate-800'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">{event.title}</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline opacity-70">{template.badge}</span>
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
        {/* ================= HERO ESTILIZADO DE ACORDO COM O TEMPLATE ================= */}
        <ThemeHero event={event} template={template} />

        {/* Barra de Progresso de Presentes do Evento */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold ${
          isDark ? 'bg-slate-900/60 border-purple-500/20 text-purple-200' : 'bg-white/90 border-slate-200/80 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {reservedGiftsCount} de {totalGiftsCount} presentes já foram reservados pelos convidados
            </span>
          </div>
          <div className="w-full sm:w-48 bg-slate-200/50 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${(reservedGiftsCount / Math.max(1, totalGiftsCount)) * 100}%` }}
            ></div>
          </div>
        </div>

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
                    ? 'bg-rose-500 text-white shadow-xs'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
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
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:border-rose-500 border ${
                isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'
              }`}
            />
          </div>
        </div>

        {/* ================= GRID DE PRESENTES ================= */}
        {filteredGifts.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <GiftIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">Nenhum presente encontrado</h3>
            <p className="text-xs text-slate-400 mt-1">
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
                template={template}
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
