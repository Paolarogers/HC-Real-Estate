import React, { useState } from 'react'
import { demoTasks, demoClients, demoProperties, demoTransactions, demoStaff, LABELS } from '../data/demo.js'

export default function TasksPage() {
  const [filter, setFilter] = useState('open')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filtered = demoTasks.filter(t => {
    const matchStatus = filter === 'all' || t.status === filter
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter
    return matchStatus && matchPriority
  })

  function priorityDot(p) {
    const cls = { urgent: 'p-urgent', high: 'p-high', normal: 'p-normal', low: 'p-low' }
    return <span className={`priority-dot ${cls[p] || 'p-normal'}`} style={{ display: 'inline-block', marginRight: 6 }} />
  }

  function priorityBadge(p) {
    const map = { urgent: 'badge-urgent-p', high: 'badge-warning', normal: 'badge-slate', low: 'badge-low' }
    return <span className={`badge ${map[p] || 'badge-slate'}`}>{LABELS.priority[p]}</span>
  }

  const urgentCount = demoTasks.filter(t => t.status === 'open' && t.priority === 'urgent').length
  const overdueCount = demoTasks.filter(t => t.status === 'open' && t.due_date && new Date(t.due_date) < new Date()).length

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-left">
          <h2>Tareas</h2>
          <p>{urgentCount} urgentes · {overdueCount} vencidas</p>
        </div>
        <button className="btn btn-primary btn-sm">+ Nueva Tarea</button>
      </div>

      {urgentCount > 0 && (
        <div className="alert-strip alert-danger" style={{ marginBottom: '1rem' }}>
          <div>
            <div style={{ fontWeight: 500 }}>{urgentCount} tarea{urgentCount > 1 ? 's' : ''} urgente{urgentCount > 1 ? 's' : ''}</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Requieren atención inmediata.</div>
          </div>
        </div>
      )}

      <div className="filters-row">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['open','in_progress','done','all'].map(s => (
            <button key={s}
              className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(s)}>
              {s === 'open' ? 'Abiertas' : s === 'in_progress' ? 'En progreso' : s === 'done' ? 'Completadas' : 'Todas'}
            </button>
          ))}
        </div>
        <select className="filter-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="all">Todas las prioridades</option>
          {Object.entries(LABELS.priority).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Prioridad</th>
              <th>Tarea</th>
              <th>Tipo</th>
              <th>Asignado a</th>
              <th>Vence</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => {
              const client = task.client_id ? demoClients.find(c => c.id === task.client_id) : null
              const staff = task.assigned_to ? demoStaff.find(s => s.id === task.assigned_to) : null
              const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done'
              return (
                <tr key={task.id}>
                  <td>
                    {priorityDot(task.priority)}
                    {priorityBadge(task.priority)}
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{task.title}</div>
                    {client && <div style={{ fontSize: '0.75rem', color: 'var(--slate-muted)' }}>{client.full_name}</div>}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--slate-muted)' }}>
                    {task.task_type?.replace(/_/g, ' ')}
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{staff?.full_name || '—'}</td>
                  <td style={{ fontSize: '0.82rem', color: isOverdue ? 'var(--danger)' : 'var(--slate-muted)', fontWeight: isOverdue ? 500 : 400 }}>
                    {task.due_date ? new Date(task.due_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : '—'}
                    {isOverdue && <div style={{ fontSize: '0.68rem' }}>Vencida</div>}
                  </td>
                  <td>
                    <select
                      value={task.status}
                      style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--white)', width: 'auto' }}
                      onClick={e => e.stopPropagation()}>
                      <option value="open">Abierta</option>
                      <option value="in_progress">En progreso</option>
                      <option value="done">Completada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
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
