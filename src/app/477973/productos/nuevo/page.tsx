import { createClient } from '@/lib/supabase-server'
import AdminShell from '@/components/admin/AdminShell'
import ProductForm from '../ProductForm'
import type { Collection } from '@/lib/types'

export default async function NuevoProductoPage() {
  let collections: Collection[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('collections').select('*').order('order')
    collections = (data as Collection[]) ?? []
  } catch {}

  return (
    <AdminShell>
      <div className="max-w-3xl">
        <p className="font-cormorant text-[11px] uppercase mb-1" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
          Nuevo
        </p>
        <h1 className="font-playfair font-bold text-4xl mb-8" style={{ color: '#2a1f14' }}>
          Agregar <em className="font-normal italic">producto</em>
        </h1>
        <ProductForm collections={collections} />
      </div>
    </AdminShell>
  )
}
