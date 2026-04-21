'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/tienda', label: 'TIENDA' },
  { href: '/coleccion/selecciones', label: 'SELECCIONES' },
  { href: '/coleccion/clubes', label: 'CLUBES' },
  { href: '/coleccion/retros', label: 'RETROS' },
  { href: '/coleccion/mundiales', label: 'MUNDIALES' },
  { href: '/contacto', label: 'CONTACTO' },
]

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = searchVal.trim()
    setSearchOpen(false)
    setSearchVal('')
    router.push(q ? `/tienda?q=${encodeURIComponent(q)}` : '/tienda')
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: '#f0ead8', borderColor: 'rgba(42,31,20,0.15)' }}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-playfair font-bold py-4 text-[15px]"
          style={{ color: '#2a1f14', letterSpacing: '4px' }}
        >
          KIT<em className="font-normal italic">HAUS</em>
        </Link>

        {/* Desktop links + search */}
        <div className="hidden md:flex items-center">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                className="font-cormorant text-[11px] uppercase py-4 px-4 border-b border-transparent transition-colors duration-200"
                style={{
                  letterSpacing: '3px',
                  color: active ? '#2a1f14' : '#9c8a72',
                  borderBottomColor: active ? '#2a1f14' : 'transparent',
                }}
              >
                {l.label}
              </Link>
            )
          })}

          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="py-4 pl-4 pr-0 transition-colors duration-200"
            style={{ color: searchOpen ? '#2a1f14' : '#9c8a72' }}
            aria-label="Buscar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Mobile: search icon + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="py-4 px-1 transition-colors duration-200"
            style={{ color: searchOpen ? '#2a1f14' : '#9c8a72' }}
            aria-label="Buscar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button
            className="py-4 px-2 font-cormorant text-[11px] uppercase"
            style={{ letterSpacing: '3px', color: '#9c8a72' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div
          className="border-t"
          style={{ borderColor: 'rgba(42,31,20,0.15)', background: '#f0ead8' }}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-screen-xl mx-auto px-6 py-3 flex items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: '#9c8a72', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Buscar camiseta…"
              className="flex-1 font-cormorant text-base bg-transparent outline-none"
              style={{ color: '#2a1f14' }}
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchVal('') }}
              className="font-cormorant text-[11px] uppercase"
              style={{ letterSpacing: '3px', color: '#9c8a72' }}
            >
              CERRAR
            </button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: 'rgba(42,31,20,0.15)', background: '#f0ead8' }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block font-cormorant text-[11px] uppercase py-4 px-6 border-b"
              style={{
                letterSpacing: '3px',
                color: '#9c8a72',
                borderColor: 'rgba(42,31,20,0.1)',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
