
import React, { useState } from 'react'
import { demoClients } from '../data/demo.js'

const demoReferrals = [
  { id:'r1', referrer:'Pedro Alfredo Castro', referred:'Luis Morales', phone:'864-555-0301', service:'Comprar casa', status:'qualified', created:'2026-03-10' },
  { id:'r2', referrer:'Maria Elena Guzman', referred:'Carmen Vega', phone:'864-555-0302', service:'Vender propiedad', status:'registered', created:'2026-03-05' },
  { id:'r3', referrer:'Carlos Mendoza Reyes', referred:'Jose Ruiz', phone:'864-555-0303', service:'Rentar', status:'pending', created:'2026-02-20' },
]

const statusBadge = {
  pending:{'badge-slate':'Pendiente'}, registered:{'badge-info':'Registrado'},
  qualified:{'badge-gold':'Calificado'}, service_completed:{'badge-success':'Completado'}, reward_issued:{'badge-success':'Recompensa enviada'},
}

export default function ReferralsPage() {
  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left"><h2>Rastreador de Referidos</h2><p>{demoReferrals.length} referidos activos</p></div>
        <button className="btn btn-primary btn-sm">+ Nuevo Referido</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
        <div className="stat-card accent"><div className="stat-label">Total referidos</div><div className="stat-value">{demoReferrals.length}</div></div>
        <div className="stat-card"><div className="stat-label">Pendientes</div><div className="stat-value">{demoReferrals.filter(r=>r.status==='pending').length}</div></div>
        <div className="stat-card success"><div className="stat-label">Calificados</div><div className="stat-value">{demoReferrals.filter(r=>r.status==='qualified').length}</div></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Referidor</th><th>Persona referida</th><th>Servicio</th><th>Estado</th><th>Fecha</th><th>Accion</th></tr></thead>
          <tbody>
            {demoReferrals.map(r=>(
              <tr key={r.id}>
                <td style={{fontWeight:500}}>{r.referrer}</td>
                <td><div style={{fontWeight:500}}>{r.referred}</div><div style={{fontSize:'0.75rem',color:'var(--slate-muted)'}}>{r.phone}</div></td>
                <td style={{fontSize:'0.82rem'}}>{r.service}</td>
                <td>
                  <span className={`badge badge-${r.status==='qualified'?'gold':r.status==='registered'?'info':r.status==='pending'?'slate':'success'}`}>
                    {r.status==='pending'?'Pendiente':r.status==='registered'?'Registrado':r.status==='qualified'?'Calificado':'Completado'}
                  </span>
                </td>
                <td style={{fontSize:'0.78rem',color:'var(--slate-muted)'}}>{new Date(r.created).toLocaleDateString('es-ES',{month:'short',day:'numeric'})}</td>
                <td><button className="btn btn-secondary btn-sm">Avanzar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
