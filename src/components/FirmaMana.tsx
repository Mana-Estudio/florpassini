import React, { useEffect, useRef } from 'react'
import s from './FirmaMana.module.css'

// Firma de Maná para el pie (estándar de la agencia: «Firma de Maná en las webs» en el cerebro).
// El logotipo «maná» va en SVG (Bricolage Grotesque 600 pasada a trazados), sin fuentes externas.
// Hereda color y tamaño de la fila donde va (currentColor, em); la tilde va siempre en el azul de Maná.
// nofollow: el mismo link en el pie de muchas webs es un «esquema de enlaces» para Google.
// Al entrar en pantalla las letras suben en cascada y la tilde se posa; al pasar el cursor, una ola corta.
// Sin JS se ve completa y quieta; todo se apaga con prefers-reduced-motion.

const HREF = 'https://manaestudio.ar/?utm_source=florpassini&utm_medium=firma&utm_campaign=webs-clientes'

const LETRAS = [
  'M19.7 80L7.1 80L7.1 27.7L17.4 27.7L17.1 43.7L18.9 43.7Q20.3 37.9 22.6 34Q24.8 30.2 28.1 28.3Q31.4 26.4 35.7 26.4Q40.5 26.4 43.6 28.6Q46.7 30.8 48.4 34.6Q50 38.5 50.4 43.6L52 43.6Q53.3 37.8 55.8 34Q58.2 30.2 61.8 28.3Q65.3 26.4 69.6 26.4Q73.8 26.4 77 28.1Q80.2 29.8 82.4 33Q84.5 36.3 85.6 41.2Q86.6 46.1 86.6 52.5L86.6 80L73.9 80L73.9 54.1Q73.9 48.5 73 44.8Q72 41.1 70 39.3Q68.1 37.4 65 37.4Q61.5 37.4 58.9 39.7Q56.3 42 54.8 46.1Q53.3 50.3 53 55.6L53 80L40.6 80L40.6 54.7Q40.6 48.9 39.6 45Q38.6 41.2 36.6 39.3Q34.6 37.4 31.5 37.4Q27.9 37.4 25.4 39.8Q22.8 42.2 21.4 46.4Q19.9 50.6 19.7 55.8Z',
  'M106.6 81.3Q102.3 81.3 98.9 79.7Q95.5 78 93.6 74.7Q91.6 71.4 91.6 66.5Q91.6 62.4 93.2 59.5Q94.7 56.6 97.8 54.8Q100.9 52.9 105.5 51.6Q110.1 50.4 116.3 49.5Q119.7 49 121.9 48.5Q124 48 125 46.9Q126 45.9 126 43.8Q126 40.7 123.9 38.4Q121.7 36.2 116.9 36.2Q114 36.2 111.4 37.2Q108.7 38.2 106.8 40.3Q104.9 42.5 104.2 46L92.9 42.5Q94 38.5 96.1 35.5Q98.2 32.6 101.3 30.5Q104.4 28.4 108.4 27.4Q112.4 26.4 117.2 26.4Q124.5 26.4 129.2 28.8Q133.9 31.1 136.2 36Q138.5 41 138.5 48.8L138.5 58.6Q138.5 62 138.7 65.7Q138.8 69.3 139.1 73Q139.3 76.6 139.7 80L128.4 80Q128 77.2 127.7 74Q127.4 70.8 127.2 67.5L125.6 67.5Q124.2 71.3 121.6 74.5Q119 77.6 115.3 79.5Q111.5 81.3 106.6 81.3ZM111.6 72Q113.6 72 115.7 71.3Q117.7 70.6 119.7 69.2Q121.7 67.8 123.4 65.8Q125.1 63.7 126.3 60.9L126.1 53.9Q125.3 54.3 124.3 54.6Q121.8 55.4 119.1 55.8Q116.3 56.2 113.6 56.8Q110.8 57.3 108.6 58.1Q106.4 59 105.1 60.5Q103.8 62.1 103.8 64.8Q103.8 68.2 106 70.1Q108.2 72 111.6 72Z',
  'M159.2 80L146.6 80L146.6 27.7L157.1 27.7L156.8 43.7L158.6 43.7Q160 37.8 162.3 34Q164.7 30.2 168.4 28.3Q172.1 26.4 177 26.4Q185.9 26.4 190.6 32.7Q195.2 39 195.2 52.2L195.2 80L182.5 80L182.5 53.5Q182.5 45 179.9 41Q177.4 37.1 172.4 37.1Q168.2 37.1 165.3 39.8Q162.4 42.4 160.8 46.8Q159.3 51.1 159.2 56.3Z',
  'M215.1 81.3Q210.8 81.3 207.4 79.7Q204 78 202.1 74.7Q200.1 71.4 200.1 66.5Q200.1 62.4 201.7 59.5Q203.2 56.6 206.3 54.8Q209.4 52.9 214 51.6Q218.6 50.4 224.8 49.5Q228.2 49 230.4 48.5Q232.5 48 233.5 46.9Q234.5 45.9 234.5 43.8Q234.5 40.7 232.4 38.4Q230.2 36.2 225.4 36.2Q222.5 36.2 219.9 37.2Q217.2 38.2 215.3 40.3Q213.4 42.5 212.7 46L201.4 42.5Q202.5 38.5 204.6 35.5Q206.7 32.6 209.8 30.5Q212.9 28.4 216.9 27.4Q220.9 26.4 225.7 26.4Q233 26.4 237.7 28.8Q242.4 31.1 244.7 36Q247 41 247 48.8L247 58.6Q247 62 247.2 65.7Q247.3 69.3 247.6 73Q247.8 76.6 248.2 80L236.9 80Q236.5 77.2 236.2 74Q235.9 70.8 235.7 67.5L234.1 67.5Q232.7 71.3 230.1 74.5Q227.5 77.6 223.8 79.5Q220 81.3 215.1 81.3ZM220.1 72Q222.1 72 224.2 71.3Q226.2 70.6 228.2 69.2Q230.2 67.8 231.9 65.8Q233.6 63.7 234.8 60.9L234.6 53.9Q233.8 54.3 232.8 54.6Q230.3 55.4 227.6 55.8Q224.8 56.2 222.1 56.8Q219.3 57.3 217.1 58.1Q214.9 59 213.6 60.5Q212.3 62.1 212.3 64.8Q212.3 68.2 214.5 70.1Q216.7 72 220.1 72Z',
]

const ESPERA = s.espera ?? ''
const LLEGA = s.llega ?? ''

export function FirmaMana() {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return
    el.classList.add(ESPERA)
    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return
        el.classList.add(LLEGA)
        io.disconnect()
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    // Al terminar la llegada queda en reposo: así al sacar el cursor no se repite.
    const tilde = el.querySelector('path:last-child')
    const reposo = () => el.classList.remove(ESPERA, LLEGA)
    tilde?.addEventListener('animationend', reposo, { once: true })
    return () => {
      io.disconnect()
      tilde?.removeEventListener('animationend', reposo)
    }
  }, [])

  return (
    <a
      ref={ref}
      className={s.firma}
      href={HREF}
      target="_blank"
      rel="noopener nofollow"
      aria-label="Hecho por Maná, estudio de desarrollo web (se abre en otra pestaña)"
    >
      <span>Hecho por</span>
      <svg className={s.logo} viewBox="0 2 252 80" aria-hidden="true" focusable="false">
        {LETRAS.map((d, i) => (
          <path
            key={i}
            className={s.letra}
            style={{ '--i': i } as React.CSSProperties}
            fill="currentColor"
            d={d}
          />
        ))}
        <path className={s.tilde} d="M232.8 3.8L222.5 20.3L212.6 20.3L220 3.8Z" />
      </svg>
    </a>
  )
}
