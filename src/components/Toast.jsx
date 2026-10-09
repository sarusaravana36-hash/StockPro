function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`toast ${type}`}>

      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
      >
        ✕
      </button>

    </div>
  )
}

export default Toast