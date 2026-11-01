import { useEffect } from 'react'
import { useLocation } from 'react-router'

const DEFAULT_DESCRIPTION =
  'Encontre celulares, acessórios, tablets, notebooks e TVs com até 50% off, frete grátis e parcelamento sem juros na Econverse.'

function setHeadTag(selector: string, tag: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement(tag)
    document.head.append(element)
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  setHeadTag(`meta[${attribute}="${key}"]`, 'meta', { [attribute]: key, content })
}

export function usePageMeta(title: string, description = DEFAULT_DESCRIPTION) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = `${title} | Econverse`
    const url = `${window.location.origin}${pathname}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', `${window.location.origin}/og-image.jpg`)
    setHeadTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: url })
  }, [title, description, pathname])
}
