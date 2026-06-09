import React, { useState, useEffect } from 'react'
import './ServiceDashboard.css'

const ServiceDashboard = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Gateway Service',
      status: 'online',
      uptime: '99.99%',
      cpu: 24,
      memory: 345,
      requests: '12.5K/min',
      latency: '45ms',
      errors: 0,
      region: 'us-east-1'
    },
    {
      id: 2,
      name: 'Auth Engine',
      status: 'online',
      uptime: '99.98%',
      cpu: 18,
      memory: 256,
      requests: '8.2K/min',
      latency: '32ms',
      errors: 0,
      region: 'us-east-1'
    },
    {
      id: 3,
      name: 'AI Orchestrator',
      status: 'online',
      uptime: '99.92%',
      cpu: 67,
      memory: 812,
      requests: '2.1K/min',
      latency: '234ms',
      errors: 2,
      region: 'us-west-2'
    },
    {
      id: 4,
      name: 'Data Sync Agent',
      status: 'online',
      uptime: '99.97%',
      cpu: 42,
      memory: 567,
      requests: '5.3K/min',
      latency: '78ms',
      errors: 0,
      region: 'us-east-1'
    },
    {
      id: 5,
      name: 'File Explorer Service',
      status: 'online',
      uptime: '99.95%',
      cpu: 19,
      memory: 234,
      requests: '3.4K/min',
      latency: '56ms',
      errors: 0,
      region: 'us-west-2'
    },
    {
      id: 6,
      name: 'Notification Service',
      status: 'online',
      uptime: '99.94%',
      cpu: 11,
      memory: 187,
      requests: '1.8K/min',
      latency: '89ms',
      errors: 0,
      region: 'eu-west-1'
    }
  ])

  const totalServices = services.length
  const onlineServices = services.filter(s => s.status === 'online').length
  const avgUptime = (services.reduce((sum, s) => sum + parseFloat(s.uptime), 0) / services.length).toFixed(2)
  const totalErrors = services.reduce((sum, s) => sum + s.errors, 0)

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#10b981'
      case 'offline': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getMemoryColor = (memory) => {
    if (memory < 300) return '#10b981'
    if (memory < 600) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="service-dashboard-container">
      <div className="dashboard-header">
        <h3>🖥️ Service Dashboard</h3>
        <span className="last-updated">Last updated: 2 seconds ago</span>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <div className="summary-label">Total Services</div>
            <div className="summary-value">{totalServices}</div>
          </div>
        </div>
        <div className="summary-card success">
          <div className="summary-icon">✅</div>
          <div className="summary-content">
            <div className="summary-label">Online</div>
            <div className="summary-value">{onlineServices}</div>
          </div>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon">⚠️</div>
          <div className="summary-content">
            <div className="summary-label">Avg Uptime</div>
            <div className="summary-value">{avgUptime}%</div>
          </div>
        </div>
        <div className="summary-card error">
          <div className="summary-icon">❌</div>
          <div className="summary-content">
            <div className="summary-label">Total Errors</div>
            <div className="summary-value">{totalErrors}</div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="services-table-wrapper">
        <table className="services-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Status</th>
              <th>Uptime</th>
              <th>CPU</th>
              <th>Memory (MB)</th>
              <th>Requests</th>
              <th>Latency</th>
              <th>Errors</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td className="service-name">{service.name}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(service.status) }}
                  >
                    {service.status === 'online' ? '🟢' : '🔴'} {service.status.toUpperCase()}
                  </span>
                </td>
                <td className="uptime">{service.uptime}</td>
                <td>
                  <div className="metric-bar">
                    <div
                      className="metric-fill"
                      style={{
                        width: `${service.cpu}%`,
                        backgroundColor: service.cpu > 50 ? '#f59e0b' : '#10b981'
                      }}
                    />
                    <span className="metric-text">{service.cpu}%</span>
                  </div>
                </td>
                <td>
                  <div className="metric-bar">
                    <div
                      className="metric-fill"
                      style={{
                        width: `${(service.memory / 1024) * 100}%`,
                        backgroundColor: getMemoryColor(service.memory)
                      }}
                    />
                    <span className="metric-text">{service.memory}</span>
                  </div>
                </td>
                <td className="requests">{service.requests}</td>
                <td className="latency">
                  {service.latency > 200 ? '🟠' : '🟢'} {service.latency}
                </td>
                <td className="errors">
                  <span className={service.errors > 0 ? 'error' : 'ok'}>
                    {service.errors}
                  </span>
                </td>
                <td className="region">{service.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn">🔄 Refresh</button>
        <button className="action-btn">📊 View Logs</button>
        <button className="action-btn">⚙️ Configure</button>
        <button className="action-btn">📈 Metrics</button>
      </div>
    </div>
  )
}

export default ServiceDashboard
