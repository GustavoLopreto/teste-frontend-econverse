import { Link } from 'react-router'
import { usePageMeta } from '../hooks/usePageMeta'
import styles from './pages.module.scss'

function NotFoundPage() {
  usePageMeta('Página não encontrada')

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Página não encontrada</h1>
      <div className={styles.empty}>
        <p>O endereço acessado não existe ou mudou de lugar.</p>
        <Link className={styles.primaryButton} to="/">
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
