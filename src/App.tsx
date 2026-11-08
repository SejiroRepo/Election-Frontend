import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AppShell } from './components/layout/AppShell'
import { AuthProvider } from './context/AuthContext'
import { candidates as initialCandidates, type Candidate } from './data/mockData'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { StudentDashboardPage } from './pages/StudentDashboardPage'

function App() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<number>(initialCandidates[0]?.id ?? 0)
  const [hasVoted, setHasVoted] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    faculty: '',
    department: '',
    level: '',
    position: 'SUG President',
    manifesto: '',
    slogan: '',
  })

  const selectedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.id === selectedCandidateId),
    [candidates, selectedCandidateId],
  )

  const receiptId = useMemo(() => {
    if (!hasVoted || !selectedCandidate) {
      return 'Pending'
    }

    return `ABU-SUG-2026-${String(selectedCandidate.id).padStart(3, '0')}-8F2A`
  }, [hasVoted, selectedCandidate])

  const handleVoteSubmit = () => {
    if (!selectedCandidate) {
      return
    }

    setHasVoted(true)
  }

  const handleCandidateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextCandidate: Candidate = {
      id: candidates.length + 1,
      ...candidateForm,
    }

    setCandidates((current) => [...current, nextCandidate])
    setCandidateForm({
      name: '',
      faculty: '',
      department: '',
      level: '',
      position: 'SUG President',
      manifesto: '',
      slogan: '',
    })
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />} path="/">
            <Route
              element={<HomePage candidateCount={candidates.length} />}
              index
            />
            <Route element={<LoginPage />} path="login" />
            <Route element={<SignupPage />} path="signup" />
            
            <Route
              element={
                <ProtectedRoute role="student">
                  <StudentDashboardPage
                    candidates={candidates}
                    hasVoted={hasVoted}
                    receiptId={receiptId}
                    selectedCandidate={selectedCandidate}
                    selectedCandidateId={selectedCandidateId}
                    onSelectCandidate={setSelectedCandidateId}
                    onVote={handleVoteSubmit}
                  />
                </ProtectedRoute>
              }
              path="vote"
            />
            
            <Route
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboardPage
                    candidateForm={candidateForm}
                    candidates={candidates}
                    onChangeField={(field, value) =>
                      setCandidateForm((current) => ({ ...current, [field]: value }))
                    }
                    onSubmit={handleCandidateSubmit}
                  />
                </ProtectedRoute>
              }
              path="admin"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
