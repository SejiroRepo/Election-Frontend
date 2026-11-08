export type UserRole = 'student' | 'admin'

export type Candidate = {
  id: number
  name: string
  faculty: string
  department: string
  level: string
  position: string
  manifesto: string
  slogan: string
}

export type ElectionMetric = {
  label: string
  value: string
  detail: string
}

export type AuditEvent = {
  id: number
  title: string
  time: string
  detail: string
}

export type SignupFormData = {
  fullName: string
  matricNumber: string
  schoolEmail: string
  faculty: string
  department: string
  level: string
  password: string
  confirmPassword: string
}

export type LoginFormData = {
  matricNumber: string
  schoolEmail: string
  password: string
  role: UserRole
}

export type AuthUser = {
  fullName: string
  matricNumber: string
  schoolEmail: string
  role: UserRole
  isVerified: boolean
  faculty?: string
  department?: string
  level?: string
}
