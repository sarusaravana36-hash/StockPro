function NotFound() {
  return (
    <div className="not-found">

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for
        does not exist.
      </p>

      <button
        type="button"
        onClick={() => {
          window.location.href = '/'
        }}
      >
        Go Home
      </button>

    </div>
  )
}

export default NotFound