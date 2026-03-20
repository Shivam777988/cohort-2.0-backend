import { NavLink, Outlet } from 'react-router'
import './Dashboard.scss'

export default function Dashboard() {
    return (
        <div className="dashboard">
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
