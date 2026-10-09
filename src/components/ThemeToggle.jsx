function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      type="button" type="radio"
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

export default ThemeToggle