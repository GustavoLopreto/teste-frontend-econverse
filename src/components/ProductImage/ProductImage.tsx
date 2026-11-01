import { fallbackArt } from '../../utils/art'

interface ProductImageProps {
  src: string
  alt: string
  size: number
  className?: string
  lazy?: boolean
}

function ProductImage({ src, alt, size, className, lazy }: ProductImageProps) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading={lazy ? 'lazy' : undefined}
      onError={(event) => {
        event.currentTarget.src = fallbackArt
      }}
    />
  )
}

export default ProductImage
