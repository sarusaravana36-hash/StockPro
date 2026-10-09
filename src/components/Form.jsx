import { useState } from 'react'

function Form({
  formData,
  setFormData,
  onSubmit,
  buttonText = 'Submit',
}) {

  const [errors, setErrors] =
    useState({})

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const validateForm = () => {

    const newErrors = {}

    if (!formData.title.trim()) {

      newErrors.title =
        'Product name is required'
    }

    if (!formData.category.trim()) {

      newErrors.category =
        'Category is required'
    }

    if (
      formData.price === '' ||
      Number(formData.price) <= 0
    ) {

      newErrors.price =
        'Price must be greater than 0'
    }

    if (
      formData.stock === '' ||
      Number(formData.stock) < 0
    ) {

      newErrors.stock =
        'Stock cannot be negative'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const isValid =
      validateForm()

    if (!isValid) {
      return
    }

    onSubmit(e)
  }

  return (

    <form onSubmit={handleSubmit}>

      {/* PRODUCT NAME */}

      <input
        type="text"
        name="title"
        placeholder="Product Name"
        value={formData.title}
        onChange={handleChange}
      />

      {errors.title && (
        <p className="form-error">
          {errors.title}
        </p>
      )}

      {/* CATEGORY */}

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      {errors.category && (
        <p className="form-error">
          {errors.category}
        </p>
      )}

      {/* PRICE */}

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        min="0"
      />

      {errors.price && (
        <p className="form-error">
          {errors.price}
        </p>
      )}

      {/* STOCK */}

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        min="0"
      />

      {errors.stock && (
        <p className="form-error">
          {errors.stock}
        </p>
      )}

      <button type="submit">
        {buttonText}
      </button>

    </form>
  )
}

export default Form