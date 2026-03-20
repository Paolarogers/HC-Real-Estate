
import React from 'react'

const NAV = [
  { section: null, items: [
    { id: 'dashboard', label: 'Panel Principal' },
    { id: 'hub', label: 'Mi Hub HC Media' },
  ]},
  { section: 'CLIENTES Y LEADS', items: [
    { id: 'clients', label: 'Clientes' },
    { id: 'leads', label: 'Leads', badge: 'lead' },
    { id: 'households', label: 'Familias' },
  ]},
  { section: 'PROPIEDADES', items: [
    { id: 'properties', label: 'Propiedades' },
    { id: 'transactions', label: 'Transacciones' },
  ]},
  { section: 'OPERACIONES', items: [
    { id: 'appointments', label: 'Citas' },
    { id: 'contracts', label: 'Contratos' },
    { id: 'documents', label: 'Documentos' },
    { id: 'receipts', label: 'Recibos' },
    { id: 'tasks', label: 'Tareas', badge: 'task' },
  ]},
  { section: 'COMUNICACIONES', items: [
    { id: 'communications', label: 'Comunicaciones' },
  ]},
  { section: 'CRECIMIENTO', items: [
    { id: 'reactivation', label: 'Reactivacion' },
    { id: 'referrals', label: 'Referidos' },
  ]},
  { section: 'NEGOCIO', items: [
    { id: 'reports', label: 'Financials' },
    { id: 'staff', label: 'Staff y Comisiones' },
  ]},
  { section: 'HC MEDIA', items: [
    { id: 'hcmedia', label: 'Workspace HC Media' },
    { id: 'ai', label: 'Asistente IA' },
  ]},
  { section: 'CONFIGURACION', items: [
    { id: 'settings', label: 'Configuracion' },
  ]},
]

export default function Sidebar({ current, onNavigate, taskCount = 0, leadCount = 0 }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-row">
          <div className="sidebar-logo">HC</div>
          <div>
            <div className="sidebar-brand-name">HC Real Estate</div>
          </div>
        </div>
        <div className="sidebar-brand-sub">Hispanos Comunidad</div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map((section, si) => (
          <div key={si}>
            {section.section && (
              <div className="sidebar-section-label">{section.section}</div>
            )}
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item${current === item.id ? ' active' : ''}`}
                onClick={() => onNavigate(item.id)}>
                <span className="nav-dot" />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge === 'task' && taskCount > 0 && (
                  <span className="nav-badge">{taskCount}</span>
                )}
                {item.badge === 'lead' && leadCount > 0 && (
                  <span className="nav-badge nav-badge-gold">{leadCount}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-powered">Powered by <span>Hispanos Comunidad</span></div>
        <div className="sidebar-user">
          <div className="sidebar-avatar">PR</div>
          <div>
            <div className="sidebar-user-name">Paola Rogers</div>
            <div className="sidebar-user-role">Fundadora y Presidenta</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
