import { useState } from 'react'
import './ResponseDisplay.css'

function ResponseDisplay({ response, onFeedback }) {
  const [feedbackValue, setFeedbackValue] = useState(null)
  const [feedbackComment, setFeedbackComment] = useState('')

  const handleFeedbackClick = (helpful) => {
    if (!response.queryId || response.feedbackSubmitted) return
    
    setFeedbackValue(helpful)
    onFeedback(response.queryId, helpful, feedbackComment)
  }

  return (
    <div className="response-container">
      {response.isUnsafe && (
        <div className="safety-warning">
          <div className="warning-icon">⚠️</div>
          <div className="warning-content">
            <h3>Safety Warning</h3>
            <p>{response.safetyMessage || 'This query has been flagged as potentially unsafe. Please consult a healthcare professional.'}</p>
            {response.safetyFlags && response.safetyFlags.length > 0 && (
              <div className="safety-flags">
                <strong>Detected concerns: </strong>
                {response.safetyFlags.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="answer-section">
        <h2 className="section-title">AI Answer</h2>
        <div className="answer-content">
          {response.answer.split('\n').map((paragraph, idx) => (
            paragraph.trim() && (
              <p key={idx} className="answer-paragraph">
                {paragraph.trim()}
              </p>
            )
          ))}
        </div>
      </div>

      {response.sources && response.sources.length > 0 && (
        <div className="sources-section">
          <h2 className="section-title">Sources Used</h2>
          <ul className="sources-list">
            {response.sources.map((source, idx) => (
              <li key={idx} className="source-item">
                <span className="source-number">Source {idx + 1}:</span>
                <span className="source-title">{source.title}</span>
                <span className="source-id">(Article ID: {source.articleId})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {response.metadata && (
        <div className="metadata-section">
          <p className="metadata-text">
            Response generated in {response.metadata.responseTime}ms | 
            Retrieved {response.metadata.chunksRetrieved} relevant chunks
          </p>
        </div>
      )}

      {response.queryId && !response.feedbackSubmitted && (
        <div className="feedback-section">
          <h3 className="feedback-title">Was this helpful?</h3>
          <div className="feedback-buttons">
            <button
              className={`feedback-button ${feedbackValue === true ? 'active' : ''}`}
              onClick={() => handleFeedbackClick(true)}
              disabled={feedbackValue !== null}
            >
              👍 Yes
            </button>
            <button
              className={`feedback-button ${feedbackValue === false ? 'active' : ''}`}
              onClick={() => handleFeedbackClick(false)}
              disabled={feedbackValue !== null}
            >
              👎 No
            </button>
          </div>
          {feedbackValue !== null && (
            <p className="feedback-thanks">Thank you for your feedback! 🙏</p>
          )}
        </div>
      )}

      {response.feedbackSubmitted && (
        <div className="feedback-submitted">
          <p>✅ Feedback submitted. Thank you!</p>
        </div>
      )}
    </div>
  )
}

export default ResponseDisplay
