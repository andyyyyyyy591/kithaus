'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeSearch() {
  const router = useRouter()
  const [val, setVal] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = val.trim()
    router.push(q ? `/tienda?q=${encodeURIComponent(q)}` : '/tienda')
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:w-64 flex-shrink-0">
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color: '#9c8a72' }}
        aria-label="Buscar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
      <input
        type="search"
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Buscar camiseta…"
        className="w-full font-cormorant text-base pl-9 pr-4 py-2 border outline-none"
        style={{ borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }}
      />
    </form>
  )
}
