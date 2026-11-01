import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { catalog } from '../data/catalog'
import { toCatalogPhones } from '../data/phones'
import { usePersistentState } from '../hooks/usePersistentState'
import { useProducts } from '../hooks/useProducts'
import type { CatalogProduct } from '../types/product'
import type { Account, CartItem, NewOrder, Order } from '../types/store'
import { getCartShipping } from '../utils/pricing'
import { CatalogContext, StoreContext } from './StoreContext'
import type { CatalogValue, StoreValue } from './StoreContext'

const TOAST_DURATION = 3000

const emptyAccount: Account = {
  name: '',
  email: '',
  phone: '',
  zipCode: '',
  address: '',
  city: '',
}

function StoreProvider({ children }: { children: ReactNode }) {
  const productsState = useProducts()
  const [cart, setCart] = usePersistentState<CartItem[]>('econverse:cart', [])
  const [favorites, setFavorites] = usePersistentState<string[]>('econverse:favorites', [])
  const [orders, setOrders] = usePersistentState<Order[]>('econverse:orders', [])
  const [account, saveAccount] = usePersistentState<Account>('econverse:account', emptyAccount)
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const catalogValue = useMemo<CatalogValue>(() => {
    const phones = productsState.status === 'success' ? toCatalogPhones(productsState.products) : []

    return { products: [...phones, ...catalog], phonesStatus: productsState.status }
  }, [productsState])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  function notify(message: string) {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_DURATION)
  }

  function addToCart(product: CatalogProduct, quantity = 1) {
    setCart((items) => {
      const exists = items.some((item) => item.product.slug === product.slug)

      return exists
        ? items.map((item) =>
            item.product.slug === product.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...items, { product, quantity }]
    })
    notify(`${product.productName} foi adicionado ao carrinho`)
  }

  function setQuantity(slug: string, quantity: number) {
    setCart((items) =>
      items.map((item) => (item.product.slug === slug ? { ...item, quantity } : item)),
    )
  }

  function removeFromCart(slug: string) {
    setCart((items) => items.filter((item) => item.product.slug !== slug))
  }

  function toggleFavorite(slug: string) {
    setFavorites((slugs) =>
      slugs.includes(slug) ? slugs.filter((favorite) => favorite !== slug) : [...slugs, slug],
    )
  }

  function placeOrder(newOrder: NewOrder): Order {
    const shipping = getCartShipping(cart)
    const order: Order = {
      ...newOrder,
      id: `EC-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items: cart,
      subtotal,
      shipping,
      total: subtotal + shipping,
    }

    setOrders((previous) => [order, ...previous])
    setCart([])

    return order
  }

  const storeValue: StoreValue = {
    cart,
    cartCount,
    subtotal,
    addToCart,
    setQuantity,
    removeFromCart,
    favorites,
    toggleFavorite,
    orders,
    placeOrder,
    account,
    saveAccount,
    selectedProduct,
    openProduct: setSelectedProduct,
    closeProduct: () => setSelectedProduct(null),
    toast,
    notify,
  }

  return (
    <CatalogContext.Provider value={catalogValue}>
      <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
    </CatalogContext.Provider>
  )
}

export default StoreProvider
