import Icon from '../Icon/Icon'
import styles from './QuantitySelector.module.scss'

interface QuantitySelectorProps {
  quantity: number
  onChange: (quantity: number) => void
}

function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  return (
    <div className={styles.quantity} role="group" aria-label="Quantidade">
      <button
        className={styles.button}
        type="button"
        aria-label="Diminuir quantidade"
        disabled={quantity === 1}
        onClick={() => onChange(quantity - 1)}
      >
        <Icon name="minus" size={20} />
      </button>
      <output className={styles.value} aria-live="polite">
        {String(quantity).padStart(2, '0')}
      </output>
      <button
        className={styles.button}
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(quantity + 1)}
      >
        <Icon name="plus" size={20} />
      </button>
    </div>
  )
}

export default QuantitySelector
