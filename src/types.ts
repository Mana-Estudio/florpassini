export type TabType = 'home' | 'sobre-mi' | 'obras' | 'contacto';

export type ArtworkCategory = 'oleo' | 'mixta' | 'encargos';

export type ArtworkStatus = 'Disponible' | 'Colección privada' | 'Encargo particular';

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  medium: string;
  dimensions: string;
  year: string;
  status: ArtworkStatus;
  imageUrl: string;
  fallbackImageUrl?: string;
  alt: string;
  colSpanDesktop: number;
  offsetDesktop?: string;
  aspectRatio: string;
  description?: string;
  isAnchor?: boolean;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  artworkId: string;
  message: string;
  type: 'adquisicion' | 'encargo' | 'visita';
}
