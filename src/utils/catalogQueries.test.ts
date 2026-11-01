import { describe, expect, it } from 'vitest'
import { productFixture } from '../test/fixtures'
import type { CatalogProduct } from '../types/product'
import { filterByCategory, searchProducts, sortProducts } from './catalogQueries'

const phone: CatalogProduct = {
  ...productFixture,
  productName: 'Galaxy Câmera',
  brand: 'Samsung',
  category: 'celular',
  slug: 'galaxy',
  price: 200,
}
const juice: CatalogProduct = {
  ...productFixture,
  productName: 'Suco',
  brand: 'Pomar',
  category: 'bebidas',
  slug: 'suco',
  price: 100,
  discount: 10,
}

describe('searchProducts', () => {
  it('ignora acentos e maiusculas', () => {
    expect(searchProducts([phone, juice], 'CAMERA')).toEqual([phone])
  })

  it('exige todas as palavras e busca tambem por marca e categoria', () => {
    expect(searchProducts([phone, juice], 'samsung celular')).toEqual([phone])
    expect(searchProducts([phone, juice], 'samsung bebidas')).toEqual([])
  })

  it('nao retorna nada para uma busca vazia', () => {
    expect(searchProducts([phone, juice], '   ')).toEqual([])
  })
})

describe('filterByCategory', () => {
  it('inclui as subcategorias', () => {
    expect(filterByCategory([phone, juice], 'tecnologia')).toEqual([phone])
    expect(filterByCategory([phone, juice], 'bebidas')).toEqual([juice])
  })
})

describe('sortProducts', () => {
  it('ordena sem alterar a lista original', () => {
    const products = [phone, juice]

    expect(sortProducts(products, 'lowest')).toEqual([juice, phone])
    expect(sortProducts(products, 'discount')).toEqual([juice, phone])
    expect(products).toEqual([phone, juice])
  })
})
