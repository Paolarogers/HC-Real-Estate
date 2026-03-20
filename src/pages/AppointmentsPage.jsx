import React, { useState } from 'react'
import { demoAppointments, demoClients, demoProperties, demoStaff, LABELS } from '../data/demo.js'

export default function AppointmentsPage() {
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = demoAppointments.filter(a =>
    statusFilter === 'all' || a.status === statusFilter
  )

  const apt = selected ? demoAppointments.find(a => a.id === selected) : null
  const client = apt ? demoClients.find(c => c.id === apt.client_id) : null
  const prop = apt ? demoProperties.find(p => p.id === apt.property_id) : null
  const agent = apt ? demoStaff.find(s => s.id === apt.agent_id) : null

  function aptBadge(status) {
    const map = { scheduled: 'badge-slate', confirmed: 'badge-success', completed: 'badge-closed-txn', cancelled: 'badge-cancelled', no_show: 'badge-danger', rescheduled: 'badge-warning' }
    const label = { scheduled: 'Programada', confirmed: 'Confirmada', completed: 'Completada', cancelled: 'Cancelada', no_show: 'No se presentó', rescheduled: 'Reprogramada' }
    return <span className={`badge ${map[status] || 'badge-slate'}`}>{label[status] || status}</span>
  }

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>

      {/* List */}
      <div style={{ width: selected ? 380 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Citas y Visitas</h2>
              <p>{demoAppointments.filter(a => a.status === 'confirmed').length} confirmadas hoy</p>
            </div>
            <button className="btn btn-primary btn-sm">+ Nueva Cita</button>
          </div>

          <div className="filters-row">
            <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">Todos los estados</option>
              <option value="scheduled">Programada</option>
              <option value="confirmed">Confirmada</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(a => {
              const c = demoClients.find(x => x.id === a.client_id)
              const p = demoProperties.find(x => x.id === a.property_id)
              const isToday = new Date(a.scheduled_at).toDateString() === new Date().toDateString()
              return (
                <div key={a.id}
                  className="card-sm"
                  onClick={() => setSelected(a.id)}
                  style={{ cursor: 'pointer', borderLeft: isToday ? '3px solid var(--gold)' : '1px solid var(--border)', background: selected === a.id ? 'var(--parchment)' : 'var(--white)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: 3 }}>
                        {c?.full_name || '—'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', marginBottom: 4 }}>
                        {LABELS.appointment_type[a.appointment_type]}
                        {p && ` · ${p.address_line1}`}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: isToday ? 'var(--gold-deep)' : 'var(--slate-muted)', fontWeight: isToday ? 500 : 400 }}>
                        {new Date(a.scheduled_at).toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {' · '}
                        {new Date(a.scheduled_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        {' · '}
                        {a.duration_min} min
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      {aptBadge(a.status)}
                      {isToday && <span className="badge badge-gold">Hoy</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail */}
      {apt && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{LABELS.appointment_type[apt.appointment_type]}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  {aptBadge(apt.status)}
                  <span className="badge badge-slate">{apt.meeting_mode === 'in_person' ? 'Presencial' : apt.meeting_mode === 'phone' ? 'Teléfono' : 'Video'}</span>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="section-label">Detalles de la cita</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Cliente</span><span className="detail-value" style={{ fontWeight: 500 }}>{client?.full_name || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Agente</span><span className="detail-value">{agent?.full_name || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Fecha</span><span className="detail-value">{new Date(apt.scheduled_at).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
                <div className="detail-item"><span className="detail-label">Hora</span><span className="detail-value" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{new Date(apt.scheduled_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span></div>
                <div className="detail-item"><span className="detail-label">Duración</span><span className="detail-value">{apt.duration_min} minutos</span></div>
                {apt.location_notes && <div className="detail-item" style={{ gridColumn: '1 / -1' }}><span className="detail-label">Ubicación</span><span className="detail-value">{apt.location_notes}</span></div>}
              </div>
            </div>

            {prop && (
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div className="section-label">Propiedad</div>
                <div style={{ fontWeight: 500 }}>{prop.address_line1}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{prop.address_city}, {prop.address_state} {prop.address_zip}</div>
                <div style={{ marginTop: 6 }}>
                  <span className="badge badge-slate">{LABELS.property_type[prop.property_type]}</span>
                  {prop.listing_price && <span style={{ marginLeft: 8, fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>${prop.listing_price.toLocaleString()}</span>}
                </div>
              </div>
            )}

            <div className="card">
              <div className="section-label">Acciones</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm">Confirmar cita</button>
                <button className="btn btn-secondary btn-sm">Reprogramar</button>
                <button className="btn btn-secondary btn-sm">Marcar completada</button>
                <button className="btn btn-danger btn-sm">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
