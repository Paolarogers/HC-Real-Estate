import React, { useState } from 'react'
import { demoHCMessages } from '../data/demo.js'

const demoMetaLeads = [
  { id: 'm1', lead_name: 'Valentina Ríos', phone: '864-555-0201', ad_campaign: 'HC Real Estate — Compradores Marzo 2026', service_interest: 'Comprar casa', lead_status: 'new', received_at: '2026-03-18T08:00:00Z' },
  { id: 'm2', lead_name: 'Diana Castillo', phone: '864-555-0202', ad_campaign: 'HC Real Estate — Rentas Upstate SC', service_interest: 'Rentar apartamento', lead_status: 'contacted', received_at: '2026-03-17T15:00:00Z' },
  { id: 'm3', lead_name: 'Marcos Fuentes', phone: '864-555-0203', ad_campaign: 'HC Real Estate — Open House Mauldin', service_interest: 'Comprar casa', lead_status: 'qualified', received_at: '2026-03-16T10:00:00Z' },
]

const demoCampaigns = [
  { id: 'c1', title: 'Compradores Primer Trimestre 2026', type: 'buyer_prequal', status: 'active', total_sent: 342, total_responded: 28, total_booked: 8 },
  { id: 'c2', title: 'Open House — Mauldin SC', type: 'open_house', status: 'completed', total_sent: 180, total_responded: 45, total_booked: 22 },
  { id: 'c3', title: 'Reactivación Clientes Inactivos Q1', type: 'reactivation', status: 'draft', total_sent: 0, total_responded: 0, total_booked: 0 },
]

const demoStrategy = [
  { week: 'Semana 1 — Abril', tasks: ['Lanzar campaña de compradores en Meta', 'Publicar 3 listados nuevos en Instagram', 'Enviar newsletter mensual a base de datos'] },
  { week: 'Semana 2 — Abril', tasks: ['Open House — 456 Maple Ave Fountain Inn', 'Seguimiento a leads calificados de marzo', 'Actualizar Google Business Profile'] },
  { week: 'Semana 3 — Abril', tasks: ['Campaña WhatsApp — clientes inactivos 60 días', 'Reels de propiedades disponibles', 'Reunión de estrategia mensual con equipo HC'] },
]

export default function HCMediaPage() {
  const [tab, setTab] = useState('workspace')
  const [msgIdx, setMsgIdx] = useState(0)

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left">
          <h2>HC Media Workspace</h2>
          <p>Campañas, estrategia y análisis de Meta Ads</p>
        </div>
      </div>

      {/* Message carousel */}
      <div className="hc-message" style={{ marginBottom: '1.5rem' }}>
        <div className="hc-message-date">Mensaje del equipo HC Media</div>
        <div className="hc-message-text">"{demoHCMessages[msgIdx].text}"</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <div className="hc-message-author">— {demoHCMessages[msgIdx].author}, {demoHCMessages[msgIdx].role}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {demoHCMessages.map((_, i) => (
              <button key={i} onClick={() => setMsgIdx(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === msgIdx ? 'var(--gold)' : 'rgba(255,255,255,0.3)', border: 'none', padding: 0, cursor: 'pointer' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['workspace', 'meta', 'estrategia'].map(t => (
          <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'workspace' ? 'Campañas' : t === 'meta' ? 'Meta Insights' : 'Plan Estratégico'}
          </button>
        ))}
      </div>

      {tab === 'workspace' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="btn btn-primary btn-sm">+ Nueva Campaña</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {demoCampaigns.map(c => {
              const convRate = c.total_sent > 0 ? ((c.total_responded / c.total_sent) * 100).toFixed(1) : 0
              const bookRate = c.total_responded > 0 ? ((c.total_booked / c.total_responded) * 100).toFixed(1) : 0
              return (
                <div key={c.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>{c.title}</div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <span className="badge badge-slate">{c.type.replace(/_/g, ' ')}</span>
                        <span className={`badge badge-${c.status === 'active' ? 'success' : c.status === 'completed' ? 'closed-txn' : 'slate'}`}>
                          {c.status === 'active' ? 'Activa' : c.status === 'completed' ? 'Completada' : 'Borrador'}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm">Ver detalle</button>
                  </div>
                  {c.total_sent > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--slate)' }}>{c.total_sent}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Enviados</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--gold)' }}>{c.total_responded}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Respondieron ({convRate}%)</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--success)' }}>{c.total_booked}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Citas agendadas ({bookRate}%)</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'meta' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="stat-card accent"><div className="stat-label">Leads del mes</div><div className="stat-value">{demoMetaLeads.length}</div><div className="stat-sub">De Meta Ads</div></div>
            <div className="stat-card"><div className="stat-label">Calificados</div><div className="stat-value">{demoMetaLeads.filter(l => l.lead_status === 'qualified').length}</div><div className="stat-sub">Listos para visita</div></div>
            <div className="stat-card"><div className="stat-label">Tasa de conversión</div><div className="stat-value" style={{ fontSize: '1.5rem' }}>33%</div><div className="stat-sub">Lead a cita</div></div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Nombre</th><th>Campaña</th><th>Interés</th><th>Estado</th><th>Recibido</th></tr>
              </thead>
              <tbody>
                {demoMetaLeads.map(l => (
                  <tr key={l.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{l.lead_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{l.phone}</div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--slate-muted)', maxWidth: 200 }}>{l.ad_campaign}</td>
                    <td style={{ fontSize: '0.85rem' }}>{l.service_interest}</td>
                    <td>
                      <span className={`badge badge-${l.lead_status === 'new' ? 'urgent' : l.lead_status === 'qualified' ? 'success' : 'warning'}`}>
                        {l.lead_status === 'new' ? 'Nuevo' : l.lead_status === 'qualified' ? 'Calificado' : 'Contactado'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--slate-muted)' }}>
                      {new Date(l.received_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'estrategia' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {demoStrategy.map((week, i) => (
              <div key={i} className="card">
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, color: 'var(--slate)', marginBottom: '0.75rem', borderBottom: '2px solid var(--gold)', paddingBottom: '0.5rem' }}>
                  {week.week}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {week.tasks.map((task, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: '0.855rem', color: 'var(--slate-mid)' }}>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bonanza + Zivo */}
          <div className="vip-grid" style={{ marginTop: '1.5rem' }}>
            <div className="vip-card vip-bonanza">
              <div className="vip-title">Bonanza VIP</div>
              <div className="vip-desc">Bonanza VIP — proceso de aprobación acelerado para compradores de HC Real Estate. Cuando el cliente esté listo para crecer, el financiamiento está a un clic.</div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem', width: 'fit-content' }}>Abrir portal</button>
            </div>
            <div className="vip-card vip-zivo">
              <div className="vip-title">Zivo Insurance VIP</div>
              <div className="vip-desc">Seguro de propietario coordinado antes del cierre. Andrea y su equipo garantizan que cada cliente cierre sin obstáculos.</div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem', width: 'fit-content' }}>Abrir portal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
