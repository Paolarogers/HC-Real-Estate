import React, { useState } from 'react'

const MONTHS = ['Enero 2026', 'Febrero 2026', 'Marzo 2026']
const CURRENT = 'Marzo 2026'

const DEMO_REVENUE = { 'Marzo 2026': 7200, 'Febrero 2026': 5800, 'Enero 2026': 4200 }
const DEMO_GOALS   = { 'Marzo 2026': 12000, 'Febrero 2026': 10000 }

const INIT_EXPENSES = [
  { id:'e1',  category:'Renta de oficina',          amount:1200, cost_type:'fixed',    month:'Marzo 2026',    vendor:'Propietario' },
  { id:'e2',  category:'Internet y telefono',        amount:120,  cost_type:'fixed',    month:'Marzo 2026',    vendor:'AT&T' },
  { id:'e3',  category:'Seguro comercial (Zivo)',    amount:180,  cost_type:'fixed',    month:'Marzo 2026',    vendor:'Zivo Insurance' },
  { id:'e4',  category:'Software y subscripciones',  amount:150,  cost_type:'fixed',    month:'Marzo 2026',    vendor:'Varios' },
  { id:'e5',  category:'Contabilidad',               amount:200,  cost_type:'fixed',    month:'Marzo 2026',    vendor:'Contador' },
  { id:'e6',  category:'Nomina fija',                amount:2500, cost_type:'fixed',    month:'Marzo 2026',    vendor:'Staff' },
  { id:'e7',  category:'Comisiones agentes',         amount:800,  cost_type:'variable', month:'Marzo 2026',    vendor:'Agentes' },
  { id:'e8',  category:'Meta Ads y publicidad',      amount:300,  cost_type:'variable', month:'Marzo 2026',    vendor:'Meta' },
  { id:'e9',  category:'Procesamiento de pagos',     amount:210,  cost_type:'variable', month:'Marzo 2026',    vendor:'Square' },
  { id:'e10', category:'Materiales y suministros',   amount:150,  cost_type:'variable', month:'Marzo 2026',    vendor:'Varios' },
  { id:'e11', category:'Renta de oficina',            amount:1200, cost_type:'fixed',    month:'Febrero 2026',  vendor:'Propietario' },
  { id:'e12', category:'Internet y telefono',        amount:120,  cost_type:'fixed',    month:'Febrero 2026',  vendor:'AT&T' },
  { id:'e13', category:'Seguro comercial (Zivo)',    amount:180,  cost_type:'fixed',    month:'Febrero 2026',  vendor:'Zivo Insurance' },
  { id:'e14', category:'Software y subscripciones',  amount:150,  cost_type:'fixed',    month:'Febrero 2026',  vendor:'Varios' },
  { id:'e15', category:'Contabilidad',               amount:200,  cost_type:'fixed',    month:'Febrero 2026',  vendor:'Contador' },
  { id:'e16', category:'Nomina fija',                amount:2500, cost_type:'fixed',    month:'Febrero 2026',  vendor:'Staff' },
  { id:'e17', category:'Comisiones agentes',         amount:600,  cost_type:'variable', month:'Febrero 2026',  vendor:'Agentes' },
  { id:'e18', category:'Meta Ads y publicidad',      amount:300,  cost_type:'variable', month:'Febrero 2026',  vendor:'Meta' },
]

const SERVICE_DATA = [
  { name:'Comision de compra',    revenue:4200, visits:2, cost_pct:30 },
  { name:'Comision de renta',     revenue:1350, visits:1, cost_pct:20 },
  { name:'Honorarios de consulta',revenue:900,  visits:3, cost_pct:10 },
  { name:'Comision por referido', revenue:750,  visits:1, cost_pct:15 },
]

const STAFF_DATA = [
  { name:'Dayana',  role:'Agente',    service:4200, retail:0,   commission_pct:20 },
  { name:'Amili',   role:'Agente',    service:1350, retail:0,   commission_pct:20 },
  { name:'Dollys',  role:'Asistente', service:0,    retail:0,   fixed:2500 },
]

const BENCHMARKS = { fixed:25, variable:40, gross_margin:35 }

function num(v) { return typeof v === 'number' ? v : 0 }
function money(v) { return '$' + num(v).toLocaleString() }
function pct(v)   { return num(v).toFixed(1) + '%' }

function Arrow({ val }) {
  if (val > 0) return <span style={{color:'var(--success)',fontWeight:600,fontFamily:'var(--font-body)'}}>↑ {val}%</span>
  if (val < 0) return <span style={{color:'var(--danger)', fontWeight:600,fontFamily:'var(--font-body)'}}>↓ {Math.abs(val)}%</span>
  return <span style={{color:'var(--slate-muted)',fontFamily:'var(--font-body)'}}>→ 0%</span>
}

function KpiStrip({ items }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:'1rem', background:'var(--white)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.25rem 1.5rem', marginBottom:'1.5rem', boxShadow:'var(--shadow)'}}>
      {items.map((k, i) => (
        <div key={i} style={{textAlign:'center', borderRight: i < items.length - 1 ? '1px solid var(--border-light)' : 'none', paddingRight: i < items.length - 1 ? '1rem' : 0}}>
          <div style={{fontSize:'0.67rem', textTransform:'uppercase', letterSpacing:'0.09em', color:'var(--slate-muted)', marginBottom:6, fontFamily:'var(--font-body)'}}>{k.label}</div>
          <div style={{fontFamily:'var(--font-body)', fontSize:'2rem', fontWeight:700, color:k.color||'var(--slate)', lineHeight:1, letterSpacing:'-0.02em'}}>{k.value}</div>
          {k.sub && <div style={{fontSize:'0.75rem', color:'var(--slate-muted)', marginTop:5, fontFamily:'var(--font-body)'}}>{k.sub}</div>}
        </div>
      ))}
    </div>
  )
}

function ExportBar() {
  return (
    <div style={{display:'flex', gap:'0.75rem', justifyContent:'flex-end', padding:'1rem 0', borderTop:'1px solid var(--border-light)', marginTop:'1.5rem'}}>
      <button className="btn btn-secondary btn-sm">Exportar para Contador (CSV)</button>
      <button className="btn btn-secondary btn-sm">Descargar PDF</button>
      <button className="btn btn-ghost btn-sm">Compartir con HC Media</button>
    </div>
  )
}

export default function FinancialsPage() {
  const [tab,     setTab]     = useState('pnl')
  const [month,   setMonth]   = useState(CURRENT)
  const [expenses,setExpenses]= useState(INIT_EXPENSES)
  const [goals,   setGoals]   = useState(DEMO_GOALS)
  const [showForm,setShowForm]= useState(false)
  const [showGoal,setShowGoal]= useState(false)
  const [newExp,  setNewExp]  = useState({category:'', amount:'', cost_type:'fixed', vendor:''})
  const [goalVal, setGoalVal] = useState('')

  // ── Derived numbers ────────────────────────────────────────
  const revenue    = DEMO_REVENUE[month] || 0
  const prevMonth  = month === 'Marzo 2026' ? 'Febrero 2026' : month === 'Febrero 2026' ? 'Enero 2026' : null
  const prevRev    = prevMonth ? (DEMO_REVENUE[prevMonth] || 0) : 0
  const me         = expenses.filter(e => e.month === month)
  const fixedTotal = me.filter(e => e.cost_type === 'fixed')   .reduce((s,e)=>s+e.amount, 0)
  const varTotal   = me.filter(e => e.cost_type === 'variable').reduce((s,e)=>s+e.amount, 0)
  const totalExp   = fixedTotal + varTotal
  const grossProfit= revenue - varTotal
  const netProfit  = revenue - totalExp
  const grossMargin= revenue > 0 ? Math.round((grossProfit/revenue)*100) : 0
  const netMargin  = revenue > 0 ? Math.round((netProfit/revenue)*100)   : 0
  const fixedPct   = revenue > 0 ? Math.round((fixedTotal/revenue)*100)  : 0
  const varPct     = revenue > 0 ? Math.round((varTotal/revenue)*100)    : 0
  const prevMe     = expenses.filter(e => e.month === prevMonth)
  const prevExp    = prevMe.reduce((s,e)=>s+e.amount,0)
  const prevNet    = prevRev - prevExp
  const trendPct   = prevNet !== 0 ? Math.round(((netProfit - prevNet)/Math.abs(prevNet))*100) : 0
  const goal       = goals[month] || 0
  const projected  = revenue + 3200
  const gap        = goal - projected
  const onTrack    = projected >= goal

  // Staff commissions
  const staffWithPay = STAFF_DATA.map(s => {
    const comm = s.fixed ? s.fixed : Math.round((s.service + s.retail) * (s.commission_pct / 100))
    return { ...s, payout: comm }
  })
  const totalPayroll = staffWithPay.reduce((s,x)=>s+x.payout,0)

  // Balance
  const totalAssets = revenue + 8500
  const totalLiab   = fixedTotal * 1.1 + totalPayroll * 0.3
  const netWorth    = totalAssets - totalLiab

  // Health score
  const netScore    = Math.min(30, Math.max(0, netMargin > 0 ? Math.round((netMargin/40)*30) : 0))
  const trendScore  = trendPct > 0 ? 20 : trendPct === 0 ? 10 : 0
  const fixedScore  = fixedPct <= BENCHMARKS.fixed ? 20 : Math.max(0, 20 - Math.round((fixedPct - BENCHMARKS.fixed) * 0.8))
  const clientScore = 11
  const goalScore   = goal > 0 ? Math.min(15, Math.round((projected/goal)*15)) : 7
  const healthScore = netScore + trendScore + fixedScore + clientScore + goalScore
  const scoreColor  = healthScore >= 80 ? 'var(--success)' : healthScore >= 60 ? 'var(--warning)' : 'var(--danger)'
  const scoreLabel  = healthScore >= 80 ? 'Saludable' : healthScore >= 60 ? 'Estable' : healthScore >= 40 ? 'Atencion' : 'Urgente'

  function saveExp() {
    if (!newExp.category || !newExp.amount) return
    setExpenses(prev => [...prev, { ...newExp, id:'e'+Date.now(), amount:parseFloat(newExp.amount), month }])
    setNewExp({category:'', amount:'', cost_type:'fixed', vendor:''})
    setShowForm(false)
  }
  function saveGoal() {
    if (!goalVal) return
    setGoals(prev => ({...prev, [month]: parseFloat(goalVal)}))
    setGoalVal('')
    setShowGoal(false)
  }

  const TABS = [
    { id:'pnl',          label:'P&L' },
    { id:'comisiones',   label:'Comisiones y Nomina' },
    { id:'revenue',      label:'Revenue por Servicio' },
    { id:'balance',      label:'Balance General' },
  ]

  return (
    <div className="page-body">

      {/* Page header with health score badge */}
      <div className="page-header">
        <div className="page-header-left">
          <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <h2>Reportes Financieros</h2>
            <div
              title="Puntaje de Salud Financiera — click para ver detalle"
              style={{display:'flex', alignItems:'center', gap:'0.4rem', background: scoreColor === 'var(--success)' ? 'var(--success-bg)' : scoreColor === 'var(--warning)' ? 'var(--warning-bg)' : 'var(--danger-bg)', border:`1px solid ${scoreColor}`, borderRadius:20, padding:'0.28rem 0.8rem', cursor:'pointer'}}>
              <span style={{fontFamily:'var(--font-body)', fontWeight:700, fontSize:'1rem', color:scoreColor}}>{healthScore}</span>
              <span style={{fontSize:'0.7rem', color:scoreColor, fontFamily:'var(--font-body)'}}>{scoreLabel}</span>
            </div>
          </div>
          <p>Inteligencia financiera completa — P&L, costos, rentabilidad y patrimonio</p>
        </div>
        <div className="page-actions">
          <select className="filter-select" value={month} onChange={e => setMonth(e.target.value)}>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* 4 Sub-tabs */}
      <div className="tabs">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: P&L ─────────────────────────────────────── */}
      {tab === 'pnl' && (
        <div>
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'0.75rem'}}>
            <button className="btn btn-primary btn-sm" onClick={()=>setShowForm(!showForm)}>+ Registrar Gasto</button>
          </div>

          <KpiStrip items={[
            { label:'Ingresos del Mes',  value:money(revenue),     color:'var(--success)' },
            { label:'Utilidad Bruta',    value:money(grossProfit), sub:`${grossMargin}% margen`, color:grossMargin>=35?'var(--success)':'var(--warning)' },
            { label:'Utilidad Neta',     value:money(netProfit),   sub:<Arrow val={trendPct}/>, color:netProfit>=0?'var(--success)':'var(--danger)' },
          ]} />

          {goal > 0 && (
            <div className={`alert-strip ${onTrack ? '' : 'alert-warning'}`} style={{marginBottom:'1rem', background:onTrack?'var(--success-bg)':'var(--warning-bg)', border:`1px solid ${onTrack?'#A0D4B8':'#E8CCA0'}`, color:onTrack?'var(--success)':'var(--warning)'}}>
              <div>
                <div style={{fontWeight:500}}>{onTrack ? `Vas a superar tu meta por ${money(Math.abs(gap))}` : `Te faltan ${money(Math.abs(gap))} para tu meta de ${money(goal)}`}</div>
                <div style={{fontSize:'0.78rem', marginTop:2}}>{onTrack ? 'Considera aumentar la meta para el mes que viene.' : 'Revisa el Centro de Reactivacion para recuperar clientes este mes.'}</div>
              </div>
            </div>
          )}

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem'}}>
            <div className="card">
              <div style={{fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:500, color:'var(--success)', borderBottom:'2px solid var(--success)', paddingBottom:'0.5rem', marginBottom:'0.85rem'}}>Ingresos</div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid var(--border-light)'}}>
                <span style={{fontSize:'0.875rem'}}>Comisiones cobradas</span>
                <span style={{fontWeight:600, fontFamily:'var(--font-body)'}}>{money(revenue)}</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0 0', fontWeight:700}}>
                <span>Total ingresos</span>
                <span style={{color:'var(--success)', fontFamily:'var(--font-body)', fontSize:'1.1rem'}}>{money(revenue)}</span>
              </div>
              {!goal && <button className="btn btn-ghost btn-sm" style={{marginTop:'0.75rem'}} onClick={()=>setShowGoal(true)}>+ Definir meta del mes</button>}
              {goal > 0 && (
                <div style={{marginTop:'0.75rem'}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.78rem', marginBottom:4}}>
                    <span style={{color:'var(--slate-muted)'}}>Meta: {money(goal)}</span>
                    <button className="btn btn-ghost btn-sm" style={{padding:'0 0.4rem', fontSize:'0.72rem'}} onClick={()=>setShowGoal(true)}>Editar</button>
                  </div>
                  <div style={{height:6, background:'var(--border-light)', borderRadius:3, overflow:'hidden'}}>
                    <div style={{width:`${Math.min((revenue/goal)*100, 100)}%`, height:'100%', background:onTrack?'var(--success)':'var(--gold)', borderRadius:3}} />
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <div style={{fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:500, color:'var(--danger)', borderBottom:'2px solid var(--danger)', paddingBottom:'0.5rem', marginBottom:'0.85rem'}}>Gastos</div>
              {me.map(e => (
                <div key={e.id} style={{display:'flex', justifyContent:'space-between', padding:'0.38rem 0', borderBottom:'1px solid var(--border-light)', fontSize:'0.84rem'}}>
                  <span>{e.category}</span>
                  <div style={{display:'flex', gap:'0.6rem', alignItems:'center'}}>
                    <span className={`badge badge-${e.cost_type==='fixed'?'slate':'gold'}`} style={{fontSize:'0.62rem'}}>{e.cost_type==='fixed'?'Fijo':'Variable'}</span>
                    <span style={{fontWeight:600, fontFamily:'var(--font-body)'}}>{money(e.amount)}</span>
                  </div>
                </div>
              ))}
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0 0', fontWeight:700}}>
                <span>Total gastos</span>
                <span style={{color:'var(--danger)', fontFamily:'var(--font-body)', fontSize:'1.1rem'}}>{money(totalExp)}</span>
              </div>
            </div>
          </div>

          {/* Goal form */}
          {showGoal && (
            <div className="card" style={{marginBottom:'1rem', border:'1px solid var(--gold-light)'}}>
              <h3 style={{marginBottom:'0.75rem'}}>Meta de {month}</h3>
              <div style={{display:'flex', gap:'0.75rem', alignItems:'flex-end'}}>
                <div className="form-group" style={{marginBottom:0, flex:1}}>
                  <label>Mi meta para {month} es $</label>
                  <input type="number" value={goalVal} onChange={e=>setGoalVal(e.target.value)} placeholder="12000" />
                </div>
                <button className="btn btn-primary btn-sm" onClick={saveGoal}>Guardar</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>setShowGoal(false)}>Cancelar</button>
              </div>
            </div>
          )}

          {/* Expense form */}
          {showForm && (
            <div className="card" style={{marginBottom:'1rem', border:'1px solid var(--gold-light)'}}>
              <h3 style={{marginBottom:'1rem'}}>Registrar Gasto — {month}</h3>
              <div className="form-grid-2">
                <div className="form-group" style={{marginBottom:0}}>
                  <label>Descripcion</label>
                  <input value={newExp.category} onChange={e=>setNewExp(p=>({...p,category:e.target.value}))} placeholder="ej. Renta de oficina" />
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label>Monto ($)</label>
                  <input type="number" value={newExp.amount} onChange={e=>setNewExp(p=>({...p,amount:e.target.value}))} placeholder="0.00" />
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label>Tipo de costo</label>
                  <select value={newExp.cost_type} onChange={e=>setNewExp(p=>({...p,cost_type:e.target.value}))}>
                    <option value="fixed">Fijo</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>
                <div className="form-group" style={{marginBottom:0}}>
                  <label>Proveedor / Pagado a</label>
                  <input value={newExp.vendor} onChange={e=>setNewExp(p=>({...p,vendor:e.target.value}))} placeholder="ej. AT&T" />
                </div>
              </div>
              <div style={{display:'flex', gap:'0.5rem', marginTop:'1rem'}}>
                <button className="btn btn-primary btn-sm" onClick={saveExp}>Guardar gasto</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>setShowForm(false)}>Cancelar</button>
              </div>
            </div>
          )}

          <ExportBar />
        </div>
      )}

      {/* ── TAB 2: COMISIONES Y NOMINA ──────────────────────── */}
      {tab === 'comisiones' && (
        <div>
          <KpiStrip items={[
            { label:'Total Nomina',      value:money(totalPayroll),  color:'var(--slate)' },
            { label:'Total Comisiones',  value:money(staffWithPay.filter(s=>!s.fixed).reduce((s,x)=>s+x.payout,0)), color:'var(--gold-dark)' },
            { label:'% de Ingresos',     value:pct(revenue>0?(totalPayroll/revenue)*100:0), color: (totalPayroll/revenue)*100 <= 40 ? 'var(--success)' : 'var(--danger)' },
          ]} />

          {fixedPct > BENCHMARKS.fixed && (
            <div className="alert-strip alert-warning" style={{marginBottom:'1rem'}}>
              <div>
                <div style={{fontWeight:500}}>Costos fijos por encima del rango recomendado</div>
                <div style={{fontSize:'0.82rem', marginTop:2}}>Tus costos fijos representan el {fixedPct}% de tus ingresos. El rango saludable para Real Estate es menos del {BENCHMARKS.fixed}%.</div>
              </div>
            </div>
          )}

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.5rem'}}>
            <div className="card">
              <div style={{fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:500, marginBottom:'0.85rem', borderBottom:'2px solid var(--border)', paddingBottom:'0.5rem'}}>Costos Fijos del Mes</div>
              {me.filter(e=>e.cost_type==='fixed').map(e => (
                <div key={e.id} style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid var(--border-light)', fontSize:'0.875rem'}}>
                  <span>{e.category}</span>
                  <span style={{fontWeight:600, fontFamily:'var(--font-body)'}}>{money(e.amount)}</span>
                </div>
              ))}
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0 0', fontWeight:700}}>
                <span>Total fijos</span>
                <span style={{fontFamily:'var(--font-body)'}}>{money(fixedTotal)}</span>
              </div>
              <div style={{marginTop:'0.75rem'}}>
                <div style={{height:6, background:'var(--border-light)', borderRadius:3, overflow:'hidden'}}>
                  <div style={{width:`${Math.min(fixedPct,100)}%`, height:'100%', background:fixedPct>BENCHMARKS.fixed?'var(--danger)':'var(--success)', borderRadius:3}} />
                </div>
                <div style={{fontSize:'0.72rem', color:'var(--slate-muted)', marginTop:3}}>{fixedPct}% de ingresos — limite Real Estate: {BENCHMARKS.fixed}%</div>
              </div>
            </div>

            <div className="card">
              <div style={{fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:500, marginBottom:'0.85rem', borderBottom:'2px solid var(--gold)', paddingBottom:'0.5rem'}}>Costos Variables del Mes</div>
              {me.filter(e=>e.cost_type==='variable').map(e => (
                <div key={e.id} style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid var(--border-light)', fontSize:'0.875rem'}}>
                  <span>{e.category}</span>
                  <span style={{fontWeight:600, fontFamily:'var(--font-body)'}}>{money(e.amount)}</span>
                </div>
              ))}
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0 0', fontWeight:700}}>
                <span>Total variables</span>
                <span style={{fontFamily:'var(--font-body)'}}>{money(varTotal)}</span>
              </div>
              <div style={{marginTop:'0.75rem'}}>
                <div style={{height:6, background:'var(--border-light)', borderRadius:3, overflow:'hidden'}}>
                  <div style={{width:`${Math.min(varPct,100)}%`, height:'100%', background:varPct>BENCHMARKS.variable?'var(--danger)':'var(--gold)', borderRadius:3}} />
                </div>
                <div style={{fontSize:'0.72rem', color:'var(--slate-muted)', marginTop:3}}>{varPct}% de ingresos — limite Real Estate: {BENCHMARKS.variable}%</div>
              </div>
            </div>
          </div>

          {/* Staff commissions */}
          <div className="card" style={{marginBottom:'1.25rem'}}>
            <h3 style={{marginBottom:'1rem'}}>Comisiones y Pago del Personal</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Personal</th><th>Rol</th><th>Base / Comision</th><th>Pago del mes</th><th>vs mes anterior</th></tr></thead>
                <tbody>
                  {staffWithPay.map((s,i) => (
                    <tr key={i}>
                      <td style={{fontWeight:500}}>{s.name}</td>
                      <td style={{fontSize:'0.82rem'}}>{s.role}</td>
                      <td style={{fontSize:'0.82rem', color:'var(--slate-muted)'}}>{s.fixed ? `Nomina fija` : `${s.commission_pct}% sobre servicio`}</td>
                      <td style={{fontWeight:700, fontFamily:'var(--font-body)', color:'var(--success)'}}>{money(s.payout)}</td>
                      <td><Arrow val={5} /></td>
                    </tr>
                  ))}
                  <tr style={{background:'var(--parchment)'}}>
                    <td colSpan={3} style={{fontWeight:700}}>Total nomina y comisiones</td>
                    <td style={{fontWeight:700, fontFamily:'var(--font-body)', fontSize:'1.05rem'}}>{money(totalPayroll)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Benchmark table */}
          <div className="card">
            <h3 style={{marginBottom:'0.85rem'}}>Rangos saludables por vertical — Orbita</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Vertical</th><th>Costos Fijos</th><th>Costos Variables</th><th>Margen Bruto</th></tr></thead>
                <tbody>
                  {[['Real Estate','< 25%','< 40%','> 35%'],['Grooming','< 40%','< 30%','> 30%'],['SPA / Estetica','< 40%','< 25%','> 35%'],['Taxes','< 50%','< 15%','> 35%'],['Contratista','< 20%','< 55%','> 25%']].map(([v,...r]) => (
                    <tr key={v} style={{background:v==='Real Estate'?'var(--gold-pale)':undefined}}>
                      <td style={{fontWeight:v==='Real Estate'?700:400}}>{v}</td>
                      {r.map((c,i)=><td key={i}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ExportBar />
        </div>
      )}

      {/* ── TAB 3: REVENUE POR SERVICIO ─────────────────────── */}
      {tab === 'revenue' && (
        <div>
          <KpiStrip items={[
            { label:'Revenue Total del Mes', value:money(revenue), color:'var(--success)' },
            { label:'Servicio Lider',        value:SERVICE_DATA[0].name.split(' ').slice(-1)[0], color:'var(--gold-dark)' },
            { label:'Ticket Promedio',       value:money(Math.round(revenue / SERVICE_DATA.reduce((s,x)=>s+x.visits,0))), color:'var(--slate)' },
          ]} />

          <div style={{marginBottom:'0.75rem', fontSize:'0.82rem', color:'var(--slate-muted)'}}>
            Revenue proyectado este mes: {money(projected)} — Confirmado: {money(revenue)} + Pipeline: $3,200
          </div>

          <div className="table-wrap" style={{marginBottom:'1.25rem'}}>
            <table>
              <thead>
                <tr><th>Servicio</th><th>Revenue</th><th>Visitas</th><th>Ticket Promedio</th><th>% del Total</th></tr>
              </thead>
              <tbody>
                {[...SERVICE_DATA].sort((a,b)=>b.revenue-a.revenue).map((s,i) => {
                  const pctOfTotal = revenue > 0 ? Math.round((s.revenue/revenue)*100) : 0
                  const ticket     = Math.round(s.revenue / s.visits)
                  return (
                    <tr key={s.name}>
                      <td>
                        <div style={{fontWeight:500}}>{s.name}</div>
                        {i===0 && <div style={{fontSize:'0.7rem', color:'var(--success)'}}>Servicio lider</div>}
                      </td>
                      <td style={{fontWeight:700, fontFamily:'var(--font-body)', fontSize:'1rem', letterSpacing:'-0.01em', color:'var(--success)'}}>{money(s.revenue)}</td>
                      <td style={{fontFamily:'var(--font-body)', fontWeight:600}}>{s.visits}</td>
                      <td style={{fontFamily:'var(--font-body)', fontWeight:500}}>{money(ticket)}</td>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:'0.6rem'}}>
                          <div style={{flex:1, height:8, background:'var(--border-light)', borderRadius:4, minWidth:80}}>
                            <div style={{width:`${pctOfTotal}%`, height:'100%', background:'var(--gold)', borderRadius:4}} />
                          </div>
                          <span style={{fontFamily:'var(--font-body)', fontWeight:600, minWidth:34, color:'var(--gold-dark)'}}>{pctOfTotal}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <ExportBar />
        </div>
      )}

      {/* ── TAB 4: BALANCE GENERAL ──────────────────────────── */}
      {tab === 'balance' && (
        <div>
          <KpiStrip items={[
            { label:'Activos Totales',   value:money(totalAssets), color:'var(--success)' },
            { label:'Pasivos Totales',   value:money(totalLiab),   color:'var(--danger)' },
            { label:'Patrimonio Neto',   value:money(netWorth),    sub:<Arrow val={8}/>, color:netWorth>=0?'var(--success)':'var(--danger)' },
          ]} />

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem'}}>
            <div className="card">
              <div style={{fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:500, color:'var(--success)', borderBottom:'2px solid var(--success)', paddingBottom:'0.5rem', marginBottom:'0.85rem'}}>ACTIVOS — Lo que tiene el negocio</div>
              {[
                { label:'Efectivo y saldo en cuentas', value: revenue },
                { label:'Valor del inventario',        value: 1200   },
                { label:'Cuentas por cobrar',          value: 7300   },
              ].map(item => (
                <div key={item.label} style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid var(--border-light)', fontSize:'0.875rem'}}>
                  <span>{item.label}</span>
                  <span style={{fontWeight:600, fontFamily:'var(--font-body)'}}>{money(item.value)}</span>
                </div>
              ))}
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0 0', fontWeight:700}}>
                <span>Total activos</span>
                <span style={{fontFamily:'var(--font-body)', fontSize:'1.1rem', color:'var(--success)'}}>{money(totalAssets)}</span>
              </div>
            </div>

            <div className="card">
              <div style={{fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:500, color:'var(--danger)', borderBottom:'2px solid var(--danger)', paddingBottom:'0.5rem', marginBottom:'0.85rem'}}>PASIVOS — Lo que debe el negocio</div>
              {[
                { label:'Gastos fijos proyectados (prox. mes)', value: fixedTotal },
                { label:'Comisiones pendientes de pago',         value: Math.round(totalPayroll * 0.3) },
                { label:'Prestamos activos',                     value: 0 },
              ].map(item => (
                <div key={item.label} style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid var(--border-light)', fontSize:'0.875rem'}}>
                  <span>{item.label}</span>
                  <span style={{fontWeight:600, fontFamily:'var(--font-body)'}}>{money(item.value)}</span>
                </div>
              ))}
              <div style={{display:'flex', justifyContent:'space-between', padding:'0.75rem 0 0', fontWeight:700}}>
                <span>Total pasivos</span>
                <span style={{fontFamily:'var(--font-body)', fontSize:'1.1rem', color:'var(--danger)'}}>{money(totalLiab)}</span>
              </div>
            </div>
          </div>

          <div className="card-gold" style={{textAlign:'center', padding:'1.5rem'}}>
            <div style={{fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.09em', color:'var(--gold-dark)', marginBottom:8}}>Patrimonio Neto</div>
            <div style={{fontFamily:'var(--font-body)', fontSize:'2.5rem', fontWeight:800, color:netWorth>=0?'var(--success)':'var(--danger)', letterSpacing:'-0.03em'}}>{money(netWorth)}</div>
            <div style={{fontSize:'0.8rem', color:'var(--gold-dark)', marginTop:6}}>Activos ({money(totalAssets)}) menos Pasivos ({money(totalLiab)})</div>
          </div>
          <ExportBar />
        </div>
      )}
    </div>
  )
}
