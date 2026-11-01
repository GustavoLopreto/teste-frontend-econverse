import { Link } from 'react-router'
import appleLogo from '../../assets/brands/apple.svg'
import dellLogo from '../../assets/brands/dell.svg'
import nikeLogo from '../../assets/brands/nike.svg'
import pumaLogo from '../../assets/brands/puma.svg'
import samsungLogo from '../../assets/brands/samsung.svg'
import styles from './Brands.module.scss'

// Os SVGs sao quadrados, entao cada logo tem um tamanho para equilibrar o peso visual.
const brands = [
  { name: 'Apple', logo: appleLogo, size: 96 },
  { name: 'Samsung', logo: samsungLogo, size: 150 },
  { name: 'Dell', logo: dellLogo, size: 112 },
  { name: 'Nike', logo: nikeLogo, size: 128 },
  { name: 'Puma', logo: pumaLogo, size: 112 },
]

function Brands() {
  return (
    <section className={styles.brands}>
      <h2 className={styles.title}>Navegue por marcas</h2>
      <ul className={styles.list}>
        {brands.map(({ name, logo, size }) => (
          <li key={name}>
            <Link className={styles.brand} to={`/marca/${name.toLowerCase()}`}>
              <img src={logo} alt={name} width={size} height={size} loading="lazy" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Brands
