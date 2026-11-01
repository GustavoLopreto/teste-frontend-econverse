import { Link } from 'react-router'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCatalog } from '../store/StoreContext'
import { slugify } from '../utils/slugify'
import styles from './pages.module.scss'

function PartnersPage() {
  const { products } = useCatalog()
  const brands = [...new Set(products.map(({ brand }) => brand))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  )

  usePageMeta('Parceiros')

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Parceiros</h1>
      <p className={styles.subtitle}>Veja os produtos de cada marca e autor da nossa loja.</p>
      <ul className={styles.chips}>
        {brands.map((brand) => (
          <li key={brand}>
            <Link to={`/marca/${slugify(brand)}`}>{brand}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PartnersPage
