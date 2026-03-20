import React, { useState } from 'react'
import { demoTransactions, demoProperties, demoClients, demoStaff, LABELS } from '../data/demo.js'

const STAGES = [
  'intake','documents_gathering','offer_submitted','under_contract',
  'inspection_appraisal','closing_scheduled','closed'
]

const STAGE_BADGE = {
  intake: 'badge-intake', documents_gathering: 'badge-docs',
  offer_submitted: 'badge-offer', under_contract: 'badge-contract',
  inspection_appraisal: 'badge-inspection', closing_scheduled: 'badge-closing',
  closed: 'badge-closed-txn', cancelled: 'badge-cancelled'
}

export default function TransactionsPage() {
  const [selected, setSelected] = useState(null)
  const [typeFilter, setTypeFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [tab, setTab] = useState('detalles')

  const filtered = demoTransactions.filter(t => {
    const matchType = typeFilter === 'all' || t.transaction_type === typeFilter
    const matchStage = stageFilter === 'all' || t.stage === stageFilter
    return matchType && matchStage
  })

  const txn = selected ? demoTransactions.find(t => t.id === selected) : null
  const prop = txn ? demoProperties.find(p => p.id === txn.property_id) : null
  const client = txn ? demoClients.find(c => c.id === txn.client_id) : null
  const agent = txn ? demoStaff.find(s => s.id === txn.assigned_agent_id) : null
  const stageIdx = txn ? STAGES.indexOf(txn.stage) : -1

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>

      {/* List panel */}
      <div style={{ width: selected ? 400 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Transacciones</h2>
              <p>{demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage)).length} abiertas · {demoTransactions.filter(t => t.stage === 'closing_scheduled').length} cerrando pronto</p>
            </div>
            <button className="btn btn-primary btn-sm">+ Nueva Transacción</button>
          </div>

          {/* Stage filter pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {STAGES.slice(0, 6).map(stage => {
              const count = demoTransactions.filter(t => t.stage === stage).length
              if (!count) return null
              return (
                <button key={stage}
                  className={`btn btn-sm ${stageFilter === stage ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setStageFilter(stageFilter === stage ? 'all' : stage)}>
                  {LABELS.transaction_stage[stage]} ({count})
                </button>
              )
            })}
          </div>

          <div className="filters-row">
            <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">Todos los tipos</option>
              {Object.entries(LABELS.transaction_type).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select className="filter-select" value={stageFilter} onChange={e => setStageFilter(e.target.value)}>
              <option value="all">Todas las etapas</option>
              {STAGES.map(s => <option key={s} value={s}>{LABELS.transaction_stage[s]}</option>)}
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Propiedad</th>
                  <th>Cliente</th>
                  <th>Tipo</th>
                  <th>Etapa</th>
                  {!selected && <><th>Comisión</th><th>Cierre</th></>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => {
                  const p = demoProperties.find(x => x.id === t.property_id)
                  const c = demoClients.find(x => x.id === t.client_id)
                  const daysToClose = t.closing_date
                    ? Math.floor((new Date(t.closing_date) - Date.now()) / (1000 * 60 * 60 * 24))
                    : null
                  return (
                    <tr key={t.id}
                      onClick={() => { setSelected(t.id); setTab('detalles') }}
                      style={{ background: selected === t.id ? 'var(--parchment)' : undefined }}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{p?.address_line1 || '—'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{t.transaction_number}</div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{c?.full_name || '—'}</td>
                      <td><span className="badge badge-slate">{LABELS.transaction_type[t.transaction_type]}</span></td>
                      <td><span className={`badge ${STAGE_BADGE[t.stage] || 'badge-slate'}`}>{LABELS.transaction_stage[t.stage]}</span></td>
                      {!selected && <>
                        <td style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          {t.commission_amount ? `$${t.commission_amount.toLocaleString()}` : '—'}
                        </td>
                        <td style={{ fontSize: '0.82rem', color: daysToClose !== null && daysToClose <= 14 ? 'var(--success)' : 'var(--slate-muted)' }}>
                          {t.closing_date ? new Date(t.closing_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : '—'}
                          {daysToClose !== null && <div style={{ fontSize: '0.7rem' }}>{daysToClose} días</div>}
                        </td>
                      </>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {txn && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{prop?.address_line1}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-muted)', marginBottom: 6 }}>
                  {prop?.address_city}, {prop?.address_state}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge badge-slate">{LABELS.transaction_type[txn.transaction_type]}</span>
                  <span className={`badge ${STAGE_BADGE[txn.stage]}`}>{LABELS.transaction_stage[txn.stage]}</span>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            {/* Stage progress bar */}
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Progreso</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                {STAGES.slice(0, 7).map((stage, i) => {
                  const isDone = i < stageIdx
                  const isCurrent = i === stageIdx
                  return (
                    <div key={stage} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                      {i > 0 && (
                        <div style={{ position: 'absolute', top: 8, left: 0, right: '50%', height: 2, background: isDone ? 'var(--gold)' : 'var(--border-light)' }} />
                      )}
                      {i < STAGES.length - 1 && (
                        <div style={{ position: 'absolute', top: 8, left: '50%', right: 0, height: 2, background: isDone ? 'var(--gold)' : 'var(--border-light)' }} />
                      )}
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: isCurrent ? 'var(--slate)' : isDone ? 'var(--gold)' : 'var(--border)',
                        margin: '0 auto 6px', position: 'relative', zIndex: 1,
                        boxShadow: isCurrent ? '0 0 0 3px var(--parchment-dark)' : 'none'
                      }} />
                      <div style={{ fontSize: '0.62rem', color: isCurrent ? 'var(--slate)' : isDone ? 'var(--gold-deep)' : 'var(--slate-muted)', fontWeight: isCurrent ? 600 : 400, lineHeight: 1.3 }}>
                        {LABELS.transaction_stage[stage]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              {['detalles', 'notas', 'documentos'].map(t => (
                <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t === 'detalles' ? 'Detalles' : t === 'notas' ? 'Notas' : 'Documentos'}
                </button>
              ))}
            </div>

            {tab === 'detalles' && (
              <div>
                <div className="card" style={{ marginBottom: '1rem' }}>
                  <div className="section-label">Partes de la transacción</div>
                  <div className="detail-grid">
                    <div className="detail-item"><span className="detail-label">Número</span><span className="detail-value">{txn.transaction_number}</span></div>
                    <div className="detail-item"><span className="detail-label">Cliente</span><span className="detail-value" style={{ fontWeight: 500 }}>{client?.full_name || '—'}</span></div>
                    <div className="detail-item"><span className="detail-label">Agente</span><span className="detail-value">{agent?.full_name || '—'}</span></div>
                    <div className="detail-item"><span className="detail-label">Fecha de apertura</span><span className="detail-value">{txn.opened_date}</span></div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom: '1rem' }}>
                  <div className="section-label">Detalles financieros</div>
                  <div className="detail-grid">
                    {txn.offer_price && <div className="detail-item"><span className="detail-label">Precio de oferta</span><span className="detail-value">${txn.offer_price.toLocaleString()}</span></div>}
                    {txn.sale_price && <div className="detail-item"><span className="detail-label">Precio acordado</span><span className="detail-value" style={{ fontWeight: 500, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>${txn.sale_price.toLocaleString()}</span></div>}
                    {txn.earnest_money && <div className="detail-item"><span className="detail-label">Earnest money</span><span className="detail-value">${txn.earnest_money.toLocaleString()}</span></div>}
                    {txn.commission_amount && <div className="detail-item"><span className="detail-label">Comisión ({((txn.commission_rate || 0.03) * 100).toFixed(1)}%)</span><span className="detail-value" style={{ color: 'var(--success)', fontWeight: 500 }}>${txn.commission_amount.toLocaleString()}</span></div>}
                    {txn.closing_date && <div className="detail-item"><span className="detail-label">Fecha de cierre</span><span className="detail-value" style={{ color: 'var(--success)', fontWeight: 500 }}>{new Date(txn.closing_date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>}
                    {txn.contract_date && <div className="detail-item"><span className="detail-label">Fecha de contrato</span><span className="detail-value">{txn.contract_date}</span></div>}
                  </div>
                </div>
              </div>
            )}

            {tab === 'notas' && (
              <div className="card">
                <div className="section-label">Notas de la transacción</div>
                {txn.transaction_notes?.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    {txn.transaction_notes.map((note, i) => (
                      <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.75rem' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--slate-muted)', marginBottom: 2 }}>
                          {note.staff} · {new Date(note.ts).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div style={{ fontSize: '0.875rem' }}>{note.note}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--slate-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Sin notas registradas.</p>
                )}
                <textarea placeholder="Agregar nota a la transacción..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
                <button className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>Guardar nota</button>
              </div>
            )}

            {tab === 'documentos' && (
              <div className="empty-state">
                <h3>Documentos pendientes</h3>
                <p>Los documentos de esta transacción aparecerán aquí.</p>
                <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Subir documento</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
