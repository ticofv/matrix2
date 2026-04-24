import { useState, useEffect } from 'react'

const preguntas = [
  {
    pregunta: '¿Quién propuso la famosa Alegoría de la Cueva?',
    opciones: ['Aristóteles', 'Platón', 'Sócrates', 'Descartes'],
    correcta: 1,
    dato: 'Platón la escribió en "La República" alrededor del 380 a.C.',
  },
  {
    pregunta: '¿Qué frase célebre dijo René Descartes?',
    opciones: [
      'Solo sé que no sé nada',
      'El hombre es la medida de todas las cosas',
      'Cogito, ergo sum',
      'La realidad es una ilusión',
    ],
    correcta: 2,
    dato: '"Pienso, luego existo" fue su única certeza ante la duda radical.',
  },
  {
    pregunta: '¿En qué año publicó Nick Bostrom su argumento de la simulación?',
    opciones: ['1999', '2001', '2003', '2005'],
    correcta: 2,
    dato: 'El paper "Are You Living in a Computer Simulation?" se publicó en 2003.',
  },
  {
    pregunta: '¿Cuántas opciones tiene el Trilema de Bostrom?',
    opciones: ['2', '3', '4', '5'],
    correcta: 1,
    dato: 'Extinción temprana, desinterés, o ya somos simulados.',
  },
  {
    pregunta: '¿Qué propuso el físico John Wheeler con "It from Bit"?',
    opciones: [
      'Que el universo es infinito',
      'Que la realidad deriva de información binaria',
      'Que el tiempo es relativo',
      'Que la luz tiene masa',
    ],
    correcta: 1,
    dato: 'Wheeler propuso que toda entidad física surge de respuestas a preguntas binarias.',
  },
  {
    pregunta: '¿Cómo se llama la teoría de Jacobo Grinberg?',
    opciones: ['Teoría Cuántica', 'Teoría Sintérgica', 'Teoría Holográfica', 'Teoría Neuronal'],
    correcta: 1,
    dato: 'La Teoría Sintérgica propone que el cerebro construye la realidad desde un campo universal.',
  },
  {
    pregunta: '¿En qué año desapareció misteriosamente Jacobo Grinberg?',
    opciones: ['1990', '1992', '1994', '1996'],
    correcta: 2,
    dato: 'Desapareció en 1994 a los 45 años, dejando su obra inconclusa.',
  },
  {
    pregunta: '¿Qué fenómeno cuántico sugiere que las partículas no tienen estado hasta ser observadas?',
    opciones: ['Efecto túnel', 'Superposición cuántica', 'Entrelazamiento', 'Colapso gravitacional'],
    correcta: 1,
    dato: 'La superposición cuántica es similar al "render on demand" de los videojuegos.',
  },
  {
    pregunta: '¿Qué dice el Principio Holográfico?',
    opciones: [
      'El universo es infinitamente grande',
      'La información 3D puede codificarse en una superficie 2D',
      'La luz viaja en línea recta',
      'El tiempo tiene fin',
    ],
    correcta: 1,
    dato: 'Como un holograma: la imagen 3D está codificada en una superficie plana.',
  },
  {
    pregunta: '¿Qué es el "genio maligno" de Descartes?',
    opciones: [
      'Un personaje de sus novelas',
      'Una entidad que podría engañar todos nuestros sentidos',
      'Un experimento científico',
      'Un concepto matemático',
    ],
    correcta: 1,
    dato: 'Es conceptualmente indistinguible de un supercomputador generando una simulación perfecta.',
  },
  {
    pregunta: '¿Quién es el filósofo de Oxford que formalizó el argumento de la simulación?',
    opciones: ['Stephen Hawking', 'Max Tegmark', 'Nick Bostrom', 'David Chalmers'],
    correcta: 2,
    dato: 'Bostrom publicó su famoso paper en la Universidad de Oxford en 2003.',
  },
  {
    pregunta: '¿Qué propone Max Tegmark sobre el universo?',
    opciones: [
      'Que el universo es una ilusión',
      'Que el universo es fundamentalmente matemático',
      'Que el universo tiene un creador',
      'Que el universo es finito',
    ],
    correcta: 1,
    dato: 'Tegmark propone que el universo no está descrito por matemáticas — ES matemáticas.',
  },
  {
    pregunta: '¿Qué similaridad tiene la mecánica cuántica con los videojuegos?',
    opciones: [
      'Ambos usan inteligencia artificial',
      'Ambos tienen niveles',
      'Ambos solo generan detalle donde hay un observador',
      'Ambos requieren electricidad',
    ],
    correcta: 2,
    dato: 'El "render on demand" genera detalle solo donde mira el jugador, como la observación cuántica.',
  },
  {
    pregunta: '¿Qué dice David Chalmers sobre vivir en una simulación?',
    opciones: [
      'Que es imposible',
      'Que la experiencia simulada es igualmente real',
      'Que debemos escapar de ella',
      'Que no tiene importancia filosófica',
    ],
    correcta: 1,
    dato: 'Para Chalmers, si la experiencia es idéntica, la simulación ES la realidad.',
  },
  {
    pregunta: '¿Cuál es la principal debilidad científica de la hipótesis de la simulación?',
    opciones: [
      'Es demasiado costosa de probar',
      'Nadie la toma en serio',
      'No es fácilmente falsable',
      'Contradice la física',
    ],
    correcta: 2,
    dato: 'Para ser ciencia, una hipótesis debe poder ser refutada experimentalmente.',
  },
]

const TIEMPO_POR_PREGUNTA = 20

const colores = [
  { bg: 'bg-red-600 hover:bg-red-500', selected: 'bg-red-400', letra: 'A' },
  { bg: 'bg-blue-600 hover:bg-blue-500', selected: 'bg-blue-400', letra: 'B' },
  { bg: 'bg-yellow-600 hover:bg-yellow-500', selected: 'bg-yellow-400', letra: 'C' },
  { bg: 'bg-green-600 hover:bg-green-500', selected: 'bg-green-400', letra: 'D' },
]

export default function Kahoot() {
  const [nombre, setNombre] = useState('')
  const [iniciado, setIniciado] = useState(false)
  const [actual, setActual] = useState(0)
  const [seleccionado, setSeleccionado] = useState<number | null>(null)
  const [mostrandoRespuesta, setMostrandoRespuesta] = useState(false)
  const [puntaje, setPuntaje] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO_POR_PREGUNTA)
  const [terminado, setTerminado] = useState(false)
  const [historial, setHistorial] = useState<boolean[]>([])
  const [bonusTiempo, setBonusTiempo] = useState(0)

  // Timer
  useEffect(() => {
    if (!iniciado || mostrandoRespuesta || terminado) return
    if (tiempo <= 0) {
      responder(-1)
      return
    }
    const timer = setTimeout(() => setTiempo(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [tiempo, iniciado, mostrandoRespuesta, terminado])

  function iniciar() {
    if (!nombre.trim()) return
    setIniciado(true)
  }

  function responder(index: number) {
    if (mostrandoRespuesta) return
    setSeleccionado(index)
    setMostrandoRespuesta(true)

    const correcta = preguntas[actual].correcta
    const esCorrecta = index === correcta
    const bonus = esCorrecta ? Math.round((tiempo / TIEMPO_POR_PREGUNTA) * 100) + 50 : 0

    if (esCorrecta) {
      setPuntaje(p => p + bonus)
      setBonusTiempo(bonus)
    } else {
      setBonusTiempo(0)
    }

    setHistorial(prev => [...prev, esCorrecta])

    setTimeout(() => {
      if (actual + 1 >= preguntas.length) {
        setTerminado(true)
      } else {
        setActual(a => a + 1)
        setSeleccionado(null)
        setMostrandoRespuesta(false)
        setTiempo(TIEMPO_POR_PREGUNTA)
        setBonusTiempo(0)
      }
    }, 2500)
  }

  function reiniciar() {
    setNombre('')
    setIniciado(false)
    setActual(0)
    setSeleccionado(null)
    setMostrandoRespuesta(false)
    setPuntaje(0)
    setTiempo(TIEMPO_POR_PREGUNTA)
    setTerminado(false)
    setHistorial([])
    setBonusTiempo(0)
  }

  function getMedalla() {
    const correctas = historial.filter(Boolean).length
    if (correctas === 15) return { emoji: '🏆', texto: 'Perfecto', color: 'text-yellow-400' }
    if (correctas >= 12) return { emoji: '🥇', texto: 'Excelente', color: 'text-yellow-400' }
    if (correctas >= 9)  return { emoji: '🥈', texto: 'Muy bien', color: 'text-neutral-300' }
    if (correctas >= 6)  return { emoji: '🥉', texto: 'Bien', color: 'text-amber-600' }
    return { emoji: '📚', texto: 'Seguí estudiando', color: 'text-neutral-500' }
  }

  // Pantalla de inicio
  if (!iniciado) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <p className="font-mono text-xs text-green-400 tracking-widest mb-4">
            ◉ MINIJUEGO
          </p>
          <h1 className="text-4xl font-light text-white mb-2">
            ¿Cuánto sabés?
          </h1>
          <p className="text-neutral-500 text-sm mb-10">
            15 preguntas sobre la hipótesis de la simulación
          </p>

          <div className="mb-6">
            <label className="font-mono text-xs text-neutral-500 block mb-2 text-left">
              TU NOMBRE
            </label>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && iniciar()}
              placeholder="Escribí tu nombre"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          <button
            onClick={iniciar}
            disabled={!nombre.trim()}
            className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-40 text-black font-mono text-xs tracking-widest py-4 rounded-lg transition-colors"
          >
            ¡JUGAR! →
          </button>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-neutral-900 p-3 rounded-lg">
              <p className="text-white font-mono text-lg">15</p>
              <p className="text-neutral-500 font-mono text-xs">preguntas</p>
            </div>
            <div className="bg-neutral-900 p-3 rounded-lg">
              <p className="text-white font-mono text-lg">{TIEMPO_POR_PREGUNTA}s</p>
              <p className="text-neutral-500 font-mono text-xs">por pregunta</p>
            </div>
            <div className="bg-neutral-900 p-3 rounded-lg">
              <p className="text-white font-mono text-lg">150+</p>
              <p className="text-neutral-500 font-mono text-xs">puntos máx</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Pantalla de resultado final
  if (terminado) {
    const correctas = historial.filter(Boolean).length
    const medalla = getMedalla()

    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">

          <p className="text-6xl mb-4">{medalla.emoji}</p>
          <p className={`font-mono text-xs tracking-widest mb-2 ${medalla.color}`}>
            {medalla.texto.toUpperCase()}
          </p>
          <h2 className="text-3xl font-light text-white mb-1">{nombre}</h2>
          <p className="text-neutral-500 text-sm mb-8">terminó el quiz</p>

          <div className="bg-neutral-900 rounded-xl p-6 mb-6">
            <p className="text-5xl font-mono text-green-400 mb-2">{puntaje}</p>
            <p className="font-mono text-xs text-neutral-500">PUNTOS TOTALES</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-neutral-900 p-4 rounded-lg">
              <p className="text-2xl font-mono text-white">{correctas}</p>
              <p className="font-mono text-xs text-green-400 mt-1">correctas</p>
            </div>
            <div className="bg-neutral-900 p-4 rounded-lg">
              <p className="text-2xl font-mono text-white">{15 - correctas}</p>
              <p className="font-mono text-xs text-red-400 mt-1">incorrectas</p>
            </div>
          </div>

          {/* Historial de respuestas */}
          <div className="flex gap-1 justify-center mb-8">
            {historial.map((ok, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-sm ${ok ? 'bg-green-500' : 'bg-red-500'}`}
                title={`Pregunta ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={reiniciar}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-mono text-xs tracking-widest py-3 rounded-lg transition-colors"
            >
              ↺ JUGAR DE NUEVO
            </button>
            <button
              onClick={reiniciar}
              className="w-full border border-neutral-700 text-neutral-400 hover:text-white font-mono text-xs tracking-widest py-3 rounded-lg transition-colors"
            >
              ¿Y VOS? → JUGÁ VOS
            </button>
          </div>

        </div>
      </main>
    )
  }

  // Pantalla de juego
  const pregunta = preguntas[actual]
  const porcentajeTiempo = (tiempo / TIEMPO_POR_PREGUNTA) * 100

  return (
    <main className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-3 flex justify-between items-center">
        <div>
          <p className="font-mono text-xs text-neutral-500">
            {nombre}
          </p>
          <p className="font-mono text-xs text-green-400">
            {puntaje} pts
          </p>
        </div>
        <div className="text-center">
          <p className="font-mono text-xs text-neutral-500">
            {actual + 1} / {preguntas.length}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-mono text-2xl font-bold transition-colors ${
            tiempo <= 5 ? 'text-red-400' : tiempo <= 10 ? 'text-yellow-400' : 'text-white'
          }`}>
            {tiempo}
          </p>
        </div>
      </div>

      {/* Barra de tiempo */}
      <div className="h-1.5 bg-neutral-800">
        <div
          className={`h-full transition-all duration-1000 ${
            tiempo <= 5 ? 'bg-red-400' : tiempo <= 10 ? 'bg-yellow-400' : 'bg-green-400'
          }`}
          style={{ width: `${porcentajeTiempo}%` }}
        />
      </div>

      {/* Pregunta */}
      <div className="flex-1 flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">

        <div className="flex-1 flex items-center justify-center mb-8">
          <h2 className="text-xl md:text-2xl font-light text-white text-center leading-relaxed">
            {pregunta.pregunta}
          </h2>
        </div>

        {/* Opciones estilo Kahoot */}
        <div className="grid grid-cols-2 gap-3">
          {pregunta.opciones.map((opcion, i) => {
            const color = colores[i]
            const esCorrecta = i === pregunta.correcta
            const esSeleccionada = seleccionado === i

            let clases = `relative p-4 rounded-xl text-white font-medium text-sm transition-all duration-300 text-left min-h-[80px] flex items-center gap-3 ${
              !mostrandoRespuesta
                ? color.bg
                : esCorrecta
                ? 'bg-green-500 scale-105'
                : esSeleccionada
                ? 'bg-red-500 opacity-80'
                : 'bg-neutral-800 opacity-40'
            }`

            return (
              <button
                key={i}
                onClick={() => responder(i)}
                disabled={mostrandoRespuesta}
                className={clases}
              >
                <span className="font-mono text-xs bg-black/20 w-6 h-6 rounded flex items-center justify-center shrink-0">
                  {color.letra}
                </span>
                <span className="leading-tight">{opcion}</span>
                {mostrandoRespuesta && esCorrecta && (
                  <span className="absolute top-2 right-2 text-lg">✓</span>
                )}
                {mostrandoRespuesta && esSeleccionada && !esCorrecta && (
                  <span className="absolute top-2 right-2 text-lg">✗</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Dato interesante después de responder */}
        {mostrandoRespuesta && (
          <div className="mt-4 bg-neutral-900 border border-neutral-700 rounded-lg p-4 animate-fadeIn">
            <p className="font-mono text-xs text-green-400 mb-1">DATO</p>
            <p className="text-neutral-300 text-sm leading-relaxed">{pregunta.dato}</p>
            {bonusTiempo > 0 && (
              <p className="font-mono text-xs text-yellow-400 mt-2">
                +{bonusTiempo} puntos
              </p>
            )}
          </div>
        )}

      </div>

    </main>
  )
}