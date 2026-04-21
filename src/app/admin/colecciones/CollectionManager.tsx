'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Collection } from '@/lib/types'

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const empty = { name: '', slug: '', description: '', order: 0 }

export default function CollectionManager({ collections }: { collections: Collection[] }) {
  const router = useRouter()
  const [form, setForm] = useState<typeof empty>(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  function startEdit(col: Collection) {
    setEditing(col.id)
    setForm({ name: col.name, slug: col.slug, description: col.description ?? '', order: col.order })
    setShowForm(true)
  }

  function startNew() {
    setEditing(null)
    setForm(empty)
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const payload = { name: form.name, slug: form.slug, description: form.description, order: form.order }

    if (editing) {
      await supabase.from('collections').update(payload).eq('id', editing)
    } else {
      await supabase.from('collections').insert(payload)
    }

    setSaving(false)
    setShowForm(false)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta colección?')) return
    const supabase = createClient()
    await supabase.from('collections').delete().eq('id', id)
    router.refresh()
  }

  const inputStyle = { borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={startNew}
          className="font-cormorant text-sm uppercase px-6 py-3"
          style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8' }}
        >
          + Nueva colección
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSave} className="mb-8 p-6 border space-y-4" style={{ borderColor: 'rgba(42,31,20,0.15)', background: '#faf7f0' }}>
          <h2 className="font-playfair font-bold text-2xl" style={{ color: '#2a1f14' }}>
            {editing ? 'Editar' : 'Nueva'} <em className="font-normal italic">colección</em>
          </h2>
          <div>
            <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Nombre</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
              required
              className="w-full font-cormorant text-base px-4 py-3 border outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="w-full font-cormorant text-base px-4 py-3 border outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '3px', color: '#9c8a72' }}>Descripción</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full font-cormorant text-base px-4 py-3 border outline-none"
              style={inputStyle}
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="font-cormorant text-sm uppercase px-8 py-3" style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="font-cormorant text-sm uppercase px-8 py-3 border" style={{ letterSpacing: '2px', borderColor: 'rgba(42,31,20,0.2)', color: '#9c8a72' }}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      <div className="border" style={{ borderColor: 'rgba(42,31,20,0.15)' }}>
        {collections.length === 0 ? (
          <p className="font-cormorant italic text-center py-12" style={{ color: '#9c8a72' }}>Sin colecciones todavía.</p>
        ) : (
          collections.map((col) => (
            <div key={col.id} className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(42,31,20,0.08)' }}>
              <div>
                <span className="font-playfair font-bold text-base" style={{ color: '#2a1f14' }}>{col.name}</span>
                <span className="font-cormorant text-sm ml-3" style={{ color: '#9c8a72' }}>/{col.slug}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => startEdit(col)} className="font-cormorant text-[11px] uppercase border-b" style={{ letterSpacing: '2px', color: '#9c7a52', borderColor: '#9c7a52' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(col.id)} className="font-cormorant text-[11px] uppercase" style={{ letterSpacing: '2px', color: '#9c8a72' }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
