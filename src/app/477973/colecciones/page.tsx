import { createClient } from '@/lib/supabase-server'
import AdminShell from '@/components/admin/AdminShell'
import CollectionManager from './CollectionManager'
import type { Collection } from '@/lib/types'

export default async function ColeccionesAdminPage() {
  let collections: Collection[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('collections').select('*, products(count)').order('order')
    collections = (data as any[]) ?? []
  } catch {}

  return (
    <AdminShell>
      <div className="max-w-3xl">
        <p className="font-cormorant text-[11px] uppercase mb-1" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
          Gestión
        </p>
        <h1 className="font-playfair font-bold text-4xl mb-8" style={{ color: '#2a1f14' }}>
          Colecciones
        </h1>
        <CollectionManager collections={collections} />
      </div>
    </AdminShell>
  )
}
