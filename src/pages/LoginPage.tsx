import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { demoAdminLogin, demoStudentLogin } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import type { LoginFormData } from '../types'
import { validateAbuEmail, validateMatricNumber } from '../utils/validation'

const initialForm: LoginFormData = {
  matricNumber: '',
  schoolEmail: '',
  password: '',
  role: 'student',
}

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState<LoginFormData>(initialForm)
  const [feedback, setFeedback] = useState('')

  const errors = useMemo(() => {
    const e: Partial<Record<keyof LoginFormData, string>> = {}
    if (form.role === 'student') {
      if (form.matricNumber && !validateMatricNumber(form.matricNumber)) {
        e.matricNumber = 'Invalid ABU matric number format'
      }
      if (form.schoolEmail && !validateAbuEmail(form.schoolEmail)) {
        e.schoolEmail = 'Must be a valid @abu.edu.ng email'
      }
    }
    return e
  }, [form])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = login(form)
    setFeedback(result.message)

    if (!result.success) {
      return
    }

    navigate(form.role === 'admin' ? '/admin' : '/vote')
  }

  return (
    <main className="page">
      <section className="auth-page">
        <article className="auth-card">
          <div className="section-heading">
            <p className="eyebrow">Sign In</p>
            <h2>Access the A.B.U. Election Portal</h2>
            <p>
              Students must log in with their official Matriculation number and verified A.B.U. 
              school email to access the ballot.
            </p>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <div className="role-switch">
              <button
                className={form.role === 'student' ? 'role-tab active' : 'role-tab'}
                onClick={() => setForm((current) => ({ ...current, role: 'student', feedback: '' }))}
                type="button"
              >
                Student
              </button>
              <button
                className={form.role === 'admin' ? 'role-tab active' : 'role-tab'}
                onClick={() => setForm((current) => ({ ...current, role: 'admin', feedback: '' }))}
                type="button"
              >
                Election Committee
              </button>
            </div>

            <div className="form-group">
              <input
                onChange={(event) => setForm((current) => ({ ...current, matricNumber: event.target.value }))}
                placeholder={form.role === 'student' ? 'Matriculation Number' : 'Administrator ID'}
                value={form.matricNumber}
                className={errors.matricNumber ? 'input-error' : ''}
                required
              />
              {errors.matricNumber && <span className="error-text">{errors.matricNumber}</span>}
            </div>

            <div className="form-group">
              <input
                onChange={(event) => setForm((current) => ({ ...current, schoolEmail: event.target.value }))}
                placeholder="A.B.U. Institutional Email"
                type="email"
                value={form.schoolEmail}
                className={errors.schoolEmail ? 'input-error' : ''}
                required
              />
              {errors.schoolEmail && <span className="error-text">{errors.schoolEmail}</span>}
            </div>

            <div className="form-group">
              <input
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Secure Password"
                type="password"
                value={form.password}
                required
              />
            </div>

            {feedback && <p className={`feedback ${feedback.includes('successful') ? 'success' : ''}`}>{feedback}</p>}

            <button 
              className="button button-primary" 
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Secure Sign In
            </button>
          </form>

          <p className="helper-text">
            Not registered yet? <Link to="/signup">Create an account</Link>
          </p>
        </article>

        <article className="card auth-aside">
          <div className="section-heading">
            <p className="eyebrow">Security Notice</p>
            <h3>Authorized Access Only</h3>
          </div>
          <p>
            This portal is for authorized Ahmadu Bello University students and election 
            committee members only. All login attempts are logged and audited.
          </p>
          <ul className="list">
            <li>Ensure you are using a secure connection.</li>
            <li>Never share your institutional credentials.</li>
            <li>Logout immediately after casting your vote.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}


