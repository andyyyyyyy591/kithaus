'use client'

interface MastheadProps {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  size?: 'large' | 'small'
}

export default function Masthead({ eyebrow, title, subtitle, size = 'large' }: MastheadProps) {
  return (
    <div
      className={`relative overflow-hidden text-center ${size === 'large' ? 'py-16 md:py-24' : 'py-10 md:py-14'}`}
      style={{ background: '#2a1f14', color: '#f0ead8' }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(240,234,216,0.03) 40px,
            rgba(240,234,216,0.03) 41px
          )`,
        }}
      />
      <div className="relative z-10 px-6">
        {/* Top rule */}
        <div className="w-[60px] h-px mx-auto mb-5" style={{ background: '#9c7a52' }} />
        {eyebrow && (
          <p
            className="font-cormorant text-[11px] uppercase mb-4"
            style={{ letterSpacing: '5px', color: '#9c7a52' }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-playfair font-bold leading-none mb-5"
          style={{
            fontSize: size === 'large' ? 'clamp(56px, 8vw, 96px)' : 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-1px',
            lineHeight: 0.95,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="font-cormorant italic text-base"
            style={{ letterSpacing: '2px', color: 'rgba(240,234,216,0.5)' }}
          >
            {subtitle}
          </p>
        )}
        {/* Bottom rule */}
        <div className="w-[60px] h-px mx-auto mt-5" style={{ background: '#9c7a52' }} />
      </div>
    </div>
  )
}
