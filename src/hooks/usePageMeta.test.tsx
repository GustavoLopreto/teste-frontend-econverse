import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { usePageMeta } from './usePageMeta'

function Page() {
  usePageMeta('Bebidas', 'Descricao de bebidas')

  return null
}

describe('usePageMeta', () => {
  it('atualiza titulo, descricao, compartilhamento e URL canonica', () => {
    render(
      <MemoryRouter initialEntries={['/categoria/bebidas']}>
        <Page />
      </MemoryRouter>,
    )

    expect(document.title).toBe('Bebidas | Econverse')
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Descricao de bebidas',
    )
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Bebidas | Econverse',
    )
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(
      /\/categoria\/bebidas$/,
    )
  })
})
