import { Artwork } from '../types';

const img = (slug: string) => ({
  image: `/images/obras/${slug}.jpg`,
  thumb: `/images/obras/${slug}-sm.jpg`,
});

/**
 * Catálogo de obras. El orden de este array es el orden en que se muestran.
 * Para sumar una obra: subir `slug.jpg` (≈2000px) y `slug-sm.jpg` (≈900px) a /public/images/obras
 * y agregar un objeto acá con el ancho/alto en px de la imagen grande, su color promedio y su paleta.
 * Los nombres de los colores de cada paleta se pueden cambiar libremente.
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
    palette: [
      { name: 'Mandarina', hex: '#f4b05c' },
      { name: 'Menta', hex: '#7ae1ba' },
      { name: 'Violeta profundo', hex: '#5e3a86' },
      { name: 'Azul noche', hex: '#1e4157' },
      { name: 'Limón', hex: '#ebec56' },
    ],
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
    palette: [
      { name: 'Verde monte', hex: '#325e0e' },
      { name: 'Verde colibrí', hex: '#769d08' },
      { name: 'Lima', hex: '#bacb1a' },
      { name: 'Paja', hex: '#cfbe6d' },
      { name: 'Violeta pluma', hex: '#5b3a78' },
    ],
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
    palette: [
      { name: 'Coral', hex: '#de6266' },
      { name: 'Magenta', hex: '#c2386f' },
      { name: 'Ladrillo', hex: '#ad443f' },
      { name: 'Salmón', hex: '#df9589' },
      { name: 'Crema', hex: '#f1d5c4' },
    ],
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
    palette: [
      { name: 'Jade', hex: '#49858c' },
      { name: 'Ciruela', hex: '#522741' },
      { name: 'Malva', hex: '#9c6a8a' },
      { name: 'Salvia', hex: '#a6b673' },
      { name: 'Lavanda oscura', hex: '#6f4b71' },
    ],
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
    palette: [
      { name: 'Turquesa', hex: '#1d728f' },
      { name: 'Arena', hex: '#b7a592' },
      { name: 'Cal', hex: '#efe5e0' },
      { name: 'Verde agua', hex: '#7cb4ae' },
      { name: 'Pizarra', hex: '#2a4551' },
    ],
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
    palette: [
      { name: 'Terracota', hex: '#9d6f66' },
      { name: 'Ámbar', hex: '#c2964b' },
      { name: 'Lavanda', hex: '#767aa5' },
      { name: 'Índigo', hex: '#393b62' },
      { name: 'Rosa arcilla', hex: '#c0aba5' },
    ],
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
    palette: [
      { name: 'Niebla', hex: '#9c968d' },
      { name: 'Perla', hex: '#c9c6bd' },
      { name: 'Verde agua', hex: '#7fb3a6' },
      { name: 'Piedra', hex: '#66635e' },
      { name: 'Cal', hex: '#e6e3dc' },
    ],
    color: '#85827a',
    w: 2000,
    h: 2000,
  },
];

export const findArtwork = (slug?: string) => ARTWORKS.find((a) => a.slug === slug);

export const artworkMessage = (a: { title: string }) =>
  `¡Hola Flor! Vi tu obra "${a.title}" en la web y me gustaría saber más.`;
