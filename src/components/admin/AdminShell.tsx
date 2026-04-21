'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const navItems = [
  { href: '/477973/dashboard', label: 'Inicio' },
  { href: '/477973/productos', label: 'Productos' },
  { href: '/477973/colecciones', label: 'Colecciones' },
  { href: '/477973/configuracion', label: 'Configuración' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/477973/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen" style={{ background: '#faf7f0' }}>

      {/* ── TOP BAR (mobile + desktop) ── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: '#2a1f14', borderBottom: '1px solid rgba(240,234,216,0.1)' }}
      >
        <Link
          href="/"
          className="font-playfair font-bold text-lg"
          style={{ color: '#f0ead8', letterSpacing: '4px' }}
        >
          KIT<em className="font-normal italic">HAUS</em>
          <span className="font-cormorant text-[10px] uppercase ml-2" style={{ letterSpacing: '3px', color: '#9c7a52' }}>
            Admin
          </span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          aria-label="Menú"
        >
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: '#f0ead8',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: '#f0ead8',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: '#f0ead8',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* ── DROPDOWN MENU ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col pt-[52px]"
          style={{ background: '#2a1f14' }}
        >
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-playfair text-3xl py-4 border-b transition-colors"
                  style={{
                    color: active ? '#f0ead8' : 'rgba(240,234,216,0.4)',
                    borderColor: 'rgba(240,234,216,0.08)',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="px-8 py-10">
            <button
              onClick={handleLogout}
              className="font-cormorant text-sm uppercase"
              style={{ letterSpacing: '3px', color: 'rgba(240,234,216,0.35)' }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  )
}
