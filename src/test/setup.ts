import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// O jsdom nao implementa os metodos modais de <dialog> nem a rolagem da janela.
HTMLDialogElement.prototype.showModal = function showModal() {
  this.open = true
}
HTMLDialogElement.prototype.close = function close() {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
window.scrollTo = vi.fn() as typeof window.scrollTo

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
})
