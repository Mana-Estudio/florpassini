import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { findArtwork } from '../data/artworks';
import { SITE, whatsappLink } from '../data/site';
import { ArtImage, Reveal, WhatsAppIcon } from '../components/ui';
import { CtaBand, PageIntro } from '../components/sections';
import { PaletteBuilder } from '../components/PaletteBuilder';

const PASOS = [
  {
    t: 'Me escribís',
    d: 'Contame qué te imaginás: temática, colores, sensación. Si podés, mandame fotos del lugar donde va a ir y las medidas de la pared.',
  },
  {
    t: 'Armamos la propuesta',
    d: 'Te propongo tamaño, paleta y técnica, y te paso el presupuesto y los tiempos. Cuando estés de acuerdo, arranco.',
  },
  {
    t: 'Pinto (y te muestro)',
    d: 'Te mando fotos del proceso para que veas cómo va creciendo la obra. Es la parte más linda.',
  },
  {
    t: 'Llega a tu espacio',
    d: 'La obra se entrega firmada, con certificado de autenticidad y embalada con cuidado. Envíos a todo el país.',
  },
];

export const EncargosView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const a = findArtwork('resonancia-coral')!;

  return (
    <>
      <PageIntro
        title={
          <>
            Una obra que <em>sólo existe para vos</em>
          </>
        }
      >
        Pinto por encargo para casas, oficinas y regalos especiales. Vos me contás la idea; yo la convierto en una obra original.
      </PageIntro>

      {/* Imagen protagonista */}
      <Reveal className="mx-auto max-w-7xl sm:px-8 lg:px-12">
        <div className="h-[55vh] min-h-[320px] overflow-hidden sm:h-[70vh]">
          <ArtImage art={a} sizes="100vw" className="!h-full object-cover" />
        </div>
      </Reveal>

      {/* Cómo funciona */}
      <section className="container-x py-24 sm:py-32">
        <Reveal>
          <h2 className="text-5xl sm:text-6xl">
            Cómo <em>funciona</em>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {PASOS.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <span className="font-display text-5xl font-light text-ink/35">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-3xl">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.d}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14">
          <a
            href={whatsappLink('¡Hola Flor! Me gustaría encargarte una obra. Te cuento la idea:')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon /> Contame tu idea
          </a>
        </Reveal>
      </section>

      {/* Preguntas frecuentes */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-4xl leading-tight sm:text-5xl">
              Lo que <em>más me preguntan</em>
            </h2>
            <p className="mt-4 text-ink-soft">
              ¿Otra duda? Escribime a{' '}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-violet underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </p>
          </Reveal>
          <div className="divide-y divide-line border-y border-line lg:col-span-8">
            {SITE.faq.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left cursor-pointer"
                  >
                    <span className="font-display text-xl sm:text-2xl">{f.q}</span>
                    <Plus className={`h-6 w-6 shrink-0 text-violet transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-lg leading-relaxed text-ink-soft">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspiración: armá tu paleta (secundario) */}
      <section className="bg-paper-2 py-24 sm:py-32">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="text-4xl leading-tight sm:text-5xl">
              ¿Necesitás <em>inspiración?</em>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Elegí colores de mis cuadros: te muestro obras parecidas y me mandás la idea en un toque.
            </p>
          </Reveal>
          <PaletteBuilder />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Imaginala. <em className="text-paper">Yo la pinto.</em>
          </>
        }
        text="Escribime con tu idea, por más vaga que sea. Te respondo con una propuesta y un presupuesto sin compromiso."
      />
    </>
  );
};
