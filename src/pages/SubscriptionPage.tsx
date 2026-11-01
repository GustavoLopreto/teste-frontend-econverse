import { subscriptionPlans } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { useStore } from '../store/StoreContext'
import { formatPrice } from '../utils/formatPrice'
import styles from './pages.module.scss'

function SubscriptionPage() {
  const { account, saveAccount, notify } = useStore()

  usePageMeta('Assinatura')

  function choosePlan(plan: string | undefined) {
    saveAccount({ ...account, plan })
    notify(plan ? `Plano ${plan} ativado (simulação)` : 'Assinatura cancelada (simulação)')
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Assinatura</h1>
      <p className={styles.subtitle}>Escolha um plano. A assinatura é simulada e nada é cobrado.</p>
      <div className={styles.plans}>
        {subscriptionPlans.map(({ name, price, perks }) => (
          <section className={styles.card} key={name}>
            <h2 className={styles.sectionTitle}>{name}</h2>
            <p className={styles.bigPrice}>{formatPrice(price)}/mês</p>
            <ul className={styles.perks}>
              {perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            {account.plan === name ? (
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => choosePlan(undefined)}
              >
                Cancelar plano {name}
              </button>
            ) : (
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => choosePlan(name)}
              >
                Assinar {name}
              </button>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionPage
