'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

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
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Desktop links */}
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
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden py-4 px-2 font-cormorant text-[11px] uppercase"
          style={{ letterSpacing: '3px', color: '#9c8a72' }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'CERRAR' : 'MENÚ'}
        </button>
      </div>

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
