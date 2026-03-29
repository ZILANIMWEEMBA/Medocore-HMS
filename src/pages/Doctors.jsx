import React, { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Modal from '../components/Modal.jsx'
import { doctors as initialDoctors } from '../data/mockData.js'

const STATUS_BADGE = {
  Available:  'badge-success',
  'In Surgery': 'badge-warning',
  'Off Duty': 'badge-gray',
  'On Leave': 'badge-danger',
}

export default function Doctors({ showModal, onCloseModal, onToast }) {
  const [doctors, setDoctors] = useState(initialDoctors)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ firstName:'', lastName:'', specialty:'Cardiology', days:'Mon – Fri', email:'', phone:'' })

  function handleAdd() {
    if (!form.firstName || !form.lastName) { onToast('Enter doctor name', 'error'); return }
    const name = `Dr. ${form.firstName} ${form.lastName}`
    const initials = (form.firstName[0] + form.lastName[0]).toUpperCase()
    const colors = ['#2563eb','#7c3aed','#059669','#dc2626','#0891b2']
    const color = colors[doctors.length % colors.length]
    const newD = { id: `D-00${doctors.length + 1}`, name, specialty: form.specialty, patients: 0, days: form.days, status: 'Available', avatar: initials, color, qualifications: 'MBChB', email: form.email, phone: form.phone, bio: 'Newly registered staff member.' }
    setDoctors(prev => [...prev, newD])
    setForm({ firstName:'', lastName:'', specialty:'Cardiology', days:'Mon – Fri', email:'', phone:'' })
    onCloseModal()
    onToast(`${name} added to staff directory`)
  }

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

      {/* Doctor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {doctors.map(d => (
          <div key={d.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onClick={() => setSelected(d)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
          >
            <div style={{ padding: '20px 22px' }}>
              <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
                <Avatar initials={d.avatar} color={d.color} size={46} fontSize={15} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)' }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{d.specialty}</div>
                </div>
                <span className={`badge ${STATUS_BADGE[d.status] || 'badge-gray'}`}>{d.status}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>{d.bio}</div>
              <hr className="divider" style={{ margin: '10px 0' }} />
              <div className="flex justify-between" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                <span>📅 {d.days}</span>
                <span>👤 {d.patients} patients today</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All doctors table */}
      <div className="card">
        <div className="card-header"><div className="card-title">Staff Directory</div></div>
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Doctor</th><th>Specialty</th><th>Qualifications</th><th>Email</th><th>Availability</th><th>Today</th><th>Status</th>
            </tr></thead>
            <tbody>
              {doctors.map(d => (
                <tr key={d.id} onClick={() => setSelected(d)} style={{ cursor: 'pointer' }}>
                  <td><div className="flex items-center gap-2"><Avatar initials={d.avatar} color={d.color} /><span style={{ fontWeight: 500 }}>{d.name}</span></div></td>
                  <td style={{ fontSize: 13 }}>{d.specialty}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.qualifications}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--info)' }}>{d.email}</td>
                  <td style={{ fontSize: 13 }}>{d.days}</td>
                  <td><span style={{ fontWeight: 600 }}>{d.patients}</span> <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>patients</span></td>
                  <td><span className={`badge ${STATUS_BADGE[d.status] || 'badge-gray'}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor profile modal */}
      {selected && (
        <Modal title="Doctor Profile" onClose={() => setSelected(null)}
          footer={<button className="btn btn-primary" onClick={() => setSelected(null)}>Close</button>}
        >
          <div className="flex gap-4 items-center" style={{ marginBottom: 20 }}>
            <Avatar initials={selected.avatar} color={selected.color} size={56} fontSize={16} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700 }}>{selected.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>{selected.specialty} · {selected.qualifications}</p>
              <span className={`badge ${STATUS_BADGE[selected.status]}`} style={{ marginTop: 8, display: 'inline-flex' }}>{selected.status}</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7, marginBottom: 20, background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--r-md)' }}>{selected.bio}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Email', selected.email],['Phone', selected.phone],['Availability', selected.days],['Patients Today', selected.patients],['Department', selected.specialty],['Staff ID', selected.id]].map(([l,v]) => (
              <div key={l} style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Add doctor modal */}
      {showModal && (
        <Modal title="Add New Doctor" onClose={onCloseModal}
          footer={<><button className="btn btn-ghost" onClick={onCloseModal}>Cancel</button><button className="btn btn-primary" onClick={handleAdd}>Add Doctor</button></>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" placeholder="Faith" value={form.firstName} onChange={e => setForm(p=>({...p,firstName:e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Last Name *</label><input className="form-input" placeholder="Moyo" value={form.lastName} onChange={e => setForm(p=>({...p,lastName:e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Specialty</label>
              <select className="form-select" value={form.specialty} onChange={e => setForm(p=>({...p,specialty:e.target.value}))}>
                {['Cardiology','Neurology','Orthopaedics','Paediatrics','General Medicine','Oncology','Radiology','Anaesthesia'].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Availability</label>
              <select className="form-select" value={form.days} onChange={e => setForm(p=>({...p,days:e.target.value}))}>
                {['Mon – Fri','Mon – Sat','Tue – Sat','Wed – Sun','Mon – Thu','Weekends Only'].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="doctor@medicore.zw" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} /></div>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="+260 77 000 0000" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} /></div>
          </div>
        </Modal>
      )}
    </div>
  )
}
