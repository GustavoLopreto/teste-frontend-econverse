import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it.each([
    ['Instagram', 'https://www.instagram.com/econverse.ag/'],
    ['Facebook', 'https://www.facebook.com/agenciaeconverse'],
    ['LinkedIn', 'https://www.linkedin.com/company/econverse'],
  ])('leva ao perfil oficial da Econverse no %s', (name, href) => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
  })
})
