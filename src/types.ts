export type Page = 'inicio' | 'obras' | 'sobre-mi' | 'encargos' | 'contacto';

export interface Route {
  page: Page;
  /** slug de obra: en "obras" abre el detalle, en "contacto" preselecciona la obra */
  slug?: string;
}

export type Serie = 'abstractos' | 'naturaleza';

export type Estado = 'disponible' | 'reservada' | 'vendida';

export interface Artwork {
  slug: string;
  title: string;
  year?: number;
  serie: Serie;
  technique: string;
  /** ancho × alto, en cm */
  size: string;
  status: Estado;
  /** Ej: "ARS 450.000". Si no se carga, se muestra "Consultar precio". */
  price?: string;
  description: string;
  image: string;
  thumb: string;
  /** dimensiones en px de la imagen grande (para respetar la proporción real de la obra) */
  w: number;
  h: number;
  /** color promedio de la obra: se muestra mientras carga la imagen */
  color: string;
  featured?: boolean;
}
