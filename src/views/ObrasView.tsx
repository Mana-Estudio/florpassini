import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { Serie } from '../types';
import { href } from '../lib/router';
import { ArtworkCard } from '../components/ArtworkCard';
import { PageIntro } from '../components/sections';

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
        eyebrow="Obras"
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
          <motion.div layout className="columns-1 gap-8 sm:columns-2 lg:columns-3 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {list.map((art, i) => (
                <motion.div
                  key={art.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 break-inside-avoid lg:mb-16"
                >
                  <ArtworkCard art={art} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
