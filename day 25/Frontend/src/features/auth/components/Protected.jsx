import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Link } from 'react-router'
import './Protected.scss'

const Protected = ({ children }) => {

    const { user, loading } = useAuth()

    if (loading) {
        return (
            <main className="auth-page">
                <div className="form-container">
                    <h1>🔄 Moodify is waking up</h1>
                    <p>Checking your session...</p>

                    <div className="loader"></div>

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                        <br />
                        New here? <Link to="/register">Register</Link>
                    </p>
                </div>
            </main>
        )
    }
    
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected