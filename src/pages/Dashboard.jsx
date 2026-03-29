import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import Avatar from '../components/Avatar.jsx'
import { patients, appointments, revenueData, specialtyData } from '../data/mockData.js'

const STAT_CARDS = [
  { icon: '👥', label: 'Total Patients',       value: '248',    delta: '+12 this week',  up: true,  bg: 'var(--info-bg)',    accent: 'var(--info)' },
  { icon: '📅', label: "Today's Appointments", value: '34',     delta: '+5 vs yesterday', up: true,  bg: 'var(--success-bg)', accent: 'var(--success)' },
  { icon: '🛏️', label: 'Bed Occupancy',        value: '61%',    delta: '-4% vs last week', up: false, bg: 'var(--warning-bg)', accent: 'var(--warning)' },
  { icon: '💰', label: 'Revenue This Month',   value: '$18.4k', delta: '+$2.1k vs last',  up: true,  bg: 'var(--teal-dim)',   accent: 'var(--teal)' },
]

const STATUS_BADGE = {
  Active:     { cls: 'badge-success', dot: 'var(--success)' },
  Admitted:   { cls: 'badge-warning', dot: 'var(--warning)' },
  Scheduled:  { cls: 'badge-info',    dot: 'var(--info)' },
  Discharged: { cls: 'badge-gray',    dot: 'var(--text-muted)' },
}

const APPT_STATUS = {
  Confirmed: { cls: 'badge-success' },
  Pending:   { cls: 'badge-warning' },
  Cancelled: { cls: 'badge-danger' },
}

const CHART_COLORS = ['#2563eb','#7c3aed','#059669','#dc2626','#d97706']

export default function Dashboard({ onNavigate }) {
  const todayAppts = appointments.filter(a => a.date === '2026-03-28')
  const recentPatients = patients.slice(0, 5)

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} className="stat-card fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-delta ${s.up ? 'delta-up' : 'delta-down'}`}>
              <span>{s.up ? '↑' : '↓'}</span> {s.delta}
            </div>
            <div style={{ position: 'absolute', right: -10, bottom: -10, width: 70, height: 70, borderRadius: '50%', background: s.bg, opacity: 0.6 }} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>

        {/* Revenue Chart */}
        <div className="card fade-up-1">
          <div className="card-header">
            <div>
              <div className="card-title">Revenue Overview</div>
              <div className="card-subtitle">Monthly revenue vs target — 2025/26</div>
            </div>
            <span className="badge badge-teal">On Track</span>
          </div>
          <div style={{ padding: '16px 16px 8px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4b8" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#00d4b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={v => [`$${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: 10, border: '1px solid var(--border)', fontSize: 12 }} />
                <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={1.5} fill="none" strokeDasharray="4 3" dot={false} />
                <Area type="monotone" dataKey="revenue" stroke="var(--teal)" strokeWidth={2.5} fill="url(#revGrad)" dot={{ r: 4, fill: 'var(--teal)', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Specialty Bar Chart */}
        <div className="card fade-up-1">
          <div className="card-header">
            <div>
              <div className="card-title">By Specialty</div>
              <div className="card-subtitle">Patients this month</div>
            </div>
          </div>
          <div style={{ padding: '16px 16px 8px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={specialtyData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={72} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border)', fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {specialtyData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>

        {/* Recent Patients */}
        <div className="card fade-up-2">
          <div className="card-header">
            <div className="card-title">Recent Patients</div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('patients')}>View all →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr>
                <th>Patient</th><th>ID</th><th>Admitted</th><th>Doctor</th><th>Status</th>
              </tr></thead>
              <tbody>
                {recentPatients.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Avatar initials={p.avatar} color={p.color} />
                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>{p.id}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{p.admitted.slice(5).replace('-', ' ')}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>{p.doctor}</td>
                    <td><span className={`badge ${STATUS_BADGE[p.status]?.cls || 'badge-gray'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card fade-up-2">
          <div className="card-header">
            <div className="card-title">Today's Schedule</div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('appointments')}>View all →</button>
          </div>
          {todayAppts.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', minWidth: 46, paddingTop: 2 }}>{a.time}</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{a.patient}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.doctor} · {a.specialty}</div>
              </div>
              <span className={`badge ${APPT_STATUS[a.status]?.cls}`} style={{ fontSize: 11 }}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
