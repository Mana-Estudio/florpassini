import React, { useState } from 'react';
import { TabType } from '../types';

interface SobreMiViewProps {
  onNavigate: (tab: TabType) => void;
}

export const SobreMiView: React.FC<SobreMiViewProps> = ({ onNavigate }) => {
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null);

  const processElements = [
    {
      id: 1,
      num: '01',
      title: 'Materia',
      subtitle: 'Pigmentos terrosos y lino puro',
      description: 'Capas sucesivas de yeso, polvo de mármol y pigmentos orgánicos molidos a mano, sedimentados sobre fibras de lino crudo sin tratar para permitir la respiración del soporte.',
      imgSrc: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      fallbackColor: 'from-[#e9e1db] to-[#d8c1c4]',
    },
    {
      id: 2,
      num: '02',
      title: 'Luz',
      subtitle: 'La quietud de la mañana',
      description: 'El atelier en Adrogué recibe luz natural rasante que define la tridimensionalidad de los relieves y la calidez mate de las veladuras.',
      imgSrc: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      fallbackColor: 'from-[#f3ede9] to-[#e7e1de]',
    },
    {
      id: 3,
      num: '03',
      title: 'Gesto',
      subtitle: 'El pulso de la espátula',
      description: 'Una tensión controlada entre el accidente calculado y la pausa reflexiva. El trazo no busca representar, sino dejar huella de una presencia atenta.',
      imgSrc: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80',
      fallbackColor: 'from-[#e7e1de] to-[#ccc5bf]',
    },
  ];

  return (
    <div className="flex flex-col w-full animate-fadeIn pb-16">
      {/* Main Biography Section */}
      <section className="w-full px-6 md:px-16 pt-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Documentary Artist Portrait */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="relative w-full overflow-hidden bg-[#ede7e3] shadow-[0_16px_40px_-16px_rgba(61,57,53,0.08)]">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {/* Artist portrait from local mock asset crop / documentary styling */}
                <img
                  src="/assets/aistudio/Image_7_0e0f30aa.png"
                  alt="Florencia Passini en pleno proceso de dibujo en su atelier de Adrogué"
                  className="w-full h-full object-cover object-[15%_12%] scale-[1.95] translate-y-[-10%] translate-x-[-12%] filter grayscale contrast-[1.05]"
                  onError={(e) => {
                    // Fallback to stylized high-contrast documentary photo
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    e.currentTarget.className = 'w-full h-full object-cover filter grayscale';
                  }}
                />
                <div className="absolute inset-0 bg-[#4c0c20]/5 pointer-events-none" />
              </div>
            </div>

            {/* Portrait Captions */}
            <div className="flex items-center justify-between px-1 text-[#534345]">
              <span className="text-[9px] uppercase tracking-[0.24em] font-sans-clean">
                01 / Retrato en proceso
              </span>
              <div className="flex items-center gap-1.5 text-right">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4c0c20]" />
                <span className="text-[9px] uppercase tracking-[0.22em] font-sans-clean font-medium">
                  Adrogué · 2024 / Luz de mañana
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Essay & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-[0.26em] text-[#4c0c20] font-sans-clean font-medium">
                Biografía • Introspección
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1d1b19] font-normal tracking-tight">
                Florencia Passini
              </h1>
            </div>

            {/* Featured Quote Box */}
            <div className="bg-[#f9f2ef] p-6 sm:p-7 border border-[#e7e1de]/60 rounded-[2px] shadow-sm">
              <blockquote className="font-editorial text-lg sm:text-xl text-[#1d1b19] italic leading-relaxed font-normal">
                “Pinto desde la búsqueda del sosiego; capas de materia que registran el paso calmo del tiempo y la resonancia sutil del entorno.”
              </blockquote>
            </div>

            {/* Biography Prose */}
            <div className="flex flex-col gap-4 text-xs sm:text-[14px] text-[#534345] leading-relaxed font-sans-clean font-light">
              <p>
                Nacida y radicada en Adrogué, provincia de Buenos Aires, Florencia Passini desarrolla una práctica pictórica centrada en el óleo, el lino crudo y pigmentos terrosos. Su trabajo investiga la abstracción orgánica, la arquitectura del paisaje interior y el vacío como espacio de resonancia.
              </p>
              <p>
                Cada pieza es única e irrepetible, concebida en la quietud de su espacio personal a través de un proceso pausado de superposición de veladuras y texturas matéricas.
              </p>
            </div>

            {/* Process Sequence Grid */}
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#e7e1de]/50 pb-2">
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#1d1b19] font-sans-clean font-medium">
                  Elementos del Proceso
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#625d59] font-sans-clean">
                  Secuencia • 01—03
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
                {processElements.map((elem) => (
                  <button
                    key={elem.id}
                    onClick={() => setSelectedProcess(selectedProcess === elem.id ? null : elem.id)}
                    type="button"
                    className="group flex flex-col text-left cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-[#ede7e3] shadow-sm ring-1 ring-[#e7e1de]/60">
                      <img
                        src={elem.imgSrc}
                        alt={elem.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.85]"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between px-0.5">
                      <span className="font-editorial text-sm text-[#1d1b19] italic group-hover:text-[#4c0c20] transition-colors">
                        {elem.title}
                      </span>
                      <span className="text-[9px] text-[#625d59] font-sans-clean">
                        {elem.num}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Expandable Process Detail Note */}
              {selectedProcess !== null && (
                <div className="mt-2 p-4 bg-[#f9f2ef] border border-[#e7e1de] text-xs text-[#534345] leading-relaxed animate-fadeIn">
                  <div className="flex items-center justify-between font-medium text-[#1d1b19] mb-1">
                    <span className="font-editorial italic text-sm">
                      {processElements[selectedProcess - 1].title} — {processElements[selectedProcess - 1].subtitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProcess(null)}
                      className="text-[#625d59] hover:text-[#1d1b19]"
                    >
                      ✕
                    </button>
                  </div>
                  <p>{processElements[selectedProcess - 1].description}</p>
                </div>
              )}
            </div>

            {/* Actions: Recorrer Obras & Conversar sobre un encargo */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => onNavigate('obras')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#4c0c20] text-white hover:bg-[#1d1b19] transition-colors duration-300 text-[11px] uppercase tracking-[0.2em] font-sans-clean font-medium cursor-pointer"
              >
                <span>Recorrer Obras</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contacto')}
                className="group inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#1d1b19] hover:text-[#4c0c20] transition-colors duration-300 py-2 cursor-pointer"
              >
                <span>Conversar sobre un encargo</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Atelier Footnote Banner */}
      <section className="w-full px-6 md:px-16 pt-4">
        <div className="max-w-7xl mx-auto bg-[#f9f2ef]/70 border border-[#e7e1de]/60 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-1.5 max-w-md">
            <span className="text-[9px] uppercase tracking-[0.26em] text-[#534345] font-sans-clean font-medium">
              Espacio de Trabajo
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1d1b19] italic font-normal">
              El ritmo lento de la materia.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-[#534345]">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#625d59] font-sans-clean font-medium">
                Técnica Habitual
              </span>
              <span className="text-xs sm:text-[13px] text-[#1d1b19] font-sans-clean">
                Óleo sobre lino crudo
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#625d59] font-sans-clean font-medium">
                Localización
              </span>
              <span className="text-xs sm:text-[13px] text-[#1d1b19] font-sans-clean">
                Zona Sur, Buenos Aires
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
