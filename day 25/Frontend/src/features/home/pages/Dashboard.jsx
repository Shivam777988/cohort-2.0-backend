import { NavLink, Outlet } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import './Dashboard.scss'

export default function Dashboard() {
    const { user, handleLogout } = useAuth()

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <div className="dashboard__brand">
                    <span role="img" aria-label="logo">🎧</span> Moodify
                </div>

                <nav className="dashboard__topnav">
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                        About
                    </NavLink>
                </nav>

                <div className="dashboard__user">
                    <span role="img" aria-label="user">👤</span> {user?.username || user?.email || 'Guest'}
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <aside className="dashboard__sidebar">
                <h2>moodify</h2>
                <nav>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                        mood home
                    </NavLink>
                    <NavLink to="/upload" className={({ isActive }) => isActive ? 'active' : ''}>
                        upload
                    </NavLink>
                    <NavLink to="/songs" className={({ isActive }) => isActive ? 'active' : ''}>
                        library
                    </NavLink>
                </nav>
            </aside>
            <main className="dashboard__content">
                <Outlet />
            </main>
        </div>
    )
}
