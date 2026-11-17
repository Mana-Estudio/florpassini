import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Artwork, Estado } from '../types';
import { ESTADOS } from '../data/site';

/** Aparición suave al hacer scroll. Se desactiva solo si el usuario pidió menos movimiento. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}> = ({ children, className, delay = 0, as = 'div' }) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
};

/** Hook: true cuando la imagen terminó de cargar (también si ya venía de la caché). */
export function useImageLoaded(key: string) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(!!ref.current?.complete && ref.current.naturalWidth > 0);
  }, [key]);
  return { ref, loaded, onLoad: () => setLoaded(true) };
}

/**
 * Imagen de obra: respeta su proporción real (nunca recorta la obra) y carga el tamaño justo.
 * Mientras carga muestra el color promedio de la obra y después aparece suave.
 */
export const ArtImage: React.FC<{
  art: Artwork;
  sizes?: string;
  className?: string;
  eager?: boolean;
}> = ({ art, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', className = '', eager }) => {
  const { ref, loaded, onLoad } = useImageLoaded(art.slug);
  return (
    <span className="block h-full w-full" style={{ backgroundColor: art.color }}>
      <img
        ref={ref}
        onLoad={onLoad}
        src={art.thumb}
        srcSet={`${art.thumb} 900w, ${art.image} ${Math.max(art.w, 901)}w`}
        sizes={sizes}
        width={art.w}
        height={art.h}
        alt={`${art.title}, obra de Florencia Passini`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`block h-auto w-full transition-[opacity,transform] duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </span>
  );
};

const dot: Record<Estado, string> = {
  disponible: 'bg-leaf',
  reservada: 'bg-coral',
  vendida: 'bg-ink-soft/50',
};

export const StatusTag: React.FC<{ status: Estado; className?: string }> = ({ status, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft ${className}`}>
    <span className={`h-2 w-2 rounded-full ${dot[status]}`} />
    {ESTADOS[status]}
  </span>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.03-17.46A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.4l5.8-1.52a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
  </svg>
);

/** Insignia circular giratoria con texto: un detalle "hecho a mano". */
export const SpinBadge: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <div className={`place-items-center ${className}`} aria-hidden="true">
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
      <defs>
        <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-current font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em]">
        <textPath href="#badge-circle">{text}</textPath>
      </text>
    </svg>
    <span className="font-display text-2xl italic">fp</span>
  </div>
);
