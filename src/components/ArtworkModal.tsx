import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Link2, Mail, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Artwork } from '../types';
import { ARTWORKS, artworkMessage } from '../data/artworks';
import { SERIES, SITE, whatsappLink } from '../data/site';
import { navigate } from '../lib/router';
import { StatusTag, WhatsAppIcon, useImageLoaded } from './ui';
import { WallPreview } from './WallPreview';

interface Props {
  art: Artwork;
}

export const ArtworkModal: React.FC<Props> = ({ art }) => {
  const index = ARTWORKS.findIndex((a) => a.slug === art.slug);
  const prev = ARTWORKS[(index - 1 + ARTWORKS.length) % ARTWORKS.length];
  const next = ARTWORKS[(index + 1) % ARTWORKS.length];

  const [zoom, setZoom] = useState(false);
  const [view, setView] = useState<'obra' | 'pared'>('obra');
  const [openedWith] = useState(art.slug);
  const full = useImageLoaded(art.slug);
  const [origin, setOrigin] = useState('50% 50%');
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  // Si se abrió desde el listado, "Cerrar" vuelve atrás (y el botón Atrás del navegador también cierra).
  const close = () =>
    (window.history.state as { fromList?: boolean } | null)?.fromList
      ? window.history.back()
      : navigate('obras', { replace: true });
  // Pasar entre obras no apila historial
  const go = (a: Artwork) => navigate(`obras/${a.slug}`, { replace: true, state: window.history.state });

  useEffect(() => {
    setZoom(false);
    setCopied(false);
  }, [art.slug]);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') (zoom ? setZoom(false) : close());
      if (zoom) return;
      if (e.key === 'ArrowRight') go(next);
      if (e.key === 'ArrowLeft') go(prev);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* el navegador no permite copiar: no pasa nada */
    }
  };

  const isAvailable = art.status === 'disponible';
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Consulta por "${art.title}"`)}&body=${encodeURIComponent(
    artworkMessage(art),
  )}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={art.title}
      className="fixed inset-0 z-50 overflow-y-auto bg-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Barra superior */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-paper/90 px-5 py-4 backdrop-blur sm:px-8">
        <span className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">{String(index + 1).padStart(2, '0')}</span> / {String(ARTWORKS.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          onClick={close}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-paper-2 cursor-pointer"
        >
          Cerrar <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-10">
        {/* Obra */}
        <div className="relative flex flex-col items-center justify-center gap-5 lg:col-span-8 lg:min-h-[calc(100vh-9rem)]">
          {/* Selector: foto de la obra o a escala en una pared */}
          <div role="tablist" aria-label="Modo de vista" className="flex rounded-full bg-paper-2 p-1 text-sm font-semibold">
            {(
              [
                ['obra', 'La obra'],
                ['pared', '¿Cómo queda en mi pared?'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                onClick={() => setView(id)}
                className={`relative rounded-full px-4 py-2 transition-colors cursor-pointer ${view === id ? 'text-paper' : 'text-ink-soft hover:text-ink'}`}
              >
                {view === id && (
                  <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', duration: 0.4 }} />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>

          {view === 'pared' ? (
            <motion.div
              key={`pared-${art.slug}`}
              className="w-full max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <WallPreview art={art} />
            </motion.div>
          ) : (
            <motion.div
              key={art.slug}
              // Sólo la obra con la que se abrió la ficha "vuela" desde su tarjeta
              layoutId={art.slug === openedWith ? `art-${art.slug}` : undefined}
              initial={art.slug === openedWith ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden shadow-[0_30px_70px_-30px_rgba(31,26,23,0.5)] ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              style={{ backgroundColor: art.color }}
              onClick={() => setZoom((z) => !z)}
              onMouseMove={(e) => {
                if (!zoom) return;
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
              }}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null || zoom) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? next : prev);
                touchX.current = null;
              }}
            >
              <div
                className="relative transition-transform duration-500 ease-out"
                style={{ transform: zoom ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin }}
              >
                {/* La miniatura (ya en caché desde la grilla) se ve al instante; la grande aparece encima al cargar */}
                <img
                  src={art.thumb}
                  width={art.w}
                  height={art.h}
                  alt={`${art.title}, obra de Florencia Passini`}
                  className="block max-h-[56vh] w-auto max-w-full select-none lg:max-h-[calc(100vh-14rem)]"
                  draggable={false}
                />
                <img
                  ref={full.ref}
                  onLoad={full.onLoad}
                  src={art.image}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full select-none transition-opacity duration-500 ${full.loaded ? 'opacity-100' : 'opacity-0'}`}
                  draggable={false}
                />
              </div>
              <span className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink shadow">
                {zoom ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </span>
            </motion.div>
          )}
        </div>

        {/* Ficha */}
        <motion.aside
          key={`info-${art.slug}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col justify-center lg:col-span-4"
        >
          <p className="eyebrow">
            {SERIES[art.serie]}
            {art.year ? ` · ${art.year}` : ''}
          </p>
          <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">{art.title}</h2>

          <dl className="mt-6 grid grid-cols-2 gap-y-3 border-y border-line py-5 text-sm">
            <dt className="text-ink-soft">Técnica</dt>
            <dd className="font-medium">{art.technique}</dd>
            <dt className="text-ink-soft">Medidas</dt>
            <dd className="font-medium">{art.size}</dd>
            <dt className="text-ink-soft">Estado</dt>
            <dd>
              <StatusTag status={art.status} className="!text-sm !text-ink" />
            </dd>
            {isAvailable && (
              <>
                <dt className="text-ink-soft">Precio</dt>
                <dd className="font-medium">{art.price ?? 'Consultar'}</dd>
              </>
            )}
          </dl>

          <p className="mt-5 leading-relaxed text-ink-soft">{art.description}</p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={whatsappLink(
                isAvailable ? artworkMessage(art) : `¡Hola Flor! Vi "${art.title}" en tu web. ¿Podrías hacer una obra parecida?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <WhatsAppIcon />
              {isAvailable ? 'Consultar por esta obra' : 'Quiero una parecida'}
            </a>
            <div className="flex gap-3">
              <a href={mailto} className="btn-ghost flex-1 !px-4 !py-3">
                <Mail className="h-4 w-4" /> Por mail
              </a>
              <button onClick={copyLink} className="btn-ghost flex-1 !px-4 !py-3">
                {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                {copied ? '¡Copiado!' : 'Copiar link'}
              </button>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-ink-soft">
            Obra original, firmada y con certificado de autenticidad. Envíos a todo el país.
          </p>

          {/* Anterior / siguiente */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-5">
            <button onClick={() => go(prev)} className="group flex items-center gap-2 text-left text-sm cursor-pointer">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="line-clamp-1 text-ink-soft group-hover:text-ink">{prev.title}</span>
            </button>
            <button onClick={() => go(next)} className="group flex items-center gap-2 text-right text-sm cursor-pointer">
              <span className="line-clamp-1 text-ink-soft group-hover:text-ink">{next.title}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
};
