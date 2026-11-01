import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'
import { useProducts } from './useProducts'

vi.mock('../services/products')

const product: Product = {
  productName: 'Produto',
  descriptionShort: 'Descricao',
  photo: 'https://example.com/foto.png',
  price: 1000,
}

describe('useProducts', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('comeca carregando e entrega os produtos', async () => {
    vi.mocked(fetchProducts).mockResolvedValue([product])

    const { result } = renderHook(() => useProducts())

    expect(result.current).toEqual({ status: 'loading' })
    await waitFor(() => {
      expect(result.current).toEqual({ status: 'success', products: [product] })
    })
  })

  it('indica erro quando a busca falha', async () => {
    vi.mocked(fetchProducts).mockRejectedValue(new Error('falha'))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current).toEqual({ status: 'error' })
    })
  })

  it('cancela a busca ao desmontar', () => {
    vi.mocked(fetchProducts).mockReturnValue(new Promise(() => {}))

    const { unmount } = renderHook(() => useProducts())
    const signal = vi.mocked(fetchProducts).mock.calls[0][0]

    unmount()

    expect(signal?.aborted).toBe(true)
  })
})
