import React from 'react'
import { Link } from 'react-router'
import './Pricing.scss'

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: 'Free',
      price: '0',
      description: 'Get started with music',
      features: [
        'Stream up to 5 songs/day',
        'Basic mood detection',
        'Limited library access',
        'Standard quality'
      ]
    },
    {
      id: 2,
      name: 'Pro',
      price: '9.99',
      description: 'Unlimited music streaming',
      features: [
        'Unlimited streaming',
        'Advanced mood detection',
        'Full library access',
        'High quality audio (320kbps)',
        'Ad-free experience',
        'Offline downloads'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Premium',
      price: '14.99',
      description: 'Ultimate music experience',
      features: [
        'Everything in Pro',
        'Lossless audio quality',
        'Priority support',
        'Exclusive features',
        'Early access to new features',
        'Spatial audio'
      ]
    }
  ]

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Unlock unlimited music and features</p>
      </div>

      <div className="pricing-container">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <p className="tagline">{plan.description}</p>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/month</span>
              </div>
            </div>
            <Link to={`/checkout/${plan.id}`} className="btn-upgrade">
              Get Started
            </Link>
            <div className="features-list">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="feature">
                  <span className="checkmark">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
