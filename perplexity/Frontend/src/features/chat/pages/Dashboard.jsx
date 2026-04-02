import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkgfm from 'remark-gfm'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
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
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId,chats)
  }

  const handleNewChat = () => {
    chat.handleCreateNewChat?.()
  }

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
      <section className='mx-auto flex h-screen w-full max-w-8xl'>
        {/* Sidebar */}
        <aside className='hidden h-full w-64 shrink-0 flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950 p-4 md:flex'>
          {/* Logo */}
          <div className='mb-8 flex items-center gap-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500'>
              <span className='text-sm font-bold text-white'>P</span>
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-white'>Perplexity</h1>
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

        <section className='relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4'>

          <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30'>
            {chats[ currentChatId ]?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${message.role === 'user'
                    ? 'ml-auto rounded-br-none bg-white/12 text-white'
                    : 'mr-auto border border-white/25 bg-[#0f1626] text-white/90'
                  }`}
              >
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
            ))}
          </div>

          {/* Input Area */}
          <div className='border-t border-slate-800/50 bg-gradient-to-t from-slate-950 to-slate-900/50 px-6 py-6 backdrop-blur-sm'>
            <form onSubmit={handleSubmitMessage} className='mx-auto max-w-2xl'>
              <div className='flex gap-3'>
                <div className='flex-1 relative'>
                  <input
                    type='text'
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder='Ask me anything...'
                    className='w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-slate-800/80 hover:border-slate-600/50'
                  />
                </div>
                <button
                  type='submit'
                  disabled={!chatInput.trim()}
                  className='rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none flex items-center gap-2'
                >
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                  </svg>
                  Send
                </button>
              </div>
              <p className='mt-2 text-center text-xs text-slate-500'>Press Enter to send</p>
            </form>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Dashboard