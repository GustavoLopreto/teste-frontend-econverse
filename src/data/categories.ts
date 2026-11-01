export interface Category {
  slug: string
  label: string
  // Aparece no atalho com icone da pagina inicial.
  featured?: boolean
  children?: string[]
}

export const categories: Category[] = [
  {
    slug: 'tecnologia',
    label: 'Tecnologia',
    featured: true,
    children: ['celular', 'acessorios', 'tablets', 'notebooks', 'tvs'],
  },
  { slug: 'supermercado', label: 'Supermercado', featured: true },
  { slug: 'bebidas', label: 'Bebidas', featured: true },
  { slug: 'ferramentas', label: 'Ferramentas', featured: true },
  { slug: 'saude', label: 'Saúde', featured: true },
  { slug: 'esportes', label: 'Esportes e Fitness', featured: true },
  { slug: 'moda', label: 'Moda', featured: true },
  { slug: 'celular', label: 'Celular' },
  { slug: 'acessorios', label: 'Acessórios' },
  { slug: 'tablets', label: 'Tablets' },
  { slug: 'notebooks', label: 'Notebooks' },
  { slug: 'tvs', label: 'TVs' },
  { slug: 'livros', label: 'Livros' },
]

export function findCategory(slug: string | undefined): Category | undefined {
  return categories.find((category) => category.slug === slug)
}
