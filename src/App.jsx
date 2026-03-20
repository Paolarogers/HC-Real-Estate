import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import {
  ClientsPage, LeadsPage, PropertiesPage, TransactionsPage,
  AppointmentsPage, DocumentsPage, ContractsPage, ReceiptsPage,
  TasksPage, ReportsPage, HCMediaPage, SettingsPage
} from './pages/Stubs.jsx'
import { demoTasks, demoLeads } from './data/demo.js'
import './index.css'

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
    contracts:    <ContractsPage />,
    receipts:     <ReceiptsPage />,
    tasks:        <TasksPage />,
    reports:      <ReportsPage />,
    hcmedia:      <HCMediaPage />,
    settings:     <SettingsPage />,
  }

  return (
    <div className="app-shell">
      <Sidebar
        current={page}
        onNavigate={setPage}
        taskCount={taskCount}
        leadCount={leadCount}
      />
      <div className="main-content">
        <Topbar page={page} />
        {pages[page] || <Dashboard onNavigate={setPage} />}
        <footer className="copyright">
          © 2026 Paola Rogers. Todos los derechos reservados. Hispanos Comunidad.
          Prohibida su reproducción sin autorización escrita.
          &nbsp;·&nbsp; HC Media &nbsp;·&nbsp; Bonanza Quick Loans &nbsp;·&nbsp; Zivo Insurance
        </footer>
      </div>
    </div>
  )
}
