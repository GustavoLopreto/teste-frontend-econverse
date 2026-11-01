import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import styles from './Newsletter.module.scss'

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()
    setSubscribed(true)
  }

  return (
    <section className={styles.newsletter}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>Inscreva-se na nossa newsletter</h2>
          <p className={styles.text}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Digite seu nome"
            aria-label="Nome"
            autoComplete="name"
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            aria-label="E-mail"
            autoComplete="email"
            required
          />
          <button className={styles.submit} type="submit">
            Inscrever
          </button>
          <label className={styles.terms}>
            <input type="checkbox" name="terms" required />
            <span>
              Aceito os <Link to="/institucional/termos">termos e condições</Link>
            </span>
          </label>
          {subscribed && (
            <p className={styles.success} role="status">
              Inscrição realizada!
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Newsletter
