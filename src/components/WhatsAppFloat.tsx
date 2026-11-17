import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { whatsappLink } from '../data/site';
import { WhatsAppIcon } from './ui';

export const WhatsAppFloat: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <AnimatePresence>
    {!hidden && (
      <motion.a
        href={whatsappLink('¡Hola Flor! Te escribo desde tu web.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.9 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#25D366] px-4 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] transition-[gap,padding] duration-300 hover:gap-2.5 hover:pr-5 md:bottom-8 md:right-8"
      >
        <WhatsAppIcon className="h-6 w-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-300 group-hover:max-w-40">
          ¿Hablamos?
        </span>
      </motion.a>
    )}
  </AnimatePresence>
);
