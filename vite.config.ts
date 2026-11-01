import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

// O endpoint de produtos nao envia cabecalhos CORS.
const proxy = {
  '/api/produtos': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
  },
}

// Espelham src/data/categories.ts e src/data/pages.ts: a configuracao nao importa codigo da pagina.
const CATEGORY_SLUGS = [
  'tecnologia',
  'supermercado',
  'bebidas',
  'ferramentas',
  'saude',
  'esportes',
  'moda',
  'celular',
  'acessorios',
  'tablets',
  'notebooks',
  'tvs',
  'livros',
]
const INFO_SLUGS = [
  'sobre',
  'movimento',
  'carreiras',
  'suporte',
  'contato',
  'faq',
  'termos',
  'privacidade',
  'trocas',
]

// O sitemap exige URLs absolutas, entao so e gerado quando SITE_URL e informado no build.
function sitemap(siteUrl: string | undefined): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      if (!siteUrl) {
        return
      }

      const paths = [
        '/',
        '/produtos',
        '/ofertas',
        '/lancamentos',
        '/parceiros',
        '/assinatura',
        ...CATEGORY_SLUGS.map((slug) => `/categoria/${slug}`),
        ...INFO_SLUGS.map((slug) => `/institucional/${slug}`),
      ]
      const urls = paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap(process.env.SITE_URL)],
  server: { proxy },
  preview: { proxy },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
})
