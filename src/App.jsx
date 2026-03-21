import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ClientsPage from './pages/ClientsPage.jsx'
import LeadsPage from './pages/LeadsPage.jsx'
import HouseholdsPage from './pages/HouseholdsPage.jsx'
import PropertiesPage from './pages/PropertiesPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import AppointmentsPage from './pages/AppointmentsPage.jsx'
import ContractsPage from './pages/ContractsPage.jsx'
import DocumentsPage from './pages/DocumentsPage.jsx'
import ReceiptsPage from './pages/ReceiptsPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import CommunicationsPage from './pages/CommunicationsPage.jsx'
import ReactivationPage from './pages/ReactivationPage.jsx'
import ReferralsPage from './pages/ReferralsPage.jsx'
import FinancialsPage from './pages/FinancialsPage.jsx'
import StaffPage from './pages/StaffPage.jsx'
import HCMediaPage from './pages/HCMediaPage.jsx'
import HubPage from './pages/HubPage.jsx'
import AIAssistant from './pages/AIAssistant.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import { demoTasks, demoLeads } from './data/demo.js'
import './styles/theme.css'
import './styles/global.css'

function ComingSoon({ title }) {
  return (
    <div className="page-body">
      <div style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
        <div style={{ marginTop: '1.5rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--gold-pale)', border: '1px solid var(--gold-light)', borderRadius: 'var(--radius)', fontSize: '0.8rem', color: 'var(--gold-deep)' }}>
          En construccion — proxima fase
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [page,    setPage]    = useState('dashboard')
  const [user,    setUser]    = useState(null)   // null = not logged in
  const [lang,    setLang]    = useState('es')

  const taskCount = demoTasks.filter(t => t.status === 'open' && t.priority === 'urgent').length
  const leadCount = demoLeads.filter(l => l.status === 'new').length

  // Show login if not authenticated
  if (!user) {
    return <LoginPage onLogin={u => setUser(u)} />
  }

  const pages = {
    dashboard:      <Dashboard onNavigate={setPage} lang={lang} />,
    hub:            <HubPage lang={lang} />,
    clients:        <ClientsPage lang={lang} />,
    leads:          <LeadsPage lang={lang} />,
    households:     <HouseholdsPage lang={lang} />,
    properties:     <PropertiesPage lang={lang} />,
    transactions:   <TransactionsPage lang={lang} />,
    appointments:   <AppointmentsPage lang={lang} />,
    contracts:      <ContractsPage lang={lang} />,
    documents:      <DocumentsPage lang={lang} />,
    receipts:       <ReceiptsPage lang={lang} />,
    tasks:          <TasksPage lang={lang} />,
    communications: <CommunicationsPage lang={lang} />,
    reactivation:   <ReactivationPage lang={lang} />,
    referrals:      <ReferralsPage lang={lang} />,
    reports:        <FinancialsPage lang={lang} />,
    staff:          <StaffPage lang={lang} />,
    hcmedia:        <HCMediaPage lang={lang} />,
    ai:             <AIAssistant lang={lang} />,
    settings:       <SettingsPage lang={lang} />,
  }

  return (
    <div className="app-shell">
      <Sidebar
        current={page}
        onNavigate={setPage}
        taskCount={taskCount}
        leadCount={leadCount}
        lang={lang}
        onLangToggle={setLang}
      />
      <div className="main-content">
        <Topbar page={page} onNavigate={setPage} lang={lang} />
        <div style={{ flex: 1 }}>
          {pages[page] || <Dashboard onNavigate={setPage} lang={lang} />}
        </div>
        <footer className="copyright">
          HC Business &amp; Media &nbsp;&middot;&nbsp; Orbita &nbsp;&mdash;&nbsp;
          &copy; 2026 Hispanos Comunidad. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          &nbsp;&middot;&nbsp; Greenville, SC USA
        </footer>
      </div>
    </div>
  )
}
