import React from 'react'
import { Link } from 'react-router'
import './Landing.scss'

const Landing = () => {
  return (
    <main className="landing">
      <div className="landing__hero">
        <div className="landing__brand">
          <h1>🎧 Moodify</h1>
          <p className="subtitle">Discover music that matches your mood</p>
        </div>

        <div className="landing__actions">
          <Link to="/login" className="btn btn--primary">Login</Link>
          <Link to="/register" className="btn btn--secondary">Get Started</Link>
          <Link to="/pricing" className="btn btn--outline">View Pricing</Link>
        </div>

        <div className="landing__features">
          <div className="feature">
            <span className="feature__icon">🎭</span>
            <h3>Face Detection</h3>
            <p>Let AI detect your mood from your expression</p>
          </div>
          <div className="feature">
            <span className="feature__icon">🎵</span>
            <h3>Personal Library</h3>
            <p>Upload and organize your favorite songs</p>
          </div>
          <div className="feature">
            <span className="feature__icon">🎯</span>
            <h3>Mood Matching</h3>
            <p>Get songs that perfectly match your current mood</p>
          </div>
        </div>

        <div className="landing__stats">
          <div className="stat">
            <h4>10K+</h4>
            <p>Active Users</p>
          </div>
          <div className="stat">
            <h4>5K+</h4>
            <p>Songs</p>
          </div>
          <div className="stat">
            <h4>6</h4>
            <p>Mood Types</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Landing