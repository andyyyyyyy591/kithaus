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
    const images = formData.getAll('images') as File[]

    const payload = {
      name,
      slug,
      collection_id: collectionId || null,
      extra_collection_ids: extraCollectionIds,
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
      const { error } = await supabase.from('products').update(payload).eq('id', id)
      if (error) return { error: error.message }
    } else {
      const { data, error } = await supabase.from('products').insert(payload).select('id').single()
      if (error) return { error: error.message }
      productId = data.id
    }

    // Subir imágenes nuevas en paralelo
    const validImages = images.filter(f => f instanceof File && f.size > 0)
    if (validImages.length > 0) {
      const { count: existingCount } = await supabase
        .from('product_images')
        .select('*', { count: 'exact', head: true })
        .eq('product_id', productId)

      const baseCount = existingCount ?? 0

      await Promise.all(validImages.map(async (file, i) => {
        const ext = file.name.split('.').pop()
        const path = `products/${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const buffer = Buffer.from(await file.arrayBuffer())

        const { data: uploaded, error: uploadError } = await supabase.storage
          .from('products')
          .upload(path, buffer, { contentType: file.type })

        if (uploadError) return

        const { data: urlData } = supabase.storage.from('products').getPublicUrl(uploaded.path)

        await supabase.from('product_images').insert({
          product_id: productId,
          url: urlData.publicUrl,
          is_primary: baseCount === 0 && i === 0,
          order: baseCount + i,
        })
      }))
    }

    revalidatePath('/477973/productos')
    revalidatePath('/tienda')
    revalidatePath('/', 'layout')
    return { productId }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error inesperado al guardar' }
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
