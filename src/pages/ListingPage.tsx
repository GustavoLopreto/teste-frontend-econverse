import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import ProductCard from '../components/ProductCard/ProductCard'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCatalog } from '../store/StoreContext'
import type { CatalogProduct } from '../types/product'
import { sortProducts } from '../utils/catalogQueries'
import type { SortOption } from '../utils/catalogQueries'
import styles from './pages.module.scss'

interface ListingPageProps {
  title: string
  products: CatalogProduct[]
  subtitle?: string
  emptyMessage?: string
  children?: ReactNode
}

function ListingPage({
  title,
  products,
  subtitle,
  emptyMessage = 'Nenhum produto encontrado.',
  children,
}: ListingPageProps) {
  const { phonesStatus } = useCatalog()
  const [sort, setSort] = useState<SortOption>('relevance')

  usePageMeta(title, subtitle ?? `${title}: confira os produtos, preços e condições na Econverse.`)

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSort(event.target.value as SortOption)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>{phonesStatus === 'loading' ? 'Carregando produtos...' : emptyMessage}</p>
          <Link className={styles.primaryButton} to="/produtos">
            Ver todos os produtos
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.toolbar}>
            <span>
              {products.length} {products.length === 1 ? 'produto' : 'produtos'}
            </span>
            <label className={styles.sort}>
              Ordenar por
              <select value={sort} onChange={handleSortChange}>
                <option value="relevance">Relevância</option>
                <option value="lowest">Menor preço</option>
                <option value="highest">Maior preço</option>
                <option value="discount">Maior desconto</option>
                <option value="name">Nome</option>
              </select>
            </label>
          </div>
          <ul className={styles.grid}>
            {sortProducts(products, sort).map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} showExtras />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ListingPage
