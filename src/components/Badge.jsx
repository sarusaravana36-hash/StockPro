function Badge({ stock }) {
  if (stock < 20) {
    return (
      <span className="low-stock">
        ⚠️ Low Stock
      </span>
    )
  }

  return (
    <span className="in-stock">
      ✓ In Stock
    </span>
  )
}

export default Badge