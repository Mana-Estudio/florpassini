import React from 'react';
import { motion } from 'motion/react';
import { TabType } from '../types';
import { HERO_IMAGE, HOME_FEATURED_1_IMAGE, HOME_FEATURED_2_IMAGE } from '../data/artworks';
import { fadeInUp, fadeIn, scaleIn, slideInLeft, slideInRight } from '../utils/animations';

interface HomeViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenArtworkModal: (artworkId: string) => void;
  onInquireArtwork: (title: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenArtworkModal,
  onInquireArtwork,
}) => {
  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Editorial Meta Ribbon */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="w-full px-6 md:px-16 pt-6 pb-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#e7e1de]/40 pb-3">
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#534345] font-sans-clean font-medium">
            Colección Pictórica
          </span>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#534345] font-sans-clean font-medium">
            Buenos Aires — 2024
          </span>
        </div>
      </motion.section>

      {/* Main Hero Exhibition Anchor */}
      <section className="w-full px-6 md:px-16 pt-2 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Framed Canvas Presentation */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            onClick={() => onOpenArtworkModal('resonancia-coral')}
            className="group relative w-full overflow-hidden bg-[#f3ede9] shadow-[0_20px_50px_-20px_rgba(61,57,53,0.08)] cursor-pointer transition-all duration-700 hover:shadow-[0_28px_60px_-16px_rgba(76,12,32,0.12)]"
          >
            <div className="p-3 sm:p-6 md:p-8 bg-[#f9f2ef]/80">
              <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] w-full">
                <img
                  src={HERO_IMAGE}
                  alt="Resonancia Coral, obra al óleo en lienzo por Florencia Passini"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-[#fef8f4]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef8f4]/90 backdrop-blur-sm flex items-center justify-center text-[#1d1b19] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="material-symbols-outlined text-[20px]">open_in_full</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Under-Hero Identification Row */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 px-1 pt-2"
          >
            <div className="flex flex-col gap-1">
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1d1b19] font-normal tracking-tight">
                Florencia Passini
              </h1>
              <p className="text-xs sm:text-[13px] text-[#534345] font-sans-clean font-light tracking-wide">
                Pintura & Obra Original — Buenos Aires
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4c0c20]" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#534345] font-sans-clean font-medium">
                Galería Privada
              </span>
            </div>
          </motion.div>

          {/* Explorar Scroll Indicator */}
          <div className="w-full flex flex-col items-center justify-center pt-8 pb-4">
            <button
              onClick={() => {
                const el = document.getElementById('selected-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-center gap-2 cursor-pointer text-[#534345] hover:text-[#4c0c20] transition-colors"
            >
              <span className="text-[9px] uppercase tracking-[0.26em] font-sans-clean">
                Explorar
              </span>
              <div className="w-[1px] h-6 bg-[#d8c1c4] group-hover:bg-[#4c0c20] transition-colors duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Works Section: Diálogos de Materia y Silencio */}
      <section id="selected-works" className="w-full px-6 md:px-16 py-12 border-t border-[#e7e1de]/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-[0.26em] text-[#534345] font-sans-clean font-medium">
                Obras Seleccionadas
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#1d1b19] font-normal tracking-tight">
                Diálogos de Materia y Silencio
              </h2>
            </div>
            <p className="text-xs sm:text-[13px] text-[#625d59] max-w-md font-sans-clean leading-relaxed font-light md:text-right">
              Obras pictóricas únicas sobre lino y soporte puro.
              <br className="hidden sm:inline" />
              Disponibilidad curada para colecciones privadas.
            </p>
          </motion.div>

          {/* Asymmetric 2-Artwork Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Featured Work: Núcleo Mineral */}
            <motion.article
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => onOpenArtworkModal('nucleo-mineral')}
              className="md:col-span-5 flex flex-col group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full overflow-hidden bg-[#ede7e3] shadow-[0_16px_40px_-16px_rgba(61,57,53,0.06)] group-hover:shadow-[0_24px_50px_-14px_rgba(76,12,32,0.12)] transition-all duration-700">
                <div className="p-3 sm:p-5 bg-[#f9f2ef]/70">
                  <div className="relative overflow-hidden aspect-square w-full">
                    <img
                      src={HOME_FEATURED_1_IMAGE}
                      alt="Núcleo Mineral por Florencia Passini"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-[#fef8f4]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#fef8f4]/85 backdrop-blur-sm flex items-center justify-center text-[#1d1b19] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="material-symbols-outlined text-[18px]">open_in_full</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 px-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-editorial text-lg text-[#1d1b19] italic font-normal">
                    Núcleo Mineral
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest text-[#4c0c20] font-sans-clean font-medium">
                    Disponible
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#625d59] font-sans-clean">
                  Técnica Mixta y Pigmentos — 100 × 100 cm
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInquireArtwork('Núcleo Mineral');
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#4c0c20] hover:text-[#1d1b19] transition-colors pt-1 cursor-pointer w-fit"
                >
                  <span>Consultar adquisición</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </motion.article>

            {/* Right Featured Work: Bruma y Marea */}
            <motion.article
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => onOpenArtworkModal('bruma-y-marea')}
              className="md:col-span-7 flex flex-col group cursor-pointer transition-transform duration-300 hover:-translate-y-1 md:mt-10"
            >
              <div className="relative w-full overflow-hidden bg-[#ede7e3] shadow-[0_16px_40px_-16px_rgba(61,57,53,0.06)] group-hover:shadow-[0_24px_50px_-14px_rgba(76,12,32,0.12)] transition-all duration-700">
                <div className="p-3 sm:p-5 bg-[#f9f2ef]/70">
                  <div className="relative overflow-hidden aspect-square w-full">
                    <img
                      src={HOME_FEATURED_2_IMAGE}
                      alt="Bruma y Marea por Florencia Passini"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-[#fef8f4]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#fef8f4]/85 backdrop-blur-sm flex items-center justify-center text-[#1d1b19] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="material-symbols-outlined text-[18px]">open_in_full</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 px-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-editorial text-lg text-[#1d1b19] italic font-normal">
                    Bruma y Marea
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest text-[#4c0c20] font-sans-clean font-medium">
                    Disponible
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#625d59] font-sans-clean">
                  Técnica Mixta y Relieves — 110 × 110 cm
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInquireArtwork('Bruma y Marea');
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#4c0c20] hover:text-[#1d1b19] transition-colors pt-1 cursor-pointer w-fit"
                >
                  <span>Solicitar ficha de catálogo</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </motion.article>
          </div>

          {/* Centered Action Link: Ver Todas Las Obras */}
          <div className="w-full flex justify-center pt-8">
            <button
              onClick={() => onNavigate('obras')}
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#1d1b19] hover:text-[#4c0c20] transition-colors py-3 px-6 cursor-pointer"
            >
              <span>Ver todas las obras</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-y-0.5 transition-transform duration-300">
                arrow_downward
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy / Thought Quote Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="w-full bg-[#f9f2ef]/70 border-t border-b border-[#e7e1de]/50 py-20 px-6 md:px-16 mt-8"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#534345] font-sans-clean font-medium">
            Pensamiento
          </span>
          <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#1d1b19] leading-relaxed font-normal max-w-3xl">
            “La pintura como un diálogo íntimo entre la luz, la textura y el silencio.”
          </blockquote>
          <button
            onClick={() => onNavigate('sobre-mi')}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#4c0c20] hover:text-[#1d1b19] transition-colors pt-2 cursor-pointer"
          >
            <span>Sobre la artista</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-y-0.5 transition-transform duration-300">
              arrow_downward
            </span>
          </button>
        </div>
      </motion.section>
    </div>
  );
};
