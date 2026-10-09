function Dashboard({ children }) {
  return (
    <section>
      <h2>Dashboard</h2>

      <p>
        Welcome to StockPro Inventory
        Management System.
      </p>

      {children}
    </section>
  )
}

export default Dashboard