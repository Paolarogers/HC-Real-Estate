import React, { useState } from 'react'

const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    provider: 'Twilio',
    description: 'Envía y recibe mensajes de WhatsApp directamente desde la plataforma. Confirmaciones de citas, seguimiento a clientes y campañas de reactivación.',
    status: 'pending',
    cost: '~$10–$20/mes',
    setup: 'Requiere cuenta Twilio + número de WhatsApp Business verificado con Meta.',
    credentials: ['VITE_TWILIO_ACCOUNT_SID', 'VITE_TWILIO_AUTH_TOKEN', 'VITE_TWILIO_WHATSAPP_NUMBER'],
    docs: 'https://www.twilio.com/whatsapp'
  },
  {
    id: 'sms',
    name: 'SMS',
    provider: 'Twilio',
    description: 'Canal alternativo de texto cuando WhatsApp no está disponible. Ideal para recordatorios y alertas a clientes sin WhatsApp.',
    status: 'pending',
    cost: '~$1/mes + $0.0079/mensaje',
    setup: 'Usa las mismas credenciales de Twilio. Solo requiere activar el número SMS.',
    credentials: ['VITE_TWILIO_ACCOUNT_SID', 'VITE_TWILIO_AUTH_TOKEN', 'VITE_TWILIO_SMS_NUMBER'],
    docs: 'https://www.twilio.com/sms'
  },
  {
    id: 'email',
    name: 'Email — Gmail',
    provider: 'Gmail API (Google OAuth)',
    description: 'Envía emails directamente desde tu cuenta Gmail hacia clientes. Contratos, actualizaciones de transacciones, confirmaciones y reportes.',
    status: 'pending',
    cost: 'Gratuito con cuenta Google',
    setup: 'Requiere Google OAuth 2.0. Contacta a tu equipo HC para configurar las credenciales de la app de Google.',
    credentials: ['VITE_GMAIL_CLIENT_ID', 'VITE_GMAIL_CLIENT_SECRET', 'VITE_GMAIL_REDIRECT_URI'],
    docs: 'https://developers.google.com/gmail/api'
  },
  {
    id: 'resend',
    name: 'Email — Transaccional',
    provider: 'Resend',
    description: 'Emails automáticos y transaccionales — confirmaciones de cita, bienvenida a nuevos clientes, alertas de documentos por vencer.',
    status: 'active',
    cost: 'Gratuito hasta 3,000 emails/mes',
    setup: 'Activo por defecto en todas las apps HC Media. Sin configuracion adicional necesaria.',
    credentials: [],
    docs: 'https://resend.com'
  },
]

const staffList = [
  { id: 's1', full_name: 'Paola Rogers', role: 'owner', email: 'paola@hispanos.com', active: true },
  { id: 's2', full_name: 'Dayana', role: 'agent', email: 'dayana@hispanos.com', active: true },
  { id: 's3', full_name: 'Amili', role: 'agent', email: 'amili@hcmedia.com', active: true },
  { id: 's4', full_name: 'Adriana', role: 'assistant', email: 'adriana@bonanza.com', active: true },
  { id: 's5', full_name: 'Dollys', role: 'receptionist', email: 'dollys@hispanos.com', active: true },
  { id: 's6', full_name: 'Andrea', role: 'admin', email: 'andrea@zivo.com', active: true },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('integraciones')
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left">
          <h2>Configuración</h2>
          <p>Integraciones, personal y preferencias del sistema</p>
        </div>
      </div>

      <div className="tabs">
        {['integraciones', 'personal', 'sistema'].map(t => (
          <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'integraciones' ? 'Integraciones y Notificaciones' : t === 'personal' ? 'Personal' : 'Sistema'}
          </button>
        ))}
      </div>

      {tab === 'integraciones' && (
        <div>
          <div style={{ marginBottom: '1rem', padding: '1rem 1.25rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.85rem', color: 'var(--slate-muted)' }}>
            Las integraciones marcadas como pendientes estan listas para activar. Contacta a tu equipo HC para configurar las credenciales y activarlas sin necesidad de reconstruir la app.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {integrations.map(intg => (
              <div key={intg.id} className="card" style={{ border: intg.status === 'active' ? '1px solid var(--success)' : '1px solid var(--border)' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setExpanded(expanded === intg.id ? null : intg.id)}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Icon */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 'var(--radius)',
                      background: intg.id === 'whatsapp' ? '#E8F8EE' : intg.id === 'sms' ? 'var(--info-bg)' : intg.id === 'email' ? '#FFF3E0' : 'var(--success-bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1rem', flexShrink: 0,
                      color: intg.id === 'whatsapp' ? '#25D366' : intg.id === 'sms' ? 'var(--info)' : intg.id === 'email' ? '#E84336' : 'var(--success)'
                    }}>
                      {intg.id === 'whatsapp' ? 'W' : intg.id === 'sms' ? 'S' : intg.id === 'email' ? 'G' : 'R'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{intg.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{intg.provider} · {intg.cost}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`badge badge-${intg.status === 'active' ? 'success' : 'gold'}`}>
                      {intg.status === 'active' ? 'Activo' : 'Pendiente activacion'}
                    </span>
                    <span style={{ color: 'var(--slate-muted)', fontSize: '0.75rem' }}>{expanded === intg.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expanded === intg.id && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-mid)', marginBottom: '0.75rem', lineHeight: 1.6 }}>{intg.description}</p>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <div className="section-label">Configuración requerida</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{intg.setup}</p>
                    </div>

                    {intg.credentials.length > 0 && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <div className="section-label">Variables de entorno</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {intg.credentials.map(cred => (
                            <code key={cred} style={{ fontSize: '0.78rem', background: 'var(--parchment)', padding: '0.25rem 0.6rem', borderRadius: 4, fontFamily: 'monospace', color: 'var(--slate-mid)' }}>
                              {cred}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {intg.status === 'pending' ? (
                        <button className="btn btn-gold btn-sm">Contactar equipo HC para activar</button>
                      ) : (
                        <button className="btn btn-secondary btn-sm">Ver configuracion</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'personal' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.full_name}</td>
                  <td style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{s.role.replace(/_/g, ' ')}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{s.email}</td>
                  <td><span className={`badge badge-${s.active ? 'success' : 'inactive'}`}>{s.active ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'sistema' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Nombre del negocio', value: 'HC Real Estate' },
            { label: 'Plataforma', value: 'HC Media — Hispanos Comunidad' },
            { label: 'Supabase proyecto', value: 'hc-real-estate (uftpvbvhsxcmomnnyohe)' },
            { label: 'GitHub repositorio', value: 'Paolarogers/HC-Real-Estate' },
            { label: 'URL en produccion', value: 'hc-real-estate.netlify.app' },
            { label: 'Version', value: 'v1.0 — Marzo 2026' },
            { label: 'Stack', value: 'React + Vite + Supabase + Netlify' },
          ].map((item, i) => (
            <div key={i} className="card-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--slate-muted)' }}>{item.label}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
          <div style={{ marginTop: '0.5rem', padding: '1rem', background: 'var(--parchment)', borderRadius: 'var(--radius)', fontSize: '0.78rem', color: 'var(--slate-muted)', lineHeight: 1.6 }}>
            © 2026 Paola Rogers. Todos los derechos reservados. Hispanos Comunidad.<br />
            Prohibida su reproduccion sin autorizacion escrita.<br />
            HC Media · Bonanza Quick Loans · Zivo Insurance
          </div>
        </div>
      )}
    </div>
  )
}
