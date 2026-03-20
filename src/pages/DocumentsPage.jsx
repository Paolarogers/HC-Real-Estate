import React, { useState } from 'react'
import { demoClients, demoTransactions, demoProperties } from '../data/demo.js'

const demoDocuments = [
  { id: 'd1', client_id: 'c1', transaction_id: 'tx1', category: 'preapproval_letter', file_name: 'Carlos_Mendoza_Preapproval.pdf', file_size_kb: 245, expiry_date: '2026-06-15', is_signed: true, created_at: '2026-02-10T00:00:00Z' },
  { id: 'd2', client_id: 'c1', transaction_id: 'tx1', category: 'purchase_agreement', file_name: 'Purchase_Agreement_123_Oak.pdf', file_size_kb: 892, is_signed: true, created_at: '2026-02-25T00:00:00Z' },
  { id: 'd3', client_id: 'c2', transaction_id: 'tx1', category: 'listing_agreement', file_name: 'Listing_Agreement_Guzman.pdf', file_size_kb: 410, is_signed: true, created_at: '2026-02-08T00:00:00Z' },
  { id: 'd4', client_id: 'c1', transaction_id: 'tx1', category: 'inspection_report', file_name: 'Inspection_123_Oak_Street.pdf', file_size_kb: 1840, created_at: '2026-03-06T00:00:00Z' },
  { id: 'd5', client_id: 'c5', category: 'photo_id', file_name: 'Pedro_Castro_ID.pdf', file_size_kb: 180, expiry_date: '2028-04-20', created_at: '2026-03-10T00:00:00Z' },
]

function categoryLabel(cat) {
  const map = {
    preapproval_letter: 'Carta de preaprobación', purchase_agreement: 'Contrato de compra',
    listing_agreement: 'Contrato de listado', inspection_report: 'Reporte de inspección',
    photo_id: 'Identificación', bank_statement: 'Estado de cuenta',
    pay_stub: 'Comprobante de ingresos', title_commitment: 'Compromiso de título',
    hud1_closing: 'Declaración de cierre', lease_agreement: 'Contrato de renta',
    disclosure: 'Disclosure', appraisal_report: 'Reporte de avalúo', other: 'Otro'
  }
  return map[cat] || cat
}

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = demoDocuments.filter(d =>
    d.file_name.toLowerCase().includes(search.toLowerCase()) ||
    categoryLabel(d.category).toLowerCase().includes(search.toLowerCase())
  )

  const doc = selected ? demoDocuments.find(d => d.id === selected) : null
  const docClient = doc ? demoClients.find(c => c.id === doc.client_id) : null
  const docTxn = doc ? demoTransactions.find(t => t.id === doc.transaction_id) : null
  const docProp = docTxn ? demoProperties.find(p => p.id === docTxn.property_id) : null

  const expiringSoon = demoDocuments.filter(d => {
    if (!d.expiry_date) return false
    const days = Math.floor((new Date(d.expiry_date) - Date.now()) / (1000 * 60 * 60 * 24))
    return days <= 30 && days >= 0
  })

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>

      {/* List */}
      <div style={{ width: selected ? 380 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Bóveda de Documentos</h2>
              <p>{demoDocuments.length} documentos · {expiringSoon.length} próximos a vencer</p>
            </div>
            <button className="btn btn-primary btn-sm">+ Subir Documento</button>
          </div>

          {expiringSoon.length > 0 && (
            <div className="alert-strip alert-warning" style={{ marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 500 }}>{expiringSoon.length} documento{expiringSoon.length > 1 ? 's' : ''} próximo{expiringSoon.length > 1 ? 's' : ''} a vencer</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Vencen en los próximos 30 días.</div>
              </div>
            </div>
          )}

          <div className="filters-row">
            <input className="search-input" placeholder="Buscar documentos..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Cliente</th>
                  {!selected && <><th>Categoría</th><th>Tamaño</th><th>Vencimiento</th></>}
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => {
                  const c = demoClients.find(x => x.id === d.client_id)
                  const daysToExpiry = d.expiry_date
                    ? Math.floor((new Date(d.expiry_date) - Date.now()) / (1000 * 60 * 60 * 24))
                    : null
                  const isExpiringSoon = daysToExpiry !== null && daysToExpiry <= 30
                  return (
                    <tr key={d.id}
                      onClick={() => setSelected(d.id)}
                      style={{ background: selected === d.id ? 'var(--parchment)' : undefined }}>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{d.file_name}</div>
                        {!selected && <div style={{ fontSize: '0.72rem', color: 'var(--slate-muted)' }}>
                          {new Date(d.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>}
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{c?.full_name || '—'}</td>
                      {!selected && <>
                        <td style={{ fontSize: '0.82rem' }}>{categoryLabel(d.category)}</td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>{d.file_size_kb ? `${d.file_size_kb} KB` : '—'}</td>
                        <td style={{ fontSize: '0.82rem', color: isExpiringSoon ? 'var(--warning)' : 'var(--slate-muted)' }}>
                          {d.expiry_date ? new Date(d.expiry_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                          {isExpiringSoon && <div style={{ fontSize: '0.7rem', color: 'var(--warning)' }}>{daysToExpiry} días</div>}
                        </td>
                      </>}
                      <td>
                        {d.is_signed
                          ? <span className="badge badge-success">Firmado</span>
                          : <span className="badge badge-slate">Pendiente</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail */}
      {doc && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{doc.file_name}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge badge-slate">{categoryLabel(doc.category)}</span>
                  {doc.is_signed
                    ? <span className="badge badge-success">Firmado</span>
                    : <span className="badge badge-warning">Pendiente de firma</span>}
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Detalles del documento</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Cliente</span><span className="detail-value" style={{ fontWeight: 500 }}>{docClient?.full_name || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Categoría</span><span className="detail-value">{categoryLabel(doc.category)}</span></div>
                <div className="detail-item"><span className="detail-label">Tamaño</span><span className="detail-value">{doc.file_size_kb ? `${doc.file_size_kb} KB` : '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Subido</span><span className="detail-value">{new Date(doc.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                {doc.expiry_date && <div className="detail-item"><span className="detail-label">Vencimiento</span><span className="detail-value" style={{ color: 'var(--warning)', fontWeight: 500 }}>{new Date(doc.expiry_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>}
                {docProp && <div className="detail-item" style={{ gridColumn: '1 / -1' }}><span className="detail-label">Propiedad</span><span className="detail-value">{docProp.address_line1}, {docProp.address_city}</span></div>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm">Ver documento</button>
              <button className="btn btn-secondary btn-sm">Descargar</button>
              <button className="btn btn-secondary btn-sm">Enviar por WhatsApp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
