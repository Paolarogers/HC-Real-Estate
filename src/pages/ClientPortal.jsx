
import React, { useState } from 'react'
import { demoTransactions, demoProperties, demoClients } from '../data/demo.js'

const STAGES = ['intake','documents_gathering','offer_submitted','under_contract','inspection_appraisal','closing_scheduled','closed']
const STAGE_LABELS = { intake:'Intake', documents_gathering:'Documentos', offer_submitted:'Oferta', under_contract:'Bajo Contrato', inspection_appraisal:'Inspeccion', closing_scheduled:'Cierre', closed:'Cerrado' }

export default function ClientPortal() {
  const txn = demoTransactions[0]
  const prop = demoProperties.find(p=>p.id===txn?.property_id)
  const client = demoClients.find(c=>c.id===txn?.client_id)
  const stageIdx = txn ? STAGES.indexOf(txn.stage) : 0

  return (
    <div style={{minHeight:'100vh',background:'var(--cream)',fontFamily:'var(--font-body)'}}>
      {/* Header */}
      <div style={{background:'var(--slate)',padding:'1.25rem 2rem',display:'flex',alignItems:'center',gap:'0.75rem'}}>
        <div style={{width:36,height:36,background:'var(--gold)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--slate)',fontWeight:700,fontFamily:'var(--font-heading)',fontSize:'1rem'}}>HC</div>
        <div style={{color:'#fff',fontFamily:'var(--font-heading)',fontSize:'1.15rem'}}>HC Real Estate</div>
      </div>

      <div style={{maxWidth:700,margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <h2 style={{marginBottom:4,fontSize:'1.6rem'}}>Estado de tu transaccion</h2>
          <p style={{color:'var(--slate-muted)',fontSize:'0.9rem'}}>Hola {client?.full_name}. Aqui puedes ver el progreso de tu transaccion en tiempo real.</p>
        </div>

        {prop && (
          <div className="card" style={{marginBottom:'1.5rem',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-heading)',fontSize:'1.5rem',marginBottom:4}}>{prop.address_line1}</div>
            <div style={{color:'var(--slate-muted)',fontSize:'0.875rem'}}>{prop.address_city}, {prop.address_state} {prop.address_zip}</div>
            {txn?.offer_price&&<div style={{fontFamily:'var(--font-heading)',fontSize:'2rem',color:'var(--gold)',marginTop:8}}>${txn.offer_price.toLocaleString()}</div>}
          </div>
        )}

        {/* Stage progress */}
        <div className="card" style={{marginBottom:'1.5rem'}}>
          <div className="section-label" style={{marginBottom:'1rem'}}>Progreso de tu transaccion</div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            {STAGES.map((stage,i)=>{
              const isDone = i<stageIdx
              const isCurrent = i===stageIdx
              return (
                <div key={stage} style={{flex:1,textAlign:'center',position:'relative'}}>
                  {i>0&&<div style={{position:'absolute',top:10,left:0,right:'50%',height:2,background:isDone?'var(--gold)':'var(--border-light)'}}/>}
                  {i<STAGES.length-1&&<div style={{position:'absolute',top:10,left:'50%',right:0,height:2,background:isDone?'var(--gold)':'var(--border-light)'}}/>}
                  <div style={{width:22,height:22,borderRadius:'50%',background:isCurrent?'var(--slate)':isDone?'var(--gold)':'var(--border)',margin:'0 auto 6px',position:'relative',zIndex:1,boxShadow:isCurrent?'0 0 0 3px var(--cream-dark)':'none'}}/>
                  <div style={{fontSize:'0.6rem',color:isCurrent?'var(--slate)':isDone?'var(--gold-dark)':'var(--slate-light)',fontWeight:isCurrent?600:400,lineHeight:1.3}}>{STAGE_LABELS[stage]}</div>
                </div>
              )
            })}
          </div>
        </div>

        {txn?.closing_date&&(
          <div className="card" style={{marginBottom:'1.5rem',textAlign:'center',background:'var(--success-bg)',border:'1px solid #A0D4B8'}}>
            <div style={{fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--success)',marginBottom:4}}>Fecha de cierre</div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:'1.5rem',color:'var(--success)'}}>{new Date(txn.closing_date).toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
          </div>
        )}

        {/* Footer */}
        <div style={{textAlign:'center',fontSize:'0.72rem',color:'var(--slate-light)',marginTop:'2rem'}}>
          HC Business and Media · Orbita — © 2026 Hispanos Comunidad. Todos los derechos reservados.
        </div>
      </div>
    </div>
  )
}
