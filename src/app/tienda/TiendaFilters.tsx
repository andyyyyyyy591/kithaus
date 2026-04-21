'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

const SORT_OPTIONS = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio', label: 'Precio' },
]

export default function TiendaFilters({ orden, q }: { orden: string; q: string }) {
  const router = useRouter()
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function go(newOrden: string, newQ: string) {
    const params = new URLSearchParams()
    if (newOrden !== 'destacados') params.set('orden', newOrden)
    if (newQ) params.set('q', newQ)
    const url = `/tienda${params.toString() ? `?${params}` : ''}`
    router.push(url)
  }

  function handleSearch(val: string) {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => go(orden, val), 350)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">

      {/* Buscador */}
      <div className="relative w-full sm:w-64">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#9c8a72' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          defaultValue={q}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Buscar camiseta…"
          className="w-full font-cormorant text-base pl-9 pr-4 py-2 border outline-none"
          style={{ borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }}
        />
      </div>

      {/* Ordenar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="font-cormorant text-[11px] uppercase"
          style={{ letterSpacing: '3px', color: '#9c8a72' }}
        >
          Ordenar:
        </span>
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => go(opt.value, q)}
            className="font-cormorant text-[11px] uppercase px-3 py-1 border-b transition-colors"
            style={{
              letterSpacing: '2px',
              color: orden === opt.value ? '#2a1f14' : '#9c8a72',
              borderColor: orden === opt.value ? '#2a1f14' : 'transparent',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
