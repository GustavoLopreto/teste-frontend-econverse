import { useState } from 'react'
import { Link, useParams } from 'react-router'
import FavoriteButton from '../components/FavoriteButton/FavoriteButton'
import ProductImage from '../components/ProductImage/ProductImage'
import ProductShelf from '../components/ProductShelf/ProductShelf'
import QuantitySelector from '../components/QuantitySelector/QuantitySelector'
import { findCategory } from '../data/categories'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCatalog, useStore } from '../store/StoreContext'
import { formatPrice } from '../utils/formatPrice'
import { getInstallments, getOldPrice, hasFreeShipping } from '../utils/pricing'
import { slugify } from '../utils/slugify'
import NotFoundPage from './NotFoundPage'
import styles from './pages.module.scss'

function ProductPage() {
  const { slug } = useParams()
  const { products, phonesStatus } = useCatalog()
  const { addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)
  const product = products.find((candidate) => candidate.slug === slug)

  usePageMeta(product?.productName ?? 'Produto', product?.descriptionShort)

  if (!product) {
    return phonesStatus === 'loading' ? (
      <div className={styles.page}>
        <h1 className={styles.title}>Carregando produto...</h1>
      </div>
    ) : (
      <NotFoundPage />
    )
  }

  const { productName, descriptionShort, photo, price, discount, brand, category } = product
  const installments = getInstallments(price, product.installments)
  const related = products.filter(
    (candidate) => candidate.category === category && candidate.slug !== product.slug,
  )

  return (
    <>
      <div className={styles.page}>
        <div className={styles.productPage}>
          <ProductImage className={styles.productPhoto} src={photo} alt={productName} size={460} />
          <div>
            <Link className={styles.brand} to={`/marca/${slugify(brand)}`}>
              {brand}
            </Link>
            {' · '}
            <Link className={styles.brand} to={`/categoria/${category}`}>
              {findCategory(category)?.label}
            </Link>
            <h1 className={styles.productName}>{productName}</h1>
            {discount && (
              <p className={styles.oldPrice}>
                <del>{formatPrice(getOldPrice(price, discount))}</del> ({discount}% de desconto)
              </p>
            )}
            <p className={styles.bigPrice}>{formatPrice(price)}</p>
            <p className={styles.muted}>
              {installments.count > 1
                ? `ou ${installments.count}x de ${formatPrice(installments.value)} sem juros`
                : 'à vista no Pix ou no cartão'}
              {hasFreeShipping(product) && ' · Frete grátis'}
            </p>
            <p className={styles.muted}>{descriptionShort}</p>
            <div className={styles.buyRow}>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => addToCart(product, quantity)}
              >
                Comprar
              </button>
              <FavoriteButton slug={product.slug} name={productName} />
            </div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <ProductShelf
          title="Produtos relacionados"
          products={related}
          seeAllTo={`/categoria/${category}`}
        />
      )}
    </>
  )
}

export default ProductPage
