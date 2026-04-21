'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciales incorrectas')
      setLoading(false)
    } else {
      router.push('/477973/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#2a1f14' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-[60px] h-px mx-auto mb-6" style={{ background: '#9c7a52' }} />
          <h1
            className="font-playfair font-bold text-4xl mb-2"
            style={{ color: '#f0ead8', letterSpacing: '4px' }}
          >
            KIT<em className="font-normal italic">HAUS</em>
          </h1>
          <p
            className="font-cormorant text-[11px] uppercase"
            style={{ letterSpacing: '4px', color: '#9c7a52' }}
          >
            Panel de administración
          </p>
          <div className="w-[60px] h-px mx-auto mt-6" style={{ background: '#9c7a52' }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block font-cormorant text-[11px] uppercase mb-2"
              style={{ letterSpacing: '3px', color: '#9c7a52' }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full font-cormorant text-base px-4 py-3 border bg-transparent outline-none transition-colors"
              style={{
                borderColor: 'rgba(240,234,216,0.2)',
                color: '#f0ead8',
              }}
            />
          </div>

          <div>
            <label
              className="block font-cormorant text-[11px] uppercase mb-2"
              style={{ letterSpacing: '3px', color: '#9c7a52' }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full font-cormorant text-base px-4 py-3 border bg-transparent outline-none"
              style={{
                borderColor: 'rgba(240,234,216,0.2)',
                color: '#f0ead8',
              }}
            />
          </div>

          {error && (
            <p className="font-cormorant italic text-sm" style={{ color: '#9c7a52' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-cormorant text-sm uppercase py-4 transition-colors duration-200 mt-2"
            style={{
              letterSpacing: '3px',
              background: '#9c7a52',
              color: '#f0ead8',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
