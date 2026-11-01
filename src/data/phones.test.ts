import { describe, expect, it } from 'vitest'
import type { Product } from '../types/product'
import { toCatalogPhones } from './phones'

const product: Product = {
  productName: 'IPHONE 13 MINI 1',
  descriptionShort: 'IPHONE 13 MINI 1',
  photo: 'https://example.com/foto-iphone.png',
  price: 9000,
}

describe('toCatalogPhones', () => {
  it('preserva os dados e o preco recebidos do JSON', () => {
    expect(toCatalogPhones([product])[0]).toMatchObject(product)
  })

  it('acrescenta os campos usados na navegacao e no card', () => {
    expect(toCatalogPhones([product])[0]).toMatchObject({
      slug: 'iphone-13-mini-1',
      category: 'celular',
      brand: 'Apple',
      discount: 7,
      freeShipping: true,
      installments: 2,
    })
  })
})
