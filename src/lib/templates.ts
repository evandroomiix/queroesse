import { EventCategory, EventTemplateConfig, TemplateId } from '@/types';

export const TEMPLATES_LIST: EventTemplateConfig[] = [
  // ================= CASAMENTO =================
  {
    id: 'casamento-classico',
    category: 'casamento',
    name: 'Clássico Imperial & Brasão',
    tagline: 'O requinte atemporal da alta tradição com monograma e detalhes dourados',
    badge: '👑 Clássico & Nobre',
    fontTitle: 'font-serif-wedding',
    fontAccent: 'font-script',
    isDarkTheme: false,
    bgClass: 'bg-[#faf7f2] text-stone-900',
    heroPattern: 'monogram',
    primaryColor: '#b8860b',
    accentGradient: 'from-amber-100/80 via-yellow-50 to-stone-100',
    cardStyle: 'bg-white/95 border-2 border-amber-200/70 shadow-sm hover:border-amber-400 hover:shadow-lg rounded-2xl',
    buttonStyle: 'bg-gradient-to-r from-stone-900 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-amber-100 border border-amber-300/40',
    heroEmoji: '💍',
    sampleGifts: [
      {
        title: 'Jogo de Jantar Porcelana 30 Peças',
        category: 'Cozinha & Mesa',
        description: 'Conjunto completo de pratos rasos, fundos, sobremesa e xícaras.',
        totalQuantity: 1,
        price: 489.90,
        imageUrl: 'https://images.unsplash.com/photo-1614088445106-9fa52e431665?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Adega Climatizada para 12 Garrafas',
        category: 'Sala & Bar',
        description: 'Para brindar as melhores ocasiões a dois.',
        totalQuantity: 1,
        price: 799.00,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Cota: Jantar Romântico na Lua de Mel',
        category: 'Lua de Mel',
        description: 'Um momento inesquecível a dois durante a nossa viagem.',
        totalQuantity: 4,
        price: 250.00,
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'casamento-boho',
    category: 'casamento',
    name: 'Boho Chic & Terracota',
    tagline: 'Tons terrosos, arcos orgânicos e estética floral estilo Pinterest',
    badge: '🌿 Rústico & Botânico',
    fontTitle: 'font-cinzel',
    fontAccent: 'font-serif-wedding',
    isDarkTheme: false,
    bgClass: 'bg-[#faf4ee] text-amber-950',
    heroPattern: 'boho-arch',
    primaryColor: '#c25e40',
    accentGradient: 'from-orange-100 via-amber-50 to-stone-100',
    cardStyle: 'bg-white/95 border border-orange-200/80 shadow-sm hover:shadow-md rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-[#b85435] to-[#8c381e] hover:opacity-95 text-white shadow-md shadow-orange-200',
    heroEmoji: '🌾',
    sampleGifts: [
      {
        title: 'Jogo de Toalhas de Banho Fio Penteado',
        category: 'Cama, Mesa & Banho',
        description: 'Toalhas macias em algodão cru e terracota.',
        totalQuantity: 3,
        price: 159.90,
        imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Conjunto de Vasos Cerâmica Artesanal',
        category: 'Decoração',
        description: 'Peças exclusivas feitas à mão para a nova casa.',
        totalQuantity: 2,
        price: 130.00,
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'casamento-minimal',
    category: 'casamento',
    name: 'Minimalista Editorial All-White',
    tagline: 'Linhas finas pretas, espaços generosos e sofisticação de revista de moda',
    badge: '🖤 Clean & Moderno',
    fontTitle: 'font-cinzel',
    isDarkTheme: false,
    bgClass: 'bg-[#ffffff] text-black',
    heroPattern: 'minimal-grid',
    primaryColor: '#171717',
    accentGradient: 'from-slate-100 via-white to-slate-50',
    cardStyle: 'bg-white border-2 border-black/80 hover:border-black shadow-none hover:shadow-xl rounded-none',
    buttonStyle: 'bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest rounded-none text-xs',
    heroEmoji: '🤍',
    sampleGifts: [
      {
        title: 'Cafeteira Italiana Inox Alessi',
        category: 'Cozinha',
        description: 'Design premiado para cafés inesquecíveis.',
        totalQuantity: 1,
        price: 360.00,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Jogo de Taças de Cristal Lapidado',
        category: 'Mesa & Sala',
        description: 'Para brindar com máxima elegância.',
        totalQuantity: 2,
        price: 220.00,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  // ================= ANIVERSÁRIO =================
  {
    id: 'aniversario-neon',
    category: 'aniversario',
    name: 'Neon Night & Balada Cyber',
    tagline: 'Dark mode com luzes neon vibrantes, estilo festival e alta energia',
    badge: '⚡ Dark & Glow',
    fontTitle: 'font-neon',
    isDarkTheme: true,
    bgClass: 'bg-[#090a10] text-slate-100',
    heroPattern: 'neon-glow',
    primaryColor: '#a855f7',
    accentGradient: 'from-purple-950/80 via-slate-900 to-indigo-950',
    cardStyle: 'bg-slate-900/80 backdrop-blur-md border border-purple-500/30 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 text-slate-100 rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-purple-500/30 font-bold',
    heroEmoji: '🪩',
    sampleGifts: [
      {
        title: 'Fone de Ouvido Noise Cancelling Bluetooth',
        category: 'Eletrônicos',
        description: 'Som absurdo para treinos, viagens e trabalho.',
        totalQuantity: 1,
        price: 340.00,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Cota de Rodada de Chopp / Tequila com a Galera',
        category: 'Bebidas & Festa',
        description: 'Pague uma rodada pro aniversariante comemorar!',
        totalQuantity: 6,
        price: 45.00,
        imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'aniversario-boteco',
    category: 'aniversario',
    name: 'Boteco, Chopp & Churrasco',
    tagline: 'O clima da resenha com amigos, cerveja artesanal e muita risada',
    badge: '🍻 Descontraído & Raiz',
    fontTitle: 'font-modern',
    isDarkTheme: false,
    bgClass: 'bg-[#fefce8] text-amber-950',
    heroPattern: 'boteco-chalk',
    primaryColor: '#d97706',
    accentGradient: 'from-amber-200 via-yellow-100 to-stone-100',
    cardStyle: 'bg-white border-2 border-amber-300 shadow-sm hover:shadow-md rounded-2xl',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white font-extrabold uppercase tracking-wider',
    heroEmoji: '🍺',
    sampleGifts: [
      {
        title: 'Barril de Chopp Artesanal 5L',
        category: 'Bebidas',
        description: 'Para o brinde da galera na festa!',
        totalQuantity: 3,
        price: 95.00,
        imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Kit para Churrasco com Faca e Chaira',
        category: 'Churrasco',
        description: 'Para os melhores churrascos de domingo.',
        totalQuantity: 1,
        price: 180.00,
        imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'aniversario-sunset',
    category: 'aniversario',
    name: 'Sunset Tropical & Pool Party',
    tagline: 'Cores de pôr do sol, coral, palmeiras e clima festivo de verão',
    badge: '🍹 Tropical & Solar',
    fontTitle: 'font-neon',
    isDarkTheme: false,
    bgClass: 'bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 text-slate-900',
    heroPattern: 'sunset-tropical',
    primaryColor: '#f97316',
    accentGradient: 'from-orange-200 via-rose-100 to-amber-100',
    cardStyle: 'bg-white/90 border border-orange-200 hover:border-orange-400 shadow-sm hover:shadow-xl rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-md shadow-orange-200',
    heroEmoji: '🌅',
    sampleGifts: [
      {
        title: 'Caixa de Som Portátil Bluetooth à Prova dÁgua',
        category: 'Música',
        description: 'Para animar a piscina e os rolês de fim de semana.',
        totalQuantity: 1,
        price: 290.00,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Kit Drinks & Coqueteleira Inox',
        category: 'Bebidas',
        description: 'Para preparar os melhores coquetéis para os convidados.',
        totalQuantity: 1,
        price: 140.00,
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  // ================= CHÁ DE BEBÊ =================
  {
    id: 'cha-bebe-nuvem',
    category: 'cha-de-bebe',
    name: 'Doce Sonho & Nuvenzinhas',
    tagline: 'Azul bebê, amarelo baunilha e nuvens fofas para a chegada mais esperada',
    badge: '☁️ Suave & Infantil',
    fontTitle: 'font-baby',
    isDarkTheme: false,
    bgClass: 'bg-gradient-to-b from-[#f0f9ff] via-[#fdf4ff] to-[#ffffff] text-slate-800',
    heroPattern: 'cloud-stars',
    primaryColor: '#0284c7',
    accentGradient: 'from-sky-100 via-amber-50 to-pink-50',
    cardStyle: 'bg-white/95 border-2 border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-lg rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-sky-400 to-teal-400 hover:opacity-95 text-white font-bold rounded-2xl shadow-md shadow-sky-200',
    heroEmoji: '🍼',
    sampleGifts: [
      {
        title: 'Pacote de Fraldas Tam M (Huggies ou Pampers)',
        category: 'Higiene & Cuidados',
        description: 'O tamanho que mais usa! Nunca é demais.',
        totalQuantity: 10,
        price: 69.90,
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Banheira Ergonômica com Suporte',
        category: 'Banho',
        description: 'Para banhos confortáveis e seguros.',
        totalQuantity: 1,
        price: 189.00,
        imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'cha-bebe-floral',
    category: 'cha-de-bebe',
    name: 'Jardim Encantado / Menina',
    tagline: 'Flores aquareladas, tons rosé pastel e delicadeza em cada detalhe',
    badge: '🌸 Floral & Meigo',
    fontTitle: 'font-baby',
    fontAccent: 'font-script',
    isDarkTheme: false,
    bgClass: 'bg-[#fdf2f8] text-slate-800',
    heroPattern: 'cloud-stars',
    primaryColor: '#ec4899',
    accentGradient: 'from-pink-100 via-rose-50 to-purple-50',
    cardStyle: 'bg-white/95 border border-pink-200 hover:border-pink-300 shadow-sm hover:shadow-md rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-pink-500 to-rose-400 hover:opacity-95 text-white font-bold rounded-2xl shadow-md shadow-pink-200',
    heroEmoji: '🌸',
    sampleGifts: [
      {
        title: 'Kit Body Manga Curta 100% Algodão',
        category: 'Roupas',
        description: 'Bodies confortáveis e macios.',
        totalQuantity: 4,
        price: 79.90,
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Babá Eletrônica com Câmera e Visão Noturna',
        category: 'Segurança',
        description: 'Tranquilidade para os papais cuidarem da bebê.',
        totalQuantity: 1,
        price: 340.00,
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'cha-bebe-safari',
    category: 'cha-de-bebe',
    name: 'Safári Baby & Tons Neutros',
    tagline: 'Verde sálvia, bege acolhedor, folhagens e bichinhos da selva',
    badge: '🦁 Safári & Aventura',
    fontTitle: 'font-baby',
    isDarkTheme: false,
    bgClass: 'bg-[#f5f7f2] text-stone-800',
    heroPattern: 'safari-baby',
    primaryColor: '#65a30d',
    accentGradient: 'from-lime-100 via-amber-50 to-stone-100',
    cardStyle: 'bg-white/95 border border-lime-200 hover:border-lime-400 shadow-sm hover:shadow-md rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-lime-600 to-emerald-600 hover:opacity-95 text-white font-bold rounded-2xl shadow-md shadow-lime-200',
    heroEmoji: '🦒',
    sampleGifts: [
      {
        title: 'Mochila Maternidade Multifuncional Térmica',
        category: 'Passeio',
        description: 'Espaçosa e prática para os passeios do bebê.',
        totalQuantity: 1,
        price: 199.00,
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Jogo de Berço em Algodão Estampa Selva',
        category: 'Quarto',
        description: 'Lençóis macios e antialérgicos.',
        totalQuantity: 2,
        price: 110.00,
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  // ================= CASA NOVA =================
  {
    id: 'casa-nova-moderna',
    category: 'casa-nova',
    name: 'Minimalista Escandinavo',
    tagline: 'Linhas puras, verde sálvia, linho cru e sofisticação de revista de design',
    badge: '🏡 Clean & Orgânico',
    fontTitle: 'font-modern',
    isDarkTheme: false,
    bgClass: 'bg-[#f4f6f4] text-slate-900',
    heroPattern: 'minimal-grid',
    primaryColor: '#059669',
    accentGradient: 'from-emerald-50 via-stone-50 to-teal-50',
    cardStyle: 'bg-white border border-stone-200 hover:border-emerald-500/40 shadow-xs hover:shadow-md rounded-2xl',
    buttonStyle: 'bg-slate-900 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors',
    heroEmoji: '🪴',
    sampleGifts: [
      {
        title: 'Jogo de Facas de Cozinha com Bloco de Madeira',
        category: 'Cozinha',
        description: 'Qualidade para preparar receitas incríveis.',
        totalQuantity: 1,
        price: 219.00,
        imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Cafeteira Prensa Francesa de Vidro Duplo',
        category: 'Café & Cozinha',
        description: 'Para receber os amigos com um café especial.',
        totalQuantity: 1,
        price: 135.00,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'casa-nova-industrial',
    category: 'casa-nova',
    name: 'Industrial Loft & Tijolinhos',
    tagline: 'Tijolo aparente, madeira nobre, metal preto e estética loft urbano',
    badge: '🧱 Urbano & Loft',
    fontTitle: 'font-modern',
    isDarkTheme: false,
    bgClass: 'bg-[#f8f5f0] text-stone-900',
    heroPattern: 'industrial-loft',
    primaryColor: '#9a3412',
    accentGradient: 'from-stone-200 via-amber-100 to-stone-100',
    cardStyle: 'bg-white border-2 border-stone-300 hover:border-stone-800 shadow-sm rounded-xl',
    buttonStyle: 'bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold uppercase rounded-lg',
    heroEmoji: '🏙️',
    sampleGifts: [
      {
        title: 'Luminária de Mesa Estilo Industrial Articulada',
        category: 'Iluminação',
        description: 'Metal preto fosco para mesa ou cabeceira.',
        totalQuantity: 2,
        price: 145.00,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Quadro Arte Contemporânea Moldura Preta 70x100',
        category: 'Decoração',
        description: 'Destaque visual para a parede da sala.',
        totalQuantity: 1,
        price: 180.00,
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },

  // ================= 15 ANOS & GERAL =================
  {
    id: 'festa-glam',
    category: 'geral',
    name: 'Glamour Rose Gold & 15 Anos',
    tagline: 'O brilho das grandes comemorações com acabamento metalizado e glamour',
    badge: '✨ Brilho & Luxo',
    fontTitle: 'font-cinzel',
    fontAccent: 'font-serif-wedding',
    isDarkTheme: false,
    bgClass: 'bg-gradient-to-b from-[#fdf2f4] via-[#faf5f7] to-[#ffffff] text-slate-900',
    heroPattern: 'glam-sparkles',
    primaryColor: '#db2777',
    accentGradient: 'from-rose-100 via-pink-50 to-amber-50',
    cardStyle: 'bg-white/95 border border-pink-300/70 hover:border-pink-500 shadow-sm hover:shadow-xl rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-md shadow-rose-200',
    heroEmoji: '🥂',
    sampleGifts: [
      {
        title: 'Vale Experiência / Cartão Presente',
        category: 'Especial',
        description: 'Para escolher o mimo que mais gostar!',
        totalQuantity: 5,
        price: 150.00,
        imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
  {
    id: 'festa-midnight',
    category: 'geral',
    name: 'Noite Estrelada & Constelações',
    tagline: 'Azul marinho profundo, constelações douradas e misticismo elegante',
    badge: '🌌 Galáctico & Mágico',
    fontTitle: 'font-cinzel',
    isDarkTheme: true,
    bgClass: 'bg-[#060814] text-slate-100',
    heroPattern: 'midnight-star',
    primaryColor: '#38bdf8',
    accentGradient: 'from-blue-950 via-slate-950 to-indigo-950',
    cardStyle: 'bg-slate-900/90 border border-sky-500/30 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/20 text-white rounded-3xl',
    buttonStyle: 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95 text-white font-bold rounded-2xl shadow-md shadow-sky-500/30',
    heroEmoji: '✨',
    sampleGifts: [
      {
        title: 'Projetor Galáctico de Estrelas Astronauta',
        category: 'Quarto',
        description: 'Transforma o teto em um céu estrelado mágico.',
        totalQuantity: 1,
        price: 160.00,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      }
    ],
  },
];

export function getTemplatesByCategory(category: EventCategory): EventTemplateConfig[] {
  return TEMPLATES_LIST.filter((t) => t.category === category);
}

export function getTemplateById(templateId?: string, categoryFallback?: EventCategory): EventTemplateConfig {
  if (templateId) {
    const found = TEMPLATES_LIST.find((t) => t.id === templateId);
    if (found) return found;
  }
  if (categoryFallback) {
    const foundCat = TEMPLATES_LIST.find((t) => t.category === categoryFallback);
    if (foundCat) return foundCat;
  }
  return TEMPLATES_LIST[0];
}

export const EVENT_TEMPLATES: Record<EventCategory, EventTemplateConfig> = {
  casamento: TEMPLATES_LIST[0],
  aniversario: TEMPLATES_LIST[3],
  'cha-de-bebe': TEMPLATES_LIST[6],
  'casa-nova': TEMPLATES_LIST[9],
  geral: TEMPLATES_LIST[11],
};
