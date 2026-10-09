function FilterDropdown({
  categoryFilter,
  setCategoryFilter,
  setCurrentPage,
  categories,
}) {
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value)
    setCurrentPage(1)
  }

  return (
    <select
      value={categoryFilter}
      onChange={handleCategoryChange}
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  )
}

export default FilterDropdown