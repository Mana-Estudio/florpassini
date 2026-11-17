import { useSyncExternalStore } from 'react';
import { Page, Route } from '../types';

/**
 * Ruteo con URLs reales (/obras/eclosion-vital), sin librerías.
 * El build genera un index.html por ruta (ver scripts/prerender.ts), así que
 * funciona en cualquier hosting estático y cada obra tiene su propia vista previa al compartir.
 */

const PAGES: Page[] = ['inicio', 'obras', 'sobre-mi', 'encargos', 'contacto'];
const NAV_EVENT = 'app:navigate';

export function parsePath(pathname: string): Route {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return { page: 'inicio' };
  const [page, slug] = clean.split('/');
  if ((PAGES as string[]).includes(page)) return { page: page as Page, slug: slug || undefined };
  return { page: 'inicio' };
}

const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
};

export function useRoute(): Route {
  const path = useSyncExternalStore(subscribe, () => window.location.pathname, () => '/');
  return parsePath(path);
}

/** Usar en <a href>: href('obras') -> "/obras" */
export const href = (path = '') => `/${path}`;

export function navigate(path = '', { replace = false, state }: { replace?: boolean; state?: unknown } = {}) {
  const url = href(path);
  if (url === window.location.pathname && !replace) return;
  window.history[replace ? 'replaceState' : 'pushState'](state ?? null, '', url);
  window.dispatchEvent(new Event(NAV_EVENT));
}

/** Links viejos con hash (#/obras/x) → URL real. */
export function migrateHashUrl() {
  const { hash } = window.location;
  if (hash.startsWith('#/')) {
    window.history.replaceState(null, '', hash.slice(1) || '/');
  }
}

/**
 * Intercepta los clics en <a href="/..."> internos para navegar sin recargar.
 * Respeta ctrl/cmd+clic, target, descargas y archivos (imágenes, pdf, etc.).
 */
export function interceptLinks() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    if (url.pathname === window.location.pathname && url.hash) return; // anclas dentro de la página
    e.preventDefault();
    const from = parsePath(window.location.pathname);
    const to = parsePath(url.pathname);
    // Abrir una obra desde el listado: guardamos la marca para que "Cerrar" vuelva atrás en el historial
    const openingFromList = from.page === 'obras' && !from.slug && to.page === 'obras' && !!to.slug;
    navigate(url.pathname.replace(/^\//, ''), { state: openingFromList ? { fromList: true } : undefined });
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
