'use client'

import { useState } from 'react'
import { whatsappUrl } from '@/lib/whatsapp'
import type { Product } from '@/lib/types'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

export default function ProductActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const available = product.sizes_available ?? []

  return (
    <>
      {/* Selector de tallas */}
      <div className="mb-6">
        <p
          className="font-cormorant text-[11px] uppercase mb-3"
          style={{ letterSpacing: '3px', color: '#9c8a72' }}
        >
          Talla{selectedSize ? `: ${selectedSize}` : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => {
            const isAvailable = available.includes(size)
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                onClick={() => isAvailable && setSelectedSize(isSelected ? null : size)}
                disabled={!isAvailable}
                className="font-cormorant text-sm px-4 py-2 border transition-all duration-200"
                style={{
                  letterSpacing: '2px',
                  background: isSelected ? '#2a1f14' : 'transparent',
                  color: isSelected
                    ? '#f0ead8'
                    : isAvailable
                    ? '#2a1f14'
                    : '#9c8a72',
                  borderColor: isSelected ? '#2a1f14' : 'rgba(42,31,20,0.2)',
                  opacity: isAvailable ? 1 : 0.4,
                  textDecoration: isAvailable ? 'none' : 'line-through',
                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Botón WhatsApp */}
      <a
        href={whatsappUrl(product.name, selectedSize ?? undefined)}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center font-cormorant text-sm uppercase py-4 px-6 transition-colors duration-200"
        style={{
          letterSpacing: '3px',
          background: '#2a1f14',
          color: '#f0ead8',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = '#0f0c08'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = '#2a1f14'
        }}
      >
        Consultar por WhatsApp →
      </a>

      {!selectedSize && (
        <p
          className="font-cormorant text-xs text-center mt-2 italic"
          style={{ color: '#9c8a72' }}
        >
          Seleccioná una talla para consultar por esa talla específica
        </p>
      )}
    </>
  )
}
