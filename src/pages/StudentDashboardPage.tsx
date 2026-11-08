import type { Candidate } from '../types'
import { useAuth } from '../context/AuthContext'

type StudentDashboardPageProps = {
  candidates: Candidate[]
  hasVoted: boolean
  receiptId: string
  selectedCandidate: Candidate | undefined
  selectedCandidateId: number
  onSelectCandidate: (candidateId: number) => void
  onVote: () => void
}

export function StudentDashboardPage({
  candidates,
  hasVoted,
  receiptId,
  selectedCandidate,
  selectedCandidateId,
  onSelectCandidate,
  onVote,
}: StudentDashboardPageProps) {
  const { user } = useAuth()

  return (
    <main className="page">
      <section className="content-grid">
        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Verification Status</p>
            <h2>Voter Eligibility: {user?.fullName}</h2>
          </div>
          <div className="status-stack">
            <div className="status-item">
              <span className={`status-badge ${user?.isVerified ? 'status-success' : ''}`}>
                {user?.isVerified ? 'Matriculation Verified' : 'Verification Pending'}
              </span>
              <p>
                {user?.isVerified 
                  ? `Your Matriculation Number (${user.matricNumber}) has been verified for the current election session.` 
                  : 'Your matriculation number is undergoing verification. Please contact the committee if this persists.'}
              </p>
            </div>
            <div className="status-item">
              <span className="status-badge status-success">Institutional Email Bound</span>
              <p>Voter identity is cryptographically bound to {user?.schoolEmail}.</p>
            </div>
            <div className="status-item">
              <span className="status-badge">Voting Token</span>
              <p>
                {hasVoted 
                  ? 'Your single-use voting token has been successfully consumed.' 
                  : 'Your voting token is active and ready for ballot submission.'}
              </p>
            </div>
          </div>
        </article>

        <article className="card">
          <div className="section-heading">
            <p className="eyebrow">Digital Receipt</p>
            <h2>Ballot Confirmation Record</h2>
          </div>
          <div className="receipt-card">
            <p className="receipt-label">Reference ID</p>
            <p className="receipt-value">{receiptId}</p>
            <p>
              Status: <strong>{hasVoted ? 'Confirmed & Encrypted' : 'Awaiting Submission'}</strong>
            </p>
            <p>Date: {hasVoted ? new Date().toLocaleDateString() : 'Pending'}</p>
            <p>System Hash: {hasVoted ? 'SHA-256 Verified' : 'Generated on write'}</p>
          </div>
        </article>
      </section>

      <section className="card ballot-card">
        <div className="section-heading">
          <p className="eyebrow">Electronic Ballot</p>
          <h2>SUG Presidential Election</h2>
          <p>Select one candidate to cast your vote. This action is irreversible.</p>
        </div>

        <div className="candidate-grid">
          {candidates.map((candidate) => (
            <label
              className={`candidate-card ${selectedCandidateId === candidate.id ? 'selected' : ''}`}
              key={candidate.id}
            >
              <input
                checked={selectedCandidateId === candidate.id}
                disabled={hasVoted}
                name="candidate"
                onChange={() => onSelectCandidate(candidate.id)}
                type="radio"
              />
              <div>
                <div className="candidate-topline">
                  <h3>{candidate.name}</h3>
                  <span>{candidate.level}</span>
                </div>
                <p className="candidate-meta">
                  {candidate.department}, {candidate.faculty}
                </p>
                <p>{candidate.manifesto}</p>
                <p className="candidate-slogan">{candidate.slogan}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="vote-summary">
          <div>
            <p className="stat-label">Selected candidate</p>
            <h3>{selectedCandidate?.name ?? 'No candidate selected'}</h3>
            <p>{selectedCandidate?.slogan ?? 'Choose a candidate to preview the ballot summary.'}</p>
          </div>
          <button
            className="button button-primary"
            disabled={hasVoted || !selectedCandidate}
            onClick={onVote}
            type="button"
          >
            {hasVoted ? 'Vote locked' : 'Confirm vote'}
          </button>
        </div>
      </section>
    </main>
  )
}
