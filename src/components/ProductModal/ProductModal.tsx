import { useEffect, useId, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router'
import { useStore } from '../../store/StoreContext'
import type { CatalogProduct } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import Icon from '../Icon/Icon'
import ProductImage from '../ProductImage/ProductImage'
import QuantitySelector from '../QuantitySelector/QuantitySelector'
import styles from './ProductModal.module.scss'

interface ProductModalProps {
  product: CatalogProduct
  onClose: () => void
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const { productName, descriptionShort, photo, price, slug } = product
  const { addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [])

  function close() {
    dialogRef.current?.close()
  }

  function handleBuy() {
    addToCart(product, quantity)
    close()
  }

  // Um clique cujo alvo e o proprio <dialog> so pode ter vindo do backdrop.
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      close()
    }
  }

  return (
    // O clique so trata o backdrop: pelo teclado, o <dialog> ja fecha com Esc.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      className={styles.modal}
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <button className={styles.close} type="button" aria-label="Fechar" onClick={close}>
          <Icon name="close" size={24} />
        </button>

        <ProductImage className={styles.photo} src={photo} alt={productName} size={270} />

        <div className={styles.details}>
          <h2 className={styles.name} id={titleId}>
            {productName}
          </h2>
          <p className={styles.price}>{formatPrice(price)}</p>
          <p className={styles.description}>{descriptionShort}</p>
          <Link className={styles.moreDetails} to={`/produto/${slug}`} onClick={onClose}>
            Veja mais detalhes do produto &gt;
          </Link>

          <div className={styles.actions}>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <button className={styles.buy} type="button" onClick={handleBuy}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ProductModal
