import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { useProducts } from './hooks/useProducts'
import { productFixture } from './test/fixtures'
import { renderWithStore } from './test/renderWithStore'

vi.mock('./hooks/useProducts')

const PRODUCT_NAME = productFixture.productName

describe('App', () => {
  beforeEach(() => {
    vi.mocked(useProducts).mockReturnValue({ status: 'success', products: [productFixture] })
  })

  it('renderiza um unico titulo principal', () => {
    renderWithStore(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('abre o modal do produto clicado e fecha em seguida', async () => {
    renderWithStore(<App />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(
      screen.getAllByRole('button', { name: `Ver detalhes de ${PRODUCT_NAME}` })[0],
    )

    const dialog = screen.getByRole('dialog', { name: PRODUCT_NAME })
    await userEvent.click(within(dialog).getByRole('button', { name: 'Fechar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('avisa quando os celulares do JSON nao carregam', () => {
    vi.mocked(useProducts).mockReturnValue({ status: 'error' })

    renderWithStore(<App />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('leva a categoria certa a partir do menu', async () => {
    renderWithStore(<App />)

    await userEvent.click(screen.getAllByRole('link', { name: 'Bebidas' })[0])

    expect(screen.getByRole('heading', { level: 1, name: 'Bebidas' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Leite integral 1 L' })).toBeInTheDocument()
  })

  it('busca produtos pela barra de pesquisa', async () => {
    renderWithStore(<App />)

    await userEvent.type(screen.getByRole('searchbox'), 'cafe{Enter}')

    expect(screen.getByRole('heading', { level: 1, name: /cafe/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Café solúvel Nescafé 200 g' })).toBeInTheDocument()
  })

  it('informa quando a busca nao encontra nada', async () => {
    renderWithStore(<App />)

    await userEvent.type(screen.getByRole('searchbox'), 'xyzabc{Enter}')

    expect(screen.getByText(/nenhum produto encontrado/i)).toBeInTheDocument()
  })

  it('compra do carrinho ate a confirmacao do pedido', async () => {
    const user = userEvent.setup()
    renderWithStore(<App />)

    await user.click(screen.getAllByRole('button', { name: `Comprar ${PRODUCT_NAME}` })[0])
    await user.click(screen.getByRole('link', { name: /carrinho, 1 item/i }))

    expect(screen.getByRole('heading', { level: 1, name: 'Carrinho' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: PRODUCT_NAME })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Finalizar compra' }))
    await user.type(screen.getByLabelText('Nome completo'), 'Pessoa de Teste')
    await user.type(screen.getByLabelText('E-mail'), 'teste@example.com')
    await user.type(screen.getByLabelText('CEP'), '01001-000')
    await user.type(screen.getByLabelText('Endereço e número'), 'Rua de Teste, 100')
    await user.type(screen.getByLabelText('Cidade'), 'São Paulo')
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(
      screen.getByRole('heading', { level: 1, name: /pedido confirmado/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Pessoa de Teste', { exact: false })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^carrinho$/i })).toBeInTheDocument()
  })

  it('exige os dados do cartao quando ele e a forma de pagamento', async () => {
    const user = userEvent.setup()
    renderWithStore(<App />)

    await user.click(screen.getAllByRole('button', { name: `Comprar ${PRODUCT_NAME}` })[0])
    await user.click(screen.getByRole('link', { name: /carrinho, 1 item/i }))
    await user.click(screen.getByRole('link', { name: 'Finalizar compra' }))
    await user.click(screen.getByRole('radio', { name: /cartão/i }))

    expect(screen.getByLabelText('Número do cartão')).toBeRequired()
  })

  it('mostra uma pagina para enderecos inexistentes', () => {
    renderWithStore(<App />, '/rota-que-nao-existe')

    expect(screen.getByRole('heading', { level: 1, name: /não encontrada/i })).toBeInTheDocument()
  })
})
