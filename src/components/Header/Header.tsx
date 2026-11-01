import { Link } from 'react-router'
import boxIcon from '../../assets/figma/box.png'
import cardIcon from '../../assets/figma/card.png'
import cartIcon from '../../assets/figma/cart.png'
import crownIcon from '../../assets/figma/crown.png'
import heartIcon from '../../assets/figma/heart.png'
import logo from '../../assets/figma/logoHeader.png'
import shieldIcon from '../../assets/figma/shield.png'
import truckIcon from '../../assets/figma/truck.png'
import userIcon from '../../assets/figma/user.png'
import { useStore } from '../../store/StoreContext'
import SearchBar from './SearchBar'
import styles from './Header.module.scss'

const benefits = [
  { icon: shieldIcon, width: 16, height: 16.5, before: 'Compra', highlight: '100% segura' },
  { icon: truckIcon, width: 20, height: 14, highlight: 'Frete grátis', after: 'acima de R$ 200' },
  { icon: cardIcon, width: 18, height: 13, highlight: 'Parcele', after: 'suas compras' },
]

const links = [
  { label: 'Todas categorias', to: '/produtos' },
  { label: 'Supermercado', to: '/categoria/supermercado' },
  { label: 'Livros', to: '/categoria/livros' },
  { label: 'Moda', to: '/categoria/moda' },
  { label: 'Lançamentos', to: '/lancamentos' },
  { label: 'Ofertas do dia', to: '/ofertas', highlighted: true },
  { label: 'Assinatura', to: '/assinatura', hasCrown: true },
]

function Header() {
  const { cartCount, favorites } = useStore()

  const actions = [
    { icon: boxIcon, width: 25, height: 25, label: 'Meus pedidos', to: '/pedidos' },
    {
      icon: heartIcon,
      width: 27,
      height: 24,
      label: 'Favoritos',
      to: '/favoritos',
      count: favorites.length,
    },
    { icon: userIcon, width: 26, height: 26, label: 'Minha conta', to: '/conta' },
    { icon: cartIcon, width: 27, height: 27, label: 'Carrinho', to: '/carrinho', count: cartCount },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <ul className={styles.benefits}>
          {benefits.map(({ icon, width, height, before, highlight, after }) => (
            <li key={highlight} className={styles.benefit}>
              <img src={icon} alt="" width={width} height={height} />
              <span>
                {before} <strong>{highlight}</strong> {after}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.main}>
          <Link className={styles.logo} to="/" aria-label="Econverse, página inicial">
            <img src={logo} alt="" width={139} height={41.5} />
          </Link>

          <SearchBar />

          <ul className={styles.actions}>
            {actions.map(({ icon, width, height, label, to, count }) => (
              <li key={label}>
                <Link
                  className={styles.action}
                  to={to}
                  aria-label={
                    count ? `${label}, ${count} ${count === 1 ? 'item' : 'itens'}` : label
                  }
                >
                  <img src={icon} alt="" width={width} height={height} />
                  {Boolean(count) && <span className={styles.badge}>{count}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.navPanel} aria-label="Principal">
          <ul className={styles.nav}>
            {links.map(({ label, to, highlighted, hasCrown }) => (
              <li key={label}>
                <Link
                  className={`${styles.navLink} ${highlighted ? styles.navLinkHighlighted : ''}`}
                  to={to}
                >
                  {hasCrown && <img src={crownIcon} alt="" width={19} height={15} />}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
