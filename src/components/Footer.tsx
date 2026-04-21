export default function Footer() {
  return (
    <footer style={{ background: '#2a1f14', borderTop: '1px solid rgba(156,122,82,0.2)' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col items-center gap-3 md:flex-row md:justify-between">
        {/* Nombre */}
        <span
          className="font-playfair font-bold text-sm"
          style={{ letterSpacing: '3px', color: '#f0ead8' }}
        >
          KIT<em className="font-normal italic">HAUS</em>
        </span>

        {/* Redes — centradas */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://instagram.com/kithaus.us"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-xs uppercase"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.55)' }}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61572074860834"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-xs uppercase"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.55)' }}
          >
            Facebook
          </a>
          <a
            href="https://wa.me/13053705703"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-xs uppercase"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.55)' }}
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
