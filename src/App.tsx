import { Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'
import {
  AllProductsPage,
  BrandPage,
  CategoryPage,
  FavoritesPage,
  NewProductsPage,
  OffersPage,
  SearchPage,
} from './pages/listings'
import NotFoundPage from './pages/NotFoundPage'
import OrderPage from './pages/OrderPage'
import OrdersPage from './pages/OrdersPage'
import PartnersPage from './pages/PartnersPage'
import ProductPage from './pages/ProductPage'
import SubscriptionPage from './pages/SubscriptionPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<AllProductsPage />} />
        <Route path="categoria/:slug" element={<CategoryPage />} />
        <Route path="marca/:slug" element={<BrandPage />} />
        <Route path="ofertas" element={<OffersPage />} />
        <Route path="lancamentos" element={<NewProductsPage />} />
        <Route path="busca" element={<SearchPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="produto/:slug" element={<ProductPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="pedidos" element={<OrdersPage />} />
        <Route path="pedido/:id" element={<OrderPage />} />
        <Route path="conta" element={<AccountPage />} />
        <Route path="assinatura" element={<SubscriptionPage />} />
        <Route path="parceiros" element={<PartnersPage />} />
        <Route path="institucional/:slug" element={<InfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
