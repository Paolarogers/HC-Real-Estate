
import React from 'react'

const MESSAGES = [
  { author: 'Paola Rogers', role: 'Fundadora y Presidenta, Hispanos Comunidad', messages: [
    'Cada propiedad que cerramos no es solo una transaccion. Es el sueno de una familia latina hecho realidad. Esa responsabilidad nos guia en cada paso.',
    'Llevamos mas de 13 anos caminando junto a empresarios latinos. La vivienda es la inversion mas grande de sus vidas y nosotros la tomamos igual de en serio.',
    'Nuestro trabajo no termina en el cierre. Comienza ahi. La relacion con cada cliente es lo que construye este negocio a largo plazo.',
    'Una familia con casa propia tiene estabilidad, tiene orgullo, tiene futuro. Cada listado que trabajamos es parte de esa mision.',
    'El mercado cambia pero nuestra mision no. Guiar a la comunidad latina hacia la vivienda propia es lo que nos levanta cada manana.',
    'No hay decision financiera mas grande que comprar una casa. Por eso estamos aqui, para que ningun cliente camine ese camino solo.',
    'Lo que construimos no es software. Es confianza. Y la confianza se gana un cierre a la vez, un cliente a la vez.',
  ]},
  { author: 'Dayana', role: 'CEO, Hispanos Comunidad', messages: [
    'Revisa el pipeline hoy. Las transacciones atascadas en inspeccion necesitan seguimiento activo esta semana.',
    'Cuantas comisiones se proyectan este mes? Ese numero debe estar claro en tu cabeza antes de las 9 AM.',
    'Un agente productivo no espera que el cliente llame. El agente productivo llama primero.',
    'Las transacciones no se cierran solas. Cada etapa requiere accion deliberada del agente asignado.',
    'El dashboard te dice donde estan los cuellos de botella. Usalo todos los dias, no solo cuando hay problemas.',
    'Revenue proyectado y revenue realizado son dos numeros diferentes. La diferencia esta en el seguimiento.',
    'Los numeros de este mes se construyen con las acciones de hoy. Que accion critica tienes pendiente ahora mismo?',
  ]},
  { author: 'Amili', role: 'Lider de Media y Marketing, HC Media', messages: [
    'Las fotos de tus propiedades son tu primer argumento de venta. Si no estan bien iluminadas, pierde el listing antes de empezar.',
    'El mejor momento para publicar un listing nuevo en Meta es martes o miercoles entre 10 AM y 12 PM. Aprovecha esa ventana.',
    'Un video tour de 60 segundos genera mas engagement que 20 fotos estaticas. Es momento de probar el formato.',
    'Tus clientes VIP merecen ser los primeros en saber sobre nuevas propiedades. El acceso anticipado es un beneficio que cuesta cero.',
    'El algoritmo de Meta favorece consistencia sobre volumen. Publicar 3 veces por semana sistematicamente supera a publicar 10 veces un solo dia.',
    'El caption de un listing debe responder tres preguntas: por que esta propiedad, por que ahora, por que contigo.',
    'Las campanas de reactivacion con fotos del antes y despues de propiedades similares convierten mucho mejor que texto solo.',
  ]},
  { author: 'Adriana', role: 'Lider de Ventas y Alcance, Bonanza Quick Loans', messages: [
    'Muchos compradores creen que no califican. Tu trabajo es conectarlos con nosotros antes de que se rindan.',
    'Un comprador con ITIN puede comprar casa. No asumas que no tiene opciones hasta hablar con Bonanza.',
    'El bridge loan es una herramienta que pocos agentes explican a sus clientes. Hoy es un buen dia para aprender como funciona.',
    'El financiamiento no es el obstaculo, es el puente. Hay que construirlo junto al cliente desde el primer dia.',
    'Para clientes inversionistas, el DSCR loan abre puertas que el financiamiento convencional cierra. Conoce las opciones.',
    'El rechazo de un prestamista no es el fin. Es el comienzo de una conversacion con Bonanza.',
    'Cuando un comprador duda por el precio, a veces la conversacion correcta es sobre la mensualidad, no sobre el precio total.',
  ]},
  { author: 'Dollys', role: 'Soluciones al Cliente, HC Media', messages: [
    'La llamada de seguimiento despues de un showing es lo que separa el cierre del lead perdido. Hazla hoy.',
    'Un cliente que no responde mensajes puede responder una llamada. Cambia el canal antes de darlo por perdido.',
    'La experiencia del cliente no es solo la transaccion. Es cada interaccion desde el primer lead hasta despues del cierre.',
    'Responder en menos de una hora a un lead nuevo aumenta la probabilidad de conversion en mas del 60 por ciento.',
    'El cliente que se sintio ignorado no vuelve. Y tampoco referiere. El seguimiento es la base del negocio.',
    'Una nota de agradecimiento despues del cierre no tarda 5 minutos y genera referencias por anos.',
    'Los clientes no recuerdan el precio que pagaron. Recuerdan como se sintieron durante el proceso. Ese es tu producto real.',
  ]},
  { author: 'Andrea', role: 'Lider de Seguros, Zivo Insurance', messages: [
    'El E&O no es opcional para un agente inmobiliario. Un error de omision en un contrato puede costar mas que tu comision anual.',
    'Si usas tu auto para tours de propiedades, tu poliza personal probablemente no cubre un accidente en ese contexto. Revisa con Zivo.',
    'El seguro de propietario debe estar listo antes del cierre. No dejes que ese detalle detenga una transaccion en la recta final.',
    'Una poliza de responsabilidad civil general protege tu negocio de reclamaciones que ni imaginas que pueden llegar.',
    'Zivo puede coordinar el seguro del comprador y del vendedor en la misma transaccion. Un punto de contacto, menos estres.',
    'El seguro correcto no es el mas barato. Es el que te protege cuando mas lo necesitas. Esa es la diferencia que hacemos.',
    'Cada cliente que cierra una propiedad necesita cobertura. Esa es una conversacion que debes tener tu como agente, no dejarla al azar.',
  ]},
]

def getDayMsg():
    from datetime import datetime
    now = datetime.now()
    doy = now.timetuple().tm_yday
    woy = doy // 7
    member_idx = doy % 6
    msg_idx = woy % 7
    return MESSAGES[member_idx], msg_idx

export default function DailyMessage() {
  const now = new Date()
  const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  const woy = Math.floor(doy / 7)
  const memberIdx = doy % 6
  const msgIdx = woy % 7
  const member = MESSAGES[memberIdx]
  const text = member.messages[msgIdx]
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="daily-msg">
      <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'rgba(184,154,74,0.04)', borderRadius: '50%', transform: 'translate(60px,-60px)' }} />
      <div className="daily-msg-date">Mensaje del dia — {dateStr}</div>
      <div className="daily-msg-text">"{text}"</div>
      <div className="daily-msg-author">{member.author}</div>
      <div className="daily-msg-role">{member.role}</div>
    </div>
  )
}

const MESSAGES = [
  { author: 'Paola Rogers', role: 'Fundadora y Presidenta, Hispanos Comunidad', messages: [
    'Cada propiedad que cerramos no es solo una transaccion. Es el sueno de una familia latina hecho realidad. Esa responsabilidad nos guia en cada paso.',
    'Llevamos mas de 13 anos caminando junto a empresarios latinos. La vivienda es la inversion mas grande de sus vidas y nosotros la tomamos igual de en serio.',
    'Nuestro trabajo no termina en el cierre. Comienza ahi. La relacion con cada cliente es lo que construye este negocio a largo plazo.',
    'Una familia con casa propia tiene estabilidad, tiene orgullo, tiene futuro. Cada listado que trabajamos es parte de esa mision.',
    'El mercado cambia pero nuestra mision no. Guiar a la comunidad latina hacia la vivienda propia es lo que nos levanta cada manana.',
    'No hay decision financiera mas grande que comprar una casa. Por eso estamos aqui, para que ningun cliente camine ese camino solo.',
    'Lo que construimos no es software. Es confianza. Y la confianza se gana un cierre a la vez, un cliente a la vez.',
  ]},
  { author: 'Dayana', role: 'CEO, Hispanos Comunidad', messages: [
    'Revisa el pipeline hoy. Las transacciones atascadas en inspeccion necesitan seguimiento activo esta semana.',
    'Cuantas comisiones se proyectan este mes? Ese numero debe estar claro en tu cabeza antes de las 9 AM.',
    'Un agente productivo no espera que el cliente llame. El agente productivo llama primero.',
    'Las transacciones no se cierran solas. Cada etapa requiere accion deliberada del agente asignado.',
    'El dashboard te dice donde estan los cuellos de botella. Usalo todos los dias, no solo cuando hay problemas.',
    'Revenue proyectado y revenue realizado son dos numeros diferentes. La diferencia esta en el seguimiento.',
    'Los numeros de este mes se construyen con las acciones de hoy. Que accion critica tienes pendiente ahora mismo?',
  ]},
  { author: 'Amili', role: 'Lider de Media y Marketing, HC Media', messages: [
    'Las fotos de tus propiedades son tu primer argumento de venta. Si no estan bien iluminadas, pierde el listing antes de empezar.',
    'El mejor momento para publicar un listing nuevo en Meta es martes o miercoles entre 10 AM y 12 PM. Aprovecha esa ventana.',
    'Un video tour de 60 segundos genera mas engagement que 20 fotos estaticas. Es momento de probar el formato.',
    'Tus clientes VIP merecen ser los primeros en saber sobre nuevas propiedades. El acceso anticipado es un beneficio que cuesta cero.',
    'El algoritmo de Meta favorece consistencia sobre volumen. Publicar 3 veces por semana sistematicamente supera a publicar 10 veces un solo dia.',
    'El caption de un listing debe responder tres preguntas: por que esta propiedad, por que ahora, por que contigo.',
    'Las campanas de reactivacion con fotos del antes y despues de propiedades similares convierten mucho mejor que texto solo.',
  ]},
  { author: 'Adriana', role: 'Lider de Ventas y Alcance, Bonanza Quick Loans', messages: [
    'Muchos compradores creen que no califican. Tu trabajo es conectarlos con nosotros antes de que se rindan.',
    'Un comprador con ITIN puede comprar casa. No asumas que no tiene opciones hasta hablar con Bonanza.',
    'El bridge loan es una herramienta que pocos agentes explican a sus clientes. Hoy es un buen dia para aprender como funciona.',
    'El financiamiento no es el obstaculo, es el puente. Hay que construirlo junto al cliente desde el primer dia.',
    'Para clientes inversionistas, el DSCR loan abre puertas que el financiamiento convencional cierra. Conoce las opciones.',
    'El rechazo de un prestamista no es el fin. Es el comienzo de una conversacion con Bonanza.',
    'Cuando un comprador duda por el precio, a veces la conversacion correcta es sobre la mensualidad, no sobre el precio total.',
  ]},
  { author: 'Dollys', role: 'Soluciones al Cliente, HC Media', messages: [
    'La llamada de seguimiento despues de un showing es lo que separa el cierre del lead perdido. Hazla hoy.',
    'Un cliente que no responde mensajes puede responder una llamada. Cambia el canal antes de darlo por perdido.',
    'La experiencia del cliente no es solo la transaccion. Es cada interaccion desde el primer lead hasta despues del cierre.',
    'Responder en menos de una hora a un lead nuevo aumenta la probabilidad de conversion en mas del 60 por ciento.',
    'El cliente que se sintio ignorado no vuelve. Y tampoco referiere. El seguimiento es la base del negocio.',
    'Una nota de agradecimiento despues del cierre no tarda 5 minutos y genera referencias por anos.',
    'Los clientes no recuerdan el precio que pagaron. Recuerdan como se sintieron durante el proceso. Ese es tu producto real.',
  ]},
  { author: 'Andrea', role: 'Lider de Seguros, Zivo Insurance', messages: [
    'El E&O no es opcional para un agente inmobiliario. Un error de omision en un contrato puede costar mas que tu comision anual.',
    'Si usas tu auto para tours de propiedades, tu poliza personal probablemente no cubre un accidente en ese contexto. Revisa con Zivo.',
    'El seguro de propietario debe estar listo antes del cierre. No dejes que ese detalle detenga una transaccion en la recta final.',
    'Una poliza de responsabilidad civil general protege tu negocio de reclamaciones que ni imaginas que pueden llegar.',
    'Zivo puede coordinar el seguro del comprador y del vendedor en la misma transaccion. Un punto de contacto, menos estres.',
    'El seguro correcto no es el mas barato. Es el que te protege cuando mas lo necesitas. Esa es la diferencia que hacemos.',
    'Cada cliente que cierra una propiedad necesita cobertura. Esa es una conversacion que debes tener tu como agente, no dejarla al azar.',
  ]},
]
