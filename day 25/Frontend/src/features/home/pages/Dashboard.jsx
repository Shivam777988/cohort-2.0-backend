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
                    <NavLink to="/app" end className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                    <NavLink to="/app/about" className={({ isActive }) => isActive ? 'active' : ''}>
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
                    <NavLink to="/app" end className={({ isActive }) => isActive ? 'active' : ''}>
                        mood home
                    </NavLink>
                    <NavLink to="/app/upload" className={({ isActive }) => isActive ? 'active' : ''}>
                        upload
                    </NavLink>
                    <NavLink to="/app/songs" className={({ isActive }) => isActive ? 'active' : ''}>
                        library
                    </NavLink>
                    <hr className="sidebar-divider" />
                    <NavLink to="/app/account" className={({ isActive }) => isActive ? 'active' : ''}>
                        💳 subscription
                    </NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => isActive ? 'active' : ''}>
                        📊 upgrade plan
                    </NavLink>
                </nav>
            </aside>
            <main className="dashboard__content">
                <Outlet />
            </main>
        </div>
    )
}
