import React, { useState } from 'react'
import { useParams } from 'react-router'
import './Checkout.scss'

const Checkout = () => {
  const { planId } = useParams()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = {
    1: { name: 'Free', price: 0 },
    2: { name: 'Pro', price: 9.99 },
    3: { name: 'Premium', price: 14.99 }
  }

  const selectedPlan = plans[planId]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      window.location.href = `/payment-success/${Date.now()}`
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-card">
          <div className="checkout-header">
            <h1>Complete Your Purchase</h1>
            <p>Secure payment powered by Stripe</p>
          </div>

          <div className="order-summary">
            <div className="summary-item">
              <span>Plan:</span>
              <strong>{selectedPlan?.name}</strong>
            </div>
            <div className="summary-item">
              <span>Price:</span>
              <strong>${selectedPlan?.price}/month</strong>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total:</span>
              <strong>${selectedPlan?.price}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-methods">
              <label className={`method ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="card" 
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>💳 Credit/Debit Card</span>
              </label>
              <label className={`method ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="paypal" 
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>🅿️ PayPal</span>
              </label>
              <label className={`method ${paymentMethod === 'apple' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  value="apple" 
                  checked={paymentMethod === 'apple'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>🍎 Apple Pay</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" maxLength="3" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="payment-info">
                <p>🅿️ You will be redirected to PayPal to complete your purchase securely.</p>
              </div>
            )}

            {paymentMethod === 'apple' && (
              <div className="payment-info">
                <p>🍎 Click continue to authenticate with Apple Pay on your device.</p>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-pay" 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${selectedPlan?.price}`}
            </button>
          </form>

          <div className="security-badge">
            <span>🔒 Secured by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
