
import React, { useState } from 'react'
import DailyMessage from '../components/DailyMessage.jsx'
import BonanzaCard from '../components/BonanzaCard.jsx'
import ZivoCard from '../components/ZivoCard.jsx'

const planTasks = [
  { id:1, time:'9:00 AM', cat:'leads', label:'Revisar leads nuevos de Meta Ads y asignar agente', done:false },
  { id:2, time:'9:30 AM', cat:'properties', label:'Confirmar citas de showing para hoy', done:false },
  { id:3, time:'10:00 AM', cat:'transactions', label:'Seguimiento a transaccion TXN-2026-0001 — inspeccion pendiente', done:false },
  { id:4, time:'11:00 AM', cat:'clients', label:'Llamar a Carlos Mendoza — actualizacion de preaprobacion', done:false },
  { id:5, time:'2:00 PM', cat:'marketing', label:'Revisar rendimiento de campana Meta — compradores marzo', done:false },
  { id:6, time:'3:00 PM', cat:'clients', label:'Reactivar clientes inactivos — enviar mensajes WhatsApp', done:false },
  { id:7, time:'4:30 PM', cat:'admin', label:'Actualizar pipeline de transacciones en sistema', done:false },
]

const alertas = [
  { id:1, sev:'critical', title:'Carta de preaprobacion por vencer', desc:'Carlos Mendoza — carta vence en 15 dias (15 de abril)', days:15 },
  { id:2, sev:'high', title:'Licencia inmobiliaria — renovacion proxima', desc:'Dayana — licencia vence el 30 de mayo de 2026', days:42 },
  { id:3, sev:'medium', title:'Seguro de errores y omisiones', desc:'Proxima revision de poliza — Zivo Insurance', days:68 },
  { id:4, sev:'low', title:'Actualizacion de MLS membership', desc:'Renovacion anual — vence el 31 de julio de 2026', days:134 },
]

const catColors = { leads:'var(--danger)', properties:'var(--gold)', transactions:'var(--success)', clients:'var(--info)', marketing:'#7B6A9B', admin:'var(--slate-mid)' }
const catLabels = { leads:'Leads', properties:'Propiedades', transactions:'Transacciones', clients:'Clientes', marketing:'Marketing', admin:'Admin' }

const sevCfg = {
  critical: { bg:'var(--danger-bg)', border:'#E8B8B8', color:'var(--danger)', label:'Critico' },
  high:     { bg:'var(--warning-bg)', border:'#E8CCA0', color:'var(--warning)', label:'Alto' },
  medium:   { bg:'var(--gold-pale)', border:'var(--gold-light)', color:'var(--gold-dark)', label:'Medio' },
  low:      { bg:'var(--slate-pale)', border:'var(--border)', color:'var(--slate-muted)', label:'Bajo' },
}

const CHAT_MEMBERS = [
  { name:'Adriana', role:'Loan Officer, Bonanza Quick Loans', avatar:'AD', color:'var(--bonanza-navy)' },
  { name:'Amili', role:'Business Advisor, HC Media', avatar:'AM', color:'var(--info)' },
  { name:'Dollys', role:'Soluciones al Cliente, HC Media', avatar:'DO', color:'var(--success)' },
  { name:'Andrea', role:'Insurance Advisor, Zivo Insurance', avatar:'AN', color:'#7B6A9B' },
]

export default function HubPage() {
  const [tab, setTab] = useState('plan')
  const [tasks, setTasks] = useState(planTasks)
  const [chatMember, setChatMember] = useState(0)
  const [chatInput, setChatInput] = useState('')
  const [chatMsgs, setChatMsgs] = useState([
    { from:'team', text:'Hola! Soy '+CHAT_MEMBERS[0].name+'. Como puedo ayudarte hoy?' }
  ])

  const done = tasks.filter(t=>t.done).length
  const pct = Math.round((done/tasks.length)*100)

  function toggleTask(id){ setTasks(prev=>prev.map(t=>t.id===id?{...t,done:!t.done}:t)) }

  function sendChat(){
    if(!chatInput.trim()) return
    const msg = chatInput
    setChatMsgs(m=>[...m,{from:'user',text:msg}])
    setChatInput('')
    setTimeout(()=>{
      const m = CHAT_MEMBERS[chatMember]
      setChatMsgs(prev=>[...prev,{from:'team',text:`Gracias por tu mensaje. ${m.name} revisara tu consulta y te respondera pronto. Estamos aqui para apoyarte.`}])
    }, 600)
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left">
          <h2>Mi Hub HC Media</h2>
          <p>Tu equipo, tu plan, tu crecimiento — todo en un solo lugar</p>
        </div>
      </div>

      <DailyMessage />

      <div className="tabs">
        {['plan','alertas','equipo'].map(t=>(
          <button key={t} className={`tab-btn${tab===t?' active':''}`} onClick={()=>setTab(t)}>
            {t==='plan'?'Plan del Dia':t==='alertas'?'Alertas y Cumplimiento':'Mi Equipo HC'}
          </button>
        ))}
      </div>

      {tab==='plan' && (
        <div>
          <div className="card-sm" style={{marginBottom:'1.25rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <span style={{fontSize:'0.82rem',color:'var(--slate-muted)'}}>{done} de {tasks.length} completadas</span>
              <span style={{fontSize:'0.82rem',fontWeight:500,color:pct===100?'var(--success)':'var(--slate)'}}>{pct}%</span>
            </div>
            <div style={{height:6,background:'var(--border-light)',borderRadius:3,overflow:'hidden'}}>
              <div style={{width:`${pct}%`,height:'100%',background:pct===100?'var(--success)':'var(--gold)',borderRadius:3,transition:'width 0.3s'}} />
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'0.6rem'}}>
            {tasks.map(task=>(
              <div key={task.id} onClick={()=>toggleTask(task.id)} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.85rem 1.1rem',background:task.done?'var(--parchment)':'var(--white)',border:'1px solid var(--border)',borderLeft:`3px solid ${task.done?'var(--success)':catColors[task.cat]}`,borderRadius:'var(--radius)',cursor:'pointer',opacity:task.done?0.65:1,transition:'all 0.15s'}}>
                <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${task.done?'var(--success)':'var(--border)'}`,background:task.done?'var(--success)':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {task.done&&<svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" style={{width:10,height:10}}><path d="M1.5 5l2.5 2.5 4.5-4.5"/></svg>}
                </div>
                <div style={{minWidth:52,fontSize:'0.72rem',color:'var(--slate-muted)',fontWeight:500}}>{task.time}</div>
                <span style={{fontSize:'0.68rem',padding:'0.1rem 0.45rem',borderRadius:10,background:`${catColors[task.cat]}18`,color:catColors[task.cat],fontWeight:500,whiteSpace:'nowrap'}}>{catLabels[task.cat]}</span>
                <span style={{fontSize:'0.875rem',color:task.done?'var(--slate-muted)':'var(--slate)',textDecoration:task.done?'line-through':'none',flex:1}}>{task.label}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:'1.5rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <BonanzaCard onChat={()=>setTab('equipo')} />
            <ZivoCard />
          </div>
        </div>
      )}

      {tab==='alertas' && (
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
          {alertas.map(a=>{
            const cfg=sevCfg[a.sev]
            return (
              <div key={a.id} style={{background:cfg.bg,border:`1px solid ${cfg.border}`,borderRadius:'var(--radius)',padding:'1rem 1.25rem',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <span style={{fontSize:'0.68rem',fontWeight:600,color:cfg.color,textTransform:'uppercase',letterSpacing:'0.06em'}}>{cfg.label}</span>
                    <span style={{fontWeight:500,fontSize:'0.9rem',color:'var(--slate)'}}>{a.title}</span>
                  </div>
                  <div style={{fontSize:'0.82rem',color:'var(--slate-muted)'}}>{a.desc}</div>
                </div>
                <div style={{textAlign:'right',flexShrink:0,marginLeft:'1rem'}}>
                  <div style={{fontFamily:'var(--font-heading)',fontSize:'1.5rem',color:cfg.color,lineHeight:1}}>{a.days}</div>
                  <div style={{fontSize:'0.68rem',color:'var(--slate-muted)'}}>dias</div>
                </div>
              </div>
            )
          })}
          <div className="card-sm" style={{marginTop:'0.5rem',background:'var(--parchment)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:500,fontSize:'0.875rem'}}>Zivo Insurance — Revision de polizas incluida</div>
                <div style={{fontSize:'0.78rem',color:'var(--slate-muted)',marginTop:2}}>Andrea y su equipo monitorean el cumplimiento de tu negocio activamente.</div>
              </div>
              <button className="btn btn-secondary btn-sm">Contactar a Andrea</button>
            </div>
          </div>
        </div>
      )}

      {tab==='equipo' && (
        <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:'1.25rem',height:500}}>
          {/* Member selector */}
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            <div className="section-label" style={{marginBottom:'0.3rem'}}>Selecciona a quien hablar</div>
            {CHAT_MEMBERS.map((m,i)=>(
              <div key={i} onClick={()=>{setChatMember(i);setChatMsgs([{from:'team',text:'Hola! Soy '+m.name+'. Como puedo ayudarte hoy?'}])}} style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'0.7rem 0.85rem',background:chatMember===i?'var(--parchment-dark)':'var(--white)',border:`1px solid ${chatMember===i?'var(--gold)':'var(--border)'}`,borderRadius:'var(--radius)',cursor:'pointer'}}>
                <div style={{width:32,height:32,borderRadius:'50%',background:m.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'0.72rem',fontWeight:700,flexShrink:0}}>{m.avatar}</div>
                <div><div style={{fontSize:'0.82rem',fontWeight:500}}>{m.name}</div><div style={{fontSize:'0.68rem',color:'var(--slate-muted)',lineHeight:1.3}}>{m.role.split(',')[0]}</div></div>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div style={{display:'flex',flexDirection:'column',background:'var(--white)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
            <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:'0.65rem'}}>
              <div style={{width:34,height:34,borderRadius:'50%',background:CHAT_MEMBERS[chatMember].color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'0.78rem',fontWeight:700}}>{CHAT_MEMBERS[chatMember].avatar}</div>
              <div><div style={{fontWeight:500,fontSize:'0.875rem'}}>{CHAT_MEMBERS[chatMember].name}</div><div style={{fontSize:'0.72rem',color:'var(--slate-muted)'}}>{CHAT_MEMBERS[chatMember].role}</div></div>
            </div>
            <div style={{flex:1,overflowY:'auto',padding:'1rem',display:'flex',flexDirection:'column',gap:'0.65rem'}}>
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{maxWidth:'80%',alignSelf:m.from==='user'?'flex-end':'flex-start',background:m.from==='user'?'var(--slate)':'var(--parchment)',color:m.from==='user'?'#fff':'var(--slate)',borderRadius:'var(--radius-lg)',padding:'0.65rem 0.9rem',fontSize:'0.855rem',lineHeight:1.5}}>
                  {m.text}
                </div>
              ))}
            </div>
            <div style={{padding:'0.75rem 1rem',borderTop:'1px solid var(--border)',display:'flex',gap:'0.5rem'}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} placeholder={`Escribe a ${CHAT_MEMBERS[chatMember].name}...`} style={{flex:1,fontSize:'0.875rem'}} />
              <button className="btn btn-primary btn-sm" onClick={sendChat}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
