'use server'

import { createAdminClient } from '@/lib/supabase-admin'

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes('@')) return { error: 'Email inválido' }
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase().trim() })
    if (error) {
      if (error.code === '23505') return { already: true }
      return { error: error.message }
    }
    return { ok: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error inesperado' }
  }
}
