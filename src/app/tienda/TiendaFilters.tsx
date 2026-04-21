'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useTransition } from 'react'

const SORT_OPTIONS = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio', label: 'Precio' },
]

export default function TiendaFilters({ orden, q }: { orden: string; q: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState(q)
  const [, startTransition] = useTransition()

  function buildUrl(newOrden: string, newQ: string) {
    const params = new URLSearchParams()
    if (newOrden !== 'destacados') params.set('orden', newOrden)
    if (newQ) params.set('q', newQ)
    return `${pathname}${params.toString() ? `?${params}` : ''}`
  }

  function handleSearch(val: string) {
    setSearch(val)
    startTransition(() => {
      router.replace(buildUrl(orden, val))
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">

      {/* Buscador */}
      <div className="relative w-full sm:w-64">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9c8a72' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          type="search"
          value={search}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Buscar camiseta…"
          className="w-full font-cormorant text-base pl-9 pr-4 py-2 border outline-none"
          style={{ borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }}
        />
      </div>

      {/* Ordenar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-cormorant text-[11px] uppercase" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Ordenar:
        </span>
        {SORT_OPTIONS.map(opt => (
          <a
            key={opt.value}
            href={buildUrl(opt.value, search)}
            className="font-cormorant text-[11px] uppercase px-3 py-1 border-b transition-colors"
            style={{
              letterSpacing: '2px',
              color: orden === opt.value ? '#2a1f14' : '#9c8a72',
              borderColor: orden === opt.value ? '#2a1f14' : 'transparent',
            }}
          >
            {opt.label}
          </a>
        ))}
      </div>
    </div>
  )
}
