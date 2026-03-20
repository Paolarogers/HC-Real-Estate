import React, { useState } from 'react'
import { demoClients, demoTransactions, demoProperties, demoReceipts, demoAppointments, LABELS } from '../data/demo.js'

function statusBadge(status) {
  const map = { active: 'badge-active', inactive: 'badge-inactive', vip: 'badge-vip', closed: 'badge-inactive' }
  const label = { active: 'Activo', inactive: 'Inactivo', vip: 'VIP', closed: 'Cerrado' }
  return <span className={`badge ${map[status] || 'badge-inactive'}`}>{label[status] || status}</span>
}

function typeBadge(type) {
  const map = { buyer: 'badge-info', seller: 'badge-gold', tenant: 'badge-slate', landlord: 'badge-success', investor: 'badge-vip', both: 'badge-slate' }
  return <span className={`badge ${map[type] || 'badge-slate'}`}>{LABELS.client_type[type] || type}</span>
}

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('perfil')

  const filtered = demoClients.filter(c => {
    const matchSearch = c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || '').includes(search) || (c.email || '').toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'all' || c.client_type === typeFilter
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const client = selected ? demoClients.find(c => c.id === selected) : null
  const clientTxns = client ? demoTransactions.filter(t => t.client_id === client.id) : []
  const clientApts = client ? demoAppointments.filter(a => a.client_id === client.id) : []
  const clientReceipts = client ? demoReceipts.filter(r => r.client_id === client.id) : []
  const lifetime = clientReceipts.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0)

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>
      {/* List */}
      <div style={{ width: selected ? 380 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Directorio de Clientes</h2>
              <p>{demoClients.length} clientes registrados</p>
            </div>
            <button className="btn btn-primary btn-sm">+ Nuevo Cliente</button>
          </div>

          <div className="filters-row">
            <input className="search-input" placeholder="Buscar por nombre, teléfono o correo..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">Todos los tipos</option>
              {Object.entries(LABELS.client_type).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="vip">VIP</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Tipo</th>
                  {!selected && <><th>Teléfono</th><th>País</th><th>Presupuesto</th></>}
                  <th>Estado</th>
                  {!selected && <th>Agente</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => { setSelected(c.id); setTab('perfil') }}
                    style={{ background: selected === c.id ? 'var(--parchment)' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{c.full_name}</div>
                      {!selected && <div style={{ fontSize: '0.77rem', color: 'var(--slate-muted)' }}>{c.email || '—'}</div>}
                    </td>
                    <td>{typeBadge(c.client_type)}</td>
                    {!selected && <>
                      <td style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>{c.phone}</td>
                      <td style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>{c.country_of_origin}</td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {c.budget_max ? `$${(c.budget_min||0).toLocaleString()} – $${c.budget_max.toLocaleString()}` : '—'}
                      </td>
                    </>}
                    <td>{statusBadge(c.status)}</td>
                    {!selected && <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>
                      {c.last_contact_at ? new Date(c.last_contact_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : '—'}
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail */}
      {client && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 50, height: 50, background: 'var(--slate)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, flexShrink: 0 }}>
                  {client.full_name.split(' ').map(w => w[0]).slice(0,2).join('')}
                </div>
                <div>
                  <h3 style={{ marginBottom: 4 }}>{client.full_name}</h3>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {statusBadge(client.status)}
                    {typeBadge(client.client_type)}
                    {client.prequalified && <span className="badge badge-success">Precalificado</span>}
                  </div>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            <div className="tabs">
              {['perfil','transacciones','citas','historial'].map(t => (
                <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t === 'perfil' ? 'Perfil' : t === 'transacciones' ? 'Transacciones' : t === 'citas' ? 'Citas' : 'Pagos'}
                </button>
              ))}
            </div>

            {tab === 'perfil' && (
              <div>
                <div className="card" style={{ marginBottom: '1rem' }}>
                  <div className="section-label">Información de contacto</div>
                  <div className="detail-grid">
                    <div className="detail-item"><span className="detail-label">Teléfono</span><span className="detail-value">{client.phone || '—'}</span></div>
                    <div className="detail-item"><span className="detail-label">Correo</span><span className="detail-value">{client.email || '—'}</span></div>
                    <div className="detail-item"><span className="detail-label">País de origen</span><span className="detail-value">{client.country_of_origin || '—'}</span></div>
                    <div className="detail-item"><span className="detail-label">Idioma</span><span className="detail-value">{client.preferred_language === 'es' ? 'Español' : client.preferred_language === 'en' ? 'English' : 'Bilingüe'}</span></div>
                    <div className="detail-item"><span className="detail-label">Tipo de cliente</span><span className="detail-value">{LABELS.client_type[client.client_type]}</span></div>
                    <div className="detail-item"><span className="detail-label">Cliente desde</span><span className="detail-value">{new Date(client.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span></div>
                  </div>
                </div>
                {(client.budget_min || client.budget_max) && (
                  <div className="card" style={{ marginBottom: '1rem' }}>
                    <div className="section-label">Perfil de búsqueda</div>
                    <div className="detail-grid">
                      <div className="detail-item"><span className="detail-label">Presupuesto mínimo</span><span className="detail-value">${(client.budget_min||0).toLocaleString()}</span></div>
                      <div className="detail-item"><span className="detail-label">Presupuesto máximo</span><span className="detail-value">${(client.budget_max||0).toLocaleString()}</span></div>
                      {client.prequalified && <div className="detail-item"><span className="detail-label">Monto precalificado</span><span className="detail-value" style={{ color: 'var(--success)', fontWeight: 500 }}>${(client.prequalified_amount||0).toLocaleString()}</span></div>}
                      {client.prequalified_lender && <div className="detail-item"><span className="detail-label">Prestamista</span><span className="detail-value">{client.prequalified_lender}</span></div>}
                    </div>
                  </div>
                )}
                <div className="card">
                  <div className="section-label">Resumen financiero</div>
                  <div className="detail-grid">
                    <div className="detail-item"><span className="detail-label">Valor de vida</span><span className="detail-value" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>${lifetime.toLocaleString()}</span></div>
                    <div className="detail-item"><span className="detail-label">Transacciones</span><span className="detail-value">{clientTxns.length}</span></div>
                    <div className="detail-item"><span className="detail-label">Citas</span><span className="detail-value">{clientApts.length}</span></div>
                    <div className="detail-item"><span className="detail-label">Recibos</span><span className="detail-value">{clientReceipts.length}</span></div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'transacciones' && (
              <div>
                {clientTxns.length === 0 ? <div className="empty-state"><h3>Sin transacciones</h3></div> : (
                  clientTxns.map(tx => {
                    const prop = demoProperties.find(p => p.id === tx.property_id)
                    return (
                      <div key={tx.id} className="card-sm" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: 4 }}>{prop?.address_line1}, {prop?.address_city}</div>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <span className="badge badge-slate">{LABELS.transaction_type[tx.transaction_type]}</span>
                              <span className="badge badge-gold">{LABELS.transaction_stage[tx.stage]}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--slate-muted)' }}>
                            {tx.transaction_number}<br/>
                            Cierre: {tx.closing_date ? new Date(tx.closing_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {tab === 'citas' && (
              <div>
                {clientApts.length === 0 ? <div className="empty-state"><h3>Sin citas</h3></div> : (
                  clientApts.map(apt => {
                    const prop = demoProperties.find(p => p.id === apt.property_id)
                    return (
                      <div key={apt.id} className="card-sm" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: 4 }}>{LABELS.appointment_type[apt.appointment_type]}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--slate-muted)' }}>
                          {new Date(apt.scheduled_at).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })} · {new Date(apt.scheduled_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {prop && <div style={{ fontSize: '0.8rem', color: 'var(--slate-muted)', marginTop: 2 }}>{prop.address_line1}</div>}
                        <span className={`badge badge-${apt.status === 'confirmed' ? 'success' : 'slate'}`} style={{ marginTop: 6 }}>
                          {apt.status === 'confirmed' ? 'Confirmada' : 'Programada'}
                        </span>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {tab === 'historial' && (
              <div>
                {clientReceipts.length === 0 ? <div className="empty-state"><h3>Sin pagos registrados</h3></div> : (
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Recibo</th><th>Fecha</th><th>Servicio</th><th>Total</th><th>Estado</th></tr></thead>
                      <tbody>
                        {clientReceipts.map(r => (
                          <tr key={r.id}>
                            <td style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--slate-muted)' }}>{r.receipt_number}</td>
                            <td>{new Date(r.issued_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td style={{ fontSize: '0.82rem' }}>{r.service_line?.replace(/_/g,' ')}</td>
                            <td style={{ fontWeight: 500 }}>${r.total.toLocaleString()}</td>
                            <td><span className={`badge badge-${r.status === 'paid' ? 'success' : 'warning'}`}>{r.status === 'paid' ? 'Pagado' : 'Pendiente'}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
