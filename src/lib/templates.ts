import { EventCategory, EventTemplateConfig } from '@/types';

export const EVENT_TEMPLATES: Record<EventCategory, EventTemplateConfig> = {
  casamento: {
    id: 'casamento',
    name: 'Casamento dos Sonhos',
    tagline: 'Celebre o amor com elegância e requinte',
    badge: '💍 Romântico & Sofisticado',
    primaryColor: '#c59b6d', // Champagne / Ouro suave
    accentGradient: 'from-amber-100 via-rose-100 to-amber-50',
    bgGradient: 'bg-gradient-to-b from-[#fbf8f5] via-[#f7f2ed] to-[#ffffff]',
    cardStyle: 'border-amber-200/60 shadow-sm hover:shadow-md bg-white/95',
    heroEmoji: '💍',
    sampleGifts: [
      {
        title: 'Jogo de Jantar em Porcelana 30 Peças',
        category: 'Cozinha & Mesa',
        description: 'Conjunto completo de pratos rasos, fundos, sobremesa e xícaras.',
        totalQuantity: 1,
        price: 489.90,
        storeName: 'Amazon',
        storeUrl: 'https://amazon.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1614088445106-9fa52e431665?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Fritadeira Airfryer Digital 5L',
        category: 'Eletrodomésticos',
        description: 'Essencial para a nova rotina do casal.',
        totalQuantity: 1,
        price: 399.00,
        storeName: 'Mercado Livre',
        storeUrl: 'https://mercadolivre.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Jogo de Toalhas de Banho Fio Penteado (Conjunto)',
        category: 'Cama, Mesa & Banho',
        description: 'Toalhas 100% algodão egípcio super macias.',
        totalQuantity: 3, // Multi-quantidade
        price: 159.90,
        storeName: 'Magazine Luiza',
        storeUrl: 'https://magazineluiza.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Cota: Jantar Romântico na Lua de Mel',
        category: 'Lua de Mel',
        description: 'Um momento inesquecível a dois durante a nossa viagem.',
        totalQuantity: 4,
        price: 250.00,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Adegazinha de Vinhos Climatizada',
        category: 'Sala & Bar',
        description: 'Para brindar as melhores ocasiões.',
        totalQuantity: 1,
        price: 799.00,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  aniversario: {
    id: 'aniversario',
    name: 'Aniversário & Comemorações',
    tagline: 'Celebre mais um ano com os amigos e a família',
    badge: '🎂 Festivo & Vibrante',
    primaryColor: '#7c3aed', // Roxo moderno
    accentGradient: 'from-purple-100 via-pink-100 to-indigo-50',
    bgGradient: 'bg-gradient-to-b from-[#faf5ff] via-[#fdf4ff] to-[#ffffff]',
    cardStyle: 'border-purple-200/70 shadow-sm hover:shadow-lg bg-white/95',
    heroEmoji: '🎂',
    sampleGifts: [
      {
        title: 'Fone de Ouvido Bluetooth Noise Cancelling',
        category: 'Eletrônicos',
        description: 'Para ouvir minhas músicas e podcasts favoritos.',
        totalQuantity: 1,
        price: 280.00,
        storeName: 'Amazon',
        storeUrl: 'https://amazon.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Livros da minha Wishlist (Qualquer um da lista!)',
        category: 'Livros & Lazer',
        description: 'Adoro ficção científica e desenvolvimento pessoal.',
        totalQuantity: 3,
        price: 65.00,
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Cota de Rodízio / Chopp com a Turma',
        category: 'Experiências',
        description: 'Pague uma rodada pro aniversariante!',
        totalQuantity: 5,
        price: 50.00,
        imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Camiseta ou Peça de Roupa Estilosa (Tam M)',
        category: 'Moda',
        description: 'Cores preferidas: preto, azul marinho ou verde militar.',
        totalQuantity: 2,
        price: 120.00,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  'cha-de-bebe': {
    id: 'cha-de-bebe',
    name: 'Chá de Bebê / Chá Rifa',
    tagline: 'O amor cresce enquanto esperamos a chegada mais especial',
    badge: '🍼 Delicado & Doce',
    primaryColor: '#0ea5e9', // Azul / Menta suave
    accentGradient: 'from-sky-100 via-teal-50 to-pink-50',
    bgGradient: 'bg-gradient-to-b from-[#f0f9ff] via-[#fdf2f8] to-[#ffffff]',
    cardStyle: 'border-sky-200/70 shadow-sm hover:shadow-md bg-white/95',
    heroEmoji: '👶',
    sampleGifts: [
      {
        title: 'Pacote de Fraldas Tam M (Huggies ou Pampers)',
        category: 'Higiene & Cuidados',
        description: 'Nunca é demais! O tamanho que mais usa.',
        totalQuantity: 10, // Ótimo exemplo de múltiplas cotas
        price: 69.90,
        storeName: 'Amazon',
        storeUrl: 'https://amazon.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Banheira Ergonômica com Suporte',
        category: 'Banho & Higiene',
        description: 'Para banhos confortáveis e seguros.',
        totalQuantity: 1,
        price: 189.00,
        imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Babá Eletrônica com Câmera e Visão Noturna',
        category: 'Segurança',
        description: 'Para o soninho tranquilo do bebê e dos papais.',
        totalQuantity: 1,
        price: 340.00,
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Kit Body Manga Curta 100% Algodão (Tam P ou M)',
        category: 'Roupas',
        description: 'Bodies confortáveis com botões de pressão.',
        totalQuantity: 4,
        price: 79.90,
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  'casa-nova': {
    id: 'casa-nova',
    name: 'Casa Nova / Open House',
    tagline: 'Transformando um novo espaço em um verdadeiro lar',
    badge: '🏡 Aconchegante & Prático',
    primaryColor: '#059669', // Esmeralda / Terracota
    accentGradient: 'from-emerald-100 via-amber-50 to-orange-50',
    bgGradient: 'bg-gradient-to-b from-[#f0fdf4] via-[#fefce8] to-[#ffffff]',
    cardStyle: 'border-emerald-200/70 shadow-sm hover:shadow-md bg-white/95',
    heroEmoji: '🏡',
    sampleGifts: [
      {
        title: 'Jogo de Facas de Cozinha com Bloco de Madeira',
        category: 'Cozinha',
        description: 'Qualidade para preparar receitas incríveis na casa nova.',
        totalQuantity: 1,
        price: 219.00,
        imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Quadro Decorativo Minimalista para Sala',
        category: 'Decoração',
        description: 'Tamanho 60x90cm com moldura de madeira.',
        totalQuantity: 2,
        price: 135.00,
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Cafeteira Nespresso ou Prensa Francesa',
        category: 'Cozinha & Café',
        description: 'Para receber as visitas com café quentinho!',
        totalQuantity: 1,
        price: 360.00,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Manta Macia para Sofá + 2 Almofadas',
        category: 'Sala & Conforto',
        description: 'Cores neutras (cinza, cru ou mostarda).',
        totalQuantity: 2,
        price: 110.00,
        imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  geral: {
    id: 'geral',
    name: 'Evento & Celebração Especial',
    tagline: 'Uma lista prática e moderna para qualquer momento feliz',
    badge: '🎁 Versátil & Completo',
    primaryColor: '#2563eb', // Azul real
    accentGradient: 'from-blue-100 via-slate-100 to-indigo-50',
    bgGradient: 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]',
    cardStyle: 'border-slate-200/80 shadow-sm hover:shadow-md bg-white/95',
    heroEmoji: '✨',
    sampleGifts: [
      {
        title: 'Vale Presente / Cartão Presente',
        category: 'Geral',
        description: 'Fique à vontade com o valor que desejar!',
        totalQuantity: 5,
        price: 100.00,
        imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
};
