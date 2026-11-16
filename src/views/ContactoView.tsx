import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Artwork } from '../types';
import { fadeInUp, scaleIn, staggerContainer } from '../utils/animations';

interface ContactoViewProps {
  artworks: Artwork[];
  selectedArtworkTitle?: string;
  onClearSelectedArtwork?: () => void;
}

export const ContactoView: React.FC<ContactoViewProps> = ({
  artworks,
  selectedArtworkTitle,
  onClearSelectedArtwork,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artwork: selectedArtworkTitle || 'Consulta general / Nuevo encargo',
    inquiryType: 'adquisicion',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedArtworkTitle) {
      setFormData((prev) => ({
        ...prev,
        artwork: selectedArtworkTitle,
        message: `Hola Florencia, me gustaría consultar la disponibilidad y condiciones de adquisición para la obra "${selectedArtworkTitle}".`,
      }));
    }
  }, [selectedArtworkTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hola Florencia Passini,%0A%0ASoy ${encodeURIComponent(formData.name || 'un coleccionista')}.%0AMe comunico para consultar sobre: ${encodeURIComponent(formData.artwork)}.%0A${encodeURIComponent(formData.message || 'Me gustaría conocer más detalles y coordinar una visita.')}%0A%0AGracias.`;
    return `https://wa.me/5491158243910?text=${text}`;
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Header Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full px-6 md:px-16 pt-8 pb-12"
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4c0c20]" />
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#534345] font-sans-clean font-medium">
              Atelier • Colección Privada
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1d1b19] font-normal tracking-tight">
            Contacto & Encargos
          </h1>

          <p className="font-editorial italic text-base sm:text-lg text-[#682335]">
            Obras disponibles y proyectos por encargo.
          </p>

          <p className="text-xs sm:text-[13px] text-[#625d59] font-sans-clean leading-relaxed font-light max-w-lg pt-1">
            Para consultas sobre piezas existentes o encargos personalizados, comunicarse directamente por los siguientes canales:
          </p>
        </div>
      </motion.section>

      {/* 3 Direct Communication Channels */}
      <section className="w-full px-6 md:px-16 pb-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-xl mx-auto flex flex-col gap-3"
        >
          {/* WhatsApp Directo */}
          <motion.a
            variants={fadeInUp}
            href="https://wa.me/5491158243910"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 sm:p-5 bg-[#f9f2ef] hover:bg-[#ede7e3] border border-[#e7e1de]/70 transition-all duration-300 rounded-[2px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#534345] group-hover:text-[#4c0c20] transition-colors shadow-2xs">
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#1d1b19] font-sans-clean font-medium">
                  WhatsApp Directo
                </span>
                <span className="text-xs text-[#534345] font-sans-clean font-light tracking-wide">
                  +54 9 11 5824-3910
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#534345] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#4c0c20] transition-all">
              north_east
            </span>
          </motion.a>

          {/* Instagram */}
          <motion.a
            variants={fadeInUp}
            href="https://instagram.com/florenciapassini.art"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 sm:p-5 bg-[#f9f2ef] hover:bg-[#ede7e3] border border-[#e7e1de]/70 transition-all duration-300 rounded-[2px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#534345] group-hover:text-[#4c0c20] transition-colors shadow-2xs">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#1d1b19] font-sans-clean font-medium">
                  Instagram
                </span>
                <span className="text-xs text-[#534345] font-sans-clean font-light tracking-wide">
                  @florenciapassini.art
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#534345] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#4c0c20] transition-all">
              north_east
            </span>
          </motion.a>

          {/* Correo Electrónico */}
          <motion.a
            variants={fadeInUp}
            href="mailto:contacto@florenciapassini.com"
            className="group flex items-center justify-between p-4 sm:p-5 bg-[#f9f2ef] hover:bg-[#ede7e3] border border-[#e7e1de]/70 transition-all duration-300 rounded-[2px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#534345] group-hover:text-[#4c0c20] transition-colors shadow-2xs">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#1d1b19] font-sans-clean font-medium">
                  Correo Electrónico
                </span>
                <span className="text-xs text-[#534345] font-sans-clean font-light tracking-wide">
                  contacto@florenciapassini.com
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#534345] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#4c0c20] transition-all">
              north_east
            </span>
          </motion.a>

          {/* Subtext Location & Inquiries Status */}
          <div className="text-center pt-6 pb-2 flex flex-col gap-1 text-[#625d59]">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#1d1b19] font-sans-clean font-medium">
              Adrogué, Buenos Aires — Argentina
            </span>
            <span className="text-xs text-[#534345] font-sans-clean font-light">
              Actualmente recibiendo consultas para proyectos 2024–2025
            </span>
          </div>
        </motion.div>
      </section>

      {/* Featured Studio Card: Encuentros en el Estudio */}
      <motion.section
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="w-full px-6 md:px-16 pb-12"
      >
        <div className="max-w-3xl mx-auto bg-white border border-[#e7e1de]/80 shadow-[0_16px_40px_-20px_rgba(61,57,53,0.06)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Studio Image */}
          <div className="relative w-full sm:w-1/2 aspect-[4/3] overflow-hidden bg-[#ede7e3] shrink-0">
            <img
              src="/assets/aistudio/Image_10_7cbb3bea.png"
              alt="Atelier de Florencia Passini en Adrogué"
              className="w-full h-full object-cover object-[24%_70%] scale-[2.2] translate-y-[-18%] translate-x-[-15%]"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80';
                e.currentTarget.className = 'w-full h-full object-cover';
              }}
            />
          </div>

          {/* Studio Information */}
          <div className="flex flex-col gap-2.5 sm:w-1/2 text-left">
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#4c0c20] font-sans-clean font-medium">
              Visitas con cita previa
            </span>
            <h2 className="font-editorial text-2xl text-[#1d1b19] font-normal">
              Encuentros en el Estudio
            </h2>
            <p className="text-xs sm:text-[13px] text-[#534345] font-sans-clean leading-relaxed font-light">
              Se coordinan visitas privadas para apreciar piezas de gran formato, texturas al natural y paletas personalizadas para residencias y espacios de diseño.
            </p>
            <div className="pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#4c0c20] hover:text-[#1d1b19] transition-colors font-sans-clean font-medium cursor-pointer"
              >
                <span>Coordinar Visita</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curated Interactive Acquisition & Commission Composer */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="w-full px-6 md:px-16 pt-4"
      >
        <div className="max-w-xl mx-auto bg-[#f9f2ef]/60 border border-[#e7e1de] p-6 sm:p-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#e7e1de]">
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#4c0c20] font-sans-clean font-medium">
              Formulario de Consulta
            </span>
            {selectedArtworkTitle && (
              <span className="text-[10px] text-[#625d59] font-sans-clean">
                Obra seleccionada: <strong className="text-[#1d1b19] font-medium">{selectedArtworkTitle}</strong>
              </span>
            )}
          </div>

          {submitted ? (
            <div className="py-8 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#4c0c20]/10 text-[#4c0c20] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">check</span>
              </div>
              <h3 className="font-editorial text-xl text-[#1d1b19]">
                Consulta Registrada
              </h3>
              <p className="text-xs text-[#534345] max-w-sm font-sans-clean leading-relaxed">
                Gracias por su interés en la obra de Florencia Passini. Le responderemos a la brevedad con la ficha técnica y condiciones de adquisición.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#4c0c20] text-white text-[11px] uppercase tracking-[0.2em] font-sans-clean flex items-center gap-2 hover:bg-[#1d1b19] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                  <span>Enviar por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    if (onClearSelectedArtwork) onClearSelectedArtwork();
                  }}
                  className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[#534345] hover:text-[#1d1b19] transition-colors cursor-pointer"
                >
                  Nueva consulta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] uppercase tracking-[0.18em] text-[#534345] font-sans-clean font-medium">
                  Obra o Tipo de Interés
                </label>
                <select
                  value={formData.artwork}
                  onChange={(e) => setFormData({ ...formData, artwork: e.target.value })}
                  className="w-full bg-white border border-[#e7e1de] px-3.5 py-2.5 text-xs text-[#1d1b19] font-sans-clean focus:outline-none focus:border-[#4c0c20]"
                >
                  <option value="Consulta general / Nuevo encargo">Consulta general / Nuevo encargo a medida</option>
                  {artworks.map((art) => (
                    <option key={art.id} value={art.title}>
                      {art.title} ({art.status} · {art.dimensions})
                    </option>
                  ))}
                  <option value="Visita privada al Atelier">Visita privada al Atelier de Adrogué</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#534345] font-sans-clean font-medium">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Su nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#e7e1de] px-3.5 py-2.5 text-xs text-[#1d1b19] font-sans-clean focus:outline-none focus:border-[#4c0c20]"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-[#534345] font-sans-clean font-medium">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@dominio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#e7e1de] px-3.5 py-2.5 text-xs text-[#1d1b19] font-sans-clean focus:outline-none focus:border-[#4c0c20]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] uppercase tracking-[0.18em] text-[#534345] font-sans-clean font-medium">
                  Teléfono / WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  placeholder="+54 9 11 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-[#e7e1de] px-3.5 py-2.5 text-xs text-[#1d1b19] font-sans-clean focus:outline-none focus:border-[#4c0c20]"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] uppercase tracking-[0.18em] text-[#534345] font-sans-clean font-medium">
                  Mensaje o Especificación del Espacio
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalles sobre el espacio, dimensiones deseadas o consulta sobre cotización..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#e7e1de] px-3.5 py-2.5 text-xs text-[#1d1b19] font-sans-clean focus:outline-none focus:border-[#4c0c20] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#4c0c20] text-white hover:bg-[#1d1b19] text-[11px] uppercase tracking-[0.2em] font-sans-clean font-medium transition-colors cursor-pointer"
                >
                  Enviar Mensaje al Atelier
                </button>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.16em] text-[#4c0c20] hover:text-[#1d1b19] flex items-center gap-1.5 transition-colors font-sans-clean cursor-pointer"
                >
                  <span>O consultar por WhatsApp</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </motion.section>
    </div>
  );
};
