import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'

export type ProductsState =
  { status: 'loading' } | { status: 'success'; products: Product[] } | { status: 'error' }

export function useProducts(): ProductsState {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: 'error' })
        }
      })

    return () => controller.abort()
  }, [])

  return state
}
