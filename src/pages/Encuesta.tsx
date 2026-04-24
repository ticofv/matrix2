import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const preguntas = [
  {
    id: 'p1',
    texto: '¿Qué tan interesante te pareció el tema de la hipótesis de la simulación?',
    opciones: ['Muy interesante', 'Interesante', 'Más o menos', 'Poco interesante', 'Nada interesante'],
  },
  {
    id: 'p2',
    texto: '¿Qué tan clara fue la explicación del tema?',
    opciones: ['Muy clara', 'Clara', 'Regular', 'Confusa', 'Muy confusa'],
  },
  {
    id: 'p3',
    texto: '¿Conocías la hipótesis de la simulación antes de esta investigación?',
    opciones: ['Sí, la conocía bien', 'Había escuchado algo', 'No la conocía'],
  },
  {
    id: 'p4',
    texto: '¿Creés que es posible que vivamos en una simulación?',
    opciones: ['Definitivamente sí', 'Probablemente sí', 'No sé', 'Probablemente no', 'Definitivamente no'],
  },
  {
    id: 'p5',
    texto: '¿Cuál filósofo o científico te pareció más convincente?',
    opciones: ['Platón', 'René Descartes', 'Nick Bostrom', 'Jacobo Grinberg', 'Ninguno'],
  },
  {
    id: 'p6',
    texto: '¿Qué sección de la investigación te pareció más interesante?',
    opciones: ['Orígenes filosóficos', 'El Trilema de Bostrom', 'Física cuántica', 'Teoría Sintérgica de Grinberg', 'El debate'],
  },
  {
    id: 'p7',
    texto: '¿Cómo calificarías el diseño visual de la página web?',
    opciones: ['Excelente', 'Bueno', 'Regular', 'Malo'],
  },
  {
    id: 'p8',
    texto: '¿Qué tan fácil fue navegar por la página?',
    opciones: ['Muy fácil', 'Fácil', 'Regular', 'Difícil'],
  },
  {
    id: 'p9',
    texto: '¿El quiz de "¿Qué filósofo sos?" te pareció entretenido?',
    opciones: ['Muy entretenido', 'Entretenido', 'Regular', 'Poco entretenido'],
  },
  {
    id: 'p10',
    texto: '¿Recomendarías esta página a otras personas?',
    opciones: ['Definitivamente sí', 'Probablemente sí', 'No sé', 'Probablemente no'],
  },
  {
    id: 'p11',
    texto: '¿Creés que la tecnología actual podría llegar a simular universos conscientes?',
    opciones: ['Sí, en el futuro cercano', 'Sí, pero en siglos', 'No creo que sea posible', 'No sé'],
  },
  {
    id: 'p12',
    texto: '¿Esta investigación cambió tu perspectiva sobre la realidad?',
    opciones: ['Sí, completamente', 'Un poco', 'No cambió nada', 'Me generó más dudas'],
  },
  {
    id: 'p13',
    texto: '¿Qué tan bien preparado estuvo el equipo para presentar el tema?',
    opciones: ['Muy bien preparado', 'Bien preparado', 'Regular', 'Poco preparado'],
  },
  {
    id: 'p14',
    texto: '¿Te gustaría seguir investigando sobre este tema?',
    opciones: ['Sí, mucho', 'Tal vez', 'No realmente', 'No'],
  },
  {
    id: 'p15',
    texto: '¿Cómo calificarías la investigación en general?',
    opciones: ['Excelente', 'Muy buena', 'Buena', 'Regular', 'Mala'],
  },
]

export default function Encuesta() {
  const [nombre, setNombre] = useState('')
  const [seccion, setSeccion] = useState('')
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const progreso = Object.keys(respuestas).length
  const total = preguntas.length

  function responder(id: string, opcion: string) {
    setRespuestas(prev => ({ ...prev, [id]: opcion }))
  }

  async function enviar() {
    if (!nombre.trim()) {
      setError('Por favor escribí tu nombre.')
      return
    }
    if (!seccion.trim()) {
      setError('Por favor escribí tu sección.')
      return
    }
    if (progreso < total) {
      setError(`Faltan ${total - progreso} preguntas por responder.`)
      return
    }

    setError('')
    setEnviando(true)

    try {
      await addDoc(collection(db, 'encuestas'), {
        nombre: nombre.trim(),
        seccion: seccion.trim(),
        respuestas,
        fecha: serverTimestamp(),
      })
      setEnviado(true)
    } catch (e) {
      setError('Hubo un error al enviar. Intentá de nuevo.')
    }

    setEnviando(false)
  }

  if (enviado) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-green-400 text-5xl mb-6">✓</div>
        <h1 className="text-3xl font-light text-white mb-4">¡Gracias por participar!</h1>
        <p className="text-neutral-400">Tu respuesta fue guardada correctamente.</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 pb-24">

      <div className="relative h-48 overflow-hidden mb-16 -mx-6">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 to-neutral-950" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8">
          <h1 className="text-4xl font-light text-green-400">Encuesta</h1>
          <p className="text-neutral-400 mt-2 font-mono text-xs tracking-widest">
            INVESTIGACIÓN · 11-2 LDOQ
          </p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-10">
        <div className="flex justify-between font-mono text-xs text-neutral-500 mb-2">
          <span>PROGRESO</span>
          <span>{progreso} / {total}</span>
        </div>
        <div className="h-1 bg-neutral-800 rounded-full">
          <div
            className="h-1 bg-green-400 rounded-full transition-all duration-500"
            style={{ width: `${(progreso / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Nombre y sección */}
      <div className="flex flex-col gap-4 mb-10">
        <div>
          <label className="font-mono text-xs text-neutral-500 block mb-2">NOMBRE</label>
          <input
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-neutral-500 block mb-2">SECCIÓN</label>
          <input
            value={seccion}
            onChange={e => setSeccion(e.target.value)}
            placeholder="Ej: 10-1, 11-3..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      {/* Preguntas */}
      <div className="flex flex-col gap-10">
        {preguntas.map((pregunta, i) => (
          <div key={pregunta.id}>
            <p className="font-mono text-xs text-neutral-500 mb-2">
              PREGUNTA {i + 1}
            </p>
            <h3 className="text-white font-light mb-4 leading-relaxed">
              {pregunta.texto}
            </h3>
            <div className="flex flex-col gap-2">
              {pregunta.opciones.map(opcion => (
                <button
                  key={opcion}
                  onClick={() => responder(pregunta.id, opcion)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${
                    respuestas[pregunta.id] === opcion
                      ? 'border-green-500 bg-green-500/10 text-white'
                      : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500 hover:text-white'
                  }`}
                >
                  {respuestas[pregunta.id] === opcion && (
                    <span className="text-green-400 mr-2">✓</span>
                  )}
                  {opcion}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 font-mono text-xs mt-8 text-center">{error}</p>
      )}

      {/* Botón enviar */}
      <button
        onClick={enviar}
        disabled={enviando}
        className="w-full mt-10 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-mono text-xs tracking-widest py-4 rounded-lg transition-colors"
      >
        {enviando ? 'ENVIANDO...' : 'ENVIAR RESPUESTAS →'}
      </button>

    </main>
  )
}