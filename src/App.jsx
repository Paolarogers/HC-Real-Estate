
import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
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
import ReportsPage from './pages/ReportsPage.jsx'
import StaffPage from './pages/StaffPage.jsx'
import HCMediaPage from './pages/HCMediaPage.jsx'
import HubPage from './pages/HubPage.jsx'
import AIAssistant from './pages/AIAssistant.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import { demoTasks, demoLeads } from './data/demo.js'
import './styles/theme.css'
import './styles/global.css'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const taskCount = demoTasks.filter(t=>t.status==='open'&&t.priority==='urgent').length
  const leadCount = demoLeads.filter(l=>l.status==='new').length

  const pages = {
    dashboard:      <Dashboard onNavigate={setPage} />,
    hub:            <HubPage />,
    clients:        <ClientsPage />,
    leads:          <LeadsPage />,
    households:     <HouseholdsPage />,
    properties:     <PropertiesPage />,
    transactions:   <TransactionsPage />,
    appointments:   <AppointmentsPage />,
    contracts:      <ContractsPage />,
    documents:      <DocumentsPage />,
    receipts:       <ReceiptsPage />,
    tasks:          <TasksPage />,
    communications: <CommunicationsPage />,
    reactivation:   <ReactivationPage />,
    referrals:      <ReferralsPage />,
    reports:        <ReportsPage />,
    staff:          <StaffPage />,
    hcmedia:        <HCMediaPage />,
    ai:             <AIAssistant />,
    settings:       <SettingsPage />,
  }

  return (
    <div className="app-shell">
      <Sidebar current={page} onNavigate={setPage} taskCount={taskCount} leadCount={leadCount} />
      <div className="main-content">
        <Topbar page={page} onNavigate={setPage} />
        <div style={{flex:1}}>
          {pages[page] || <Dashboard onNavigate={setPage} />}
        </div>
        <footer className="copyright">
          HC Business and Media &nbsp;&middot;&nbsp; Orbita &nbsp;&mdash;&nbsp; &copy; 2026 Hispanos Comunidad. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  )
}
