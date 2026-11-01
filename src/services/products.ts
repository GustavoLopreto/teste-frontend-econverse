import type { Product, ProductsResponse } from '../types/product'

// O endpoint nao envia cabecalhos CORS, entao a chamada passa pelo proxy do Vite.
const PRODUCTS_URL = '/api/produtos'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal })

  if (!response.ok) {
    throw new Error(`Falha ao buscar produtos: HTTP ${response.status}`)
  }

  const data = (await response.json()) as ProductsResponse

  if (!data.success) {
    throw new Error('Falha ao buscar produtos: resposta sem sucesso')
  }

  return data.products
}
