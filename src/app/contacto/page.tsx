import Masthead from '@/components/Masthead'
import DecoRule from '@/components/DecoRule'

export default function ContactoPage() {
  return (
    <>
      <Masthead
        eyebrow="Hablemos"
        title={<>Con<em className="font-normal italic">tacto</em></>}
        size="small"
      />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <p
          className="font-cormorant text-[11px] uppercase mb-2"
          style={{ letterSpacing: '4px', color: '#9c7a52' }}
        >
          Estamos disponibles
        </p>
        <h2 className="font-playfair font-bold text-3xl mb-2" style={{ color: '#2a1f14' }}>
          Hablá con <em className="font-normal italic">nosotros</em>
        </h2>
        <div className="w-full h-px mb-10" style={{ background: 'rgba(42,31,20,0.15)' }} />

        <div className="space-y-8">
          <div>
            <p
              className="font-cormorant text-[10px] uppercase mb-2"
              style={{ letterSpacing: '4px', color: '#9c7a52' }}
            >
              WhatsApp
            </p>
            <a
              href="https://wa.me/13053705703"
              target="_blank"
              rel="noopener noreferrer"
              className="font-playfair text-xl"
              style={{ color: '#2a1f14' }}
            >
              +1 305 370 5703
            </a>
            <p className="font-cormorant text-base mt-1" style={{ color: '#9c8a72' }}>
              La forma más rápida de contactarnos para consultas y pedidos.
            </p>
          </div>

          <DecoRule />

          <div>
            <p
              className="font-cormorant text-[10px] uppercase mb-2"
              style={{ letterSpacing: '4px', color: '#9c7a52' }}
            >
              Instagram
            </p>
            <a
              href="https://instagram.com/kithaus"
              target="_blank"
              rel="noopener noreferrer"
              className="font-playfair text-xl"
              style={{ color: '#2a1f14' }}
            >
              @kithaus
            </a>
            <p className="font-cormorant text-base mt-1" style={{ color: '#9c8a72' }}>
              Seguinos para ver los últimos lanzamientos y novedades.
            </p>
          </div>

          <DecoRule />

          <div>
            <p
              className="font-cormorant text-[10px] uppercase mb-2"
              style={{ letterSpacing: '4px', color: '#9c7a52' }}
            >
              Email
            </p>
            <a
              href="mailto:hola@kithaus.com"
              className="font-playfair text-xl"
              style={{ color: '#2a1f14' }}
            >
              hola@kithaus.com
            </a>
          </div>

          <DecoRule />

          <div
            className="p-8"
            style={{ background: '#2a1f14' }}
          >
            <p className="font-cormorant italic text-base mb-4" style={{ color: 'rgba(240,234,216,0.7)' }}>
              Enviamos a todo Estados Unidos. Para consultas internacionales, escribinos por WhatsApp.
            </p>
            <a
              href="https://wa.me/13053705703?text=Hola%2C%20quería%20consultar%20por%20una%20camiseta%20de%20KITHAUS"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cormorant text-sm uppercase inline-block border-b pb-1 transition-colors"
              style={{ letterSpacing: '3px', color: '#9c7a52', borderColor: '#9c7a52' }}
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
