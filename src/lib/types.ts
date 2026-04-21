export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image: string | null
  order: number
  active: boolean
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  collection_id: string | null
  extra_collection_ids: string[]
  sizes_available: string[]
  featured: boolean
  active: boolean
  order: number
  created_at: string
  updated_at: string
  collections?: Collection
  product_images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt: string | null
  is_primary: boolean
  order: number
}

export interface SiteSetting {
  key: string
  value: string | null
  updated_at: string
}
