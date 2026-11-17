import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Instagram, Mail, MapPin, Send } from 'lucide-react';
import { ARTWORKS, findArtwork } from '../data/artworks';
import { SITE, instagramLink, whatsappLink } from '../data/site';
import { Reveal, WhatsAppIcon } from '../components/ui';
import { PageIntro } from '../components/sections';

const MOTIVOS = ['Quiero comprar una obra', 'Quiero encargar una obra', 'Otra consulta'];

export const ContactoView: React.FC<{ slug?: string }> = ({ slug }) => {
  const preselected = findArtwork(slug);
  const [form, setForm] = useState({
    name: '',
    motivo: preselected ? MOTIVOS[0] : MOTIVOS[1],
    obra: preselected?.title ?? '',
    message: '',
  });

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, motivo: MOTIVOS[0], obra: preselected.title }));
  }, [preselected]);

  const buildMessage = () =>
    [
      `¡Hola Flor! Soy ${form.name.trim() || '…'}.`,
      `${form.motivo}${form.motivo === MOTIVOS[0] && form.obra ? `: "${form.obra}"` : ''}.`,
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(buildMessage()), '_blank', 'noopener,noreferrer');
  };

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(form.motivo)}&body=${encodeURIComponent(buildMessage())}`;

  const channels = [
    { href: whatsappLink('¡Hola Flor!'), icon: <WhatsAppIcon className="h-6 w-6" />, label: 'WhatsApp', value: SITE.whatsappDisplay, color: 'border border-ink/20 text-ink', external: true },
    { href: instagramLink, icon: <Instagram className="h-6 w-6" />, label: 'Instagram', value: `@${SITE.instagram}`, color: 'border border-ink/20 text-ink', external: true },
    { href: `mailto:${SITE.email}`, icon: <Mail className="h-6 w-6" />, label: 'Mail', value: SITE.email, color: 'border border-ink/20 text-ink', external: false },
  ];

  return (
    <>
      <PageIntro
        title={
          <>
            Hablemos de <em>arte</em>
          </>
        }
      >
        Consultas por obras o encargos. La forma más rápida es WhatsApp, pero elegí la que te quede más cómoda.
      </PageIntro>

      <section className="container-x grid gap-14 pb-28 lg:grid-cols-12 lg:gap-16">
        {/* Canales */}
        <div className="border-t border-line lg:col-span-5">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-5 border-b border-line py-5 transition-colors hover:border-ink/40"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${c.color}`}>{c.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-ink-soft">{c.label}</span>
                  <span className="block truncate text-lg">{c.value}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet" />
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="flex items-start gap-4 pt-6">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
            <p className="leading-relaxed text-ink-soft">
              <span className="font-normal text-ink">Desde {SITE.location}.</span> Envíos a todo el país.
            </p>
          </Reveal>
        </div>

        {/* Formulario → WhatsApp / mail */}
        <Reveal className="lg:col-span-7" delay={0.1}>
          <form onSubmit={onSubmit} className="bg-paper-2 p-6 sm:p-10">
            <h2 className="text-3xl">Dejame tu mensaje</h2>
            <p className="mt-2 text-ink-soft">Completá lo que quieras y se arma el mensaje solo.</p>

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-semibold">¿Sobre qué querés hablar?</legend>
              <div className="flex flex-wrap gap-2">
                {MOTIVOS.map((m) => (
                  <label
                    key={m}
                    className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                      form.motivo === m ? 'border-violet bg-violet text-paper' : 'border-line text-ink-soft hover:border-ink/30 hover:text-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name="motivo"
                      value={m}
                      checked={form.motivo === m}
                      onChange={() => setForm({ ...form, motivo: m })}
                      className="sr-only"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Tu nombre</span>
                <input
                  required
                  autoComplete="given-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="¿Cómo te llamás?"
                  className="field"
                />
              </label>
              {form.motivo === MOTIVOS[0] && (
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Obra</span>
                  <select value={form.obra} onChange={(e) => setForm({ ...form, obra: e.target.value })} className="field">
                    <option value="">Elegí una obra</option>
                    {ARTWORKS.filter((a) => a.status === 'disponible').map((a) => (
                      <option key={a.slug} value={a.title}>
                        {a.title} · {a.size}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold">Mensaje</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={
                  form.motivo === MOTIVOS[1]
                    ? 'Contame la idea: medidas, colores, dónde va a ir…'
                    : 'Escribí lo que quieras contarme'
                }
                className="field resize-none"
              />
            </label>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn-primary">
                <WhatsAppIcon /> Enviar por WhatsApp
              </button>
              <a href={mailto} className="btn-ghost">
                <Send className="h-4 w-4" /> Enviar por mail
              </a>
            </div>
            <p className="mt-4 text-xs text-ink-soft">Se abre WhatsApp o tu correo con el mensaje listo para enviar.</p>
          </form>
        </Reveal>
      </section>
    </>
  );
};
