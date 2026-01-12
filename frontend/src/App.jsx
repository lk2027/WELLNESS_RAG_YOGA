import { useState } from 'react'
import QueryInput from './components/QueryInput'
import ResponseDisplay from './components/ResponseDisplay'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (userQuery) => {
    if (!userQuery.trim()) {
      setError('Please enter a question')
      return
    }

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to get response')
      }

      const data = await res.json()
      setResponse(data)
      setQuery('')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFeedback = async (queryId, helpful, comment = '') => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryId, helpful, comment }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit feedback')
      }

      // Update response with feedback confirmation
      setResponse(prev => ({
        ...prev,
        feedbackSubmitted: true,
        feedbackHelpful: helpful
      }))
    } catch (err) {
      console.error('Error submitting feedback:', err)
      alert('Failed to submit feedback. Please try again.')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧘 Ask Me Anything About Yoga</h1>
        <p className="subtitle">Powered by RAG (Retrieval-Augmented Generation)</p>
      </header>

      <main className="app-main">
        <QueryInput 
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
          disabled={loading}
        />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-message">
            <span>❌</span> {error}
          </div>
        )}

        {response && (
          <ResponseDisplay 
            response={response}
            onFeedback={handleFeedback}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Wellness RAG Micro-App | Built with React, Node.js, MongoDB, and Chroma</p>
      </footer>
    </div>
  )
}

export default App
