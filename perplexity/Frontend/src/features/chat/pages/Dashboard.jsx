import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { setCurrentChatId } from '../chat.slice'
import { useNavigate } from 'react-router'
import { logout } from '../../auth/auth.slice'
import remarkgfm from 'remark-gfm'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ chatInput, setChatInput ] = useState('')
  const [ selectedImage, setSelectedImage ] = useState(null)
  const [ imagePreview, setImagePreview ] = useState(null)
  const [ showUserMenu, setShowUserMenu ] = useState(false)
  const fileInputRef = React.useRef(null)
  const userMenuRef = React.useRef(null)
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const user = useSelector((state) => state.auth.user)
  const messagesEndRef = React.useRef(null)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats[currentChatId]?.messages])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage && !selectedImage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId, image: imagePreview })
    setChatInput('')
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId,chats)
  }

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null))
    setChatInput('')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth/login')
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
      <section className='mx-auto flex h-screen w-full'>
        {/* Sidebar - Hidden on mobile when no messages */}
        <aside className={`${chats[currentChatId]?.messages.length > 0 ? 'flex' : 'hidden md:flex'} h-full w-64 shrink-0 flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950 p-4`}>
          {/* Logo */}
          <div className='mb-8 flex items-center gap-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-black border-2 border-yellow-400'>
              <svg className='h-6 w-6 text-yellow-400' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z'/>
              </svg>
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-white'>Cortex AI</h1>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className='mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/40 px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 active:scale-95'
          >
            <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            New Chat
          </button>

          {/* Chat History Header */}
          <div className='mb-3'>
            <p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>Chat History</p>
          </div>

          {/* Chat List */}
          <div className='space-y-2 overflow-y-auto flex-1'>
            {Object.values(chats).map((chatItem, index) => (
              <button
                onClick={() => { openChat(chatItem.id) }}
                key={index}
                className={`group relative w-full rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 ${
                  currentChatId === chatItem.id
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <p className='truncate font-medium'>{chatItem.title || 'New Chat'}</p>
                <p className='truncate text-xs opacity-70 mt-0.5'>{chatItem.title?.substring(0, 40)}...</p>
              </button>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className='mt-auto border-t border-slate-800/50 pt-4'>
            <button className='group relative w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-400 transition-all duration-150 hover:text-white hover:bg-slate-800/40 flex items-center gap-2'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              Settings
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className='relative flex h-full min-w-0 flex-1 flex-col justify-between'>
          {/* Header with User Profile */}
          <div className='border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-slate-800/30 px-6 py-4 flex items-center justify-between'>
            <div></div>
            {/* User Profile Icon */}
            <div className='relative' ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className='flex items-center gap-3 rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors px-4 py-2 border border-slate-700/50'
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500'>
                  <span className='text-sm font-bold text-white'>{user?.email?.[0]?.toUpperCase() || 'U'}</span>
                </div>
                <span className='text-sm font-medium text-slate-200 hidden sm:block'>{user?.email}</span>
                <svg className={`h-4 w-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className='absolute right-0 mt-2 w-48 rounded-lg border border-slate-700/50 bg-slate-900 shadow-lg z-50'>
                  <div className='px-4 py-3 border-b border-slate-700/50'>
                    <p className='text-sm font-medium text-white'>{user?.email}</p>
                    <p className='text-xs text-slate-400 mt-1'>Signed in</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-slate-800 transition-colors flex items-center gap-2'
                  >
                    <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Messages Container - Centered */}
          <div className='messages flex-1 space-y-4 overflow-y-auto pb-4 pt-4'>
            {chats[currentChatId]?.messages?.length === 0 ? (
              // Empty State - Centered
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='text-center max-w-2xl px-4'>
                  <div className='mb-6 flex justify-center'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-black border-2 border-yellow-400'>
                      <svg className='h-10 w-10 text-yellow-400' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z'/>
                      </svg>
                    </div>
                  </div>
                  <h2 className='text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Welcome to Cortex AI</h2>
                  <p className='text-slate-400 text-lg mb-8'>Ask me anything and I'll search the internet to find you the latest information.</p>
                  
                  {/* Suggested Prompts */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-8'>
                    <button className='p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 text-left group'>
                      <p className='text-slate-200 font-medium group-hover:text-white transition-colors'>🇮🇳 Latest news in India</p>
                      <p className='text-slate-500 text-sm mt-1'>Get current updates</p>
                    </button>
                    <button className='p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 text-left group'>
                      <p className='text-slate-200 font-medium group-hover:text-white transition-colors'>📊 Stock market trends</p>
                      <p className='text-slate-500 text-sm mt-1'>Market analysis</p>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Messages List - Centered at 2/3 width
              <div className='flex justify-center w-full px-4'>
                <div className='w-full max-w-4xl space-y-4'>
                  {chats[currentChatId]?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm md:text-base max-w-xl ${message.role === 'user'
                          ? 'rounded-br-none bg-white/12 text-white'
                          : 'rounded-bl-none bg-slate-800/40 text-white/90'
                        }`}
                      >
                        {message.image && (
                          <img 
                            src={message.image} 
                            alt='User uploaded' 
                            className='mb-2 max-w-sm rounded-lg'
                          />
                        )}
                        {message.role === 'user' ? (
                          <p>{message.content}</p>
                        ) : (
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                              ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                              ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                              code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                              pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area - Full Width */}
          <div className='border-t border-slate-800/50 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 py-8 backdrop-blur-sm flex justify-center w-full'>
            <form onSubmit={handleSubmitMessage} className='w-full max-w-4xl'>
              {/* Image Preview */}
              {imagePreview && (
                <div className='mb-4 relative'>
                  <div className='relative inline-block'>
                    <img 
                      src={imagePreview} 
                      alt='Preview' 
                      className='max-w-xs rounded-lg'
                    />
                    <button
                      type='button'
                      onClick={removeImage}
                      className='absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors'
                    >
                      <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Input and buttons */}
              <div className='flex gap-3'>
                {/* Image upload button */}
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='rounded-full bg-slate-800/50 border border-slate-700/50 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 flex items-center gap-2'
                  title='Upload image'
                >
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                  </svg>
                </button>

                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleImageSelect}
                  className='hidden'
                />

                {/* Text input */}
                <div className='flex-1 relative'>
                  <input
                    type='text'
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder='Ask me anything...'
                    className='w-full rounded-full border border-slate-700/50 bg-slate-800/50 px-6 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-slate-800/80 hover:border-slate-600/50 focus:ring-2 focus:ring-blue-500/20'
                  />
                </div>

                {/* Send button */}
                <button
                  type='submit'
                  disabled={!chatInput.trim() && !selectedImage}
                  className='rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none flex items-center gap-2'
                >
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                  </svg>
                </button>
              </div>
              <p className='mt-3 text-center text-xs text-slate-500'>Powered by the internet and AI • Explain images by uploading them</p>
            </form>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Dashboard