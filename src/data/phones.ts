import type { CatalogProduct, Product } from '../types/product'
import { slugify } from '../utils/slugify'

// Mantem nome, descricao, foto e preco do JSON do teste. O preco riscado, as parcelas e o
// frete nao existem no JSON: sao derivados do preco oficial para seguir o card do layout.
export function toCatalogPhones(products: Product[]): CatalogProduct[] {
  return products.map((product) => ({
    ...product,
    slug: slugify(product.productName),
    category: 'celular',
    brand: 'Apple',
    discount: 7,
    freeShipping: true,
    installments: 2,
  }))
}
