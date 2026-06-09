import React, { useState, useRef, useEffect } from 'react'
import './Terminal.css'

const Terminal = () => {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState([
    '$ Welcome to SyncSpace Terminal',
    '$ Type "help" for available commands',
    ''
  ])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef(null)

  const mockCommands = {
    help: [
      'Available commands:',
      '  ls           - List services',
      '  status       - Show service status',
      '  logs [service] - View service logs',
      '  sync         - Trigger S3 sync',
      '  deploy       - Deploy microservices',
      '  health       - Health check',
      '  clear        - Clear terminal',
      ''
    ],
    ls: [
      'gateway-service/        auth-engine/',
      'ai-orchestrator/        data-sync-agent/',
      'file-explorer-service/  notification-service/',
      ''
    ],
    status: [
      '📊 Service Status:',
      '  ✅ Gateway Service        - RUNNING (99.99% uptime)',
      '  ✅ Auth Engine            - RUNNING (99.98% uptime)',
      '  ✅ AI Orchestrator        - RUNNING (99.92% uptime)',
      '  ✅ Data Sync Agent        - RUNNING (99.97% uptime)',
      '  ✅ File Explorer Service  - RUNNING (99.95% uptime)',
      '  ✅ Notification Service   - RUNNING (99.94% uptime)',
      ''
    ],
    'logs auth-engine': [
      '[2026-06-05 10:30:45] Auth service initialized',
      '[2026-06-05 10:30:50] JWT middleware activated',
      '[2026-06-05 10:31:05] User session validated: rajpu@example.com',
      '[2026-06-05 10:31:12] Login successful',
      ''
    ],
    'logs ai-orchestrator': [
      '[2026-06-05 10:30:55] AI Orchestrator started',
      '[2026-06-05 10:31:10] Connected to language model',
      '[2026-06-05 10:31:15] Agents initialized: 4 active',
      '[2026-06-05 10:31:20] Processing user query from rajpu',
      '[2026-06-05 10:31:25] Response generated successfully',
      ''
    ],
    sync: [
      '🔄 Starting S3 Sync...',
      '[████████████░░░░░░░░░░░░░░░] 50%',
      'Syncing 245 files to S3 bucket...',
      '✅ Sync completed! 245 files transferred',
      '📊 Stats: 2.3MB uploaded, 0 errors',
      ''
    ],
    deploy: [
      '🚀 Deploying Microservices...',
      'Building Docker images...',
      '[████████████████████████████] 100%',
      'Pushing to container registry...',
      'Deploying to Kubernetes cluster...',
      '✅ All services deployed successfully!',
      '🌐 Frontend: https://syncspace.app',
      ''
    ],
    health: [
      '❤️  Health Check Results:',
      '  Database Connection: ✅ OK (45ms)',
      '  Cache Layer: ✅ OK (12ms)',
      '  AI Service: ✅ OK (234ms)',
      '  S3 Bucket: ✅ OK (89ms)',
      '  Overall System: ✅ HEALTHY',
      ''
    ],
    clear: []
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = command.trim().toLowerCase()
      setHistory([...history, cmd])
      setHistoryIndex(-1)

      let response = mockCommands[cmd] || ['$ Command not found: ' + command]

      if (cmd === 'clear') {
        setOutput(['$ Welcome to SyncSpace Terminal', '$ Type "help" for available commands', ''])
      } else {
        setOutput([
          ...output,
          `$ ${command}`,
          ...(response || [`$ ${command}: command not found`]),
        ])
      }

      setCommand('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = historyIndex + 1
      if (newIndex < history.length) {
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setCommand('')
      }
    }
  }

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <h3>⌨️ Terminal Emulator</h3>
        <span className="status-indicator">● Connected</span>
      </div>
      <div className="terminal-output" ref={terminalRef}>
        {output.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <span className="prompt">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Enter command..."
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  )
}

export default Terminal
