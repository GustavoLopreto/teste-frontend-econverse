import { Link } from 'react-router'
import heroImage from '../../assets/hero.webp'
import styles from './Hero.module.scss'

function Hero() {
  return (
    <section className={styles.hero}>
      <img
        className={styles.image}
        src={heroImage}
        alt=""
        width={1440}
        height={390}
        fetchPriority="high"
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Venha conhecer nossas promoções</h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <Link className={styles.cta} to="/ofertas">
          Ver produto
        </Link>
      </div>
    </section>
  )
}

export default Hero
