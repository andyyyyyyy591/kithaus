import { createPublicClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Masthead from '@/components/Masthead'
import type { Product, Collection } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ orden?: string }>
}

export default async function ColeccionPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { orden = 'destacados' } = await searchParams

  let collection: Collection | null = null
  let products: Product[] = []

  try {
    const supabase = createPublicClient()

    const { data: col } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (!col) notFound()
    collection = col as Collection

    let query = supabase
      .from('products')
      .select('*, collections(*), product_images(*)')
      .eq('active', true)
      .or(`collection_id.eq.${collection.id},extra_collection_ids.cs.{"${collection.id}"}`)

    if (orden === 'precio') {
      query = query.order('price', { ascending: true })
    } else if (orden === 'recientes') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('featured', { ascending: false }).order('order')
    }

    const { data } = await query
    products = (data as Product[]) ?? []
  } catch {
    notFound()
  }

  return (
    <>
      <Masthead
        eyebrow="Colección"
        title={collection?.name ?? slug}
        subtitle={collection?.description ?? undefined}
        size="small"
      />

      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <span className="font-cormorant text-[11px] uppercase" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
              Ordenar:
            </span>
            {[
              { value: 'destacados', label: 'Destacados' },
              { value: 'recientes', label: 'Más recientes' },
              { value: 'precio', label: 'Precio' },
            ].map((opt) => (
              <a
                key={opt.value}
                href={`/coleccion/${slug}?orden=${opt.value}`}
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

        {products.length === 0 ? (
          <p className="font-cormorant italic text-center py-24 text-lg" style={{ color: '#9c8a72' }}>
            Próximamente...
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
