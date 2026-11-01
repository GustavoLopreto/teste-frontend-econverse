import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router'
import StoreProvider from '../store/StoreProvider'

export function renderWithStore(ui: ReactNode, route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider>{ui}</StoreProvider>
    </MemoryRouter>,
  )
}
