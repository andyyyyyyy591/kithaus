import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import ProductCard from '@/components/ProductCard'
import DecoRule from '@/components/DecoRule'
import type { Product, Collection } from '@/lib/types'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*, collections(*), product_images(*)')
      .eq('active', true)
      .eq('featured', true)
      .order('order')
      .limit(4)
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

async function getCollections(): Promise<Collection[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('collections')
      .select('*')
      .eq('active', true)
      .order('order')
      .limit(4)
    return (data as Collection[]) ?? []
  } catch {
    return []
  }
}

export default async function Home() {
  const [featured, collections] = await Promise.all([getFeaturedProducts(), getCollections()])

  const collectionCovers: Record<string, string> = {
    selecciones: '#2a1f14',
    clubes: '#1a1208',
    retros: '#3d2b1a',
    mundiales: '#0f0c08',
  }

  return (
    <>
      {/* HERO — Diego México 86 */}
      <div className="relative w-full" style={{ height: '100vh', minHeight: 600 }}>
        <Image
          src="/hero/diego-mexico86.jpg"
          alt="Diego Maradona — México 1986"
          fill
          priority
          className="object-cover object-top"
          style={{ filter: 'saturate(0.85) contrast(1.05)' }}
        />
        {/* Overlay base */}
        <div className="absolute inset-0" style={{ background: 'rgba(42,31,20,0.35)' }} />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(42,31,20,0.3) 0%, transparent 30%, rgba(42,31,20,0.55) 100%)',
          }}
        />
        {/* Text overlay centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-[60px] h-px mx-auto mb-5" style={{ background: '#9c7a52' }} />
          <p className="font-cormorant text-[11px] uppercase mb-4" style={{ letterSpacing: '5px', color: 'rgba(240,234,216,0.85)' }}>
            Colección 2026
          </p>
          <h1
            className="font-playfair font-bold leading-none mb-5 text-white"
            style={{ fontSize: 'clamp(56px, 8vw, 96px)', letterSpacing: '-1px', lineHeight: 0.95 }}
          >
            KIT<em className="font-normal italic">HAUS</em>
          </h1>
          <p className="font-cormorant italic text-base mb-8" style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.85)' }}>
            El fútbol como cultura. La camiseta como identidad.
          </p>
          <div className="w-[60px] h-px mx-auto mb-8" style={{ background: '#9c7a52' }} />
          <Link
            href="/tienda"
            className="font-cormorant text-sm uppercase inline-block border-b pb-1 transition-colors duration-200"
            style={{
              letterSpacing: '3px',
              color: '#f0ead8',
              borderColor: '#9c7a52',
            }}
          >
            Ver Colección →
          </Link>
        </div>
      </div>

      {/* DESTACADAS */}
      {featured.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-6 py-20">
          <p className="font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
            Selección del Editor
          </p>
          <h2 className="font-playfair font-bold text-4xl mb-2" style={{ color: '#2a1f14' }}>
            Camisetas <em className="font-normal italic">Destacadas</em>
          </h2>
          <div className="w-full h-px mb-10" style={{ background: 'rgba(42,31,20,0.15)' }} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tienda"
              className="font-cormorant text-sm uppercase inline-block border-b pb-1 transition-colors"
              style={{ letterSpacing: '3px', color: '#2a1f14', borderColor: '#9c7a52' }}
            >
              Ver toda la tienda →
            </Link>
          </div>
        </section>
      )}

      <DecoRule />

      {/* COLECCIONES */}
      <section className="max-w-screen-xl mx-auto px-6 py-12">
        <p className="font-cormorant text-[11px] uppercase mb-2" style={{ letterSpacing: '4px', color: '#9c7a52' }}>
          Explorar
        </p>
        <h2 className="font-playfair font-bold text-4xl mb-2" style={{ color: '#2a1f14' }}>
          Las <em className="font-normal italic">Colecciones</em>
        </h2>
        <div className="w-full h-px mb-10" style={{ background: 'rgba(42,31,20,0.15)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(collections.length > 0
            ? collections
            : [
                { id: '1', slug: 'selecciones', name: 'Selecciones', cover_image: null },
                { id: '2', slug: 'clubes', name: 'Clubes', cover_image: null },
                { id: '3', slug: 'retros', name: 'Retros', cover_image: null },
                { id: '4', slug: 'mundiales', name: 'Mundiales', cover_image: null },
              ]
          ).map((col) => (
            <Link
              key={col.id}
              href={`/coleccion/${col.slug}`}
              className="group relative overflow-hidden flex items-end p-8 md:p-12"
              style={{
                minHeight: 260,
                background: collectionCovers[col.slug] ?? '#2a1f14',
              }}
            >
              {col.cover_image && (
                <Image
                  src={col.cover_image}
                  alt={col.name}
                  fill
                  className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="relative z-10">
                <p
                  className="font-cormorant text-[10px] uppercase mb-2"
                  style={{ letterSpacing: '4px', color: '#9c7a52' }}
                >
                  Colección
                </p>
                <h3
                  className="font-playfair font-bold text-3xl"
                  style={{ color: '#f0ead8', lineHeight: 1 }}
                >
                  {col.name}
                </h3>
              </div>
              <div
                className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                style={{ background: '#9c7a52' }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="py-10 px-6 flex justify-center" style={{ background: '#f0ead8' }}>
        <div
          className="text-center px-10 py-8"
          style={{ background: '#2a1f14', display: 'inline-block' }}
        >
          <div className="w-[32px] h-px mx-auto mb-5" style={{ background: '#9c7a52', opacity: 0.6 }} />
          <blockquote
            className="font-playfair italic whitespace-nowrap"
            style={{ fontSize: 'clamp(14px, 2vw, 26px)', color: '#f0ead8' }}
          >
            "Algunas camisetas cargan la historia en la espalda."
          </blockquote>
          <div className="w-[32px] h-px mx-auto mt-5" style={{ background: '#9c7a52', opacity: 0.6 }} />
        </div>
      </section>
    </>
  )
}
