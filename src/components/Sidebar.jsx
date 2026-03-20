import React from 'react'

const NAV = [
  { section: null, items: [
    { id: 'dashboard', label: 'Panel Principal' },
    { id: 'hub', label: 'Mi Hub HC Media' },
  ]},
  { section: 'Clientes', items: [
    { id: 'clients', label: 'Directorio' },
    { id: 'leads', label: 'Leads' },
    { id: 'communications', label: 'Comunicaciones' },
  ]},
  { section: 'Propiedades', items: [
    { id: 'properties', label: 'Listados' },
    { id: 'transactions', label: 'Transacciones' },
  ]},
  { section: 'Operaciones', items: [
    { id: 'appointments', label: 'Citas y Visitas' },
    { id: 'documents', label: 'Documentos' },
    { id: 'contracts', label: 'Contratos' },
    { id: 'receipts', label: 'Recibos' },
    { id: 'tasks', label: 'Tareas' },
  ]},
  { section: 'Administracion', items: [
    { id: 'reports', label: 'Reportes' },
    { id: 'hcmedia', label: 'HC Media' },
    { id: 'settings', label: 'Configuracion' },
  ]},
]

export default function Sidebar({ current, onNavigate, taskCount = 0, leadCount = 0 }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-row">
          <div className="sidebar-logo">HC</div>
          <div className="sidebar-brand-name">HC Real Estate</div>
        </div>
        <div className="sidebar-brand-sub">Hispanos Comunidad</div>
      </div>
      <nav className="sidebar-nav">
        {NAV.map((section, si) => (
          <div key={si}>
            {section.section && <div className="sidebar-section-label">{section.section}</div>}
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item${current === item.id ? ' active' : ''}`}
                onClick={() => onNavigate(item.id)}>
                <span>{item.label}</span>
                {item.id === 'tasks' && taskCount > 0 && <span className="nav-badge">{taskCount}</span>}
                {item.id === 'leads' && leadCount > 0 && <span className="nav-badge" style={{ background: 'var(--gold)' }}>{leadCount}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">PR</div>
          <div>
            <div className="sidebar-user-name">Paola Rogers</div>
            <div className="sidebar-user-role">Fundadora y Presidenta</div>
          </div>
        </div>
        <div className="sidebar-powered">Powered by <span>Hispanos Comunidad</span></div>
      </div>
    </aside>
  )
}
