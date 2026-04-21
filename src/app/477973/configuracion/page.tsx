import { createClient } from '@/lib/supabase-server'
import AdminShell from '@/components/admin/AdminShell'
import ConfigForm from './ConfigForm'
import type { SiteSetting } from '@/lib/types'

export default async function ConfiguracionPage() {
  let settings: SiteSetting[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('site_settings').select('*')
    settings = (data as SiteSetting[]) ?? []
  } catch {}

  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value ?? '']))

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <p className="font-cormorant text-[11px] uppercase mb-1" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
          Ajustes
        </p>
        <h1 className="font-playfair font-bold text-4xl mb-8" style={{ color: '#2a1f14' }}>
          Configuración
        </h1>
        <ConfigForm settings={settingsMap} />
      </div>
    </AdminShell>
  )
}
