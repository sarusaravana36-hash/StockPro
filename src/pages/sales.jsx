import { useContext, useMemo, useState } from 'react'

import ProductContext from '../context/ProductContext'

function Sales() {

  const {
    products,
    sales,
    addSale,
  } = useContext(ProductContext)

  const [selectedProductId, setSelectedProductId] =
    useState('')

  const [quantity, setQuantity] =
    useState('')

  const selectedProduct = useMemo(() => {

    return products.find(
      (product) =>
        String(product.id) ===
        String(selectedProductId)
    )

  }, [
    products,
    selectedProductId,
  ])

  const totalAmount =
    selectedProduct && quantity
      ? selectedProduct.price *
        Number(quantity)
      : 0

  const handleSale = (e) => {

    e.preventDefault()

    if (!selectedProduct) {
      alert('Please select a product')
      return
    }

    if (
      quantity === '' ||
      Number(quantity) <= 0
    ) {
      alert('Please enter a valid quantity')
      return
    }

    if (
      Number(quantity) >
      selectedProduct.stock
    ) {
      alert('Not enough stock available')
      return
    }

    addSale(
      selectedProduct,
      Number(quantity)
    )

    alert(
      `Sale completed successfully!\n\nProduct: ${
        selectedProduct.title
      }\nQuantity: ${
        quantity
      }\nTotal: ₹${totalAmount.toLocaleString(
        'en-IN'
      )}`
    )

    setSelectedProductId('')
    setQuantity('')
  }

  return (
    <section>

      <h2>Sales</h2>

      <p>
        Manage product sales and transactions.
      </p>


      <div className="general-card">

        <h3>
          Sell Product
        </h3>


        <form onSubmit={handleSale}>

          <label>
            Select Product
          </label>

          <select
            value={selectedProductId}
            onChange={(e) =>
              setSelectedProductId(
                e.target.value
              )
            }
          >

            <option value="">
              -- Select Product --
            </option>

            {products.map(
              (product) => (

                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.title}
                </option>

              )
            )}

          </select>


          {selectedProduct && (

            <>
              <p>
                <strong>
                  Available Stock:
                </strong>{' '}
                {selectedProduct.stock} units
              </p>

              <p>
                <strong>
                  Price:
                </strong>{' '}
                ₹{selectedProduct.price}
              </p>
            </>

          )}


          <label>
            Quantity
          </label>

          <input
            type="number"
            min="1"
            max={
              selectedProduct
                ? selectedProduct.stock
                : undefined
            }
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            placeholder="Enter quantity"
          />


          {selectedProduct && (

            <p>
              <strong>
                Total Amount:
              </strong>{' '}

              ₹{totalAmount.toLocaleString(
                'en-IN'
              )}
            </p>

          )}


          <button type="submit">
            🛒 Sell Product
          </button>

        </form>

      </div>


      <div className="general-card">

        <h3>
          Sales History
        </h3>

        {sales.length === 0 ? (

          <p>
            No sales recorded yet.
          </p>

        ) : (

          <table>

            <thead>

              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {sales.map(
                (sale) => (

                  <tr key={sale.id}>

                    <td>
                      {sale.productName}
                    </td>

                    <td>
                      {sale.quantity}
                    </td>

                    <td>
                      ₹{sale.price}
                    </td>

                    <td>
                      ₹{sale.total.toLocaleString(
                        'en-IN'
                      )}
                    </td>

                    <td>
                      {sale.date}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </section>
  )
}

export default Sales