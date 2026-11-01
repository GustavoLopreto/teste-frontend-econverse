import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { usePageMeta } from '../hooks/usePageMeta'
import { useStore } from '../store/StoreContext'
import styles from './pages.module.scss'

function AccountPage() {
  const { account, saveAccount, notify } = useStore()

  usePageMeta('Minha conta')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '').trim()

    saveAccount({
      ...account,
      name: field('name'),
      email: field('email'),
      phone: field('phone'),
      zipCode: field('zipCode'),
      address: field('address'),
      city: field('city'),
    })
    notify('Seus dados foram salvos')
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Minha conta</h1>
      <p className={styles.subtitle}>
        Estes dados preenchem o checkout e ficam salvos só neste navegador.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend>Dados pessoais e entrega</legend>
          <div className={styles.fields}>
            <label className={styles.field}>
              Nome completo
              <input name="name" autoComplete="name" defaultValue={account.name} />
            </label>
            <label className={styles.field}>
              E-mail
              <input name="email" type="email" autoComplete="email" defaultValue={account.email} />
            </label>
            <label className={styles.field}>
              Telefone
              <input name="phone" type="tel" autoComplete="tel" defaultValue={account.phone} />
            </label>
            <label className={styles.field}>
              CEP
              <input
                name="zipCode"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="\d{5}-?\d{3}"
                title="Digite um CEP com 8 números"
                defaultValue={account.zipCode}
              />
            </label>
            <label className={styles.field}>
              Endereço e número
              <input name="address" autoComplete="street-address" defaultValue={account.address} />
            </label>
            <label className={styles.field}>
              Cidade
              <input name="city" autoComplete="address-level2" defaultValue={account.city} />
            </label>
          </div>
        </fieldset>
        <div className={styles.actions}>
          <button className={styles.primaryButton} type="submit">
            Salvar dados
          </button>
          <Link className={styles.secondaryButton} to="/pedidos">
            Meus pedidos
          </Link>
          <Link className={styles.secondaryButton} to="/assinatura">
            Assinatura
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AccountPage
