import { Link } from 'react-router'
import facebookIcon from '../../assets/figma/facebook.png'
import instagramIcon from '../../assets/figma/instagram.png'
import linkedinIcon from '../../assets/figma/linkedin.png'
import logo from '../../assets/figma/logoFooter.png'
import styles from './Footer.module.scss'

const socials = [
  {
    icon: instagramIcon,
    width: 22,
    height: 22,
    label: 'Instagram',
    href: 'https://www.instagram.com/econverse.ag/',
  },
  {
    icon: facebookIcon,
    width: 13,
    height: 22,
    label: 'Facebook',
    href: 'https://www.facebook.com/agenciaeconverse',
  },
  {
    icon: linkedinIcon,
    width: 22,
    height: 21,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/econverse',
  },
]

const columns = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre Nós', slug: 'sobre' },
      { label: 'Movimento', slug: 'movimento' },
      { label: 'Trabalhe conosco', slug: 'carreiras' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Suporte', slug: 'suporte' },
      { label: 'Fale Conosco', slug: 'contato' },
      { label: 'Perguntas Frequentes', slug: 'faq' },
    ],
  },
  {
    title: 'Termos',
    links: [
      { label: 'Termos e Condições', slug: 'termos' },
      { label: 'Política de Privacidade', slug: 'privacidade' },
      { label: 'Troca e Devolução', slug: 'trocas' },
    ],
  },
]

function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.about}>
            <Link className={styles.logo} to="/" aria-label="Econverse, página inicial">
              <img src={logo} alt="" width={164} height={47.5} />
            </Link>
            <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul className={styles.socials}>
              {socials.map(({ icon, width, height, label, href }) => (
                <li key={label}>
                  <a
                    className={styles.social}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={icon} alt="" width={width} height={height} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.columns} aria-label="Rodapé">
            {columns.map(({ title, links }) => (
              <div className={styles.column} key={title}>
                <h2 className={styles.columnTitle}>{title}</h2>
                <ul className={styles.links}>
                  {links.map(({ label, slug }) => (
                    <li key={slug}>
                      <Link className={styles.link} to={`/institucional/${slug}`}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <p className={styles.copyright}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </footer>
  )
}

export default Footer
