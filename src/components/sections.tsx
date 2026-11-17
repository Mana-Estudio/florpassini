import React from 'react';
import { Instagram } from 'lucide-react';
import { SITE, instagramLink, whatsappLink } from '../data/site';
import { Reveal, WhatsAppIcon } from './ui';

const MARQUEE = ['Obra original', 'Óleo y técnica mixta', 'Encargos a medida', 'Envíos a todo el país', 'Hecho a mano en Adrogué'];
const DOTS = ['bg-coral', 'bg-violet', 'bg-leaf', 'bg-sea', 'bg-coral'];

/** Cinta de texto en movimiento. */
export const Marquee: React.FC = () => {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {MARQUEE.map((t, i) => (
        <span key={t} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-2xl italic text-ink sm:text-3xl">{t}</span>
          <span className={`h-2.5 w-2.5 rounded-full ${DOTS[i]}`} />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-line bg-paper py-5">
      <div className="flex w-max animate-marquee">
        {row()}
        {row(true)}
      </div>
    </div>
  );
};

/** Llamado final a contacto, con fondo violeta. */
export const CtaBand: React.FC<{ title?: React.ReactNode; text?: string }> = ({
  title = (
    <>
      ¿Alguna obra <em className="text-coral">te habló?</em>
    </>
  ),
  text = 'Escribime y charlamos: disponibilidad, precios, envíos o una obra pensada para tu espacio.',
}) => (
  <section className="relative overflow-hidden bg-violet-deep text-paper">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-coral/30 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-sea/25 blur-3xl"
    />
    <Reveal className="container-x relative py-24 text-center sm:py-28">
      <h2 className="mx-auto max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/80">{text}</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappLink('¡Hola Flor! Te escribo desde tu web.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-paper text-violet-deep hover:-translate-y-0.5 hover:bg-white"
        >
          <WhatsAppIcon /> Escribime por WhatsApp
        </a>
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn border border-paper/30 text-paper hover:border-paper hover:bg-paper/10"
        >
          <Instagram className="h-5 w-5" /> @{SITE.instagram}
        </a>
      </div>
    </Reveal>
  </section>
);

/** Encabezado de página interna. */
export const PageIntro: React.FC<{ eyebrow: string; title: React.ReactNode; children?: React.ReactNode }> = ({
  eyebrow,
  title,
  children,
}) => (
  <section className="container-x pb-12 pt-32 sm:pt-40">
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-5xl leading-[1.02] tracking-tight sm:text-7xl">{title}</h1>
      {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{children}</div>}
    </Reveal>
  </section>
);
