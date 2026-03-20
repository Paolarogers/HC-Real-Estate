
import React from 'react'

const TITLES = {
  dashboard:'Panel Principal', hub:'Mi Hub HC Media',
  clients:'Directorio de Clientes', leads:'Leads', households:'Familias',
  properties:'Propiedades y Listados', transactions:'Transacciones',
  appointments:'Citas y Visitas', contracts:'Contratos',
  documents:'Boveda de Documentos', receipts:'Recibos',
  tasks:'Tareas', communications:'Comunicaciones',
  reactivation:'Centro de Reactivacion', referrals:'Rastreador de Referidos',
  reports:'Reportes Financieros', staff:'Staff y Comisiones',
  hcmedia:'Workspace HC Media', ai:'Asistente IA', settings:'Configuracion',
}

export default function Topbar({ page, onNavigate }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="topbar">
      <div className="topbar-title">{TITLES[page] || 'HC Real Estate'}</div>

      <div className="topbar-search">
        <svg className="topbar-search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
        </svg>
        <input
          placeholder={`Buscar clientes, propiedades... o pregunta al asistente`}
          onKeyDown={e => { if (e.key === 'Enter' && onNavigate) onNavigate('ai') }}
        />
      </div>

      <div className="topbar-right">
        <button className="btn-ai" onClick={() => onNavigate && onNavigate('ai')}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
          </svg>
          Asistente IA
        </button>
        <div className="topbar-chip">{dateStr}</div>
      </div>
    </div>
  )
}
