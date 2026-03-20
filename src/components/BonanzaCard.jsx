
import React from 'react'

export default function BonanzaCard({ onChat }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #B8CCEE', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1rem' }}>
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'var(--bonanza-navy)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-body)' }}>B</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--bonanza-navy)', fontFamily: 'var(--font-body)' }}>BONANZA</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--bonanza-green)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>QUICK LOANS</div>
            </div>
          </div>
        </div>
        <span className="badge" style={{ background: '#EBF0F8', color: 'var(--bonanza-navy)', fontSize: '0.67rem' }}>Cliente VIP</span>
      </div>

      {/* Tagline */}
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--slate)', marginBottom: '0.5rem', fontWeight: 500 }}>
        Prestamos personales, sobre titulo y negocios.
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--slate-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
        Sin SSN. Estamos siempre aqui para apoyar el crecimiento de tu negocio. Habla con nosotros directamente — es gratis y sin compromiso.
      </div>

      {/* CTA */}
      <button
        onClick={onChat}
        style={{ width: '100%', background: 'linear-gradient(135deg, var(--bonanza-navy) 0%, #0d2038 100%)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: '0.65rem 1rem', fontSize: '0.855rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        Hablar con mi Loan Officer
        <span style={{ fontSize: '1rem' }}>&#8594;</span>
      </button>
    </div>
  )
}
