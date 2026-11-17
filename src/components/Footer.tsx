import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { SITE, instagramLink, whatsappLink } from '../data/site';
import { href } from '../lib/router';
import { NAV } from './Header';
import { WhatsAppIcon } from './ui';

export const Footer: React.FC = () => (
  <footer className="border-t border-line bg-paper-2">
    <div className="container-x grid gap-12 py-16 md:grid-cols-12">
      <div className="md:col-span-5">
        <a href={href()} className="inline-flex items-baseline gap-1.5">
          <span className="font-display text-3xl text-ink">Florencia</span>
          <span className="font-display text-3xl italic text-violet">Passini</span>
        </a>
        <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
          Pintura original al óleo y técnica mixta. Obras disponibles, encargos a medida y envíos a todo el país.
        </p>
        <p className="mt-4 text-sm font-medium text-ink">{SITE.location}</p>
      </div>

      <nav className="md:col-span-3" aria-label="Pie de página">
        <p className="eyebrow mb-4">Navegar</p>
        <ul className="space-y-2.5">
          {NAV.map((n) => (
            <li key={n.page}>
              <a href={href(n.page)} className="text-ink hover:text-violet">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:col-span-4">
        <p className="eyebrow mb-4">Hablemos</p>
        <ul className="space-y-2.5">
          <li>
            <a href={whatsappLink('¡Hola Flor!')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ink hover:text-violet">
              <WhatsAppIcon className="h-4 w-4" /> {SITE.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ink hover:text-violet">
              <Instagram className="h-4 w-4" /> @{SITE.instagram}
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 break-all text-ink hover:text-violet">
              <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-line">
      <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-soft sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Florencia Passini. Todas las obras y fotografías son de la artista.</p>
        <p>Hecho con color en el sur de Buenos Aires.</p>
      </div>
    </div>
  </footer>
);
