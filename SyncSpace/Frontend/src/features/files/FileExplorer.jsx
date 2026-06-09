import React, { useState } from 'react'
import './FileExplorer.css'

const FileExplorer = () => {
  const [expandedDirs, setExpandedDirs] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)

  const fileStructure = {
    name: 'SyncSpace',
    type: 'folder',
    children: [
      {
        name: 'Backend',
        type: 'folder',
        children: [
          { name: 'server.js', type: 'file' },
          { name: 'package.json', type: 'file' },
          {
            name: 'src',
            type: 'folder',
            children: [
              { name: 'app.js', type: 'file' },
              {
                name: 'controllers',
                type: 'folder',
                children: [
                  { name: 'auth.controller.js', type: 'file' },
                  { name: 'chat.controller.js', type: 'file' }
                ]
              },
              {
                name: 'services',
                type: 'folder',
                children: [
                  { name: 'ai.service.js', type: 'file' },
                  { name: 'internet.service.js', type: 'file' },
                  { name: 'mail.service.js', type: 'file' }
                ]
              },
              {
                name: 'models',
                type: 'folder',
                children: [
                  { name: 'user.model.js', type: 'file' },
                  { name: 'chat.model.js', type: 'file' },
                  { name: 'message.model.js', type: 'file' }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Frontend',
        type: 'folder',
        children: [
          { name: 'package.json', type: 'file' },
          { name: 'vite.config.js', type: 'file' },
          {
            name: 'src',
            type: 'folder',
            children: [
              { name: 'main.jsx', type: 'file' },
              { name: 'app.store.js', type: 'file' }
            ]
          }
        ]
      },
      {
        name: 'docker-compose.yml',
        type: 'file'
      },
      {
        name: '.env.example',
        type: 'file'
      }
    ]
  }

  const toggleDir = (path) => {
    setExpandedDirs(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const renderTree = (node, path = '') => {
    const currentPath = `${path}/${node.name}`

    if (node.type === 'file') {
      return (
        <div
          key={currentPath}
          className="file-item"
          onClick={() => setSelectedFile(currentPath)}
        >
          <span className="file-icon">📄</span>
          <span className={`file-name ${selectedFile === currentPath ? 'selected' : ''}`}>
            {node.name}
          </span>
        </div>
      )
    }

    const isExpanded = expandedDirs[currentPath]

    return (
      <div key={currentPath} className="folder-item">
        <div
          className="folder-header"
          onClick={() => toggleDir(currentPath)}
        >
          <span className="folder-toggle">{isExpanded ? '📂' : '📁'}</span>
          <span className="folder-name">{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div className="folder-children">
            {node.children.map(child => renderTree(child, currentPath))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="file-explorer-container">
      <div className="explorer-header">
        <h3>📁 File Explorer</h3>
        <span className="badge">Microservices</span>
      </div>
      <div className="file-tree">
        {renderTree(fileStructure)}
      </div>
      {selectedFile && (
        <div className="file-preview">
          <div className="preview-header">
            <strong>📄 {selectedFile.split('/').pop()}</strong>
          </div>
          <div className="preview-content">
            {selectedFile.endsWith('.js') && (
              <pre>// File: {selectedFile}\n// View in editor for full content</pre>
            )}
            {selectedFile.endsWith('.json') && (
              <pre>{JSON.stringify({ example: 'JSON content' }, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileExplorer
