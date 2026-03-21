import React from 'react'

const PAGE_TITLES = {
  es: {
    dashboard:'Panel Principal', hub:'Mi Hub HC Media',
    clients:'Directorio de Clientes', leads:'Leads', households:'Familias',
    properties:'Propiedades y Listados', transactions:'Transacciones',
    appointments:'Citas y Visitas', contracts:'Contratos',
    documents:'Boveda de Documentos', receipts:'Recibos',
    tasks:'Tareas', communications:'Comunicaciones',
    reactivation:'Centro de Reactivacion', referrals:'Rastreador de Referidos',
    reports:'Reportes Financieros', staff:'Staff y Comisiones',
    hcmedia:'Workspace HC Media', ai:'Asistente IA', settings:'Configuracion',
  },
  en: {
    dashboard:'Dashboard', hub:'My HC Hub',
    clients:'Client Directory', leads:'Leads', households:'Households',
    properties:'Properties & Listings', transactions:'Transactions',
    appointments:'Appointments', contracts:'Contracts',
    documents:'Document Vault', receipts:'Receipts',
    tasks:'Tasks', communications:'Communications',
    reactivation:'Reactivation Center', referrals:'Referral Tracker',
    reports:'Financial Reports', staff:'Staff & Commissions',
    hcmedia:'HC Media Workspace', ai:'AI Assistant', settings:'Settings',
  }
}

export default function Topbar({ page, onNavigate, lang = 'es' }) {
  const now     = new Date()
  const dateStr = now.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const title   = PAGE_TITLES[lang][page] || 'HC Real Estate'
  const es      = lang === 'es'

  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>

      <div className="topbar-search">
        <svg className="topbar-search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
        </svg>
        <input
          placeholder={es ? 'Buscar clientes, propiedades... o pregunta al asistente' : 'Search clients, properties... or ask the assistant'}
          onKeyDown={e => { if (e.key === 'Enter' && onNavigate) onNavigate('ai') }}
        />
      </div>

      <div className="topbar-right">
        <button className="btn-ai" onClick={() => onNavigate && onNavigate('ai')}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6"/><path d="M5 8h6M8 5v6"/>
          </svg>
          {es ? 'Asistente IA' : 'AI Assistant'}
        </button>
        <div className="topbar-chip">{dateStr}</div>
      </div>
    </div>
  )
}
