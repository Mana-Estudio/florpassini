import React from 'react';
import { Instagram } from 'lucide-react';
import { SITE, instagramLink, whatsappLink } from '../data/site';
import { Reveal, WhatsAppIcon } from './ui';

/** Llamado final a contacto. */
export const CtaBand: React.FC<{ title?: React.ReactNode; text?: string }> = ({
  title = (
    <>
      ¿Alguna obra <em className="text-paper">te habló?</em>
    </>
  ),
  text = 'Escribime y charlamos: disponibilidad, precios, envíos o una obra pensada para tu espacio.',
}) => (
  <section className="bg-ink text-paper">
    <Reveal className="container-x py-28 text-center sm:py-36">
      <h2 className="mx-auto max-w-3xl text-5xl leading-[1.05] sm:text-7xl">{title}</h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/80">{text}</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappLink('¡Hola Flor! Te escribo desde tu web.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-paper text-ink hover:bg-white"
        >
          <WhatsAppIcon /> Escribime por WhatsApp
        </a>
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn border border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
        >
          <Instagram className="h-5 w-5" /> @{SITE.instagram}
        </a>
      </div>
    </Reveal>
  </section>
);

/** Encabezado de página interna. */
export const PageIntro: React.FC<{ title: React.ReactNode; children?: React.ReactNode }> = ({ title, children }) => (
  <section className="container-x pb-12 pt-32 sm:pt-40">
    <Reveal>
      <h1 className="max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-7xl">{title}</h1>
      {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{children}</div>}
    </Reveal>
  </section>
);
