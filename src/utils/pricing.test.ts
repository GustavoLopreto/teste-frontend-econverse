import { describe, expect, it } from 'vitest'
import { productFixture } from '../test/fixtures'
import {
  getCartShipping,
  getInstallments,
  getOldPrice,
  hasFreeShipping,
  SHIPPING_PRICE,
} from './pricing'

describe('pricing', () => {
  it('calcula o preco original a partir do desconto', () => {
    expect(getOldPrice(5000, 50)).toBe(10000)
  })

  it('parcela conforme o valor do produto', () => {
    expect(getInstallments(3000)).toEqual({ count: 1, value: 3000 })
    expect(getInstallments(10000)).toEqual({ count: 2, value: 5000 })
    expect(getInstallments(40000)).toEqual({ count: 4, value: 10000 })
    expect(getInstallments(150000)).toEqual({ count: 10, value: 15000 })
  })

  it('respeita o numero de parcelas definido no produto', () => {
    expect(getInstallments(520, 2)).toEqual({ count: 2, value: 260 })
  })

  it('reconhece o frete gratis pelo produto ou pelo valor', () => {
    expect(hasFreeShipping(productFixture)).toBe(false)
    expect(hasFreeShipping({ ...productFixture, freeShipping: true })).toBe(true)
    expect(hasFreeShipping({ ...productFixture, price: 20000 })).toBe(true)
  })

  it('calcula o frete do carrinho', () => {
    const paid = { product: productFixture, quantity: 1 }
    const free = { product: { ...productFixture, freeShipping: true }, quantity: 1 }

    expect(getCartShipping([])).toBe(0)
    expect(getCartShipping([paid])).toBe(SHIPPING_PRICE)
    expect(getCartShipping([{ ...paid, quantity: 2 }])).toBe(0)
    expect(getCartShipping([free])).toBe(0)
    expect(getCartShipping([free, paid])).toBe(0)
  })
})
