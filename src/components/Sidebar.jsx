import React from 'react'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',       icon: '⬡',  section: null },
  { id: 'patients',     label: 'Patients',         icon: '👤',  section: 'Clinical' },
  { id: 'appointments', label: 'Appointments',     icon: '📅',  section: null },
  { id: 'doctors',      label: 'Doctors & Staff',  icon: '🩺',  section: null },
  { id: 'wards',        label: 'Wards & Beds',     icon: '🏨',  section: null },
  { id: 'records',      label: 'Medical Records',  icon: '📋',  section: null },
  { id: 'billing',      label: 'Billing',          icon: '🧾',  section: 'Finance' },
]

export default function Sidebar({ active, onNavigate }) {
  const sidebarStyle = {
    width: 'var(--sidebar-w)',
    background: 'var(--navy)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: '100vh',
    position: 'relative',
    zIndex: 10,
  }

  const logoStyle = {
    padding: '28px 22px 22px',
    borderBottom: '1px solid var(--navy-border)',
  }

  const sectionLabelStyle = {
    padding: '20px 22px 6px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'rgba(100,116,139,0.7)',
  }

  const navItemBase = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 22px',
    fontSize: '13.5px',
    fontWeight: 400,
    color: 'var(--text-on-dark-muted)',
    cursor: 'pointer',
    transition: 'all 0.15s',
    position: 'relative',
    userSelect: 'none',
    fontFamily: 'var(--font-body)',
  }

  const navItemActive = {
    ...navItemBase,
    background: 'rgba(0,212,184,0.1)',
    color: 'var(--teal)',
    fontWeight: 600,
  }

  const activePip = {
    position: 'absolute',
    left: 0, top: 8, bottom: 8,
    width: 3,
    background: 'var(--teal)',
    borderRadius: '0 3px 3px 0',
  }

  const bottomStyle = {
    marginTop: 'auto',
    padding: '16px 22px',
    borderTop: '1px solid var(--navy-border)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  // group items by section
  let currentSection = null

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '0.5px', lineHeight: 1.1 }}>
          Medi<span style={{ color: 'var(--teal)' }}>Core</span>
        </div>
        <div style={{ fontSize: '10.5px', color: 'rgba(100,116,139,0.8)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px', fontWeight: 500 }}>
          Hospital Management
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', paddingBottom: '12px' }}>
        {NAV_ITEMS.map(item => {
          const showSection = item.section && item.section !== currentSection
          if (showSection) currentSection = item.section

          return (
            <React.Fragment key={item.id}>
              {showSection && (
                <div style={sectionLabelStyle}>{item.section}</div>
              )}
              <div
                style={active === item.id ? navItemActive : navItemBase}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={e => {
                  if (active !== item.id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.color = 'var(--text-on-dark)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== item.id) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-on-dark-muted)'
                  }
                }}
              >
                {active === item.id && <span style={activePip} />}
                <span style={{ fontSize: '15px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </React.Fragment>
          )
        })}
      </nav>

      {/* User */}
      <div style={bottomStyle}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-display)', flexShrink: 0 }}>
          SA
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Super Admin</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-on-dark-muted)' }}>admin@medicore.zw</div>
        </div>
      </div>

      {/* Decorative accent line */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, var(--teal-dim), transparent)' }} />
    </aside>
  )
}
