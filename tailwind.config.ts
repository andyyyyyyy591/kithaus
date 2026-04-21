import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tabaco: '#0f0c08',
        'marron-oscuro': '#2a1f14',
        'marron-medio': '#5c3d1e',
        'marron-claro': '#9c7a52',
        crema: '#f0ead8',
        'blanco-calido': '#faf7f0',
        muted: '#9c8a72',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.3em',
        wide5: '0.4em',
      },
    },
  },
  plugins: [],
}
export default config
