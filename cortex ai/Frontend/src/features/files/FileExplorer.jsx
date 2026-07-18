import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FileExplorer.css'

const apiBase = import.meta.env.VITE_API_URL || ''

const FileExplorer = () => {
  const [tree, setTree] = useState(null)
  const [expandedDirs, setExpandedDirs] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = React.useRef(null)

  useEffect(() => {
    loadTree()
  }, [])

  const loadTree = async () => {
    try {
      const response = await axios.get(`${apiBase}/api/dev/files/tree`)
      setTree(response.data)
      setErrorMessage('')
      setStatusMessage('File tree loaded')
    } catch (error) {
      setErrorMessage('Unable to load file tree.')
      setTree(null)
    }
  }

  const loadFile = async (filePath) => {
    try {
      const response = await axios.get(`${apiBase}/api/dev/files/content`, {
        params: { path: filePath === '.' ? '' : filePath }
      })
      setSelectedFile(response.data.path)
      setFileContent(response.data.content)
      setStatusMessage(`Loaded ${response.data.path}`)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Unable to load file content.')
    }
  }

  const saveFile = async () => {
    if (!selectedFile) return
    setSaving(true)
    try {
      await axios.post(`${apiBase}/api/dev/files/content`, { content: fileContent }, {
        params: { path: selectedFile }
      })
      setStatusMessage(`Saved ${selectedFile}`)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Unable to save file.')
    } finally {
      setSaving(false)
    }
  }

  const handleFileImport = async (event) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setUploading(true)
    setStatusMessage(`Uploading ${file.name}...`)

    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const content = e.target.result
          const base64Content = btoa(content)
          
          const response = await axios.post(`${apiBase}/api/dev/files/upload`, {
            fileName: file.name,
            content: base64Content
          })

          setStatusMessage(`✓ ${response.data.message}`)
          setErrorMessage('')
          
          await loadTree()
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        } catch (error) {
          setErrorMessage(`Upload failed: ${error.response?.data?.error || error.message}`)
        } finally {
          setUploading(false)
        }
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      setErrorMessage('Failed to read file.')
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const toggleDir = (path) => {
    setExpandedDirs((prev) => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const renderTree = (node) => {
    if (!node) return null

    if (node.type === 'file') {
      return (
        <div
          key={node.path}
          className={`file-item ${selectedFile === node.path ? 'selected' : ''}`}
          onClick={() => loadFile(node.path)}
        >
          <span className="file-icon">📄</span>
          <span className="file-name">{node.name}</span>
        </div>
      )
    }

    const isExpanded = expandedDirs[node.path]

    return (
      <div key={node.path} className="folder-item">
        <div className="folder-header" onClick={() => toggleDir(node.path)}>
          <span className="folder-toggle">{isExpanded ? '📂' : '📁'}</span>
          <span className="folder-name">{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div className="folder-children">
            {node.children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="file-explorer-container">
      <div className="explorer-header">
        <h3>📁 File Explorer</h3>
        <span className="badge">Cortex AI File Manager</span>
        <button
          className="add-file-button"
          onClick={triggerFileInput}
          disabled={uploading}
          title="Import a file from your system"
        >
          {uploading ? '📤 Importing...' : '➕ Add File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileImport}
          style={{ display: 'none' }}
          accept="*/*"
        />
      </div>

      <div className="file-explorer-grid">
        <div className="file-tree-panel">
          <div className="panel-title">Workspace Files</div>
          <div className="file-tree">
            {tree ? renderTree(tree) : <div className="empty-state">Loading file tree…</div>}
          </div>
        </div>

        <div className="file-editor-panel">
          <div className="panel-title">Editor</div>
          {selectedFile ? (
            <>
              <div className="editor-header">
                <div className="editor-path">{selectedFile}</div>
                <button
                  className="save-button"
                  onClick={saveFile}
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save file'}
                </button>
              </div>
              <textarea
                className="code-editor"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                spellCheck="false"
              />
            </>
          ) : (
            <div className="empty-state">Select a file from the tree to view and edit its contents.</div>
          )}
          <div className="file-status">
            {statusMessage && <span className="status-message">{statusMessage}</span>}
            {errorMessage && <span className="error-message">{errorMessage}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileExplorer
