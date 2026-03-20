import React, { useState } from 'react'
import {
  demoHCMessages, demoAppointments, demoTasks, demoTransactions,
  demoProperties, demoClients, demoLeads, LABELS
} from '../data/demo.js'

function formatCurrency(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0)
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

const STAGE_BADGE = {
  intake: 'badge-intake', documents_gathering: 'badge-docs',
  offer_submitted: 'badge-offer', under_contract: 'badge-contract',
  inspection_appraisal: 'badge-inspection', closing_scheduled: 'badge-closing',
  closed: 'badge-closed-txn', cancelled: 'badge-cancelled'
}

export default function Dashboard({ onNavigate }) {
  const [msgIdx, setMsgIdx] = useState(0)
  const msg = demoHCMessages[msgIdx]

  const activeListings = demoProperties.filter(p => ['active', 'for_rent'].includes(p.listing_status)).length
  const openTransactions = demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage)).length
  const newLeads = demoLeads.filter(l => l.status === 'new').length
  const openTasks = demoTasks.filter(t => t.status === 'open').length
  const closingSoon = demoTransactions.filter(t => t.stage === 'closing_scheduled').length
  const monthRevenue = 6360

  const todayApts = demoAppointments.filter(a => a.status !== 'cancelled')
  const urgentTasks = demoTasks.filter(t => t.status === 'open' && t.priority === 'urgent')
  const highTasks = demoTasks.filter(t => t.status === 'open' && ['urgent','high'].includes(t.priority))

  return (
    <div className="page-body">

      {/* HC Message carousel */}
      <div className="hc-message">
        <div className="hc-message-date">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="hc-message-text">"{msg.text}"</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <div className="hc-message-author">— {msg.author}, {msg.role}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {demoHCMessages.map((_, i) => (
              <button
                key={i}
                onClick={() => setMsgIdx(i)}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === msgIdx ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                  border: 'none', padding: 0, cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="stat-grid">
        <div className="stat-card accent">
          <div className="stat-label">Listados Activos</div>
          <div className="stat-value">{activeListings}</div>
          <div className="stat-sub">Propiedades en mercado</div>
        </div>
        <div className="stat-card accent">
          <div className="stat-label">Transacciones Abiertas</div>
          <div className="stat-value">{openTransactions}</div>
          <div className="stat-sub">En proceso</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cierres en 30 Días</div>
          <div className="stat-value" style={{ color: closingSoon > 0 ? 'var(--success)' : 'inherit' }}>{closingSoon}</div>
          <div className="stat-sub">Closing programado</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Leads Nuevos</div>
          <div className="stat-value" style={{ color: newLeads > 0 ? 'var(--gold)' : 'inherit' }}>{newLeads}</div>
          <div className="stat-sub">Sin contactar</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tareas Abiertas</div>
          <div className="stat-value" style={{ color: openTasks > 0 ? 'var(--warning)' : 'inherit' }}>{openTasks}</div>
          <div className="stat-sub">{urgentTasks.length} urgentes</div>
        </div>
        <div className="stat-card accent">
          <div className="stat-label">Comisiones del Mes</div>
          <div className="stat-value" style={{ fontSize: '1.4rem' }}>{formatCurrency(monthRevenue)}</div>
          <div className="stat-sub">Recibidas este mes</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>

        {/* Today's appointments */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Citas de Hoy</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('appointments')}>Ver todas</button>
          </div>
          {todayApts.length === 0 ? (
            <div style={{ color: 'var(--slate-muted)', fontSize: '0.875rem' }}>No hay citas programadas para hoy.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {todayApts.map(apt => {
                const client = demoClients.find(c => c.id === apt.client_id)
                return (
                  <div key={apt.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 46, fontFamily: 'var(--font-heading)', fontSize: '0.88rem', color: 'var(--slate-muted)', paddingTop: 2 }}>
                      {formatTime(apt.scheduled_at)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{client?.full_name || '—'}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--slate-muted)', marginTop: 2 }}>
                        {LABELS.appointment_type[apt.appointment_type]}
                      </div>
                    </div>
                    <span className={`badge badge-${apt.status === 'confirmed' ? 'success' : 'slate'}`}>
                      {apt.status === 'confirmed' ? 'Confirmada' : 'Programada'}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Transactions pipeline */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Transacciones Activas</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('transactions')}>Ver todas</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage)).map(tx => {
              const client = demoClients.find(c => c.id === tx.client_id)
              const prop = demoProperties.find(p => p.id === tx.property_id)
              return (
                <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {prop?.address_line1}
                    </div>
                    <div style={{ fontSize: '0.77rem', color: 'var(--slate-muted)' }}>
                      {client?.full_name} · {LABELS.transaction_type[tx.transaction_type]}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${STAGE_BADGE[tx.stage] || 'badge-slate'}`}>
                      {LABELS.transaction_stage[tx.stage]}
                    </span>
                    {tx.closing_date && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--slate-muted)', marginTop: 3 }}>
                        Cierre: {new Date(tx.closing_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Priority tasks */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Tareas Prioritarias</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('tasks')}>Ver todas</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Prioridad</th>
                <th>Tarea</th>
                <th>Tipo</th>
                <th>Vence</th>
              </tr>
            </thead>
            <tbody>
              {highTasks.map(task => (
                <tr key={task.id}>
                  <td>
                    <span className={`priority-dot p-${task.priority}`} style={{ display: 'inline-block', marginRight: 6 }} />
                    <span className={`badge badge-${task.priority === 'urgent' ? 'urgent-p' : 'warning'}`}>
                      {LABELS.priority[task.priority]}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{task.title}</td>
                  <td style={{ color: 'var(--slate-muted)', fontSize: '0.8rem' }}>
                    {task.task_type?.replace(/_/g, ' ')}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>
                    {task.due_date ? new Date(task.due_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIP access */}
      <div className="vip-grid">
        <div className="vip-card vip-bonanza">
          <div className="vip-title">Bonanza VIP</div>
          <div className="vip-desc">Prequalificación acelerada para compradores. Bonanza Quick Loans — proceso rápido para nuestra comunidad.</div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem', width: 'fit-content' }}>Abrir portal</button>
        </div>
        <div className="vip-card vip-zivo">
          <div className="vip-title">Zivo Insurance VIP</div>
          <div className="vip-desc">Seguro de propietario para compradores antes del cierre. Andrea y su equipo lo coordinan directamente.</div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem', width: 'fit-content' }}>Abrir portal</button>
        </div>
      </div>

    </div>
  )
}
