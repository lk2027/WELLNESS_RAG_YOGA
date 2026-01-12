import { useState } from 'react'
import './QueryInput.css'

function QueryInput({ query, setQuery, onSubmit, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !disabled) {
      onSubmit(query)
    }
  }

  return (
    <form className="query-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          className="query-textarea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about yoga... (e.g., 'What are the benefits of Shavasana?', 'I am pregnant, what poses should I avoid?')"
          rows="4"
          disabled={disabled}
        />
        <button 
          type="submit" 
          className="submit-button"
          disabled={disabled || !query.trim()}
        >
          {disabled ? 'Processing...' : '🧘 Ask'}
        </button>
      </div>
    </form>
  )
}

export default QueryInput
