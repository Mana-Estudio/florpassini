import React from 'react';
import { motion } from 'motion/react';
import { Artwork } from '../types';
import { SERIES } from '../data/site';
import { href } from '../lib/router';
import { ArtImage, StatusTag } from './ui';

export const ArtworkCard: React.FC<{ art: Artwork; sizes?: string; className?: string }> = ({
  art,
  sizes,
  className = '',
}) => (
  <a href={href(`obras/${art.slug}`)} className={`group block ${className}`}>
    {/* layoutId: la imagen "vuela" desde la tarjeta hasta la ficha de la obra */}
    <motion.div
      layoutId={`art-${art.slug}`}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-paper-2 shadow-[0_18px_40px_-24px_rgba(31,26,23,0.45)] transition-shadow duration-500 group-hover:shadow-[0_28px_60px_-24px_rgba(74,44,122,0.45)]">
      <ArtImage
        art={art}
        sizes={sizes}
        className={`group-hover:scale-[1.03] ${
          art.status === 'vendida' ? 'saturate-[0.85]' : ''
        }`}
      />
      {art.status !== 'disponible' && (
        <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
          {art.status === 'vendida' ? 'Vendida' : 'Reservada'}
        </span>
      )}
    </motion.div>
    <div className="mt-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl leading-tight text-ink transition-colors group-hover:text-violet">{art.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {SERIES[art.serie]} · {art.size}
        </p>
      </div>
      {art.status === 'disponible' && <StatusTag status={art.status} className="mt-1 shrink-0" />}
    </div>
  </a>
);
