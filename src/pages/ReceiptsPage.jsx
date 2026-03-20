import React, { useState } from 'react'
import { demoReceipts, demoClients, demoTransactions, demoProperties, demoStaff } from '../data/demo.js'

export default function ReceiptsPage() {
  const [selected, setSelected] = useState(null)

  const receipt = selected ? demoReceipts.find(r => r.id === selected) : null
  const client = receipt ? demoClients.find(c => c.id === receipt.client_id) : null
  const txn = receipt ? demoTransactions.find(t => t.id === receipt.transaction_id) : null
  const prop = txn ? demoProperties.find(p => p.id === txn.property_id) : null
  const staff = receipt ? demoStaff.find(s => s.id === receipt.issued_by) : null

  const totalPaid = demoReceipts.filter(r => r.status === 'paid').reduce((s, r) => s + r.total, 0)
  const totalPending = demoReceipts.filter(r => r.status === 'pending').reduce((s, r) => s + r.total, 0)

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>

      {/* List */}
      <div style={{ width: selected ? 380 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Recibos</h2>
              <p>{demoReceipts.length} recibos · ${totalPaid.toLocaleString()} cobrados</p>
            </div>
            <button className="btn btn-primary btn-sm">+ Nuevo Recibo</button>
          </div>

          {/* Summary strip */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="stat-card accent">
              <div className="stat-label">Total cobrado</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>${totalPaid.toLocaleString()}</div>
              <div className="stat-sub">Recibos pagados</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pendiente de cobro</div>
              <div className="stat-value" style={{ fontSize: '1.5rem', color: totalPending > 0 ? 'var(--warning)' : 'inherit' }}>${totalPending.toLocaleString()}</div>
              <div className="stat-sub">Recibos pendientes</div>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Recibo</th>
                  <th>Cliente</th>
                  {!selected && <th>Servicio</th>}
                  <th>Total</th>
                  <th>Estado</th>
                  {!selected && <th>Fecha</th>}
                </tr>
              </thead>
              <tbody>
                {demoReceipts.map(r => {
                  const c = demoClients.find(x => x.id === r.client_id)
                  return (
                    <tr key={r.id}
                      onClick={() => setSelected(r.id)}
                      style={{ background: selected === r.id ? 'var(--parchment)' : undefined }}>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--slate-muted)' }}>
                        {r.receipt_number}
                      </td>
                      <td style={{ fontWeight: 500 }}>{c?.full_name || '—'}</td>
                      {!selected && <td style={{ fontSize: '0.82rem' }}>{r.service_line?.replace(/_/g, ' ')}</td>}
                      <td style={{ fontWeight: 600, fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>${r.total.toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-${r.status === 'paid' ? 'success' : r.status === 'pending' ? 'warning' : 'inactive'}`}>
                          {r.status === 'paid' ? 'Pagado' : r.status === 'pending' ? 'Pendiente' : 'Anulado'}
                        </span>
                      </td>
                      {!selected && <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>
                        {new Date(r.issued_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail */}
      {receipt && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{receipt.receipt_number}</h3>
                <span className={`badge badge-${receipt.status === 'paid' ? 'success' : 'warning'}`}>
                  {receipt.status === 'paid' ? 'Pagado' : 'Pendiente'}
                </span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            {/* Amount hero */}
            <div className="card-gold" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--slate)' }}>
                ${receipt.total.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-deep)' }}>
                {new Date(receipt.issued_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Detalles del recibo</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Cliente</span><span className="detail-value" style={{ fontWeight: 500 }}>{client?.full_name || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Emitido por</span><span className="detail-value">{staff?.full_name || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Servicio</span><span className="detail-value">{receipt.service_line?.replace(/_/g, ' ')}</span></div>
                <div className="detail-item"><span className="detail-label">Método de pago</span><span className="detail-value" style={{ textTransform: 'capitalize' }}>{receipt.payment_method || '—'}</span></div>
                {prop && <div className="detail-item" style={{ gridColumn: '1 / -1' }}><span className="detail-label">Propiedad</span><span className="detail-value">{prop.address_line1}, {prop.address_city}</span></div>}
              </div>
            </div>

            {receipt.line_items?.length > 0 && (
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div className="section-label">Detalle de servicios</div>
                {receipt.line_items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < receipt.line_items.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                    <span style={{ fontSize: '0.875rem' }}>{item.service}</span>
                    <span style={{ fontWeight: 500, fontFamily: 'var(--font-heading)' }}>${(item.unit_price * (item.qty || 1)).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', fontWeight: 600 }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>${receipt.total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary btn-sm">Imprimir recibo</button>
              <button className="btn btn-secondary btn-sm">Enviar por WhatsApp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
