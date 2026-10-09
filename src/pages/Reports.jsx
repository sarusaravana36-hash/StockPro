import { useContext, useMemo } from 'react'

import ProductContext from '../context/ProductContext'

function Reports() {

  const {
    products,
    sales,
  } = useContext(ProductContext)


  const totalRevenue = useMemo(() => {

    return sales.reduce(
      (total, sale) =>
        total + sale.total,
      0
    )

  }, [sales])


  const totalItemsSold = useMemo(() => {

    return sales.reduce(
      (total, sale) =>
        total + sale.quantity,
      0
    )

  }, [sales])


  const bestSellingProducts =
    useMemo(() => {

      const productSales = {}

      sales.forEach((sale) => {

        if (
          productSales[
            sale.productName
          ]
        ) {

          productSales[
            sale.productName
          ] += sale.quantity

        } else {

          productSales[
            sale.productName
          ] = sale.quantity

        }

      })

      return Object.entries(
        productSales
      )
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 5)

    }, [sales])


  return (
    <section>

      <h2>
        Reports
      </h2>

      <p>
        Sales and inventory reports.
      </p>


      <div className="cards">

        <div className="card">

          <h3>
            Total Sales
          </h3>

          <p>
            🛒 {sales.length}
          </p>

        </div>


        <div className="card">

          <h3>
            Total Items Sold
          </h3>

          <p>
            📦 {totalItemsSold}
          </p>

        </div>


        <div className="card">

          <h3>
            Total Revenue
          </h3>

          <p>
            💰 ₹{totalRevenue.toLocaleString(
              'en-IN'
            )}
          </p>

        </div>


        <div className="card">

          <h3>
            Current Products
          </h3>

          <p>
            📊 {products.length}
          </p>

        </div>

      </div>


      <div className="general-card">

        <h3>
          Best Selling Products
        </h3>

        {bestSellingProducts.length === 0 ? (

          <p>
            No sales available yet.
          </p>

        ) : (

          <table>

            <thead>

              <tr>
                <th>Product</th>
                <th>Units Sold</th>
              </tr>

            </thead>

            <tbody>

              {bestSellingProducts.map(
                ([name, quantity]) => (

                  <tr key={name}>

                    <td>
                      {name}
                    </td>

                    <td>
                      {quantity}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>


      <div className="general-card">

        <h3>
          Current Stock Summary
        </h3>

        <table>

          <thead>

            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (

                <tr key={product.id}>

                  <td>
                    {product.title}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    {product.stock}
                  </td>

                  <td>

                    {product.stock < 20
                      ? '⚠️ Low Stock'
                      : '✓ In Stock'}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </section>
  )
}

export default Reports