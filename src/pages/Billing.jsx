import React, { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import Modal from '../components/Modal.jsx'
import { invoices as initialInvoices } from '../data/mockData.js'

const STATUS_BADGE = {
  Paid:    'badge-success',
  Pending: 'badge-warning',
  Overdue: 'badge-danger',
}

export default function Billing({ showModal, onCloseModal, onToast }) {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [selected, setSelected] = useState(invoices[1])
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({ patient: '', items: [{ desc: '', amount: '' }, { desc: '', amount: '' }] })

  const filtered = filter === 'All' ? invoices : invoices.filter(i => i.status === filter)

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((s, i) => s + i.amount, 0)
  const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0)

  function markPaid(id) {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'Paid' } : i))
    if (selected?.id === id) setSelected(prev => ({ ...prev, status: 'Paid' }))
    onToast('Invoice marked as paid')
  }

  function handleCreateInvoice() {
    if (!form.patient) { onToast('Enter patient name', 'error'); return }
    const items = form.items.filter(i => i.desc && i.amount)
    if (!items.length) { onToast('Add at least one line item', 'error'); return }
    const total = items.reduce((s, i) => s + parseFloat(i.amount || 0), 0)
    const initials = form.patient.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const newInv = {
      id: `INV-00${53 + invoices.length - 5}`,
      patient: form.patient,
      patientId: '—',
      date: '2026-03-28',
      amount: total,
      status: 'Pending',
      avatar: initials,
      color: '#2563eb',
      items: items.map(i => ({ desc: i.desc, amount: parseFloat(i.amount) }))
    }
    setInvoices(prev => [newInv, ...prev])
    setSelected(newInv)
    setForm({ patient: '', items: [{ desc: '', amount: '' }, { desc: '', amount: '' }] })
    onCloseModal()
    onToast(`Invoice ${newInv.id} created for ${form.patient}`)
  }

  function addItem() {
    setForm(prev => ({ ...prev, items: [...prev.items, { desc: '', amount: '' }] }))
  }

  return (
    <div className="fade-up" style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

      {/* Revenue summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Collected', value: `$${totalRevenue.toLocaleString()}`, icon: '✅', bg: 'var(--success-bg)', color: 'var(--success)' },
          { label: 'Pending Payments', value: `$${totalPending.toLocaleString()}`, icon: '⏳', bg: 'var(--warning-bg)', color: 'var(--warning)' },
          { label: 'Overdue Invoices', value: `$${totalOverdue.toLocaleString()}`, icon: '🚨', bg: 'var(--danger-bg)', color: 'var(--danger)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>

        {/* Invoice list */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Invoices</div>
            <div className="flex gap-2">
              {['All', 'Paid', 'Pending', 'Overdue'].map(f => (
                <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr>
                <th>Invoice</th><th>Patient</th><th>Date</th><th>Amount</th><th>Status</th><th></th>
              </tr></thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id} onClick={() => setSelected(inv)} style={{ cursor: 'pointer', background: selected?.id === inv.id ? 'var(--teal-dim)' : '' }}>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}>{inv.id}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Avatar initials={inv.avatar} color={inv.color} size={28} fontSize={10} />
                        <span style={{ fontWeight: 500, fontSize: 13.5 }}>{inv.patient}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{inv.date}</td>
                    <td style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td><span className={`badge ${STATUS_BADGE[inv.status] || 'badge-gray'}`}>{inv.status}</span></td>
                    <td>
                      {inv.status !== 'Paid' && (
                        <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); markPaid(inv.id) }}>Mark Paid</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice detail panel */}
        {selected && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <div>
                <div className="card-title">{selected.id}</div>
                <div className="card-subtitle">{selected.patient} · {selected.date}</div>
              </div>
              <span className={`badge ${STATUS_BADGE[selected.status] || 'badge-gray'}`}>{selected.status}</span>
            </div>

            {/* Line items */}
            <div style={{ flex: 1 }}>
              {selected.items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '13px 22px',
                  borderBottom: '1px solid #f1f5f9',
                  fontSize: 13.5,
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
                  <span style={{ fontWeight: 600 }}>${item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 22px',
              background: 'var(--surface-2)',
              borderTop: '2px solid var(--border)',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>
                ${selected.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Actions */}
            <div style={{ padding: '16px 22px', display: 'flex', gap: 10, borderTop: '1px solid var(--border)' }}>
              {selected.status !== 'Paid' ? (
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => markPaid(selected.id)}>
                  ✓ Mark as Paid
                </button>
              ) : (
                <div className="flex items-center gap-2" style={{ flex: 1, color: 'var(--success)', fontWeight: 600, fontSize: 13.5 }}>
                  <span>✓</span> Payment Received
                </div>
              )}
              <button className="btn btn-ghost" onClick={() => onToast('Invoice exported as PDF', 'info')}>
                📄 Export
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New invoice modal */}
      {showModal && (
        <Modal title="Create New Invoice" onClose={onCloseModal}
          footer={
            <>
              <button className="btn btn-ghost" onClick={onCloseModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateInvoice}>Create Invoice</button>
            </>
          }
        >
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Patient Name *</label>
            <input className="form-input" placeholder="Full patient name" value={form.patient} onChange={e => setForm(p => ({ ...p, patient: e.target.value }))} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label className="form-label" style={{ display: 'block', marginBottom: 10 }}>Line Items *</label>
            {form.items.map((item, i) => (
              <div key={i} className="flex gap-2" style={{ marginBottom: 8 }}>
                <input className="form-input" placeholder="Description (e.g. Consultation Fee)" value={item.desc}
                  onChange={e => setForm(p => ({ ...p, items: p.items.map((it, idx) => idx === i ? { ...it, desc: e.target.value } : it) }))} />
                <input className="form-input" placeholder="Amount ($)" type="number" style={{ width: 120, flexShrink: 0 }} value={item.amount}
                  onChange={e => setForm(p => ({ ...p, items: p.items.map((it, idx) => idx === i ? { ...it, amount: e.target.value } : it) }))} />
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 4 }} onClick={addItem}>+ Add Item</button>
          </div>

          {/* Live total preview */}
          <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-md)', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Estimated Total</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>
              ${form.items.reduce((s, i) => s + parseFloat(i.amount || 0), 0).toFixed(2)}
            </span>
          </div>
        </Modal>
      )}
    </div>
  )
}
