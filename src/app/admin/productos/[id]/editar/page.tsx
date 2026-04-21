import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import ProductForm from '../../ProductForm'
import type { Collection, Product } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params
  let product: Product | null = null
  let collections: Collection[] = []

  try {
    const supabase = await createClient()
    const [{ data: prod }, { data: cols }] = await Promise.all([
      supabase.from('products').select('*, product_images(*)').eq('id', id).single(),
      supabase.from('collections').select('*').order('order'),
    ])
    if (!prod) notFound()
    product = prod as Product
    collections = (cols as Collection[]) ?? []
  } catch {
    notFound()
  }

  return (
    <AdminShell>
      <div className="max-w-3xl">
        <p className="font-cormorant text-[11px] uppercase mb-1" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
          Editar
        </p>
        <h1 className="font-playfair font-bold text-4xl mb-8" style={{ color: '#2a1f14' }}>
          {product!.name}
        </h1>
        <ProductForm collections={collections} product={product!} />
      </div>
    </AdminShell>
  )
}
