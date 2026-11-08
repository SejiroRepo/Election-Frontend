import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types'

type ProtectedRouteProps = {
  children: JSX.Element
  role: UserRole
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { canAccess, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  if (!canAccess(role)) {
    return <Navigate replace to="/" />
  }

  return children
}
