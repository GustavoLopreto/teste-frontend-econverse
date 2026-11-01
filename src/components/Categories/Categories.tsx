import { Link } from 'react-router'
import bottleIcon from '../../assets/figma/cat-bottle.png'
import careIcon from '../../assets/figma/cat-care.png'
import devicesIcon from '../../assets/figma/cat-devices.png'
import fashionIcon from '../../assets/figma/cat-fashion.png'
import fitnessIcon from '../../assets/figma/cat-fitness.png'
import storeIcon from '../../assets/figma/cat-store.png'
import toolsIcon from '../../assets/figma/cat-tools.png'
import { categories } from '../../data/categories'
import styles from './Categories.module.scss'

const icons: Record<string, { src: string; width: number; height: number }> = {
  tecnologia: { src: devicesIcon, width: 56.5, height: 53 },
  supermercado: { src: storeIcon, width: 61, height: 44 },
  bebidas: { src: bottleIcon, width: 45, height: 61 },
  ferramentas: { src: toolsIcon, width: 61, height: 61 },
  saude: { src: careIcon, width: 55, height: 61 },
  esportes: { src: fitnessIcon, width: 61, height: 58.5 },
  moda: { src: fashionIcon, width: 56, height: 63 },
}

function Categories() {
  return (
    <nav className={styles.categories} aria-label="Categorias">
      <ul className={styles.list}>
        {categories
          .filter(({ featured }) => featured)
          .map(({ slug, label }) => (
            <li key={slug}>
              <Link
                className={`${styles.item} ${slug === 'tecnologia' ? styles.active : ''}`}
                to={`/categoria/${slug}`}
              >
                <span className={styles.tile}>
                  <img
                    src={icons[slug].src}
                    alt=""
                    width={icons[slug].width}
                    height={icons[slug].height}
                  />
                </span>
                {label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Categories
