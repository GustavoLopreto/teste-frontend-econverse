import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('converte centavos para reais', () => {
    expect(formatPrice(2890)).toBe('R$ 28,90')
  })

  it('separa os milhares', () => {
    expect(formatPrice(149990)).toBe('R$ 1.499,90')
  })
})
