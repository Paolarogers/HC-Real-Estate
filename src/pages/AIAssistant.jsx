
import React, { useState } from 'react'
import { demoTransactions, demoProperties, demoClients, demoLeads, demoTasks } from '../data/demo.js'

const SUGGESTED = [
  'Cuantas transacciones estan activas esta semana?',
  'Que propiedades llevan mas de 60 dias en el mercado?',
  'Cuales clientes no han tenido contacto en 60 dias?',
  'Que cierres tenemos programados este mes?',
  'Cuales leads nuevos no han sido contactados?',
  'Que documentos estan pendientes en transacciones activas?',
  'Cuanto revenue se proyecta en comisiones este mes?',
  'Quienes son mis clientes VIP activos?',
]

function getDemoResponse(q) {
  const ql = q.toLowerCase()
  const openTxns = demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage))
  const newLeads = demoLeads.filter(l => l.status === 'new')
  const inactiveClients = demoClients.filter(c => {
    if (!c.last_contact_at) return true
    return (Date.now() - new Date(c.last_contact_at)) > 60 * 24 * 60 * 60 * 1000
  })
  const vipClients = demoClients.filter(c => c.status === 'vip')
  const projComm = openTxns.reduce((s,t) => s + (t.commission_amount || (t.offer_price||0)*0.03), 0)
  const longListings = demoProperties.filter(p => {
    const days = Math.floor((Date.now() - new Date(p.listing_date)) / 86400000)
    return days > 60 && p.listing_status === 'active'
  })
  const closing = demoTransactions.filter(t => t.stage === 'closing_scheduled')

  if (ql.includes('transaccion') || ql.includes('activa'))
    return `Tienes ${openTxns.length} transacciones activas esta semana. Las etapas son: ${openTxns.map(t => t.stage.replace(/_/g,' ')).join(', ')}. La de mayor urgencia es la que esta en closing_scheduled.`
  if (ql.includes('60 dias') && ql.includes('mercado'))
    return longListings.length > 0
      ? `${longListings.length} propiedad(es) llevan mas de 60 dias activas: ${longListings.map(p => p.address_line1).join(', ')}. Es momento de revisar la estrategia de precio con los duenos.`
      : 'Todas tus propiedades activas llevan menos de 60 dias en el mercado. Buen ritmo.'
  if (ql.includes('contacto') && ql.includes('60'))
    return inactiveClients.length > 0
      ? `${inactiveClients.length} cliente(s) sin contacto en 60+ dias: ${inactiveClients.map(c => c.full_name).join(', ')}. Recomiendo iniciar una campana de reactivacion hoy.`
      : 'Todos tus clientes han sido contactados en los ultimos 60 dias. Excelente seguimiento.'
  if (ql.includes('cierre') || ql.includes('programado'))
    return closing.length > 0
      ? `${closing.length} cierre(s) programados este mes. Asegurate de que los documentos de titulo esten completos y el seguro del comprador este listo antes del cierre.`
      : 'No hay cierres programados actualmente. Revisa cuales transacciones estan en inspection_appraisal para avanzarlas.'
  if (ql.includes('lead') && ql.includes('sin contactar'))
    return newLeads.length > 0
      ? `${newLeads.length} lead(s) nuevos sin contactar: ${newLeads.map(l => l.full_name).join(', ')}. El primer contacto dentro de la primera hora aumenta la conversion en mas del 60%. Llamalos ahora.`
      : 'Todos los leads recientes han sido contactados. Buen trabajo del equipo.'
  if (ql.includes('documento') || ql.includes('pendiente'))
    return `Las transacciones activas tienen documentos pendientes en etapas de documents_gathering y bajo contrato. Revisa la boveda de documentos para cada transaccion en esas etapas y solicita lo que falta.`
  if (ql.includes('comision') || ql.includes('revenue'))
    return `Revenue proyectado en comisiones este mes: $${Math.round(projComm).toLocaleString()} basado en ${openTxns.length} transacciones activas con un promedio de 3% de comision. Esta cifra cambia segun el precio final negociado.`
  if (ql.includes('vip'))
    return vipClients.length > 0
      ? `Tienes ${vipClients.length} cliente(s) VIP activos: ${vipClients.map(c => c.full_name).join(', ')}. Son tus mejores referidores. Considera una llamada personal esta semana para mantener la relacion.`
      : 'No hay clientes marcados como VIP actualmente. Considera reconocer a tus mejores clientes con ese estatus.'
  return `Entendi tu pregunta sobre "${q}". En la version completa con datos de Supabase en vivo, te daria una respuesta precisa basada en tu cartera actual. Por ahora estoy operando con datos de demo. Puedes hacer preguntas sobre clientes, propiedades, transacciones, leads, comisiones, o cierres programados.`
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hola. Soy el Asistente Orbita para HC Real Estate. Puedo ayudarte a entender tu cartera, leads activos, transacciones en proceso, y proyecciones de comision. Como puedo ayudarte hoy?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  function send(q) {
    const question = q || input
    if (!question.trim()) return
    setMessages(m => [...m, { role: 'user', text: question }])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', text: getDemoResponse(question) }])
      setLoading(false)
    }, 600)
  }

  return (
    <div className="page-body" style={{ display: 'flex', gap: '1.5rem', maxHeight: 'calc(100vh - 120px)' }}>
      {/* Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="page-header">
          <div className="page-header-left">
            <h2>Asistente IA Orbita</h2>
            <p>Busqueda inteligente de tu cartera — propiedades, clientes, transacciones, comisiones</p>
          </div>
          <span className="badge badge-gold" style={{ alignSelf: 'flex-start' }}>Demo activo</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem', minHeight: 0 }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              maxWidth: '80%',
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              background: m.role === 'user' ? 'var(--slate)' : 'var(--white)',
              color: m.role === 'user' ? 'var(--cream)' : 'var(--slate)',
              border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
              borderRadius: 'var(--radius-lg)',
              padding: '0.9rem 1.1rem',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              boxShadow: 'var(--shadow)',
            }}>
              {m.role === 'assistant' && (
                <div style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                  Asistente Orbita
                </div>
              )}
              {m.text}
            </div>
          ))}
          {loading && (
            <div style={{ maxWidth: '80%', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0.9rem 1.1rem', fontSize: '0.875rem', color: 'var(--slate-muted)' }}>
              Analizando tu cartera...
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Pregunta sobre tu cartera, leads, transacciones..."
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={() => send()}>Enviar</button>
        </div>
      </div>

      {/* Suggested questions */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div className="card">
          <div className="section-label" style={{ marginBottom: '0.85rem' }}>Preguntas sugeridas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SUGGESTED.map((q, i) => (
              <button
                key={i}
                className="btn btn-secondary btn-sm"
                onClick={() => send(q)}
                style={{ textAlign: 'left', justifyContent: 'flex-start', lineHeight: 1.4, height: 'auto', whiteSpace: 'normal', padding: '0.55rem 0.75rem' }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
