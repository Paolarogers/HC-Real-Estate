import React from 'react'

const NAV = [
  { section: null, items: [
    { id: 'dashboard', label: 'Panel Principal', icon: 'grid' },
  ]},
  { section: 'Clientes', items: [
    { id: 'clients',    label: 'Directorio',       icon: 'users' },
    { id: 'leads',      label: 'Leads',            icon: 'zap' },
  ]},
  { section: 'Propiedades', items: [
    { id: 'properties',    label: 'Listados',         icon: 'home' },
    { id: 'transactions',  label: 'Transacciones',    icon: 'repeat' },
  ]},
  { section: 'Operaciones', items: [
    { id: 'appointments', label: 'Citas y Visitas',  icon: 'calendar' },
    { id: 'documents',    label: 'Documentos',       icon: 'file' },
    { id: 'contracts',    label: 'Contratos',        icon: 'clipboard' },
    { id: 'receipts',     label: 'Recibos',          icon: 'receipt' },
    { id: 'tasks',        label: 'Tareas',           icon: 'check' },
  ]},
  { section: 'Administración', items: [
    { id: 'reports',   label: 'Reportes',         icon: 'chart' },
    { id: 'hcmedia',   label: 'HC Media',         icon: 'star' },
    { id: 'settings',  label: 'Configuración',    icon: 'settings' },
  ]},
]

function Icon({ name }) {
  const icons = {
    grid: <><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></>,
    users: <><circle cx="6" cy="5" r="3"/><path d="M1 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/><path d="M11 5.5c1.5.5 2.5 2 2.5 3.5 0 1.5-.5 2.5-1.5 3"/></>,
    zap: <><path d="M13 1L5 9h7l-5 6"/></>,
    home: <><path d="M1 7L8 1l7 6"/><path d="M3 6v8a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1V6"/></>,
    repeat: <><path d="M1 4h10l-3-3M15 12H5l3 3"/><path d="M14 4a6 6 0 010 8"/><path d="M2 4a6 6 0 000 8"/></>,
    calendar: <><rect x="1" y="3" width="14" height="12" rx="1.5"/><path d="M5 1v4M11 1v4M1 7h14"/></>,
    file: <><path d="M9 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V6L9 1z"/><path d="M9 1v5h5"/></>,
    clipboard: <><rect x="3" y="2" width="10" height="13" rx="1"/><path d="M5 2V1h6v1"/><path d="M5 7h6M5 10h4"/></>,
    receipt: <><rect x="2" y="1" width="12" height="14" rx="1"/><path d="M5 5h6M5 8h6M5 11h3"/></>,
    check: <><rect x="1" y="1" width="14" height="14" rx="2"/><path d="M4 8l3 3 5-5"/></>,
    chart: <><path d="M1 13L5 8l4 3 3-5 3 3"/><path d="M1 15h14"/></>,
    star: <><path d="M8 1l1.9 4.1L15 6l-3.5 3.4.8 4.6L8 12l-4.3 2 .8-4.6L1 6l5.1-.9z"/></>,
    settings: <><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></>,
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="nav-icon">
      {icons[name]}
    </svg>
  )
}

export default function Sidebar({ current, onNavigate, taskCount = 0, leadCount = 0 }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-row">
          <div className="sidebar-logo">HC</div>
          <div className="sidebar-brand-name">HC Real<br />Estate</div>
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
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.id === 'tasks' && taskCount > 0 && (
                  <span className="nav-badge">{taskCount}</span>
                )}
                {item.id === 'leads' && leadCount > 0 && (
                  <span className="nav-badge" style={{ background: 'var(--gold)' }}>{leadCount}</span>
                )}
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
        <div className="sidebar-powered">
          Powered by <span>Hispanos Comunidad</span>
        </div>
      </div>
    </aside>
  )
}
