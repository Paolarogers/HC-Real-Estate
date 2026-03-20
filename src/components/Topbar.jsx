import React from 'react'

const PAGE_TITLES = {
  dashboard: 'Panel Principal',
  clients: 'Directorio de Clientes',
  leads: 'Leads',
  properties: 'Propiedades y Listados',
  transactions: 'Transacciones',
  appointments: 'Citas y Visitas',
  documents: 'Bóveda de Documentos',
  contracts: 'Contratos',
  receipts: 'Recibos',
  tasks: 'Tareas',
  reports: 'Reportes Financieros',
  hcmedia: 'HC Media Workspace',
  settings: 'Configuración',
}

export default function Topbar({ page }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{PAGE_TITLES[page] || 'HC Real Estate'}</div>
      </div>
      <div className="topbar-right">
        <div className="topbar-chip">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}>
            <rect x="1" y="2" width="12" height="11" rx="1.5"/><path d="M5 1v3M9 1v3M1 6h12"/>
          </svg>
          {dateStr} · {timeStr}
        </div>
        <div className="topbar-chip">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}>
            <circle cx="7" cy="5" r="3"/><path d="M1 13c0-2.7 2.4-4.5 6-4.5s6 1.8 6 4.5"/>
          </svg>
          Paola Rogers
        </div>
      </div>
    </div>
  )
}
