import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppFloatProps {
  isHidden?: boolean;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ isHidden = false }) => {
  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="https://wa.me/5491158243910"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp"
            className="
              group flex items-center justify-center
              w-12 h-12 md:w-14 md:h-14
              rounded-full bg-[#4c0c20] text-white
              shadow-[0_8px_30px_-10px_rgba(76,12,32,0.3)]
              hover:bg-[#1d1b19] hover:shadow-[0_12px_40px_-8px_rgba(29,27,25,0.35)]
              transition-[background-color,box-shadow] duration-300
              overflow-hidden cursor-pointer
              hover:w-auto hover:rounded-[28px] hover:px-5
            "
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              scale: {
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeInOut',
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined text-[22px] md:text-[24px] shrink-0">
              chat_bubble
            </span>
            <span
              className="
                max-w-0 overflow-hidden opacity-0
                group-hover:max-w-[100px] group-hover:opacity-100
                group-hover:ml-2.5
                transition-all duration-300 ease-out
                text-[11px] tracking-[0.15em] uppercase font-sans-clean font-medium whitespace-nowrap
              "
            >
              WhatsApp
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
