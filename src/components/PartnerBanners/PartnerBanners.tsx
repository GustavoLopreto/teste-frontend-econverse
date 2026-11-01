import { Link } from 'react-router'
import partnerImage from '../../assets/parceiros.webp'
import styles from './PartnerBanners.module.scss'

const banners = [
  { id: 'lojas', text: 'Lorem ipsum dolor sit amet, consectetur', to: '/parceiros' },
  { id: 'apple', text: 'Lorem ipsum dolor sit amet, consectetur', to: '/marca/apple' },
]

function PartnerBanners() {
  return (
    <section className={styles.banners} aria-label="Parceiros">
      {banners.map(({ id, text, to }) => (
        <article className={styles.banner} key={id}>
          <img
            className={styles.image}
            src={partnerImage}
            alt=""
            width={634}
            height={350}
            loading="lazy"
          />
          <div className={styles.content}>
            <h2 className={styles.title}>Parceiros</h2>
            <p className={styles.text}>{text}</p>
            <Link className={styles.cta} to={to}>
              Confira
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}

export default PartnerBanners
