'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Collection, Product } from '@/lib/types'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface Props {
  collections: Collection[]
  product?: Product
}

export default function ProductForm({ collections, product }: Props) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(product?.name ?? '')
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [collectionId, setCollectionId] = useState(product?.collection_id ?? '')
  const [price, setPrice] = useState(product?.price?.toString() ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [sizes, setSizes] = useState<string[]>(product?.sizes_available ?? ALL_SIZES)
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [active, setActive] = useState(product?.active ?? true)
  const [order, setOrder] = useState(product?.order?.toString() ?? '0')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadingImages, setUploadingImages] = useState(false)

  function handleNameChange(val: string) {
    setName(val)
    if (!product) setSlug(slugify(val))
  }

  function toggleSize(size: string) {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  async function handleImageUpload(files: FileList) {
    if (!product?.id) {
      setError('Guardá el producto primero para subir imágenes.')
      return
    }
    setUploadingImages(true)
    const supabase = createClient()
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `products/${product.id}/${Date.now()}.${ext}`
      const { data: uploaded, error: uploadError } = await supabase.storage
        .from('products')
        .upload(path, file)
      if (uploadError) continue
      const { data: urlData } = supabase.storage.from('products').getPublicUrl(uploaded.path)
      await supabase.from('product_images').insert({
        product_id: product.id,
        url: urlData.publicUrl,
        is_primary: false,
        order: 0,
      })
    }
    setUploadingImages(false)
    router.refresh()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const payload = {
      name,
      slug,
      collection_id: collectionId || null,
      price: parseFloat(price),
      description,
      sizes_available: sizes,
      featured,
      active,
      order: parseInt(order),
      updated_at: new Date().toISOString(),
    }

    let err = null
    if (product) {
      const { error } = await supabase.from('products').update(payload).eq('id', product.id)
      err = error
    } else {
      const { data: newProduct, error } = await supabase.from('products').insert(payload).select('id').single()
      err = error
      if (!err && newProduct) {
        router.push(`/477973/productos/${newProduct.id}/editar`)
        router.refresh()
        return
      }
    }

    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      router.push('/477973/productos')
      router.refresh()
    }
  }

  const inputStyle = {
    borderColor: 'rgba(42,31,20,0.2)',
    background: '#faf7f0',
    color: '#2a1f14',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Nombre *
        </label>
        <input
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          className="w-full font-cormorant text-base px-4 py-3 border outline-none"
          style={inputStyle}
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Slug (URL)
        </label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full font-cormorant text-base px-4 py-3 border outline-none"
          style={inputStyle}
        />
      </div>

      {/* Colección */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Colección
        </label>
        <select
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          className="w-full font-cormorant text-base px-4 py-3 border outline-none"
          style={inputStyle}
        >
          <option value="">Sin colección</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Precio (USD) *
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
          className="w-full font-cormorant text-base px-4 py-3 border outline-none"
          style={inputStyle}
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Descripción / Historia
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full font-cormorant text-base px-4 py-3 border outline-none resize-none"
          style={inputStyle}
        />
      </div>

      {/* Tallas */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-3" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Tallas disponibles
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className="font-cormorant text-sm px-4 py-2 border transition-colors"
              style={{
                letterSpacing: '2px',
                background: sizes.includes(s) ? '#2a1f14' : 'transparent',
                color: sizes.includes(s) ? '#f0ead8' : '#2a1f14',
                borderColor: 'rgba(42,31,20,0.2)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-cormorant text-sm uppercase" style={{ letterSpacing: '2px', color: '#2a1f14' }}>
            Destacado
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-cormorant text-sm uppercase" style={{ letterSpacing: '2px', color: '#2a1f14' }}>
            Activo
          </span>
        </label>
      </div>

      {/* Orden */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Orden
        </label>
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-24 font-cormorant text-base px-4 py-3 border outline-none"
          style={inputStyle}
        />
      </div>

      {/* Imágenes (solo en edición) */}
      {product && (
        <div>
          <label className="block font-cormorant text-[11px] uppercase mb-3" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
            Imágenes
          </label>
          <div className="flex flex-wrap gap-3 mb-3">
            {product.product_images?.map((img) => (
              <div key={img.id} className="relative w-20 h-20 overflow-hidden border" style={{ borderColor: 'rgba(42,31,20,0.15)' }}>
                <img src={img.url} alt={img.alt ?? ''} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadingImages}
            className="font-cormorant text-sm uppercase px-4 py-2 border transition-colors"
            style={{ letterSpacing: '2px', borderColor: 'rgba(42,31,20,0.2)', color: '#2a1f14' }}
          >
            {uploadingImages ? 'Subiendo…' : '+ Subir imágenes'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
          />
        </div>
      )}

      {error && (
        <p className="font-cormorant italic text-sm" style={{ color: '#9c7a52' }}>
          Error: {error}
        </p>
      )}

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="font-cormorant text-sm uppercase px-8 py-3 transition-colors"
          style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8', opacity: saving ? 0.7 : 1 }}
        >
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        <a
          href="/477973/productos"
          className="font-cormorant text-sm uppercase px-8 py-3 border transition-colors"
          style={{ letterSpacing: '2px', borderColor: 'rgba(42,31,20,0.2)', color: '#9c8a72' }}
        >
          Cancelar
        </a>
      </div>
    </form>
  )
}
