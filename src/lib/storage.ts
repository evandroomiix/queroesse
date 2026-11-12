'use client';

import { EventData, GiftItem, GiftReservation } from '@/types';
import { EVENT_TEMPLATES } from './templates';

const STORAGE_KEY = 'queroesse_events_v1';
const USER_KEY = 'queroesse_current_user_v1';

export const INITIAL_EVENTS: EventData[] = [
  {
    id: 'demo-casamento',
    slug: 'casamento-mari-e-leo',
    title: 'Mariana & Leonardo',
    hostName: 'Mariana Silva e Leonardo Santos',
    hostEmail: 'mari.e.leo@exemplo.com',
    category: 'casamento',
    date: '2026-12-18',
    time: '17:00',
    location: 'Espaço Villa das Flores - Curitiba, PR',
    description: 'Queridos amigos e familiares! Criamos essa lista com muito carinho para compartilhar nosso sonho com vocês. Fiquem à vontade para escolher o mimo que mais toca o coração.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    guestMode: 'predefined', // Demonstração do modo lista fechada!
    predefinedGuests: [
      { id: 'g1', name: 'Ana Carolina Mendonça', reservedCount: 1 },
      { id: 'g2', name: 'Carlos Eduardo & Família', reservedCount: 0 },
      { id: 'g3', name: 'Juliana e Roberto Prado', reservedCount: 1 },
      { id: 'g4', name: 'Tia Bete e Tio Jorge', reservedCount: 0 },
      { id: 'g5', name: 'Lucas Gabriel (Padrinho)', reservedCount: 0 },
      { id: 'g6', name: 'Fernanda Lima (Madrinha)', reservedCount: 0 },
      { id: 'g7', name: 'Vovô Arnaldo', reservedCount: 0 },
      { id: 'g8', name: 'Beatriz Vasconcelos', reservedCount: 0 },
      { id: 'g9', name: 'Rodrigo e Camila Pires', reservedCount: 0 },
      { id: 'g10', name: 'Felipe Fontana', reservedCount: 0 },
    ],
    gifts: [
      {
        id: 'gift-1',
        title: 'Jogo de Jantar Porcelana 30 Peças',
        category: 'Cozinha & Mesa',
        description: 'Conjunto completo de pratos rasos, fundos, sobremesa e xícaras.',
        totalQuantity: 1,
        price: 489.90,
        storeName: 'Amazon',
        storeUrl: 'https://amazon.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1614088445106-9fa52e431665?auto=format&fit=crop&w=600&q=80',
        reservations: [
          {
            id: 'res-1',
            guestName: 'Ana Carolina Mendonça',
            quantity: 1,
            message: 'Com todo amor do mundo para a cozinha do casal mais lindo!',
            reservedAt: '2026-11-10T14:30:00.000Z',
          }
        ]
      },
      {
        id: 'gift-2',
        title: 'Fritadeira Airfryer Digital 5L',
        category: 'Eletrodomésticos',
        description: 'Essencial para a nova rotina do casal.',
        totalQuantity: 1,
        price: 399.00,
        storeName: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80',
        reservations: []
      },
      {
        id: 'gift-3',
        title: 'Jogo de Toalhas de Banho Fio Penteado (Conjunto)',
        category: 'Cama, Mesa & Banho',
        description: 'Toalhas 100% algodão super macias.',
        totalQuantity: 3,
        price: 159.90,
        storeName: 'Magazine Luiza',
        storeUrl: 'https://magazineluiza.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
        reservations: [
          {
            id: 'res-2',
            guestName: 'Juliana e Roberto Prado',
            quantity: 1,
            message: 'Desejamos dias de muito aconchego no novo lar!',
            reservedAt: '2026-11-11T10:15:00.000Z',
          }
        ]
      },
      {
        id: 'gift-4',
        title: 'Cota: Passeio de Balão na Capadócia (Lua de Mel)',
        category: 'Lua de Mel',
        description: 'Uma das experiências mais sonhadas da nossa viagem!',
        totalQuantity: 4,
        price: 250.00,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        reservations: []
      },
      {
        id: 'gift-5',
        title: 'Adega Climatizada para 12 Garrafas',
        category: 'Sala & Bar',
        description: 'Para guardarmos as recordações líquidas dos amigos.',
        totalQuantity: 1,
        price: 799.00,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
        reservations: []
      }
    ],
    createdAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'demo-aniversario',
    slug: 'trintei-do-pedro',
    title: 'Pedro Faz 30 Anos!',
    hostName: 'Pedro Alcantara',
    hostEmail: 'pedro@exemplo.com',
    category: 'aniversario',
    date: '2026-11-28',
    time: '20:00',
    location: 'Rooftop Bar & Grill - São Paulo, SP',
    description: 'Cheguei nos 30! Preparem o fígado e a animação. Se quiserem me presentear com algo, essa listinha reúne itens que estou doido para ter ou rodadas de chopp!',
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    guestMode: 'open', // Demonstração do modo aberto!
    predefinedGuests: [],
    gifts: [
      {
        id: 'p-1',
        title: 'Fone de Ouvido Bluetooth Noise Cancelling',
        category: 'Eletrônicos',
        description: 'Para sobreviver no trabalho e na academia.',
        totalQuantity: 1,
        price: 320.00,
        storeName: 'Amazon',
        storeUrl: 'https://amazon.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        reservations: []
      },
      {
        id: 'p-2',
        title: 'Cota de Rodada de Chopp Artesanal',
        category: 'Festa & Bebidas',
        description: 'Garanta o brinde da mesa comigo!',
        totalQuantity: 6,
        price: 40.00,
        imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
        reservations: [
          {
            id: 'r-p1',
            guestName: 'Thiago V.',
            quantity: 2,
            message: 'Bora virar essa caneca mano, parabéns!',
            reservedAt: '2026-11-11T12:00:00.000Z',
          }
        ]
      },
      {
        id: 'p-3',
        title: 'Jogo de Tabuleiro Moderno (Catan ou Terraforming Mars)',
        category: 'Jogos & Lazer',
        description: 'Para as noites de jogatina lá em casa.',
        totalQuantity: 1,
        price: 250.00,
        imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80',
        reservations: []
      }
    ],
    createdAt: '2026-11-05T00:00:00.000Z',
  }
];

export function getEvents(): EventData[] {
  if (typeof window === 'undefined') return INITIAL_EVENTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Erro ao ler eventos:', err);
    return INITIAL_EVENTS;
  }
}

export function getEventBySlug(slug: string): EventData | null {
  const events = getEvents();
  return events.find((e) => e.slug === slug || e.id === slug) || null;
}

export function saveEvent(event: EventData): void {
  if (typeof window === 'undefined') return;
  const events = getEvents();
  const existingIdx = events.findIndex((e) => e.id === event.id || e.slug === event.slug);
  if (existingIdx >= 0) {
    events[existingIdx] = event;
  } else {
    events.unshift(event);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  // Dispara evento para sincronizar tabs ou componentes
  window.dispatchEvent(new Event('queroesse_storage_updated'));
}

export function reserveGift(
  slug: string,
  giftId: string,
  reservationData: { guestName: string; guestPhone?: string; message?: string; quantity: number }
): { success: boolean; message?: string } {
  const events = getEvents();
  const eventIdx = events.findIndex((e) => e.slug === slug || e.id === slug);
  if (eventIdx === -1) return { success: false, message: 'Evento não encontrado.' };

  const event = events[eventIdx];
  const giftIdx = event.gifts.findIndex((g) => g.id === giftId);
  if (giftIdx === -1) return { success: false, message: 'Presente não encontrado.' };

  const gift = event.gifts[giftIdx];
  const alreadyReserved = gift.reservations.reduce((sum, r) => sum + r.quantity, 0);
  const remaining = Math.max(0, gift.totalQuantity - alreadyReserved);

  if (remaining < reservationData.quantity) {
    return { success: false, message: `Desculpe! Apenas ${remaining} unidade(s) disponível(is).` };
  }

  const newReservation: GiftReservation = {
    id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    guestName: reservationData.guestName.trim(),
    guestPhone: reservationData.guestPhone?.trim(),
    message: reservationData.message?.trim(),
    quantity: reservationData.quantity,
    reservedAt: new Date().toISOString(),
  };

  gift.reservations.push(newReservation);

  // Se o evento estiver no modo lista fechada, atualiza contagem do convidado
  if (event.guestMode === 'predefined') {
    const guest = event.predefinedGuests.find(
      (g) => g.name.toLowerCase() === reservationData.guestName.trim().toLowerCase()
    );
    if (guest) {
      guest.reservedCount = (guest.reservedCount || 0) + reservationData.quantity;
    }
  }

  events[eventIdx] = event;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new Event('queroesse_storage_updated'));

  return { success: true };
}

export function cancelReservation(slug: string, giftId: string, reservationId: string): boolean {
  const events = getEvents();
  const event = events.find((e) => e.slug === slug || e.id === slug);
  if (!event) return false;
  const gift = event.gifts.find((g) => g.id === giftId);
  if (!gift) return false;

  const resIndex = gift.reservations.findIndex((r) => r.id === reservationId);
  if (resIndex === -1) return false;

  const res = gift.reservations[resIndex];
  if (event.guestMode === 'predefined') {
    const guest = event.predefinedGuests.find((g) => g.name.toLowerCase() === res.guestName.toLowerCase());
    if (guest) {
      guest.reservedCount = Math.max(0, (guest.reservedCount || 0) - res.quantity);
    }
  }

  gift.reservations.splice(resIndex, 1);
  saveEvent(event);
  return true;
}

export function addGiftToEvent(slug: string, gift: Omit<GiftItem, 'id' | 'reservations'>): GiftItem | null {
  const events = getEvents();
  const event = events.find((e) => e.slug === slug || e.id === slug);
  if (!event) return null;

  const newGift: GiftItem = {
    ...gift,
    id: `gift-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    reservations: [],
  };

  event.gifts.push(newGift);
  saveEvent(event);
  return newGift;
}

export function removeGiftFromEvent(slug: string, giftId: string): boolean {
  const events = getEvents();
  const event = events.find((e) => e.slug === slug || e.id === slug);
  if (!event) return false;

  event.gifts = event.gifts.filter((g) => g.id !== giftId);
  saveEvent(event);
  return true;
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function loginWithGoogle(mockName = 'Usuário QueroEsse', mockEmail = 'organizador@gmail.com') {
  if (typeof window === 'undefined') return null;
  const user = {
    id: 'user-google-123',
    name: mockName,
    email: mockEmail,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    provider: 'google',
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('queroesse_auth_updated'));
  return user;
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('queroesse_auth_updated'));
}
