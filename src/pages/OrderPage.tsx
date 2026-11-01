import { Link, useParams } from 'react-router'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import { usePageMeta } from '../hooks/usePageMeta'
import { useStore } from '../store/StoreContext'
import { formatPrice } from '../utils/formatPrice'
import NotFoundPage from './NotFoundPage'
import styles from './pages.module.scss'

const paymentMessages = {
  pix: 'Use o código Pix simulado abaixo. Nenhum valor será cobrado.',
  card: 'Pagamento no cartão aprovado nesta simulação. Nenhum valor foi cobrado.',
  boleto: 'Use o código de boleto simulado abaixo. Nenhum valor será cobrado.',
}

function OrderPage() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((candidate) => candidate.id === id)

  usePageMeta(order ? `Pedido ${order.id}` : 'Pedido')

  if (!order) {
    return <NotFoundPage />
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Pedido confirmado!</h1>
      <p className={styles.subtitle}>
        Obrigado, {order.customerName}. Seu pedido {order.id} foi registrado.
      </p>
      <div className={styles.twoColumns}>
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Pagamento</h2>
          <p className={styles.muted}>{paymentMessages[order.payment]}</p>
          {order.payment !== 'card' && (
            <p className={styles.pixCode}>SIMULACAO-ECONVERSE-{order.id}</p>
          )}
          <h2 className={styles.sectionTitle}>Entrega</h2>
          <p className={styles.muted}>{order.address}</p>
          <p className={styles.muted}>Confirmação simulada para {order.email}.</p>
        </section>
        <aside className={styles.card} aria-label="Resumo do pedido">
          <h2 className={styles.sectionTitle}>Itens</h2>
          <ul className={styles.orderItems}>
            {order.items.map(({ product, quantity }) => (
              <li key={product.slug}>
                {quantity}x {product.productName}: {formatPrice(product.price * quantity)}
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={order.subtotal} shipping={order.shipping} />
        </aside>
      </div>
      <div className={styles.actions}>
        <Link className={styles.primaryButton} to="/produtos">
          Continuar comprando
        </Link>
        <Link className={styles.secondaryButton} to="/pedidos">
          Ver meus pedidos
        </Link>
      </div>
    </div>
  )
}

export default OrderPage
