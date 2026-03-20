import React, { useState } from 'react'
import { demoProperties, demoTransactions, demoClients, demoStaff, LABELS } from '../data/demo.js'

function listingBadge(status) {
  const map = {
    active: 'badge-active-listing', under_contract: 'badge-under-contract',
    sold: 'badge-sold', for_rent: 'badge-for-rent', rented: 'badge-rented',
    coming_soon: 'badge-coming-soon', withdrawn: 'badge-withdrawn', off_market: 'badge-sold'
  }
  return <span className={`badge ${map[status] || 'badge-slate'}`}>{LABELS.listing_status[status] || status}</span>
}

function formatPrice(prop) {
  if (prop.rental_price_mo) return `$${prop.rental_price_mo.toLocaleString()}/mes`
  if (prop.listing_price) return `$${prop.listing_price.toLocaleString()}`
  return '—'
}

export default function PropertiesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('list')

  const filtered = demoProperties.filter(p => {
    const matchSearch = p.address_line1.toLowerCase().includes(search.toLowerCase()) ||
      p.address_city.toLowerCase().includes(search.toLowerCase()) ||
      (p.mls_number || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.listing_status === statusFilter
    const matchType = typeFilter === 'all' || p.property_type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const prop = selected ? demoProperties.find(p => p.id === selected) : null
  const propTxn = prop ? demoTransactions.find(t => t.property_id === prop.id) : null
  const propClient = propTxn ? demoClients.find(c => c.id === propTxn.client_id) : null
  const agent = prop ? demoStaff.find(s => s.id === prop.listing_agent_id) : null
  const daysOnMarket = prop ? Math.floor((Date.now() - new Date(prop.listing_date)) / (1000*60*60*24)) : 0

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>
      {/* List panel */}
      <div style={{ width: selected ? 420 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Propiedades y Listados</h2>
              <p>{filtered.length} propiedades · {demoProperties.filter(p => p.listing_status === 'active').length} activas</p>
            </div>
            <div className="page-actions">
              <button className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('list')}>Lista</button>
              <button className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('grid')}>Cuadrícula</button>
              <button className="btn btn-gold btn-sm">+ Nueva Propiedad</button>
            </div>
          </div>

          <div className="filters-row">
            <input className="search-input" placeholder="Buscar por dirección, ciudad o MLS..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">Todos los estados</option>
              {Object.entries(LABELS.listing_status).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">Todos los tipos</option>
              {Object.entries(LABELS.property_type).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          {view === 'grid' && !selected ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {filtered.map(p => (
                <div key={p.id} className="property-card" onClick={() => setSelected(p.id)}>
                  <div className="property-card-photo">
                    <div style={{ position: 'absolute', top: 8, left: 8 }}>{listingBadge(p.listing_status)}</div>
                    <span style={{ color: 'var(--slate-muted)', fontSize: '0.75rem' }}>Sin foto disponible</span>
                  </div>
                  <div className="property-card-body">
                    <div className="property-price">{formatPrice(p)}</div>
                    <div className="property-address">{p.address_line1}, {p.address_city} {p.address_state}</div>
                    <div className="property-meta">
                      {p.bedrooms && <span>{p.bedrooms} hab</span>}
                      {p.bathrooms && <span>{p.bathrooms} baños</span>}
                      {p.sq_ft && <span>{p.sq_ft.toLocaleString()} sqft</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Propiedad</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    {!selected && <><th>Días en mercado</th><th>MLS</th></>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const dom = Math.floor((Date.now() - new Date(p.listing_date)) / (1000*60*60*24))
                    return (
                      <tr key={p.id} onClick={() => setSelected(p.id)} style={{ background: selected === p.id ? 'var(--parchment)' : undefined }}>
                        <td>
                          <div style={{ fontWeight: 500 }}>{p.address_line1}</div>
                          <div style={{ fontSize: '0.77rem', color: 'var(--slate-muted)' }}>{p.address_city}, {p.address_state} {p.address_zip}</div>
                        </td>
                        <td style={{ fontSize: '0.82rem' }}>{LABELS.property_type[p.property_type]}</td>
                        <td style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500 }}>{formatPrice(p)}</td>
                        <td>{listingBadge(p.listing_status)}</td>
                        {!selected && <>
                          <td style={{ fontSize: '0.82rem', color: dom > 60 ? 'var(--warning)' : 'var(--slate-muted)' }}>{dom} días</td>
                          <td style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>{p.mls_number || '—'}</td>
                        </>}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {prop && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{prop.address_line1}</h3>
                <div style={{ fontSize: '0.875rem', color: 'var(--slate-muted)', marginBottom: 8 }}>{prop.address_city}, {prop.address_state} {prop.address_zip}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {listingBadge(prop.listing_status)}
                  <span className="badge badge-slate">{LABELS.property_type[prop.property_type]}</span>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            {/* Price hero */}
            <div className="card-gold" style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 500, color: 'var(--slate)' }}>{formatPrice(prop)}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-deep)', marginTop: 2 }}>{daysOnMarket} días en el mercado</div>
            </div>

            {/* Property details */}
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Detalles de la propiedad</div>
              <div className="detail-grid">
                {prop.bedrooms && <div className="detail-item"><span className="detail-label">Habitaciones</span><span className="detail-value">{prop.bedrooms}</span></div>}
                {prop.bathrooms && <div className="detail-item"><span className="detail-label">Baños</span><span className="detail-value">{prop.bathrooms}</span></div>}
                {prop.sq_ft && <div className="detail-item"><span className="detail-label">Pies cuadrados</span><span className="detail-value">{prop.sq_ft.toLocaleString()} sqft</span></div>}
                {prop.year_built && <div className="detail-item"><span className="detail-label">Año de construcción</span><span className="detail-value">{prop.year_built}</span></div>}
                <div className="detail-item"><span className="detail-label">Fecha de listado</span><span className="detail-value">{new Date(prop.listing_date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
                {prop.mls_number && <div className="detail-item"><span className="detail-label">Número MLS</span><span className="detail-value">{prop.mls_number}</span></div>}
                {agent && <div className="detail-item"><span className="detail-label">Agente listado</span><span className="detail-value">{agent.full_name}</span></div>}
                {prop.hoa_fee_mo && <div className="detail-item"><span className="detail-label">HOA mensual</span><span className="detail-value">${prop.hoa_fee_mo}/mes</span></div>}
              </div>
            </div>

            {/* Features */}
            {prop.features?.length > 0 && (
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div className="section-label">Características</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {prop.features.map(f => (
                    <span key={f} className="badge badge-slate">{f.replace(/_/g,' ')}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Active transaction */}
            {propTxn && (
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div className="section-label">Transacción activa</div>
                <div className="detail-grid">
                  <div className="detail-item"><span className="detail-label">Número</span><span className="detail-value">{propTxn.transaction_number}</span></div>
                  <div className="detail-item"><span className="detail-label">Tipo</span><span className="detail-value">{LABELS.transaction_type[propTxn.transaction_type]}</span></div>
                  <div className="detail-item"><span className="detail-label">Etapa</span><span className="detail-value"><span className="badge badge-gold">{LABELS.transaction_stage[propTxn.stage]}</span></span></div>
                  <div className="detail-item"><span className="detail-label">Cliente</span><span className="detail-value">{propClient?.full_name || '—'}</span></div>
                  {propTxn.offer_price && <div className="detail-item"><span className="detail-label">Precio de oferta</span><span className="detail-value">${propTxn.offer_price.toLocaleString()}</span></div>}
                  {propTxn.closing_date && <div className="detail-item"><span className="detail-label">Fecha de cierre</span><span className="detail-value" style={{ color: 'var(--success)', fontWeight: 500 }}>{new Date(propTxn.closing_date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>}
                </div>
              </div>
            )}

            {/* Description */}
            {prop.description_es && (
              <div className="card">
                <div className="section-label">Descripción</div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--slate-mid)' }}>{prop.description_es}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
