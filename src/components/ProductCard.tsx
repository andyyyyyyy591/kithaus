import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const primaryImage = product.product_images?.find((i) => i.is_primary) ?? product.product_images?.[0]
  const collectionName = product.collections?.name ?? ''

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="overflow-hidden mb-3 relative aspect-[3/4]" style={{ background: '#faf7f0' }}>
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: '#f0ead8' }}
          >
            <span
              className="font-cormorant italic text-sm"
              style={{ color: '#9c8a72' }}
            >
              Sin imagen
            </span>
          </div>
        )}
        {/* Hover line */}
        <div
          className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
          style={{ background: '#9c7a52' }}
        />
      </div>

      {collectionName && (
        <p
          className="font-cormorant text-[10px] uppercase mb-1"
          style={{ letterSpacing: '4px', color: '#9c7a52' }}
        >
          {collectionName}
        </p>
      )}
      <h3
        className="font-playfair font-bold text-base leading-tight mb-1"
        style={{ color: '#2a1f14' }}
      >
        {product.name}
      </h3>
      <p
        className="font-cormorant text-base"
        style={{ color: '#9c8a72' }}
      >
        ${product.price.toFixed(0)}
      </p>
    </Link>
  )
}
