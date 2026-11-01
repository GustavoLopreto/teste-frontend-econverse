import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { productFixture } from '../../test/fixtures'
import type { Order } from '../../types/store'
import OrderCard from './OrderCard'

const order: Order = {
  id: 'EC-TESTE',
  createdAt: '2026-11-01T12:00:00.000Z',
  items: [{ product: productFixture, quantity: 2 }],
  subtotal: 20000,
  shipping: 0,
  total: 20000,
  customerName: 'Pessoa de Teste',
  email: 'teste@example.com',
  address: 'Rua de Teste, 100',
  payment: 'pix',
}

function renderCard() {
  render(
    <MemoryRouter>
      <OrderCard order={order} />
    </MemoryRouter>,
  )
}

describe('OrderCard', () => {
  it('mostra a foto do que foi comprado, com os detalhes fechados', () => {
    renderCard()

    expect(screen.getByRole('img', { name: productFixture.productName })).toHaveAttribute(
      'src',
      productFixture.photo,
    )
    expect(screen.getByText(/2 itens/)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: productFixture.productName })).not.toBeInTheDocument()
  })

  it('abre e fecha os itens pelo botao de mais', async () => {
    renderCard()

    await userEvent.click(screen.getByRole('button', { name: /mostrar itens/i }))

    expect(screen.getByRole('link', { name: productFixture.productName })).toHaveAttribute(
      'href',
      `/produto/${productFixture.slug}`,
    )
    expect(screen.getByText('2 × R$ 100,00')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /ocultar itens/i }))

    expect(screen.queryByRole('link', { name: productFixture.productName })).not.toBeInTheDocument()
  })
})
