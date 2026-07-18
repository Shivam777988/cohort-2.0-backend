import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './DeploymentManager.css'

const apiBase = import.meta.env.VITE_API_URL || ''

const DeploymentManager = () => {
  const [dockerStatus, setDockerStatus] = useState('checking')
  const [containers, setContainers] = useState([])
  const [images, setImages] = useState([])
  const [isBuilding, setIsBuilding] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const [buildLogs, setBuildLogs] = useState([])
  const [composeLogs, setComposeLogs] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [ports, setPorts] = useState({})
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Check Docker status and load containers
  useEffect(() => {
    checkDockerStatus()
    const interval = setInterval(checkDockerStatus, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const checkDockerStatus = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiBase}/api/docker/status`)
      setDockerStatus(response.data.status)
      setContainers(response.data.containers || [])
      setImages(response.data.images || [])
      setPorts(response.data.ports || {})
      setErrorMessage('')
    } catch (error) {
      setDockerStatus('error')
      
      // Detailed error messages
      if (error.response?.status === 404) {
        setErrorMessage('Backend server not running on port 3000. Start with: npm start in Backend directory')
      } else if (error.code === 'ECONNREFUSED') {
        setErrorMessage('Cannot connect to backend. Ensure backend is running on port 3000')
      } else if (error.message === 'Network Error') {
        setErrorMessage('Network error. Make sure backend server is running')
      } else {
        setErrorMessage('Docker Desktop not running or unable to connect. Also check that backend server is running.')
      }
      
      setContainers([])
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const buildImages = async () => {
    setIsBuilding(true)
    setBuildLogs([])
    try {
      const response = await fetch(`${apiBase}/api/docker/build`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || ''
        
        setBuildLogs(prev => [...prev, ...lines.filter(l => l.trim())])
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        setBuildLogs(prev => [...prev, buffer])
      }

      setStatusMessage('✅ Images built successfully!')
      setTimeout(() => checkDockerStatus(), 2000)
    } catch (error) {
      setErrorMessage('Failed to build images: ' + error.message)
    } finally {
      setIsBuilding(false)
    }
  }

  const runDockerCompose = async (mode = 'up') => {
    setIsComposing(true)
    setComposeLogs([])
    try {
      const response = await fetch(`${apiBase}/api/docker/compose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mode })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || ''
        
        setComposeLogs(prev => [...prev, ...lines.filter(l => l.trim())])
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        setComposeLogs(prev => [...prev, buffer])
      }

      setStatusMessage(`✅ Docker compose ${mode} completed!`)
      setTimeout(() => checkDockerStatus(), 2000)
    } catch (error) {
      setErrorMessage(`Failed to run docker compose: ${error.message}`)
    } finally {
      setIsComposing(false)
    }
  }

  const startContainer = async (containerId) => {
    try {
      await axios.post(`${apiBase}/api/docker/container/start`, { id: containerId })
      setStatusMessage('✅ Container started')
      setTimeout(() => checkDockerStatus(), 1000)
    } catch (error) {
      setErrorMessage('Failed to start container')
    }
  }

  const stopContainer = async (containerId) => {
    try {
      await axios.post(`${apiBase}/api/docker/container/stop`, { id: containerId })
      setStatusMessage('✅ Container stopped')
      setTimeout(() => checkDockerStatus(), 1000)
    } catch (error) {
      setErrorMessage('Failed to stop container')
    }
  }

  const getStatusColor = (status) => {
    if (status === 'running') return '#10b981'
    if (status === 'exited') return '#6b7280'
    return '#f59e0b'
  }

  const getDockerStatusDisplay = () => {
    if (dockerStatus === 'checking') return { text: '🔄 Checking...', color: '#f59e0b' }
    if (dockerStatus === 'connected') return { text: '✅ Connected', color: '#10b981' }
    if (dockerStatus === 'error') return { text: '❌ Not Connected', color: '#ef4444' }
    return { text: '❓ Unknown', color: '#6b7280' }
  }

  const statusDisplay = getDockerStatusDisplay()

  return (
    <div className="deployment-manager">
      {/* Header */}
      <div className="deployment-header">
        <h2>🐳 Docker Deployment Manager</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: statusDisplay.color }}>
            {statusDisplay.text}
          </span>
          <button 
            onClick={checkDockerStatus}
            className="refresh-btn"
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {statusMessage && (
        <div className="status-message success">
          {statusMessage}
          <button onClick={() => setStatusMessage('')}>×</button>
        </div>
      )}
      {errorMessage && (
        <div className="status-message error">
          {errorMessage}
          <button onClick={() => setErrorMessage('')}>×</button>
        </div>
      )}

      {/* Main Content */}
      <div className="deployment-content">
        {dockerStatus !== 'connected' ? (
          <div className="docker-offline">
            <h3>⚠️ Connection Required</h3>
            {errorMessage && (
              <div className="error-box">
                <p className="error-title">Error:</p>
                <p>{errorMessage}</p>
              </div>
            )}
            <div className="setup-instructions">
              <h4>Setup Instructions:</h4>
              <ol>
                <li>
                  <strong>Start Backend Server</strong>
                  <pre>cd Backend && npm start</pre>
                  <small>This will run on port 3000</small>
                </li>
                <li>
                  <strong>Verify Backend is Running</strong>
                  <p>Backend should log: "Server running on port 3000"</p>
                </li>
                <li>
                  <strong>Check Docker Desktop</strong>
                  <p>Ensure Docker Desktop is running</p>
                </li>
                <li>
                  <strong>Refresh Status</strong>
                  <button onClick={checkDockerStatus} className="retry-btn">
                    🔄 Refresh Status
                  </button>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            {/* Build & Compose Section */}
            <div className="deployment-section">
              <h3>🔨 Build & Deploy</h3>
              <div className="deployment-actions">
                <button 
                  onClick={buildImages}
                  disabled={isBuilding || isComposing}
                  className="action-btn build-btn"
                >
                  {isBuilding ? '🔨 Building...' : '🔨 Build Images'}
                </button>
                <button 
                  onClick={() => runDockerCompose('up')}
                  disabled={isComposing || isBuilding}
                  className="action-btn up-btn"
                >
                  {isComposing ? '⬆️ Composing...' : '⬆️ Run (docker-compose up)'}
                </button>
                <button 
                  onClick={() => runDockerCompose('down')}
                  disabled={isComposing || isBuilding}
                  className="action-btn down-btn"
                >
                  ⬇️ Stop (docker-compose down)
                </button>
              </div>

              {/* Build Logs */}
              {buildLogs.length > 0 && (
                <div className="logs-section">
                  <h4>Build Logs</h4>
                  <div className="logs-output">
                    {buildLogs.map((log, i) => (
                      <div key={i} className="log-line">{log}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compose Logs */}
              {composeLogs.length > 0 && (
                <div className="logs-section">
                  <h4>Compose Logs</h4>
                  <div className="logs-output">
                    {composeLogs.map((log, i) => (
                      <div key={i} className="log-line">{log}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Running Containers */}
            <div className="deployment-section">
              <h3>🏃 Running Containers</h3>
              {containers.length === 0 ? (
                <p className="no-data">No containers running</p>
              ) : (
                <div className="containers-grid">
                  {containers.map((container) => (
                    <div key={container.id} className="container-card">
                      <div className="container-header">
                        <h4>{container.name}</h4>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(container.status) }}
                        >
                          {container.status}
                        </span>
                      </div>
                      <div className="container-info">
                        <div><strong>Image:</strong> {container.image}</div>
                        <div><strong>ID:</strong> {container.id.substring(0, 12)}</div>
                        {container.ports && container.ports.length > 0 && (
                          <div><strong>Ports:</strong> {container.ports.join(', ')}</div>
                        )}
                      </div>
                      <div className="container-actions">
                        {container.status === 'running' ? (
                          <button 
                            onClick={() => stopContainer(container.id)}
                            className="action-btn stop-btn"
                          >
                            ⏹️ Stop
                          </button>
                        ) : (
                          <button 
                            onClick={() => startContainer(container.id)}
                            className="action-btn start-btn"
                          >
                            ▶️ Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Images */}
            <div className="deployment-section">
              <h3>📦 Docker Images</h3>
              {images.length === 0 ? (
                <p className="no-data">No images found</p>
              ) : (
                <div className="images-list">
                  {images.map((image) => (
                    <div key={image.id} className="image-item">
                      <div className="image-name">{image.repo}:{image.tag}</div>
                      <div className="image-meta">
                        <span>Size: {image.size}</span>
                        <span>Created: {image.created}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ports Configuration */}
            <div className="deployment-section">
              <h3>🔌 Service Ports</h3>
              <div className="ports-grid">
                {Object.keys(ports).length === 0 ? (
                  <p className="no-data">No ports configured</p>
                ) : (
                  Object.entries(ports).map(([service, port]) => (
                    <div key={service} className="port-card">
                      <div className="port-service">{service}</div>
                      <div className="port-number">:{port}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DeploymentManager
