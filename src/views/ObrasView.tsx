import React, { useState } from 'react';
import { Artwork, ArtworkCategory, TabType } from '../types';

interface ObrasViewProps {
  artworks: Artwork[];
  onOpenLightbox: (index: number) => void;
  onNavigate: (tab: TabType) => void;
}

export const ObrasView: React.FC<ObrasViewProps> = ({
  artworks,
  onOpenLightbox,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ArtworkCategory>('all');

  const filterTabs: { id: 'all' | ArtworkCategory; label: string }[] = [
    { id: 'all', label: 'Todas' },
    { id: 'oleo', label: 'Óleo' },
    { id: 'mixta', label: 'Técnica Mixta' },
    { id: 'encargos', label: 'Encargos' },
  ];

  const filteredArtworks = selectedFilter === 'all'
    ? artworks
    : artworks.filter((item) => item.category === selectedFilter);

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Archival Page Intro & Navigation Filters */}
      <section className="w-full px-6 md:px-16 pt-8 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Typographic Eyebrow & Archival Registry Marker */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4c0c20]" />
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#534345] font-sans-clean font-medium">
                Catálogo Razonado · 2023 — 2024
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1d1b19] tracking-tight font-normal">
              Obras Seleccionadas
            </h1>
          </div>

          {/* Exhibition Room Filters */}
          <nav
            aria-label="Filtro de obras"
            className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-2 no-scrollbar"
          >
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  type="button"
                  className={`group relative py-2 text-[11px] uppercase tracking-[0.2em] font-sans-clean transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#1d1b19] font-medium'
                      : 'text-[#534345] hover:text-[#1d1b19]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300 ${
                      isActive ? 'bg-[#4c0c20]' : 'bg-transparent group-hover:bg-[#d8c1c4]'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Curated Salon Masonry Exhibition Wall */}
      <section className="w-full px-6 md:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Asymmetric 12-Column Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-10 items-start">
            {filteredArtworks.map((artwork) => {
              // Get original index in complete artworks list for lightbox tracking
              const originalIndex = artworks.findIndex((a) => a.id === artwork.id);
              const isAvailable = artwork.status.toLowerCase().includes('disponible');

              return (
                <article
                  key={artwork.id}
                  onClick={() => onOpenLightbox(originalIndex)}
                  style={{
                    gridColumn: undefined, // Controlled by className
                  }}
                  className={`group flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
                    artwork.colSpanDesktop === 8
                      ? 'md:col-span-8'
                      : artwork.colSpanDesktop === 7
                      ? 'md:col-span-7'
                      : artwork.colSpanDesktop === 5
                      ? 'md:col-span-5'
                      : 'md:col-span-4'
                  } ${artwork.offsetDesktop || ''}`}
                >
                  {/* Framed Artwork Container */}
                  <div className="relative w-full overflow-hidden bg-[#ede7e3] shadow-[0_16px_40px_-16px_rgba(61,57,53,0.06)] group-hover:shadow-[0_24px_50px_-14px_rgba(76,12,32,0.12)] transition-all duration-700 ease-out">
                    <div className="p-3 sm:p-5 bg-[#f9f2ef]/70">
                      <div className={`relative overflow-hidden ${artwork.aspectRatio} w-full`}>
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                          onError={(e) => {
                            if (artwork.fallbackImageUrl) {
                              e.currentTarget.src = artwork.fallbackImageUrl;
                            }
                          }}
                        />
                        {/* Hover Overlay with Lightbox indicator */}
                        <div className="absolute inset-0 bg-[#fef8f4]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#fef8f4]/85 backdrop-blur-sm flex items-center justify-center text-[#1d1b19] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="material-symbols-outlined text-[18px]">open_in_full</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Archival Metadata Stack */}
                  <div className="mt-3 flex flex-col gap-1 px-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-editorial text-lg text-[#1d1b19] italic font-normal">
                        {artwork.title}
                      </h2>
                      <span
                        className={`text-[9px] uppercase tracking-widest font-sans-clean font-medium ${
                          isAvailable
                            ? 'text-[#682335]'
                            : 'text-[#69635f]'
                        }`}
                      >
                        {artwork.status}
                      </span>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#625d59] font-sans-clean">
                      {artwork.medium} · {artwork.dimensions} · {artwork.year}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Footnote & Atelier Colophon Section */}
      <section className="w-full px-6 md:px-16 py-16 bg-[#f9f2ef]/50 border-t border-[#e7e1de]/50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-md">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#4c0c20] font-sans-clean font-medium">
              Atelier Adrogué
            </span>
            <p className="text-xs sm:text-[13px] text-[#625d59] leading-relaxed font-sans-clean font-light">
              Cada obra se entrega con su certificado de autenticidad emitido y firmado por la artista, con especificación de materiales nobles, pigmentos y fecha de factura.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start md:items-end">
            <span className="text-[11px] uppercase tracking-widest text-[#1d1b19] font-sans-clean">
              Consultas y Adquisiciones
            </span>
            <button
              onClick={() => onNavigate('contacto')}
              type="button"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#4c0c20] hover:text-[#1d1b19] transition-colors duration-300 cursor-pointer"
            >
              <span>Contactar al Atelier</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
