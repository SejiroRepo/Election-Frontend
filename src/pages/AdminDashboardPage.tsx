import type { FormEvent } from 'react'
import { auditEvents, metrics } from '../data/mockData'
import type { Candidate } from '../types'

type AdminDashboardPageProps = {
  candidateForm: Omit<Candidate, 'id'>
  candidates: Candidate[]
  onChangeField: (field: keyof Omit<Candidate, 'id'>, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function AdminDashboardPage({
  candidateForm,
  candidates,
  onChangeField,
  onSubmit,
}: AdminDashboardPageProps) {
  return (
    <main className="page">
      <section className="section-grid">
        {metrics.slice(0, 3).map((metric) => (
          <article className="stat-card" key={metric.label}>
            <p className="stat-label">{metric.label}</p>
            <h3>{metric.value}</h3>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Election Management</p>
            <h2>Candidate Administration</h2>
            <p>Add new candidates to the official election ballot.</p>
          </div>
          <form className="candidate-form" onSubmit={onSubmit}>
            <input
              onChange={(event) => onChangeField('name', event.target.value)}
              placeholder="Full Name"
              required
              value={candidateForm.name}
            />
            <div className="auth-form-grid">
              <input
                onChange={(event) => onChangeField('faculty', event.target.value)}
                placeholder="Faculty"
                required
                value={candidateForm.faculty}
              />
              <input
                onChange={(event) => onChangeField('department', event.target.value)}
                placeholder="Department"
                required
                value={candidateForm.department}
              />
            </div>
            <div className="auth-form-grid">
              <input
                onChange={(event) => onChangeField('level', event.target.value)}
                placeholder="Level"
                required
                value={candidateForm.level}
              />
              <input
                onChange={(event) => onChangeField('position', event.target.value)}
                placeholder="Election Position"
                required
                value={candidateForm.position}
              />
            </div>
            <input
              onChange={(event) => onChangeField('slogan', event.target.value)}
              placeholder="Campaign Slogan"
              required
              value={candidateForm.slogan}
            />
            <textarea
              onChange={(event) => onChangeField('manifesto', event.target.value)}
              placeholder="Candidate Manifesto"
              required
              rows={4}
              value={candidateForm.manifesto}
            />
            <button className="button button-primary" type="submit">
              Register Candidate
            </button>
          </form>
        </article>

        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Election Audit Log</p>
            <h2>System Events & Integrity</h2>
            <p>Immutable record of all critical election activities.</p>
          </div>
          <div className="timeline">
            {auditEvents.map((event) => (
              <div className="timeline-item" key={event.id}>
                <div>
                  <h4>{event.title}</h4>
                  <p>{event.detail}</p>
                </div>
                <span>{event.time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="card">
        <div className="section-heading">
          <p className="eyebrow">Candidate Register</p>
          <h2>Current Election Candidates</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Faculty</th>
                <th>Department</th>
                <th>Level</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.faculty}</td>
                  <td>{candidate.department}</td>
                  <td>{candidate.level}</td>
                  <td>{candidate.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
