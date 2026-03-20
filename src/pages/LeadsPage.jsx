import React, { useState } from 'react'
import { demoLeads, demoStaff, LABELS } from '../data/demo.js'

function sourceBadge(source) {
  const map = { meta_ad: 'badge-info', referral: 'badge-success', open_house: 'badge-gold', walk_in: 'badge-slate', website: 'badge-slate', zillow: 'badge-warning' }
  return <span className={`badge ${map[source] || 'badge-slate'}`}>{LABELS.lead_source[source] || source}</span>
}

function statusBadge(status) {
  const map = { new: 'badge-urgent', contacted: 'badge-warning', qualified: 'badge-gold', showing_scheduled: 'badge-info', converted: 'badge-success', lost: 'badge-inactive', no_response: 'badge-inactive' }
  return <span className={`badge ${map[status] || 'badge-slate'}`}>{LABELS.lead_status[status] || status}</span>
}

export default function LeadsPage() {
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = demoLeads.filter(l => {
    const matchSearch = l.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (l.phone || '').includes(search)
    const matchStatus = statusFilter === 'all' || l.status === statusFilter
    return matchSearch && matchStatus
  })

  const lead = selected ? demoLeads.find(l => l.id === selected) : null
  const agent = lead ? demoStaff.find(s => s.id === lead.assigned_agent_id) : null

  const newCount = demoLeads.filter(l => l.status === 'new').length
  const qualifiedCount = demoLeads.filter(l => l.status === 'qualified').length

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>

      {/* List */}
      <div style={{ width: selected ? 380 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Leads</h2>
              <p>{newCount} nuevos sin contactar · {qualifiedCount} calificados</p>
            </div>
            <button className="btn btn-primary btn-sm">+ Nuevo Lead</button>
          </div>

          {/* Alert for new leads */}
          {newCount > 0 && (
            <div className="alert-strip alert-warning" style={{ marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{newCount} lead{newCount > 1 ? 's' : ''} sin contactar</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>El primer contacto dentro de las primeras 24 horas es crítico para la conversión.</div>
              </div>
            </div>
          )}

          <div className="filters-row">
            <input className="search-input" placeholder="Buscar por nombre o teléfono..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">Todos los estados</option>
              {Object.entries(LABELS.lead_status).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Fuente</th>
                  <th>Interés</th>
                  {!selected && <><th>Presupuesto</th><th>Zona</th></>}
                  <th>Estado</th>
                  {!selected && <th>Recibido</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(l => (
                  <tr key={l.id}
                    onClick={() => setSelected(l.id)}
                    style={{ background: selected === l.id ? 'var(--parchment)' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{l.full_name}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--slate-muted)' }}>{l.phone}</div>
                    </td>
                    <td>{sourceBadge(l.source)}</td>
                    <td style={{ fontSize: '0.82rem' }}>
                      {l.service_interest === 'buy' ? 'Comprar' : l.service_interest === 'rent' ? 'Rentar' : l.service_interest === 'sell' ? 'Vender' : 'Invertir'}
                    </td>
                    {!selected && <>
                      <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{l.budget_range || '—'}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{l.area_interest || '—'}</td>
                    </>}
                    <td>{statusBadge(l.status)}</td>
                    {!selected && <td style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>
                      {new Date(l.received_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail */}
      {lead && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{lead.full_name}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  {sourceBadge(lead.source)}
                  {statusBadge(lead.status)}
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Información del lead</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Teléfono</span><span className="detail-value">{lead.phone || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Interés</span><span className="detail-value">{lead.service_interest === 'buy' ? 'Comprar' : lead.service_interest === 'rent' ? 'Rentar' : 'Vender'}</span></div>
                <div className="detail-item"><span className="detail-label">Presupuesto</span><span className="detail-value">{lead.budget_range || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Zona de interés</span><span className="detail-value">{lead.area_interest || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Agente asignado</span><span className="detail-value">{agent?.full_name || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Recibido</span><span className="detail-value">{new Date(lead.received_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Acciones rápidas</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm">Llamar ahora</button>
                <button className="btn btn-secondary btn-sm">Enviar WhatsApp</button>
                <button className="btn btn-gold btn-sm">Programar visita</button>
                <button className="btn btn-secondary btn-sm">Convertir a cliente</button>
              </div>
            </div>

            <div className="card">
              <div className="section-label">Notas</div>
              <textarea placeholder="Agregar nota sobre este lead..." rows={3} style={{ width: '100%', resize: 'vertical', marginBottom: '0.5rem' }} />
              <button className="btn btn-primary btn-sm">Guardar nota</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
