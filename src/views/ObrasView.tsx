import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { Serie } from '../types';
import { href } from '../lib/router';
import { ArtworkCard } from '../components/ArtworkCard';
import { PageIntro } from '../components/sections';
import { parseSize } from '../components/WallPreview';

type Filter = 'todas' | Serie;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'abstractos', label: 'Abstractos' },
  { id: 'naturaleza', label: 'Naturaleza' },
];

export const ObrasView: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('todas');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const list = useMemo(
    () =>
      ARTWORKS.filter((a) => (filter === 'todas' || a.serie === filter) && (!onlyAvailable || a.status === 'disponible')),
    [filter, onlyAvailable],
  );

  const count = (f: Filter) => ARTWORKS.filter((a) => f === 'todas' || a.serie === f).length;

  return (
    <>
      <PageIntro
        title={
          <>
            Todo lo que <em className="text-violet">pinté</em> últimamente
          </>
        }
      >
        Obras originales al óleo y técnica mixta. Tocá cualquiera para verla en grande, con medidas y disponibilidad.
      </PageIntro>

      {/* Filtros */}
      <div className="sticky top-18 z-30 border-y border-line bg-paper/90 backdrop-blur-md">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <div role="tablist" aria-label="Filtrar por serie" className="no-scrollbar flex gap-2 overflow-x-auto">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                    active ? 'text-paper' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', duration: 0.4 }} />
                  )}
                  <span className="relative">
                    {f.label} <span className={active ? 'text-paper/60' : 'text-ink-soft/60'}>{count(f.id)}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink-soft select-none">
            <span
              className={`relative h-6 w-11 rounded-full transition-colors ${onlyAvailable ? 'bg-leaf' : 'bg-line'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${onlyAvailable ? 'left-[22px]' : 'left-0.5'}`}
              />
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            Solo disponibles
          </label>
        </div>
      </div>

      {/* Muro de obras: columnas tipo masonry que respetan la proporción de cada obra */}
      <section className="container-x py-14 sm:py-20">
        {list.length === 0 ? (
          <p className="py-20 text-center text-lg text-ink-soft">No hay obras con ese filtro por ahora.</p>
        ) : (
          <>
            {/* Pared de salón: cada obra con un ancho proporcional a sus medidas reales, alineadas sobre una línea de centro */}
            <motion.div
              layout
              className="flex flex-wrap items-center justify-center gap-x-[clamp(2rem,4vw,4.5rem)] gap-y-14 [--cm:1.7px] lg:gap-y-20 lg:[--cm:2.3px] xl:[--cm:2.6px]"
            >
              <AnimatePresence mode="popLayout">
                {list.map((art, i) => (
                  <motion.div
                    key={art.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full sm:w-[calc(var(--w)*var(--cm))]"
                    style={{ '--w': parseSize(art.size)?.w ?? 90 } as React.CSSProperties}
                  >
                    <ArtworkCard art={art} sizes="(min-width: 1280px) 320px, (min-width: 640px) 30vw, 100vw" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            <p className="mt-16 hidden text-center text-sm text-ink-soft sm:block">
              Las obras se muestran en proporción a su tamaño real, como si estuvieran colgadas en la misma pared.
            </p>
          </>
        )}
      </section>

      {/* Llamado a encargos */}
      <section className="container-x pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-violet-soft p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="text-3xl sm:text-4xl">
              ¿No encontrás <em className="text-violet">la tuya?</em>
            </h2>
            <p className="mt-2 max-w-lg text-ink-soft">
              Pinto por encargo: el tamaño, los colores y la temática que imagines para tu espacio.
            </p>
          </div>
          <a href={href('encargos')} className="btn-primary shrink-0">
            Pedir un encargo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
};
