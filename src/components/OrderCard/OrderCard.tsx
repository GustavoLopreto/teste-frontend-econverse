import { useId, useState } from 'react'
import { Link } from 'react-router'
import type { Order } from '../../types/store'
import { formatPrice } from '../../utils/formatPrice'
import Icon from '../Icon/Icon'
import ProductImage from '../ProductImage/ProductImage'
import styles from './OrderCard.module.scss'

interface OrderCardProps {
  order: Order
}

function OrderCard({ order }: OrderCardProps) {
  const { id, createdAt, items, total } = order
  const [isOpen, setIsOpen] = useState(false)
  const detailsId = useId()
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <article className={styles.order}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Pedido {id}</h2>
          <p className={styles.meta}>
            {new Date(createdAt).toLocaleDateString('pt-BR')} · {itemCount}{' '}
            {itemCount === 1 ? 'item' : 'itens'} · {formatPrice(total)}
          </p>
        </div>
        <button
          className={styles.toggle}
          type="button"
          aria-label={`${isOpen ? 'Ocultar' : 'Mostrar'} itens do pedido ${id}`}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name={isOpen ? 'minus' : 'plus'} size={24} />
        </button>
      </div>

      {!isOpen && (
        <ul className={styles.thumbnails}>
          {items.map(({ product }) => (
            <li key={product.slug}>
              <ProductImage
                className={styles.thumbnail}
                src={product.photo}
                alt={product.productName}
                size={72}
              />
            </li>
          ))}
        </ul>
      )}

      <div id={detailsId} hidden={!isOpen}>
        <ul className={styles.items}>
          {items.map(({ product, quantity }) => (
            <li className={styles.item} key={product.slug}>
              <ProductImage className={styles.thumbnail} src={product.photo} alt="" size={72} />
              <div className={styles.itemInfo}>
                <Link className={styles.itemName} to={`/produto/${product.slug}`}>
                  {product.productName}
                </Link>
                <span className={styles.meta}>
                  {quantity} × {formatPrice(product.price)}
                </span>
              </div>
              <span className={styles.itemTotal}>{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <Link className={styles.detailsLink} to={`/pedido/${id}`}>
          Ver pagamento e entrega do pedido {id}
        </Link>
      </div>
    </article>
  )
}

export default OrderCard
