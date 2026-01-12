import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Searching the yoga knowledge base...</p>
    </div>
  )
}

export default LoadingSpinner
