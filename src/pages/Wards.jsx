import React, { useState } from 'react'
import { wards as initialWards } from '../data/mockData.js'

const BED_CONFIG = {
  O: { label: 'O', bg: '#fee2e2', color: '#991b1b', title: 'Occupied' },
  A: { label: 'A', bg: '#d1fae5', color: '#065f46', title: 'Available' },
  R: { label: 'R', bg: '#fef3c7', color: '#92400e', title: 'Reserved' },
}

export default function Wards({ onToast }) {
  const [wards] = useState(initialWards)
  const [hoveredBed, setHoveredBed] = useState(null)

  const totalBeds = wards.reduce((s, w) => s + w.total, 0)
  const occupiedBeds = wards.reduce((s, w) => s + w.beds.filter(b => b === 'O').length, 0)
  const availableBeds = wards.reduce((s, w) => s + w.beds.filter(b => b === 'A').length, 0)
  const reservedBeds = wards.reduce((s, w) => s + w.beds.filter(b => b === 'R').length, 0)

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Beds', value: totalBeds, color: '#2563eb', bg: 'var(--info-bg)', icon: '🛏️' },
          { label: 'Occupied',   value: occupiedBeds, color: '#dc2626', bg: 'var(--danger-bg)', icon: '🔴' },
          { label: 'Available',  value: availableBeds, color: '#16a34a', bg: 'var(--success-bg)', icon: '🟢' },
          { label: 'Reserved',   value: reservedBeds,  color: '#d97706', bg: 'var(--warning-bg)', icon: '🟡' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ marginTop: 10 }}>
              <div className="progress">
                <div className="progress-fill" style={{ width: `${Math.round(s.value/totalBeds*100)}%`, background: s.color }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{Math.round(s.value/totalBeds*100)}% of total</div>
            </div>
          </div>
        ))}
      </div>

      {/* Ward Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {wards.map(ward => {
          const occupied = ward.beds.filter(b => b === 'O').length
          const pct = Math.round(occupied / ward.total * 100)
          return (
            <div key={ward.id} className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">{ward.name}</div>
                  <div className="card-subtitle">{ward.specialty} · {ward.total} beds total</div>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: ward.fillColor }}>{pct}%</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>occupied</span>
                </div>
              </div>

              <div style={{ padding: '16px 22px' }}>
                <div className="progress" style={{ marginBottom: 16 }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: ward.fillColor }} />
                </div>

                {/* Bed Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                  {ward.beds.map((bed, i) => {
                    const cfg = BED_CONFIG[bed]
                    const bedId = `${ward.id}-${i + 1}`
                    return (
                      <div key={i}
                        onMouseEnter={() => setHoveredBed(bedId)}
                        onMouseLeave={() => setHoveredBed(null)}
                        onClick={() => onToast(`Bed ${ward.name.split(' ')[1]}${i+1}: ${cfg.title}`, 'info')}
                        style={{
                          background: cfg.bg,
                          color: cfg.color,
                          borderRadius: 6,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, fontWeight: 700,
                          aspectRatio: '1',
                          cursor: 'pointer',
                          transition: 'transform 0.1s',
                          transform: hoveredBed === bedId ? 'scale(1.15)' : 'scale(1)',
                          title: cfg.title,
                        }}
                      >
                        {ward.name.split(' ')[1]}{i+1}
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex gap-4" style={{ marginTop: 14 }}>
                  {[['O', 'Occupied'], ['A', 'Available'], ['R', 'Reserved']].map(([k, l]) => (
                    <div key={k} className="flex items-center gap-1">
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: BED_CONFIG[k].bg, border: `1px solid ${BED_CONFIG[k].color}44` }} />
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l} ({ward.beds.filter(b=>b===k).length})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
