import { formatPrice } from '../../utils/formatPrice'
import pageStyles from '../../pages/pages.module.scss'

interface OrderSummaryProps {
  subtotal: number
  shipping: number
}

function OrderSummary({ subtotal, shipping }: OrderSummaryProps) {
  return (
    <>
      <p className={pageStyles.summaryRow}>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </p>
      <p className={pageStyles.summaryRow}>
        <span>Frete</span>
        <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
      </p>
      <p className={pageStyles.summaryTotal}>
        <span>Total</span>
        <span>{formatPrice(subtotal + shipping)}</span>
      </p>
    </>
  )
}

export default OrderSummary
