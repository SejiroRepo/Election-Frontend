import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function AppShell() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">A.B.U. Secure Voting Portal</p>
          <h1>Electronic Student Government Elections</h1>
          <p className="topbar-copy">
            Official institutional platform for secure, auditable, and confidential student voting.
          </p>
        </div>

        <div className="nav-stack">
          <nav className="nav">
            <NavLink to="/">Overview</NavLink>
            <NavLink to="/vote">Voter Portal</NavLink>
            {!isAuthenticated && <NavLink to="/login">Sign In</NavLink>}
            {!isAuthenticated && <NavLink to="/signup">Register</NavLink>}
          </nav>

          <div className="account-chip">
            {isAuthenticated ? (
              <>
                <span>
                  Authenticated as <strong>{user?.fullName}</strong> ({user?.role})
                </span>
                <button className="button button-secondary" onClick={logout} type="button">
                  Secure Logout
                </button>
              </>
            ) : (
              <span>Institutional credentials required for access.</span>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
