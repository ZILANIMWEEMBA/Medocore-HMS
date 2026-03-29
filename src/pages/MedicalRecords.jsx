import React, { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import { records, patients } from '../data/mockData.js'

export default function MedicalRecords({ onToast }) {
  const [selected, setSelected] = useState(records[0])
  const [visitIdx, setVisitIdx] = useState(0)

  const visit = selected?.visits[visitIdx]

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, height: 'calc(100vh - 130px)' }}>

        {/* Patient list sidebar */}
        <div className="card" style={{ overflowY: 'auto' }}>
          <div className="card-header" style={{ position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 1 }}>
            <div className="card-title">Patients</div>
          </div>
          {patients.map(p => (
            <div key={p.id}
              onClick={() => {
                const rec = records.find(r => r.patientId === p.id)
                if (rec) { setSelected(rec); setVisitIdx(0) }
                else onToast('No records found for this patient', 'info')
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 18px',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
                background: selected?.patientId === p.id ? 'var(--teal-dim)' : 'transparent',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => { if (selected?.patientId !== p.id) e.currentTarget.style.background = 'var(--surface-2)' }}
              onMouseLeave={e => { if (selected?.patientId !== p.id) e.currentTarget.style.background = 'transparent' }}
            >
              <Avatar initials={p.avatar} color={p.color} size={32} fontSize={11} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{p.id}</div>
              </div>
              {selected?.patientId === p.id && (
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* Record detail */}
        {selected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>

            {/* Patient header */}
            <div className="card">
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar initials={selected.patientName.split(' ').map(w=>w[0]).join('')} color={selected.color} size={54} fontSize={16} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{selected.patientName}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>{selected.patientId}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm" onClick={() => onToast('Record exported as PDF', 'info')}>Export PDF</button>
                  <button className="btn btn-primary btn-sm" onClick={() => onToast('New visit note added', 'success')}>+ Add Visit Note</button>
                </div>
              </div>
            </div>

            {/* Visit tabs */}
            <div className="flex gap-2">
              {selected.visits.map((v, i) => (
                <button key={i}
                  className={`btn btn-sm ${visitIdx === i ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setVisitIdx(i)}
                >
                  Visit — {v.date}
                </button>
              ))}
            </div>

            {visit && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Clinical notes */}
                <div className="card" style={{ gridColumn: '1/-1' }}>
                  <div className="card-header">
                    <div>
                      <div className="card-title">Clinical Notes</div>
                      <div className="card-subtitle">{visit.date} · {visit.doctor}</div>
                    </div>
                    <span className="badge badge-info">{visit.diagnosis}</span>
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', background: 'var(--surface-2)', padding: '16px 18px', borderRadius: 'var(--r-md)', borderLeft: '3px solid var(--teal)' }}>
                      {visit.notes}
                    </p>
                  </div>
                </div>

                {/* Prescription */}
                <div className="card">
                  <div className="card-header"><div className="card-title">💊 Prescription</div></div>
                  <div style={{ padding: '16px 22px' }}>
                    {visit.prescription.length === 0
                      ? <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No medications prescribed.</p>
                      : visit.prescription.map((rx, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < visit.prescription.length - 1 ? '1px solid var(--border)' : 'none' }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }} />
                          <span style={{ fontSize: 13.5 }}>{rx}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Tests */}
                <div className="card">
                  <div className="card-header"><div className="card-title">🔬 Tests & Results</div></div>
                  <div style={{ padding: '16px 22px' }}>
                    {visit.tests.map((t, i) => {
                      const [name, result] = t.split(' — ')
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < visit.tests.length - 1 ? '1px solid var(--border)' : 'none' }}>
                          <span style={{ fontSize: 13.5 }}>{name}</span>
                          {result && <span className={`badge ${result === 'Normal' ? 'badge-success' : 'badge-warning'}`}>{result}</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-title">Select a patient</div>
              <div className="empty-desc">Click a patient from the list to view their medical records</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
