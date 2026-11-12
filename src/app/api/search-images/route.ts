import { NextRequest, NextResponse } from 'next/server';

// Banco de imagens de alta qualidade por categoria/palavra-chave como fallback garantido
const CURATED_IMAGES: Record<string, string[]> = {
  airfryer: [
    'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  ],
  pratos: [
    'https://images.unsplash.com/photo-1614088445106-9fa52e431665?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
  ],
  cafeteira: [
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  ],
  toalhas: [
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
  ],
  vinho: [
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80',
  ],
  fraldas: [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
  ],
  fone: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
  ],
  panelas: [
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
  ],
  geral: [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() || '';

  if (!query) {
    return NextResponse.json({ images: CURATED_IMAGES.geral });
  }

  const results: string[] = [];

  // 1. Tenta buscar na Wikimedia Commons API (gratuita e aberta)
  try {
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      query
    )}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json`;

    const wikiRes = await fetch(wikiUrl, {
      headers: {
        'User-Agent': 'QueroEsseApp/1.0 (https://queroesse.vercel.app)',
      },
      next: { revalidate: 3600 },
    });

    if (wikiRes.ok) {
      const data = await wikiRes.json();
      const pages = data.query?.pages || {};
      for (const pageId in pages) {
        const info = pages[pageId]?.imageinfo?.[0];
        const url = info?.thumburl || info?.url;
        if (url && (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.includes('.jpg/') || url.includes('.png/'))) {
          results.push(url);
        }
      }
    }
  } catch (err) {
    console.error('Erro ao buscar Wikimedia:', err);
  }

  // 2. Adiciona imagens por correspondência de palavras-chave curadas
  const lower = query.toLowerCase();
  for (const [key, urls] of Object.entries(CURATED_IMAGES)) {
    if (lower.includes(key)) {
      results.push(...urls);
    }
  }

  // 3. Fallback inteligente usando Unsplash Source com termos
  if (results.length < 4) {
    const sanitized = encodeURIComponent(query.replace(/[^\w\s]/gi, ''));
    results.push(
      `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80`,
      `https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80`,
      `https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80`,
      `https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80`
    );
  }

  // Retira duplicados e limita a 12 imagens
  const uniqueImages = Array.from(new Set(results)).slice(0, 12);

  return NextResponse.json({ images: uniqueImages });
}
