import { Link, useParams, useSearchParams } from 'react-router'
import { findCategory } from '../data/categories'
import { useCatalog, useStore } from '../store/StoreContext'
import { filterByCategory, searchProducts } from '../utils/catalogQueries'
import { slugify } from '../utils/slugify'
import ListingPage from './ListingPage'
import NotFoundPage from './NotFoundPage'
import styles from './pages.module.scss'

export function AllProductsPage() {
  const { products } = useCatalog()

  return <ListingPage title="Todos os produtos" products={products} />
}

export function CategoryPage() {
  const { slug = '' } = useParams()
  const { products } = useCatalog()
  const category = findCategory(slug)

  if (!category) {
    return <NotFoundPage />
  }

  return (
    <ListingPage key={slug} title={category.label} products={filterByCategory(products, slug)}>
      {category.children && (
        <ul className={styles.chips}>
          {category.children.map((child) => (
            <li key={child}>
              <Link to={`/categoria/${child}`}>{findCategory(child)?.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </ListingPage>
  )
}

export function BrandPage() {
  const { slug = '' } = useParams()
  const { products } = useCatalog()
  const brandProducts = products.filter(({ brand }) => slugify(brand) === slug)

  return (
    <ListingPage
      key={slug}
      title={brandProducts[0]?.brand ?? 'Marca'}
      products={brandProducts}
      emptyMessage="Nenhum produto desta marca."
    />
  )
}

export function OffersPage() {
  const { products } = useCatalog()

  return (
    <ListingPage
      title="Ofertas do dia"
      subtitle="Descontos de até 50% por tempo limitado."
      products={products.filter(({ discount }) => (discount ?? 0) >= 10)}
    />
  )
}

export function NewProductsPage() {
  const { products } = useCatalog()

  return (
    <ListingPage
      title="Lançamentos"
      subtitle="As novidades que acabaram de chegar à loja."
      products={products.filter(({ isNew }) => isNew)}
    />
  )
}

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const { products } = useCatalog()
  const query = searchParams.get('q') ?? ''

  return (
    <ListingPage
      key={query}
      title={`Resultados para “${query}”`}
      products={searchProducts(products, query)}
      emptyMessage={`Nenhum produto encontrado para “${query}”.`}
    />
  )
}

export function FavoritesPage() {
  const { products } = useCatalog()
  const { favorites } = useStore()

  return (
    <ListingPage
      title="Favoritos"
      products={products.filter(({ slug }) => favorites.includes(slug))}
      emptyMessage="Você ainda não tem favoritos. Toque no coração de um produto para salvá-lo aqui."
    />
  )
}
