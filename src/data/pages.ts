export interface InfoPageContent {
  title: string
  paragraphs?: string[]
  faq?: { question: string; answer: string }[]
}

export const infoPages: Record<string, InfoPageContent> = {
  sobre: {
    title: 'Sobre nós',
    paragraphs: [
      'A Econverse reúne tecnologia, mercado, moda e muito mais em uma única loja.',
      'Esta é uma loja de demonstração, criada para um teste técnico de front-end: os produtos, os preços e as compras são simulados.',
    ],
  },
  movimento: {
    title: 'Movimento',
    paragraphs: [
      'Acreditamos em um consumo mais consciente, com entregas planejadas e embalagens recicláveis.',
      'A cada pedido, reforçamos o compromisso com parceiros locais e com a redução de desperdícios.',
    ],
  },
  carreiras: {
    title: 'Trabalhe conosco',
    paragraphs: [
      'Buscamos pessoas curiosas, que gostem de resolver problemas e de cuidar de cada detalhe da experiência de compra.',
      'Como esta é uma loja de demonstração, não há vagas abertas no momento.',
    ],
  },
  suporte: {
    title: 'Suporte',
    paragraphs: [
      'Acompanhe suas compras em Meus pedidos e altere seus dados em Minha conta.',
      'Tudo fica salvo apenas neste navegador, e nenhum dado é enviado para servidores.',
    ],
  },
  contato: {
    title: 'Fale conosco',
    paragraphs: [
      'Nosso atendimento de demonstração funciona de segunda a sexta, das 9h às 18h.',
      'Como a loja é simulada, não há canal real de atendimento: consulte as perguntas frequentes para saber mais.',
    ],
  },
  faq: {
    title: 'Perguntas frequentes',
    faq: [
      {
        question: 'As compras são reais?',
        answer: 'Não. O pagamento é simulado, nada é cobrado e nenhum produto é enviado.',
      },
      {
        question: 'Quando o frete é grátis?',
        answer:
          'Nos celulares da vitrine e em compras a partir de R$ 200. Nos demais casos, o frete é de R$ 19,90.',
      },
      {
        question: 'Onde meus dados ficam salvos?',
        answer: 'Somente neste navegador. Os dados de cartão nunca são guardados.',
      },
    ],
  },
  termos: {
    title: 'Termos e condições',
    paragraphs: [
      'Ao usar esta loja de demonstração, você entende que nenhuma compra gera cobrança ou entrega.',
      'Os preços, os estoques e as promoções são fictícios e podem mudar a qualquer momento.',
    ],
  },
  privacidade: {
    title: 'Política de privacidade',
    paragraphs: [
      'Carrinho, favoritos, pedidos e dados da conta ficam no armazenamento local do seu navegador.',
      'Nada é enviado a servidores. Para apagar esses dados, limpe os dados do site no navegador.',
    ],
  },
  trocas: {
    title: 'Troca e devolução',
    paragraphs: [
      'Em uma loja real, você teria até 7 dias após o recebimento para desistir da compra.',
      'Como os pedidos desta loja são simulados, não há produtos para trocar ou devolver.',
    ],
  },
}

export const subscriptionPlans = [
  {
    name: 'Essencial',
    price: 990,
    perks: ['Frete grátis em 2 pedidos por mês', 'Ofertas antecipadas'],
  },
  {
    name: 'Plus',
    price: 1990,
    perks: ['Frete grátis ilimitado', 'Ofertas antecipadas', 'Suporte prioritário'],
  },
]
