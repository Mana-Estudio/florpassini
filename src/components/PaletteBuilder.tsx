import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { whatsappLink } from '../data/site';
import { href } from '../lib/router';
import { colorDistance, readableOn } from '../lib/color';
import { ArtImage, WhatsAppIcon } from './ui';

const MAX = 4;

// Todos los colores de las obras de Flor, sin repetir nombres
const COLORS = (() => {
  const seen = new Set<string>();
  return ARTWORKS.flatMap((a) => a.palette).filter((c) => (seen.has(c.name) ? false : (seen.add(c.name), true)));
})();

const DEFAULT = ['Coral', 'Jade', 'Arena'].filter((n) => COLORS.some((c) => c.name === n));

/** Herramienta para encargos: elegís colores de su obra y te muestra obras parecidas. */
export const PaletteBuilder: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(DEFAULT);
  const chosen = selected.map((n) => COLORS.find((c) => c.name === n)!);

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : s.length >= MAX ? [...s.slice(1), name] : [...s, name]));

  // Obras más parecidas: promedio de la distancia de cada color elegido al color más cercano de la obra
  const matches = useMemo(() => {
    if (!chosen.length) return [];
    return ARTWORKS.map((a) => {
      const d = chosen.reduce((sum, c) => sum + Math.min(...a.palette.map((p) => colorDistance(c.hex, p.hex))), 0) / chosen.length;
      return { art: a, score: Math.max(0, Math.round(100 - d / 4.5)) };
    })
      .sort((x, y) => y.score - x.score)
      .slice(0, 3);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const message = `¡Hola Flor! Armé esta paleta en tu web para un encargo: ${chosen
    .map((c) => c.name)
    .join(', ')
    .replace(/, ([^,]*)$/, ' y $1')}. ¿Lo charlamos?`;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Colores disponibles */}
      <div className="lg:col-span-6">
        <p className="text-ink-soft">
          Tocá hasta {MAX} colores. Todos salen de mis obras.
        </p>
        <ul className="mt-6 grid grid-cols-5 gap-3 sm:grid-cols-7 lg:grid-cols-6 xl:grid-cols-7">
          {COLORS.map((c) => {
            const on = selected.includes(c.name);
            return (
              <li key={c.name}>
                <button
                  onClick={() => toggle(c.name)}
                  aria-pressed={on}
                  aria-label={c.name}
                  title={c.name}
                  className="group flex w-full flex-col items-center gap-1.5 cursor-pointer"
                >
                  <span
                    className={`relative grid aspect-square w-full place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(31,26,23,0.1)] transition-transform duration-200 group-hover:scale-110 ${
                      on ? 'scale-105 ring-2 ring-ink ring-offset-2 ring-offset-paper' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {on && <Check className="h-4 w-4" style={{ color: readableOn(c.hex) }} />}
                  </span>
                  <span className="w-full truncate text-center text-[11px] leading-tight text-ink-soft">{c.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Resultado */}
      <div className="lg:col-span-6">
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-2xl">Tu paleta</p>
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Empezar de nuevo
              </button>
            )}
          </div>

          {/* Franjas como pinceladas */}
          <div className="mt-5 flex h-28 overflow-hidden rounded-2xl bg-paper-2">
            <AnimatePresence initial={false}>
              {chosen.map((c) => (
                <motion.div
                  key={c.name}
                  layout
                  initial={{ flexGrow: 0, opacity: 0 }}
                  animate={{ flexGrow: 1, opacity: 1 }}
                  exit={{ flexGrow: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex basis-0 items-end p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="truncate text-xs font-semibold" style={{ color: readableOn(c.hex) }}>
                    {c.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {chosen.length === 0 && (
              <p className="grid w-full place-items-center px-6 text-center text-sm text-ink-soft">Elegí colores para armar tu paleta</p>
            )}
          </div>

          {matches.length > 0 && (
            <>
              <p className="mt-7 text-sm font-semibold">Obras mías con colores parecidos</p>
              <ul className="mt-3 grid grid-cols-3 gap-3">
                {matches.map(({ art, score }) => (
                  <li key={art.slug}>
                    <a href={href(`obras/${art.slug}`)} data-cursor="Ver obra" className="group block">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <ArtImage art={art} sizes="160px" className="!h-full object-cover group-hover:scale-105" />
                      </div>
                      <p className="mt-2 truncate text-sm font-medium group-hover:text-violet">{art.title}</p>
                      <p className="text-xs text-ink-soft">{score}% parecida</p>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <a
            href={chosen.length ? whatsappLink(message) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!chosen.length}
            className={`btn-primary mt-7 w-full ${chosen.length ? '' : 'pointer-events-none opacity-40'}`}
          >
            <WhatsAppIcon /> Quiero una obra con esta paleta
          </a>
        </div>
      </div>
    </div>
  );
};
