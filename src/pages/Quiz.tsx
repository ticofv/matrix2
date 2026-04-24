import { useState, useEffect } from 'react'

const preguntas = [
  {
    pregunta: '¿Qué harías si descubrieras que la realidad es una simulación?',
    opciones: [
      { texto: 'Buscaría la verdad sin importar las consecuencias', filosofo: 'platon' },
      { texto: 'Lo dudaría todo hasta encontrar una certeza absoluta', filosofo: 'descartes' },
      { texto: 'Analizaría las probabilidades matemáticas', filosofo: 'bostrom' },
      { texto: 'Estudiaría cómo mi cerebro construye esa realidad', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cuál es tu mayor herramienta para entender el mundo?',
    opciones: [
      { texto: 'La razón y la contemplación filosófica', filosofo: 'platon' },
      { texto: 'La duda sistemática y el pensamiento crítico', filosofo: 'descartes' },
      { texto: 'La lógica y las matemáticas', filosofo: 'bostrom' },
      { texto: 'La conciencia y la experiencia subjetiva', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿En qué creés más?',
    opciones: [
      { texto: 'Existe una verdad superior que pocos pueden ver', filosofo: 'platon' },
      { texto: 'No podemos confiar en nada que no podamos probar', filosofo: 'descartes' },
      { texto: 'Todo se puede reducir a probabilidades y estadísticas', filosofo: 'bostrom' },
      { texto: 'La mente crea la realidad que percibimos', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué harías con el conocimiento de que somos simulados?',
    opciones: [
      { texto: 'Compartirlo con todos, aunque no me crean', filosofo: 'platon' },
      { texto: 'Guardarlo para mí hasta tener pruebas suficientes', filosofo: 'descartes' },
      { texto: 'Publicar un paper académico con el argumento', filosofo: 'bostrom' },
      { texto: 'Usarlo para expandir mi conciencia', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cómo describís tu forma de pensar?',
    opciones: [
      { texto: 'Idealista — las ideas son más reales que los objetos', filosofo: 'platon' },
      { texto: 'Escéptico — cuestiono todo antes de aceptarlo', filosofo: 'descartes' },
      { texto: 'Analítico — me guío por datos y lógica', filosofo: 'bostrom' },
      { texto: 'Intuitivo — confío en mi percepción interna', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué película te representa más?',
    opciones: [
      { texto: 'La Alegría de los Dioses — buscar la verdad oculta', filosofo: 'platon' },
      { texto: 'The Truman Show — cuestionar todo lo que ves', filosofo: 'descartes' },
      { texto: 'The Matrix — la lógica detrás del sistema', filosofo: 'bostrom' },
      { texto: 'Doctor Strange — la mente expande la realidad', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué te genera más curiosidad?',
    opciones: [
      { texto: 'El mundo de las ideas y las formas perfectas', filosofo: 'platon' },
      { texto: 'Si realmente podemos conocer algo con certeza', filosofo: 'descartes' },
      { texto: 'Las probabilidades de que existan universos paralelos', filosofo: 'bostrom' },
      { texto: 'Cómo la conciencia genera la experiencia', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cómo reaccionás ante una idea que desafía lo que creés?',
    opciones: [
      { texto: 'La analizo para ver si se acerca a la verdad absoluta', filosofo: 'platon' },
      { texto: 'La cuestiono hasta que pueda probarla o refutarla', filosofo: 'descartes' },
      { texto: 'La evalúo con datos y argumentos lógicos', filosofo: 'bostrom' },
      { texto: 'La siento y veo si resuena con mi experiencia interna', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cuál de estas frases te identifica más?',
    opciones: [
      { texto: '"El conocimiento es recordar lo que el alma ya sabe"', filosofo: 'platon' },
      { texto: '"Solo sé que no sé nada con certeza"', filosofo: 'descartes' },
      { texto: '"Los números no mienten"', filosofo: 'bostrom' },
      { texto: '"La realidad está en la mente del observador"', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué te parece más importante en la vida?',
    opciones: [
      { texto: 'Buscar la justicia y la virtud', filosofo: 'platon' },
      { texto: 'Encontrar verdades absolutas e incuestionables', filosofo: 'descartes' },
      { texto: 'Entender los sistemas y patrones del universo', filosofo: 'bostrom' },
      { texto: 'Expandir la conciencia y la percepción', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cómo explicarías la existencia del universo?',
    opciones: [
      { texto: 'Existe un orden perfecto detrás de todo lo visible', filosofo: 'platon' },
      { texto: 'No podemos saberlo con certeza, pero podemos deducirlo', filosofo: 'descartes' },
      { texto: 'Es uno de muchos universos posibles en un multiverso', filosofo: 'bostrom' },
      { texto: 'Es una proyección de la conciencia colectiva', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué te genera más miedo?',
    opciones: [
      { texto: 'Vivir en la ignorancia sin buscar la verdad', filosofo: 'platon' },
      { texto: 'Creer en algo falso sin saberlo', filosofo: 'descartes' },
      { texto: 'Que la realidad sea completamente aleatoria', filosofo: 'bostrom' },
      { texto: 'Perder la conexión con mi conciencia', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cómo tomás decisiones importantes?',
    opciones: [
      { texto: 'Reflexionando sobre qué es lo más justo y virtuoso', filosofo: 'platon' },
      { texto: 'Eliminando todas las opciones que no puedo verificar', filosofo: 'descartes' },
      { texto: 'Calculando qué opción tiene mayor probabilidad de éxito', filosofo: 'bostrom' },
      { texto: 'Escuchando mi intuición y estado interno', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué opinás sobre los sueños?',
    opciones: [
      { texto: 'Son ventanas a verdades más profundas del alma', filosofo: 'platon' },
      { texto: 'Son otra forma de ilusión que no podemos confiar', filosofo: 'descartes' },
      { texto: 'Son simulaciones que el cerebro genera mientras duerme', filosofo: 'bostrom' },
      { texto: 'Son estados alterados donde la conciencia se expande', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Qué harías si pudieras salir de la simulación?',
    opciones: [
      { texto: 'Volver a contarle a los demás lo que vi afuera', filosofo: 'platon' },
      { texto: 'Quedarme afuera y seguir cuestionando esa nueva realidad', filosofo: 'descartes' },
      { texto: 'Analizar la arquitectura del sistema desde afuera', filosofo: 'bostrom' },
      { texto: 'Explorar los niveles de conciencia que existen más allá', filosofo: 'grinberg' },
    ],
  },
  {
    pregunta: '¿Cómo ves la relación entre ciencia y filosofía?',
    opciones: [
      { texto: 'La filosofía va más profundo que la ciencia', filosofo: 'platon' },
      { texto: 'Ambas deben basarse en la duda y la verificación', filosofo: 'descartes' },
      { texto: 'La ciencia es filosofía con datos concretos', filosofo: 'bostrom' },
      { texto: 'La conciencia es el puente entre las dos', filosofo: 'grinberg' },
    ],
  },
]

const resultados: Record<string, { nombre: string; descripcion: string; color: string; imagen: string }> = {
  platon: {
    nombre: 'Platón',
    descripcion: 'Sos un pensador idealista. Creés que existe una realidad más profunda detrás de lo que percibimos, y estás dispuesto a salir de la cueva para encontrarla aunque otros no lo entiendan.',
    color: 'text-purple-400',
    imagen: '/2.jpg',
  },
  descartes: {
    nombre: 'René Descartes',
    descripcion: 'Sos un escéptico sistemático. No aceptás nada sin cuestionarlo primero. Tu mente busca certezas absolutas y no te conformás con respuestas fáciles.',
    color: 'text-blue-400',
    imagen: '/3.jpg',
  },
  bostrom: {
    nombre: 'Nick Bostrom',
    descripcion: 'Sos un pensador analítico. Preferís los argumentos lógicos y las probabilidades. Si hay un 99% de chance de estar en una simulación, para vos eso es suficiente evidencia.',
    color: 'text-green-400',
    imagen: '/5.jpg',
  },
  grinberg: {
    nombre: 'Jacobo Grinberg',
    descripcion: 'Sos un explorador de la conciencia. Creés que la mente es la clave para entender la realidad. La experiencia subjetiva te parece más importante que cualquier argumento externo.',
    color: 'text-amber-400',
    imagen: '/6.jpg',
  },
}

export default function Quiz() {
  const [actual, setActual] = useState(0)
  const [votos, setVotos] = useState<Record<string, number>>({ platon: 0, descartes: 0, bostrom: 0, grinberg: 0 })
  const [terminado, setTerminado] = useState(false)
  const [seleccionado, setSeleccionado] = useState<number | null>(null)
  const [mostrando, setMostrando] = useState(false)
  const [visible, setVisible] = useState(false)
  const [resultadoFinal, setResultadoFinal] = useState<string | null>(null)

  useEffect(() => {
    if (terminado) {
      const timer = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [terminado])

  function elegir(filosofo: string, index: number) {
    if (mostrando) return
    setSeleccionado(index)
    setMostrando(true)

    setTimeout(() => {
      const nuevosVotos = { ...votos, [filosofo]: votos[filosofo] + 1 }
      setVotos(nuevosVotos)

      if (actual + 1 >= preguntas.length) {
        const ganadorFinal = Object.entries(nuevosVotos).sort((a, b) => b[1] - a[1])[0][0]
        setResultadoFinal(ganadorFinal)
        setTerminado(true)
      } else {
        setActual(actual + 1)
        setSeleccionado(null)
        setMostrando(false)
      }
    }, 1500)
  }

  function reiniciar() {
    setVisible(false)
    setTimeout(() => {
      setActual(0)
      setVotos({ platon: 0, descartes: 0, bostrom: 0, grinberg: 0 })
      setTerminado(false)
      setSeleccionado(null)
      setMostrando(false)
      setResultadoFinal(null)
    }, 400)
  }

  const resultado = resultados[resultadoFinal ?? 'platon']

  return (
    <main>
      <div className="relative h-48 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 to-neutral-950" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-green-400">
            ¿Qué filósofo sos?
          </h1>
          <p className="text-neutral-400 mt-2 font-mono text-xs tracking-widest">
            QUIZ — {preguntas.length} PREGUNTAS
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-24">
        {!terminado ? (
          <div>
            <div className="flex gap-1 mb-10">
              {preguntas.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i < actual ? 'bg-green-400' : i === actual ? 'bg-green-400 opacity-50' : 'bg-neutral-800'
                  }`}
                />
              ))}
            </div>

            <p className="font-mono text-xs text-neutral-500 mb-4">
              PREGUNTA {actual + 1} DE {preguntas.length}
            </p>

            <h2 className="text-2xl font-light text-white mb-8">
              {preguntas[actual].pregunta}
            </h2>

            <div className="flex flex-col gap-3">
              {preguntas[actual].opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => elegir(opcion.filosofo, i)}
                  disabled={mostrando}
                  className={`text-left p-4 rounded-lg border transition-all duration-300 ${
                    seleccionado === i
                      ? 'border-green-500 bg-green-500/10 text-white scale-[1.02]'
                      : mostrando
                      ? 'border-neutral-800 bg-neutral-900 text-neutral-600 cursor-not-allowed'
                      : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500 hover:text-white cursor-pointer'
                  }`}
                >
                  <span className="font-mono text-xs text-neutral-600 mr-3">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opcion.texto}
                  {seleccionado === i && (
                    <span className="ml-2 text-green-400">✓</span>
                  )}
                </button>
              ))}
            </div>

            {mostrando && (
              <p className="font-mono text-xs text-neutral-600 mt-6 text-center tracking-widest animate-pulse">
                SIGUIENTE PREGUNTA...
              </p>
            )}
          </div>

        ) : (
          <div
            className="text-center transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <p className="font-mono text-xs text-neutral-500 mb-8 tracking-widest">
              TU RESULTADO
            </p>

            <img
              src={resultado.imagen}
              alt={resultado.nombre}
              className="w-40 h-40 object-cover rounded-full mx-auto mb-8 opacity-80 border-2 border-neutral-700"
            />

            <h2 className={`text-5xl font-light mb-6 ${resultado.color}`}>
              {resultado.nombre}
            </h2>

            <p className="text-neutral-300 leading-relaxed mb-14 max-w-lg mx-auto text-lg">
              {resultado.descripcion}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-14 text-left max-w-sm mx-auto">
              {Object.entries(votos)
                .sort((a, b) => b[1] - a[1])
                .map(([filosofo, cantidad]) => (
                  <div key={filosofo} className="bg-neutral-900 p-3 rounded-lg">
                    <p className="font-mono text-xs text-neutral-500 mb-2 capitalize">{filosofo}</p>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1 bg-green-400 rounded-full transition-all duration-700"
                        style={{ width: `${(cantidad / preguntas.length) * 100}%` }}
                      />
                      <span className="font-mono text-xs text-neutral-400">{cantidad}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reiniciar}
                className="font-mono text-xs tracking-widest bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 px-6 py-3 rounded-lg transition-colors"
              >
                ↺ REPETIR QUIZ
              </button>
              <button
                onClick={reiniciar}
                className="font-mono text-xs tracking-widest bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg transition-colors"
              >
                ¿Y VOS? → HACÉ EL QUIZ
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}