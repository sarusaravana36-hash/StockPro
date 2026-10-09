import { useContext } from 'react'

import ProductContext from '../context/ProductContext'

import Badge from './Badge'
import Button from './Button'

function ProductTable({
  currentProducts,
  handleEditClick,
  handleDeleteProduct,
}) {

  const { products } =
    useContext(ProductContext)

  return (
    <table>

      <thead>

        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

      </thead>

      <tbody>

        {currentProducts.map(
          (product) => (

            <tr key={product.id}>

              <td>
                {product.id}
              </td>

              <td>
                {product.title}
              </td>

              <td>
                {product.category}
              </td>

              <td>
                ₹{product.price}
              </td>

              <td>
                {product.stock}
              </td>

              <td>
                <Badge
                  stock={product.stock}
                />
              </td>

              <td>

                <Button
                  onClick={() =>
                    handleEditClick(
                      product
                    )
                  }
                >
                  Edit
                </Button>

                <Button
                  onClick={() =>
                    handleDeleteProduct(
                      product.id
                    )
                  }
                >
                  Delete
                </Button>

              </td>

            </tr>

          )
        )}

      </tbody>

    </table>
  )
}

export default ProductTable