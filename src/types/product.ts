export interface Product {
  productName: string
  descriptionShort: string
  photo: string
  // Valor em centavos.
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: Product[]
}

export interface CatalogProduct extends Product {
  slug: string
  category: string
  brand: string
  // Percentual de desconto sobre o preco original.
  discount?: number
  isNew?: boolean
  freeShipping?: boolean
  installments?: number
}
