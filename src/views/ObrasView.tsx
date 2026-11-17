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
        title={
          <>
            Obras
          </>
        }
      >
        Originales al óleo y técnica mixta. Tocá cualquiera para verla en detalle.
      </PageIntro>

      {/* Filtros */}
      <div className="sticky top-18 z-30 border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <div role="tablist" aria-label="Filtrar por serie" className="no-scrollbar -ml-3 flex gap-2 overflow-x-auto">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative shrink-0 px-3 py-2 text-[15px] tracking-wide transition-colors cursor-pointer ${
                    active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {f.label} <sup className="text-[10px] text-ink-soft">{count(f.id)}</sup>
                  {active && (
                    <motion.span layoutId="filter-line" className="absolute inset-x-3 bottom-0.5 h-px bg-ink" transition={{ type: 'spring', duration: 0.4 }} />
                  )}
                </button>
              );
            })}
          </div>
          <label className="flex cursor-pointer items-center gap-2.5 text-[15px] tracking-wide text-ink-soft select-none hover:text-ink">
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border transition-colors ${onlyAvailable ? 'border-ink bg-ink' : 'border-ink/40'}`}
            >
              {onlyAvailable && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
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

      <section className="container-x py-14 sm:py-20">
        {list.length === 0 ? (
          <p className="py-20 text-center text-lg text-ink-soft">No hay obras con ese filtro por ahora.</p>
        ) : (
          // Obras en grande: dos columnas en escritorio, respetando la proporción de cada una
          <motion.div layout className="columns-1 gap-12 md:columns-2 lg:gap-20">
            <AnimatePresence mode="popLayout">
              {list.map((art, i) => (
                <motion.div
                  key={art.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-16 break-inside-avoid lg:mb-24"
                >
                  <ArtworkCard art={art} sizes="(min-width: 768px) 45vw, 100vw" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Llamado a encargos */}
      <section className="container-x border-t border-line py-24 text-center">
        <h2 className="text-4xl sm:text-5xl">
          ¿No encontrás <em>la tuya?</em>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-ink-soft">Pinto por encargo, con el tamaño y los colores que imagines.</p>
        <a href={href('encargos')} className="link-arrow mt-8">
          Pedir un encargo <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </>
  );
};
