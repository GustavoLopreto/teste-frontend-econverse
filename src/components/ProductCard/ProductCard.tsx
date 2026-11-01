import { useStore } from '../../store/StoreContext'
import type { CatalogProduct } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { getInstallments, getOldPrice, hasFreeShipping } from '../../utils/pricing'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import ProductImage from '../ProductImage/ProductImage'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: CatalogProduct
  // O selo de desconto e o favorito nao fazem parte do card do layout da pagina inicial.
  showExtras?: boolean
}

function ProductCard({ product, showExtras }: ProductCardProps) {
  const { productName, photo, price, discount, slug } = product
  const { addToCart, openProduct } = useStore()
  const installments = getInstallments(price, product.installments)

  return (
    <article className={styles.card}>
      <ProductImage
        className={`${styles.photo} ${product.category === 'celular' ? styles.photoJson : ''}`}
        src={photo}
        alt={productName}
        size={228}
        lazy
      />
      {showExtras && discount && <span className={styles.discount}>-{discount}%</span>}
      {showExtras && <FavoriteButton className={styles.favorite} slug={slug} name={productName} />}
      <h3 className={styles.name}>
        {/* O ::after deste botao cobre o card inteiro, tornando todo o produto clicavel. */}
        <button
          className={styles.open}
          type="button"
          aria-label={`Ver detalhes de ${productName}`}
          onClick={() => openProduct(product)}
        >
          {productName}
        </button>
      </h3>
      <p className={styles.oldPrice}>
        {discount && <del>{formatPrice(getOldPrice(price, discount))}</del>}
      </p>
      <p className={styles.price}>{formatPrice(price)}</p>
      <p className={styles.installments}>
        {installments.count > 1
          ? `ou ${installments.count}x de ${formatPrice(installments.value)} sem juros`
          : 'à vista no Pix ou no cartão'}
      </p>
      <p className={styles.shipping}>{hasFreeShipping(product) && 'Frete grátis'}</p>
      <button
        className={styles.buy}
        type="button"
        aria-label={`Comprar ${productName}`}
        onClick={() => addToCart(product)}
      >
        Comprar
      </button>
    </article>
  )
}

export default ProductCard
