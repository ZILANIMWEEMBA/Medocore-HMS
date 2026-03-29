import React, { useState } from 'react'

const PAGE_TITLES = {
  dashboard:    { title: 'Dashboard Overview',    subtitle: 'Welcome back, today is Saturday 28 March 2026' },
  patients:     { title: 'Patient Management',    subtitle: 'Register and manage all hospital patients' },
  appointments: { title: 'Appointments',          subtitle: 'Schedule and track all consultations' },
  doctors:      { title: 'Doctors & Staff',       subtitle: 'Medical staff directory and schedules' },
  wards:        { title: 'Wards & Bed Management', subtitle: 'Real-time ward occupancy and bed assignments' },
  records:      { title: 'Medical Records',        subtitle: 'Patient visit history and clinical notes' },
  billing:      { title: 'Billing & Invoicing',   subtitle: 'Invoice management and payment tracking' },
}

export default function Topbar({ page, onSearch, onAction }) {
  const [q, setQ] = useState('')
  const info = PAGE_TITLES[page] || PAGE_TITLES.dashboard

  const actionLabels = {
    patients:     '+ Register Patient',
    appointments: '+ Book Appointment',
    doctors:      '+ Add Doctor',
    billing:      '+ New Invoice',
    wards:        null,
    records:      null,
    dashboard:    null,
  }
  const action = actionLabels[page]

  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 28px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      gap: 16,
    }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
          {info.title}
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>{info.subtitle}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search patients, doctors…"
            value={q}
            onChange={e => { setQ(e.target.value); onSearch?.(e.target.value) }}
          />
        </div>

        {/* Notification bell */}
        <button className="btn btn-ghost btn-icon" style={{ position: 'relative' }}>
          🔔
          <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: 'var(--teal)', borderRadius: '50%', border: '1.5px solid var(--surface)' }} />
        </button>

        {action && (
          <button className="btn btn-primary" onClick={onAction}>
            {action}
          </button>
        )}
      </div>
    </header>
  )
}
