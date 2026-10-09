import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'active-button'
            : ''
        }
      >
        📊 Dashboard
      </NavLink>


      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? 'active-button'
            : ''
        }
      >
        📦 Products
      </NavLink>


      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive
            ? 'active-button'
            : ''
        }
      >
        ➕ Add Stock
      </NavLink>


      <NavLink
        to="/sales"
        className={({ isActive }) =>
          isActive
            ? 'active-button'
            : ''
        }
      >
        💰 Sales
      </NavLink>


      <NavLink
        to="/reports"
        className={({ isActive }) =>
          isActive
            ? 'active-button'
            : ''
        }
      >
        📈 Reports
      </NavLink>

    </aside>
  )
}

export default Sidebar