import React, { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Modal from '../components/Modal.jsx'
import { patients as initialPatients } from '../data/mockData.js'

const STATUS_BADGE = {
  Active:     'badge-success',
  Admitted:   'badge-warning',
  Scheduled:  'badge-info',
  Discharged: 'badge-gray',
}

const COLORS = ['#2563eb','#7c3aed','#059669','#dc2626','#d97706','#0891b2','#0f766e','#be185d','#1d4ed8','#047857']

export default function Patients({ showModal, onCloseModal, onToast }) {
  const [patients, setPatients] = useState(initialPatients)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ firstName:'', lastName:'', dob:'', gender:'Female', phone:'', blood:'O+', doctor:'Dr. Faith Moyo', nextOfKin:'', notes:'' })

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.status === filter
    return matchSearch && matchFilter
  })

  function handleRegister() {
    const name = `${form.firstName} ${form.lastName}`.trim()
    if (!name || !form.dob || !form.phone) { onToast('Please fill in required fields', 'error'); return }
    const initials = (form.firstName[0] || '') + (form.lastName[0] || '')
    const newId = `P-00${249 + patients.length - 9}`
    const color = COLORS[patients.length % COLORS.length]
    const newP = { id: newId, name, age: new Date().getFullYear() - new Date(form.dob).getFullYear(), gender: form.gender, dob: form.dob, blood: form.blood, phone: form.phone, doctor: form.doctor, ward: '—', diagnosis: 'Pending Assessment', status: 'Scheduled', admitted: new Date().toISOString().slice(0,10), allergies: '—', avatar: initials.toUpperCase(), color }
    setPatients(prev => [newP, ...prev])
    setForm({ firstName:'', lastName:'', dob:'', gender:'Female', phone:'', blood:'O+', doctor:'Dr. Faith Moyo', nextOfKin:'', notes:'' })
    onCloseModal()
    onToast(`Patient ${name} registered — ID ${newId}`)
  }

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

      {/* Filters */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-2">
          {['All','Active','Admitted','Scheduled','Discharged'].map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search patients…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex gap-3" style={{ marginBottom: 20 }}>
        {[['Total', patients.length, '#2563eb'], ['Active', patients.filter(p=>p.status==='Active').length, '#22c55e'], ['Admitted', patients.filter(p=>p.status==='Admitted').length, '#f59e0b'], ['Scheduled', patients.filter(p=>p.status==='Scheduled').length, '#3b82f6']].map(([l,v,c]) => (
          <div key={l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '10px 18px', display: 'flex', gap: 8, alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', color: c }}>{v}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Patient</th><th>ID</th><th>Age</th><th>Gender</th><th>Contact</th><th>Blood</th><th>Doctor</th><th>Diagnosis</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={10}>
                  <div className="empty-state"><div className="empty-icon">🔍</div><div className="empty-title">No patients found</div><div className="empty-desc">Try adjusting your search or filter</div></div>
                </td></tr>
              )}
              {filtered.map(p => (
                <tr key={p.id} onClick={() => setSelected(p)} style={{ cursor: 'pointer' }}>
                  <td><div className="flex items-center gap-2"><Avatar initials={p.avatar} color={p.color} /><span style={{ fontWeight: 500 }}>{p.name}</span></div></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>{p.id}</td>
                  <td>{p.age}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.gender}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{p.phone}</td>
                  <td><span className="badge badge-gray">{p.blood}</span></td>
                  <td style={{ fontSize: 12.5 }}>{p.doctor}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{p.diagnosis}</td>
                  <td><span className={`badge ${STATUS_BADGE[p.status] || 'badge-gray'}`}>{p.status}</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setSelected(p) }}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient detail modal */}
      {selected && (
        <Modal title="Patient Profile" onClose={() => setSelected(null)} width={640}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => { setSelected(null); onToast('Patient record printed', 'info') }}>Print Record</button>
              <button className="btn btn-primary" onClick={() => setSelected(null)}>Close</button>
            </>
          }
        >
          <div style={{ display: 'flex', gap: 20, marginBottom: 24, alignItems: 'flex-start' }}>
            <Avatar initials={selected.avatar} color={selected.color} size={56} fontSize={16} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{selected.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>{selected.id} · {selected.gender} · {selected.age} yrs · Blood {selected.blood}</p>
              <span className={`badge ${STATUS_BADGE[selected.status]}`} style={{ marginTop: 8, display: 'inline-flex' }}>{selected.status}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[['Phone', selected.phone], ['Date of Birth', selected.dob], ['Assigned Doctor', selected.doctor], ['Ward', selected.ward], ['Diagnosis', selected.diagnosis], ['Allergies', selected.allergies], ['Admitted', selected.admitted], ['Next of Kin', '—']].map(([l,v]) => (
              <div key={l} style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)' }}>{v}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Register patient modal */}
      {showModal && (
        <Modal title="Register New Patient" onClose={onCloseModal}
          footer={
            <>
              <button className="btn btn-ghost" onClick={onCloseModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleRegister}>Register Patient</button>
            </>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" placeholder="Amara" value={form.firstName} onChange={e => setForm(p => ({...p, firstName: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Last Name *</label><input className="form-input" placeholder="Kamau" value={form.lastName} onChange={e => setForm(p => ({...p, lastName: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Date of Birth *</label><input className="form-input" type="date" value={form.dob} onChange={e => setForm(p => ({...p, dob: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Gender</label>
              <select className="form-select" value={form.gender} onChange={e => setForm(p => ({...p, gender: e.target.value}))}>
                <option>Female</option><option>Male</option><option>Other</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Phone Number *</label><input className="form-input" placeholder="+260 77 123 4567" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Blood Group</label>
              <select className="form-select" value={form.blood} onChange={e => setForm(p => ({...p, blood: e.target.value}))}>
                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Assign Doctor</label>
              <select className="form-select" value={form.doctor} onChange={e => setForm(p => ({...p, doctor: e.target.value}))}>
                <option>Dr. Faith Moyo</option><option>Dr. Kelvin Chirwa</option><option>Dr. Ruth Banda</option><option>Dr. Peter Zulu</option><option>Dr. Grace Ngoma</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Next of Kin</label><input className="form-input" placeholder="Name & relationship" value={form.nextOfKin} onChange={e => setForm(p => ({...p, nextOfKin: e.target.value}))} /></div>
          </div>
          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Reason for Visit / Notes</label>
            <textarea className="form-textarea" placeholder="Initial notes or presenting complaint…" value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} />
          </div>
        </Modal>
      )}
    </div>
  )
}
