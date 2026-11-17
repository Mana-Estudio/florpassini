/**
 * Toda la información editable del sitio vive acá.
 * Los campos marcados con TODO hay que confirmarlos con Florencia antes de publicar.
 */

export const SITE = {
  name: 'Florencia Passini',
  shortName: 'Flor Passini',
  role: 'Pintora',
  location: 'Adrogué, Buenos Aires',

  /**
   * Dominio final del sitio, sin barra al final (ej: 'https://florpassini.com.ar').
   * TODO: completarlo cuando esté el dominio. Se usa para las vistas previas al compartir
   * (WhatsApp/Instagram necesitan URLs absolutas), el sitemap y Google.
   * También se puede pasar al build con la variable de entorno SITE_URL.
   */
  url: '',

  whatsapp: '5491161458476',
  whatsappDisplay: '+54 9 11 6145-8476',
  instagram: 'flor.passini.arte',
  // TODO: confirmar mail real
  email: 'contacto@florenciapassini.com',

  intro:
    'Pinto abstracciones que estallan de color y escenas de la naturaleza que me frenan el paso: colibríes, mariposas, suculentas. Cada obra es única y está hecha a mano.',

  statement: 'Pinto lo que me emociona del color: cómo vibra, cómo choca, cómo se calma.',

  // TODO: reemplazar por la bio real de Flor (formación, desde cuándo pinta, etc.)
  bio: [
    'Soy Florencia Passini, pintora de Adrogué, en el sur del Gran Buenos Aires. Trabajo sobre todo con óleo y técnica mixta, y mi obra se mueve entre dos mundos que para mí son el mismo: la abstracción y la naturaleza.',
    'En las abstractas dejo que el color mande: capas, veladuras, espátula y mucha prueba y error hasta que el cuadro respira. En las de naturaleza me detengo en los detalles: las plumas de un colibrí, los pétalos carnosos de una suculenta, el ala de una mariposa.',
    'Cada obra es única e irrepetible. Me encanta pensar en el lugar donde va a vivir, por eso también pinto por encargo.',
  ],

  /**
   * Muestras, premios, formación. Si queda vacío, la sección no se muestra.
   * TODO: pedirle a Flor su trayectoria.
   * Ejemplo: { year: '2025', title: 'Muestra colectiva "Color Sur"', place: 'Casa de la Cultura, Adrogué' }
   */
  trayectoria: [] as { year: string; title: string; place?: string }[],

  /** TODO: confirmar condiciones reales (tiempos, precios, envíos) */
  faq: [
    {
      q: '¿Cuánto tarda un encargo?',
      a: 'Depende del tamaño y la técnica, pero en general entre 3 y 6 semanas desde que definimos la idea. Te voy mandando avances para que veas cómo crece la obra.',
    },
    {
      q: '¿Cómo se define el precio?',
      a: 'Según el tamaño, la técnica y la complejidad. Contame qué tenés en mente y te paso un presupuesto sin compromiso.',
    },
    {
      q: '¿Hacés envíos?',
      a: 'Sí. Coordinamos envíos a todo el país con embalaje cuidado. En zona sur de Buenos Aires también podemos coordinar la entrega en mano.',
    },
    {
      q: '¿Las obras vienen con certificado?',
      a: 'Sí, cada obra original se entrega firmada y con certificado de autenticidad.',
    },
  ],
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const instagramLink = `https://instagram.com/${SITE.instagram}`;

export const SERIES: Record<string, string> = {
  abstractos: 'Abstractos',
  naturaleza: 'Naturaleza',
};

export const ESTADOS: Record<string, string> = {
  disponible: 'Disponible',
  reservada: 'Reservada',
  vendida: 'Vendida',
};
