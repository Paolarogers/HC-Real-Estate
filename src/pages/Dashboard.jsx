import React from 'react'
import DailyMessage from '../components/DailyMessage.jsx'
import { demoClients, demoLeads, demoProperties, demoTransactions, demoAppointments, demoTasks, demoReceipts } from '../data/demo.js'

const STAGES = ['intake','documents_gathering','offer_submitted','under_contract','inspection_appraisal','closing_scheduled']
const STAGE_LABELS = {
  intake:lang==='es'?'Intake':'Intake', documents_gathering:'Documentos', offer_submitted:'Oferta presentada',
  under_contract:'Bajo contrato', inspection_appraisal:'Inspeccion', closing_scheduled:'Cierre programado'
}
const STAGE_COLOR = {
  intake:'var(--slate-muted)', documents_gathering:'#7B6A9B', offer_submitted:'var(--gold)',
  under_contract:'var(--warning)', inspection_appraisal:'var(--info)', closing_scheduled:'var(--success)'
}

export default function Dashboard({ onNavigate, lang = 'es' }) {
  const today       = new Date().toDateString()
  const aptsToday   = demoAppointments.filter(a => new Date(a.scheduled_at).toDateString() === today)
  const openTxns    = demoTransactions.filter(t => !['closed','cancelled'].includes(t.stage))
  const activeProps = demoProperties.filter(p => ['active','pending','under_contract'].includes(p.listing_status))
  const newLeads    = demoLeads.filter(l => l.status === 'new')
  const urgentTasks = demoTasks.filter(t => t.status === 'open' && t.priority === 'urgent')
  const inactiveC   = demoClients.filter(c => c.status === 'inactive')
  const closingSoon = demoTransactions.filter(t => t.stage === 'closing_scheduled')
  const projComm    = openTxns.reduce((s,t) => s + (t.commission_amount || (t.offer_price||0)*0.03), 0)
  const todayRev    = demoReceipts.filter(r => r.status==='paid' && new Date(r.issued_date).toDateString()===today).reduce((s,r)=>s+r.total,0)
  const newLeads30  = demoLeads.filter(l => (Date.now()-new Date(l.received_at)) < 30*24*60*60*1000).length

  return (
    <div className="page-body">
      <DailyMessage />

      {/* KPI strip — 4 columns, equal width */}
      <div className="kpi-strip">
        <div className="kpi-card accent">
          <div className="kpi-label">Ingresos Hoy</div>
          <div className="kpi-value" style={{color:'var(--success)'}}>${todayRev.toLocaleString()}</div>
          <div className="kpi-sub">recibos pagados</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">Propiedades Activas</div>
          <div className="kpi-value">{activeProps.length}</div>
          <div className="kpi-sub">listados en mercado</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">Transacciones Proceso</div>
          <div className="kpi-value">{openTxns.length}</div>
          <div className="kpi-sub">en pipeline activo</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Citas Hoy</div>
          <div className="kpi-value">{aptsToday.length}</div>
          <div className="kpi-sub">showings y consultas</div>
        </div>
        <div className={`kpi-card${newLeads.length > 0 ? ' danger' : ''}`}>
          <div className="kpi-label">Leads Sin Contactar</div>
          <div className="kpi-value" style={{color: newLeads.length > 0 ? 'var(--danger)' : 'inherit'}}>{newLeads.length}</div>
          <div className="kpi-sub">responder en 1h</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Clientes Inactivos</div>
          <div className="kpi-value">{inactiveC.length}</div>
          <div className="kpi-sub">60+ dias sin contacto</div>
        </div>
        <div className="kpi-card success">
          <div className="kpi-label">Cierres Este Mes</div>
          <div className="kpi-value">{closingSoon.length}</div>
          <div className="kpi-sub">programados</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">Comision Proyectada</div>
          <div className="kpi-value" style={{fontSize:'1.5rem'}}>${Math.round(projComm/1000)}k</div>
          <div className="kpi-sub">pipeline activo</div>
        </div>
      </div>

      {/* Row 1 — Pipeline + Citas */}
      <div className="dash-grid-2">
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
            <h3>Pipeline de Transacciones</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('transactions')}>Ver todas</button>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'0.55rem'}}>
            {STAGES.map(stage => {
              const count = demoTransactions.filter(t => t.stage === stage).length
              const barW  = demoTransactions.length > 0 ? Math.round((count/demoTransactions.length)*100) : 0
              return (
                <div key={stage} style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                  <div style={{width:8, height:8, borderRadius:'50%', background:STAGE_COLOR[stage], flexShrink:0}} />
                  <span style={{flex:1, fontSize:'0.84rem', color:'var(--slate)'}}>{STAGE_LABELS[stage]}</span>
                  <div style={{width:80, height:5, background:'var(--border-light)', borderRadius:3, overflow:'hidden'}}>
                    <div style={{width:`${barW}%`, height:'100%', background:STAGE_COLOR[stage], borderRadius:3}} />
                  </div>
                  <span style={{fontFamily:'var(--font-body)', fontWeight:700, fontSize:'1rem', minWidth:16, textAlign:'right', color:count>0?'var(--slate)':'var(--slate-light)'}}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
            <h3>Citas de Hoy</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('appointments')}>Ver todas</button>
          </div>
          {aptsToday.length === 0 ? (
            <div style={{textAlign:'center', padding:'1.5rem 0', color:'var(--slate-muted)'}}>
              <div style={{fontSize:'0.875rem'}}>Sin citas programadas para hoy.</div>
              <button className="btn btn-secondary btn-sm" style={{marginTop:'0.75rem'}} onClick={()=>onNavigate('appointments')}>
                Ver proximas citas
              </button>
            </div>
          ) : aptsToday.map(a => (
            <div key={a.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.6rem 0', borderBottom:'1px solid var(--border-light)'}}>
              <div>
                <div style={{fontWeight:500, fontSize:'0.875rem'}}>{demoClients.find(c=>c.id===a.client_id)?.full_name || '—'}</div>
                <div style={{fontSize:'0.75rem', color:'var(--slate-muted)'}}>{a.appointment_type?.replace(/_/g,' ')}</div>
              </div>
              <div style={{fontSize:'0.82rem', color:'var(--gold)', fontWeight:600, fontFamily:'var(--font-body)'}}>
                {new Date(a.scheduled_at).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Leads recientes + Tareas urgentes + Quick actions */}
      <div className="dash-grid-2">
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
            <h3>Leads Recientes</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('leads')}>Ver todos</button>
          </div>
          {demoLeads.slice(0,5).map(l => (
            <div key={l.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.52rem 0', borderBottom:'1px solid var(--border-light)'}}>
              <div>
                <div style={{fontWeight:500, fontSize:'0.875rem'}}>{l.full_name}</div>
                <div style={{fontSize:'0.75rem', color:'var(--slate-muted)'}}>{l.source?.replace(/_/g,' ')} · {l.service_interest}</div>
              </div>
              <span className={`badge badge-${l.status==='new'?'new':'slate'}`}>
                {l.status==='new'?'Nuevo':'Contactado'}
              </span>
            </div>
          ))}
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.85rem'}}>
              <h3>Tareas Urgentes</h3>
              <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('tasks')}>Ver todas</button>
            </div>
            {urgentTasks.length === 0 ? (
              <p style={{color:'var(--slate-muted)', fontSize:'0.875rem'}}>Sin tareas urgentes.</p>
            ) : urgentTasks.slice(0,3).map(t => (
              <div key={t.id} style={{display:'flex', gap:'0.5rem', alignItems:'center', padding:'0.5rem 0', borderBottom:'1px solid var(--border-light)'}}>
                <div style={{width:6, height:6, borderRadius:'50%', background:'var(--danger)', flexShrink:0}} />
                <span style={{fontSize:'0.84rem', flex:1}}>{t.title}</span>
              </div>
            ))}
          </div>

          <div className="card-sm">
            <div className="section-label" style={{marginBottom:'0.65rem'}}>Acciones rapidas</div>
            <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap'}}>
              <button className="btn btn-primary btn-sm" onClick={()=>onNavigate('appointments')}>+ Cita</button>
              <button className="btn btn-secondary btn-sm" onClick={()=>onNavigate('leads')}>+ Lead</button>
              <button className="btn btn-secondary btn-sm" onClick={()=>onNavigate('properties')}>+ Propiedad</button>
              <button className="btn btn-gold btn-sm" onClick={()=>onNavigate('reactivation')}>Reactivar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
