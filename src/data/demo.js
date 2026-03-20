// ============================================================
// DATOS DE DEMOSTRACIÓN — HC Real Estate
// Todos los datos en español. Upstate SC.
// ============================================================

export const demoStaff = [
  { id: 's1', full_name: 'Paola Rogers',  role: 'owner',       active: true },
  { id: 's2', full_name: 'Dayana',         role: 'agent',       active: true },
  { id: 's3', full_name: 'Amili',          role: 'agent',       active: true },
  { id: 's4', full_name: 'Adriana',        role: 'assistant',   active: true },
  { id: 's5', full_name: 'Dollys',         role: 'receptionist',active: true },
  { id: 's6', full_name: 'Andrea',         role: 'admin',       active: true },
]

export const demoClients = [
  {
    id: 'c1', full_name: 'Carlos Mendoza Reyes', phone: '864-555-0101',
    email: 'carlos.mendoza@email.com', country_of_origin: 'México',
    preferred_language: 'es', client_type: 'buyer', status: 'active',
    budget_min: 180000, budget_max: 220000,
    prequalified: true, prequalified_amount: 215000, prequalified_lender: 'Movement Mortgage',
    assigned_agent_id: 's2', last_contact_at: '2026-03-15T10:00:00Z',
    created_at: '2026-01-10T00:00:00Z'
  },
  {
    id: 'c2', full_name: 'María Elena Guzmán', phone: '864-555-0102',
    email: 'maria.guzman@email.com', country_of_origin: 'El Salvador',
    preferred_language: 'es', client_type: 'seller', status: 'vip',
    assigned_agent_id: 's2', last_contact_at: '2026-03-16T14:00:00Z',
    created_at: '2025-06-01T00:00:00Z'
  },
  {
    id: 'c3', full_name: 'Juan Pablo Torres', phone: '864-555-0103',
    email: 'juan.torres@email.com', country_of_origin: 'Guatemala',
    preferred_language: 'es', client_type: 'tenant', status: 'active',
    budget_min: 1200, budget_max: 1500,
    assigned_agent_id: 's3', last_contact_at: '2026-03-10T09:00:00Z',
    created_at: '2026-02-15T00:00:00Z'
  },
  {
    id: 'c4', full_name: 'Rosa Imelda Hernández', phone: '864-555-0104',
    email: 'rosa.hernandez@email.com', country_of_origin: 'Honduras',
    preferred_language: 'es', client_type: 'buyer', status: 'inactive',
    budget_min: 150000, budget_max: 175000,
    assigned_agent_id: 's2', last_contact_at: '2026-01-05T00:00:00Z',
    created_at: '2025-11-01T00:00:00Z'
  },
  {
    id: 'c5', full_name: 'Pedro Alfredo Castro', phone: '864-555-0105',
    email: 'pedro.castro@email.com', country_of_origin: 'Colombia',
    preferred_language: 'both', client_type: 'investor', status: 'vip',
    budget_min: 300000, budget_max: 500000,
    prequalified: true, prequalified_amount: 450000,
    assigned_agent_id: 's3', last_contact_at: '2026-03-17T11:00:00Z',
    created_at: '2024-08-01T00:00:00Z'
  },
]

export const demoLeads = [
  {
    id: 'l1', full_name: 'Valentina Ríos', phone: '864-555-0201',
    source: 'meta_ad', service_interest: 'buy', budget_range: '$160,000–$190,000',
    area_interest: 'Mauldin, SC', assigned_agent_id: 's2',
    status: 'new', received_at: '2026-03-18T08:00:00Z'
  },
  {
    id: 'l2', full_name: 'Diana Castillo', phone: '864-555-0202',
    source: 'referral', service_interest: 'rent', budget_range: '$1,100–$1,400/mes',
    area_interest: 'Fountain Inn, SC', assigned_agent_id: 's3',
    status: 'contacted', received_at: '2026-03-17T15:00:00Z'
  },
  {
    id: 'l3', full_name: 'Marcos Fuentes', phone: '864-555-0203',
    source: 'open_house', service_interest: 'buy', budget_range: '$200,000–$240,000',
    area_interest: 'Simpsonville, SC', assigned_agent_id: 's2',
    status: 'qualified', received_at: '2026-03-16T10:00:00Z'
  },
]

export const demoProperties = [
  {
    id: 'p1', listing_agent_id: 's2', seller_client_id: 'c2',
    address_line1: '123 Oak Street', address_city: 'Mauldin', address_state: 'SC', address_zip: '29662',
    property_type: 'single_family', bedrooms: 3, bathrooms: 2, sq_ft: 1650, year_built: 2005,
    listing_price: 215000, listing_status: 'under_contract',
    listing_date: '2026-02-10', mls_number: 'MLS-2026-001',
    description_es: 'Hermosa casa unifamiliar en Mauldin. Tres habitaciones, dos baños, cocina remodelada.',
    features: ['garage', 'new_kitchen', 'fenced_yard'],
  },
  {
    id: 'p2', listing_agent_id: 's3',
    address_line1: '456 Maple Avenue', address_city: 'Fountain Inn', address_state: 'SC', address_zip: '29644',
    property_type: 'townhouse', bedrooms: 3, bathrooms: 2.5, sq_ft: 1820, year_built: 2018,
    listing_price: 189000, listing_status: 'active',
    listing_date: '2026-03-01', mls_number: 'MLS-2026-002',
    description_es: 'Townhouse moderno en Fountain Inn. Excelente estado, vecindario tranquilo.',
    features: ['community_pool', 'attached_garage'],
  },
  {
    id: 'p3', listing_agent_id: 's2',
    address_line1: '789 Pine Road', address_city: 'Simpsonville', address_state: 'SC', address_zip: '29681',
    property_type: 'rental_unit', bedrooms: 2, bathrooms: 1, sq_ft: 950, year_built: 1998,
    rental_price_mo: 1350, listing_status: 'for_rent',
    listing_date: '2026-03-10',
    description_es: 'Apartamento de 2 habitaciones disponible de inmediato. Agua incluida.',
    features: ['water_included', 'laundry_hookup'],
  },
  {
    id: 'p4', listing_agent_id: 's3', seller_client_id: 'c5',
    address_line1: '321 Elm Street', address_city: 'Greenville', address_state: 'SC', address_zip: '29601',
    property_type: 'single_family', bedrooms: 4, bathrooms: 3, sq_ft: 2400, year_built: 2012,
    listing_price: 349000, listing_status: 'active',
    listing_date: '2026-03-05', mls_number: 'MLS-2026-004',
    description_es: 'Espaciosa casa de 4 habitaciones en Greenville. Ideal para familia grande.',
    features: ['pool', 'office', 'three_car_garage'],
  },
]

export const demoTransactions = [
  {
    id: 'tx1', property_id: 'p1', client_id: 'c1', assigned_agent_id: 's2',
    transaction_type: 'purchase', stage: 'inspection_appraisal',
    transaction_number: 'TXN-2026-0001',
    opened_date: '2026-02-15', offer_date: '2026-02-20',
    contract_date: '2026-02-25', inspection_date: '2026-03-05',
    closing_date: '2026-03-28',
    offer_price: 210000, sale_price: 212000,
    commission_rate: 0.03, commission_amount: 6360,
    earnest_money: 3000,
    transaction_notes: [
      { ts: '2026-02-20T10:00:00Z', staff: 'Dayana', note: 'Oferta presentada por $210,000.' },
      { ts: '2026-02-25T14:00:00Z', staff: 'Dayana', note: 'Contraoferta aceptada a $212,000. Bajo contrato.' },
      { ts: '2026-03-05T09:00:00Z', staff: 'Dayana', note: 'Inspección completada. Reporte pendiente.' },
    ]
  },
  {
    id: 'tx2', property_id: 'p2', client_id: 'c5', assigned_agent_id: 's3',
    transaction_type: 'purchase', stage: 'offer_submitted',
    transaction_number: 'TXN-2026-0002',
    opened_date: '2026-03-10', offer_date: '2026-03-15',
    closing_date: '2026-04-30',
    offer_price: 185000, commission_rate: 0.03,
    earnest_money: 2500,
    transaction_notes: [
      { ts: '2026-03-15T11:00:00Z', staff: 'Amili', note: 'Oferta presentada por $185,000. Esperando respuesta del vendedor.' }
    ]
  },
  {
    id: 'tx3', property_id: 'p3', client_id: 'c3', assigned_agent_id: 's2',
    transaction_type: 'rental', stage: 'closing_scheduled',
    transaction_number: 'TXN-2026-0003',
    opened_date: '2026-03-12',
    closing_date: '2026-04-01',
    sale_price: 1350, commission_rate: 0.08, commission_amount: 1350,
    transaction_notes: [
      { ts: '2026-03-12T10:00:00Z', staff: 'Dayana', note: 'Solicitud aprobada. Contrato de renta listo para firma.' }
    ]
  },
]

export const demoAppointments = [
  {
    id: 'apt1', client_id: 'c1', property_id: 'p1', agent_id: 's2',
    scheduled_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    appointment_type: 'inspection_walkthrough', meeting_mode: 'in_person',
    status: 'confirmed', duration_min: 90,
    location_notes: '123 Oak Street, Mauldin SC'
  },
  {
    id: 'apt2', client_id: 'c5', property_id: 'p4', agent_id: 's3',
    scheduled_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    appointment_type: 'showing', meeting_mode: 'in_person',
    status: 'scheduled', duration_min: 60,
    location_notes: '321 Elm Street, Greenville SC'
  },
  {
    id: 'apt3', client_id: 'c3', property_id: 'p3', agent_id: 's2',
    scheduled_at: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
    appointment_type: 'final_walkthrough', meeting_mode: 'in_person',
    status: 'scheduled', duration_min: 45,
    location_notes: '789 Pine Road, Simpsonville SC'
  },
]

export const demoTasks = [
  {
    id: 't1', client_id: 'c1', transaction_id: 'tx1', assigned_to: 's2',
    task_type: 'order_appraisal',
    title: 'Ordenar avalúo — 123 Oak Street',
    priority: 'urgent', status: 'open',
    due_date: '2026-03-20'
  },
  {
    id: 't2', client_id: 'c5', transaction_id: 'tx2', assigned_to: 's3',
    task_type: 'follow_up',
    title: 'Seguimiento oferta — 456 Maple Ave',
    priority: 'high', status: 'open',
    due_date: '2026-03-19'
  },
  {
    id: 't3', lead_id: 'l1', assigned_to: 's2',
    task_type: 'call_lead',
    title: 'Llamar nuevo lead — Valentina Ríos',
    priority: 'high', status: 'open',
    due_date: '2026-03-19'
  },
  {
    id: 't4', client_id: 'c4', assigned_to: 's2',
    task_type: 'reactivation',
    title: 'Reactivar cliente inactivo — Rosa Hernández',
    priority: 'normal', status: 'open',
    due_date: '2026-03-22'
  },
]

export const demoReceipts = [
  {
    id: 'r1', client_id: 'c2', transaction_id: 'tx1', issued_by: 's2',
    issued_date: '2026-03-05', service_line: 'commission_sell',
    subtotal: 6360, tax: 0, discount: 0, total: 6360,
    payment_method: 'wire', status: 'pending',
    receipt_number: 'HCR-2026-0001',
    line_items: [{ service: 'Comisión — Venta 123 Oak Street (3%)', qty: 1, unit_price: 6360 }]
  },
]

export const LABELS = {
  client_type: {
    buyer: 'Comprador', seller: 'Vendedor', tenant: 'Inquilino',
    landlord: 'Propietario', investor: 'Inversionista', both: 'Ambos'
  },
  listing_status: {
    coming_soon: 'Próximamente', active: 'Activo', under_contract: 'Bajo Contrato',
    sold: 'Vendido', withdrawn: 'Retirado', expired: 'Expirado',
    for_rent: 'En Renta', rented: 'Rentado', off_market: 'Fuera de Mercado'
  },
  transaction_stage: {
    intake: 'Inicio', documents_gathering: 'Recopilando Documentos',
    offer_submitted: 'Oferta Presentada', under_contract: 'Bajo Contrato',
    inspection_appraisal: 'Inspección y Avalúo', closing_scheduled: 'Cierre Programado',
    closed: 'Cerrado', cancelled: 'Cancelado'
  },
  transaction_type: { purchase: 'Compra', sale: 'Venta', rental: 'Renta' },
  property_type: {
    single_family: 'Casa Unifamiliar', townhouse: 'Townhouse', condo: 'Condominio',
    mobile_home: 'Casa Móvil', land: 'Terreno', multi_family: 'Multi-Familiar',
    commercial: 'Comercial', rental_unit: 'Unidad en Renta', other: 'Otro'
  },
  appointment_type: {
    showing: 'Visita a Propiedad', consultation: 'Consulta',
    listing_appt: 'Cita de Listado', offer_review: 'Revisión de Oferta',
    inspection_walkthrough: 'Recorrido de Inspección',
    final_walkthrough: 'Recorrido Final', closing: 'Cierre',
    follow_up: 'Seguimiento', other: 'Otro'
  },
  status: { active: 'Activo', inactive: 'Inactivo', vip: 'VIP', closed: 'Cerrado' },
  priority: { low: 'Baja', normal: 'Normal', high: 'Alta', urgent: 'Urgente' },
  role: {
    owner: 'Propietaria', agent: 'Agente', assistant: 'Asistente',
    receptionist: 'Recepcionista', admin: 'Administradora'
  },
  lead_source: {
    meta_ad: 'Meta Ads', referral: 'Referido', walk_in: 'Walk-In',
    website: 'Sitio Web', open_house: 'Open House',
    zillow: 'Zillow', realtor_com: 'Realtor.com', manual: 'Manual', other: 'Otro'
  },
  lead_status: {
    new: 'Nuevo', contacted: 'Contactado', qualified: 'Calificado',
    showing_scheduled: 'Visita Programada', converted: 'Convertido',
    lost: 'Perdido', no_response: 'Sin Respuesta'
  }
}

export const demoHCMessages = [
  {
    author: 'Paola Rogers',
    role: 'Fundadora y Presidenta, Hispanos Comunidad',
    text: 'Cada familia que ayudamos a encontrar su hogar es una historia de esfuerzo y confianza. Hoy trabajamos para que más familias latinas construyan su patrimonio aquí en Upstate SC.'
  },
  {
    author: 'Dayana',
    role: 'CEO, Hispanos Comunidad',
    text: 'Revisen sus transacciones activas hoy. Cada cierre que avanzamos esta semana es un compromiso que cumplimos. Los clientes confían en nosotros para que lleguemos a la línea de meta con ellos.'
  },
  {
    author: 'Amili',
    role: 'Lider de Media y Marketing, HC Media',
    text: 'Tenemos leads nuevos de la campaña de Meta de esta semana. Cada lead es una familia buscando orientación — el primer contacto dentro de las primeras 24 horas marca la diferencia.'
  },
  {
    author: 'Adriana',
    role: 'Lider de Ventas y Alcance, Bonanza Quick Loans',
    text: 'Si tienen clientes compradores que todavía no están prequalificados, este es el momento. Tasas actuales y proceso rápido para nuestra comunidad. Los conectamos hoy.'
  },
  {
    author: 'Dollys',
    role: 'Soluciones al Cliente, HC Media',
    text: 'Las citas de hoy están confirmadas. Si hay algún cliente que no ha respondido recordatorio, lo contactamos antes de mediodía. No dejamos que ninguna cita se pierda sin seguimiento.'
  },
  {
    author: 'Andrea',
    role: 'Lider de Seguros, Zivo Insurance',
    text: 'Para los clientes que están cerrando en los próximos 30 días — necesitan seguro de propietario antes del cierre. Trabajamos con nosotros para que el proceso sea parte del cierre, no un obstáculo.'
  },
]
