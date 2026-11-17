import { useSyncExternalStore } from 'react';
import { Page, Route } from '../types';

const PAGES: Page[] = ['inicio', 'obras', 'sobre-mi', 'encargos', 'contacto'];

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (!clean || clean === 'home') return { page: 'inicio' };
  const [page, slug] = clean.split('/');
  if ((PAGES as string[]).includes(page)) return { page: page as Page, slug: slug || undefined };
  return { page: 'inicio' };
}

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => '');
  return parseHash(hash);
}

/** Usar en <a href>: href('obras') -> "#/obras" */
export const href = (path = '') => `#/${path}`;

export function navigate(path = '') {
  window.location.hash = `/${path}`;
}
