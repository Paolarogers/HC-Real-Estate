
import React, { useState } from 'react'
import { demoClients } from '../data/demo.js'

const demoHouseholds = [
  { id:'h1', name:'Familia Mendoza', primary:'Carlos Mendoza Reyes', members:['Carlos Mendoza Reyes','Maria Mendoza'], value:215000, transactions:1 },
  { id:'h2', name:'Familia Guzman', primary:'Maria Elena Guzman', members:['Maria Elena Guzman'], value:249000, transactions:1 },
  { id:'h3', name:'Familia Castro', primary:'Pedro Alfredo Castro', members:['Pedro Alfredo Castro','Ana Castro'], value:450000, transactions:2 },
]

export default function HouseholdsPage() {
  const [selected, setSelected] = useState(null)
  const hh = selected ? demoHouseholds.find(h=>h.id===selected) : null

  return (
    <div style={{display:'flex',flex:1,minHeight:'calc(100vh - 57px)'}}>
      <div style={{width:selected?380:'100%',borderRight:selected?'1px solid var(--border)':'none',overflowY:'auto'}}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left"><h2>Familias</h2><p>{demoHouseholds.length} hogares registrados</p></div>
            <button className="btn btn-primary btn-sm">+ Nueva Familia</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Familia</th><th>Miembros</th><th>Transacciones</th><th>Valor del hogar</th></tr></thead>
              <tbody>
                {demoHouseholds.map(h=>(
                  <tr key={h.id} onClick={()=>setSelected(h.id)} style={{background:selected===h.id?'var(--parchment)':undefined}}>
                    <td><div style={{fontWeight:500}}>{h.name}</div><div style={{fontSize:'0.75rem',color:'var(--slate-muted)'}}>{h.primary}</div></td>
                    <td>{h.members.length}</td>
                    <td>{h.transactions}</td>
                    <td style={{fontFamily:'var(--font-heading)',fontSize:'1rem'}}>${h.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {hh && (
        <div style={{flex:1,overflowY:'auto'}}>
          <div className="page-body">
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1.25rem'}}>
              <h3>{hh.name}</h3>
              <button className="btn btn-ghost btn-sm" onClick={()=>setSelected(null)}>Cerrar</button>
            </div>
            <div className="card" style={{marginBottom:'1rem'}}>
              <div className="section-label">Miembros del hogar</div>
              {hh.members.map((m,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'0.65rem',padding:'0.6rem 0',borderBottom:i<hh.members.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:'var(--slate)',color:'var(--gold-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.72rem',fontWeight:600}}>{m.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
                  <span style={{fontSize:'0.875rem'}}>{m}</span>
                  {i===0&&<span className="badge badge-gold">Principal</span>}
                </div>
              ))}
            </div>
            <div className="card">
              <div className="section-label">Resumen financiero del hogar</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Valor total</span><span className="detail-value" style={{fontFamily:'var(--font-heading)',fontSize:'1.25rem'}}>${hh.value.toLocaleString()}</span></div>
                <div className="detail-item"><span className="detail-label">Transacciones</span><span className="detail-value">{hh.transactions}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
