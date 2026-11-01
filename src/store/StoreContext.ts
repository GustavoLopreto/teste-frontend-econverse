import { createContext, useContext } from 'react'
import type { CatalogProduct } from '../types/product'
import type { Account, CartItem, NewOrder, Order } from '../types/store'

export interface CatalogValue {
  products: CatalogProduct[]
  phonesStatus: 'loading' | 'success' | 'error'
}

export interface StoreValue {
  cart: CartItem[]
  cartCount: number
  subtotal: number
  addToCart: (product: CatalogProduct, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  removeFromCart: (slug: string) => void
  favorites: string[]
  toggleFavorite: (slug: string) => void
  orders: Order[]
  placeOrder: (order: NewOrder) => Order
  account: Account
  saveAccount: (account: Account) => void
  selectedProduct: CatalogProduct | null
  openProduct: (product: CatalogProduct) => void
  closeProduct: () => void
  toast: string | null
  notify: (message: string) => void
}

export const CatalogContext = createContext<CatalogValue | null>(null)
export const StoreContext = createContext<StoreValue | null>(null)

export function useCatalog(): CatalogValue {
  const value = useContext(CatalogContext)

  if (!value) {
    throw new Error('useCatalog precisa estar dentro de StoreProvider')
  }

  return value
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext)

  if (!value) {
    throw new Error('useStore precisa estar dentro de StoreProvider')
  }

  return value
}
