
// Orbita language system — ES default, EN toggle
// Usage: import { t, setLang, lang } from '../lib/lang.js'

export const STRINGS = {
  // Navigation
  nav_dashboard:        { es: 'Panel Principal',         en: 'Dashboard' },
  nav_hub:              { es: 'Mi Hub HC Media',          en: 'My HC Hub' },
  nav_clients:          { es: 'Clientes',                 en: 'Clients' },
  nav_leads:            { es: 'Leads',                    en: 'Leads' },
  nav_households:       { es: 'Familias',                 en: 'Households' },
  nav_properties:       { es: 'Propiedades',              en: 'Properties' },
  nav_transactions:     { es: 'Transacciones',            en: 'Transactions' },
  nav_appointments:     { es: 'Citas',                    en: 'Appointments' },
  nav_contracts:        { es: 'Contratos',                en: 'Contracts' },
  nav_documents:        { es: 'Documentos',               en: 'Documents' },
  nav_receipts:         { es: 'Recibos',                  en: 'Receipts' },
  nav_tasks:            { es: 'Tareas',                   en: 'Tasks' },
  nav_communications:   { es: 'Comunicaciones',           en: 'Communications' },
  nav_reactivation:     { es: 'Reactivacion',             en: 'Reactivation' },
  nav_referrals:        { es: 'Referidos',                en: 'Referrals' },
  nav_reports:          { es: 'Financials',               en: 'Financials' },
  nav_staff:            { es: 'Staff y Comisiones',       en: 'Staff & Commissions' },
  nav_hcmedia:          { es: 'Workspace HC Media',       en: 'HC Media Workspace' },
  nav_ai:               { es: 'Asistente IA',             en: 'AI Assistant' },
  nav_settings:         { es: 'Configuracion',            en: 'Settings' },
  // Section labels
  sec_clients:          { es: 'CLIENTES Y LEADS',         en: 'CLIENTS & LEADS' },
  sec_properties:       { es: 'PROPIEDADES',              en: 'PROPERTIES' },
  sec_operations:       { es: 'OPERACIONES',              en: 'OPERATIONS' },
  sec_communications:   { es: 'COMUNICACIONES',           en: 'COMMUNICATIONS' },
  sec_growth:           { es: 'CRECIMIENTO',              en: 'GROWTH' },
  sec_business:         { es: 'NEGOCIO',                  en: 'BUSINESS' },
  sec_hcmedia:          { es: 'HC MEDIA',                 en: 'HC MEDIA' },
  sec_config:           { es: 'CONFIGURACION',            en: 'SETTINGS' },
  // Dashboard
  kpi_revenue_today:    { es: 'Ingresos Hoy',             en: 'Revenue Today' },
  kpi_active_props:     { es: 'Propiedades Activas',      en: 'Active Listings' },
  kpi_transactions:     { es: 'Transacciones Proceso',    en: 'Active Transactions' },
  kpi_apts_today:       { es: 'Citas Hoy',                en: 'Appointments Today' },
  kpi_leads:            { es: 'Leads Sin Contactar',      en: 'Uncontacted Leads' },
  kpi_inactive:         { es: 'Clientes Inactivos',       en: 'Inactive Clients' },
  kpi_closings:         { es: 'Cierres Este Mes',         en: 'Closings This Month' },
  kpi_commission:       { es: 'Comision Proyectada',      en: 'Projected Commission' },
  kpi_listings_market:  { es: 'listados en mercado',      en: 'listings in market' },
  kpi_active_pipeline:  { es: 'en pipeline activo',       en: 'in active pipeline' },
  kpi_showings:         { es: 'showings y consultas',     en: 'showings & consults' },
  kpi_respond_1h:       { es: 'responder en 1h',          en: 'respond within 1h' },
  kpi_no_contact:       { es: '60+ dias sin contacto',    en: '60+ days no contact' },
  kpi_scheduled:        { es: 'programados',              en: 'scheduled' },
  kpi_active_pipeline2: { es: 'pipeline activo',          en: 'active pipeline' },
  // Actions
  btn_new_appointment:  { es: '+ Cita',                   en: '+ Appointment' },
  btn_new_lead:         { es: '+ Lead',                   en: '+ Lead' },
  btn_new_property:     { es: '+ Propiedad',              en: '+ Property' },
  btn_reactivate:       { es: 'Reactivar',                en: 'Reactivate' },
  btn_see_all:          { es: 'Ver todas',                en: 'See all' },
  btn_see_all_m:        { es: 'Ver todos',                en: 'See all' },
  // Common
  pipeline_title:       { es: 'Pipeline de Transacciones',en: 'Transaction Pipeline' },
  apts_today_title:     { es: 'Citas de Hoy',             en: "Today's Appointments" },
  recent_leads_title:   { es: 'Leads Recientes',          en: 'Recent Leads' },
  urgent_tasks_title:   { es: 'Tareas Urgentes',          en: 'Urgent Tasks' },
  quick_actions:        { es: 'Acciones rapidas',         en: 'Quick actions' },
  no_apts_today:        { es: 'Sin citas programadas para hoy.', en: 'No appointments today.' },
  no_urgent_tasks:      { es: 'Sin tareas urgentes.',     en: 'No urgent tasks.' },
  view_upcoming:        { es: 'Ver proximas citas',       en: 'View upcoming' },
  // Stages
  stage_intake:                { es: 'Intake',                    en: 'Intake' },
  stage_documents_gathering:   { es: 'Documentos',                en: 'Documents' },
  stage_offer_submitted:       { es: 'Oferta presentada',         en: 'Offer submitted' },
  stage_under_contract:        { es: 'Bajo contrato',             en: 'Under contract' },
  stage_inspection_appraisal:  { es: 'Inspeccion',                en: 'Inspection' },
  stage_closing_scheduled:     { es: 'Cierre programado',         en: 'Closing scheduled' },
  // Login
  login_title:          { es: 'Bienvenido',               en: 'Welcome' },
  login_subtitle:       { es: 'HC Real Estate — Orbita',  en: 'HC Real Estate — Orbita' },
  login_email:          { es: 'Correo electronico',       en: 'Email address' },
  login_password:       { es: 'Contrasena',               en: 'Password' },
  login_btn:            { es: 'Iniciar sesion',           en: 'Sign in' },
  login_signing:        { es: 'Iniciando sesion...',      en: 'Signing in...' },
  login_error:          { es: 'Correo o contrasena incorrectos.', en: 'Incorrect email or password.' },
  login_footer:         { es: 'Acceso exclusivo para personal autorizado.', en: 'Authorized staff only.' },
  // Topbar search
  topbar_search:        { es: 'Buscar clientes, propiedades... o pregunta al asistente', en: 'Search clients, properties... or ask the assistant' },
  topbar_ai_btn:        { es: 'Asistente IA',             en: 'AI Assistant' },
  // Sidebar footer
  sidebar_powered:      { es: 'Powered by HC Business & Media',   en: 'Powered by HC Business & Media' },
  sidebar_location:     { es: 'Greenville, SC USA',               en: 'Greenville, SC USA' },
}

let _lang = 'es'
export function getLang()     { return _lang }
export function setLang(l)    { _lang = l }
export function t(key)        { return (STRINGS[key] && STRINGS[key][_lang]) || (STRINGS[key] && STRINGS[key]['es']) || key }
