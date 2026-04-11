import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'

const Landing = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
            {/* Batman-themed background animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Flying Bats */}
                <div className="bat bat-1">🦇</div>
                <div className="bat bat-2">🦇</div>
                <div className="bat bat-3">🦇</div>
                <div className="bat bat-4">🦇</div>
                <div className="bat bat-5">🦇</div>

                {/* Batman Symbol */}
                <div className="batman-symbol">🦇</div>

                {/* Gotham Skyline Silhouette */}
                <div className="gotham-skyline">
                    <div className="building building-1"></div>
                    <div className="building building-2"></div>
                    <div className="building building-3"></div>
                    <div className="building building-4"></div>
                    <div className="building building-5"></div>
                    <div className="building building-6"></div>
                </div>

                {/* Floating Particles */}
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 flex justify-between items-center p-6">
                <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black border-2 border-yellow-400">
                        <svg className='h-6 w-6 text-yellow-400' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z'/>
                        </svg>
                    </div>
                    <span className="text-xl font-bold">Cortex AI</span>
                </div>
                <nav className="space-x-6">
                    <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
                    <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
                    <a href="#info" className="hover:text-yellow-400 transition-colors">Info</a>
                    <a href="#plans" className="hover:text-yellow-400 transition-colors">Plans</a>
                    {user ? (
                        <Link to="/dashboard" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition-colors">Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-yellow-400 transition-colors">Login</Link>
                            <Link to="/register" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition-colors">Sign Up</Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Hero Section */}
            <section 
              id="home" 
              className="relative text-center py-40 min-h-screen flex flex-col items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url('https://wallpapercave.com/wp/wp7253110.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70"></div>
              
              {/* Batman silhouette accent */}
              <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
                <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-yellow-400">
                  <path d="M100 20 L130 40 L150 30 L160 60 L180 50 L170 80 L190 90 L160 100 L180 120 L150 110 L140 140 L100 120 L60 140 L50 110 L20 120 L40 90 L10 80 L30 50 L50 60 L70 30 L90 40 Z" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                  Welcome to Cortex AI
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 mb-8 drop-shadow-lg max-w-2xl mx-auto">
                  Your AI-powered conversation companion - Dark, Powerful, and Always Ready
                </p>
                {!user && (
                  <Link 
                    to="/register" 
                    className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-yellow-400/50"
                  >
                    Get Started Now
                  </Link>
                )}
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10 py-20 bg-black/70 border-t-2 border-yellow-600/30">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6 text-yellow-400">About Cortex AI</h2>
                    <p className="text-lg text-slate-300 mb-8">
                        Cortex AI is an advanced AI conversation platform that helps you explore ideas, get answers, and engage in meaningful discussions with cutting-edge artificial intelligence.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-black/40 rounded-lg border border-yellow-600/30 hover:border-yellow-400/50 transition-colors">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Lightning Fast</h3>
                            <p className="text-slate-300">Get instant AI responses to your questions</p>
                        </div>
                        <div className="p-6 bg-black/40 rounded-lg border border-yellow-600/30 hover:border-yellow-400/50 transition-colors">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Secure & Private</h3>
                            <p className="text-slate-300">Your conversations are protected and private</p>
                        </div>
                        <div className="p-6 bg-black/40 rounded-lg border border-yellow-600/30 hover:border-yellow-400/50 transition-colors">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Always Learning</h3>
                            <p className="text-slate-300">Continuously improving conversations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section id="info" className="relative z-10 py-20">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6 text-yellow-400">How It Works</h2>
                    <p className="text-lg text-slate-300 mb-12">
                        Experience the power of AI conversations in three simple steps
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-yellow-400">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Sign Up</h3>
                            <p className="text-slate-300">Create your account and get started instantly</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-yellow-400">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Start Chatting</h3>
                            <p className="text-slate-300">Ask questions and explore ideas with AI</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-yellow-400">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Learn & Grow</h3>
                            <p className="text-slate-300">Discover new perspectives and insights</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="plans" className="relative z-10 py-20 bg-black/70 border-t-2 border-yellow-600/30">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6 text-yellow-400">Choose Your Plan</h2>
                    <p className="text-lg text-slate-300 mb-12">
                        Select the perfect plan for your AI conversation needs
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-black/50 p-8 rounded-lg border border-yellow-600/30 hover:border-yellow-400/50 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 text-white">Free</h3>
                            <p className="text-3xl font-bold mb-6">$0<span className="text-lg text-slate-400">/month</span></p>
                            <ul className="text-left space-y-2 mb-8">
                                <li>✓ Basic AI conversations</li>
                                <li>✓ 100 messages per day</li>
                                <li>✓ Standard response time</li>
                                <li>✓ Community support</li>
                            </ul>
                            <button className="w-full bg-yellow-600/30 text-yellow-400 py-3 rounded hover:bg-yellow-600/50 transition-colors font-bold border border-yellow-600/50">Get Started</button>
                        </div>
                        <div className="bg-yellow-400/5 p-8 rounded-lg border-2 border-yellow-400 relative shadow-lg shadow-yellow-400/20">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                                Popular
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Pro</h3>
                            <p className="text-3xl font-bold mb-6">$9.99<span className="text-lg text-slate-400">/month</span></p>
                            <ul className="text-left space-y-2 mb-8">
                                <li>✓ Unlimited conversations</li>
                                <li>✓ Priority response time</li>
                                <li>✓ Advanced AI features</li>
                                <li>✓ Email support</li>
                                <li>✓ Custom integrations</li>
                            </ul>
                            <button className="w-full bg-yellow-400 text-black py-3 rounded hover:bg-yellow-300 transition-colors font-bold">Choose Pro</button>
                        </div>
                        <div className="bg-black/50 p-8 rounded-lg border border-yellow-600/30 hover:border-yellow-400/50 transition-colors">
                            <h3 className="text-2xl font-bold mb-4 text-white">Enterprise</h3>
                            <p className="text-3xl font-bold mb-6">$29.99<span className="text-lg text-slate-400">/month</span></p>
                            <ul className="text-left space-y-2 mb-8">
                                <li>✓ Everything in Pro</li>
                                <li>✓ Team collaboration</li>
                                <li>✓ Advanced analytics</li>
                                <li>✓ Dedicated support</li>
                                <li>✓ Custom AI training</li>
                            </ul>
                            <button className="w-full bg-yellow-600/30 text-yellow-400 py-3 rounded hover:bg-yellow-600/50 transition-colors font-bold border border-yellow-600/50">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 text-center border-t border-yellow-600/30 bg-black/70">
                <p className="text-slate-300">&copy; 2024 Cortex AI. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Landing