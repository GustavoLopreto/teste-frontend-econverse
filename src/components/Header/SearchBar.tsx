import { useState } from 'react'
import type { FocusEvent, FormEvent, KeyboardEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useCatalog } from '../../store/StoreContext'
import { searchProducts } from '../../utils/catalogQueries'
import { formatPrice } from '../../utils/formatPrice'
import searchIcon from '../../assets/figma/search.png'
import ProductImage from '../ProductImage/ProductImage'
import styles from './SearchBar.module.scss'

const MAX_SUGGESTIONS = 5

function SearchBar() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [syncedQuery, setSyncedQuery] = useState(initialQuery)
  const [isOpen, setIsOpen] = useState(false)
  const { products } = useCatalog()
  const navigate = useNavigate()

  // Mantem o campo igual ao endereco ao navegar, como ao usar o botao de voltar.
  if (initialQuery !== syncedQuery) {
    setSyncedQuery(initialQuery)
    setQuery(initialQuery)
  }

  const results = searchProducts(products, query)
  const suggestions = results.slice(0, MAX_SUGGESTIONS)
  const showSuggestions = isOpen && query.trim() !== ''

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const term = query.trim()

    setIsOpen(false)
    navigate(term ? `/busca?q=${encodeURIComponent(term)}` : '/produtos')
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  return (
    <form className={styles.search} role="search" onSubmit={handleSubmit} onBlur={handleBlur}>
      <input
        className={styles.input}
        type="search"
        onKeyDown={handleKeyDown}
        placeholder="O que você está buscando?"
        aria-label="O que você está buscando?"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
      />
      <button className={styles.button} type="submit" aria-label="Buscar">
        <img src={searchIcon} alt="" width={23} height={23} />
      </button>

      {showSuggestions && (
        <div className={styles.panel}>
          {suggestions.length === 0 ? (
            <p className={styles.empty}>Nenhuma sugestão para “{query.trim()}”.</p>
          ) : (
            <ul className={styles.list} aria-label="Sugestões">
              {suggestions.map((product) => (
                <li key={product.slug}>
                  <Link
                    className={styles.suggestion}
                    to={`/produto/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <ProductImage className={styles.photo} src={product.photo} alt="" size={44} />
                    <span className={styles.name}>{product.productName}</span>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length > MAX_SUGGESTIONS && (
            <button className={styles.seeAll} type="submit">
              Ver todos os {results.length} resultados
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default SearchBar
