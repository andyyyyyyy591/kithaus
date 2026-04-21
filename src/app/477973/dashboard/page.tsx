import { createClient } from '@/lib/supabase-server'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'

export default async function DashboardPage() {
  let stats = { products: 0, collections: 0 }

  try {
    const supabase = await createClient()
    const [{ count: pCount }, { count: cCount }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('collections').select('*', { count: 'exact', head: true }),
    ])
    stats = { products: pCount ?? 0, collections: cCount ?? 0 }
  } catch {}

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <p
          className="font-cormorant text-[11px] uppercase mb-2"
          style={{ letterSpacing: '4px', color: '#9c7a52' }}
        >
          Bienvenido
        </p>
        <h1 className="font-playfair font-bold text-4xl mb-8" style={{ color: '#2a1f14' }}>
          Panel de <em className="font-normal italic">control</em>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { label: 'Productos', count: stats.products, href: '/477973/productos' },
            { label: 'Colecciones', count: stats.collections, href: '/477973/colecciones' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-8 border transition-colors duration-200"
              style={{ borderColor: 'rgba(42,31,20,0.15)', background: '#faf7f0' }}
            >
              <div
                className="font-playfair font-bold italic text-5xl mb-2"
                style={{ color: '#2a1f14' }}
              >
                {item.count}
              </div>
              <p
                className="font-cormorant text-[11px] uppercase"
                style={{ letterSpacing: '3px', color: '#9c8a72' }}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <div
          className="p-6 border-l-2"
          style={{ borderLeftColor: '#9c7a52', background: '#faf7f0' }}
        >
          <p className="font-cormorant italic text-base" style={{ color: '#5c3d1e' }}>
            Acciones rápidas
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="/477973/productos/nuevo"
              className="font-cormorant text-sm uppercase px-6 py-3 transition-colors"
              style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8' }}
            >
              + Nuevo producto
            </Link>
            <Link
              href="/477973/colecciones"
              className="font-cormorant text-sm uppercase px-6 py-3 border transition-colors"
              style={{ letterSpacing: '2px', borderColor: 'rgba(42,31,20,0.2)', color: '#2a1f14' }}
            >
              Ver colecciones
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
