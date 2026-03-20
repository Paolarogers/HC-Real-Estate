import React, { useState } from 'react'
import { demoReceipts, demoTransactions, demoClients, demoStaff, LABELS } from '../data/demo.js'

export default function ReportsPage() {
  const [period, setPeriod] = useState('month')

  const totalRevenue = demoReceipts.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0)
  const pendingRevenue = demoReceipts.filter(r => r.status === 'pending').reduce((s, r) => s + r.total, 0)
  const closedTxns = demoTransactions.filter(t => t.stage === 'closed').length
  const openTxns = demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage)).length
  const projectedCommission = demoTransactions
    .filter(t => !['closed','cancelled'].includes(t.stage))
    .reduce((s, t) => s + (t.commission_amount || (t.offer_price || 0) * (t.commission_rate || 0.03)), 0)

  const agentRevenue = demoStaff.filter(s => s.role === 'agent').map(s => {
    const txns = demoTransactions.filter(t => t.assigned_agent_id === s.id)
    const commission = txns.filter(t => t.stage === 'closed').reduce((sum, t) => sum + (t.commission_amount || 0), 0)
    return { ...s, txns: txns.length, commission, open: txns.filter(t => !['closed','cancelled'].includes(t.stage)).length }
  })

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left">
          <h2>Reportes Financieros</h2>
          <p>Producción del equipo y comisiones — Marzo 2026</p>
        </div>
        <div className="page-actions">
          {['month','quarter','year'].map(p => (
            <button key={p} className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPeriod(p)}>
              {p === 'month' ? 'Este mes' : p === 'quarter' ? 'Trimestre' : 'Año'}
            </button>
          ))}
          <button className="btn btn-gold btn-sm">Exportar</button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <div className="stat-card accent">
          <div className="stat-label">Comisiones cobradas</div>
          <div className="stat-value">${totalRevenue.toLocaleString()}</div>
          <div className="stat-sub">Recibos pagados</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Comisiones pendientes</div>
          <div className="stat-value" style={{ color: 'var(--warning)', fontSize: '1.6rem' }}>${pendingRevenue.toLocaleString()}</div>
          <div className="stat-sub">Por cobrar</div>
        </div>
        <div className="stat-card accent">
          <div className="stat-label">Comisión proyectada</div>
          <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--success)' }}>${Math.round(projectedCommission).toLocaleString()}</div>
          <div className="stat-sub">{openTxns} transacciones abiertas</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transacciones cerradas</div>
          <div className="stat-value">{closedTxns}</div>
          <div className="stat-sub">Este periodo</div>
        </div>
      </div>

      {/* Revenue by service */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Ingresos por tipo de servicio</h3>
          {['commission_buy', 'commission_sell', 'commission_rent', 'consultation', 'other'].map(line => {
            const lineRevenue = demoReceipts.filter(r => r.service_line === line && r.status === 'paid').reduce((s, r) => s + r.total, 0)
            if (!lineRevenue) return null
            const pct = totalRevenue > 0 ? Math.round((lineRevenue / totalRevenue) * 100) : 0
            return (
              <div key={line} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.85rem' }}>
                  <span style={{ textTransform: 'capitalize' }}>{line.replace(/_/g, ' ')}</span>
                  <span style={{ fontWeight: 500 }}>${lineRevenue.toLocaleString()}</span>
                </div>
                <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--gold)', borderRadius: 3 }} />
                </div>
              </div>
            )
          })}
          {totalRevenue === 0 && <p style={{ color: 'var(--slate-muted)', fontSize: '0.875rem' }}>Sin ingresos registrados en este periodo.</p>}
        </div>

        {/* Agent production */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Producción por agente</h3>
          {agentRevenue.map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{a.full_name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{a.open} abiertas · {a.txns - a.open} cerradas</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, color: a.commission > 0 ? 'var(--success)' : 'var(--slate-muted)' }}>
                  ${a.commission.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-muted)' }}>comisión</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline value */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Pipeline de transacciones activas</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Etapa</th>
                <th>Precio</th>
                <th>Comisión estimada</th>
                <th>Cierre</th>
              </tr>
            </thead>
            <tbody>
              {demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage)).map(t => {
                const p = demoReceipts // just reuse imports
                const prop = null
                const client = demoClients.find(c => c.id === t.client_id)
                const estComm = (t.offer_price || 0) * (t.commission_rate || 0.03)
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 500, fontSize: '0.875rem' }}>{t.transaction_number}</td>
                    <td style={{ fontSize: '0.85rem' }}>{client?.full_name || '—'}</td>
                    <td><span className="badge badge-slate">{LABELS.transaction_type[t.transaction_type]}</span></td>
                    <td><span className="badge badge-gold">{LABELS.transaction_stage[t.stage]}</span></td>
                    <td style={{ fontFamily: 'var(--font-heading)' }}>{t.offer_price ? `$${t.offer_price.toLocaleString()}` : '—'}</td>
                    <td style={{ color: 'var(--success)', fontWeight: 500 }}>{estComm > 0 ? `$${Math.round(estComm).toLocaleString()}` : '—'}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>
                      {t.closing_date ? new Date(t.closing_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
