import React from 'react';
import { ArrowRight } from 'lucide-react';
import { href } from '../lib/router';

/** 404: una pared con el clavo puesto y el marco vacío. */
export const NotFoundView: React.FC = () => (
  <section className="container-x grid min-h-[80vh] items-center gap-14 pb-24 pt-32 lg:grid-cols-2">
    <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
      {/* Clavo e hilo */}
      <div className="mx-auto h-3 w-3 rounded-full bg-ink/70 shadow" />
      <svg viewBox="0 0 200 60" className="-mt-1.5 block w-full text-ink/30">
        <path d="M100 2 L22 58 M100 2 L178 58" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
      {/* Marco vacío, apenas torcido */}
      <div className="-mt-1 rotate-[-3deg] border-[10px] border-[#c9b496] bg-paper-2 p-4 shadow-[0_30px_50px_-30px_rgba(31,26,23,0.5)]">
        <div className="grid aspect-[4/3] place-items-center border border-dashed border-ink/20">
          <span className="font-display text-7xl text-ink/15">404</span>
        </div>
      </div>
    </div>
    <div>
      <h1 className="text-5xl leading-[1.05] sm:text-7xl">
        Esta pared <em>está vacía</em>
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
        La página que buscás no existe o la obra ya encontró otra casa. Pero hay muchas más colgadas en el taller.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a href={href('obras')} className="btn-primary">
          Ver obras <ArrowRight className="h-4 w-4" />
        </a>
        <a href={href()} className="btn-ghost">
          Ir al inicio
        </a>
      </div>
    </div>
  </section>
);
