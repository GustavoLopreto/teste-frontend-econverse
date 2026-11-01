# Teste Econverse: Desenvolvedor Front-End

Página de e-commerce feita em React e TypeScript a partir do [layout no Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1). A vitrine consome o [JSON de produtos](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json), e clicar em um produto abre um modal com as informações dele.

Além do pedido no teste, a página virou uma loja navegável: categorias, marcas, busca com sugestões, página de produto, favoritos, carrinho, finalização de compra simulada e histórico de pedidos.

## Tecnologias

- React 19, TypeScript e Vite
- React Router para a navegação entre as páginas
- Sass com CSS Modules, sem bibliotecas de UI
- Vitest e React Testing Library
- ESLint e Prettier

## Como rodar

É preciso ter o Node.js 22.22 ou superior.

```bash
npm install
npm run dev
```

Depois, abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Como compilar

```bash
npm run build
npm run preview
```

## Como testar

```bash
npm test
```

Também estão disponíveis `npm run lint`, `npm run typecheck` e `npm run format:check`.

## Estrutura

```text
src/
  assets/      imagens exportadas do Figma
  components/  um componente por pasta, com estilo e testes ao lado
  data/        catálogo, categorias e textos das páginas
  hooks/       busca do JSON, estado persistente e título da página
  pages/       uma página por rota
  services/    chamada ao endpoint de produtos
  store/       carrinho, favoritos, pedidos e conta
  styles/      tokens do Figma, mixins e estilos globais
  test/        configuração e dados dos testes
  types/       tipos compartilhados
  utils/       preços, busca, ordenação e formatação
```

## Decisões

- **Dados dos celulares:** a vitrine e o modal mostram nome, descrição, foto e preço exatamente como vêm do JSON do teste, por isso todos têm a mesma foto. O campo `price` é tratado como centavos, porque o modal do Figma mostra R$ 1.499,90 e o JSON traz `149990`. O preço riscado (7% de desconto), as parcelas (2x) e o frete grátis não existem no JSON: são derivados do preço oficial para seguir o card do layout.
- **Demais produtos:** acrescentados para a navegação da loja, ficam em `src/data/catalog.ts`, com preços estimados. As fotos vêm do catálogo público de demonstração [DummyJSON](https://dummyjson.com), carregadas pela internet. As de TVs, ferramentas e livros, que esse catálogo não tem, ficam em `src/assets/catalog` (veja os créditos abaixo).
- **Compra simulada:** carrinho, favoritos, pedidos e conta ficam só no `localStorage`. Nada é enviado nem cobrado, e os dados de cartão nunca são salvos.
- **Regras da loja:** frete grátis nos celulares da vitrine e em compras a partir de R$ 200 (abaixo disso, R$ 19,90). Nos demais produtos, o parcelamento vai até 10x, conforme o valor.
- **Proxy e rotas:** o endpoint de produtos não envia cabeçalhos CORS, então os comandos `dev` e `preview` usam um proxy do Vite em `/api/produtos`. Para publicar na Vercel, o `vercel.json` já traz esse redirecionamento e as rotas da loja. Em outra hospedagem estática, é preciso criar regras equivalentes.
- **SEO:** cada rota define título, descrição, URL canônica e dados de compartilhamento. Há `robots.txt` e imagem de compartilhamento. O `sitemap.xml` exige o domínio final, então é gerado ao informar `SITE_URL` no build, por exemplo `SITE_URL=https://meusite.com npm run build`.
- **Internet:** as fontes e os ícones estão no projeto. O JSON do teste e as fotos dos demais produtos vêm da internet. Se uma foto não carregar, aparece uma imagem substituta.
- **Layout:** o Figma é a referência da página inicial e do modal, comparados com a exportação do próprio arquivo em 1440 px. Ele difere do PNG da vitrine, que usa rosa. As demais páginas não existem no Figma e seguem os mesmos tokens. Coração de favorito e selo de desconto aparecem só nessas páginas.
- **Ícones e logo:** são recortes da exportação do Figma, em `src/assets/figma`.
- **Logos das marcas:** a seção usa logos reais do [Simple Icons](https://simpleicons.org) (coleção sob licença CC0) em vez do logo repetido do Figma. Eles só ilustram esta demonstração, e as marcas pertencem aos seus donos.
- **Modal:** usa o `<dialog>` nativo, que já cuida do foco e do fechamento com Esc.

## Créditos das imagens

Imagens de `src/assets/catalog`, usadas só para ilustrar esta demonstração:

| Imagem | Fonte | Licença indicada na fonte |
| --- | --- | --- |
| TV OLED | [LG OLED TV](https://commons.wikimedia.org/wiki/File:LG_OLED_TV.jpg), LG Electronics, Wikimedia Commons | CC BY 2.0 |
| TV LCD | [LCD TV 240 Hz](https://commons.wikimedia.org/wiki/File:LG전자,_잔상_없앤_240Hz_LCD_TV_국내_출시.jpg), LG Electronics, Wikimedia Commons | CC BY 2.0 |
| Martelo | [Claw-hammer](https://commons.wikimedia.org/wiki/File:Claw-hammer.jpg), Wikimedia Commons | Domínio público |
| Alicate | [Klieste pre montaz](https://commons.wikimedia.org/wiki/File:Klieste_pre_montaz_elektrosuciastok.jpg), Wikimedia Commons | Domínio público |
| Trena | [Measuring-tape](https://commons.wikimedia.org/wiki/File:Measuring-tape.jpg), Wikimedia Commons | Domínio público |
| Chave inglesa | [Adjustable wrench](https://commons.wikimedia.org/wiki/File:AdjustableWrenchWhiteBackground.jpg), Wikimedia Commons | CC0 |
| Serrote | [Serrucho](https://commons.wikimedia.org/wiki/File:Serrucho.png), Wikimedia Commons | CC0 |
| Jogo de ferramentas | [Hand-tool set](https://commons.wikimedia.org/wiki/File:Hand-tool_set_with_bits_and_accessories_arranged_on_a_white_surface..jpg), Wikimedia Commons | CC0 |
| Dom Casmurro, O Cortiço | Capas no Wikimedia Commons | CC0 |
| O Guarani, Iracema, Memórias Póstumas | Primeiras edições: [O Guarani](https://commons.wikimedia.org/wiki/File:Oguarani.jpg), [Iracema](https://commons.wikimedia.org/wiki/File:Iracema_primeira_edicao.png) e [Memórias Póstumas](https://commons.wikimedia.org/wiki/File:Memorias_Posthumas_de_Braz_Cubas.jpg), Wikimedia Commons | Domínio público |
