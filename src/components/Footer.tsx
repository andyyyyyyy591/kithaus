import Link from 'next/link'
import DecoRule from './DecoRule'

export default function Footer() {
  return (
    <footer style={{ background: '#0f0c08', color: '#f0ead8' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div
          className="flex items-center gap-3 mb-12"
          style={{ opacity: 0.2 }}
        >
          <div className="flex-1 h-px" style={{ background: '#9c7a52' }} />
          <div className="w-[6px] h-[6px] rotate-45 flex-shrink-0" style={{ background: '#9c7a52' }} />
          <div className="flex-1 h-px" style={{ background: '#9c7a52' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna izquierda */}
          <div>
            <div
              className="font-playfair font-bold text-2xl mb-2"
              style={{ letterSpacing: '4px' }}
            >
              KIT<em className="font-normal italic">HAUS</em>
            </div>
            <p
              className="font-cormorant italic text-sm"
              style={{ color: 'rgba(240,234,216,0.45)', letterSpacing: '1px' }}
            >
              El fútbol como cultura.<br />La camiseta como identidad.
            </p>
          </div>

          {/* Columna centro */}
          <div>
            <p
              className="font-cormorant text-[10px] uppercase mb-4"
              style={{ letterSpacing: '4px', color: '#9c7a52' }}
            >
              Navegación
            </p>
            {[
              { href: '/tienda', label: 'Tienda' },
              { href: '/coleccion/selecciones', label: 'Selecciones' },
              { href: '/coleccion/mundiales', label: 'Mundiales' },
              { href: '/contacto', label: 'Contacto' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block font-cormorant text-sm mb-2 transition-colors duration-200"
                style={{ color: 'rgba(240,234,216,0.5)', letterSpacing: '1px' }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://wa.me/13053705703"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-cormorant text-sm mt-4 transition-colors"
              style={{ color: '#9c7a52', letterSpacing: '1px' }}
            >
              WhatsApp →
            </a>
          </div>

          {/* Columna derecha */}
          <div>
            <p
              className="font-cormorant text-[10px] uppercase mb-4"
              style={{ letterSpacing: '4px', color: '#9c7a52' }}
            >
              Redes
            </p>
            <a
              href="https://instagram.com/kithaus"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-cormorant text-sm mb-2"
              style={{ color: 'rgba(240,234,216,0.5)', letterSpacing: '1px' }}
            >
              @kithaus
            </a>
            <p
              className="font-cormorant text-sm mt-8"
              style={{ color: 'rgba(240,234,216,0.25)', letterSpacing: '1px' }}
            >
              KITHAUS © 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
