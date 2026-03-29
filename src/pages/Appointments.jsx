import React, { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Modal from '../components/Modal.jsx'
import { appointments as initialAppts } from '../data/mockData.js'

const STATUS = {
  Confirmed: 'badge-success',
  Pending:   'badge-warning',
  Cancelled: 'badge-danger',
  Completed: 'badge-gray',
}

export default function Appointments({ showModal, onCloseModal, onToast }) {
  const [appts, setAppts] = useState(initialAppts)
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({ patient:'', doctor:'Dr. Faith Moyo', specialty:'Cardiology', reason:'', date:'2026-03-28', time:'09:00' })

  const filtered = filter === 'All' ? appts : appts.filter(a => a.status === filter)

  function handleBook() {
    if (!form.patient || !form.reason) { onToast('Fill in patient name and reason', 'error'); return }
    const initials = form.patient.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
    const newA = { id: `A-00${35 + appts.length}`, patient: form.patient, patientId: '—', doctor: form.doctor, specialty: form.specialty, reason: form.reason, time: form.time, date: form.date, status: 'Pending', avatar: initials, color: '#2563eb' }
    setAppts(prev => [newA, ...prev])
    setForm({ patient:'', doctor:'Dr. Faith Moyo', specialty:'Cardiology', reason:'', date:'2026-03-28', time:'09:00' })
    onCloseModal()
    onToast(`Appointment booked for ${form.patient}`)
  }

  function updateStatus(id, status) {
    setAppts(prev => prev.map(a => a.id === id ? {...a, status} : a))
    onToast(`Appointment ${status.toLowerCase()}`, status === 'Cancelled' ? 'error' : 'success')
  }

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

      {/* Filter tabs */}
      <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
        <div className="flex gap-2">
          {['All','Confirmed','Pending','Cancelled'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {filtered.length} appointment{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Appointments table */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Appt ID</th><th>Patient</th><th>Date</th><th>Time</th><th>Doctor</th><th>Specialty</th><th>Reason</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{a.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar initials={a.avatar} color={a.color} size={30} fontSize={11} />
                      <span style={{ fontWeight: 500 }}>{a.patient}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a.date}</td>
                  <td style={{ fontWeight: 600 }}>{a.time}</td>
                  <td style={{ fontSize: 13 }}>{a.doctor}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{a.specialty}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{a.reason}</td>
                  <td><span className={`badge ${STATUS[a.status] || 'badge-gray'}`}>{a.status}</span></td>
                  <td>
                    <div className="flex gap-2">
                      {a.status !== 'Confirmed' && a.status !== 'Cancelled' && (
                        <button className="btn btn-ghost btn-sm" onClick={() => updateStatus(a.id, 'Confirmed')}>✓ Confirm</button>
                      )}
                      {a.status !== 'Cancelled' && (
                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(a.id, 'Cancelled')}>Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book appointment modal */}
      {showModal && (
        <Modal title="Book New Appointment" onClose={onCloseModal}
          footer={
            <>
              <button className="btn btn-ghost" onClick={onCloseModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleBook}>Book Appointment</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label">Patient Name *</label>
              <input className="form-input" placeholder="Full patient name" value={form.patient} onChange={e => setForm(p=>({...p, patient: e.target.value}))} />
            </div>
            <div className="form-group"><label className="form-label">Doctor</label>
              <select className="form-select" value={form.doctor} onChange={e => setForm(p=>({...p, doctor: e.target.value}))}>
                <option>Dr. Faith Moyo</option><option>Dr. Kelvin Chirwa</option><option>Dr. Ruth Banda</option><option>Dr. Peter Zulu</option><option>Dr. Grace Ngoma</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Specialty</label>
              <select className="form-select" value={form.specialty} onChange={e => setForm(p=>({...p, specialty: e.target.value}))}>
                <option>Cardiology</option><option>Neurology</option><option>Orthopaedics</option><option>Paediatrics</option><option>General Medicine</option><option>Oncology</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Date</label>
              <input className="form-input" type="date" value={form.date} onChange={e => setForm(p=>({...p, date: e.target.value}))} />
            </div>
            <div className="form-group"><label className="form-label">Time Slot</label>
              <select className="form-select" value={form.time} onChange={e => setForm(p=>({...p, time: e.target.value}))}>
                {['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label">Reason for Visit *</label>
              <textarea className="form-textarea" placeholder="Describe reason for appointment…" value={form.reason} onChange={e => setForm(p=>({...p, reason: e.target.value}))} style={{ minHeight: 80 }} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
