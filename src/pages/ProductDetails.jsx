import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import ProductContext from '../context/ProductContext'

function ProductDetails() {

  const { id } = useParams()

  const { products } =
    useContext(ProductContext)

  const product =
    products.find(
      (item) =>
        String(item.id) === String(id)
    )

  if (!product) {
    return (
      <section>

        <h2>
          Product Not Found
        </h2>

        <p>
          No product found with ID: {id}
        </p>

        <Link to="/products">
          ← Back to Products
        </Link>

      </section>
    )
  }

  return (
    <section>

      <h2>
        Product Details
      </h2>

      <div className="product-details">

        <h3>
          {product.title}
        </h3>

        <p>
          <strong>
            Product ID:
          </strong>{' '}
          {product.id}
        </p>

        <p>
          <strong>
            Category:
          </strong>{' '}
          {product.category}
        </p>

        <p>
          <strong>
            Price:
          </strong>{' '}
          ₹{product.price}
        </p>

        <p>
          <strong>
            Stock:
          </strong>{' '}
          {product.stock}
        </p>

        <p>
          <strong>
            Status:
          </strong>{' '}

          {product.stock < 20
            ? '⚠️ Low Stock'
            : '✓ In Stock'}

        </p>

        <Link to="/products">
          ← Back to Products
        </Link>

      </div>

    </section>
  )
}

export default ProductDetails