
import React from 'react'
import { demoStaff, demoTransactions } from '../data/demo.js'

export default function StaffPage() {
  const agentStats = demoStaff.filter(s=>s.role==='agent').map(s=>{
    const txns = demoTransactions.filter(t=>t.assigned_agent_id===s.id)
    const closed = txns.filter(t=>t.stage==='closed')
    const commission = closed.reduce((sum,t)=>sum+(t.commission_amount||0),0)
    const open = txns.filter(t=>!['closed','cancelled'].includes(t.stage)).length
    return {...s, txns:txns.length, closed:closed.length, commission, open}
  })

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left"><h2>Staff y Comisiones</h2><p>Produccion del equipo y splits de comision</p></div>
        <button className="btn btn-primary btn-sm">+ Agregar Personal</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Rol</th><th>Trans. abiertas</th><th>Trans. cerradas</th><th>Comision total</th><th>Estado</th></tr></thead>
          <tbody>
            {demoStaff.map(s=>{
              const stats = agentStats.find(a=>a.id===s.id)
              return (
                <tr key={s.id}>
                  <td style={{fontWeight:500}}>{s.full_name}</td>
                  <td><span className="badge badge-slate" style={{textTransform:'capitalize'}}>{s.role.replace(/_/g,' ')}</span></td>
                  <td>{stats?.open||0}</td>
                  <td>{stats?.closed||0}</td>
                  <td style={{fontFamily:'var(--font-heading)',fontSize:'1rem',color:stats?.commission>0?'var(--success)':'var(--slate-muted)'}}>${(stats?.commission||0).toLocaleString()}</td>
                  <td><span className={`badge badge-${s.active?'success':'inactive'}`}>{s.active?'Activo':'Inactivo'}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
