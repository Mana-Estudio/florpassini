import React from 'react';
import { Artwork } from '../types';
import { useImageLoaded } from './ui';

/** "70 × 100 cm" -> { w: 70, h: 100 } (ancho × alto). */
export function parseSize(size: string): { w: number; h: number } | null {
  const m = size.match(/(\d+(?:[.,]\d+)?)\s*[×xX]\s*(\d+(?:[.,]\d+)?)/);
  if (!m) return null;
  return { w: parseFloat(m[1].replace(',', '.')), h: parseFloat(m[2].replace(',', '.')) };
}

// Escena en centímetros reales
const SCENE_W = 340;
const SCENE_H = 250;
const FLOOR = 10;
const SOFA_W = 200;
const SOFA_H = 82;
const GAP = 22; // espacio entre el respaldo y el cuadro

const pctX = (cm: number) => `${(cm / SCENE_W) * 100}%`;
const pctY = (cm: number) => `${(cm / SCENE_H) * 100}%`;

/** Muestra la obra a escala real sobre un sillón de 2 m, para imaginar cómo queda en casa. */
export const WallPreview: React.FC<{ art: Artwork }> = ({ art }) => {
  const size = parseSize(art.size);
  const { ref, loaded, onLoad } = useImageLoaded(art.slug);
  if (!size) return null;

  // Si la obra es muy alta, se baja para que entre en la pared
  const bottom = Math.min(FLOOR + SOFA_H + GAP, SCENE_H - 14 - size.h);
  const left = (SCENE_W - size.w) / 2;
  const sofaLeft = (SCENE_W - SOFA_W) / 2;

  return (
    <figure className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[#efe7dc]"
        style={{ aspectRatio: `${SCENE_W} / ${SCENE_H}` }}
        role="img"
        aria-label={`${art.title} (${art.size}) colgada sobre un sillón de 2 metros, a escala`}
      >
        {/* Luz suave de pared */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,255,255,0.55),transparent_65%)]" />
        {/* Piso */}
        <div className="absolute inset-x-0 bottom-0 bg-[#d8c7b0]" style={{ height: pctY(FLOOR) }} />
        <div className="absolute inset-x-0 bg-[#cdb9a0]" style={{ bottom: pctY(FLOOR), height: '0.6%' }} />

        {/* Obra */}
        <div
          className="absolute shadow-[0_18px_30px_-12px_rgba(31,26,23,0.45)]"
          style={{
            left: pctX(left),
            width: pctX(size.w),
            bottom: pctY(bottom),
            height: pctY(size.h),
            backgroundColor: art.color,
          }}
        >
          <img
            ref={ref}
            onLoad={onLoad}
            src={art.thumb}
            alt=""
            className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Sillón */}
        <svg
          viewBox={`0 0 ${SOFA_W} ${SOFA_H}`}
          className="absolute"
          style={{ left: pctX(sofaLeft), width: pctX(SOFA_W), bottom: pctY(FLOOR - 1), height: pctY(SOFA_H) }}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="#b9a993">
            <rect x="14" y="8" width="172" height="46" rx="9" />
            <rect x="0" y="30" width="24" height="44" rx="8" />
            <rect x="176" y="30" width="24" height="44" rx="8" />
          </g>
          <g fill="#c9bba6">
            <rect x="22" y="44" width="77" height="24" rx="6" />
            <rect x="101" y="44" width="77" height="24" rx="6" />
          </g>
          <rect x="6" y="66" width="188" height="8" rx="3" fill="#ad9c85" />
          <g fill="#8a7a66">
            <rect x="16" y="74" width="4" height="8" rx="1" />
            <rect x="180" y="74" width="4" height="8" rx="1" />
          </g>
        </svg>

        {/* Planta, para dar escala */}
        <svg
          viewBox="0 0 40 110"
          className="absolute"
          style={{ left: pctX(sofaLeft + SOFA_W + 14), width: pctX(40), bottom: pctY(FLOOR - 1), height: pctY(110) }}
          aria-hidden="true"
        >
          <g fill="#8fa178">
            <ellipse cx="14" cy="40" rx="8" ry="22" transform="rotate(-18 14 40)" />
            <ellipse cx="27" cy="34" rx="8" ry="24" transform="rotate(16 27 34)" />
            <ellipse cx="20" cy="22" rx="7" ry="22" />
          </g>
          <path d="M8 72 h24 l-3 38 h-18 z" fill="#c78c6c" />
        </svg>
      </div>
      <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-sm text-ink-soft">
        <span>
          <span className="font-semibold text-ink">{art.size}</span> sobre un sillón de 2 m
        </span>
        <span>Escala aproximada</span>
      </figcaption>
    </figure>
  );
};
