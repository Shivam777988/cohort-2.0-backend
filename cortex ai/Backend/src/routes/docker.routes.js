import express from 'express'
import { exec, spawn } from 'child_process'
import path from 'path'
import { promisify } from 'util'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()
const execAsync = promisify(exec)

const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..', '..')
const DOCKER_COMPOSE_FILE = path.join(WORKSPACE_ROOT, 'docker-compose.yml')

// Get Docker status and running containers
router.get('/status', async (req, res) => {
  try {
    // Check if Docker is running
    await execAsync('docker ps')
    
    // Get running containers
    const { stdout: containersOutput } = await execAsync(
      'docker ps --format "{{json . }}"'
    )
    const containers = containersOutput
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const data = JSON.parse(line)
        return {
          id: data.ID,
          name: data.Names,
          image: data.Image,
          status: data.State,
          ports: data.Ports ? data.Ports.split(', ') : []
        }
      })

    // Get Docker images
    const { stdout: imagesOutput } = await execAsync(
      'docker images --format "{{json . }}"'
    )
    const images = imagesOutput
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const data = JSON.parse(line)
        return {
          id: data.ID,
          repo: data.Repository,
          tag: data.Tag,
          size: data.Size,
          created: data.CreatedAt
        }
      })

    // Extract ports from docker-compose
    const ports = {
      'Backend': 5000,
      'Frontend': 5173,
      'MongoDB': 27017
    }

    res.json({
      status: 'connected',
      containers,
      images,
      ports
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      containers: [],
      images: [],
      ports: {}
    })
  }
})

// Build Docker images
router.post('/build', async (req, res) => {
  try {
    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Transfer-Encoding', 'chunked')

    const buildProcess = spawn('docker', [
      'compose',
      '-f', DOCKER_COMPOSE_FILE,
      'build',
      '--no-cache'
    ], {
      cwd: WORKSPACE_ROOT,
      shell: process.platform === 'win32' ? true : false
    })

    buildProcess.stdout.on('data', (data) => {
      res.write(`${data.toString()}`)
    })

    buildProcess.stderr.on('data', (data) => {
      res.write(`${data.toString()}`)
    })

    buildProcess.on('close', (code) => {
      if (code === 0) {
        res.write('\n✅ Build completed successfully!\n')
      } else {
        res.write(`\n❌ Build failed with code ${code}\n`)
      }
      res.end()
    })

    buildProcess.on('error', (error) => {
      res.write(`\n❌ Build error: ${error.message}\n`)
      res.end()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Run docker-compose
router.post('/compose', async (req, res) => {
  try {
    const { mode = 'up' } = req.body
    const args = [
      'compose',
      '-f', DOCKER_COMPOSE_FILE
    ]

    if (mode === 'up') {
      args.push('up', '-d')
    } else if (mode === 'down') {
      args.push('down')
    } else if (mode === 'logs') {
      args.push('logs', '-f')
    }

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Transfer-Encoding', 'chunked')

    const composeProcess = spawn('docker', args, {
      cwd: WORKSPACE_ROOT,
      shell: process.platform === 'win32' ? true : false
    })

    composeProcess.stdout.on('data', (data) => {
      res.write(`${data.toString()}`)
    })

    composeProcess.stderr.on('data', (data) => {
      res.write(`${data.toString()}`)
    })

    composeProcess.on('close', (code) => {
      if (code === 0) {
        const action = mode === 'up' ? 'started' : 'stopped'
        res.write(`\n✅ Containers ${action} successfully!\n`)
      } else {
        res.write(`\n❌ Command failed with code ${code}\n`)
      }
      res.end()
    })

    composeProcess.on('error', (error) => {
      res.write(`\n❌ Error: ${error.message}\n`)
      res.end()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Start a container
router.post('/container/start', async (req, res) => {
  try {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Container ID required' })

    await execAsync(`docker start ${id}`)
    res.json({ success: true, message: 'Container started' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Stop a container
router.post('/container/stop', async (req, res) => {
  try {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Container ID required' })

    await execAsync(`docker stop ${id}`)
    res.json({ success: true, message: 'Container stopped' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get container logs
router.get('/container/:id/logs', async (req, res) => {
  try {
    const { id } = req.params
    const { stdout } = await execAsync(`docker logs --tail 100 ${id}`)
    res.json({ logs: stdout })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
