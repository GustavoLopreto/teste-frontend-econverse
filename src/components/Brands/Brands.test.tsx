import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Brands from './Brands'

describe('Brands', () => {
  it.each([
    ['Apple', '/marca/apple'],
    ['Samsung', '/marca/samsung'],
    ['Dell', '/marca/dell'],
    ['Nike', '/marca/nike'],
    ['Puma', '/marca/puma'],
  ])('mostra o logo da %s com link para a marca', (name, href) => {
    render(
      <MemoryRouter>
        <Brands />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })
})
