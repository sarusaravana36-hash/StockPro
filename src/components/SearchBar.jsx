import { useRef } from 'react'

function SearchBar({
  search,
  setSearch,
  setCurrentPage,
}) {

  const searchInputRef =
    useRef(null)


  const handleSearch = (e) => {

    setSearch(
      e.target.value
    )

    setCurrentPage(1)

  }


  const focusSearchInput = () => {

    searchInputRef.current.focus()

  }


  return (

    <div className="search-container">

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
      />


      <button
        type="button"
        onClick={
          focusSearchInput
        }
      >
        🔍 Focus Search
      </button>

    </div>

  )
}

export default SearchBar