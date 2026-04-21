import { createClient } from '@/lib/supabase-server'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function ProductosAdminPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  let products: Product[] = []

  try {
    const supabase = await createClient()
    let query = supabase
      .from('products')
      .select('*, collections(*), product_images(*)')
      .order('created_at', { ascending: false })

    if (q) query = query.ilike('name', `%${q}%`)

    const { data } = await query
    products = (data as Product[]) ?? []
  } catch {}

  return (
    <AdminShell>
      <div className="max-w-5xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p
              className="font-cormorant text-[11px] uppercase mb-1"
              style={{ letterSpacing: '4px', color: '#9c7a52' }}
            >
              Gestión
            </p>
            <h1 className="font-playfair font-bold text-4xl" style={{ color: '#2a1f14' }}>
              Productos
            </h1>
          </div>
          <Link
            href="/admin/productos/nuevo"
            className="font-cormorant text-sm uppercase px-6 py-3 transition-colors"
            style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8' }}
          >
            + Nuevo producto
          </Link>
        </div>

        {/* Búsqueda */}
        <form className="mb-6">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre…"
            className="font-cormorant text-base px-4 py-3 border w-full max-w-sm outline-none"
            style={{ borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }}
          />
        </form>

        {/* Tabla */}
        <div className="border" style={{ borderColor: 'rgba(42,31,20,0.15)' }}>
          {/* Header */}
          <div
            className="grid grid-cols-[60px_1fr_160px_80px_80px_80px_100px] gap-4 px-4 py-3 border-b"
            style={{ borderColor: 'rgba(42,31,20,0.15)', background: '#faf7f0' }}
          >
            {['', 'Nombre', 'Colección', 'Precio', 'Dest.', 'Estado', 'Acciones'].map((h) => (
              <span
                key={h}
                className="font-cormorant text-[10px] uppercase"
                style={{ letterSpacing: '3px', color: '#9c8a72' }}
              >
                {h}
              </span>
            ))}
          </div>

          {products.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="font-cormorant italic text-base" style={{ color: '#9c8a72' }}>
                {q ? 'Sin resultados para esa búsqueda.' : 'Todavía no hay productos.'}
              </p>
            </div>
          ) : (
            products.map((p) => {
              const thumb = p.product_images?.find((i) => i.is_primary) ?? p.product_images?.[0]
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-[60px_1fr_160px_80px_80px_80px_100px] gap-4 px-4 py-3 border-b items-center"
                  style={{ borderColor: 'rgba(42,31,20,0.08)' }}
                >
                  <div className="relative w-12 h-12 overflow-hidden" style={{ background: '#f0ead8' }}>
                    {thumb && (
                      <Image src={thumb.url} alt={p.name} fill className="object-cover" />
                    )}
                  </div>
                  <span className="font-cormorant text-base" style={{ color: '#2a1f14' }}>
                    {p.name}
                  </span>
                  <span className="font-cormorant text-sm" style={{ color: '#9c8a72' }}>
                    {p.collections?.name ?? '—'}
                  </span>
                  <span className="font-cormorant text-sm" style={{ color: '#2a1f14' }}>
                    ${p.price}
                  </span>
                  <span
                    className="font-cormorant text-[11px] uppercase"
                    style={{ color: p.featured ? '#9c7a52' : '#9c8a72', letterSpacing: '2px' }}
                  >
                    {p.featured ? 'Sí' : '—'}
                  </span>
                  <span
                    className="font-cormorant text-[11px] uppercase"
                    style={{ color: p.active ? '#5c3d1e' : '#9c8a72', letterSpacing: '2px' }}
                  >
                    {p.active ? 'Activo' : 'Oculto'}
                  </span>
                  <Link
                    href={`/admin/productos/${p.id}/editar`}
                    className="font-cormorant text-[11px] uppercase border-b"
                    style={{ letterSpacing: '2px', color: '#9c7a52', borderColor: '#9c7a52' }}
                  >
                    Editar
                  </Link>
                </div>
              )
            })
          )}
        </div>
      </div>
    </AdminShell>
  )
}
