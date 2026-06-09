import React, { useState, useEffect } from 'react'
import './S3SyncAgent.css'

const S3SyncAgent = () => {
  const [syncStatus, setSyncStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [lastSync, setLastSync] = useState(new Date(Date.now() - 300000)) // 5 min ago
  const [stats, setStats] = useState({
    filesUploaded: 245,
    totalSize: '2.3MB',
    uploadSpeed: '4.5 MB/s',
    timeElapsed: '31s',
    errors: 0
  })

  const handleSync = () => {
    setSyncStatus('syncing')
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setSyncStatus('success')
          setLastSync(new Date())
          setTimeout(() => setSyncStatus('idle'), 3000)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 400)
  }

  return (
    <div className="s3-sync-container">
      <div className="sync-header">
        <h3>☁️ S3 Sync Agent</h3>
        <span className={`sync-badge ${syncStatus}`}>
          {syncStatus === 'idle' && '⏸ Ready'}
          {syncStatus === 'syncing' && '🔄 Syncing...'}
          {syncStatus === 'success' && '✅ Complete'}
        </span>
      </div>

      <div className="sync-card">
        <div className="sync-info">
          <div className="info-row">
            <span className="label">Status:</span>
            <span className="value">
              {syncStatus === 'idle' && '✅ All files synced'}
              {syncStatus === 'syncing' && '⏳ Synchronizing...'}
              {syncStatus === 'success' && '✅ Sync completed'}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Last Sync:</span>
            <span className="value">
              {Math.floor((new Date() - lastSync) / 60000)} minutes ago
            </span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Sync Progress: {Math.floor(progress)}%</span>
          </div>
          <div className="progress-bar-outer">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="sync-stats">
          <div className="stat-card">
            <div className="stat-icon">📤</div>
            <div className="stat-content">
              <div className="stat-label">Files Uploaded</div>
              <div className="stat-value">{stats.filesUploaded}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-content">
              <div className="stat-label">Total Size</div>
              <div className="stat-value">{stats.totalSize}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-label">Upload Speed</div>
              <div className="stat-value">{stats.uploadSpeed}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-label">Time Elapsed</div>
              <div className="stat-value">{stats.timeElapsed}</div>
            </div>
          </div>
        </div>

        <div className="sync-actions">
          <button
            className={`sync-btn ${syncStatus === 'syncing' ? 'disabled' : ''}`}
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
          >
            {syncStatus === 'syncing' ? '⏳ Syncing...' : '🔄 Start Sync'}
          </button>
          <button className="cancel-btn">Cancel</button>
        </div>

        <div className="sync-details">
          <div className="details-header">Recent Files (Latest 5)</div>
          <div className="file-list">
            <div className="file-item">
              <span className="file-name">user-data.json</span>
              <span className="file-time">2 mins ago</span>
            </div>
            <div className="file-item">
              <span className="file-name">chat-history.db</span>
              <span className="file-time">5 mins ago</span>
            </div>
            <div className="file-item">
              <span className="file-name">config.yml</span>
              <span className="file-time">15 mins ago</span>
            </div>
            <div className="file-item">
              <span className="file-name">backup-full.tar.gz</span>
              <span className="file-time">1 hour ago</span>
            </div>
            <div className="file-item">
              <span className="file-name">logs-archive.zip</span>
              <span className="file-time">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default S3SyncAgent
