import React from 'react'
import { Link } from 'react-router'
import './PaymentFailed.scss'

const PaymentFailed = () => {
  return (
    <div className="failed-page">
      <div className="failed-container">
        <div className="failed-card">
          <div className="failed-icon">✕</div>
          <h1>Payment Failed</h1>
          <p className="subtitle">Unable to process your payment</p>
          
          <div className="error-messages">
            <div className="error-item">
              <span>❌ Check your card details</span>
            </div>
            <div className="error-item">
              <span>❌ Ensure sufficient funds</span>
            </div>
            <div className="error-item">
              <span>❌ Verify your billing address</span>
            </div>
          </div>

          <div className="failed-message">
            <p>Your payment was declined by your bank. Please try again or use a different payment method.</p>
          </div>

          <div className="action-buttons">
            <Link to="/pricing" className="btn-retry">Try Again</Link>
            <Link to="/" className="btn-home">Back to Home</Link>
          </div>

          <p className="support-text">Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed
