import type { CatalogProduct } from '../types/product'
import type { CartItem } from '../types/store'

export const FREE_SHIPPING_MINIMUM = 20000
export const SHIPPING_PRICE = 1990

export function getOldPrice(priceInCents: number, discount: number): number {
  return Math.round(priceInCents / (1 - discount / 100))
}

function getDefaultInstallments(priceInCents: number): number {
  if (priceInCents >= 100000) {
    return 10
  }

  if (priceInCents >= 20000) {
    return 4
  }

  return priceInCents >= 5000 ? 2 : 1
}

export function getInstallments(
  priceInCents: number,
  count = getDefaultInstallments(priceInCents),
): { count: number; value: number } {
  return { count, value: Math.round(priceInCents / count) }
}

export function hasFreeShipping(product: CatalogProduct): boolean {
  return Boolean(product.freeShipping) || product.price >= FREE_SHIPPING_MINIMUM
}

export function getCartShipping(items: CartItem[]): number {
  const subtotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  )
  const isFree =
    subtotal >= FREE_SHIPPING_MINIMUM || items.every(({ product }) => hasFreeShipping(product))

  return isFree ? 0 : SHIPPING_PRICE
}
