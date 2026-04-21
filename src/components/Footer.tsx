import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0f0c08', color: '#f0ead8', borderTop: '1px solid rgba(156,122,82,0.2)' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Nombre */}
        <span
          className="font-playfair font-bold text-sm"
          style={{ letterSpacing: '3px' }}
        >
          KIT<em className="font-normal italic">HAUS</em>
        </span>

        {/* Redes */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/kithaus"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-xs uppercase transition-colors"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.5)' }}
          >
            Instagram
          </a>
          <a
            href="https://facebook.com/kithaus"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-xs uppercase transition-colors"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.5)' }}
          >
            Facebook
          </a>
          <a
            href="https://wa.me/13053705703"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-xs uppercase transition-colors"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.5)' }}
          >
            WhatsApp
          </a>
        </div>

        {/* Copyright */}
        <p
          className="font-cormorant text-xs"
          style={{ color: 'rgba(240,234,216,0.25)', letterSpacing: '1px' }}
        >
          © 2026 KITHAUS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
