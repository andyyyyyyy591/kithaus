import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KITHAUS — Camisetas de Fútbol Retro',
  description: 'El fútbol como cultura. La camiseta como identidad. Camisetas retro y de Mundiales para fans en EE.UU.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'KITHAUS',
    description: 'El fútbol como cultura. La camiseta como identidad.',
    siteName: 'KITHAUS',
    images: [{ url: '/icon-512.png' }],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon', url: '/apple-icon.png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
