'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/lib/types'

export default function ProductGallery({ images, name }: { images: ProductImage[], name: string }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] flex items-center justify-center" style={{ background: '#faf7f0' }}>
        <span className="font-cormorant italic" style={{ color: '#9c8a72' }}>Sin imagen</span>
      </div>
    )
  }

  return (
    <div>
      {/* Imagen principal */}
      <div className="relative aspect-[3/4] mb-3 overflow-hidden" style={{ background: '#faf7f0' }}>
        <Image
          src={images[active].url}
          alt={images[active].alt ?? name}
          fill
          className="object-cover transition-opacity duration-200"
          priority={active === 0}
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className="relative aspect-square overflow-hidden transition-opacity"
              style={{
                background: '#faf7f0',
                outline: i === active ? '2px solid #9c7a52' : '2px solid transparent',
                outlineOffset: '1px',
                opacity: i === active ? 1 : 0.65,
              }}
            >
              <Image
                src={img.url}
                alt={img.alt ?? name}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
