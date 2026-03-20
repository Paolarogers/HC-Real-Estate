
import React, { useState } from 'react'
import { demoClients } from '../data/demo.js'

const TRIGGERS = [
  { id:'quiet_buyer', label:'Comprador que se fue quieto', desc:'30 dias sin contacto despues de showings', days:30, count:1 },
  { id:'expiring_listing', label:'Listado por vencer', desc:'14 dias antes de que expire el listing', days:14, count:1 },
  { id:'lease_ending', label:'Inquilino con lease terminando', desc:'90 dias antes del fin del lease', days:90, count:1 },
  { id:'inactive_60', label:'Inactivo general 60 dias', desc:'Sin ningun tipo de contacto', days:60, count:1 },
]

const demoInactive = demoClients.filter(c=>c.status==='inactive' || (c.last_contact_at && (Date.now()-new Date(c.last_contact_at))>50*24*60*60*1000))

export default function ReactivationPage() {
  const [trigger, setTrigger] = useState('all')
  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left"><h2>Centro de Reactivacion</h2><p>Clientes inactivos y oportunidades de recuperacion de revenue</p></div>
        <button className="btn btn-gold btn-sm">Lanzar Campana</button>
      </div>

      {/* Trigger cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
        {TRIGGERS.map(t=>(
          <div key={t.id} className={`stat-card${trigger===t.id?' accent':''}`} style={{cursor:'pointer'}} onClick={()=>setTrigger(trigger===t.id?'all':t.id)}>
            <div className="stat-label">{t.label}</div>
            <div className="stat-value">{t.count}</div>
            <div className="stat-sub">{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Cliente</th><th>Tipo</th><th>Dias inactivo</th><th>Ultimo contacto</th><th>Trigger</th><th>Accion</th></tr></thead>
          <tbody>
            {demoInactive.map(c=>{
              const days = c.last_contact_at ? Math.floor((Date.now()-new Date(c.last_contact_at))/(1000*60*60*24)) : 90
              return (
                <tr key={c.id}>
                  <td><div style={{fontWeight:500}}>{c.full_name}</div><div style={{fontSize:'0.75rem',color:'var(--slate-muted)'}}>{c.phone}</div></td>
                  <td style={{fontSize:'0.82rem'}}>{c.client_type}</td>
                  <td><span className={`badge badge-${days>60?'danger':'warning'}`}>{days} dias</span></td>
                  <td style={{fontSize:'0.82rem',color:'var(--slate-muted)'}}>{c.last_contact_at?new Date(c.last_contact_at).toLocaleDateString('es-ES',{month:'short',day:'numeric'}):'Sin registro'}</td>
                  <td style={{fontSize:'0.78rem',color:'var(--slate-muted)'}}>Inactivo {days>60?'60+':'30+'} dias</td>
                  <td>
                    <div style={{display:'flex',gap:'0.4rem'}}>
                      <button className="btn btn-secondary btn-sm">WhatsApp</button>
                      <button className="btn btn-ghost btn-sm">Llamar</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
