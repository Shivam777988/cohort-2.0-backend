import React, { useState } from 'react'
import './Account.scss'

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>Account Settings</h1>
        <p>Manage your profile and preferences</p>
      </div>

      <div className="account-container">
        <div className="account-sidebar">
          <div className="account-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
            <button 
              className={`nav-item ${activeTab === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscription')}
            >
              🎵 Subscription
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              ⚙️ Preferences
            </button>
            <button 
              className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              💳 Billing
            </button>
          </div>
        </div>

        <div className="account-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Profile Information</h2>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" disabled />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" defaultValue="User" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea placeholder="Tell us about yourself" rows="4"></textarea>
              </div>
              <button className="btn-save" onClick={handleSave}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="tab-content">
              <h2>Subscription Status</h2>
              <div className="subscription-card">
                <div className="status-badge">🌟 Premium</div>
                <p className="plan-name">Moodify Premium</p>
                <p className="next-billing">Next billing date: May 8, 2026</p>
                <button className="btn-manage">Manage Subscription</button>
                <button className="btn-cancel">Cancel Subscription</button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h2>Preferences</h2>
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Email notifications</span>
                </label>
              </div>
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Weekly recommendations</span>
                </label>
              </div>
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Marketing emails</span>
                </label>
              </div>
              <button className="btn-save" onClick={handleSave}>Save Preferences</button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="tab-content">
              <h2>Billing Information</h2>
              <div className="billing-item">
                <h3>Payment Method</h3>
                <p>💳 Card ending in 4242</p>
                <button className="btn-update">Update Payment Method</button>
              </div>
              <div className="billing-item">
                <h3>Billing History</h3>
                <table className="billing-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>April 8, 2026</td>
                      <td>$14.99</td>
                      <td><span className="status-paid">Paid</span></td>
                      <td><button className="btn-invoice">Download</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
