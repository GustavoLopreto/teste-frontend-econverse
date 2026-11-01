import { useStore } from '../../store/StoreContext'
import Icon from '../Icon/Icon'
import styles from './FavoriteButton.module.scss'

interface FavoriteButtonProps {
  slug: string
  name: string
  className?: string
}

function FavoriteButton({ slug, name, className = '' }: FavoriteButtonProps) {
  const { favorites, toggleFavorite } = useStore()
  const isFavorite = favorites.includes(slug)

  return (
    <button
      className={`${styles.favorite} ${isFavorite ? styles.active : ''} ${className}`}
      type="button"
      aria-label={`Favoritar ${name}`}
      aria-pressed={isFavorite}
      onClick={() => toggleFavorite(slug)}
    >
      <Icon name="heart" size={22} />
    </button>
  )
}

export default FavoriteButton
