import React, { useState, useEffect } from 'react'
import { demoHCMessages } from '../data/demo.js'

const planDelDia = [
  { id: 1, time: '9:00 AM', category: 'clients', label: 'Revisar leads nuevos de Meta Ads y asignar agente', done: false },
  { id: 2, time: '9:30 AM', category: 'properties', label: 'Confirmar citas de showing para hoy', done: false },
  { id: 3, time: '10:00 AM', category: 'transactions', label: 'Seguimiento a transacción TXN-2026-0001 — inspección pendiente', done: false },
  { id: 4, time: '11:00 AM', category: 'admin', label: 'Llamar a Carlos Mendoza — actualización de preaprobación', done: false },
  { id: 5, time: '2:00 PM', category: 'marketing', label: 'Revisar rendimiento de campaña Meta — compradores marzo', done: false },
  { id: 6, time: '3:00 PM', category: 'clients', label: 'Reactivar clientes inactivos — enviar mensajes WhatsApp', done: false },
  { id: 7, time: '4:30 PM', category: 'admin', label: 'Actualizar pipeline de transacciones en sistema', done: false },
]

const alertas = [
  { id: 1, severity: 'critical', title: 'Carta de preaprobación por vencer', description: 'Carlos Mendoza — carta vence en 15 días (15 de abril)', days: 15 },
  { id: 2, severity: 'high', title: 'Licencia inmobiliaria — renovación próxima', description: 'Dayana — licencia vence el 30 de mayo de 2026', days: 42 },
  { id: 3, severity: 'medium', title: 'Seguro de errores y omisiones', description: 'Próxima revisión de póliza — Zivo Insurance', days: 68 },
  { id: 4, severity: 'low', title: 'Actualización de MLS membership', description: 'Renovación anual — vence el 31 de julio de 2026', days: 134 },
]

const bonanzaProfile = {
  credit_score: 748,
  time_in_business: '4 años 2 meses',
  annual_revenue: '$186,400',
  current_debt: '$0',
  dscr: '1.82',
  eligibility: 'Excelente',
  products: [
    { name: 'Línea de Crédito Empresarial', amount: '$50,000', rate: '8.9%', term: '24 meses' },
    { name: 'Préstamo de Expansión', amount: '$120,000', rate: '9.4%', term: '60 meses' },
    { name: 'Capital de Trabajo', amount: '$25,000', rate: '7.9%', term: '12 meses' },
  ]
}

const zivoProfile = {
  policies: [
    { name: 'Seguro de Errores y Omisiones', status: 'active', next_review: '2026-06-15', insurer: 'Zivo Insurance' },
    { name: 'Responsabilidad General', status: 'active', next_review: '2026-09-01', insurer: 'Zivo Insurance' },
  ],
  compliance_status: 'Al día',
  next_review_date: '15 de junio de 2026'
}

const categoryColors = {
  clients: 'var(--info)', properties: 'var(--gold)', transactions: 'var(--success)',
  admin: 'var(--slate-mid)', marketing: '#7B6A9B'
}

const categoryLabels = {
  clients: 'Clientes', properties: 'Propiedades', transactions: 'Transacciones',
  admin: 'Admin', marketing: 'Marketing'
}

export default function HubPage() {
  const [tab, setTab] = useState('plan')
  const [msgIdx, setMsgIdx] = useState(0)
  const [tasks, setTasks] = useState(planDelDia)

  // Auto-rotate messages every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx(i => (i + 1) % demoHCMessages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const completedCount = tasks.filter(t => t.done).length
  const pct = Math.round((completedCount / tasks.length) * 100)

  return (
    <div className="page-body">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Mi Hub HC Media</h2>
          <p>Tu equipo, tu plan, tu crecimiento — todo en un solo lugar</p>
        </div>
      </div>

      {/* Message carousel */}
      <div style={{
        background: 'linear-gradient(135deg, var(--slate) 0%, var(--slate-mid) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 2rem',
        marginBottom: '1.5rem',
        borderLeft: '4px solid var(--gold)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'rgba(184,154,74,0.05)', borderRadius: '50%', transform: 'translate(60px, -60px)' }} />
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.75rem' }}>
          Mensaje del equipo HC — {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: 'var(--cream)',
          marginBottom: '1rem',
          minHeight: 60
        }}>
          "{demoHCMessages[msgIdx].text}"
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--gold-light)', fontWeight: 500 }}>
              {demoHCMessages[msgIdx].author}
            </div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(245,240,232,0.5)', marginTop: 2 }}>
              {demoHCMessages[msgIdx].role}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {demoHCMessages.map((_, i) => (
              <button
                key={i}
                onClick={() => setMsgIdx(i)}
                style={{
                  width: i === msgIdx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === msgIdx ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['plan', 'alertas', 'crecimiento'].map(t => (
          <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'plan' ? 'Plan del Dia' : t === 'alertas' ? 'Alertas y Cumplimiento' : 'Crecimiento y Prestamos'}
          </button>
        ))}
      </div>

      {/* Plan del Dia */}
      {tab === 'plan' && (
        <div>
          {/* Progress bar */}
          <div className="card-sm" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{completedCount} de {tasks.length} completadas</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: pct === 100 ? 'var(--success)' : 'var(--slate)' }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? 'var(--success)' : 'var(--gold)', borderRadius: 3, transition: 'width 0.3s' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1.1rem',
                  background: task.done ? 'var(--parchment)' : 'var(--white)',
                  border: '1px solid var(--border)',
                  borderLeft: `3px solid ${task.done ? 'var(--success)' : categoryColors[task.category]}`,
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  opacity: task.done ? 0.65 : 1
                }}>
                {/* Checkbox */}
                <div style={{
                  width: 18, height: 18, borderRadius: 4,
                  border: `2px solid ${task.done ? 'var(--success)' : 'var(--border)'}`,
                  background: task.done ? 'var(--success)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.15s'
                }}>
                  {task.done && (
                    <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" style={{ width: 10, height: 10 }}>
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                    </svg>
                  )}
                </div>
                {/* Time */}
                <div style={{ minWidth: 52, fontSize: '0.72rem', color: 'var(--slate-muted)', fontWeight: 500 }}>
                  {task.time}
                </div>
                {/* Category pill */}
                <span style={{
                  fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 10,
                  background: `${categoryColors[task.category]}18`,
                  color: categoryColors[task.category],
                  fontWeight: 500, whiteSpace: 'nowrap'
                }}>
                  {categoryLabels[task.category]}
                </span>
                {/* Label */}
                <span style={{
                  fontSize: '0.875rem',
                  color: task.done ? 'var(--slate-muted)' : 'var(--slate)',
                  textDecoration: task.done ? 'line-through' : 'none',
                  flex: 1
                }}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alertas y Cumplimiento */}
      {tab === 'alertas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {alertas.map(alert => {
            const severityConfig = {
              critical: { bg: 'var(--danger-bg)', border: '#E8B8B8', color: 'var(--danger)', label: 'Crítico' },
              high:     { bg: 'var(--warning-bg)', border: '#E8CCA0', color: 'var(--warning)', label: 'Alto' },
              medium:   { bg: 'var(--gold-pale)', border: '#DDD0A0', color: 'var(--gold-deep)', label: 'Medio' },
              low:      { bg: 'var(--slate-light)', border: 'var(--border)', color: 'var(--slate-muted)', label: 'Bajo' },
            }
            const cfg = severityConfig[alert.severity]
            return (
              <div key={alert.id} style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: 'var(--radius)',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {cfg.label}
                    </span>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--slate)' }}>{alert.title}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{alert.description}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: cfg.color, lineHeight: 1 }}>{alert.days}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--slate-muted)' }}>días</div>
                </div>
              </div>
            )
          })}

          <div className="card-sm" style={{ marginTop: '0.5rem', background: 'var(--parchment)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>Zivo Insurance — Revision de polizas incluida</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', marginTop: 2 }}>
                  Andrea y su equipo monitorean el cumplimiento de tu negocio activamente.
                </div>
              </div>
              <button className="btn btn-secondary btn-sm">Contactar a Andrea</button>
            </div>
          </div>
        </div>
      )}

      {/* Crecimiento y Prestamos */}
      {tab === 'crecimiento' && (
        <div>
          {/* Bonanza VIP */}
          <div style={{ background: '#EBF0F8', border: '1px solid #B8CCEE', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--slate)', marginBottom: 4 }}>
                  Bonanza VIP
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', maxWidth: 400 }}>
                  Cliente preferencial con proceso de aprobacion acelerado. Tu perfil de elegibilidad esta siempre actualizado. Cuando estes lista para crecer, el financiamiento esta a un clic.
                </div>
              </div>
              <span className="badge badge-success">Elegible</span>
            </div>

            {/* Profile metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Credit Score', value: bonanzaProfile.credit_score },
                { label: 'Tiempo en negocio', value: bonanzaProfile.time_in_business },
                { label: 'Ingresos anuales', value: bonanzaProfile.annual_revenue },
                { label: 'Deuda actual', value: bonanzaProfile.current_debt },
                { label: 'DSCR', value: bonanzaProfile.dscr },
                { label: 'Elegibilidad', value: bonanzaProfile.eligibility },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--slate-muted)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--slate)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Products */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {bonanzaProfile.products.map((p, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>Hasta {p.amount} · {p.rate} · {p.term}</div>
                  </div>
                  <button className="btn btn-primary btn-sm">Aplicar</button>
                </div>
              ))}
            </div>

            {/* Bonanza banner */}
            <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0d2038 100%)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem' }}>Bonanza Quick Loans</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Adriana — Lider de Ventas y Alcance</div>
              </div>
              <button style={{ background: 'var(--gold)', color: 'white', border: 'none', borderRadius: 'var(--radius)', padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                Hablar con Adriana
              </button>
            </div>
          </div>

          {/* Zivo VIP */}
          <div style={{ background: '#EBF5F0', border: '1px solid #A0D4B8', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--slate)', marginBottom: 4 }}>
              Zivo Insurance VIP
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', marginBottom: '1.25rem', maxWidth: 400 }}>
              Revision de polizas y monitoreo de cumplimiento incluido. Andrea y su equipo se aseguran de que tu negocio siempre este protegido.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {zivoProfile.policies.map((p, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>Proxima revision: {new Date(p.next_review).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                  <span className="badge badge-success">Activa</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>Estado de cumplimiento</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>Proxima revision: {zivoProfile.next_review_date}</div>
              </div>
              <span className="badge badge-success">{zivoProfile.compliance_status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
