import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import DecoRule from '@/components/DecoRule'
import ProductActions from './ProductActions'
import type { Product } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params

  let product: Product | null = null
  let related: Product[] = []

  try {
    const supabase = await createClient()

    const { data } = await supabase
      .from('products')
      .select('*, collections(*), product_images(*)')
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (!data) notFound()
    product = data as Product

    // Sort images: primary first
    if (product.product_images) {
      product.product_images.sort((a, b) => {
        if (a.is_primary) return -1
        if (b.is_primary) return 1
        return a.order - b.order
      })
    }

    if (product.collection_id) {
      const { data: rel } = await supabase
        .from('products')
        .select('*, collections(*), product_images(*)')
        .eq('active', true)
        .eq('collection_id', product.collection_id)
        .neq('id', product.id)
        .limit(4)
      related = (rel as Product[]) ?? []
    }
  } catch {
    notFound()
  }

  const images = product?.product_images ?? []
  const collectionName = product?.collections?.name ?? ''

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* Galería */}
        <div>
          {images.length > 0 ? (
            <>
              <div className="relative aspect-[3/4] mb-3 overflow-hidden" style={{ background: '#faf7f0' }}>
                <Image
                  src={images[0].url}
                  alt={images[0].alt ?? product!.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1).map((img) => (
                    <div key={img.id} className="relative aspect-square overflow-hidden" style={{ background: '#faf7f0' }}>
                      <Image
                        src={img.url}
                        alt={img.alt ?? product!.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              className="aspect-[3/4] flex items-center justify-center"
              style={{ background: '#faf7f0' }}
            >
              <span className="font-cormorant italic" style={{ color: '#9c8a72' }}>Sin imagen</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {collectionName && (
            <p
              className="font-cormorant text-[11px] uppercase mb-3"
              style={{ letterSpacing: '5px', color: '#9c7a52' }}
            >
              {collectionName}
            </p>
          )}

          <h1
            className="font-playfair font-bold leading-tight mb-3"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: '#2a1f14' }}
          >
            {product!.name}
          </h1>

          <p
            className="font-cormorant mb-6"
            style={{ fontSize: '24px', color: '#9c8a72' }}
          >
            ${product!.price.toFixed(0)}
          </p>

          <div className="h-px mb-6" style={{ background: 'rgba(42,31,20,0.15)' }} />

          {/* Tallas + botón WhatsApp (client component) */}
          <ProductActions product={product!} />

          <div className="h-px my-6" style={{ background: 'rgba(42,31,20,0.15)' }} />

          {product!.description && (
            <div
              className="border-l-2 pl-5 mb-6"
              style={{ borderColor: '#9c7a52' }}
            >
              <p className="font-cormorant italic text-base leading-relaxed" style={{ color: '#5c3d1e' }}>
                {product!.description}
              </p>
            </div>
          )}

          <p
            className="font-cormorant text-sm"
            style={{ color: '#9c8a72', letterSpacing: '1px' }}
          >
            Envío a todo EE.UU. · Consultá por otros países
          </p>
        </div>
      </div>

      {/* También te puede interesar */}
      {related.length > 0 && (
        <div className="mt-20">
          <DecoRule />
          <p
            className="font-cormorant text-[11px] uppercase mb-2"
            style={{ letterSpacing: '4px', color: '#9c7a52' }}
          >
            De la misma colección
          </p>
          <h2 className="font-playfair font-bold text-3xl mb-8" style={{ color: '#2a1f14' }}>
            También te puede <em className="font-normal italic">interesar</em>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
