import { Link } from 'react-router'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import ProductImage from '../components/ProductImage/ProductImage'
import QuantitySelector from '../components/QuantitySelector/QuantitySelector'
import { usePageMeta } from '../hooks/usePageMeta'
import { useStore } from '../store/StoreContext'
import { formatPrice } from '../utils/formatPrice'
import { FREE_SHIPPING_MINIMUM, getCartShipping } from '../utils/pricing'
import styles from './pages.module.scss'

function CartPage() {
  const { cart, subtotal, setQuantity, removeFromCart } = useStore()

  usePageMeta('Carrinho')

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Carrinho</h1>
        <div className={styles.empty}>
          <p>Seu carrinho está vazio.</p>
          <Link className={styles.primaryButton} to="/produtos">
            Ver produtos
          </Link>
        </div>
      </div>
    )
  }

  const shipping = getCartShipping(cart)
  const missingForFreeShipping = shipping > 0 ? FREE_SHIPPING_MINIMUM - subtotal : 0

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Carrinho</h1>
      {missingForFreeShipping > 0 && (
        <p className={styles.subtitle}>
          Faltam {formatPrice(missingForFreeShipping)} para ganhar frete grátis.
        </p>
      )}
      <div className={styles.twoColumns}>
        <ul className={styles.cartList}>
          {cart.map(({ product, quantity }) => (
            <li className={styles.cartItem} key={product.slug}>
              <ProductImage className={styles.cartPhoto} src={product.photo} alt="" size={96} />
              <div>
                <Link className={styles.cartName} to={`/produto/${product.slug}`}>
                  {product.productName}
                </Link>
                <div className={styles.cartControls}>
                  <QuantitySelector
                    quantity={quantity}
                    onChange={(value) => setQuantity(product.slug, value)}
                  />
                  <button
                    className={styles.linkButton}
                    type="button"
                    aria-label={`Remover ${product.productName}`}
                    onClick={() => removeFromCart(product.slug)}
                  >
                    Remover
                  </button>
                </div>
              </div>
              <span className={styles.cartPrice}>{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <aside className={styles.card} aria-label="Resumo do pedido">
          <h2 className={styles.sectionTitle}>Resumo</h2>
          <OrderSummary subtotal={subtotal} shipping={shipping} />
          <div className={styles.actions}>
            <Link className={styles.primaryButton} to="/checkout">
              Finalizar compra
            </Link>
            <Link className={styles.secondaryButton} to="/produtos">
              Continuar comprando
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CartPage
