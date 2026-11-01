import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { useStore } from '../../store/StoreContext'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import ProductModal from '../ProductModal/ProductModal'
import styles from './Layout.module.scss'

function Layout() {
  const { pathname } = useLocation()
  const { selectedProduct, closeProduct, toast } = useStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductModal key={selectedProduct.slug} product={selectedProduct} onClose={closeProduct} />
      )}
      <div className={styles.toastRegion} role="status">
        {toast && (
          <p className={styles.toast}>
            {toast}. <Link to="/carrinho">Ver carrinho</Link>
          </p>
        )}
      </div>
    </>
  )
}

export default Layout
