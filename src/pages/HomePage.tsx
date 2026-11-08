import { NavLink } from 'react-router-dom'
import { auditEvents, metrics, platformPillars } from '../data/mockData'

type HomePageProps = {
  candidateCount: number
}

export function HomePage({ candidateCount }: HomePageProps) {
  return (
    <main className="page">
      <section className="hero-card">
        <div>
          <span className="chip">Official Election Portal</span>
          <h2>Ahmadu Bello University Student Union Government Elections</h2>
          <p className="lead">
            Welcome to the official secure voting platform. Exercise your right to vote for 
            your preferred representatives in a secure, transparent, and efficient digital environment.
          </p>
          <div className="hero-actions">
            <NavLink className="button button-primary" to="/signup">
              Register to Vote
            </NavLink>
            <NavLink className="button button-secondary" to="/login">
              Sign In
            </NavLink>
          </div>
        </div>

        <div className="hero-panel">
          <p className="panel-title">Election Overview</p>
          <ul className="list">
            <li>Secure student identity verification via Matric number.</li>
            <li>Real-time participation tracking and auditable results.</li>
            <li>Encrypted ballot system ensuring voter confidentiality.</li>
            <li>Accessible voting for all eligible A.B.U. students.</li>
            <li>{candidateCount} verified candidates for current positions.</li>
          </ul>
        </div>
      </section>

      <section className="section-grid">
        {metrics.map((metric) => (
          <article className="stat-card" key={metric.label}>
            <p className="stat-label">{metric.label}</p>
            <h3>{metric.value}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Voting Process</p>
            <h3>How to Participate</h3>
          </div>
          <ol className="list ordered">
            <li>Register or login using your verified A.B.U. student credentials.</li>
            <li>Complete the two-step verification process to confirm eligibility.</li>
            <li>Browse candidates and review their manifestos for each position.</li>
            <li>Cast your ballot securely within the active election window.</li>
            <li>Receive a digital receipt as proof of your successful submission.</li>
          </ol>
        </article>

        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Platform Integrity</p>
            <h3>Core Security Principles</h3>
          </div>
          <div className="pillar-grid">
            {platformPillars.map((pillar) => (
              <div className="pillar" key={pillar.title}>
                <h4>{pillar.title}</h4>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Important Notice</p>
            <h3>Voter Eligibility</h3>
          </div>
          <p>
            Only students with a valid A.B.U. Matriculation number and an active school email 
            (@abu.edu.ng) are eligible to participate. Ensure your profile is fully verified 
            before the election window closes. For technical support, contact the Election 
            Committee IT desk.
          </p>
        </article>

        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Election Timeline</p>
            <h3>Recent Updates</h3>
          </div>
          <div className="timeline">
            {auditEvents.slice(0, 3).map((event) => (
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
    </main>
  )
}
