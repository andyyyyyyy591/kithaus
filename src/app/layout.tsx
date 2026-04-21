import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KITHAUS — Camisetas de Fútbol Retro',
  description: 'El fútbol como cultura. La camiseta como identidad. Camisetas retro y de Mundiales para fans en EE.UU.',
  openGraph: {
    title: 'KITHAUS',
    description: 'El fútbol como cultura. La camiseta como identidad.',
    siteName: 'KITHAUS',
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
