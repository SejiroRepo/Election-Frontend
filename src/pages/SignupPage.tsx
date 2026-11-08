import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { departments, faculties, levels } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import type { SignupFormData } from '../types'
import { validateAbuEmail, validateMatricNumber, validatePassword } from '../utils/validation'

const initialForm: SignupFormData = {
  fullName: '',
  matricNumber: '',
  schoolEmail: '',
  faculty: '',
  department: '',
  level: '',
  password: '',
  confirmPassword: '',
}

export function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState<SignupFormData>(initialForm)
  const [feedback, setFeedback] = useState('')

  const errors = useMemo(() => {
    const e: Partial<Record<keyof SignupFormData, string>> = {}
    if (form.matricNumber && !validateMatricNumber(form.matricNumber)) {
      e.matricNumber = 'Invalid ABU matric number format (e.g. U19CS1012)'
    }
    if (form.schoolEmail && !validateAbuEmail(form.schoolEmail)) {
      e.schoolEmail = 'Must be a valid @abu.edu.ng email'
    }
    if (form.password && !validatePassword(form.password)) {
      e.password = 'Min 8 chars, must include upper, lower, number, and special char'
    }
    if (form.confirmPassword && form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match'
    }
    return e
  }, [form])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (Object.keys(errors).length > 0) {
      setFeedback('Please fix the errors in the form.')
      return
    }

    const result = signup(form)
    setFeedback(result.message)

    if (result.success) {
      navigate('/vote')
    }
  }

  return (
    <main className="page">
      <section className="auth-page">
        <article className="auth-card auth-card-wide">
          <div className="section-heading">
            <p className="eyebrow">Registration</p>
            <h2>Create Your Voter Account</h2>
            <p>
              Register with your official A.B.U. Matriculation number and institutional email 
              to participate in upcoming elections.
            </p>
          </div>

          <form className="auth-form auth-form-grid" onSubmit={submit}>
            <div className="form-group">
              <input
                onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                placeholder="Full Name (as it appears on ID)"
                value={form.fullName}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                onChange={(event) =>
                  setForm((current) => ({ ...current, matricNumber: event.target.value.toUpperCase() }))
                }
                placeholder="Matriculation Number"
                value={form.matricNumber}
                className={errors.matricNumber ? 'input-error' : ''}
                required
              />
              {errors.matricNumber && <span className="error-text">{errors.matricNumber}</span>}
            </div>

            <div className="form-group">
              <input
                onChange={(event) => setForm((current) => ({ ...current, schoolEmail: event.target.value }))}
                placeholder="A.B.U. Email (@abu.edu.ng)"
                type="email"
                value={form.schoolEmail}
                className={errors.schoolEmail ? 'input-error' : ''}
                required
              />
              {errors.schoolEmail && <span className="error-text">{errors.schoolEmail}</span>}
            </div>

            <select
              onChange={(event) => setForm((current) => ({ ...current, faculty: event.target.value }))}
              value={form.faculty}
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
            
            <select
              onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
              value={form.department}
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            
            <select
              onChange={(event) => setForm((current) => ({ ...current, level: event.target.value }))}
              value={form.level}
              required
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <div className="form-group">
              <input
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Choose a Strong Password"
                type="password"
                value={form.password}
                className={errors.password ? 'input-error' : ''}
                required
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <input
                onChange={(event) =>
                  setForm((current) => ({ ...current, confirmPassword: event.target.value }))
                }
                placeholder="Confirm Password"
                type="password"
                value={form.confirmPassword}
                className={errors.confirmPassword ? 'input-error' : ''}
                required
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            {feedback && <p className={`feedback form-span ${feedback.includes('successful') ? 'success' : ''}`}>{feedback}</p>}

            <button 
              className="button button-primary form-span" 
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Create Account & Verify Eligibility
            </button>
          </form>

          <p className="helper-text">
            Already registered? <Link to="/login">Sign in here</Link>
          </p>
        </article>

        <article className="card auth-aside">
          <div className="section-heading">
            <p className="eyebrow">Identity Verification</p>
            <h3>How It Works</h3>
          </div>
          <p>
            To ensure a fair election, all voter accounts must be verified against the 
            official A.B.U. Student Registry.
          </p>
          <ul className="list">
            <li><strong>Matric Matching:</strong> Your matric number is checked for active status.</li>
            <li><strong>Domain Bind:</strong> Registration is restricted to @abu.edu.ng emails.</li>
            <li><strong>Single Account:</strong> Each student is permitted only one voting account.</li>
            <li><strong>Privacy:</strong> Your personal data is handled securely and confidentially.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}


