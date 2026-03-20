
import React from 'react'

const REQUIRED = [
  'Errors and Omissions / Professional Liability',
  'Responsabilidad Civil General',
  'Compensacion de Trabajadores (si tiene empleados)',
]
const OPTIONAL = [
  'Auto Comercial (para tours de propiedades)',
  'Propiedad de Oficina',
  'Seguro de Datos y Privacidad',
  'Umbrella / Excess Liability',
]

export default function ZivoCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #A0D4B8', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 36, height: 36, background: '#2A6DB5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-body)' }}>Z</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A6DB5', fontFamily: 'var(--font-body)' }}>ZIVO</div>
            <div style={{ fontSize: '0.65rem', color: '#F5A623', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>INSURANCE</div>
          </div>
        </div>
        <span className="badge" style={{ background: '#EBF5F0', color: 'var(--success)' }}>VIP</span>
      </div>

      <div style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
        Revision de polizas y monitoreo de cumplimiento incluido. Andrea y su equipo se aseguran de que tu negocio siempre este protegido.
      </div>

      {/* Required */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div className="section-label" style={{ marginBottom: '0.45rem', color: 'var(--danger)' }}>Requeridos por ley / estandar de la industria</div>
        {REQUIRED.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)', flexShrink: 0, marginTop: 6 }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--slate)', lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Optional */}
      <div style={{ marginBottom: '1rem' }}>
        <div className="section-label" style={{ marginBottom: '0.45rem', color: 'var(--success)' }}>Coberturas opcionales recomendadas</div>
        {OPTIONAL.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', flexShrink: 0, marginTop: 6 }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      <button style={{ width: '100%', background: 'var(--white)', color: '#2A6DB5', border: '1px solid #A0D4B8', borderRadius: 'var(--radius)', padding: '0.55rem 1rem', fontSize: '0.84rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
        Hablar con Andrea — Zivo Insurance
      </button>
    </div>
  )
}
