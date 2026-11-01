import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useProducts } from '../../hooks/useProducts'
import { useStore } from '../../store/StoreContext'
import { productFixture } from '../../test/fixtures'
import { renderWithStore } from '../../test/renderWithStore'
import ProductModal from './ProductModal'

vi.mock('../../hooks/useProducts')
vi.mocked(useProducts).mockReturnValue({ status: 'loading' })

function CartCount() {
  const { cartCount } = useStore()

  return <p>{cartCount} no carrinho</p>
}

function renderModal(onClose = vi.fn()) {
  renderWithStore(
    <>
      <ProductModal product={productFixture} onClose={onClose} />
      <CartCount />
    </>,
  )
}

describe('ProductModal', () => {
  it('abre com as informacoes do produto', () => {
    renderModal()

    expect(screen.getByRole('dialog', { name: productFixture.productName })).toBeVisible()
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
    expect(screen.getByText(productFixture.descriptionShort)).toBeInTheDocument()
  })

  it('altera a quantidade sem ficar abaixo de um', async () => {
    renderModal()
    const decrease = screen.getByRole('button', { name: 'Diminuir quantidade' })

    expect(decrease).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))

    expect(screen.getByText('02')).toBeInTheDocument()
    expect(decrease).toBeEnabled()
  })

  it('coloca a quantidade escolhida no carrinho e fecha', async () => {
    const onClose = vi.fn()
    renderModal(onClose)

    await userEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))
    await userEvent.click(screen.getByRole('button', { name: 'Comprar' }))

    expect(screen.getByText('2 no carrinho')).toBeInTheDocument()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('fecha pelo botao de fechar', async () => {
    const onClose = vi.fn()
    renderModal(onClose)

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('fecha ao clicar fora do conteudo', async () => {
    const onClose = vi.fn()
    renderModal(onClose)

    await userEvent.click(screen.getByRole('dialog'))

    expect(onClose).toHaveBeenCalledOnce()
  })
})
