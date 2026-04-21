import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — KITHAUS',
  robots: 'noindex',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#f0ead8', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
