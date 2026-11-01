import { useParams } from 'react-router'
import { infoPages } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFoundPage from './NotFoundPage'
import styles from './pages.module.scss'

function InfoPage() {
  const { slug = '' } = useParams()
  const content = Object.hasOwn(infoPages, slug) ? infoPages[slug] : undefined

  usePageMeta(content?.title ?? 'Página não encontrada')

  if (!content) {
    return <NotFoundPage />
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{content.title}</h1>
      <div className={styles.prose}>
        {content.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {content.faq?.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default InfoPage
