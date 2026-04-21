'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const FIELDS = [
  { key: 'hero_titulo', label: 'Título del hero', type: 'text' },
  { key: 'hero_subtitulo', label: 'Subtítulo del hero', type: 'text' },
  { key: 'pull_quote', label: 'Pull quote (cita)', type: 'textarea' },
  { key: 'whatsapp_numero', label: 'Número WhatsApp (ej: 13053705703)', type: 'text' },
  { key: 'instagram', label: 'Instagram (ej: @kithaus)', type: 'text' },
  { key: 'email_contacto', label: 'Email de contacto', type: 'email' },
]

export default function ConfigForm({ settings }: { settings: Record<string, string> }) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, string>>(settings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()

    for (const [key, value] of Object.entries(values)) {
      await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    router.refresh()
  }

  const inputStyle = { borderColor: 'rgba(42,31,20,0.2)', background: '#faf7f0', color: '#2a1f14' }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {FIELDS.map((field) => (
        <div key={field.key}>
          <label
            className="block font-cormorant text-[11px] uppercase mb-2"
            style={{ letterSpacing: '3px', color: '#9c8a72' }}
          >
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              value={values[field.key] ?? ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              rows={3}
              className="w-full font-cormorant text-base px-4 py-3 border outline-none resize-none"
              style={inputStyle}
            />
          ) : (
            <input
              type={field.type}
              value={values[field.key] ?? ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full font-cormorant text-base px-4 py-3 border outline-none"
              style={inputStyle}
            />
          )}
        </div>
      ))}

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="font-cormorant text-sm uppercase px-8 py-3 transition-colors"
          style={{ letterSpacing: '2px', background: '#2a1f14', color: '#f0ead8', opacity: saving ? 0.7 : 1 }}
        >
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        {saved && (
          <span className="font-cormorant italic text-sm" style={{ color: '#9c7a52' }}>
            Guardado correctamente.
          </span>
        )}
      </div>
    </form>
  )
}
