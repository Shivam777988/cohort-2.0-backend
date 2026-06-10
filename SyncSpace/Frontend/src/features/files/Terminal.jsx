import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './Terminal.css'

const apiBase = import.meta.env.VITE_API_URL || ''

const Terminal = () => {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState([
    '$ Welcome to SyncSpace Terminal',
    '$ Type a command and press Enter',
    ''
  ])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [busy, setBusy] = useState(false)
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const executeCommand = async (cmd) => {
    if (!cmd.trim()) return
    const normalized = cmd.trim()
    setHistory((prev) => [...prev, normalized])
    setHistoryIndex(-1)
    setOutput((prev) => [...prev, `$ ${normalized}`])
    setBusy(true)

    try {
      const response = await axios.post(`${apiBase}/api/dev/terminal/execute`, { command: normalized })
      const newLines = response.data.output.split(/\r?\n/)
      setOutput((prev) => [...prev, ...newLines, ''])
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Command failed'
      setOutput((prev) => [...prev, message, ''])
    } finally {
      setBusy(false)
    }
  }

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      executeCommand(command)
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
          placeholder={busy ? 'Running command...' : 'Enter command...'}
          disabled={busy}
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  )
}

export default Terminal
