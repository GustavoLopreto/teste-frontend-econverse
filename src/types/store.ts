import type { CatalogProduct } from './product'

export interface CartItem {
  product: CatalogProduct
  quantity: number
}

export interface Account {
  name: string
  email: string
  phone: string
  zipCode: string
  address: string
  city: string
  plan?: string
}

export type PaymentMethod = 'pix' | 'card' | 'boleto'

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  customerName: string
  email: string
  address: string
  payment: PaymentMethod
}

export type NewOrder = Pick<Order, 'customerName' | 'email' | 'address' | 'payment'>
