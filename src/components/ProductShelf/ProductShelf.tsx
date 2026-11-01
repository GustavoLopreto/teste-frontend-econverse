import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useCatalog } from '../../store/StoreContext'
import type { CatalogProduct } from '../../types/product'
import { filterByCategory } from '../../utils/catalogQueries'
import Icon from '../Icon/Icon'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductShelf.module.scss'

const tabs = [
  { slug: 'celular', label: 'Celular' },
  { slug: 'acessorios', label: 'Acessórios' },
  { slug: 'tablets', label: 'Tablets' },
  { slug: 'notebooks', label: 'Notebooks' },
  { slug: 'tvs', label: 'TVs' },
]

interface ProductShelfProps {
  title: string
  products?: CatalogProduct[]
  seeAllTo?: string
  showTabs?: boolean
}

function ProductShelf({ title, products, seeAllTo, showTabs }: ProductShelfProps) {
  const { products: allProducts, phonesStatus } = useCatalog()
  const [activeTab, setActiveTab] = useState(tabs[0].slug)
  const [canScroll, setCanScroll] = useState({ previous: false, next: false })
  const listRef = useRef<HTMLUListElement>(null)

  const visibleProducts = showTabs ? filterByCategory(allProducts, activeTab) : (products ?? [])
  const dependsOnJson = showTabs && activeTab === 'celular'
  const isLoading = dependsOnJson && phonesStatus === 'loading'
  const hasError = dependsOnJson && phonesStatus === 'error'

  const updateArrows = useCallback(() => {
    const list = listRef.current

    if (list) {
      setCanScroll({
        previous: list.scrollLeft > 1,
        next: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      })
    }
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = 0
    }

    updateArrows()
    window.addEventListener('resize', updateArrows)

    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows, visibleProducts.length, activeTab])

  function scroll(direction: 1 | -1) {
    const list = listRef.current
    list?.scrollBy({ left: direction * list.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className={styles.shelf}>
      <h2 className={styles.title}>{title}</h2>

      {showTabs ? (
        <ul className={styles.tabs}>
          {tabs.map(({ slug, label }) => (
            <li key={slug}>
              <button
                className={`${styles.tab} ${slug === activeTab ? styles.tabActive : ''}`}
                type="button"
                aria-pressed={slug === activeTab}
                onClick={() => setActiveTab(slug)}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <Link className={styles.tab} to="/categoria/tecnologia">
              Ver todos
            </Link>
          </li>
        </ul>
      ) : (
        seeAllTo && (
          <Link className={styles.seeAll} to={seeAllTo}>
            Ver todos
          </Link>
        )
      )}

      {isLoading && (
        <p className={styles.message} role="status">
          Carregando produtos...
        </p>
      )}

      {hasError && (
        <p className={styles.message} role="alert">
          Não foi possível carregar os produtos. Tente novamente mais tarde.
        </p>
      )}

      {!isLoading && !hasError && (
        <div className={styles.carousel}>
          <button
            className={`${styles.arrow} ${styles.arrowPrevious}`}
            type="button"
            aria-label={`Produtos anteriores de ${title}`}
            disabled={!canScroll.previous}
            onClick={() => scroll(-1)}
          >
            <Icon name="chevronLeft" size={16} />
          </button>

          <ul className={styles.list} ref={listRef} onScroll={updateArrows}>
            {visibleProducts.map((product) => (
              <li className={styles.item} key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            type="button"
            aria-label={`Próximos produtos de ${title}`}
            disabled={!canScroll.next}
            onClick={() => scroll(1)}
          >
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductShelf
