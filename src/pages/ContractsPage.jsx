
import React, { useState } from 'react'
import { demoClients, demoTransactions } from '../data/demo.js'

const demoContracts = [
  { id:'ct1', type:'purchase_agreement', client_id:'c1', transaction_id:'tx1', file_name:'Purchase_Agreement_123_Oak.pdf', signed:true, created:'2026-02-25' },
  { id:'ct2', type:'listing_agreement', client_id:'c2', transaction_id:'tx2', file_name:'Listing_Agreement_Guzman.pdf', signed:true, created:'2026-02-08' },
  { id:'ct3', type:'rental_agreement', client_id:'c3', transaction_id:'tx3', file_name:'Rental_Agreement_Torres.pdf', signed:true, created:'2026-02-15' },
]
const typeLabel = { purchase_agreement:'Contrato de Compra', listing_agreement:'Contrato de Listado', rental_agreement:'Contrato de Renta', addendum:'Adendo' }

export default function ContractsPage() {
  const [selected, setSelected] = useState(null)
  const contract = selected ? demoContracts.find(c=>c.id===selected) : null
  const client = contract ? demoClients.find(c=>c.id===contract.client_id) : null

  return (
    <div style={{display:'flex',flex:1,minHeight:'calc(100vh - 57px)'}}>
      <div style={{width:selected?380:'100%',borderRight:selected?'1px solid var(--border)':'none',overflowY:'auto'}}>
        <div className="page-body">
          <div className="page-header">
            <div className="page-header-left"><h2>Contratos</h2><p>{demoContracts.length} contratos registrados</p></div>
            <button className="btn btn-primary btn-sm">+ Nuevo Contrato</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Archivo</th><th>Tipo</th><th>Cliente</th><th>Firmado</th><th>Fecha</th></tr></thead>
              <tbody>
                {demoContracts.map(c=>{
                  const cl = demoClients.find(x=>x.id===c.client_id)
                  return (
                    <tr key={c.id} onClick={()=>setSelected(c.id)} style={{background:selected===c.id?'var(--parchment)':undefined}}>
                      <td style={{fontWeight:500,fontSize:'0.875rem'}}>{c.file_name}</td>
                      <td><span className="badge badge-slate">{typeLabel[c.type]}</span></td>
                      <td>{cl?.full_name||'—'}</td>
                      <td><span className={`badge badge-${c.signed?'success':'warning'}`}>{c.signed?'Firmado':'Pendiente'}</span></td>
                      <td style={{fontSize:'0.78rem',color:'var(--slate-muted)'}}>{new Date(c.created).toLocaleDateString('es-ES',{month:'short',day:'numeric',year:'numeric'})}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {contract && (
        <div style={{flex:1,overflowY:'auto'}}>
          <div className="page-body">
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1.25rem'}}>
              <div><h3 style={{marginBottom:4}}>{contract.file_name}</h3><span className="badge badge-slate">{typeLabel[contract.type]}</span></div>
              <button className="btn btn-ghost btn-sm" onClick={()=>setSelected(null)}>Cerrar</button>
            </div>
            <div className="card" style={{marginBottom:'1rem'}}>
              <div className="section-label">Detalles del contrato</div>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Cliente</span><span className="detail-value" style={{fontWeight:500}}>{client?.full_name||'—'}</span></div>
                <div className="detail-item"><span className="detail-label">Tipo</span><span className="detail-value">{typeLabel[contract.type]}</span></div>
                <div className="detail-item"><span className="detail-label">Fecha</span><span className="detail-value">{new Date(contract.created).toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</span></div>
                <div className="detail-item"><span className="detail-label">Estado</span><span className="detail-value"><span className={`badge badge-${contract.signed?'success':'warning'}`}>{contract.signed?'Firmado':'Pendiente'}</span></span></div>
              </div>
            </div>
            <div style={{display:'flex',gap:'0.5rem'}}>
              <button className="btn btn-primary btn-sm">Ver documento</button>
              <button className="btn btn-secondary btn-sm">Descargar</button>
              <button className="btn btn-secondary btn-sm">Enviar por WhatsApp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
