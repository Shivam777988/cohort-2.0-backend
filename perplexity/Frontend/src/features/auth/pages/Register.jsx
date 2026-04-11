import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { register } from '../service/auth.api'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitForm = async (event) => {
    event.preventDefault()

    try {
      const data = await register({
        username,
        email,
        password,
      })

      console.log("Registered:", data)
      alert("Success!")
      navigate("/login")
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message)
    }
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-black px-4 py-10 text-white sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
        {/* Left side - Branding */}
        <div className="hidden max-w-md flex-col lg:flex">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-black border-2 border-yellow-400 mb-6">
            <svg className='h-8 w-8 text-yellow-400' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z'/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Cortex AI</h2>
          <p className="text-slate-300 text-lg mb-8">Join thousands of users exploring AI conversations</p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-600/30">
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-white">Instant Access</p>
                <p className="text-sm text-slate-300">Start chatting immediately</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-600/30">
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-white">100% Secure</p>
                <p className="text-sm text-slate-300">Enterprise-grade security</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-600/30">
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-white">Free Trial</p>
                <p className="text-sm text-slate-300">No credit card required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="w-full max-w-md rounded-2xl border border-yellow-600/30 bg-black/50 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-black border-2 border-yellow-400 lg:hidden">
            <svg className='h-6 w-6 text-yellow-400' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z'/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-slate-300">Join Cortex AI today</p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                required
                className="w-full rounded-lg border border-yellow-600/30 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-yellow-600/30 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full rounded-lg border border-yellow-600/30 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-3 font-semibold text-black transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/20 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-500/30"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-yellow-600/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black/50 px-2 text-slate-300">Already a member?</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-400 transition hover:text-blue-300">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register


