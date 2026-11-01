import { categories, findCategory } from '../data/categories'
import type { CatalogProduct } from '../types/product'
import { normalizeText } from './slugify'

export function filterByCategory(products: CatalogProduct[], slug: string): CatalogProduct[] {
  const slugs = [slug, ...(findCategory(slug)?.children ?? [])]

  return products.filter((product) => slugs.includes(product.category))
}

// Todas as palavras precisam aparecer, sem diferenciar maiusculas nem acentos.
export function searchProducts(products: CatalogProduct[], query: string): CatalogProduct[] {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean)

  if (terms.length === 0) {
    return []
  }

  return products.filter((product) => {
    const label = categories.find(({ slug }) => slug === product.category)?.label ?? ''
    const text = normalizeText(
      `${product.productName} ${product.descriptionShort} ${product.brand} ${label}`,
    )

    return terms.every((term) => text.includes(term))
  })
}

export type SortOption = 'relevance' | 'lowest' | 'highest' | 'name' | 'discount'

export function sortProducts(products: CatalogProduct[], sort: SortOption): CatalogProduct[] {
  const sorted = [...products]

  switch (sort) {
    case 'lowest':
      return sorted.sort((a, b) => a.price - b.price)
    case 'highest':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.productName.localeCompare(b.productName, 'pt-BR'))
    case 'discount':
      return sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    default:
      return sorted
  }
}
