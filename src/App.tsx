import React, { useEffect, useRef } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Page } from './types';
import { findArtwork } from './data/artworks';
import { interceptLinks, useRoute } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ArtworkModal } from './components/ArtworkModal';
import { HomeView } from './views/HomeView';
import { ObrasView } from './views/ObrasView';
import { SobreMiView } from './views/SobreMiView';
import { EncargosView } from './views/EncargosView';
import { ContactoView } from './views/ContactoView';

const TITLES: Record<Page, string> = {
  inicio: 'Florencia Passini · Pintora',
  obras: 'Obras · Florencia Passini',
  'sobre-mi': 'Sobre mí · Florencia Passini',
  encargos: 'Encargos · Florencia Passini',
  contacto: 'Contacto · Florencia Passini',
};

export default function App() {
  const route = useRoute();
  const openArt = route.page === 'obras' ? findArtwork(route.slug) : undefined;
  const lastPage = useRef<Page | null>(null);

  useEffect(() => interceptLinks(), []);

  // Volver arriba sólo al cambiar de página (no al abrir/cerrar una obra)
  useEffect(() => {
    if (lastPage.current !== null && lastPage.current !== route.page) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    lastPage.current = route.page;
  }, [route.page]);

  useEffect(() => {
    document.title = openArt ? `${openArt.title} · Florencia Passini` : TITLES[route.page];
  }, [route.page, openArt]);

  let view: React.ReactNode;
  switch (route.page) {
    case 'obras':
      view = <ObrasView />;
      break;
    case 'sobre-mi':
      view = <SobreMiView />;
      break;
    case 'encargos':
      view = <EncargosView />;
      break;
    case 'contacto':
      view = <ContactoView slug={route.slug} />;
      break;
    default:
      view = <HomeView />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenido"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('contenido')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <Header page={route.page} />

      <main id="contenido" tabIndex={-1} className="min-h-screen outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={route.page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {view}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>{openArt && <ArtworkModal key="modal" art={openArt} />}</AnimatePresence>

      <WhatsAppFloat hidden={!!openArt || route.page === 'contacto'} />
    </MotionConfig>
  );
}
