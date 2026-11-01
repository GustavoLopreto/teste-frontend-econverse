import Brands from '../components/Brands/Brands'
import Categories from '../components/Categories/Categories'
import Hero from '../components/Hero/Hero'
import Newsletter from '../components/Newsletter/Newsletter'
import PartnerBanners from '../components/PartnerBanners/PartnerBanners'
import ProductShelf from '../components/ProductShelf/ProductShelf'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCatalog } from '../store/StoreContext'
import { hasFreeShipping } from '../utils/pricing'

const SHELF_SIZE = 6

function HomePage() {
  const { products } = useCatalog()
  // Produtos com todos os campos do card do layout: preco riscado, parcelas e frete gratis.
  const complete = products.filter(
    (product) => (product.discount ?? 0) >= 10 && hasFreeShipping(product),
  )

  usePageMeta('Tecnologia, promoções e frete grátis')

  return (
    <>
      <Hero />
      <Categories />
      <ProductShelf title="Produtos relacionados" showTabs />
      <PartnerBanners />
      <ProductShelf
        title="Produtos relacionados"
        products={complete.slice(0, SHELF_SIZE)}
        seeAllTo="/ofertas"
      />
      <PartnerBanners />
      <Brands />
      <ProductShelf
        title="Produtos relacionados"
        products={complete.slice(SHELF_SIZE, SHELF_SIZE * 2)}
        seeAllTo="/produtos"
      />
      <Newsletter />
    </>
  )
}

export default HomePage
