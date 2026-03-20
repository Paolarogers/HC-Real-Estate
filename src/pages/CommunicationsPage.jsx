import React, { useState } from 'react'
import { demoClients, demoTransactions, demoProperties } from '../data/demo.js'

const demoComms = [
  { id: 'cm1', client_id: 'c1', direction: 'outbound', channel: 'whatsapp', subject: 'Confirmación de cita', body: 'Hola Carlos, confirmamos su cita de recorrido de inspección para mañana a las 10 AM en 123 Oak Street. Cualquier pregunta, estamos disponibles.', status: 'read', sent_at: '2026-03-18T09:00:00Z', staff: 'Dayana' },
  { id: 'cm2', client_id: 'c1', direction: 'inbound', channel: 'whatsapp', subject: 'Respuesta del cliente', body: 'Perfecto, ahi estaremos. Gracias por el seguimiento.', status: 'received', sent_at: '2026-03-18T09:15:00Z', staff: null },
  { id: 'cm3', client_id: 'c5', direction: 'outbound', channel: 'email', subject: 'Actualización — Oferta 456 Maple Ave', body: 'Estimado Pedro, adjunto encontrará el estado actualizado de su oferta en 456 Maple Avenue. El vendedor ha respondido con una contraoferta de $191,500. Por favor confirme si desea proceder.', status: 'delivered', sent_at: '2026-03-17T16:30:00Z', staff: 'Amili' },
  { id: 'cm4', client_id: 'c4', direction: 'outbound', channel: 'sms', subject: 'Reactivación', body: 'Hola Rosa, somos HC Real Estate. Han surgido nuevas propiedades en tu rango de presupuesto en Mauldin. ¿Te gustaría que te enviemos la lista? Respondemos en minutos.', status: 'delivered', sent_at: '2026-03-17T11:00:00Z', staff: 'Dollys' },
  { id: 'cm5', client_id: 'c3', direction: 'outbound', channel: 'call', subject: 'Llamada de seguimiento', body: 'Llamada de 8 minutos con Juan Torres. Confirmó interés en 789 Pine Road. Firma de contrato programada para el 1 de abril. Cliente muy satisfecho.', status: 'logged', sent_at: '2026-03-16T14:00:00Z', staff: 'Dayana' },
]

const channelConfig = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', bg: '#E8F8EE', icon: 'W' },
  sms:      { label: 'SMS', color: 'var(--info)', bg: 'var(--info-bg)', icon: 'S' },
  email:    { label: 'Email', color: 'var(--slate-mid)', bg: 'var(--slate-light)', icon: 'E' },
  call:     { label: 'Llamada', color: 'var(--gold-deep)', bg: 'var(--gold-pale)', icon: 'L' },
}

const statusLabel = {
  sent: 'Enviado', delivered: 'Entregado', read: 'Leído',
  responded: 'Respondido', received: 'Recibido', logged: 'Registrado', failed: 'Fallido'
}

export default function CommunicationsPage() {
  const [channelFilter, setChannelFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [compose, setCompose] = useState(false)
  const [composeChannel, setComposeChannel] = useState('whatsapp')
  const [composeClient, setComposeClient] = useState('')
  const [composeBody, setComposeBody] = useState('')

  const filtered = demoComms.filter(c =>
    channelFilter === 'all' || c.channel === channelFilter
  )

  const comm = selected ? demoComms.find(c => c.id === selected) : null
  const commClient = comm ? demoClients.find(c => c.id === comm.client_id) : null

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 57px)' }}>

      {/* List */}
      <div style={{ width: selected ? 420 : '100%', borderRight: selected ? '1px solid var(--border)' : 'none', overflowY: 'auto' }}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left">
              <h2>Comunicaciones</h2>
              <p>WhatsApp · SMS · Email · Llamadas</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setCompose(true)}>+ Nuevo Mensaje</button>
          </div>

          {/* Channel filter */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button className={`btn btn-sm ${channelFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setChannelFilter('all')}>
              Todos
            </button>
            {Object.entries(channelConfig).map(([key, cfg]) => (
              <button key={key}
                className={`btn btn-sm ${channelFilter === key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setChannelFilter(channelFilter === key ? 'all' : key)}>
                {cfg.label}
              </button>
            ))}
          </div>

          {/* Compose panel */}
          {compose && (
            <div className="card" style={{ marginBottom: '1.25rem', border: '1px solid var(--gold-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 500 }}>Nuevo mensaje</div>
                <button className="btn btn-ghost btn-sm" onClick={() => setCompose(false)}>Cancelar</button>
              </div>
              <div className="form-grid-2" style={{ marginBottom: '0.75rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Canal</label>
                  <select value={composeChannel} onChange={e => setComposeChannel(e.target.value)}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                    <option value="call">Llamada (registrar)</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Cliente</label>
                  <select value={composeClient} onChange={e => setComposeClient(e.target.value)}>
                    <option value="">Seleccionar cliente...</option>
                    {demoClients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label>Mensaje</label>
                <textarea
                  rows={3}
                  placeholder="Escribir mensaje..."
                  value={composeBody}
                  onChange={e => setComposeBody(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary btn-sm" disabled={!composeClient || !composeBody}>
                  Enviar por {channelConfig[composeChannel]?.label}
                </button>
                <button className="btn btn-secondary btn-sm">Guardar borrador</button>
              </div>
            </div>
          )}

          {/* Communication list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {filtered.map(c => {
              const client = demoClients.find(x => x.id === c.client_id)
              const cfg = channelConfig[c.channel]
              return (
                <div key={c.id}
                  onClick={() => setSelected(c.id)}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    padding: '0.9rem 1.1rem',
                    background: selected === c.id ? 'var(--parchment)' : 'var(--white)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    borderLeft: `3px solid ${c.direction === 'inbound' ? 'var(--info)' : cfg?.color || 'var(--gold)'}`
                  }}>
                  {/* Channel icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: cfg?.bg || 'var(--parchment)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700,
                    color: cfg?.color || 'var(--slate)',
                    flexShrink: 0
                  }}>
                    {cfg?.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{client?.full_name || '—'}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--slate-muted)', flexShrink: 0, marginLeft: 8 }}>
                        {new Date(c.sent_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.direction === 'outbound' && c.staff ? `${c.staff}: ` : ''}{c.body}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: '0.67rem', padding: '0.1rem 0.45rem', borderRadius: 10, background: cfg?.bg, color: cfg?.color, fontWeight: 500 }}>
                        {cfg?.label}
                      </span>
                      <span className={`badge badge-${c.direction === 'inbound' ? 'info' : 'slate'}`} style={{ fontSize: '0.67rem', padding: '0.1rem 0.45rem' }}>
                        {c.direction === 'inbound' ? 'Recibido' : 'Enviado'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail */}
      {comm && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div className="page-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>{commClient?.full_name}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: '0.72rem', padding: '0.18rem 0.55rem', borderRadius: 20, background: channelConfig[comm.channel]?.bg, color: channelConfig[comm.channel]?.color, fontWeight: 500 }}>
                    {channelConfig[comm.channel]?.label}
                  </span>
                  <span className={`badge badge-${comm.direction === 'inbound' ? 'info' : 'slate'}`}>
                    {comm.direction === 'inbound' ? 'Mensaje recibido' : 'Mensaje enviado'}
                  </span>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Cerrar</button>
            </div>

            {/* Message bubble */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{
                maxWidth: '85%',
                marginLeft: comm.direction === 'inbound' ? 0 : 'auto',
                background: comm.direction === 'inbound' ? 'var(--white)' : 'var(--slate)',
                color: comm.direction === 'inbound' ? 'var(--slate)' : 'var(--cream)',
                border: `1px solid ${comm.direction === 'inbound' ? 'var(--border)' : 'transparent'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                boxShadow: 'var(--shadow)'
              }}>
                {comm.staff && <div style={{ fontSize: '0.72rem', opacity: 0.6, marginBottom: 4 }}>{comm.staff}</div>}
                <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{comm.body}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.55, marginTop: 6, textAlign: 'right' }}>
                  {new Date(comm.sent_at).toLocaleString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  {' · '}{statusLabel[comm.status]}
                </div>
              </div>
            </div>

            {/* Quick reply */}
            <div className="card">
              <div className="section-label">Respuesta rápida</div>
              <textarea placeholder="Escribir respuesta..." rows={3} style={{ width: '100%', resize: 'vertical', marginBottom: '0.75rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm">Enviar por {channelConfig[comm.channel]?.label}</button>
                <button className="btn btn-secondary btn-sm">Llamar</button>
                <button className="btn btn-secondary btn-sm">Agendar cita</button>
              </div>
            </div>

            {/* Client contact info */}
            <div className="card" style={{ marginTop: '1rem' }}>
              <div className="section-label">Contacto del cliente</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Teléfono</span><span className="detail-value">{commClient?.phone || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Email</span><span className="detail-value">{commClient?.email || '—'}</span></div>
                <div className="detail-item"><span className="detail-label">Idioma preferido</span><span className="detail-value">{commClient?.preferred_language === 'es' ? 'Español' : commClient?.preferred_language === 'en' ? 'English' : 'Bilingüe'}</span></div>
                <div className="detail-item"><span className="detail-label">Tipo</span><span className="detail-value">{commClient?.client_type}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
