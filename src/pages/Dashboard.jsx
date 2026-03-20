
import React from 'react'
import DailyMessage from '../components/DailyMessage.jsx'
import { demoClients, demoLeads, demoProperties, demoTransactions, demoAppointments, demoTasks } from '../data/demo.js'

const STAGES = ['intake','documents_gathering','offer_submitted','under_contract','inspection_appraisal','closing_scheduled']
const STAGE_LABELS = { intake:'Intake', documents_gathering:'Documentos', offer_submitted:'Oferta', under_contract:'Bajo Contrato', inspection_appraisal:'Inspeccion', closing_scheduled:'Cierre' }
const STAGE_COLOR = { intake:'var(--slate-muted)', documents_gathering:'#7B6A9B', offer_submitted:'var(--gold)', under_contract:'var(--warning)', inspection_appraisal:'var(--info)', closing_scheduled:'var(--success)' }

export default function Dashboard({ onNavigate }) {
  const today = new Date().toDateString()
  const aptsToday = demoAppointments.filter(a=>new Date(a.scheduled_at).toDateString()===today)
  const openTxns = demoTransactions.filter(t=>!['closed','cancelled'].includes(t.stage))
  const activeProps = demoProperties.filter(p=>['active','pending','under_contract'].includes(p.listing_status))
  const newLeads = demoLeads.filter(l=>l.status==='new')
  const urgentTasks = demoTasks.filter(t=>t.status==='open'&&t.priority==='urgent')
  const inactiveClients = demoClients.filter(c=>c.status==='inactive')
  const closingThisMonth = demoTransactions.filter(t=>t.stage==='closing_scheduled')
  const projComm = openTxns.reduce((s,t)=>s+(t.commission_amount||(t.offer_price||0)*0.03),0)
  const newLeads30d = demoLeads.filter(l=>(Date.now()-new Date(l.received_at))<30*24*60*60*1000).length

  return (
    <div className="page-body">
      <DailyMessage />

      {/* KPI strip */}
      <div className="stat-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))'}}>
        <div className="stat-card accent"><div className="stat-label">Propiedades Activas</div><div className="stat-value">{activeProps.length}</div><div className="stat-sub">listados en mercado</div></div>
        <div className="stat-card accent"><div className="stat-label">Transacciones Proceso</div><div className="stat-value">{openTxns.length}</div><div className="stat-sub">en pipeline activo</div></div>
        <div className="stat-card"><div className="stat-label">Citas Hoy</div><div className="stat-value">{aptsToday.length}</div><div className="stat-sub">showings y consultas</div></div>
        <div className={`stat-card${newLeads.length>0?' danger':''}`}><div className="stat-label">Leads Sin Contactar</div><div className="stat-value" style={{color:newLeads.length>0?'var(--danger)':'inherit'}}>{newLeads.length}</div><div className="stat-sub">responder en 1h</div></div>
        <div className="stat-card"><div className="stat-label">Clientes Inactivos</div><div className="stat-value">{inactiveClients.length}</div><div className="stat-sub">60+ dias sin contacto</div></div>
        <div className="stat-card success"><div className="stat-label">Cierres Este Mes</div><div className="stat-value">{closingThisMonth.length}</div><div className="stat-sub">programados</div></div>
        <div className="stat-card accent"><div className="stat-label">Comision Proyectada</div><div className="stat-value" style={{fontSize:'1.35rem'}}>${Math.round(projComm/1000)}k</div><div className="stat-sub">pipeline activo</div></div>
        <div className="stat-card"><div className="stat-label">Nuevos Leads 30d</div><div className="stat-value">{newLeads30d}</div><div className="stat-sub">ultimos 30 dias</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem',marginBottom:'1.25rem'}}>
        {/* Transaction pipeline */}
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <h3>Pipeline de Transacciones</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('transactions')}>Ver todas</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {STAGES.map(stage=>{
              const count = demoTransactions.filter(t=>t.stage===stage).length
              return (
                <div key={stage} style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:STAGE_COLOR[stage],flexShrink:0}} />
                  <span style={{flex:1,fontSize:'0.84rem'}}>{STAGE_LABELS[stage]}</span>
                  <span style={{fontFamily:'var(--font-heading)',fontSize:'1.15rem',fontWeight:500,color:count>0?'var(--slate)':'var(--slate-light)'}}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Today's appointments */}
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <h3>Citas de Hoy</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('appointments')}>Ver todas</button>
          </div>
          {aptsToday.length===0 ? (
            <p style={{color:'var(--slate-muted)',fontSize:'0.875rem'}}>Sin citas programadas para hoy.</p>
          ) : aptsToday.map(a=>(
            <div key={a.id} style={{display:'flex',justifyContent:'space-between',padding:'0.6rem 0',borderBottom:'1px solid var(--border-light)'}}>
              <div>
                <div style={{fontWeight:500,fontSize:'0.875rem'}}>{demoClients.find(c=>c.id===a.client_id)?.full_name||'—'}</div>
                <div style={{fontSize:'0.75rem',color:'var(--slate-muted)'}}>{a.appointment_type?.replace(/_/g,' ')}</div>
              </div>
              <div style={{fontSize:'0.78rem',color:'var(--gold)',fontWeight:500}}>{new Date(a.scheduled_at).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}}>
        {/* New leads */}
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <h3>Leads Recientes</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('leads')}>Ver todos</button>
          </div>
          {demoLeads.slice(0,4).map(l=>(
            <div key={l.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.55rem 0',borderBottom:'1px solid var(--border-light)'}}>
              <div>
                <div style={{fontWeight:500,fontSize:'0.875rem'}}>{l.full_name}</div>
                <div style={{fontSize:'0.75rem',color:'var(--slate-muted)'}}>{l.source?.replace(/_/g,' ')} · {l.service_interest}</div>
              </div>
              <span className={`badge badge-${l.status==='new'?'new':'slate'}`}>{l.status==='new'?'Nuevo':'Contactado'}</span>
            </div>
          ))}
        </div>

        {/* Urgent tasks + quick actions */}
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.85rem'}}>
              <h3>Tareas Urgentes</h3>
              <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('tasks')}>Ver todas</button>
            </div>
            {urgentTasks.length===0 ? (
              <p style={{color:'var(--slate-muted)',fontSize:'0.875rem'}}>Sin tareas urgentes.</p>
            ) : urgentTasks.slice(0,3).map(t=>(
              <div key={t.id} style={{display:'flex',gap:'0.5rem',alignItems:'center',padding:'0.5rem 0',borderBottom:'1px solid var(--border-light)'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--danger)',flexShrink:0}} />
                <span style={{fontSize:'0.84rem',flex:1}}>{t.title}</span>
              </div>
            ))}
          </div>
          <div className="card-sm">
            <div className="section-label" style={{marginBottom:'0.65rem'}}>Acciones rapidas</div>
            <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
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
