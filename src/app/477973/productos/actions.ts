'use server'

import { createAdminClient } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function saveProduct(formData: FormData) {
  try {
    const supabase = createAdminClient()

    const id = formData.get('id') as string | null
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const collectionId = formData.get('collection_id') as string
    const price = parseFloat(formData.get('price') as string)
    const description = formData.get('description') as string
    const sizes = formData.getAll('sizes') as string[]
    const extraCollectionIds = formData.getAll('extra_collection_ids') as string[]
    const featured = formData.get('featured') === 'true'
    const active = formData.get('active') === 'true'
    const order = parseInt(formData.get('order') as string) || 0

    // Payload base sin extra_collection_ids (por si la columna no existe aún)
    const basePayload = {
      name,
      slug,
      collection_id: collectionId || null,
      price,
      description,
      sizes_available: sizes,
      featured,
      active,
      order,
      updated_at: new Date().toISOString(),
    }

    let productId = id

    if (id) {
      // Intentar con extra_collection_ids; si falla por columna inexistente, guardar sin ella
      const { error } = await supabase
        .from('products')
        .update({ ...basePayload, extra_collection_ids: extraCollectionIds })
        .eq('id', id)

      if (error) {
        if (error.message.includes('extra_collection_ids') || error.code === '42703') {
          const { error: e2 } = await supabase.from('products').update(basePayload).eq('id', id)
          if (e2) return { error: e2.message }
        } else {
          return { error: error.message }
        }
      }
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert({ ...basePayload, extra_collection_ids: extraCollectionIds })
        .select('id')
        .single()

      if (error) {
        if (error.message.includes('extra_collection_ids') || error.code === '42703') {
          const { data: d2, error: e2 } = await supabase
            .from('products')
            .insert(basePayload)
            .select('id')
            .single()
          if (e2) return { error: e2.message }
          productId = d2.id
        } else {
          return { error: error.message }
        }
      } else {
        productId = data.id
      }
    }

    revalidatePath('/477973/productos')
    revalidatePath('/tienda')
    revalidatePath('/', 'layout')
    return { productId }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error inesperado al guardar' }
  }
}

export async function recordImage(productId: string, url: string, isPrimary: boolean, order: number) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('product_images').insert({
      product_id: productId,
      url,
      is_primary: isPrimary,
      order,
    })
    if (error) return { error: error.message }
    revalidatePath('/477973/productos')
    revalidatePath('/tienda')
    revalidatePath('/', 'layout')
    return { ok: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error al registrar imagen' }
  }
}

export async function deleteImage(imageId: string, storagePath: string) {
  const supabase = createAdminClient()
  await supabase.storage.from('products').remove([storagePath])
  const { error } = await supabase.from('product_images').delete().eq('id', imageId)
  if (error) return { error: error.message }
  revalidatePath('/477973/productos')
  revalidatePath('/tienda')
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function setPrimaryImage(imageId: string, productId: string) {
  const supabase = createAdminClient()
  await supabase.from('product_images').update({ is_primary: false }).eq('product_id', productId)
  await supabase.from('product_images').update({ is_primary: true }).eq('id', imageId)
  revalidatePath('/477973/productos')
  revalidatePath('/tienda')
  revalidatePath('/', 'layout')
  return { ok: true }
}
