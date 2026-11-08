import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { demoAdminLogin, demoStudentLogin } from '../data/mockData'
import type { AuthUser, LoginFormData, SignupFormData, UserRole } from '../types'
import { validateAbuEmail, validateMatricNumber, validatePassword } from '../utils/validation'

type AuthContextValue = {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (data: LoginFormData) => { success: boolean; message: string }
  signup: (data: SignupFormData) => { success: boolean; message: string }
  logout: () => void
  canAccess: (role: UserRole) => boolean
}

const STORAGE_KEY = 'abu-voting-auth-user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function toStudentUser(data: SignupFormData): AuthUser {
  return {
    fullName: data.fullName,
    matricNumber: data.matricNumber.toUpperCase(),
    schoolEmail: data.schoolEmail.toLowerCase(),
    role: 'student',
    isVerified: validateMatricNumber(data.matricNumber),
    faculty: data.faculty,
    department: data.department,
    level: data.level,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return
    }

    try {
      setUser(JSON.parse(stored) as AuthUser)
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      return
    }

    window.localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      login: (data) => {
        const normalizedMatric = data.matricNumber.trim().toUpperCase()
        const normalizedEmail = data.schoolEmail.trim().toLowerCase()

        if (!normalizedMatric || !normalizedEmail || !data.password.trim()) {
          return { success: false, message: 'Enter your matric number, A.B.U. email, and password.' }
        }

        if (!validateAbuEmail(normalizedEmail)) {
          return { success: false, message: 'Use a valid A.B.U. school email ending with @abu.edu.ng.' }
        }

        if (data.role === 'student') {
          // In a real app, this would be a backend call
          const isDemoStudent =
            normalizedMatric === demoStudentLogin.matricNumber &&
            normalizedEmail === demoStudentLogin.schoolEmail &&
            data.password === demoStudentLogin.password

          if (!isDemoStudent) {
            return {
              success: false,
              message: 'Login failed. Please check your credentials.',
            }
          }

          setUser({
            fullName: 'Amina Yusuf',
            matricNumber: normalizedMatric,
            schoolEmail: normalizedEmail,
            role: 'student',
            isVerified: validateMatricNumber(normalizedMatric),
            faculty: 'Faculty of Physical Sciences',
            department: 'Computer Science',
            level: '400 Level',
          })

          return { success: true, message: 'Student login successful.' }
        }

        const isDemoAdmin =
          normalizedMatric === demoAdminLogin.matricNumber &&
          normalizedEmail === demoAdminLogin.schoolEmail &&
          data.password === demoAdminLogin.password

        if (!isDemoAdmin) {
          return {
            success: false,
            message: 'Admin login failed. Use the sample admin credentials.',
          }
        }

        setUser({
          fullName: 'Election Committee Admin',
          matricNumber: normalizedMatric,
          schoolEmail: normalizedEmail,
          role: 'admin',
          isVerified: true,
        })

        return { success: true, message: 'Admin login successful.' }
      },
      signup: (data) => {
        const normalizedMatric = data.matricNumber.trim().toUpperCase()
        const normalizedEmail = data.schoolEmail.trim().toLowerCase()

        if (data.password !== data.confirmPassword) {
          return { success: false, message: 'Passwords do not match.' }
        }

        if (!validateAbuEmail(normalizedEmail)) {
          return { success: false, message: 'Only verified A.B.U. school email addresses can register.' }
        }

        if (!validateMatricNumber(normalizedMatric)) {
          return { success: false, message: 'Enter a valid ABU matric number (e.g., U19CS1012).' }
        }

        if (!validatePassword(data.password)) {
          return { 
            success: false, 
            message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' 
          }
        }

        const nextUser = toStudentUser({
          ...data,
          matricNumber: normalizedMatric,
          schoolEmail: normalizedEmail,
        })

        setUser(nextUser)
        return {
          success: true,
          message: 'Signup successful! Your account is verified as an ABU student.',
        }
      },
      logout: () => setUser(null),
      canAccess: (role) => user?.role === role,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
