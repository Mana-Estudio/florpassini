import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Instagram, Menu, X } from 'lucide-react';
import { Page } from '../types';
import { SITE, instagramLink, whatsappLink } from '../data/site';
import { href } from '../lib/router';
import { WhatsAppIcon } from './ui';

export const NAV: { page: Page; label: string }[] = [
  { page: 'obras', label: 'Obras' },
  { page: 'sobre-mi', label: 'Sobre mí' },
  { page: 'encargos', label: 'Encargos' },
  { page: 'contacto', label: 'Contacto' },
];

export const Header: React.FC<{ page: Page }> = ({ page }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [page]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open ? 'bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between">
        <a href={href()} className="group flex items-baseline gap-1.5" aria-label="Inicio">
          <span className="font-display text-2xl tracking-tight text-ink">Florencia</span>
          <span className="font-display text-2xl tracking-tight text-violet">Passini</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = page === item.page;
            return (
              <a
                key={item.page}
                href={href(item.page)}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                  active ? 'text-violet' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-coral"
                  />
                )}
              </a>
            );
          })}
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="ml-2 grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink md:hidden cursor-pointer"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper md:hidden"
          >
            <nav className="container-x flex flex-col pt-6" aria-label="Principal mobile">
              {[{ page: 'inicio' as Page, label: 'Inicio' }, ...NAV].map((item, i) => (
                <motion.a
                  key={item.page}
                  href={href(item.page === 'inicio' ? '' : item.page)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className={`border-b border-line py-4 font-display text-4xl ${
                    page === item.page ? 'text-violet' : 'text-ink'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-10 flex flex-col gap-3">
                <a href={whatsappLink('¡Hola Flor!')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <WhatsAppIcon /> Escribime por WhatsApp
                </a>
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Instagram className="h-5 w-5" /> @{SITE.instagram}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
