import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const workspaceRoot = path.resolve(__dirname, '..', '..')

const IGNORED_ENTRIES = new Set(['node_modules', '.git', '.DS_Store', 'dist', 'build'])

const normalizeRelative = (relativePath = '') => {
  return relativePath
    .toString()
    .replace(/\\/g, '/')
    .replace(/^\/*/, '')
}

const resolvePath = (relativePath = '') => {
  const cleaned = normalizeRelative(relativePath)
  const fullPath = path.resolve(workspaceRoot, cleaned)
  if (!fullPath.startsWith(workspaceRoot)) {
    throw new Error('Invalid path')
  }
  return fullPath
}

const buildTree = (relativePath = '') => {
  const fullPath = resolvePath(relativePath)
  const stats = fs.statSync(fullPath)
  const node = {
    name: path.basename(fullPath),
    path: normalizeRelative(relativePath) || '.',
    type: stats.isDirectory() ? 'folder' : 'file'
  }

  if (stats.isDirectory()) {
    const children = fs.readdirSync(fullPath, { withFileTypes: true })
      .filter((dirent) => !IGNORED_ENTRIES.has(dirent.name))
      .map((dirent) => {
        const childPath = normalizeRelative(path.posix.join(relativePath, dirent.name))
        return buildTree(childPath)
      })
      .sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name)
        }
        return a.type === 'folder' ? -1 : 1
      })

    node.children = children
  }

  return node
}

router.get('/files/tree', (req, res) => {
  try {
    const tree = buildTree(req.query.path || '')
    res.json(tree)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/files/content', (req, res) => {
  try {
    const fullPath = resolvePath(req.query.path || '')
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found' })
    }
    const stats = fs.statSync(fullPath)
    if (!stats.isFile()) {
      return res.status(400).json({ error: 'Path is not a file' })
    }
    const content = fs.readFileSync(fullPath, 'utf8')
    res.json({ path: normalizeRelative(req.query.path || ''), content })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/files/content', (req, res) => {
  try {
    const fullPath = resolvePath(req.query.path || '')
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found' })
    }
    const stats = fs.statSync(fullPath)
    if (!stats.isFile()) {
      return res.status(400).json({ error: 'Path is not a file' })
    }
    if (typeof req.body.content !== 'string') {
      return res.status(400).json({ error: 'Content must be a string' })
    }
    fs.writeFileSync(fullPath, req.body.content, 'utf8')
    res.json({ success: true, path: normalizeRelative(req.query.path || '') })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/files/upload', (req, res) => {
  try {
    const { fileName, content } = req.body
    if (!fileName || typeof fileName !== 'string') {
      return res.status(400).json({ error: 'fileName is required' })
    }
    if (!content) {
      return res.status(400).json({ error: 'File content is required' })
    }

    const filename = path.basename(fileName)
    const uploadDir = path.join(workspaceRoot, 'uploaded-files')
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const fullPath = path.join(uploadDir, filename)
    const buffer = Buffer.from(content, 'base64')
    fs.writeFileSync(fullPath, buffer)

    const relativePath = normalizeRelative(path.relative(workspaceRoot, fullPath))
    res.json({ success: true, path: relativePath, message: `File ${filename} uploaded successfully` })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/terminal/execute', (req, res) => {
  const command = (req.body.command || '').toString().trim()
  if (!command) {
    return res.status(400).json({ error: 'Command is required' })
  }

  const blocked = /\b(rm|rmdir|shutdown|reboot|poweroff|mkfs|dd|:;|sudo|curl|wget|scp|ssh)\b/i
  if (blocked.test(command)) {
    return res.status(400).json({ error: 'This command is blocked for safety' })
  }

  exec(command, {
    cwd: workspaceRoot,
    timeout: 20000,
    maxBuffer: 3 * 1024 * 1024,
    shell: true
  }, (error, stdout, stderr) => {
    const output = `${stdout || ''}${stderr || ''}`.trim()
    if (error && !output) {
      return res.status(400).json({ error: error.message })
    }
    res.json({ output: output || 'Command completed with no output' })
  })
})

export default router
