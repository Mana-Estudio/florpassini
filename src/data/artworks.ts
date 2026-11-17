import { Artwork } from '../types';

const img = (slug: string) => ({
  image: `/images/obras/${slug}.jpg`,
  thumb: `/images/obras/${slug}-sm.jpg`,
});

/**
 * Catálogo de obras. El orden de este array es el orden en que se muestran.
 * Para sumar una obra: subir `slug.jpg` (≈2000px) y `slug-sm.jpg` (≈900px) a /public/images/obras
 * y agregar un objeto acá con el ancho/alto en px de la imagen grande y su color promedio.
 * TODO: confirmar con Flor año, medidas (ancho × alto), técnica, estado y precio de cada obra.
 */
export const ARTWORKS: Artwork[] = [
  {
    slug: 'eclosion-vital',
    title: 'Eclosión Vital',
    serie: 'abstractos',
    technique: 'Óleo sobre lienzo',
    size: '90 × 90 cm',
    status: 'disponible',
    description:
      'Una explosión de color que sube desde el centro: verdes esmeralda, violetas profundos y naranjas fuego que se empujan entre sí.',
    ...img('eclosion-vital'),
    color: '#7a7d6e',
    w: 952,
    h: 960,
    featured: true,
  },
  {
    slug: 'el-vuelo-silencioso',
    title: 'El Vuelo Silencioso',
    serie: 'naturaleza',
    technique: 'Óleo sobre lienzo',
    size: '70 × 100 cm',
    status: 'disponible',
    description:
      'Un colibrí en reposo, con la iridiscencia violeta y verde lima de sus plumas pintada casi una por una, sobre un fondo vegetal fuera de foco.',
    ...img('el-vuelo-silencioso'),
    color: '#848f30',
    w: 1399,
    h: 2000,
    featured: true,
  },
  {
    slug: 'resonancia-coral',
    title: 'Resonancia Coral',
    serie: 'abstractos',
    technique: 'Óleo sobre lienzo',
    size: '120 × 100 cm',
    status: 'disponible',
    description:
      'Capas de coral, rosa y magenta que se mueven como un atardecer. Una obra cálida, de gran formato, que llena de luz cualquier pared.',
    ...img('resonancia-coral'),
    color: '#cb7066',
    w: 2000,
    h: 1667,
    featured: true,
  },
  {
    slug: 'geometria-botanica',
    title: 'Geometría Botánica',
    serie: 'naturaleza',
    technique: 'Óleo sobre lienzo',
    size: '100 × 100 cm',
    status: 'disponible',
    description:
      'Echeverias vistas desde arriba: las espirales perfectas de la naturaleza en verde jade, azul y púrpura aterciopelado.',
    ...img('geometria-botanica'),
    color: '#5b5f67',
    w: 2000,
    h: 2000,
    featured: true,
  },
  {
    slug: 'nucleo-mineral',
    title: 'Núcleo Mineral',
    serie: 'abstractos',
    technique: 'Técnica mixta sobre tela',
    size: '100 × 100 cm',
    status: 'disponible',
    description:
      'Una estructura que se abre en cruz, inspirada en vetas minerales: turquesa, arena cálida y trazos de negro carbón.',
    ...img('nucleo-mineral'),
    color: '#8c9992',
    w: 960,
    h: 954,
    featured: true,
  },
  {
    slug: 'metamorfosis',
    title: 'Metamorfosis',
    serie: 'naturaleza',
    technique: 'Óleo sobre lienzo',
    size: '100 × 80 cm',
    status: 'disponible',
    description:
      'El aleteo de una mariposa en violeta, ámbar y blanco sobre un fondo terracota suave. Gesto rápido, liviano, casi en movimiento.',
    ...img('metamorfosis'),
    color: '#9f8982',
    w: 2000,
    h: 1539,
    featured: true,
  },
  {
    slug: 'bruma-y-marea',
    title: 'Bruma y Marea',
    serie: 'abstractos',
    technique: 'Técnica mixta',
    size: '110 × 110 cm',
    status: 'disponible',
    description:
      'Una atmósfera neblinosa de grises suaves, blanco cal y toques de verde agua. La obra más silenciosa de la serie.',
    ...img('bruma-y-marea'),
    color: '#85827a',
    w: 2000,
    h: 2000,
  },
];

export const findArtwork = (slug?: string) => ARTWORKS.find((a) => a.slug === slug);

export const artworkMessage = (a: { title: string }) =>
  `¡Hola Flor! Vi tu obra "${a.title}" en la web y me gustaría saber más.`;
