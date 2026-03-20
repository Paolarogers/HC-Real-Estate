import React, { useState } from 'react'

// ── Demo data seeded for HC Real Estate ────────────────────────
const MONTHS = ['Enero 2026','Febrero 2026','Marzo 2026']
const CURRENT_MONTH = 'Marzo 2026'

const demoExpenses = [
  // Fixed
  { id:'e1', category:'Renta de oficina', amount:1200, cost_type:'fixed', month:'Marzo 2026', vendor:'Propietario' },
  { id:'e2', category:'Internet y telefono', amount:120, cost_type:'fixed', month:'Marzo 2026', vendor:'AT&T' },
  { id:'e3', category:'Seguro comercial (Zivo)', amount:180, cost_type:'fixed', month:'Marzo 2026', vendor:'Zivo Insurance' },
  { id:'e4', category:'Software y subscripciones', amount:150, cost_type:'fixed', month:'Marzo 2026', vendor:'Varios' },
  { id:'e5', category:'Contabilidad', amount:200, cost_type:'fixed', month:'Marzo 2026', vendor:'Contador' },
  { id:'e6', category:'Nomina fija', amount:2500, cost_type:'fixed', month:'Marzo 2026', vendor:'Staff' },
  // Variable
  { id:'e7', category:'Comisiones agentes', amount:800, cost_type:'variable', month:'Marzo 2026', vendor:'Agentes' },
  { id:'e8', category:'Meta Ads y publicidad', amount:300, cost_type:'variable', month:'Marzo 2026', vendor:'Meta' },
  { id:'e9', category:'Procesamiento de pagos', amount:210, cost_type:'variable', month:'Marzo 2026', vendor:'Square' },
  { id:'e10', category:'Materiales y suministros', amount:150, cost_type:'variable', month:'Marzo 2026', vendor:'Varios' },
  // Feb
  { id:'e11', category:'Renta de oficina', amount:1200, cost_type:'fixed', month:'Febrero 2026', vendor:'Propietario' },
  { id:'e12', category:'Internet y telefono', amount:120, cost_type:'fixed', month:'Febrero 2026', vendor:'AT&T' },
  { id:'e13', category:'Seguro comercial (Zivo)', amount:180, cost_type:'fixed', month:'Febrero 2026', vendor:'Zivo Insurance' },
  { id:'e14', category:'Software y subscripciones', amount:150, cost_type:'fixed', month:'Febrero 2026', vendor:'Varios' },
  { id:'e15', category:'Contabilidad', amount:200, cost_type:'fixed', month:'Febrero 2026', vendor:'Contador' },
  { id:'e16', category:'Nomina fija', amount:2500, cost_type:'fixed', month:'Febrero 2026', vendor:'Staff' },
  { id:'e17', category:'Comisiones agentes', amount:600, cost_type:'variable', month:'Febrero 2026', vendor:'Agentes' },
  { id:'e18', category:'Meta Ads y publicidad', amount:300, cost_type:'variable', month:'Febrero 2026', vendor:'Meta' },
]

const demoRevenue = { 'Marzo 2026': 7200, 'Febrero 2026': 5800, 'Enero 2026': 4200 }
const demoGoal = { 'Marzo 2026': 12000, 'Febrero 2026': 10000 }

const BENCHMARKS = { fixed: 25, variable: 40, gross_margin: 35 }

const SERVICE_DATA = [
  { name:'Comision compra', revenue:4200, sessions:2, direct_cost_pct:30 },
  { name:'Comision renta', revenue:1350, sessions:1, direct_cost_pct:20 },
  { name:'Honorarios consulta', revenue:900, sessions:3, direct_cost_pct:10 },
  { name:'Comision referido', revenue:750, sessions:1, direct_cost_pct:15 },
]

function Arrow({ pct }) {
  if (pct > 0) return <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 500 }}>↑ {pct}%</span>
  if (pct < 0) return <span style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 500 }}>↓ {Math.abs(pct)}%</span>
  return <span style={{ color: 'var(--slate-muted)', fontSize: '0.85rem' }}>→ 0%</span>
}

function Kpi({ label, value, sub, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 700, color: color || 'var(--slate)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export default function FinancialsPage() {
  const [tab, setTab] = useState('pnl')
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [goalInput, setGoalInput] = useState('')
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', cost_type: 'fixed', vendor: '' })
  const [expenses, setExpenses] = useState(demoExpenses)
  const [goals, setGoals] = useState(demoGoal)

  // ── Calculations ────────────────────────────────────────────
  const revenue = demoRevenue[month] || 0
  const prevMonth = month === 'Marzo 2026' ? 'Febrero 2026' : month === 'Febrero 2026' ? 'Enero 2026' : null
  const prevRevenue = prevMonth ? (demoRevenue[prevMonth] || 0) : 0
  const monthExpenses = expenses.filter(e => e.month === month)
  const fixedCosts = monthExpenses.filter(e => e.cost_type === 'fixed').reduce((s, e) => s + e.amount, 0)
  const variableCosts = monthExpenses.filter(e => e.cost_type === 'variable').reduce((s, e) => s + e.amount, 0)
  const totalExpenses = fixedCosts + variableCosts
  const grossProfit = revenue - variableCosts
  const netProfit = revenue - totalExpenses
  const grossMarginPct = revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0
  const netMarginPct = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0
  const fixedPct = revenue > 0 ? Math.round((fixedCosts / revenue) * 100) : 0
  const variablePct = revenue > 0 ? Math.round((variableCosts / revenue) * 100) : 0
  const prevExpenses = expenses.filter(e => e.month === prevMonth).reduce((s, e) => s + e.amount, 0)
  const prevNet = prevRevenue - prevExpenses
  const trendPct = prevNet !== 0 ? Math.round(((netProfit - prevNet) / Math.abs(prevNet)) * 100) : 0

  const goal = goals[month] || 0
  const confirmed = revenue
  const pipeline = 3200
  const recurring = 0
  const projected = confirmed + pipeline + recurring
  const gap = goal - projected
  const onTrack = projected >= goal

  // Health score
  const netScore = Math.min(30, Math.max(0, netMarginPct > 0 ? Math.round((netMarginPct / 40) * 30) : 0))
  const trendScore = trendPct > 0 ? 20 : trendPct === 0 ? 10 : 0
  const fixedScore = fixedPct <= BENCHMARKS.fixed ? 20 : Math.max(0, 20 - Math.round((fixedPct - BENCHMARKS.fixed) * 0.8))
  const activeClients = 4
  const inactiveClients = 1
  const clientScore = Math.round((activeClients / (activeClients + inactiveClients)) * 15)
  const goalScore = goal > 0 ? Math.min(15, Math.round((projected / goal) * 15)) : 7
  const healthScore = netScore + trendScore + fixedScore + clientScore + goalScore

  function saveExpense() {
    if (!newExpense.category || !newExpense.amount) return
    setExpenses(prev => [...prev, { ...newExpense, id: 'e' + Date.now(), amount: parseFloat(newExpense.amount), month }])
    setNewExpense({ category: '', amount: '', cost_type: 'fixed', vendor: '' })
    setShowExpenseForm(false)
  }

  function saveGoal() {
    if (!goalInput) return
    setGoals(prev => ({ ...prev, [month]: parseFloat(goalInput) }))
    setGoalInput('')
    setShowGoalForm(false)
  }

  const scoreColor = healthScore >= 80 ? 'var(--success)' : healthScore >= 60 ? 'var(--warning)' : 'var(--danger)'
  const scoreLabel = healthScore >= 80 ? 'Negocio saludable' : healthScore >= 60 ? 'Estable' : healthScore >= 40 ? 'Atencion necesaria' : 'Accion urgente'

  return (
    <div className="page-body">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Inteligencia Financiera</h2>
          <p>P&L, costos, proyeccion, rentabilidad y salud del negocio</p>
        </div>
        <div className="page-actions">
          <select className="filter-select" value={month} onChange={e => setMonth(e.target.value)}>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button className="btn btn-secondary btn-sm">Exportar CSV</button>
          <button className="btn btn-secondary btn-sm">Descargar PDF</button>
          <button className="btn btn-ghost btn-sm">Compartir con HC</button>
        </div>
      </div>

      {/* 5 Sub-tabs */}
      <div className="tabs">
        {[
          { id: 'pnl', label: 'P&L Inteligente' },
          { id: 'costos', label: 'Costos Fijos / Variables' },
          { id: 'proyeccion', label: 'Proyeccion' },
          { id: 'rentabilidad', label: 'Rentabilidad' },
          { id: 'salud', label: 'Salud del Negocio' },
        ].map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: P&L ─────────────────────────────────────────── */}
      {tab === 'pnl' && (
        <div>
          {/* KPI strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow)' }}>
            <Kpi label="Ingresos del Mes" value={`$${revenue.toLocaleString()}`} color="var(--success)" />
            <Kpi label="Costos Directos" value={`$${variableCosts.toLocaleString()}`} color="var(--warning)" />
            <Kpi label="Utilidad Bruta" value={`$${grossProfit.toLocaleString()}`} sub={`${grossMarginPct}% margen`} color={grossMarginPct >= 35 ? 'var(--success)' : 'var(--warning)'} />
            <Kpi label="Gastos Operativos" value={`$${totalExpenses.toLocaleString()}`} color="var(--slate-muted)" />
            <Kpi label="Utilidad Neta" value={`$${netProfit.toLocaleString()}`} sub={<Arrow pct={trendPct} />} color={netProfit >= 0 ? 'var(--success)' : 'var(--danger)'} />
          </div>

          {/* Two column P&L */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Ingresos */}
            <div className="card">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, color: 'var(--success)', borderBottom: '2px solid var(--success)', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>Ingresos</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.875rem' }}>Comisiones cobradas</span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-body)' }}>${revenue.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700 }}>
                <span>Total ingresos</span>
                <span style={{ color: 'var(--success)', fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>${revenue.toLocaleString()}</span>
              </div>
              {prevRevenue > 0 && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--slate-muted)' }}>
                  vs mes anterior: ${prevRevenue.toLocaleString()} <Arrow pct={Math.round(((revenue - prevRevenue) / prevRevenue) * 100)} />
                </div>
              )}
            </div>

            {/* Gastos */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--danger)', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, color: 'var(--danger)' }}>Gastos</span>
                <button className="btn btn-primary btn-sm" onClick={() => setShowExpenseForm(!showExpenseForm)}>+ Registrar Gasto</button>
              </div>
              {monthExpenses.map(e => (
                <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.84rem' }}>
                  <span style={{ color: 'var(--slate)' }}>{e.category}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span className={`badge badge-${e.cost_type === 'fixed' ? 'slate' : 'gold'}`} style={{ fontSize: '0.62rem' }}>{e.cost_type === 'fixed' ? 'Fijo' : 'Variable'}</span>
                    <span style={{ fontWeight: 500, fontFamily: 'var(--font-body)' }}>${e.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700 }}>
                <span>Total gastos</span>
                <span style={{ color: 'var(--danger)', fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>${totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Expense form */}
          {showExpenseForm && (
            <div className="card" style={{ marginBottom: '1.25rem', border: '1px solid var(--gold-light)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Registrar Gasto</h3>
              <div className="form-grid-2">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Descripcion</label>
                  <input value={newExpense.category} onChange={e => setNewExpense(p => ({ ...p, category: e.target.value }))} placeholder="ej. Renta de oficina" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Monto ($)</label>
                  <input type="number" value={newExpense.amount} onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))} placeholder="0.00" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Tipo</label>
                  <select value={newExpense.cost_type} onChange={e => setNewExpense(p => ({ ...p, cost_type: e.target.value }))}>
                    <option value="fixed">Fijo</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Proveedor / Pagado a</label>
                  <input value={newExpense.vendor} onChange={e => setNewExpense(p => ({ ...p, vendor: e.target.value }))} placeholder="ej. AT&T" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn btn-primary btn-sm" onClick={saveExpense}>Guardar gasto</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowExpenseForm(false)}>Cancelar</button>
              </div>
            </div>
          )}

          {/* Net summary */}
          <div className="card-gold" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', marginBottom: 4 }}>Utilidad bruta</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--slate)' }}>${grossProfit.toLocaleString()}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)' }}>{grossMarginPct}% margen</div>
            </div>
            <div style={{ width: 1, height: 60, background: 'var(--gold-light)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', marginBottom: 4 }}>Utilidad neta</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.75rem', fontWeight: 700, color: netProfit >= 0 ? 'var(--success)' : 'var(--danger)' }}>${netProfit.toLocaleString()}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)' }}>{netMarginPct}% margen</div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: COSTOS ──────────────────────────────────────── */}
      {tab === 'costos' && (
        <div>
          {/* Benchmark alerts */}
          {fixedPct > BENCHMARKS.fixed && (
            <div className="alert-strip alert-warning" style={{ marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Costos fijos por encima del rango recomendado</div>
                <div style={{ fontSize: '0.82rem', marginTop: 2 }}>Tus costos fijos representan el {fixedPct}% de tus ingresos. El rango recomendado para Real Estate es menos del {BENCHMARKS.fixed}%. Revisa que gastos fijos puedes reducir o diferir.</div>
              </div>
            </div>
          )}
          {variablePct > BENCHMARKS.variable && (
            <div className="alert-strip alert-warning" style={{ marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Costos variables por encima del rango recomendado</div>
                <div style={{ fontSize: '0.82rem', marginTop: 2 }}>Tus costos variables representan el {variablePct}% de tus ingresos. El rango saludable para Real Estate es menos del {BENCHMARKS.variable}%.</div>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Fixed */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Costos Fijos</h3>
                <span className="badge badge-slate">No cambian con el volumen</span>
              </div>
              {monthExpenses.filter(e => e.cost_type === 'fixed').map(e => (
                <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  <span>{e.category}</span>
                  <span style={{ fontWeight: 500, fontFamily: 'var(--font-body)' }}>${e.amount.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700 }}>
                <span>Total fijos</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>${fixedCosts.toLocaleString()}</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                  <span style={{ color: 'var(--slate-muted)' }}>% de ingresos</span>
                  <span style={{ color: fixedPct > BENCHMARKS.fixed ? 'var(--danger)' : 'var(--success)', fontWeight: 500 }}>{fixedPct}% {fixedPct > BENCHMARKS.fixed ? '(sobre limite)' : '(dentro del rango)'}</span>
                </div>
                <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(fixedPct, 100)}%`, height: '100%', background: fixedPct > BENCHMARKS.fixed ? 'var(--danger)' : 'var(--success)', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', marginTop: 3 }}>Limite recomendado para Real Estate: {BENCHMARKS.fixed}%</div>
              </div>
            </div>

            {/* Variable */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Costos Variables</h3>
                <span className="badge badge-gold">Cambian con el volumen</span>
              </div>
              {monthExpenses.filter(e => e.cost_type === 'variable').map(e => (
                <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  <span>{e.category}</span>
                  <span style={{ fontWeight: 500, fontFamily: 'var(--font-body)' }}>${e.amount.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700 }}>
                <span>Total variables</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>${variableCosts.toLocaleString()}</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                  <span style={{ color: 'var(--slate-muted)' }}>% de ingresos</span>
                  <span style={{ color: variablePct > BENCHMARKS.variable ? 'var(--danger)' : 'var(--success)', fontWeight: 500 }}>{variablePct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(variablePct, 100)}%`, height: '100%', background: variablePct > BENCHMARKS.variable ? 'var(--danger)' : 'var(--gold)', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--slate-muted)', marginTop: 3 }}>Limite recomendado para Real Estate: {BENCHMARKS.variable}%</div>
              </div>
            </div>
          </div>

          {/* Benchmark table */}
          <div className="card">
            <h3 style={{ marginBottom: '0.85rem' }}>Rangos saludables por vertical — Orbita</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Vertical</th><th>Costos Fijos</th><th>Costos Variables</th><th>Margen Bruto</th></tr></thead>
                <tbody>
                  {[
                    ['Real Estate', '< 25%', '< 40%', '> 35%'],
                    ['Grooming', '< 40%', '< 30%', '> 30%'],
                    ['SPA / Estetica', '< 40%', '< 25%', '> 35%'],
                    ['Taxes / Inmigracion', '< 50%', '< 15%', '> 35%'],
                    ['Contratista', '< 20%', '< 55%', '> 25%'],
                  ].map(([v, f, va, m]) => (
                    <tr key={v} style={{ background: v === 'Real Estate' ? 'var(--gold-pale)' : undefined }}>
                      <td style={{ fontWeight: v === 'Real Estate' ? 600 : 400 }}>{v}</td>
                      <td>{f}</td><td>{va}</td><td>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: PROYECCION ──────────────────────────────────── */}
      {tab === 'proyeccion' && (
        <div>
          {/* Goal setting */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            {goal > 0 ? (
              <button className="btn btn-secondary btn-sm" onClick={() => setShowGoalForm(true)}>Editar meta del mes</button>
            ) : (
              <button className="btn btn-gold btn-sm" onClick={() => setShowGoalForm(true)}>Definir meta del mes</button>
            )}
          </div>
          {showGoalForm && (
            <div className="card" style={{ marginBottom: '1.25rem', border: '1px solid var(--gold-light)' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Meta de {month}</h3>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                  <label>Mi meta para {month} es $</label>
                  <input type="number" value={goalInput} onChange={e => setGoalInput(e.target.value)} placeholder="12000" />
                </div>
                <button className="btn btn-primary btn-sm" style={{ marginBottom: 0 }} onClick={saveGoal}>Guardar meta</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowGoalForm(false)}>Cancelar</button>
              </div>
            </div>
          )}

          {/* Projection components */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Revenue confirmado', value: confirmed, desc: 'Recibos pagados este mes', color: 'var(--success)' },
              { label: 'Revenue en pipeline', value: pipeline, desc: 'Transacciones pendientes de cierre', color: 'var(--warning)' },
              { label: 'Revenue recurrente', value: recurring, desc: 'Membresias y contratos activos', color: 'var(--info)' },
            ].map(item => (
              <div key={item.label} className="stat-card accent">
                <div className="stat-label">{item.label}</div>
                <div className="stat-value" style={{ color: item.color, fontFamily: 'var(--font-body)', fontSize: '1.75rem', fontWeight: 700 }}>${item.value.toLocaleString()}</div>
                <div className="stat-sub">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Total vs goal */}
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Proyeccion total vs meta</h3>
              {goal > 0 && <span className={`badge badge-${onTrack ? 'success' : 'danger'}`}>{onTrack ? 'En camino' : 'Por debajo de la meta'}</span>}
            </div>
            <div style={{ display: 'flex', gap: '3rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 4 }}>Total proyectado</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--slate)' }}>${projected.toLocaleString()}</div>
              </div>
              {goal > 0 && (
                <div>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-muted)', marginBottom: 4 }}>Meta del mes</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--gold)' }}>${goal.toLocaleString()}</div>
                </div>
              )}
            </div>
            {goal > 0 && (
              <div>
                <div style={{ height: 10, background: 'var(--border-light)', borderRadius: 5, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ width: `${Math.min((projected / goal) * 100, 100)}%`, height: '100%', background: onTrack ? 'var(--success)' : 'var(--gold)', borderRadius: 5, transition: 'width 0.5s' }} />
                </div>
                {!onTrack ? (
                  <div className="alert-strip alert-danger" style={{ marginTop: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>Te faltan ${Math.abs(gap).toLocaleString()} para tu meta</div>
                      <div style={{ fontSize: '0.82rem', marginTop: 2 }}>Tienes transacciones en pipeline que pueden cerrar esa brecha. Revisa el Centro de Reactivacion para recuperar clientes inactivos.</div>
                    </div>
                  </div>
                ) : (
                  <div className="alert-strip" style={{ marginTop: '0.75rem', background: 'var(--success-bg)', border: '1px solid #A0D4B8', color: 'var(--success)' }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>Vas a superar tu meta por ${Math.abs(gap).toLocaleString()}</div>
                      <div style={{ fontSize: '0.82rem', marginTop: 2 }}>Considera aumentar la meta para el mes que viene. Las comisiones de compra son el servicio que mas contribuye al surplus este mes.</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 4: RENTABILIDAD ────────────────────────────────── */}
      {tab === 'rentabilidad' && (
        <div>
          <div className="table-wrap" style={{ marginBottom: '1.25rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Revenue</th>
                  <th>Sesiones</th>
                  <th>Ticket promedio</th>
                  <th>Costo directo est.</th>
                  <th>Margen bruto</th>
                  <th>Margen %</th>
                </tr>
              </thead>
              <tbody>
                {[...SERVICE_DATA].sort((a, b) => {
                  const mA = 100 - a.direct_cost_pct
                  const mB = 100 - b.direct_cost_pct
                  return mB - mA
                }).map((s, i) => {
                  const marginPct = 100 - s.direct_cost_pct
                  const directCost = Math.round(s.revenue * (s.direct_cost_pct / 100))
                  const grossM = s.revenue - directCost
                  const ticket = Math.round(s.revenue / s.sessions)
                  return (
                    <tr key={s.name}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{s.name}</div>
                        {i === 0 && <div style={{ fontSize: '0.7rem', color: 'var(--success)' }}>Mas rentable</div>}
                      </td>
                      <td style={{ fontWeight: 500, fontFamily: 'var(--font-body)' }}>${s.revenue.toLocaleString()}</td>
                      <td>{s.sessions}</td>
                      <td style={{ fontFamily: 'var(--font-body)' }}>${ticket.toLocaleString()}</td>
                      <td style={{ color: 'var(--slate-muted)', fontFamily: 'var(--font-body)' }}>${directCost.toLocaleString()}</td>
                      <td style={{ fontWeight: 600, fontFamily: 'var(--font-body)', color: 'var(--success)' }}>${grossM.toLocaleString()}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, height: 6, background: 'var(--border-light)', borderRadius: 3, minWidth: 60 }}>
                            <div style={{ width: `${marginPct}%`, height: '100%', background: marginPct >= 35 ? 'var(--success)' : 'var(--warning)', borderRadius: 3 }} />
                          </div>
                          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: marginPct >= 35 ? 'var(--success)' : 'var(--warning)', minWidth: 36 }}>{marginPct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="alert-strip alert-info">
            <div>
              <div style={{ fontWeight: 500 }}>Oportunidad de mejora</div>
              <div style={{ fontSize: '0.82rem', marginTop: 2 }}>Las consultas tienen el margen mas alto por hora pero el volumen mas bajo. Considera agregar mas slots de consulta en tu agenda este mes para maximizar la rentabilidad por hora.</div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: SALUD ───────────────────────────────────────── */}
      {tab === 'salud' && (
        <div>
          {/* Big score */}
          <div className="card" style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '2.5rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-muted)', marginBottom: '1rem' }}>Puntaje de Salud Financiera — {month}</div>
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 160, height: 160, marginBottom: '1rem' }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="65" fill="none" stroke="var(--border-light)" strokeWidth="14" />
                <circle cx="80" cy="80" r="65" fill="none" stroke={scoreColor} strokeWidth="14"
                  strokeDasharray={`${(healthScore / 100) * 408} 408`}
                  strokeLinecap="round" transform="rotate(-90 80 80)" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{healthScore}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--slate-muted)' }}>de 100</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 500, color: scoreColor }}>{scoreLabel}</div>
          </div>

          {/* Score breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Margen neto', score: netScore, max: 30 },
              { label: 'Tendencia', score: trendScore, max: 20 },
              { label: 'Costos fijos', score: fixedScore, max: 20 },
              { label: 'Clientes activos', score: clientScore, max: 15 },
              { label: 'Meta del mes', score: goalScore, max: 15 },
            ].map(c => (
              <div key={c.label} className="card-sm" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.67rem', color: 'var(--slate-muted)', marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate)' }}>{c.score}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--slate-light)' }}>de {c.max}</div>
                <div style={{ height: 4, background: 'var(--border-light)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${(c.score / c.max) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Top 3 action items */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Los 3 factores que mas afectan tu puntaje este mes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { num: 1, title: 'Costos fijos como % de ingresos', desc: `Tus costos fijos son el ${fixedPct}% de tus ingresos. El rango recomendado para Real Estate es menos del ${BENCHMARKS.fixed}%. Revisa si alguna subscripcion o gasto recurrente puede eliminarse o negociarse.`, impact: fixedPct > BENCHMARKS.fixed ? 'alto' : 'bajo' },
                { num: 2, title: 'Proyeccion vs meta del mes', desc: goal > 0 ? `Tu proyeccion esta $${Math.abs(gap).toLocaleString()} ${onTrack ? 'por encima' : 'por debajo'} de tu meta. ${!onTrack ? 'Tienes transacciones en pipeline que pueden cerrar esa brecha esta semana.' : 'Considera aumentar la meta para el mes que viene.'}` : 'Define una meta mensual para que el sistema pueda calcular tu progreso y darte acciones concretas.', impact: onTrack ? 'bajo' : 'medio' },
                { num: 3, title: 'Tendencia vs mes anterior', desc: trendPct > 0 ? `Tu utilidad neta mejoro ${trendPct}% respecto al mes anterior. Sigue asi — la tendencia positiva es uno de los indicadores mas importantes de salud.` : `Tu utilidad neta bajo ${Math.abs(trendPct)}% respecto al mes anterior. Revisa que cambio en costos o ingresos genero esa diferencia.`, impact: trendPct > 0 ? 'positivo' : 'medio' },
              ].map(f => (
                <div key={f.num} style={{ display: 'flex', gap: '0.85rem', padding: '0.85rem', background: 'var(--parchment)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--slate)', color: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>{f.num}</div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--slate-muted)', lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score ranges reference */}
          <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
            <table>
              <thead><tr><th>Puntaje</th><th>Estado</th><th>Lo que significa</th></tr></thead>
              <tbody>
                {[
                  ['80 – 100', 'Negocio saludable', 'Sigue asi — estas operando bien'],
                  ['60 – 79', 'Estable', 'Hay areas de mejora — revisa las alertas'],
                  ['40 – 59', 'Atencion necesaria', 'Revisa tus costos fijos este mes'],
                  ['0 – 39', 'Accion urgente', 'Habla con tu equipo HC esta semana'],
                ].map(([s, e, d]) => (
                  <tr key={s} style={{ background: healthScore >= parseInt(s) && (s === '80 – 100' ? healthScore >= 80 : s === '60 – 79' ? healthScore >= 60 && healthScore < 80 : s === '40 – 59' ? healthScore >= 40 && healthScore < 60 : healthScore < 40) ? 'var(--gold-pale)' : undefined }}>
                    <td style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{s}</td>
                    <td><span className="badge badge-slate">{e}</span></td>
                    <td style={{ fontSize: '0.84rem', color: 'var(--slate-muted)' }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
