import { Artwork } from '../types';

type RGB = [number, number, number];

export const hexToRgb = (hex: string): RGB => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = ([r, g, b]: RGB) =>
  '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');

const luminance = ([r, g, b]: RGB) => {
  const ch = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};

export const contrast = (a: RGB, b: RGB) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const saturation = ([r, g, b]: RGB) => {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  if (max === min) return 0;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
};

const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const WHITE: RGB = [255, 255, 255];
const PAPER: RGB = [251, 247, 241];
const INK: RGB = [31, 26, 23];

/**
 * Colores para teñir la ficha de una obra:
 * - accent: el color más vivo de su paleta que se lea bien con texto blanco (oscurecido si hace falta)
 * - tint: un fondo apenas teñido con ese color
 * - soft: un tono intermedio para bordes y detalles
 */
export function artTheme(art: Artwork) {
  const cols = art.palette.map((p) => hexToRgb(p.hex));
  const vivid = [...cols].sort((a, b) => saturation(b) - saturation(a))[0] ?? hexToRgb(art.color);

  let accent = cols
    .filter((c) => contrast(c, WHITE) >= 4.5)
    .sort((a, b) => saturation(b) - saturation(a))[0];
  if (!accent) {
    accent = vivid;
    for (let i = 0; i < 12 && contrast(accent, WHITE) < 4.5; i++) accent = mix(accent, INK, 0.15);
  }

  return {
    accent: rgbToHex(accent),
    tint: rgbToHex(mix(PAPER, vivid, 0.05)),
    soft: rgbToHex(mix(PAPER, vivid, 0.16)),
  };
}

/** Distancia perceptual aproximada entre dos colores (redmean). */
export function colorDistance(a: string, b: string) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const rm = (r1 + r2) / 2;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db);
}

/** Texto legible (oscuro o claro) sobre un color dado. */
export const readableOn = (hex: string) => (contrast(hexToRgb(hex), INK) >= 4.5 ? '#1f1a17' : '#ffffff');
