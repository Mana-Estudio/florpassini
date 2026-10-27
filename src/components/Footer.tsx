import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#ffffff]/60 border-t border-[#e7e1de]/50 pt-16 pb-12 mt-auto">
      <div className="w-full px-6 md:px-16 max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-6">
        {/* Social and Communication Icons */}
        <div className="flex items-center gap-6 text-[#534345]">
          <a
            href="https://instagram.com/florenciapassini.art"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Florencia Passini"
            className="p-1.5 text-[#534345] hover:text-[#4c0c20] transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </a>
          <span className="w-1 h-1 rounded-full bg-[#ccc5bf]" />
          <a
            href="https://wa.me/5491158243910"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp directo del Atelier"
            className="p-1.5 text-[#534345] hover:text-[#4c0c20] transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          </a>
        </div>

        <p className="text-[11px] uppercase tracking-[0.22em] text-[#534345] font-sans-clean font-medium">
          Adrogué, Buenos Aires
        </p>

        <p className="text-[12px] text-[#625d59] font-light font-sans-clean">
          © Florencia Passini. Obra pictórica original.
        </p>
      </div>
    </footer>
  );
};
