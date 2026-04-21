'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { saveProduct, deleteImage, setPrimaryImage } from './actions'
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
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  function handleNameChange(val: string) {
    setName(val)
    if (!product) setSlug(slugify(val))
  }

  function toggleSize(size: string) {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  function handleFileSelect(files: FileList) {
    const arr = Array.from(files)
    setNewFiles(prev => [...prev, ...arr])
    setPreviews(prev => [...prev, ...arr.map(f => URL.createObjectURL(f))])
  }

  function removeNewFile(idx: number) {
    setNewFiles(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  async function handleDeleteExisting(imageId: string, url: string) {
    const match = url.match(/products\/.+$/)
    const storagePath = match ? match[0] : ''
    await deleteImage(imageId, storagePath)
    router.refresh()
  }

  async function handleSetPrimary(imageId: string) {
    if (!product) return
    await setPrimaryImage(imageId, product.id)
    router.refresh()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formData = new FormData()
    if (product?.id) formData.append('id', product.id)
    formData.append('name', name)
    formData.append('slug', slug)
    formData.append('collection_id', collectionId)
    formData.append('price', price)
    formData.append('description', description)
    sizes.forEach(s => formData.append('sizes', s))
    formData.append('featured', String(featured))
    formData.append('active', String(active))
    formData.append('order', order)
    newFiles.forEach(f => formData.append('images', f))

    const result = await saveProduct(formData)

    if ('error' in result && result.error) {
      setError(result.error)
      setSaving(false)
    } else {
      router.push('/477973/productos')
      router.refresh()
    }
  }

  const inputStyle = { borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Nombre *</label>
        <input value={name} onChange={e => handleNameChange(e.target.value)} required
          className="w-full font-cormorant text-base px-4 py-3 border outline-none" style={inputStyle} />
      </div>

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Slug (URL)</label>
        <input value={slug} onChange={e => setSlug(e.target.value)}
          className="w-full font-cormorant text-base px-4 py-3 border outline-none" style={inputStyle} />
      </div>

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Colección</label>
        <select value={collectionId} onChange={e => setCollectionId(e.target.value)}
          className="w-full font-cormorant text-base px-4 py-3 border outline-none" style={inputStyle}>
          <option value="">Sin colección</option>
          {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Precio (USD) *</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01"
          className="w-full font-cormorant text-base px-4 py-3 border outline-none" style={inputStyle} />
      </div>

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Descripción</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
          className="w-full font-cormorant text-base px-4 py-3 border outline-none resize-none" style={inputStyle} />
      </div>

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-3" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Tallas disponibles</label>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map(s => (
            <button key={s} type="button" onClick={() => toggleSize(s)}
              className="font-cormorant text-sm px-4 py-2 border transition-colors"
              style={{ letterSpacing: '2px', background: sizes.includes(s) ? '#2a1f14' : 'transparent', color: sizes.includes(s) ? '#f0ead8' : '#2a1f14', borderColor: 'rgba(42,31,20,0.2)' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4" />
          <span className="font-cormorant text-sm uppercase" style={{ letterSpacing: '2px', color: '#2a1f14' }}>Destacado</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="w-4 h-4" />
          <span className="font-cormorant text-sm uppercase" style={{ letterSpacing: '2px', color: '#2a1f14' }}>Activo</span>
        </label>
      </div>

      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Orden</label>
        <input type="number" value={order} onChange={e => setOrder(e.target.value)}
          className="w-24 font-cormorant text-base px-4 py-3 border outline-none" style={inputStyle} />
      </div>

      {/* ── IMÁGENES ── */}
      <div>
        <label className="block font-cormorant text-[11px] uppercase mb-3" style={{ letterSpacing: '3px', color: '#9c8a72' }}>
          Imágenes
        </label>
        <div className="flex flex-wrap gap-3 mb-3">

          {/* Imágenes guardadas (edición) */}
          {product?.product_images?.map(img => (
            <div key={img.id} className="relative group w-24 h-24 border overflow-hidden"
              style={{ borderColor: img.is_primary ? '#9c7a52' : 'rgba(42,31,20,0.15)' }}>
              <Image src={img.url} alt={img.alt ?? ''} fill className="object-cover" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1"
                style={{ background: 'rgba(0,0,0,0.55)' }}>
                {!img.is_primary && (
                  <button type="button" onClick={() => handleSetPrimary(img.id)}
                    className="font-cormorant text-[9px] uppercase px-2 py-1 text-white"
                    style={{ letterSpacing: '1px', background: 'rgba(156,122,82,0.9)' }}>
                    Principal
                  </button>
                )}
                <button type="button" onClick={() => handleDeleteExisting(img.id, img.url)}
                  className="font-cormorant text-[9px] uppercase px-2 py-1 text-white"
                  style={{ letterSpacing: '1px', background: 'rgba(180,40,40,0.9)' }}>
                  Borrar
                </button>
              </div>
              {img.is_primary && (
                <span className="absolute top-1 left-1 font-cormorant text-[8px] uppercase px-1"
                  style={{ background: '#9c7a52', color: '#f0ead8', letterSpacing: '1px' }}>
                  ★
                </span>
              )}
            </div>
          ))}

          {/* Previews nuevas */}
          {previews.map((src, i) => (
            <div key={i} className="relative w-24 h-24 border overflow-hidden"
              style={{ borderColor: 'rgba(42,31,20,0.3)' }}>
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeNewFile(i)}
                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '50%' }}>
                ×
              </button>
            </div>
          ))}

          {/* Botón agregar */}
          <button type="button" onClick={() => fileRef.current?.click()}
            className="w-24 h-24 border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors"
            style={{ borderColor: 'rgba(42,31,20,0.25)', color: '#9c8a72' }}>
            <span className="text-2xl leading-none">+</span>
            <span className="font-cormorant text-[10px] uppercase" style={{ letterSpacing: '1px' }}>Foto</span>
          </button>
        </div>

        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => e.target.files && handleFileSelect(e.target.files)} />

        {newFiles.length > 0 && (
          <p className="font-cormorant text-sm italic" style={{ color: '#9c8a72' }}>
            {newFiles.length} foto{newFiles.length > 1 ? 's' : ''} lista{newFiles.length > 1 ? 's' : ''} para subir
          </p>
        )}
      </div>

      {error && (
        <p className="font-cormorant italic text-sm" style={{ color: '#9c7a52' }}>Error: {error}</p>
      )}

      <div className="flex gap-4 pt-2">
        <button type="submit" disabled={saving}
          className="font-cormorant text-sm uppercase px-8 py-3 transition-colors"
          style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        <a href="/477973/productos"
          className="font-cormorant text-sm uppercase px-8 py-3 border transition-colors"
          style={{ letterSpacing: '2px', borderColor: 'rgba(42,31,20,0.2)', color: '#9c8a72' }}>
          Cancelar
        </a>
      </div>
    </form>
  )
}
