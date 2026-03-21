import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'

// Demo bypass credentials
const DEMO_USERS = [
  { email: 'paola@hispanos.com',   password: 'orbita2026', name: 'Paola Rogers',  role: 'owner' },
  { email: 'dayana@hispanos.com',  password: 'orbita2026', name: 'Dayana',        role: 'agent' },
  { email: 'admin@hcrealestate.com',password:'orbita2026', name: 'Admin',         role: 'owner' },
]

export default function LoginPage({ onLogin }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [lang,     setLang]     = useState('es')

  const es = lang === 'es'

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Demo bypass — check local credentials first
    const demo = DEMO_USERS.find(u => u.email === email.toLowerCase() && u.password === password)
    if (demo) {
      setTimeout(() => {
        setLoading(false)
        if (onLogin) onLogin({ name: demo.name, role: demo.role, email: demo.email })
      }, 600)
      return
    }

    // Try Supabase auth
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        // If Supabase not configured, fall back gracefully
        if (authError.message?.includes('fetch') || authError.message?.includes('network') || authError.message?.includes('placeholder')) {
          setError(es ? 'Usa las credenciales de demo: paola@hispanos.com / orbita2026' : 'Use demo credentials: paola@hispanos.com / orbita2026')
        } else {
          setError(es ? 'Correo o contrasena incorrectos.' : 'Incorrect email or password.')
        }
        setLoading(false)
        return
      }
      if (data?.user) {
        setLoading(false)
        if (onLogin) onLogin({ name: data.user.email, role: 'owner', email: data.user.email })
      }
    } catch (err) {
      setError(es ? 'Usa las credenciales de demo: paola@hispanos.com / orbita2026' : 'Use demo credentials: paola@hispanos.com / orbita2026')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--slate)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', fontFamily: 'var(--font-body)',
      backgroundImage: 'radial-gradient(ellipse at 70% 30%, #2A3F55 0%, var(--slate) 60%)'
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/HC_logo_3d.png" alt="Hispanos Comunidad" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: '1rem' }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 500, color: '#fff', marginBottom: 4 }}>
            HC Real Estate
          </div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Orbita — Hispanos Comunidad
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.25rem'
        }}>
          <h2 style={{ color: '#fff', marginBottom: '0.35rem', fontSize: '1.4rem' }}>
            {es ? 'Bienvenido' : 'Welcome'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.84rem', marginBottom: '1.75rem' }}>
            {es ? 'Acceso exclusivo para personal autorizado.' : 'Authorized staff access only.'}
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: 6, fontWeight: 500 }}>
                {es ? 'Correo electronico' : 'Email address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={es ? 'tu@correo.com' : 'your@email.com'}
                required
                style={{
                  width: '100%', padding: '0.65rem 0.9rem',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius)', color: '#fff', fontSize: '0.9rem',
                  outline: 'none', transition: 'border-color 0.15s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: 6, fontWeight: 500 }}>
                {es ? 'Contrasena' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '0.65rem 0.9rem',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius)', color: '#fff', fontSize: '0.9rem',
                  outline: 'none', transition: 'border-color 0.15s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(192,80,74,0.15)', border: '1px solid rgba(192,80,74,0.4)',
                borderRadius: 'var(--radius)', padding: '0.65rem 0.9rem',
                fontSize: '0.82rem', color: '#F4A09A', marginBottom: '1.25rem', lineHeight: 1.5
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.78rem',
                background: loading ? 'var(--gold-dark)' : 'var(--gold)',
                color: 'var(--slate)', border: 'none', borderRadius: 'var(--radius)',
                fontSize: '0.9rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                letterSpacing: '0.02em'
              }}>
              {loading ? (es ? 'Iniciando sesion...' : 'Signing in...') : (es ? 'Iniciar sesion' : 'Sign in')}
            </button>
          </form>

          {/* Demo hint */}
          <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(184,154,74,0.1)', border: '1px solid rgba(184,154,74,0.2)', borderRadius: 'var(--radius)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
            <div style={{ fontWeight: 600, color: 'var(--gold-light)', marginBottom: 3 }}>{es ? 'Acceso demo' : 'Demo access'}</div>
            <div>paola@hispanos.com / orbita2026</div>
          </div>
        </div>

        {/* Language toggle */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setLang('es')}
            style={{ background: 'none', border: 'none', color: lang==='es' ? 'var(--gold)' : 'rgba(255,255,255,0.35)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: lang==='es' ? 600 : 400 }}>
            Espanol
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>|</span>
          <button
            onClick={() => setLang('en')}
            style={{ background: 'none', border: 'none', color: lang==='en' ? 'var(--gold)' : 'rgba(255,255,255,0.35)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: lang==='en' ? 600 : 400 }}>
            English
          </button>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <img src="/HC_logo_3d.png" alt="HC" style={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.4, marginBottom: 6 }} />
          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.7 }}>
            HC Business &amp; Media · Orbita<br/>
            © 2026 Hispanos Comunidad. Todos los derechos reservados.<br/>
            Greenville, SC USA
          </div>
        </div>
      </div>
    </div>
  )
}
