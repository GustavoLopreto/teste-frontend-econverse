import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Product } from '../types/product'
import { fetchProducts } from './products'

const product: Product = {
  productName: 'Produto',
  descriptionShort: 'Descricao',
  photo: 'https://example.com/foto.png',
  price: 1000,
}

function mockFetch(body: unknown, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json(body, { status })))
}

describe('fetchProducts', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('retorna a lista de produtos', async () => {
    mockFetch({ success: true, products: [product] })

    await expect(fetchProducts()).resolves.toEqual([product])
  })

  it('rejeita quando a resposta HTTP falha', async () => {
    mockFetch({}, 500)

    await expect(fetchProducts()).rejects.toThrow('HTTP 500')
  })

  it('rejeita quando a API indica falta de sucesso', async () => {
    mockFetch({ success: false, products: [] })

    await expect(fetchProducts()).rejects.toThrow('resposta sem sucesso')
  })
})
