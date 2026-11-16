import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork } from '../types';

interface LightboxProps {
  artworks: Artwork[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onInquire: (artwork: Artwork) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  artworks,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
  onInquire,
}) => {
  const currentArtwork = artworks[currentIndex];
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom when artwork changes or lightbox closes
  useEffect(() => {
    setIsZoomed(false);
    setTransformOrigin('center center');
  }, [currentIndex, isOpen]);

  const exitZoom = useCallback(() => {
    setIsZoomed(false);
    setTransformOrigin('center center');
  }, []);

  const toggleZoom = useCallback(() => {
    if (isZoomed) {
      exitZoom();
    } else {
      setIsZoomed(true);
    }
  }, [isZoomed, exitZoom]);

  // Handle mouse move for panning in zoomed state
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed || !imageContainerRef.current) return;

      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setTransformOrigin(`${x}% ${y}%`);
    },
    [isZoomed]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          // Exit zoom first; don't close the lightbox
          exitZoom();
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight' && !isZoomed) {
        onSelectIndex((currentIndex + 1) % artworks.length);
      }
      if (e.key === 'ArrowLeft' && !isZoomed) {
        onSelectIndex((currentIndex - 1 + artworks.length) % artworks.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, artworks.length, onClose, onSelectIndex, isZoomed, exitZoom]);

  if (!isOpen || !currentArtwork) return null;

  const paddedCurrent = String(currentIndex + 1).padStart(2, '0');
  const paddedTotal = String(artworks.length).padStart(2, '0');
  const isAvailable = currentArtwork.status.toLowerCase().includes('disponible');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de obra"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (isZoomed) {
            exitZoom();
          } else {
            onClose();
          }
        }
      }}
      className="fixed inset-0 z-50 bg-[#fef8f4]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 md:p-10 overflow-y-auto animate-fadeIn"
    >
      {/* Top Gallery Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pb-3 sm:pb-4 border-b border-[#e7e1de]/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4c0c20]" />
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#534345] font-sans-clean font-medium">
            Florencia Passini · Catálogo Razonado
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#625d59] font-sans-clean">
            {paddedCurrent} / {paddedTotal}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista ampliada"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#e7e1de]/80 transition-colors duration-200 cursor-pointer"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#1d1b19] hidden sm:inline font-sans-clean">
              Cerrar
            </span>
            <span className="material-symbols-outlined text-[19px] text-[#1d1b19] group-hover:rotate-90 transition-transform duration-300">
              close
            </span>
          </button>
        </div>
      </div>

      {/* Center Exhibition Experience */}
      <div className="w-full max-w-7xl mx-auto my-auto py-4 sm:py-6 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex((currentIndex - 1 + artworks.length) % artworks.length);
          }}
          aria-label="Obra anterior"
          className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#e7e1de] hover:border-[#4c0c20] bg-[#fef8f4]/70 hover:bg-[#fef8f4] flex items-center justify-center text-[#1d1b19] hover:text-[#4c0c20] transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer ${
            isZoomed ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px]">arrow_back</span>
        </button>

        {/* Central Visual & Curatorial Placard */}
        <div className={`flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto w-full ${
          isZoomed ? 'lg:justify-center' : ''
        }`}>
          {/* Framed Canvas Artwork */}
          <div
            ref={imageContainerRef}
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            onMouseMove={handleMouseMove}
            className={`relative flex items-center justify-center p-3 sm:p-5 bg-white shadow-[0_24px_50px_-20px_rgba(61,57,53,0.14)] ring-1 ring-[#e7e1de]/60 overflow-hidden ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            style={{ touchAction: 'pinch-zoom' }}
          >
            <motion.img
              src={currentArtwork.imageUrl}
              alt={currentArtwork.alt}
              className="max-w-full w-auto object-contain select-none"
              animate={{
                scale: isZoomed ? 2.5 : 1,
                maxHeight: isZoomed ? '80vh' : undefined,
              }}
              style={{
                transformOrigin,
                maxHeight: isZoomed ? '80vh' : undefined,
              }}
              transition={{
                scale: { type: 'spring', stiffness: 260, damping: 30 },
              }}
              initial={false}
              onError={(e) => {
                if (currentArtwork.fallbackImageUrl) {
                  (e.currentTarget as HTMLImageElement).src = currentArtwork.fallbackImageUrl;
                }
              }}
            />

            {/* Non-zoomed max-height constraint applied via className */}
            <style>{`
              [data-zoom-state="normal"] img { max-height: 56vh; }
              @media (min-width: 640px) { [data-zoom-state="normal"] img { max-height: 62vh; } }
            `}</style>

            {/* Zoom indicator */}
            <AnimatePresence mode="wait">
              <motion.button
                key={isZoomed ? 'zoom-out' : 'zoom-in'}
                type="button"
                aria-label={isZoomed ? 'Reducir imagen' : 'Ampliar imagen'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 w-8 h-8 rounded-full bg-[#fef8f4]/90 backdrop-blur-sm border border-[#e7e1de] shadow-sm flex items-center justify-center text-[#534345] hover:text-[#4c0c20] hover:border-[#4c0c20]/40 transition-colors duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isZoomed ? 'zoom_out' : 'zoom_in'}
                </span>
              </motion.button>
            </AnimatePresence>
          </div>

          {/* Curatorial Placard — hide when zoomed for focus */}
          <AnimatePresence>
            {!isZoomed && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3 max-w-sm w-full text-left bg-white/70 backdrop-blur-sm p-6 sm:p-7 border border-[#e7e1de]/50 shadow-sm"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isAvailable ? 'bg-[#4c0c20]' : 'bg-[#625d59]'
                      }`}
                    />
                    <span
                      className={`text-[9px] uppercase tracking-[0.2em] font-medium font-sans-clean ${
                        isAvailable ? 'text-[#4c0c20]' : 'text-[#625d59]'
                      }`}
                    >
                      {currentArtwork.status}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl md:text-3xl text-[#1d1b19] italic font-normal tracking-tight">
                    {currentArtwork.title}
                  </h3>
                </div>

                <div className="h-[1px] w-full bg-[#d8c1c4]/40 my-1" />

                <div className="flex flex-col gap-1.5 text-[#534345]">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#1d1b19] font-sans-clean font-medium">
                    {currentArtwork.medium}
                  </p>
                  <div className="flex items-center gap-2 text-[#625d59] text-[11px] uppercase tracking-[0.16em] font-sans-clean">
                    <span>{currentArtwork.dimensions}</span>
                  </div>
                  {currentArtwork.description && (
                    <p className="text-xs text-[#534345] leading-relaxed pt-1 font-light">
                      {currentArtwork.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onInquire(currentArtwork);
                      onClose();
                    }}
                    className="group inline-flex items-center justify-between px-5 py-3.5 bg-[#4c0c20] text-white hover:bg-[#1d1b19] transition-colors duration-300 text-[11px] uppercase tracking-[0.2em] font-sans-clean font-medium w-full cursor-pointer"
                  >
                    <span>Consultar Adquisición</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex((currentIndex + 1) % artworks.length);
          }}
          aria-label="Siguiente obra"
          className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#e7e1de] hover:border-[#4c0c20] bg-[#fef8f4]/70 hover:bg-[#fef8f4] flex items-center justify-center text-[#1d1b19] hover:text-[#4c0c20] transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer ${
            isZoomed ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px]">arrow_forward</span>
        </button>
      </div>

      {/* Bottom Gallery Atelier Colophon */}
      <div className="w-full max-w-7xl mx-auto pt-3 border-t border-[#e7e1de]/40 flex flex-col sm:flex-row items-center justify-between text-[#625d59] gap-2 text-center sm:text-left">
        <span className="text-[9px] uppercase tracking-[0.2em] font-sans-clean">
          Pintura Matérica Original · Buenos Aires
        </span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-[#625d59]/70 hidden sm:inline font-sans-clean">
          Navegación: [←] Anterior · [→] Siguiente · [Esc] Cerrar
        </span>
      </div>
    </div>
  );
};
