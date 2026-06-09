import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import FileExplorer from '../files/FileExplorer'
import Terminal from '../files/Terminal'
import S3SyncAgent from '../files/S3SyncAgent'
import ServiceDashboard from '../files/ServiceDashboard'
import './Microservices.css'

const Microservices = () => {
  const navigate = useNavigate()
  const [activePanel, setActivePanel] = useState('dashboard')

  const renderPanel = () => {
    switch(activePanel) {
      case 'dashboard':
        return <ServiceDashboard />
      case 'files':
        return <FileExplorer />
      case 'terminal':
        return <Terminal />
      case 's3':
        return <S3SyncAgent />
      default:
        return <ServiceDashboard />
    }
  }

  return (
    <div className="microservices-container">
      <div className="ms-header">
        <div className="ms-header-content">
          <h1>🚀 SyncSpace Microservices Infrastructure</h1>
          <p>Multi-Agent Cloud-Native Orchestration Platform</p>
        </div>
        <button
          className="back-btn"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Chat
        </button>
      </div>

      <div className="ms-nav">
        <button
          className={`nav-item ${activePanel === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActivePanel('dashboard')}
        >
          <span className="nav-icon">📊</span>
          Service Dashboard
        </button>
        <button
          className={`nav-item ${activePanel === 'files' ? 'active' : ''}`}
          onClick={() => setActivePanel('files')}
        >
          <span className="nav-icon">📁</span>
          File Explorer
        </button>
        <button
          className={`nav-item ${activePanel === 'terminal' ? 'active' : ''}`}
          onClick={() => setActivePanel('terminal')}
        >
          <span className="nav-icon">⌨️</span>
          Terminal
        </button>
        <button
          className={`nav-item ${activePanel === 's3' ? 'active' : ''}`}
          onClick={() => setActivePanel('s3')}
        >
          <span className="nav-icon">☁️</span>
          S3 Sync Agent
        </button>
      </div>

      <div className="ms-content">
        {renderPanel()}
      </div>

      <div className="ms-footer">
        <div className="footer-stat">
          <span className="stat-label">Environment</span>
          <span className="stat-value">Production</span>
        </div>
        <div className="footer-stat">
          <span className="stat-label">Cluster Status</span>
          <span className="stat-value">🟢 Healthy</span>
        </div>
        <div className="footer-stat">
          <span className="stat-label">Active Agents</span>
          <span className="stat-value">6/6 Online</span>
        </div>
        <div className="footer-stat">
          <span className="stat-label">Uptime</span>
          <span className="stat-value">99.96%</span>
        </div>
      </div>
    </div>
  )
}

export default Microservices
