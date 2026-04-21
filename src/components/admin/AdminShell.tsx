'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const navItems = [
  { href: '/admin/productos', label: 'Productos' },
  { href: '/admin/colecciones', label: 'Colecciones' },
  { href: '/admin/configuracion', label: 'Configuración' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#faf7f0' }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{ background: '#2a1f14', minHeight: '100vh' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(240,234,216,0.1)' }}>
          <Link
            href="/"
            className="font-playfair font-bold text-xl"
            style={{ color: '#f0ead8', letterSpacing: '4px' }}
          >
            KIT<em className="font-normal italic">HAUS</em>
          </Link>
          <p
            className="font-cormorant text-[10px] uppercase mt-1"
            style={{ letterSpacing: '3px', color: '#9c7a52' }}
          >
            Admin
          </p>
        </div>

        <nav className="flex-1 py-6">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block font-cormorant text-sm uppercase px-6 py-3 border-l-2 transition-colors duration-150"
                style={{
                  letterSpacing: '2px',
                  color: active ? '#f0ead8' : 'rgba(240,234,216,0.45)',
                  borderLeftColor: active ? '#9c7a52' : 'transparent',
                  background: active ? 'rgba(156,122,82,0.1)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t" style={{ borderColor: 'rgba(240,234,216,0.1)' }}>
          <button
            onClick={handleLogout}
            className="font-cormorant text-[11px] uppercase transition-colors"
            style={{ letterSpacing: '3px', color: 'rgba(240,234,216,0.35)' }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
