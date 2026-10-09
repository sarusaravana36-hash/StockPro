import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

import {
  Routes,
  Route,
} from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import FilterDropdown from './components/FilterDropdown'
import ProductTable from './components/ProductTable'
import Pagination from './components/Pagination'
import StatCard from './components/StatCard'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Toast from './components/Toast'
import ThemeToggle from './components/ThemeToggle'
import Form from './components/Form'
import Card from './components/Card'
import NotFound from './components/NotFound'

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'
import Sales from './pages/Sales'
import Reports from './pages/Reports'

import productReducer from './context/productReducer'
import ProductContext from './context/ProductContext'

import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'


function DashboardPage({
  totalProducts,
  totalStockValue,
  lowStockProducts,
  categoryCounts,
}) {
  return (
    <Dashboard>

      <div className="cards">

        <Card>
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon="📦"
          />
        </Card>

        <Card>
          <StatCard
            title="Total Stock Value"
            value={`₹${totalStockValue.toLocaleString(
              'en-IN'
            )}`}
            icon="💰"
          />
        </Card>

        <Card>
          <StatCard
            title="Low Stock"
            value={lowStockProducts.length}
            icon="⚠️"
          />
        </Card>

      </div>


      <Card
        title="Category-wise Product Count"
      >

        <div className="category-list">

          {Object.entries(
            categoryCounts
          ).map(
            ([
              categoryName,
              count,
            ]) => (

              <div
                className="category-card"
                key={categoryName}
              >

                <h3>
                  {categoryName}
                </h3>

                <p>
                  {count} product(s)
                </p>

              </div>

            )
          )}

        </div>

      </Card>


      <Card
        title="⚠️ Low Stock Products"
      >

        {lowStockProducts.length === 0 ? (

          <p>
            All products have sufficient stock.
          </p>

        ) : (

          <ul>

            {lowStockProducts.map(
              (product) => (

                <li
                  key={product.id}
                >

                  <strong>
                    {product.title}
                  </strong>

                  {' - '}

                  {product.stock}

                  {' units'}

                </li>

              )
            )}

          </ul>

        )}

      </Card>

    </Dashboard>
  )
}


function ProductsPage({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  setCurrentPage,
  categories,
  sortBy,
  setSortBy,
  lowStockProducts,
  loading,
  error,
  currentProducts,
  currentPage,
  totalPages,
  handleEditClick,
  handleDeleteProduct,
  editingProduct,
  setEditingProduct,
  handleUpdateProduct,
}) {
  return (
    <Products>

      <SearchBar
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />


      <FilterDropdown
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        setCurrentPage={setCurrentPage}
        categories={categories}
      />


      <select
        value={sortBy}
        onChange={(e) => {

          setSortBy(
            e.target.value
          )

          setCurrentPage(1)

        }}
      >

        <option value="">
          Sort By
        </option>

        <option value="name">
          Name
        </option>

        <option value="priceLow">
          Price: Low to High
        </option>

        <option value="priceHigh">
          Price: High to Low
        </option>

        <option value="stockLow">
          Stock: Low to High
        </option>

        <option value="stockHigh">
          Stock: High to Low
        </option>

      </select>


      {lowStockProducts.length > 0 && (

        <div className="low-stock-alert">

          ⚠️ Low Stock Alert:{' '}

          {lowStockProducts.length}

          {' product(s) have stock below 20.'}

        </div>

      )}


      {loading ? (

        <Loader />

      ) : error ? (

        <ErrorMessage
          message={error}
        />

      ) : currentProducts.length === 0 ? (

        <p>
          No products found.
        </p>

      ) : (

        <>

          <ProductTable
            currentProducts={currentProducts}
            handleEditClick={handleEditClick}
            handleDeleteProduct={
              handleDeleteProduct
            }
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />

        </>

      )}


      {editingProduct && (

        <Card
          title="Edit Product"
        >

          <Form
            formData={editingProduct}
            setFormData={setEditingProduct}
            onSubmit={handleUpdateProduct}
            buttonText="Update Product"
          />


          <button
            type="button"
            onClick={() =>
              setEditingProduct(null)
            }
          >
            Cancel
          </button>

        </Card>

      )}

    </Products>
  )
}


function AddProductPage({
  productForm,
  setProductForm,
  handleAddProduct,
}) {
  return (
    <AddProduct>

      <Card
        title="Add Product"
      >

        <Form
          formData={productForm}
          setFormData={setProductForm}
          onSubmit={handleAddProduct}
          buttonText="Add Product"
        />

      </Card>

    </AddProduct>
  )
}


function App() {

  const [products, dispatch] =
    useReducer(
      productReducer,
      []
    )


  const [loading, setLoading] =
    useState(true)


  const [error, setError] =
    useState('')


  const [search, setSearch] =
    useState('')


  const debouncedSearch =
    useDebounce(
      search,
      500
    )


  const [sortBy, setSortBy] =
    useState('')


  const [categoryFilter, setCategoryFilter] =
    useState('')


  const [currentPage, setCurrentPage] =
    useState(1)


  const productsPerPage = 10


  const [darkMode, setDarkMode] =
    useLocalStorage(
      'stockpro-dark-mode',
      false
    )


  const [toast, setToast] =
    useState(null)


  const [deleteProductId, setDeleteProductId] =
    useState(null)


  const [productForm, setProductForm] =
    useState({
      title: '',
      category: '',
      price: '',
      stock: '',
    })


  const [editingProduct, setEditingProduct] =
    useState(null)


  const [
    savedProducts,
    setSavedProducts,
  ] = useLocalStorage(
    'stockpro-products',
    null
  )

/* SALES LOCAL STORAGE*/

  const [
    sales,
    setSales,
  ] = useLocalStorage(
    'stockpro-sales',
    []
  )


  /* 
     TOAST
   */

  const showToast = useCallback(
    (
      message,
      type = 'success'
    ) => {

      setToast({
        message,
        type,
      })


      setTimeout(() => {

        setToast(null)

      }, 3000)

    },
    []
  )


  /* 
     FETCH PRODUCTS
   */

  useEffect(() => {

    const getProducts =
      async () => {

        try {

          if (savedProducts) {

            dispatch({
              type: 'SET_PRODUCTS',
              payload: savedProducts,
            })

            setLoading(false)

            return
          }


          const response =
            await fetch(
              'https://dummyjson.com/products'
            )


          if (!response.ok) {

            throw new Error(
              'Failed to fetch products'
            )

          }


          const data =
            await response.json()


          dispatch({
            type: 'SET_PRODUCTS',
            payload: data.products,
          })


          setSavedProducts(
            data.products
          )


          setLoading(false)

        } catch (error) {

          console.log(
            'Error:',
            error
          )


          setError(
            'Unable to load products. Please try again.'
          )


          setLoading(false)

        }

      }


    getProducts()

  }, [])


  /* 
     SAVE PRODUCTS
 */

  useEffect(() => {

    if (
      !loading &&
      products.length > 0
    ) {

      setSavedProducts(
        products
      )

    }

  }, [
    products,
    loading,
    setSavedProducts,
  ])


  /* 
     CATEGORIES
   */

  const categories =
    useMemo(() => {

      return [
        ...new Set(
          products.map(
            (product) =>
              product.category
          )
        ),
      ].sort()

    }, [products])


  /* 
     FILTER + SEARCH + SORT
   */

  const filteredProducts =
    useMemo(() => {

      return [...products]

        .filter((product) =>
          product.title
            .toLowerCase()
            .includes(
              debouncedSearch.toLowerCase()
            )
        )

        .filter((product) =>
          categoryFilter === ''
            ? true
            : product.category ===
              categoryFilter
        )

        .sort((a, b) => {

          if (sortBy === 'name') {

            return a.title.localeCompare(
              b.title
            )

          }


          if (sortBy === 'priceLow') {

            return a.price - b.price

          }


          if (sortBy === 'priceHigh') {

            return b.price - a.price

          }


          if (sortBy === 'stockLow') {

            return a.stock - b.stock

          }


          if (sortBy === 'stockHigh') {

            return b.stock - a.stock

          }


          return 0

        })

    }, [
      products,
      debouncedSearch,
      categoryFilter,
      sortBy,
    ])


  /* 
     PAGINATION
  */

  const totalPages =
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    )


  const startIndex =
    (currentPage - 1) *
    productsPerPage


  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex +
        productsPerPage
    )


  /* 
     LOW STOCK
  */

  const lowStockProducts =
    useMemo(() => {

      return products.filter(
        (product) =>
          product.stock < 20
      )

    }, [products])


  /* 
     TOTAL STOCK VALUE
   */

  const totalStockValue =
    useMemo(() => {

      return products.reduce(
        (total, product) =>
          total +
          product.price *
            product.stock,
        0
      )

    }, [products])


  const totalProducts =
    products.length


  /*
     CATEGORY COUNTS
   */

  const categoryCounts =
    useMemo(() => {

      return products.reduce(
        (categories, product) => {

          const categoryName =
            product.category


          if (
            categories[
              categoryName
            ]
          ) {

            categories[
              categoryName
            ] += 1

          } else {

            categories[
              categoryName
            ] = 1

          }


          return categories

        },
        {}
      )

    }, [products])


  /* 
     ADD PRODUCT
  */

  const handleAddProduct =
    useCallback(
      (e) => {

        e.preventDefault()


        if (
          !productForm.title ||
          !productForm.category ||
          !productForm.price ||
          !productForm.stock
        ) {

          showToast(
            'Please fill all fields',
            'error'
          )

          return

        }


        const highestId =
          products.reduce(
            (maxId, product) =>
              Math.max(
                maxId,
                Number(product.id)
              ),
            0
          )


        const newProduct = {

          id:
            highestId + 1,

          title:
            productForm.title,

          category:
            productForm.category,

          price:
            Number(
              productForm.price
            ),

          stock:
            Number(
              productForm.stock
            ),

        }


        dispatch({
          type: 'ADD_PRODUCT',
          payload: newProduct,
        })


        setProductForm({
          title: '',
          category: '',
          price: '',
          stock: '',
        })


        showToast(
          `Product added successfully! ID: ${
            highestId + 1
          }`
        )

      },
      [
        productForm,
        products,
        showToast,
      ]
    )


  /* 
     EDIT PRODUCT
   */

  const handleEditClick =
    useCallback(
      (product) => {

        setEditingProduct({

          ...product,

          price:
            String(
              product.price
            ),

          stock:
            String(
              product.stock
            ),

        })

      },
      []
    )


  /* 
     UPDATE PRODUCT
  */

  const handleUpdateProduct =
    useCallback(
      (e) => {

        e.preventDefault()


        if (
          !editingProduct.title ||
          !editingProduct.category ||
          editingProduct.price === '' ||
          editingProduct.stock === ''
        ) {

          showToast(
            'Please fill all fields',
            'error'
          )

          return

        }


        const updatedProduct = {

          ...editingProduct,

          price:
            Number(
              editingProduct.price
            ),

          stock:
            Number(
              editingProduct.stock
            ),

        }


        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: updatedProduct,
        })


        setEditingProduct(null)


        showToast(
          'Product updated successfully!'
        )

      },
      [
        editingProduct,
        showToast,
      ]
    )


  /* 
     DELETE PRODUCT
  */

  const handleDeleteProduct =
    useCallback(
      (id) => {

        setDeleteProductId(id)

      },
      []
    )


  const confirmDelete =
    useCallback(
      () => {

        dispatch({

          type:
            'DELETE_PRODUCT',

          payload:
            deleteProductId,

        })


        setDeleteProductId(null)


        showToast(
          'Product deleted successfully!'
        )

      },
      [
        deleteProductId,
        showToast,
      ]
    )


  /*
     ADD SALE
 */

  const addSale =
    useCallback(
      (
        product,
        quantity
      ) => {

        const updatedProduct = {

          ...product,

          stock:
            product.stock -
            quantity,

        }


        dispatch({

          type:
            'UPDATE_PRODUCT',

          payload:
            updatedProduct,

        })


        const newSale = {

          id:
            Date.now(),

          productId:
            product.id,

          productName:
            product.title,

          quantity:
            quantity,

          price:
            product.price,

          total:
            product.price *
            quantity,

          date:
            new Date().toLocaleString(
              'en-IN'
            ),

        }


        setSales([
          ...sales,
          newSale,
        ])

      },
      [
        sales,
        setSales,
      ]
    )


  /* 
     DARK MODE
 */

  const appClassName =
    darkMode
      ? 'app dark-mode'
      : 'app'


  return (

    <ProductContext.Provider
      value={{
        products,
        dispatch,
        sales,
        addSale,
      }}
    >

      <div
        className={appClassName}
      >

        <Navbar />


        <div className="theme-container">

          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={
              setDarkMode
            }
          />

        </div>


        <div className="main">

          <Sidebar />


          <main className="content">

            <Routes>


              {/* 
                  DASHBOARD
             */}

              <Route
                path="/"
                element={

                  <DashboardPage

                    totalProducts={
                      totalProducts
                    }

                    totalStockValue={
                      totalStockValue
                    }

                    lowStockProducts={
                      lowStockProducts
                    }

                    categoryCounts={
                      categoryCounts
                    }

                  />

                }
              />


              {/* 
                  PRODUCTS
              */}

              <Route
                path="/products"
                element={

                  <ProductsPage

                    search={
                      search
                    }

                    setSearch={
                      setSearch
                    }

                    categoryFilter={
                      categoryFilter
                    }

                    setCategoryFilter={
                      setCategoryFilter
                    }

                    setCurrentPage={
                      setCurrentPage
                    }

                    categories={
                      categories
                    }

                    sortBy={
                      sortBy
                    }

                    setSortBy={
                      setSortBy
                    }

                    lowStockProducts={
                      lowStockProducts
                    }

                    loading={
                      loading
                    }

                    error={
                      error
                    }

                    currentProducts={
                      currentProducts
                    }

                    currentPage={
                      currentPage
                    }

                    totalPages={
                      totalPages
                    }

                    handleEditClick={
                      handleEditClick
                    }

                    handleDeleteProduct={
                      handleDeleteProduct
                    }

                    editingProduct={
                      editingProduct
                    }

                    setEditingProduct={
                      setEditingProduct
                    }

                    handleUpdateProduct={
                      handleUpdateProduct
                    }

                  />

                }
              />


              {/* 
                  ADD PRODUCT
              */}

              <Route
                path="/add"
                element={

                  <AddProductPage

                    productForm={
                      productForm
                    }

                    setProductForm={
                      setProductForm
                    }

                    handleAddProduct={
                      handleAddProduct
                    }

                  />

                }
              />


              {/* 
                  PRODUCT DETAILS
             */}

              <Route
                path="/product/:id"
                element={
                  <ProductDetails />
                }
              />


              {/* 
                  SALES
              */}

              <Route
                path="/sales"
                element={
                  <Sales />
                }
              />


              {/* 
                  REPORTS
              */}

              <Route
                path="/reports"
                element={
                  <Reports />
                }
              />


              {/* 
                  404
               */}

              <Route
                path="*"
                element={
                  <NotFound />
                }
              />

            </Routes>

          </main>

        </div>


        <Footer />


        {/* 
            DELETE MODAL
        */}

        {deleteProductId !== null && (

          <Modal
            title="Delete Product"
            onClose={() =>
              setDeleteProductId(
                null
              )
            }
          >

            <p>
              Are you sure you want
              to delete this product?
            </p>


            <div className="modal-actions">

              <button
                type="button"
                onClick={
                  confirmDelete
                }
              >
                Yes, Delete
              </button>


              <button
                type="button"
                onClick={() =>
                  setDeleteProductId(
                    null
                  )
                }
              >
                Cancel
              </button>

            </div>

          </Modal>

        )}


        {/* 
            TOAST
         */}

        {toast && (

          <Toast

            message={
              toast.message
            }

            type={
              toast.type
            }

            onClose={() =>
              setToast(null)
            }

          />

        )}

      </div>

    </ProductContext.Provider>

  )
}

export default App