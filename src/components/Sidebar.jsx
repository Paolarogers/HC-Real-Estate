import React, { useState } from 'react'

const NAV = [
  { section: null, items: [
    { id: 'dashboard',  labelEs: 'Panel Principal',      labelEn: 'Dashboard' },
    { id: 'hub',        labelEs: 'Mi Hub HC Media',       labelEn: 'My HC Hub' },
  ]},
  { sectionEs: 'CLIENTES Y LEADS', sectionEn: 'CLIENTS & LEADS', items: [
    { id: 'clients',    labelEs: 'Clientes',              labelEn: 'Clients' },
    { id: 'leads',      labelEs: 'Leads',                 labelEn: 'Leads',   badge: 'lead' },
    { id: 'households', labelEs: 'Familias',              labelEn: 'Households' },
  ]},
  { sectionEs: 'PROPIEDADES', sectionEn: 'PROPERTIES', items: [
    { id: 'properties',   labelEs: 'Propiedades',         labelEn: 'Properties' },
    { id: 'transactions', labelEs: 'Transacciones',       labelEn: 'Transactions' },
  ]},
  { sectionEs: 'OPERACIONES', sectionEn: 'OPERATIONS', items: [
    { id: 'appointments', labelEs: 'Citas',               labelEn: 'Appointments' },
    { id: 'contracts',    labelEs: 'Contratos',           labelEn: 'Contracts' },
    { id: 'documents',    labelEs: 'Documentos',          labelEn: 'Documents' },
    { id: 'receipts',     labelEs: 'Recibos',             labelEn: 'Receipts' },
    { id: 'tasks',        labelEs: 'Tareas',              labelEn: 'Tasks', badge: 'task' },
  ]},
  { sectionEs: 'COMUNICACIONES', sectionEn: 'COMMUNICATIONS', items: [
    { id: 'communications', labelEs: 'Comunicaciones',   labelEn: 'Communications' },
  ]},
  { sectionEs: 'CRECIMIENTO', sectionEn: 'GROWTH', items: [
    { id: 'reactivation', labelEs: 'Reactivacion',        labelEn: 'Reactivation' },
    { id: 'referrals',    labelEs: 'Referidos',           labelEn: 'Referrals' },
  ]},
  { sectionEs: 'NEGOCIO', sectionEn: 'BUSINESS', items: [
    { id: 'reports', labelEs: 'Financials',               labelEn: 'Financials' },
    { id: 'staff',   labelEs: 'Staff y Comisiones',       labelEn: 'Staff & Commissions' },
  ]},
  { sectionEs: 'HC MEDIA', sectionEn: 'HC MEDIA', items: [
    { id: 'hcmedia', labelEs: 'Workspace HC Media',       labelEn: 'HC Media Workspace' },
    { id: 'ai',      labelEs: 'Asistente IA',             labelEn: 'AI Assistant' },
  ]},
  { sectionEs: 'CONFIGURACION', sectionEn: 'SETTINGS', items: [
    { id: 'settings', labelEs: 'Configuracion',           labelEn: 'Settings' },
  ]},
]

export default function Sidebar({ current, onNavigate, taskCount = 0, leadCount = 0, lang = 'es', onLangToggle }) {
  const es = lang === 'es'

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-row">
          <img
            src="/HC_logo_3d.png"
            alt="HC"
            style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0, mixBlendMode: 'normal' }}
            onError={e => { e.target.style.display='none' }}
          />
          <div>
            <div className="sidebar-brand-name">HC Real Estate</div>
          </div>
        </div>
        <div className="sidebar-brand-sub">Hispanos Comunidad</div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV.map((section, si) => (
          <div key={si}>
            {(section.sectionEs || section.sectionEn) && (
              <div className="sidebar-section-label">
                {es ? section.sectionEs : section.sectionEn}
              </div>
            )}
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item${current === item.id ? ' active' : ''}`}
                onClick={() => onNavigate(item.id)}>
                <span className="nav-dot" />
                <span style={{ flex: 1 }}>{es ? item.labelEs : item.labelEn}</span>
                {item.badge === 'task' && taskCount > 0 && <span className="nav-badge">{taskCount}</span>}
                {item.badge === 'lead' && leadCount > 0 && <span className="nav-badge nav-badge-gold">{leadCount}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* HC logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <img
            src="/HC_logo_3d.png"
            alt="HC"
            style={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.85 }}
            onError={e => { e.target.style.display='none' }}
          />
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--sidebar-muted)', lineHeight: 1.3 }}>
              Powered by HC Business &amp; Media
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>Greenville, SC USA</div>
          </div>
        </div>

        {/* Language toggle */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
          <button
            onClick={() => onLangToggle && onLangToggle('es')}
            style={{ background: es ? 'rgba(184,154,74,0.2)' : 'transparent', border: '1px solid rgba(184,154,74,0.2)', borderRadius: 4, padding: '0.15rem 0.5rem', fontSize: '0.67rem', color: es ? 'var(--gold-light)' : 'var(--sidebar-muted)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            ES
          </button>
          <button
            onClick={() => onLangToggle && onLangToggle('en')}
            style={{ background: !es ? 'rgba(184,154,74,0.2)' : 'transparent', border: '1px solid rgba(184,154,74,0.2)', borderRadius: 4, padding: '0.15rem 0.5rem', fontSize: '0.67rem', color: !es ? 'var(--gold-light)' : 'var(--sidebar-muted)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            EN
          </button>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">PR</div>
          <div>
            <div className="sidebar-user-name">Paola Rogers</div>
            <div className="sidebar-user-role">{es ? 'Fundadora y Presidenta' : 'Founder & President'}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
