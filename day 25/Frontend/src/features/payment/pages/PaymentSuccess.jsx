import React, { useEffect } from 'react'
import { Link } from 'react-router'
import './PaymentSuccess.scss'

const PaymentSuccess = () => {
  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = '/app'
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Payment Successful!</h1>
          <p className="subtitle">Your subscription is now active</p>
          
          <div className="success-details">
            <div className="detail-item">
              <span className="label">Order Status:</span>
              <span className="value">Confirmed</span>
            </div>
            <div className="detail-item">
              <span className="label">Subscription Active:</span>
              <span className="value">Now</span>
            </div>
            <div className="detail-item">
              <span className="label">Next Billing:</span>
              <span className="value">30 days from today</span>
            </div>
          </div>

          <div className="success-message">
            <p>Welcome to Moodify Premium! 🎉</p>
            <p>Enjoy unlimited music streaming and all premium features.</p>
          </div>

          <div className="action-buttons">
            <Link to="/app" className="btn-continue">Start Listening</Link>
            <Link to="/account" className="btn-account">View Account</Link>
          </div>

          <p className="redirect-text">Redirecting to dashboard in 5 seconds...</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
