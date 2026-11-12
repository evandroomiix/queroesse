export type EventCategory = 'casamento' | 'aniversario' | 'cha-de-bebe' | 'casa-nova' | 'geral';

export type GuestMode = 'open' | 'predefined'; // 'open': convidado digita o nome; 'predefined': escolhe da lista de convidados pré-cadastrados

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  reservedCount: number;
}

export interface GiftReservation {
  id: string;
  guestName: string;
  guestPhone?: string;
  message?: string;
  quantity: number;
  reservedAt: string;
}

export interface GiftItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl?: string;
  price?: number; // Valor estimado opcional
  storeUrl?: string; // Link de onde encontrar opcional
  storeName?: string; // Ex: Amazon, Magazine Luiza
  totalQuantity: number; // Suporte a múltiplas quantidades
  reservations: GiftReservation[];
  isLocked?: boolean;
}

export interface EventTemplateConfig {
  id: EventCategory;
  name: string;
  tagline: string;
  badge: string;
  primaryColor: string; // Ex: rose-gold, emerald, violet, amber
  accentGradient: string;
  bgGradient: string;
  cardStyle: string;
  heroEmoji: string;
  sampleGifts: Array<Omit<GiftItem, 'id' | 'reservations'>>;
}

export interface EventData {
  id: string;
  slug: string;
  title: string;
  hostName: string;
  hostEmail?: string;
  category: EventCategory;
  date: string;
  time?: string;
  location?: string;
  description: string;
  coverImage?: string;
  guestMode: GuestMode;
  predefinedGuests: Guest[];
  gifts: GiftItem[];
  pixKey?: string;
  pixKeyType?: 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';
  createdAt: string;
}
