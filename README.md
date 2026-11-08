# A.B.U. Secure Student E-Voting Frontend

Frontend starter for a final-year Computer Science project focused on secure and accessible student elections at Ahmadu Bello University.

## Project Idea

This web platform is designed to make student elections:

- more accessible for students who cannot reach physical polling centers,
- easier to audit when disputes occur,
- safer against duplicate voting attempts,
- confidential so votes cannot be publicly tied to voter identity,
- easier to manage through an admin dashboard.

## Current Frontend Scope

The current build includes:

- an overview page that explains the system goals and security model,
- a student voting page with mock identity status, candidate selection, and vote receipt UI,
- an admin dashboard for adding candidates and viewing election logs,
- mock data for metrics, candidates, and audit events,
- a backend-ready structure that can later connect to real APIs.

## Recommended Security Model

To preserve accessibility and trust, the full system should follow this flow:

1. Student authenticates using school-backed identity verification.
2. Backend checks if the student is eligible for the current election.
3. Backend issues a single-use voting token.
4. Student casts a confidential ballot.
5. Backend stores the vote in a way that keeps ballot content separate from public identity records.
6. System returns a verification receipt that proves the vote was recorded.
7. Admins can audit logs and result snapshots without seeing individual voter choices.

## Suggested Backend Endpoints

The frontend currently assumes endpoints like:

- `POST /auth/student-login`
- `GET /elections/active`
- `POST /votes`
- `GET /votes/receipt/:id`
- `GET /admin/candidates`
- `POST /admin/candidates`
- `GET /admin/audit-log`

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Plain CSS

## Run The Project

```bash
npm install
npm run dev
```

## Suggested Next Development Steps

### Frontend

- split the current single-file UI into reusable components and pages,
- add form validation and toast feedback,
- add a protected admin route,
- connect the mock candidate form to the backend,
- replace static metrics and audit logs with live API data,
- add an accessible confirmation modal before vote submission.

### Backend Integration

- define the student login and eligibility payloads,
- define the vote submission payload and receipt response,
- agree on error codes for duplicate vote attempts and expired voting windows,
- define admin roles and permissions,
- support downloadable audit logs and result snapshots.

### Final Year Project Documentation

- write the problem statement,
- define project aims and objectives,
- explain system analysis and requirements,
- create use case diagrams and flowcharts,
- document the database design,
- explain confidentiality, integrity, availability, and auditability,
- include testing strategy and evaluation results.
