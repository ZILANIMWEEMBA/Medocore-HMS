import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import ToastContainer from './components/Toast.jsx'
import { useToast } from './hooks/useToast.js'

import Dashboard from './pages/Dashboard.jsx'
import Patients from './pages/Patients.jsx'
import Appointments from './pages/Appointments.jsx'
import Doctors from './pages/Doctors.jsx'
import Wards from './pages/Wards.jsx'
import MedicalRecords from './pages/MedicalRecords.jsx'
import Billing from './pages/Billing.jsx'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [showModal, setShowModal] = useState(false)
  const { toasts, addToast } = useToast()

  const mainStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: 0,
  }

  function renderPage() {
    const common = { showModal, onCloseModal: () => setShowModal(false), onToast: addToast }
    switch (page) {
      case 'dashboard':    return <Dashboard onNavigate={setPage} />
      case 'patients':     return <Patients {...common} />
      case 'appointments': return <Appointments {...common} />
      case 'doctors':      return <Doctors {...common} />
      case 'wards':        return <Wards onToast={addToast} />
      case 'records':      return <MedicalRecords onToast={addToast} />
      case 'billing':      return <Billing {...common} />
      default:             return <Dashboard onNavigate={setPage} />
    }
  }

  return (
    <>
      <Sidebar active={page} onNavigate={p => { setPage(p); setShowModal(false) }} />

      <div style={mainStyle}>
        <Topbar
          page={page}
          onSearch={() => {}}
          onAction={() => setShowModal(true)}
        />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderPage()}
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </>
  )
}
