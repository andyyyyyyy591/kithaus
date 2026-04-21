# KITHAUS

**El fútbol como cultura. La camiseta como identidad.**

Tienda online de camisetas de fútbol retro y de Mundiales. Catálogo con botón a WhatsApp — sin checkout de pago. Panel admin completo.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Vercel

---

## Setup paso a paso

### 1. Clonar y instalar

```bash
git clone https://github.com/andyyyyyyS91/kithaus.git
cd kithaus
npm install
```

### 2. Crear proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com) y crear un nuevo proyecto
2. Ir a **SQL Editor** y correr los archivos en orden:
   - `supabase/migrations/001_initial.sql`
   - `supabase/migrations/002_seed.sql`
3. Ir a **Storage** → crear bucket llamado `products` → marcarlo como **público**

### 3. Variables de entorno

Copiar `.env.example` a `.env.local` y completar con tus credenciales de Supabase:

```bash
cp .env.example .env.local
```

Las credenciales están en Supabase → **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Crear usuarios admin

Los admins se crean manualmente en Supabase:

1. Ir a Supabase → **Authentication → Users**
2. Clic en **Invite user** o **Add user**
3. Ingresar email y contraseña
4. El usuario puede entrar en `/admin/login`

Máximo 3 usuarios admins.

---

## Deploy en Vercel

1. Crear repo en GitHub y hacer push:
   ```bash
   git remote add origin https://github.com/andyyyyyyS91/kithaus.git
   git add .
   git commit -m "Initial commit — KITHAUS"
   git push -u origin main
   ```

2. Ir a [vercel.com](https://vercel.com) → **New Project** → importar el repo de GitHub

3. Agregar las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. Deploy → Vercel detecta Next.js automáticamente

Cada push a `main` triggerea un deploy automático. Cada branch crea un preview deployment.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              → Home
│   ├── tienda/               → Catálogo completo
│   ├── coleccion/[slug]/     → Por colección
│   ├── producto/[slug]/      → Detalle de producto
│   ├── contacto/             → Contacto
│   └── admin/                → Panel admin (protegido)
│       ├── login/
│       ├── dashboard/
│       ├── productos/
│       ├── colecciones/
│       └── configuracion/
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Masthead.tsx
│   ├── ProductCard.tsx
│   ├── DecoRule.tsx
│   └── admin/AdminShell.tsx
└── lib/
    ├── supabase.ts           → Cliente browser
    ├── supabase-server.ts    → Cliente server
    ├── whatsapp.ts           → Helper URL WhatsApp
    └── types.ts              → Tipos TypeScript
```

---

## WhatsApp

Número: **+1 305 370 5703**

El botón en cada producto genera un mensaje pre-cargado con el nombre del producto y la talla seleccionada.

---

*KITHAUS — 2026*
