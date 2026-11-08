import type { AuditEvent, Candidate, ElectionMetric, LoginFormData, SignupFormData } from '../types'

export const metrics: ElectionMetric[] = [
  {
    label: 'Registered Voters',
    value: '34,218',
    detail: 'Total eligible students in the university registry.',
  },
  {
    label: 'Ballots Cast',
    value: '18,406',
    detail: 'Securely recorded and encrypted votes.',
  },
  {
    label: 'Security Checks',
    value: '100%',
    detail: 'Active identity verification for all sessions.',
  },
  {
    label: 'Audit Nodes',
    value: '12',
    detail: 'Decentralized integrity verification points.',
  },
]

export const platformPillars = [
  {
    title: 'Secure Voting',
    description:
      'Encrypted ballot system ensuring that every vote is recorded accurately and cannot be tampered with.',
  },
  {
    title: 'Identity Assurance',
    description:
      'Multi-factor verification binding voter sessions to official institutional credentials.',
  },
  {
    title: 'Integrity & Transparency',
    description:
      'Real-time auditing and verifiable receipts provide full transparency while maintaining privacy.',
  },
  {
    title: 'Confidentiality',
    description:
      'Strict separation of voter identity from ballot content to guarantee absolute voter privacy.',
  },
  {
    title: 'High Availability',
    description:
      'Distributed architecture designed to handle peak loads during critical election windows.',
  },
]

export const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Amina Yusuf',
    faculty: 'Faculty of Physical Sciences',
    department: 'Computer Science',
    level: '400 Level',
    position: 'SUG President',
    manifesto: 'Build a transparent student council with publishable budgets and monthly student town halls.',
    slogan: 'Transparency. Inclusion. Impact.',
  },
  {
    id: 2,
    name: 'David Emmanuel',
    faculty: 'Faculty of Engineering',
    department: 'Electrical Engineering',
    level: '500 Level',
    position: 'SUG President',
    manifesto: 'Improve welfare reporting, transport coordination, and digital feedback channels for all students.',
    slogan: 'Students First, Always.',
  },
  {
    id: 3,
    name: 'Zainab Musa',
    faculty: 'Faculty of Life Sciences',
    department: 'Microbiology',
    level: '400 Level',
    position: 'SUG President',
    manifesto: 'Expand academic support programs, improve inclusivity, and modernize student communication.',
    slogan: 'Voice, Service, Progress.',
  },
]

export const auditEvents: AuditEvent[] = [
  {
    id: 1,
    title: 'Election Window Opened',
    time: '08:00 AM',
    detail: 'Official election committee authorization signed and ballot activated.',
  },
  {
    id: 2,
    title: 'Voter Registry Synchronized',
    time: '08:05 AM',
    detail: 'Student eligibility records successfully synced with the institutional registry.',
  },
  {
    id: 3,
    title: 'Integrity Check Passed',
    time: '10:24 AM',
    detail: 'System-wide consistency check completed; all audit logs verified.',
  },
]

export const faculties = [
  'Faculty of Physical Sciences',
  'Faculty of Engineering',
  'Faculty of Life Sciences',
  'Faculty of Education',
  'Faculty of Social Sciences',
  'Faculty of Arts',
]

export const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Microbiology',
  'Mathematics',
  'Economics',
  'Mass Communication',
]

export const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level']

export const demoSignupData: SignupFormData = {
  fullName: 'Amina Yusuf',
  matricNumber: 'U19CS1012',
  schoolEmail: 'amina.yusuf@abu.edu.ng',
  faculty: 'Faculty of Physical Sciences',
  department: 'Computer Science',
  level: '400 Level',
  password: 'Password123!',
  confirmPassword: 'Password123!',
}

export const demoStudentLogin: LoginFormData = {
  matricNumber: 'U19CS1012',
  schoolEmail: 'amina.yusuf@abu.edu.ng',
  password: 'Password123!',
  role: 'student',
}

export const demoAdminLogin: LoginFormData = {
  matricNumber: 'ABU-ADMIN-001',
  schoolEmail: 'elections@abu.edu.ng',
  password: 'AdminSecure123!',
  role: 'admin',
}
