import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useProducts } from '../../hooks/useProducts'
import { useStore } from '../../store/StoreContext'
import { productFixture } from '../../test/fixtures'
import { renderWithStore } from '../../test/renderWithStore'
import ProductCard from './ProductCard'

vi.mock('../../hooks/useProducts')
vi.mocked(useProducts).mockReturnValue({ status: 'loading' })

function CartCount() {
  const { cartCount, selectedProduct } = useStore()

  return (
    <p>
      {cartCount} no carrinho, aberto: {selectedProduct?.slug ?? 'nenhum'}
    </p>
  )
}

function renderCard(product = productFixture, showExtras = false) {
  renderWithStore(
    <>
      <ProductCard product={product} showExtras={showExtras} />
      <CartCount />
    </>,
  )
}

describe('ProductCard', () => {
  it('mostra as informacoes do produto', () => {
    renderCard()

    expect(screen.getByRole('img', { name: productFixture.productName })).toBeInTheDocument()
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
    expect(screen.getByText('ou 2x de R$ 50,00 sem juros')).toBeInTheDocument()
    expect(screen.queryByText('Frete grátis')).not.toBeInTheDocument()
  })

  it('mostra o preco original e o frete gratis quando se aplicam', () => {
    renderCard({ ...productFixture, price: 20000, discount: 50 }, true)

    expect(screen.getByText('R$ 400,00')).toBeInTheDocument()
    expect(screen.getByText('-50%')).toBeInTheDocument()
    expect(screen.getByText('Frete grátis')).toBeInTheDocument()
  })

  it('abre os detalhes ao clicar no produto', async () => {
    renderCard()

    await userEvent.click(screen.getByRole('button', { name: /ver detalhes/i }))

    expect(screen.getByText(/aberto: produto-de-teste/)).toBeInTheDocument()
    expect(screen.getByText(/0 no carrinho/)).toBeInTheDocument()
  })

  it('adiciona ao carrinho ao clicar em comprar, sem abrir os detalhes', async () => {
    renderCard()

    await userEvent.click(screen.getByRole('button', { name: /^comprar/i }))

    expect(screen.getByText(/1 no carrinho, aberto: nenhum/)).toBeInTheDocument()
  })
})
