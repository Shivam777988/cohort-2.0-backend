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

  const panelItems = [
    { id: 'dashboard', label: 'Service Dashboard', icon: '📊' },
    { id: 'files', label: 'File Explorer', icon: '📁' },
    { id: 'terminal', label: 'Terminal', icon: '⌨️' },
    { id: 's3', label: 'S3 Sync Agent', icon: '☁️' }
  ]

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
    <main className='min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-black text-white'>
      <section className='mx-auto flex h-screen w-full'>
        {/* Sidebar */}
        <aside className='h-full w-72 shrink-0 flex-col border-r border-yellow-600/30 bg-gradient-to-b from-black to-slate-900 p-4 flex'>
          {/* Logo */}
          <div className='mb-8 flex items-center gap-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-black border-2 border-yellow-400'>
              <svg className='h-6 w-6 text-yellow-400' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z'/>
              </svg>
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-white'>SyncSpace</h1>
          </div>

          {/* Infrastructure Menu Header */}
          <div className='mb-4'>
            <p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>Infrastructure</p>
          </div>

          {/* Navigation Items */}
          <div className='space-y-2 flex-1 overflow-y-auto'>
            {panelItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={`group relative w-full rounded-lg px-4 py-3 text-left text-sm transition-all duration-150 flex items-center gap-3 ${
                  activePanel === item.id
                    ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-black/40'
                }`}
              >
                <span className='text-lg'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className='mt-auto border-t border-yellow-600/30 pt-4'>
            <button
              onClick={() => navigate('/dashboard')}
              className='group relative w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition-all duration-150 hover:text-yellow-400 hover:bg-black/40 flex items-center gap-2'
            >
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19l-7-7 7-7m8 14l7-7-7-7m-6-2h1' />
              </svg>
              Back to Chat
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className='relative flex h-full min-w-0 flex-1 flex-col'>
          {/* Header */}
          <div className='border-b border-yellow-600/30 bg-gradient-to-r from-black to-slate-900/50 px-8 py-6 flex items-center justify-between'>
            <div>
              <h2 className='text-3xl font-bold text-white'>🚀 Infrastructure Control</h2>
              <p className='text-sm text-slate-400 mt-1'>Manage services, files, and deployment</p>
            </div>
          </div>

          {/* Content Area */}
          <div className='flex-1 overflow-y-auto px-8 py-6'>
            {renderPanel()}
          </div>

          {/* Footer Stats */}
          <div className='border-t border-yellow-600/30 bg-gradient-to-r from-black to-slate-900/50 px-8 py-4'>
            <div className='grid grid-cols-4 gap-4'>
              <div className='flex flex-col'>
                <span className='text-xs uppercase text-slate-500 font-semibold'>Environment</span>
                <span className='text-sm font-bold text-white mt-1'>Production</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-xs uppercase text-slate-500 font-semibold'>Cluster Status</span>
                <span className='text-sm font-bold text-emerald-400 mt-1'>🟢 Healthy</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-xs uppercase text-slate-500 font-semibold'>Active Agents</span>
                <span className='text-sm font-bold text-yellow-400 mt-1'>6/6 Online</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-xs uppercase text-slate-500 font-semibold'>Uptime</span>
                <span className='text-sm font-bold text-yellow-400 mt-1'>99.96%</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Microservices
