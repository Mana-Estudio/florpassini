/**
 * Corre después de `vite build`. Genera un index.html por cada ruta con su propio
 * <title>, descripción e imagen de vista previa (Open Graph), más sitemap.xml, robots.txt y 404.html.
 * Así cada obra tiene su link con vista previa propia y funciona en cualquier hosting estático.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ARTWORKS } from '../src/data/artworks';
import { SITE } from '../src/data/site';

const DIST = 'dist';
const BASE_URL = (process.env.SITE_URL || SITE.url || '').replace(/\/$/, '');
// Se quita lo inyectado en una corrida anterior para que el script sea repetible
const template = readFileSync(join(DIST, 'index.html'), 'utf-8').replace(/\s*<!--prerender-->[\s\S]*?<!--\/prerender-->/, '');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p: string) => (BASE_URL ? `${BASE_URL}${p}` : p);

interface Meta {
  path: string;
  title: string;
  description: string;
  image: string;
  type?: string;
  jsonLd?: object;
}

const DEFAULT_IMAGE = '/og-image.jpg';

const routes: Meta[] = [
  {
    path: '/',
    title: 'Florencia Passini · Pintora',
    description:
      'Obras originales de Florencia Passini: pintura abstracta y naturaleza al óleo. Obras disponibles, encargos a medida y envíos. Adrogué, Buenos Aires.',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/obras',
    title: 'Obras · Florencia Passini',
    description:
      'Obras originales al óleo y técnica mixta: abstractos y naturaleza. Medidas, disponibilidad y consultas directas con la artista.',
    image: ARTWORKS[0]?.image ?? DEFAULT_IMAGE,
  },
  {
    path: '/sobre-mi',
    title: 'Sobre mí · Florencia Passini',
    description: 'Conocé a Florencia Passini, pintora de Adrogué, y cómo pinta sus obras de color y naturaleza.',
    image: '/images/flor/flor-passini.jpg',
  },
  {
    path: '/encargos',
    title: 'Encargos · Florencia Passini',
    description:
      'Obras por encargo pensadas para tu espacio: elegís tamaño, colores y temática. Cómo funciona, tiempos y preguntas frecuentes.',
    image: '/images/obras/resonancia-coral.jpg',
  },
  {
    path: '/contacto',
    title: 'Contacto · Florencia Passini',
    description: 'Escribile a Florencia Passini por WhatsApp, Instagram o mail para consultas por obras, encargos o visitas al taller.',
    image: DEFAULT_IMAGE,
  },
  ...ARTWORKS.map<Meta>((a) => ({
    path: `/obras/${a.slug}`,
    title: `${a.title} · Florencia Passini`,
    description: `${a.description} ${a.technique}, ${a.size}.`,
    image: a.image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      name: a.title,
      description: a.description,
      image: abs(a.image),
      artMedium: a.technique,
      artform: 'Pintura',
      ...(a.year ? { dateCreated: String(a.year) } : {}),
      creator: { '@type': 'Person', name: SITE.name },
    },
  })),
];

function render(m: Meta, { noindex = false } = {}) {
  const url = abs(m.path === '/' ? '/' : m.path);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(m.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(m.description)}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${esc(abs(m.image))}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${m.type ?? 'website'}`);

  const extra = [
    BASE_URL && `<link rel="canonical" href="${esc(url)}" />`,
    BASE_URL && `<meta property="og:url" content="${esc(url)}" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(abs(m.image))}" />`,
    noindex && `<meta name="robots" content="noindex" />`,
    m.jsonLd && `<script type="application/ld+json">${JSON.stringify(m.jsonLd)}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');

  return html.replace('</head>', `    <!--prerender-->\n    ${extra}\n    <!--/prerender-->\n  </head>`);
}

function write(file: string, content: string) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

for (const m of routes) {
  const file = m.path === '/' ? join(DIST, 'index.html') : join(DIST, m.path, 'index.html');
  write(file, render(m));
}

write(join(DIST, '404.html'), render({ ...routes[0], title: 'Página no encontrada · Florencia Passini' }, { noindex: true }));

write(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n${BASE_URL ? `\nSitemap: ${BASE_URL}/sitemap.xml\n` : ''}`,
);

if (BASE_URL) {
  const urls = routes.map((m) => `  <url><loc>${abs(m.path)}</loc></url>`).join('\n');
  write(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}

console.log(`✓ prerender: ${routes.length} páginas generadas${BASE_URL ? ` para ${BASE_URL}` : ''}`);
if (!BASE_URL) {
  console.warn(
    '⚠ Falta el dominio (SITE.url en src/data/site.ts o SITE_URL). Sin él no se genera sitemap y las vistas previas en WhatsApp pueden no mostrar imagen.',
  );
}
