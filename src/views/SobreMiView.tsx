import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { href } from '../lib/router';
import { Reveal } from '../components/ui';
import { CtaBand } from '../components/sections';

const PROCESO = [
  {
    img: '/images/detalles/detalle-colibri.jpg',
    w: 560,
    h: 640,
    title: 'Mirar de cerca',
    text: 'En las obras de naturaleza me detengo en lo mínimo: cada pluma del colibrí es una pincelada pensada.',
    from: 'El Vuelo Silencioso',
  },
  {
    img: '/images/detalles/detalle-suculenta.jpg',
    w: 700,
    h: 700,
    title: 'El color manda',
    text: 'Busco que los colores vibren juntos: violetas que se encienden al lado de un verde, azules que se calientan.',
    from: 'Geometría Botánica',
  },
  {
    img: '/images/detalles/detalle-coral.jpg',
    w: 640,
    h: 534,
    title: 'Capas y tiempo',
    text: 'En las abstractas trabajo por capas, con veladuras y espátula, hasta que el cuadro encuentra su propio movimiento.',
    from: 'Resonancia Coral',
  },
];

export const SobreMiView: React.FC = () => (
  <>
    {/* Presentación */}
    <section className="container-x grid items-center gap-14 pb-24 pt-32 sm:pt-40 lg:grid-cols-12 lg:gap-20">
      <Reveal className="lg:col-span-5">
        <div className="relative mx-auto max-w-md">
          <div className="overflow-hidden">
            <img
              src="/images/flor/flor-passini.jpg"
              width={874}
              height={960}
              alt="Florencia Passini sonriendo junto a su obra Eclosión Vital"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </div>
      </Reveal>
      <Reveal className="lg:col-span-7" delay={0.1}>
        <h1 className="text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          Hola, <em>soy Flor.</em>
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
          {SITE.bio.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={href('obras')} className="btn-primary">
            Ver mis obras <ArrowRight className="h-4 w-4" />
          </a>
          <a href={href('encargos')} className="btn-ghost">
            Encargar una obra
          </a>
        </div>
      </Reveal>
    </section>

    {/* Frase */}
    <section className="border-y border-line bg-paper-2 py-20 sm:py-28">
      <Reveal className="container-x text-center">
        <blockquote className="mx-auto max-w-4xl font-display text-4xl leading-tight sm:text-6xl">
          “{SITE.statement}”
        </blockquote>
        <p className="mt-6 font-display text-xl text-violet">— Flor</p>
      </Reveal>
    </section>

    {/* Proceso */}
    <section className="container-x py-24 sm:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-4xl leading-tight sm:text-6xl">
          Acercate, <em>mirá la pincelada</em>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {PROCESO.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} as="article">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={p.img}
                width={p.w}
                height={p.h}
                loading="lazy"
                alt={`Detalle de la obra ${p.from}`}
                className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <h3 className="mt-6 text-2xl">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{p.text}</p>
            <p className="mt-3 text-sm text-ink-soft/80">Detalle de “{p.from}”</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Trayectoria (se muestra sólo si hay datos cargados en site.ts) */}
    {SITE.trayectoria.length > 0 && (
      <section className="container-x pb-24 sm:pb-32">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">Muestras y formación</h2>
        </Reveal>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {SITE.trayectoria.map((t) => (
            <Reveal as="li" key={t.year + t.title} className="grid gap-1 py-5 sm:grid-cols-12 sm:gap-6">
              <span className="font-display text-xl text-violet sm:col-span-2">{t.year}</span>
              <span className="font-medium sm:col-span-6">{t.title}</span>
              {t.place && <span className="text-ink-soft sm:col-span-4">{t.place}</span>}
            </Reveal>
          ))}
        </ul>
      </section>
    )}

    <CtaBand />
  </>
);
