import React from 'react'

const ICONS = { success: '✓', error: '✕', info: 'ℹ' }
const COLORS = { success: 'var(--success)', error: 'var(--danger)', info: 'var(--teal)' }

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon" style={{ color: COLORS[t.type] }}>{ICONS[t.type]}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
