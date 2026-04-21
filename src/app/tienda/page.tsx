export const revalidate = 0

import { createPublicClient } from '@/lib/supabase-server'
import ProductCard from '@/components/ProductCard'
import Masthead from '@/components/Masthead'
import TiendaFilters from './TiendaFilters'
import type { Product } from '@/lib/types'

interface Props {
  searchParams: Promise<{ orden?: string; q?: string }>
}

async function getProducts(orden: string, q: string): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    let query = supabase
      .from('products')
      .select('*, collections(*), product_images(*)')
      .eq('active', true)

    if (q) {
      query = query.ilike('name', `%${q}%`)
    }

    if (orden === 'precio') {
      query = query.order('price', { ascending: true })
    } else if (orden === 'recientes') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('featured', { ascending: false }).order('order')
    }

    const { data } = await query
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export default async function TiendaPage({ searchParams }: Props) {
  const { orden = 'destacados', q = '' } = await searchParams
  const products = await getProducts(orden, q)

  return (
    <>
      <Masthead
        eyebrow="Colección completa"
        title={<>La <em className="font-normal italic">Tienda</em></>}
        subtitle="Camisetas retro y de Mundiales"
        size="small"
      />

      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <TiendaFilters orden={orden} q={q} />

        {products.length === 0 ? (
          <p className="font-cormorant italic text-center py-24 text-lg" style={{ color: '#9c8a72' }}>
            {q ? `Sin resultados para "${q}"` : 'Próximamente...'}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
