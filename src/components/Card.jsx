function Card({ children, title }) {
  return (
    <div className="general-card">

      {title && (
        <h3>{title}</h3>
      )}

      <div className="card-content">
        {children}
      </div>

    </div>
  )
}

export default Card