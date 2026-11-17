import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Brush, MessageCircle, Truck } from 'lucide-react';
import { ARTWORKS, findArtwork } from '../data/artworks';
import { SITE } from '../data/site';
import { href } from '../lib/router';
import { ArtImage, Reveal, SpinBadge } from '../components/ui';
import { CtaBand, Marquee } from '../components/sections';
import { SERIES } from '../data/site';

const ease = [0.22, 1, 0.36, 1] as const;

export const HomeView: React.FC = () => {
  const hero = findArtwork('eclosion-vital')!;
  const heroSmall = findArtwork('el-vuelo-silencioso')!;
  const featured = ARTWORKS.filter((a) => a.featured);
  const strip = useRef<HTMLDivElement>(null);

  const scrollStrip = (dir: 1 | -1) =>
    strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-violet-soft blur-3xl"
        />
        <div className="container-x relative grid items-center gap-14 pb-20 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-36">
          <div className="lg:col-span-5">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {SITE.role} · {SITE.location}
            </motion.p>
            <motion.h1
              className="mt-5 text-[3.6rem] leading-[0.95] tracking-tight sm:text-8xl lg:text-[6.5rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
            >
              Florencia
              <br />
              <em className="text-violet">Passini</em>
            </motion.h1>
            <motion.p
              className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
            >
              {SITE.intro}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease }}
            >
              <a href={href('obras')} className="btn-primary">
                Ver obras <ArrowRight className="h-4 w-4" />
              </a>
              <a href={href('encargos')} className="btn-ghost">
                Encargar una obra
              </a>
            </motion.div>
          </div>

          {/* Collage de obras */}
          <div className="relative lg:col-span-7">
            <motion.a
              href={href(`obras/${hero.slug}`)}
              className="group relative ml-auto block w-[86%] sm:w-[78%]"
              initial={{ opacity: 0, y: 30, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 1.5 }}
              transition={{ duration: 1, delay: 0.15, ease }}
            >
              <div className="overflow-hidden shadow-[0_40px_80px_-40px_rgba(31,26,23,0.6)]">
                <ArtImage art={hero} eager sizes="(min-width: 1024px) 45vw, 85vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <span className="mt-3 hidden text-right text-sm text-ink-soft sm:block">
                <em className="font-display text-base text-ink">{hero.title}</em> · {hero.technique}
              </span>
            </motion.a>
            <motion.a
              href={href(`obras/${heroSmall.slug}`)}
              className="group absolute -bottom-6 left-0 block w-[52%] bg-white p-2.5 shadow-[0_30px_60px_-30px_rgba(31,26,23,0.55)] sm:-bottom-4 sm:w-[46%] sm:p-3"
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              whileHover={{ rotate: -2, y: -4 }}
            >
              <ArtImage art={heroSmall} eager sizes="(min-width: 1024px) 25vw, 50vw" />
            </motion.a>
            <SpinBadge
              text="obra original · hecha a mano · "
              className="absolute -top-10 left-[4%] hidden h-28 w-28 sm:left-[14%] rounded-full bg-coral text-paper shadow-lg sm:grid"
            />
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── Obras destacadas (tira horizontal) ───────────── */}
      <section className="py-24 sm:py-32">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Obras</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-6xl">
              Un poco de <em className="text-violet">lo último</em>
            </h2>
          </Reveal>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollStrip(-1)}
              aria-label="Anterior"
              className="hidden h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper sm:grid cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollStrip(1)}
              aria-label="Siguiente"
              className="hidden h-12 w-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper sm:grid cursor-pointer"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <a href={href('obras')} className="link-arrow ml-2">
              Ver todas <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div
          ref={strip}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth strip-pad pb-4 sm:gap-10"
        >
          {featured.map((art, i) => (
            <Reveal key={art.slug} delay={i * 0.06} className="shrink-0 snap-start">
              <a href={href(`obras/${art.slug}`)} className="group block">
                <div
                  className="h-[300px] overflow-hidden bg-paper-2 shadow-[0_18px_40px_-24px_rgba(31,26,23,0.45)] sm:h-[420px]"
                  style={{ aspectRatio: `${art.w} / ${art.h}` }}
                >
                  <ArtImage art={art} sizes="(min-width: 640px) 560px, 80vw" className="!h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-6">
                  <h3 className="text-xl transition-colors group-hover:text-violet">{art.title}</h3>
                  <span className="text-sm text-ink-soft">{SERIES[art.serie]}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Sobre mí (adelanto) ──────────────────────────── */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-t-full shadow-[0_30px_60px_-30px_rgba(31,26,23,0.5)]">
                <img
                  src="/images/flor/flor-passini.jpg"
                  width={874}
                  height={960}
                  loading="lazy"
                  alt="Florencia Passini junto a su obra Eclosión Vital"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-5 -right-3 rotate-[-6deg] rounded-full bg-leaf px-5 py-2.5 font-display text-lg italic text-white shadow-lg sm:-right-6">
                ¡Hola, soy Flor!
              </span>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow">Sobre mí</p>
            <blockquote className="mt-4 font-display text-3xl leading-snug sm:text-5xl sm:leading-[1.1]">
              “{SITE.statement}”
            </blockquote>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{SITE.bio[0]}</p>
            <a href={href('sobre-mi')} className="link-arrow mt-8">
              Conocé mi historia <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Encargos (adelanto) ──────────────────────────── */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Encargos</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-6xl">
              Una obra pensada <em className="text-violet">para tu espacio</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Elegís el tamaño, la paleta y el clima. Yo la pinto desde cero, te muestro avances y te la llevo lista para colgar.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { icon: MessageCircle, color: 'bg-violet-soft text-violet', t: 'Charlamos', d: 'Me contás qué te imaginás y me mandás fotos del lugar donde va a ir.' },
              { icon: Brush, color: 'bg-[#fde6df] text-coral-deep', t: 'Pinto tu obra', d: 'Defino una propuesta de colores y medidas, y te comparto el proceso.' },
              { icon: Truck, color: 'bg-[#e8f1da] text-[#4f6e22]', t: 'Llega a tu casa', d: 'Firmada, con certificado y embalada con cuidado. Envíos a todo el país.' },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08} className="rounded-3xl border border-line bg-white/60 p-8">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl">
                  <span className="mr-2 text-ink-soft/50">0{i + 1}</span>
                  {s.t}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <a href={href('encargos')} className="link-arrow">
              Cómo funcionan los encargos <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
};
