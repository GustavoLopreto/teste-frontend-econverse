import { Link } from 'react-router'
import OrderCard from '../components/OrderCard/OrderCard'
import { usePageMeta } from '../hooks/usePageMeta'
import { useStore } from '../store/StoreContext'
import styles from './pages.module.scss'

function OrdersPage() {
  const { orders } = useStore()

  usePageMeta('Meus pedidos')

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Meus pedidos</h1>
      {orders.length === 0 ? (
        <div className={styles.empty}>
          <p>Você ainda não fez nenhum pedido.</p>
          <Link className={styles.primaryButton} to="/produtos">
            Ver produtos
          </Link>
        </div>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrdersPage
