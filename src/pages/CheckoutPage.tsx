import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import { usePageMeta } from '../hooks/usePageMeta'
import { useStore } from '../store/StoreContext'
import type { PaymentMethod } from '../types/store'
import { formatPrice } from '../utils/formatPrice'
import { getCartShipping } from '../utils/pricing'
import styles from './pages.module.scss'

const paymentOptions: { value: PaymentMethod; label: string }[] = [
  { value: 'pix', label: 'Pix' },
  { value: 'card', label: 'Cartão de crédito' },
  { value: 'boleto', label: 'Boleto' },
]

function CheckoutPage() {
  const { cart, subtotal, account, placeOrder } = useStore()
  const [payment, setPayment] = useState<PaymentMethod>('pix')
  const navigate = useNavigate()

  usePageMeta('Finalizar compra')

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Finalizar compra</h1>
        <div className={styles.empty}>
          <p>Seu carrinho está vazio.</p>
          <Link className={styles.primaryButton} to="/produtos">
            Ver produtos
          </Link>
        </div>
      </div>
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '').trim()

    // Os dados do cartao so validam o formulario: nunca entram no pedido salvo.
    const order = placeOrder({
      customerName: field('name'),
      email: field('email'),
      address: `${field('address')}, ${field('city')}, CEP ${field('zipCode')}`,
      payment,
    })

    navigate(`/pedido/${order.id}`, { replace: true })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Finalizar compra</h1>
      <p className={styles.notice}>
        Esta é uma compra simulada: nada é cobrado nem enviado. Não digite dados reais de cartão.
      </p>
      <form className={styles.twoColumns} onSubmit={handleSubmit}>
        <div>
          <fieldset className={styles.fieldset}>
            <legend>Seus dados</legend>
            <div className={styles.fields}>
              <label className={styles.fieldWide}>
                Nome completo
                <input name="name" autoComplete="name" defaultValue={account.name} required />
              </label>
              <label className={styles.fieldWide}>
                E-mail
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={account.email}
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Entrega</legend>
            <div className={styles.fields}>
              <label className={styles.field}>
                CEP
                <input
                  name="zipCode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="\d{5}-?\d{3}"
                  title="Digite um CEP com 8 números"
                  defaultValue={account.zipCode}
                  required
                />
              </label>
              <label className={styles.field}>
                Cidade
                <input
                  name="city"
                  autoComplete="address-level2"
                  defaultValue={account.city}
                  required
                />
              </label>
              <label className={styles.fieldWide}>
                Endereço e número
                <input
                  name="address"
                  autoComplete="street-address"
                  defaultValue={account.address}
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Pagamento</legend>
            <div className={styles.options}>
              {paymentOptions.map(({ value, label }) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={payment === value}
                    onChange={() => setPayment(value)}
                  />
                  {label}
                </label>
              ))}
            </div>

            {payment === 'card' && (
              <div className={styles.fields}>
                <label className={styles.fieldWide}>
                  Número do cartão
                  <input
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="[\d ]{13,23}"
                    title="Digite de 13 a 19 números"
                    required
                  />
                </label>
                <label className={styles.field}>
                  Validade
                  <input
                    autoComplete="off"
                    placeholder="MM/AA"
                    pattern="(0[1-9]|1[0-2])\/\d{2}"
                    title="Use o formato MM/AA"
                    required
                  />
                </label>
                <label className={styles.field}>
                  CVV
                  <input
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="\d{3,4}"
                    title="Digite 3 ou 4 números"
                    required
                  />
                </label>
              </div>
            )}
            {payment === 'pix' && (
              <p className={styles.muted}>O código Pix aparece depois de confirmar o pedido.</p>
            )}
            {payment === 'boleto' && (
              <p className={styles.muted}>
                O código do boleto aparece depois de confirmar o pedido.
              </p>
            )}
          </fieldset>
        </div>

        <aside className={styles.card} aria-label="Resumo do pedido">
          <h2 className={styles.sectionTitle}>Resumo</h2>
          <ul className={styles.orderItems}>
            {cart.map(({ product, quantity }) => (
              <li key={product.slug}>
                {quantity}x {product.productName}: {formatPrice(product.price * quantity)}
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={subtotal} shipping={getCartShipping(cart)} />
          <div className={styles.actions}>
            <button className={styles.primaryButton} type="submit">
              Confirmar pedido
            </button>
            <Link className={styles.secondaryButton} to="/carrinho">
              Voltar ao carrinho
            </Link>
          </div>
        </aside>
      </form>
    </div>
  )
}

export default CheckoutPage
