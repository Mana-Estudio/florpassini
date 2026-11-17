import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ARTWORKS, findArtwork } from '../data/artworks';
import { SERIES, SITE } from '../data/site';
import { href } from '../lib/router';
import { useDragScroll } from '../lib/useDragScroll';
import { ArtImage, Reveal } from '../components/ui';
import { CtaBand } from '../components/sections';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Obras del inicio a pantalla completa. Se eligen las que tienen fotos de buena resolución.
 * `focus` es el punto de la obra que tiene que quedar visible al recortarse a la pantalla.
 */
const HERO = [
  { slug: 'resonancia-coral', focus: '50% 50%' },
  { slug: 'el-vuelo-silencioso', focus: '50% 38%' },
  { slug: 'geometria-botanica', focus: '55% 50%' },
  { slug: 'metamorfosis', focus: '40% 45%' },
]
  .map((h) => ({ ...h, art: findArtwork(h.slug)! }))
  .filter((h) => h.art);

const SLIDE_MS = 6500;

export const HomeView: React.FC = () => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO[i];

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % HERO.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  const featured = ARTWORKS.filter((a) => a.featured);
  const strip = useDragScroll<HTMLDivElement>();
  const scrollStrip = (dir: 1 | -1) =>
    strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.7, behavior: 'smooth' });

  const encargoArt = findArtwork('geometria-botanica')!;

  return (
    <>
      {/* ── Obra a pantalla completa ─────────────────────── */}
      <section
        className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carrusel"
        aria-label="Obras destacadas"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.slug}
            src={slide.art.image}
            srcSet={`${slide.art.thumb} 900w, ${slide.art.image} 2000w`}
            sizes="100vw"
            alt={`${slide.art.title}, obra de Florencia Passini`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: slide.focus, backgroundColor: slide.art.color }}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: SLIDE_MS / 1000 + 1.5, ease: 'linear' } }}
            fetchPriority={i === 0 ? 'high' : undefined}
          />
        </AnimatePresence>

        {/* Sombras suaves para leer el texto sobre la obra */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        <div className="container-x absolute inset-x-0 bottom-0 flex flex-col gap-10 pb-12 sm:pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-paper">
            <h1 className="font-sans text-sm font-normal tracking-[0.12em] text-paper/85">
              Florencia Passini · Pintora en {SITE.location}
            </h1>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease }}
              >
                <p className="mt-4 font-display text-6xl font-light leading-[0.95] sm:text-8xl">
                  <em>{slide.art.title}</em>
                </p>
                <p className="mt-4 text-paper/80">
                  {slide.art.technique} · {slide.art.size}
                </p>
              </motion.div>
            </AnimatePresence>
            <a
              href={href(`obras/${slide.art.slug}`)}
              className="btn mt-8 border border-paper/60 text-paper hover:border-paper hover:bg-paper hover:text-ink"
            >
              Ver obra <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Indicadores */}
          <div className="flex items-center gap-4" role="tablist" aria-label="Elegir obra">
            {HERO.map((h, n) => (
              <button
                key={h.slug}
                role="tab"
                aria-selected={n === i}
                aria-label={h.art.title}
                onClick={() => setI(n)}
                className="group flex flex-col gap-2 text-left cursor-pointer"
              >
                <span className={`text-xs tracking-wide transition-colors ${n === i ? 'text-paper' : 'text-paper/50 group-hover:text-paper/80'}`}>
                  {String(n + 1).padStart(2, '0')}
                </span>
                <span className="relative block h-px w-12 overflow-hidden bg-paper/30 sm:w-16">
                  {n === i && (
                    <motion.span
                      key={`${h.slug}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-paper"
                      initial={{ width: reduce || paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduce || paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Frase ─────────────────────────────────────────── */}
      <section className="container-x py-24 text-center sm:py-36">
        <Reveal>
          <p className="mx-auto max-w-4xl font-display text-4xl font-light leading-[1.15] sm:text-6xl">
            “{SITE.statement}”
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">{SITE.intro}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href={href('obras')} className="link-arrow">
              Ver todas las obras <ArrowRight className="h-4 w-4" />
            </a>
            <a href={href('sobre-mi')} className="link-arrow">
              Conocé a Flor <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Galería grande, para arrastrar ───────────────── */}
      <section className="pb-24 sm:pb-36">
        <div className="container-x flex items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-5xl sm:text-6xl">
              Obras <em>recientes</em>
            </h2>
          </Reveal>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollStrip(-1)}
              aria-label="Anterior"
              className="hidden h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper sm:grid cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollStrip(1)}
              aria-label="Siguiente"
              className="hidden h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper sm:grid cursor-pointer"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={strip}
          className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth strip-pad pb-4 select-none sm:snap-none sm:gap-12"
        >
          {featured.map((art) => (
            <a key={art.slug} href={href(`obras/${art.slug}`)} data-cursor="Ver obra" className="group block shrink-0 snap-start">
              <div
                className="h-[58vh] max-h-[640px] min-h-[340px] overflow-hidden"
                style={{ aspectRatio: `${art.w} / ${art.h}` }}
              >
                <ArtImage
                  art={art}
                  sizes="(min-width: 640px) 60vw, 85vw"
                  className="!h-full object-cover group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-2xl transition-colors group-hover:text-violet">{art.title}</h3>
                <span className="text-sm text-ink-soft">
                  {SERIES[art.serie]} · {art.size}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Sobre Flor ───────────────────────────────────── */}
      <section className="bg-paper-2">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
          <Reveal className="h-full">
            <img
              src="/images/flor/flor-passini.jpg"
              width={874}
              height={960}
              loading="lazy"
              alt="Florencia Passini junto a su obra Eclosión Vital"
              className="h-full max-h-[85vh] w-full object-cover object-top"
            />
          </Reveal>
          <Reveal className="px-5 py-20 sm:px-12 lg:px-20" delay={0.1}>
            <h2 className="text-5xl leading-[1.05] sm:text-6xl">
              Hola, <em>soy Flor</em>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">{SITE.bio[0]}</p>
            <a href={href('sobre-mi')} className="link-arrow mt-10">
              Mi historia <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Encargos ─────────────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
        <Reveal className="order-2 px-5 py-20 sm:px-12 lg:order-1 lg:px-20">
          <h2 className="text-5xl leading-[1.05] sm:text-6xl">
            Una obra <em>para tu espacio</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            Elegís el tamaño, los colores y el clima. La pinto desde cero, te muestro el proceso y te llega lista para colgar.
          </p>
          <a href={href('encargos')} className="link-arrow mt-10">
            Cómo funcionan los encargos <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Reveal className="order-1 lg:order-2" delay={0.1}>
          <a href={href(`obras/${encargoArt.slug}`)} data-cursor="Ver obra" className="block">
            <ArtImage art={encargoArt} sizes="(min-width: 1024px) 50vw, 100vw" />
          </a>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
};
