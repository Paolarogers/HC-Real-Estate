import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ClientsPage from './pages/ClientsPage.jsx'
import LeadsPage from './pages/LeadsPage.jsx'
import PropertiesPage from './pages/PropertiesPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import AppointmentsPage from './pages/AppointmentsPage.jsx'
import DocumentsPage from './pages/DocumentsPage.jsx'
import ReceiptsPage from './pages/ReceiptsPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import HCMediaPage from './pages/HCMediaPage.jsx'
import { demoTasks, demoLeads } from './data/demo.js'
import './index.css'

function ComingSoon({ title }) {
  return (
    <div className="page-body">
      <div style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
        <div style={{ marginTop: '1.5rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--gold-pale)', border: '1px solid var(--gold-light)', borderRadius: 'var(--radius)', fontSize: '0.8rem', color: 'var(--gold-deep)' }}>
          En construccion
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const taskCount = demoTasks.filter(t => t.status === 'open' && t.priority === 'urgent').length
  const leadCount = demoLeads.filter(l => l.status === 'new').length
  const pages = {
    dashboard:    <Dashboard onNavigate={setPage} />,
    clients:      <ClientsPage />,
    leads:        <LeadsPage />,
    properties:   <PropertiesPage />,
    transactions: <TransactionsPage />,
    appointments: <AppointmentsPage />,
    documents:    <DocumentsPage />,
    contracts:    <ComingSoon title="Contratos" />,
    receipts:     <ReceiptsPage />,
    tasks:        <TasksPage />,
    reports:      <ReportsPage />,
    hcmedia:      <HCMediaPage />,
    settings:     <ComingSoon title="Configuracion" />,
  }
  return (
    <div className="app-shell">
      <Sidebar current={page} onNavigate={setPage} taskCount={taskCount} leadCount={leadCount} />
      <div className="main-content">
        <Topbar page={page} />
        {pages[page] || <Dashboard onNavigate={setPage} />}
        <footer className="copyright">
          © 2026 Paola Rogers. Todos los derechos reservados. Hispanos Comunidad.
          Prohibida su reproduccion sin autorizacion escrita.
          HC Media · Bonanza Quick Loans · Zivo Insurance
        </footer>
      </div>
    </div>
  )
}
