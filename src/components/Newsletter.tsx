'use client'

import { useState } from 'react'
import { subscribeNewsletter } from '@/app/newsletter/actions'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'already' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const result = await subscribeNewsletter(email)
    if ('ok' in result) {
      setStatus('ok')
    } else if ('already' in result) {
      setStatus('already')
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Error')
    }
  }

  return (
    <section className="py-16 px-6 text-center" style={{ background: '#2a1f14' }}>
      <div className="max-w-md mx-auto">
        <p className="font-cormorant text-[11px] uppercase mb-3" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
          Novedades
        </p>
        <h2 className="font-playfair font-bold text-3xl mb-2" style={{ color: '#f0ead8' }}>
          Unite al <em className="font-normal italic">club</em>
        </h2>
        <p className="font-cormorant text-base mb-8" style={{ color: 'rgba(240,234,216,0.6)', letterSpacing: '0.5px' }}>
          Enterate primero de los nuevos ingresos y lanzamientos exclusivos.
        </p>

        {status === 'ok' ? (
          <p className="font-cormorant italic text-lg" style={{ color: '#9c7a52' }}>
            ¡Gracias! Te avisamos cuando haya novedades.
          </p>
        ) : status === 'already' ? (
          <p className="font-cormorant italic text-lg" style={{ color: '#9c7a52' }}>
            Ya estás suscripto.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 font-cormorant text-base px-4 py-3 outline-none"
              style={{ background: 'rgba(240,234,216,0.08)', color: '#f0ead8', border: '1px solid rgba(240,234,216,0.15)', borderRight: 'none' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="font-cormorant text-[11px] uppercase px-6 py-3 transition-colors"
              style={{ letterSpacing: '2px', background: '#9c7a52', color: '#f0ead8', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? '…' : 'Suscribirse'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="font-cormorant italic text-sm mt-3" style={{ color: '#9c7a52' }}>
            {errorMsg}
          </p>
        )}
      </div>
    </section>
  )
}
