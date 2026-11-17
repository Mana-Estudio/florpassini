import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { findArtwork } from '../data/artworks';
import { SITE, whatsappLink } from '../data/site';
import { ArtImage, Reveal, WhatsAppIcon } from '../components/ui';
import { CtaBand, PageIntro } from '../components/sections';

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

const IDEAS = ['Medidas aproximadas', 'Fotos del espacio', 'Colores que te gustan (y los que no)', 'Abstracto o figurativo', 'Una obra mía que te inspire', 'Para cuándo la necesitás'];

export const EncargosView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const a = findArtwork('resonancia-coral')!;
  const b = findArtwork('geometria-botanica')!;

  return (
    <>
      <PageIntro
        eyebrow="Encargos"
        title={
          <>
            Una obra que <em className="text-violet">sólo existe para vos</em>
          </>
        }
      >
        Pinto obras por encargo para casas, oficinas, consultorios y regalos especiales. Vos me contás la idea; yo la convierto en una pintura original, única e irrepetible.
      </PageIntro>

      {/* Pasos + imágenes */}
      <section className="container-x grid gap-16 pb-24 pt-6 lg:grid-cols-12 lg:gap-20">
        <ol className="space-y-10 lg:col-span-7">
          {PASOS.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 0.06} className="flex gap-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-violet font-display text-2xl italic text-paper">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h2 className="text-2xl sm:text-3xl">{p.t}</h2>
                <p className="mt-2 max-w-lg text-lg leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a
              href={whatsappLink('¡Hola Flor! Me gustaría encargarte una obra. Te cuento la idea:')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4"
            >
              <WhatsAppIcon /> Contame tu idea
            </a>
          </Reveal>
        </ol>

        <Reveal className="relative hidden lg:col-span-5 lg:block" delay={0.1}>
          <div className="sticky top-32">
            <div className="w-[85%] rotate-2 shadow-[0_30px_60px_-30px_rgba(31,26,23,0.55)]">
              <ArtImage art={a} sizes="35vw" />
            </div>
            <div className="-mt-16 ml-auto w-[60%] -rotate-3 bg-white p-3 shadow-[0_30px_60px_-30px_rgba(31,26,23,0.55)]">
              <ArtImage art={b} sizes="25vw" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Qué necesito saber */}
      <section className="bg-paper-2 py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Para arrancar</p>
            <h2 className="mt-3 text-4xl leading-tight">Lo que me ayuda saber</h2>
            <p className="mt-4 text-ink-soft">No hace falta tenerlo todo claro: lo vamos definiendo juntos.</p>
          </Reveal>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
            {IDEAS.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.04}>
                <span className="inline-block rounded-full border border-ink/10 bg-paper px-5 py-3 text-[15px] font-medium">{t}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Lo que <em className="text-violet">más me preguntan</em>
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

      <CtaBand
        title={
          <>
            Imaginala. <em className="text-coral">Yo la pinto.</em>
          </>
        }
        text="Escribime con tu idea, por más vaga que sea. Te respondo con una propuesta y un presupuesto sin compromiso."
      />
    </>
  );
};
