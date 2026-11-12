'use client';

import React, { useState, useRef } from 'react';
import { Upload, Search, Link as LinkIcon, X, Check, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  productName?: string;
}

export default function ImagePicker({ value, onChange, productName = '' }: ImagePickerProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'search' | 'url'>('upload');
  const [searchTerm, setSearchTerm] = useState(productName);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redimensionamento de imagem no cliente (Canvas) para deixar super leve
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onChange(dataUrl);
        }
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleSearchImages = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchTerm.trim() || productName.trim();
    if (!query) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/search-images?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.images || []);
      }
    } catch (err) {
      console.error('Erro ao buscar imagens:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const quickSearchTags = ['Airfryer', 'Jogo de Pratos', 'Cafeteira', 'Fraldas', 'Toalhas', 'Vinho', 'Fone Bluetooth'];

  return (
    <div className="space-y-3">
      {/* Se já tem foto selecionada */}
      {value ? (
        <div className="relative p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Foto do produto"
              className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-2xs"
            />
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1 w-fit mb-1">
                <Check className="w-3 h-3" /> Foto Selecionada
              </span>
              <p className="text-xs text-slate-500">Esta imagem aparecerá no card do produto</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            title="Remover foto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          {/* Abas */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'upload' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Enviar Foto</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('search');
                if (!searchTerm && productName) {
                  setSearchTerm(productName);
                }
                if (searchResults.length === 0) {
                  handleSearchImages();
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'search' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buscar na Internet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'url' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Colar Link</span>
            </button>
          </div>

          {/* Conteúdo Aba 1: Upload */}
          {activeTab === 'upload' && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-rose-400 bg-white hover:bg-rose-50/30 rounded-xl p-5 text-center cursor-pointer transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {isUploading ? (
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="w-6 h-6 text-rose-500 animate-spin mb-1" />
                  <span className="text-xs font-bold text-slate-700">Processando foto...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Clique para escolher a foto do seu celular ou computador
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG ou WebP (otimizada automaticamente)</p>
                </div>
              )}
            </div>
          )}

          {/* Conteúdo Aba 2: Buscar na Internet */}
          {activeTab === 'search' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nome do produto (ex: Fritadeira Airfryer)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchImages()}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                />
                <button
                  type="button"
                  onClick={() => handleSearchImages()}
                  disabled={isSearching}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  <span>Buscar</span>
                </button>
              </div>

              {/* Tags rápidas */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">Sugestões:</span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchTerm(tag);
                      setIsSearching(true);
                      fetch(`/api/search-images?q=${encodeURIComponent(tag)}`)
                        .then((r) => r.json())
                        .then((d) => setSearchResults(d.images || []))
                        .finally(() => setIsSearching(false));
                    }}
                    className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-rose-600 hover:border-rose-200 shrink-0 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Grid de resultados */}
              {isSearching ? (
                <div className="p-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                  <span>Buscando imagens na internet...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {searchResults.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onChange(url)}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-rose-500 hover:ring-2 hover:ring-rose-500/30 transition-all focus:outline-none"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt="Resultado de busca"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold">
                        Usar Foto
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-xs text-slate-400 py-2">
                  Digite o nome do produto e clique em Buscar para ver fotos da internet.
                </p>
              )}
            </div>
          )}

          {/* Conteúdo Aba 3: Colar Link */}
          {activeTab === 'url' && (
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Cole o link da foto (https://...)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (urlInput.trim()) {
                    onChange(urlInput.trim());
                    setUrlInput('');
                  }
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0"
              >
                Aplicar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
