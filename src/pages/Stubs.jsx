import React from 'react'

function ComingSoon({ title, subtitle }) {
  return (
    <div className="page-body">
      <div style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
        <p style={{ color: 'var(--slate-muted)', fontSize: '0.875rem' }}>{subtitle}</p>
        <div style={{
          marginTop: '2rem',
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: 'var(--gold-pale)',
          border: '1px solid var(--gold-light)',
          borderRadius: 'var(--radius)',
          fontSize: '0.8rem',
          color: 'var(--gold-deep)'
        }}>
          En construcción — Fase siguiente
        </div>
      </div>
    </div>
  )
}

export function ClientsPage()      { return <ComingSoon title="Directorio de Clientes"    subtitle="Compradores, vendedores, inquilinos e inversionistas" /> }
export function LeadsPage()        { return <ComingSoon title="Leads"                      subtitle="Leads de Meta Ads, referidos y walk-ins" /> }
export function PropertiesPage()   { return <ComingSoon title="Propiedades y Listados"     subtitle="Listados activos, bajo contrato y en renta" /> }
export function TransactionsPage() { return <ComingSoon title="Transacciones"              subtitle="Pipeline completo de compras, ventas y rentas" /> }
export function AppointmentsPage() { return <ComingSoon title="Citas y Visitas"            subtitle="Showings, consultas y recorridos de propiedad" /> }
export function DocumentsPage()    { return <ComingSoon title="Bóveda de Documentos"       subtitle="Preaprobaciones, contratos, disclosures y más" /> }
export function ContractsPage()    { return <ComingSoon title="Contratos"                  subtitle="Purchase agreements, listing agreements y leases" /> }
export function ReceiptsPage()     { return <ComingSoon title="Recibos"                    subtitle="Comisiones y pagos de servicios" /> }
export function TasksPage()        { return <ComingSoon title="Tareas"                     subtitle="Seguimiento interno por agente y transacción" /> }
export function ReportsPage()      { return <ComingSoon title="Reportes Financieros"       subtitle="Comisiones por mes, producción por agente, P&L" /> }
export function HCMediaPage()      { return <ComingSoon title="HC Media Workspace"         subtitle="Campañas, Meta Insights y plan estratégico" /> }
export function SettingsPage()     { return <ComingSoon title="Configuración"              subtitle="Personal, integraciones y preferencias" /> }
